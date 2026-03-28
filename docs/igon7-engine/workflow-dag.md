---
sidebar_position: 4
---

# igon7 Engine - Workflows DAG

Documentation complète des types de workflows et de la construction de DAG.

---

## 📐 Types de Workflows

### 1. Workflow Séquentiel

```typescript
import { WorkflowBuilder } from '@igon7/core'

const sequential = new WorkflowBuilder('sequential-example')
  .addNode('step-1', async () => {
    console.log('Étape 1')
    return { step: 1 }
  })
  .addNode('step-2', async (ctx) => {
    console.log('Étape 2', ctx.inputs['step-1'])
    return { step: 2 }
  }, { dependsOn: ['step-1'] })
  .addNode('step-3', async (ctx) => {
    console.log('Étape 3', ctx.inputs['step-2'])
    return { step: 3 }
  }, { dependsOn: ['step-2'] })
  .build()

// DAG résultant :
// step-1 → step-2 → step-3
```

### 2. Workflow Parallèle

```typescript
const parallel = new WorkflowBuilder('parallel-example')
  .addNode('start', async () => {
    return { timestamp: Date.now() }
  })
  .parallel(['task-a', 'task-b', 'task-c'], [
    async (ctx) => { /* ... */ },
    async (ctx) => { /* ... */ },
    async (ctx) => { /* ... */ }
  ], {
    dependsOn: ['start'],
    concurrency: 2, // Max 2 tâches en parallèle
    failFast: true  // Arrête si une échoue
  })
  .addNode('end', async (ctx) => {
    return {
      results: [
        ctx.inputs['task-a'],
        ctx.inputs['task-b'],
        ctx.inputs['task-c']
      ]
    }
  }, {
    dependsOn: ['task-a', 'task-b', 'task-c']
  })
  .build()

// DAG résultant :
//        → task-a →
// start  → task-b → end
//        → task-c →
```

### 3. Workflow Conditionnel

```typescript
const conditional = new WorkflowBuilder('conditional-example')
  .addNode('fetch-data', async () => {
    const data = await fetchData()
    return { data, isEmpty: data.length === 0 }
  })
  .addNode('process-data', async (ctx) => {
    return processData(ctx.inputs['fetch-data'].data)
  })
  .addNode('handle-empty', async () => {
    return { message: 'No data to process' }
  })
  .conditional('check-empty',
    async (ctx) => ctx.inputs['fetch-data'].isEmpty,
    {
      ifTrue: 'handle-empty',
      ifFalse: 'process-data'
    }
  )
  .addNode('finalize', async (ctx) => {
    // S'exécute après process-data OU handle-empty
    return { completed: true }
  }, {
    dependsOn: ['process-data', 'handle-empty']
  })
  .build()

// DAG résultant :
// fetch-data → check-empty → process-data ─┐
//                         └→ handle-empty ──→ finalize
```

### 4. Workflow avec Retry

```typescript
const withRetry = new WorkflowBuilder('retry-example')
  .addNode('flaky-api', async () => {
    const response = await fetch('https://unreliable-api.com/data')
    if (!response.ok) throw new Error('API Error')
    return response.json()
  }, {
    retry: {
      maxAttempts: 5,
      initialInterval: 1000,      // 1 seconde
      backoffCoefficient: 2,      // 1s, 2s, 4s, 8s, 16s
      maxInterval: 30000,         // Max 30 secondes
      retryableErrors: [
        TypeError,                // Network errors
        TimeoutError,
      ],
      onRetry: (error, attempt) => {
        console.log(`Retry ${attempt}:`, error.message)
      }
    }
  })
  .build()
```

### 5. Workflow avec Timeout

```typescript
const withTimeout = new WorkflowBuilder('timeout-example')
  .addNode('long-task', async () => {
    await sleep(120000) // 2 minutes
    return { completed: true }
  }, {
    timeout: 60000, // 1 minute max
    onTimeout: 'cancel' // ou 'continue' ou 'fallback'
  })
  .addNode('fallback-task', async () => {
    return { completed: false, reason: 'timeout' }
  })
  .build()
```

### 6. Workflow avec Cache

```typescript
const withCache = new WorkflowBuilder('cache-example')
  .addNode('expensive-query', async (ctx) => {
    return await db.query('SELECT * FROM large_table')
  }, {
    cache: {
      enabled: true,
      ttl: 3600000, // 1 heure
      keyFn: (input) => {
        return `query:${JSON.stringify(input)}`
      },
      store: 'redis' // ou 'memory' ou 'custom'
    }
  })
  .build()
```

