---
sidebar_position: 6
---

# igon7 Engine - API Reference

Référence complète de l'API igon7.

---

## 📦 Core API

### WorkflowBuilder

```typescript
class WorkflowBuilder {
  constructor(name: string)
  
  // Methods
  addNode<T>(name: string, fn: NodeFunction<T>, options?: NodeOptions): WorkflowBuilder
  addWorkflow(name: string, workflow: Workflow, options?: SubWorkflowOptions): WorkflowBuilder
  parallel(names: string[], fns: NodeFunction[], options?: ParallelOptions): WorkflowBuilder
  conditional(name: string, condition: ConditionFn, branches: BranchOptions): WorkflowBuilder
  delay(name: string, duration: number | DurationFn, options?: DelayOptions): WorkflowBuilder
  onError(handler: ErrorHandlerFn, options?: ErrorHandlerOptions): WorkflowBuilder
  
  validate(): ValidationResult
  getNodes(): ReadonlyArray<Node>
  getEdges(): ReadonlyArray<Edge>
  build(): Workflow
}
```

### NodeOptions

```typescript
interface NodeOptions {
  dependsOn?: string[]
  retry?: RetryPolicy
  timeout?: number
  concurrency?: number
  cache?: CacheConfig
  onError?: 'fail' | 'continue' | 'fallback'
  fallback?: string
  metadata?: NodeMetadata
}
```

### RetryPolicy

```typescript
interface RetryPolicy {
  maxAttempts: number
  initialInterval: number
  backoffCoefficient: number
  maxInterval: number
  retryableErrors?: ErrorConstructor[]
  onRetry?: (error: Error, attempt: number) => void
}
```

---

## 📊 DAG Builder API

```typescript
class DAGBuilder {
  addNode(id: string, task: Task, config?: NodeConfig): DAGBuilder
  addEdge(from: string, to: string, condition?: EdgeCondition): DAGBuilder
  validate(): ValidationResult
  hasCycle(): boolean
  getTopologicalOrder(): string[]
  toMermaid(): string
  build(): DAG
}
```

---

## ⚡ Executor API

```typescript
class TemporalExecutor {
  constructor(config: TemporalConfig)
  
  execute<T>(workflow: Workflow, options?: ExecutionOptions): Promise<T>
  executeWithRetry<T>(workflow: Workflow, options?: RetryOptions): Promise<T>
  startAsync(workflow: Workflow, options?: AsyncOptions): Promise<ExecutionHandle>
  
  cancel(executionId: string): Promise<void>
  pause(executionId: string): Promise<void>
  resume(executionId: string): Promise<void>
  getStatus(executionId: string): Promise<ExecutionStatus>
  
  registerActivity(name: string, fn: ActivityFunction): void
  registerActivities(activities: Record<string, ActivityFunction>): void
}
```

---

## 📈 Monitor API

```typescript
class WorkflowMonitor {
  constructor(config: MonitorConfig)
  
  on<T extends keyof WorkflowEvents>(event: T, handler: (e: WorkflowEvents[T]) => void): void
  off<T extends keyof WorkflowEvents>(event: T, handler: (e: WorkflowEvents[T]) => void): void
  
  getMetrics(executionId: string): Promise<WorkflowMetrics>
  getTimeline(executionId: string): Promise<TimelineEntry[]>
  getErrors(executionId: string): Promise<ErrorReport[]>
  
  getDashboardURL(executionId: string): string
  exportMetrics(executionId: string, format: 'json' | 'prometheus'): Promise<string>
}
```

---

**Version :** 1.0.0
