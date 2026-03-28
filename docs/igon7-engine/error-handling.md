---
sidebar_position: 6
---

# igon7 Engine - Error Handling

Guide complet de gestion des erreurs dans igon7 Engine.

---

## 📊 Hiérarchie des erreurs

```
WorkflowError (base)
├── WorkflowActivationError
├── NodeOperationError
│   ├── NodeApiError
│   ├── NodeTimeoutError
│   └── NodeValidationError
├── ExpressionError
├── CredentialsNotFoundError
├── ExecutionError
│   ├── RetryExhaustedError
│   ├── CircuitBreakerError
│   └── DeadLetterQueueError
└── ConfigurationError
```

---

## 🔴 Types d'erreurs

### WorkflowError (Base)

```typescript
abstract class WorkflowError extends Error {
  code: string;
  cause?: Error;
  timestamp: number;
  workflowId?: string;
  nodeId?: string;
  
  constructor(
    message: string,
    code: string,
    cause?: Error,
    context?: { workflowId?: string; nodeId?: string }
  ) {
    super(message);
    this.name = 'WorkflowError';
    this.code = code;
    this.cause = cause;
    this.timestamp = Date.now();
    this.workflowId = context?.workflowId;
    this.nodeId = context?.nodeId;
  }
  
  toJSON(): ErrorJSON {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      stack: this.stack,
      timestamp: this.timestamp,
      workflowId: this.workflowId,
      nodeId: this.nodeId,
    };
  }
}
```

### WorkflowActivationError

```typescript
class WorkflowActivationError extends WorkflowError {
  constructor(message: string, cause?: Error) {
    super(message, 'WORKFLOW_ACTIVATION_FAILED', cause);
    this.name = 'WorkflowActivationError';
  }
}

// Exemples de causes :
// - Workflow ID déjà existant
// - Configuration invalide
// - Dependencies manquantes
```

### NodeOperationError

```typescript
class NodeOperationError extends WorkflowError {
  nodeType: string;
  nodeId: string;
  
  constructor(
    nodeType: string,
    nodeId: string,
    message: string,
    cause?: Error
  ) {
    super(
      message,
      'NODE_OPERATION_FAILED',
      cause,
      { nodeId }
    );
    this.name = 'NodeOperationError';
    this.nodeType = nodeType;
    this.nodeId = nodeId;
  }
}
```

### NodeApiError

```typescript
class NodeApiError extends NodeOperationError {
  httpCode: number;
  response: any;
  request?: {
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: any;
  };
  
  constructor(
    nodeType: string,
    nodeId: string,
    message: string,
    httpCode: number,
    response: any,
    cause?: Error
  ) {
    super(nodeType, nodeId, message, cause);
    this.name = 'NodeApiError';
    this.httpCode = httpCode;
    this.response = response;
  }
  
  isRetryable(): boolean {
    // 4xx errors (sauf 429) ne sont pas retryables
    if (this.httpCode >= 400 && this.httpCode < 500 && this.httpCode !== 429) {
      return false;
    }
    // 5xx errors et 429 sont retryables
    return true;
  }
}
```

### NodeTimeoutError

```typescript
class NodeTimeoutError extends NodeOperationError {
  timeout: number;
  executionTime: number;
  
  constructor(
    nodeType: string,
    nodeId: string,
    timeout: number,
    executionTime: number
  ) {
    super(
      nodeType,
      nodeId,
      `Node execution timed out after ${executionTime}ms (limit: ${timeout}ms)`
    );
    this.name = 'NodeTimeoutError';
    this.timeout = timeout;
    this.executionTime = executionTime;
  }
}
```

### ExpressionError

```typescript
class ExpressionError extends WorkflowError {
  expression: string;
  context: any;
  
  constructor(
    expression: string,
    context: any,
    message: string,
    cause?: Error
  ) {
    super(message, 'EXPRESSION_EVALUATION_FAILED', cause);
    this.name = 'ExpressionError';
    this.expression = expression;
    this.context = context;
  }
}
```

### CredentialsNotFoundError

```typescript
class CredentialsNotFoundError extends WorkflowError {
  credentialType: string;
  credentialId: string;
  
  constructor(credentialType: string, credentialId: string) {
    super(
      `Credentials "${credentialType}:${credentialId}" not found`,
      'CREDENTIALS_NOT_FOUND'
    );
    this.name = 'CredentialsNotFoundError';
    this.credentialType = credentialType;
    this.credentialId = credentialId;
  }
}
```

### RetryExhaustedError

```typescript
class RetryExhaustedError extends NodeOperationError {
  attempts: number;
  lastError: Error;
  
  constructor(
    nodeType: string,
    nodeId: string,
    attempts: number,
    lastError: Error
  ) {
    super(
      nodeType,
      nodeId,
      `All ${attempts} retry attempts failed`
    );
    this.name = 'RetryExhaustedError';
    this.attempts = attempts;
    this.lastError = lastError;
  }
}
```

---

## 🔄 Stratégies de Retry

### Configuration de base

```typescript
interface RetryPolicy {
  maxAttempts: number;
  initialInterval: number;
  backoffCoefficient: number;
  maxInterval: number;
  retryableErrors?: ErrorConstructor[];
  onRetry?: (error: Error, attempt: number) => void;
}

const defaultRetryPolicy: RetryPolicy = {
  maxAttempts: 3,
  initialInterval: 1000,      // 1 seconde
  backoffCoefficient: 2,      // 1s, 2s, 4s, 8s...
  maxInterval: 30000,         // Max 30 secondes
  retryableErrors: [
    NodeApiError,
    NodeTimeoutError,
    NetworkError,
  ],
};
```