### 7. Sub-Workflow

```typescript
// Workflow réutilisable
const dataProcessingWorkflow = new WorkflowBuilder('data-processing')
  .addNode('validate', async (ctx) => validate(ctx.input))
  .addNode('transform', async (ctx) => transform(ctx.inputs['validate']), {
    dependsOn: ['validate']
  })
  .addNode('store', async (ctx) => store(ctx.inputs['transform']), {
    dependsOn: ['transform']
  })
  .build()

// Workflow parent
const parentWorkflow = new WorkflowBuilder('parent')
  .addNode('fetch', async () => fetchItems())
  .addWorkflow('process-items', dataProcessingWorkflow, {
    dependsOn: ['fetch'],
    mapInput: (ctx) => ({
      data: ctx.inputs['fetch']
    }),
    mapOutput: (result) => result.stored,
    propagateErrors: false
  })
  .build()
```

### 8. Workflow avec ErrorHandler

```typescript
const withErrorHandling = new WorkflowBuilder('error-handling')
  .addNode('main-task', async () => {
    // Tâche principale
  })
  .addNode('cleanup', async (ctx, error) => {
    // Nettoyage en cas d'erreur
    await cleanupResources()
    return { cleaned: true, error: error.message }
  }, {
    onError: true, // S'exécute uniquement en cas d'erreur
    forNodes: ['main-task']
  })
  .addNode('notify', async (ctx) => {
    if (ctx.error) {
      await sendAlert(ctx.error)
    }
  }, {
    onError: true // S'exécute pour TOUTE erreur
  })
  .build()
```

### 9. Workflow avec Delay

```typescript
const withDelay = new WorkflowBuilder('delay-example')
  .addNode('send-email', async () => {
    await sendEmail()
  })
  .addNode('wait-24h', async () => {
    // Delay de 24 heures
  }, {
    delay: 24 * 60 * 60 * 1000 // 24 heures en ms
  }, {
    dependsOn: ['send-email']
  })
  .addNode('follow-up', async () => {
    await sendFollowUp()
  }, {
    dependsOn: ['wait-24h']
  })
  .build()

// Avec cron
const scheduledWorkflow = new WorkflowBuilder('scheduled')
  .addNode('daily-task', async () => {
    // Tâche quotidienne
  }, {
    schedule: '0 0 * * *' // Tous les jours à minuit
  })
  .build()
```

### 10. Workflow Complexe

```typescript
const complexWorkflow = new WorkflowBuilder('complex-pipeline')
  // Phase 1: Collecte parallèle
  .parallel(['fetch-a', 'fetch-b', 'fetch-c'], [
    async () => fetchFromSourceA(),
    async () => fetchFromSourceB(),
    async () => fetchFromSourceC()
  ], { concurrency: 3 })
  
  // Phase 2: Validation
  .addNode('validate-all', async (ctx) => {
    const data = [
      ctx.inputs['fetch-a'],
      ctx.inputs['fetch-b'],
      ctx.inputs['fetch-c']
    ]
    return validateAll(data)
  }, {
    dependsOn: ['fetch-a', 'fetch-b', 'fetch-c'],
    retry: { maxAttempts: 2 }
  })
  
  // Phase 3: Condition
  .conditional('is-valid',
    async (ctx) => ctx.inputs['validate-all'].valid,
    {
      ifTrue: 'process',
      ifFalse: 'handle-error'
    }
  )
  
  // Branches
  .addNode('process', async (ctx) => {
    return process(ctx.inputs['validate-all'].data)
  })
  .addNode('handle-error', async (ctx) => {
    await reportError(ctx.inputs['validate-all'].errors)
    return { handled: true }
  })
  
  // Phase 4: Finalisation
  .addNode('finalize', async (ctx) => {
    const result = ctx.inputs['process'] || ctx.inputs['handle-error']
    await saveResult(result)
    return { completed: true }
  }, {
    dependsOn: ['process', 'handle-error']
  })
  
  // Gestion d'erreur globale
  .onError(async (ctx, error) => {
    await sendAlert(`Workflow failed: ${error.message}`)
  })
  
  .build()
```

---

## 🔧 Construction de DAG

### Méthodes de Construction

