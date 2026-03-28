---
sidebar_position: 5
---

# Workflow Patterns

Patterns avancés pour les workflows.

---

## 🔄 Retry Pattern

```typescript
const workflow = new WorkflowBuilder('with-retry')
  .addNode('flaky-api', async () => {
    return await callUnreliableAPI();
  }, {
    retry: {
      maxAttempts: 5,
      initialInterval: 1000,
      backoffCoefficient: 2,
      maxInterval: 30000,
      onRetry: (error, attempt) => {
        console.log(`Retry ${attempt}:`, error.message);
      }
    }
  })
  .build();
```

---

## ⚡ Circuit Breaker Pattern

```typescript
class CircuitBreaker {
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private failures = 0;
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      throw new Error('Circuit is OPEN');
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
  
  private onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }
  
  private onFailure() {
    this.failures++;
    if (this.failures >= 5) {
      this.state = 'OPEN';
      setTimeout(() => {
        this.state = 'HALF_OPEN';
      }, 60000);
    }
  }
}
```

---

## 🎯 Saga Pattern

```typescript
const saga = new WorkflowBuilder('saga')
  .addNode('reserve-inventory', reserveInventory)
  .addNode('process-payment', processPayment)
  .addNode('ship-order', shipOrder)
  .onError(async (ctx, error) => {
    // Compensation
    if (ctx.executed('process-payment')) {
      await refundPayment(ctx.inputs['process-payment']);
    }
    if (ctx.executed('reserve-inventory')) {
      await releaseInventory(ctx.inputs['reserve-inventory']);
    }
  })
  .build();
```

---

## 📊 Fan-Out/Fan-In Pattern

```typescript
const workflow = new WorkflowBuilder('fan-out-fan-in')
  .addNode('split', splitData)
  .parallel(
    Array.from({ length: 10 }, (_, i) => `process-${i}`),
    Array.from({ length: 10 }, (_, i) => processChunk),
    { concurrency: 5 }
  )
  .addNode('merge', mergeResults, {
    dependsOn: Array.from({ length: 10 }, (_, i) => `process-${i}`)
  })
  .build();
```

---

## ⏱️ Timeout Pattern

```typescript
const workflow = new WorkflowBuilder('with-timeout')
  .addNode('long-task', async () => {
    await sleep(120000);
  }, {
    timeout: 60000,
    onTimeout: 'fallback'
  })
  .addNode('fallback', async () => {
    return { completed: false, reason: 'timeout' };
  })
  .build();
```

---

## ✅ Best Practices

1. **Idempotency** : Les retries doivent être sans effet de bord
2. **Timeouts** : Toujours définir des timeouts
3. **Compensation** : Prévoir des actions de rollback
4. **Monitoring** : Tracker les retries et échecs
5. **Alerting** : Alerter en cas de circuit breaker open

---

**Version :** 1.0.0  
**Niveau :** Avancé