### Exponential Backoff

```typescript
async function executeWithRetry<T>(
  fn: () => Promise<T>,
  policy: RetryPolicy
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= policy.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Vérifier si l'erreur est retryable
      if (policy.retryableErrors && !policy.retryableErrors.some(
        ErrorClass => error instanceof ErrorClass
      )) {
        throw error; // Non retryable
      }
      
      // Callback onRetry
      policy.onRetry?.(error, attempt);
      
      // Dernier attempt
      if (attempt === policy.maxAttempts) {
        break;
      }
      
      // Calculer le délai avec exponential backoff
      const delay = Math.min(
        policy.initialInterval * Math.pow(policy.backoffCoefficient, attempt - 1),
        policy.maxInterval
      );
      
      await sleep(delay);
    }
  }
  
  throw new RetryExhaustedError(
    'unknown',
    'unknown',
    policy.maxAttempts,
    lastError!
  );
}
```

### Jitter (aléatoire)

```typescript
function addJitter(delay: number, jitterFactor: number = 0.1): number {
  const jitter = delay * jitterFactor * (Math.random() * 2 - 1);
  return delay + jitter;
}

// Utilisation
const delayWithJitter = addJitter(calculatedDelay);
await sleep(delayWithJitter);
```

---

## 🛡️ Circuit Breaker

### Implémentation

```typescript
interface CircuitBreakerConfig {
  failureThreshold: number;
  successThreshold: number;
  timeout: number;
}

enum CircuitState {
  CLOSED = 'closed',
  OPEN = 'open',
  HALF_OPEN = 'half_open',
}

class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failures = 0;
  private successes = 0;
  private lastFailureTime?: number;
  
  constructor(private config: CircuitBreakerConfig) {}
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() - this.lastFailureTime! > this.config.timeout) {
        this.state = CircuitState.HALF_OPEN;
      } else {
        throw new CircuitBreakerError('Circuit is OPEN');
      }
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess(): void {
    if (this.state === CircuitState.HALF_OPEN) {
      this.successes++;
      if (this.successes >= this.config.successThreshold) {
        this.state = CircuitState.CLOSED;
        this.failures = 0;
        this.successes = 0;
      }
    }
  }
  
  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= this.config.failureThreshold) {
      this.state = CircuitState.OPEN;
    }
  }
  
  getState(): CircuitState {
    return this.state;
  }
}
```

---

## 📝 Gestion des erreurs par noeud

### ErrorHandler Node

```typescript
interface ErrorHandlerNode {
  type: 'error-handler';
  config: {
    forNodes?: string[];
    errorTypes?: ErrorConstructor[];
    action: 'retry' | 'fallback' | 'notify' | 'log';
    fallback?: string;
    notify?: {
      channel: 'email' | 'slack' | 'webhook';
      recipients: string[];
    };
  };
}

// Exemple
const errorHandlerNode = {
  type: 'error-handler',
  config: {
    forNodes: ['fetch-data', 'process-data'],
    errorTypes: [NodeApiError, NodeTimeoutError],
    action: 'fallback',
    fallback: 'use-cached-data',
  },
};
```

### Global Error Handler

```typescript
class GlobalErrorHandler {
  private handlers: Array<{
    match: (error: WorkflowError) => boolean;
    handle: (error: WorkflowError) => Promise<void>;
  }> = [];
  
  register(
    match: (error: WorkflowError) => boolean,
    handle: (error: WorkflowError) => Promise<void>
  ): void {
    this.handlers.push({ match, handle });
  }
  
  async handle(error: WorkflowError): Promise<void> {
    for (const handler of this.handlers) {
      if (handler.match(error)) {
        await handler.handle(error);
        return;
      }
    }
    
    // Handler par défaut
    console.error('Unhandled error:', error);
  }
}

// Utilisation
const errorHandler = new GlobalErrorHandler();

errorHandler.register(
  (error) => error instanceof CredentialsNotFoundError,
  async (error) => {
    await sendAlert(`Credentials not found: ${error.credentialType}`);
  }
);

errorHandler.register(
  (error) => error instanceof RetryExhaustedError,
  async (error) => {
    await logError(error);
    await notifyTeam(error);
  }
);
```

---

## 📊 Monitoring des erreurs

### Métriques

```typescript
interface ErrorMetrics {
  totalErrors: number;
  errorsByType: Map<string, number>;
  errorsByNode: Map<string, number>;
  retryRate: number;
  circuitBreakerTrips: number;
  meanTimeToRecovery: number;
}

class ErrorMetricsCollector {
  private metrics: ErrorMetrics = {
    totalErrors: 0,
    errorsByType: new Map(),
    errorsByNode: new Map(),
    retryRate: 0,
    circuitBreakerTrips: 0,
    meanTimeToRecovery: 0,
  };
  
  recordError(error: WorkflowError): void {
    this.metrics.totalErrors++;
    
    const type = error.constructor.name;
    this.metrics.errorsByType.set(
      type,
      (this.metrics.errorsByType.get(type) || 0) + 1
    );
    
    if (error.nodeId) {
      this.metrics.errorsByNode.set(
        error.nodeId,
        (this.metrics.errorsByNode.get(error.nodeId) || 0) + 1
      );
    }
  }
  
  recordRetry(): void {
    // Calculer le retry rate
  }
  
  recordCircuitBreakerTrip(): void {
    this.metrics.circuitBreakerTrips++;
  }
  
  getMetrics(): ErrorMetrics {
    return this.metrics;
  }
}
```

---

**Version :** 1.0.0