```typescript
// Méthode 1: Builder fluent
const dag1 = new WorkflowBuilder('example')
  .addNode('a', taskA)
  .addNode('b', taskB, { dependsOn: ['a'] })
  .addNode('c', taskC, { dependsOn: ['b'] })
  .build()

// Méthode 2: Configuration déclarative
const dag2 = WorkflowBuilder.fromConfig({
  nodes: [
    { id: 'a', fn: taskA },
    { id: 'b', fn: taskB, dependsOn: ['a'] },
    { id: 'c', fn: taskC, dependsOn: ['b'] }
  ]
})

// Méthode 3: À partir d'un fichier JSON
const dag3 = await WorkflowBuilder.fromFile('./workflow.json')

// Méthode 4: Programmatically
const dag4 = new WorkflowBuilder('dynamic')
for (let i = 0; i < 10; i++) {
  dag4.addNode(`task-${i}`, createTask(i), {
    dependsOn: i > 0 ? [`task-${i-1}`] : []
  })
}
```

### Validation de DAG

```typescript
const workflow = new WorkflowBuilder('validation-test')
  .addNode('a', taskA)
  .addNode('b', taskB, { dependsOn: ['c'] }) // Erreur: c n'existe pas
  .addNode('c', taskC, { dependsOn: ['b'] }) // Erreur: cycle b→c→b
  .build()

const validation = workflow.validate()

console.log(validation)
// {
//   valid: false,
//   errors: [
//     {
//       type: 'MISSING_NODE',
//       message: "Node 'b' depends on non-existent node 'c'",
//       severity: 'ERROR'
//     },
//     {
//       type: 'CIRCULAR_DEPENDENCY',
//       message: 'Circular dependency detected: b → c → b',
//       nodes: ['b', 'c'],
//       severity: 'ERROR'
//     }
//   ],
//   warnings: []
// }
```

### Visualisation de DAG

```typescript
// Export Mermaid
const mermaid = workflow.dag.toMermaid()
console.log(mermaid)
// graph TD
//   A[Node A] --> B[Node B]
//   B --> C[Node C]

// Export Graphviz
const graphviz = workflow.dag.toGraphviz()
console.log(graphviz)
// digraph G {
//   "Node A" -> "Node B"
//   "Node B" -> "Node C"
// }

// Générer une image
await workflow.dag.visualize({
  format: 'png',
  output: './dag.png',
  theme: 'dark'
})
```

---

## 📊 Patterns de DAG

### Pipeline Pattern

```typescript
const pipeline = new WorkflowBuilder('pipeline')
  .addNode('extract', extract)
  .addNode('transform', transform, { dependsOn: ['extract'] })
  .addNode('load', load, { dependsOn: ['transform'] })
  .build()

// extract → transform → load
```

### Fan-Out/Fan-In Pattern

```typescript
const fanOutFanIn = new WorkflowBuilder('fan-out-fan-in')
  .addNode('split', splitData)
  .parallel(['process-1', 'process-2', 'process-3'], [
    processChunk1, processChunk2, processChunk3
  ], {
    dependsOn: ['split'],
    concurrency: 3
  })
  .addNode('merge', mergeResults, {
    dependsOn: ['process-1', 'process-2', 'process-3']
  })
  .build()

//        → process-1 →
// split → process-2 → merge
//        → process-3 →
```

### Map-Reduce Pattern

```typescript
const mapReduce = new WorkflowBuilder('map-reduce')
  .addNode('load', loadData)
  .addNode('map', mapItems, { dependsOn: ['load'] })
  .parallel(
    Array.from({ length: 10 }, (_, i) => `reduce-${i}`),
    Array.from({ length: 10 }, (_, i) => createReducer(i)),
    { dependsOn: ['map'] }
  )
  .addNode('finalize', finalize, {
    dependsOn: Array.from({ length: 10 }, (_, i) => `reduce-${i}`)
  })
  .build()
```

### Circuit Breaker Pattern

```typescript
const circuitBreaker = new WorkflowBuilder('circuit-breaker')
  .addNode('check-health', checkServiceHealth)
  .conditional('is-healthy',
    async (ctx) => ctx.inputs['check-health'].healthy,
    {
      ifTrue: 'call-service',
      ifFalse: 'fallback'
    }
  )
  .addNode('call-service', callExternalService)
  .addNode('fallback', useFallback)
  .build()
```

---

**Version :** 1.0.0  
**Workflow Types :** 10+  
**Patterns :** 4+
