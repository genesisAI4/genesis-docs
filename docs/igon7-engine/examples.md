---
sidebar_position: 7
---

# igon7 Engine - Exemples Complets

Exemples de workflows réels et patterns avancés.

---

## 📝 Exemple 1: ETL Pipeline

```typescript
import { WorkflowBuilder } from '@igon7/core'

const etlPipeline = new WorkflowBuilder('etl-pipeline')
  // Extract
  .parallel(['extract-db', 'extract-api', 'extract-file'], [
    async () => {
      const data = await db.query('SELECT * FROM source')
      return { source: 'database', records: data }
    },
    async () => {
      const response = await fetch('https://api.example.com/data')
      return { source: 'api', records: await response.json() }
    },
    async () => {
      const file = await Deno.readFile('./data.csv')
      return { source: 'file', records: parseCSV(file) }
    }
  ], { concurrency: 3 })
  
  // Transform
  .addNode('validate', async (ctx) => {
    const allRecords = [
      ...ctx.inputs['extract-db'].records,
      ...ctx.inputs['extract-api'].records,
      ...ctx.inputs['extract-file'].records
    ]
    
    const validated = allRecords.filter(record => validateRecord(record))
    const rejected = allRecords.filter(record => !validateRecord(record))
    
    return { validated, rejected }
  }, {
    dependsOn: ['extract-db', 'extract-api', 'extract-file']
  })
  
  .addNode('transform', async (ctx) => {
    const { validated } = ctx.inputs['validate']
    return validated.map(record => transformRecord(record))
  }, {
    dependsOn: ['validate']
  })
  
  // Load
  .addNode('load-warehouse', async (ctx) => {
    const transformed = ctx.inputs['transform']
    await warehouse.bulkInsert(transformed)
    return { loaded: transformed.length }
  }, {
    dependsOn: ['transform']
  })
  
  .addNode('load-rejected', async (ctx) => {
    const { rejected } = ctx.inputs['validate']
    await rejectedStore.save(rejected)
    return { rejected: rejected.length }
  }, {
    dependsOn: ['validate']
  })
  
  // Notification
  .addNode('notify', async (ctx) => {
    const loaded = ctx.inputs['load-warehouse'].loaded
    const rejected = ctx.inputs['load-rejected'].rejected
    
    await sendSlackMessage({
      channel: '#etl-pipeline',
      text: `ETL completed: ${loaded} loaded, ${rejected} rejected`
    })
  }, {
    dependsOn: ['load-warehouse', 'load-rejected']
  })
  
  .onError(async (ctx, error) => {
    await sendAlert(`ETL Pipeline failed: ${error.message}`)
  })
  
  .build()
```

---

## 📝 Exemple 2: ML Training Pipeline

```typescript
const mlTraining = new WorkflowBuilder('ml-training')
  // Data Preparation
  .addNode('fetch-data', async () => {
    return await dataLake.fetch('training-data')
  })
  
  .addNode('preprocess', async (ctx) => {
    const data = ctx.inputs['fetch-data']
    return await preprocess(data, {
      normalize: true,
      handleMissing: 'drop'
    })
  }, {
    dependsOn: ['fetch-data']
  })
  
  .addNode('split', async (ctx) => {
    const preprocessed = ctx.inputs['preprocess']
    return splitData(preprocessed, { train: 0.8, val: 0.1, test: 0.1 })
  }, {
    dependsOn: ['preprocess']
  })
  
  // Hyperparameter Search
  .parallel(
    Array.from({ length: 10 }, (_, i) => `train-model-${i}`),
    Array.from({ length: 10 }, (_, i) => async (ctx) => {
      const { train, val } = ctx.inputs['split']
      const hyperparams = sampleHyperparams()
      
      const model = await trainModel(train, hyperparams)
      const metrics = await evaluate(model, val)
      
      return { model, metrics, hyperparams }
    }),
    { dependsOn: ['split'], concurrency: 4 }
  )
  
  // Select Best Model
  .addNode('select-best', async (ctx) => {
    const results = Array.from({ length: 10 }, (_, i) => 
      ctx.inputs[`train-model-${i}`]
    )
    
    const best = results.reduce((a, b) => 
      a.metrics.accuracy > b.metrics.accuracy ? a : b
    )
    
    return best
  }, {
    dependsOn: Array.from({ length: 10 }, (_, i) => `train-model-${i}`)
  })
  
  // Test Final model
  .addNode('test', async (ctx) => {
    const { model, hyperparams } = ctx.inputs['select-best']
    const { test } = ctx.inputs['split']
    
    const testMetrics = await evaluate(model, test)
    
    return {
      model,
      hyperparams,
      metrics: testMetrics
    }
  }, {
    dependsOn: ['select-best']
  })
  
  // Deploy
  .addNode('deploy', async (ctx) => {
    const { model, metrics } = ctx.inputs['test']
    
    if (metrics.accuracy < 0.9) {
      throw new Error('Model accuracy below threshold')
    }
    
    await modelRegistry.deploy(model, {
      version: generateVersion(),
      metrics
    })
  }, {
    dependsOn: ['test']
  })
  
  .build()
```

---

## 📝 Exemple 3: CI/CD Pipeline

```typescript
const cicdPipeline = new WorkflowBuilder('cicd-pipeline')
  // Build
  .addNode('checkout', async () => {
    return await git.checkout(process.env.GIT_COMMIT)
  })
  
  .addNode('install-deps', async () => {
    await exec('pnpm install')
  }, {
    dependsOn: ['checkout']
  })
  
  .addNode('lint', async () => {
    const { stdout, stderr } = await exec('pnpm lint')
    return { success: !stderr, output: stdout }
  }, {
    dependsOn: ['install-deps']
  })
  
  .addNode('typecheck', async () => {
    const { stdout, stderr } = await exec('pnpm typecheck')
    return { success: !stderr, output: stdout }
  }, {
    dependsOn: ['install-deps']
  })
  
  // Test
  .addNode('unit-tests', async () => {
    const { stdout, coverage } = await exec('pnpm test:unit --coverage')
    return { success: true, coverage }
  }, {
    dependsOn: ['install-deps']
  })
  
  .addNode('integration-tests', async () => {
    await exec('docker-compose up -d')
    try {
      const result = await exec('pnpm test:integration')
      return { success: true, result }
    } finally {
      await exec('docker-compose down')
    }
  }, {
    dependsOn: ['install-deps']
  })
  
  // Build
  .addNode('build', async () => {
    const { stdout } = await exec('pnpm build')
    return { success: true, output: stdout }
  }, {
    dependsOn: ['lint', 'typecheck', 'unit-tests']
  })
  
  // Deploy to staging
  .addNode('deploy-staging', async () => {
    await kubectl.apply('./k8s/staging')
    await kubectl.rollout('deployment/app')
  }, {
    dependsOn: ['build', 'integration-tests']
  })
  
  // E2E tests
  .addNode('e2e-tests', async () => {
    const result = await exec('pnpm test:e2e')
    return { success: result.exitCode === 0 }
  }, {
    dependsOn: ['deploy-staging']
  })
  
  // Production deploy (conditional)
  .conditional('should-deploy',
    async (ctx) => {
      const allPassed = 
        ctx.inputs['unit-tests'].success &&
        ctx.inputs['integration-tests'].success &&
        ctx.inputs['e2e-tests'].success
      return allPassed && process.env.BRANCH === 'main'
    },
    {
      ifTrue: 'deploy-prod',
      ifFalse: 'skip-deploy'
    }
  )
  
  .addNode('deploy-prod', async () => {
    await kubectl.apply('./k8s/production')
    await kubectl.rollout('deployment/app')
    
    // Wait for rollout
    await kubectl.waitForRollout('deployment/app')
  })
  
  .addNode('skip-deploy', async () => {
    return { skipped: true, reason: 'Tests failed or not main branch' }
  })
  
  .onError(async (ctx, error) => {
    await sendSlackMessage({
      channel: '#ci-cd-alerts',
      text: `❌ CI/CD Pipeline failed: ${error.message}`
    })
  })
  
  .build()
```

---

## 📝 Exemple 4: Data Processing at Scale

```typescript
const largeScaleProcessing = new WorkflowBuilder('large-scale-processing')
  // Partition data
  .addNode('partition', async () => {
    const data = await loadData()
    const partitions = partitionBy(data, 'date', 100) // 100 partitions
    return partitions
  })
  
  // Process each partition in parallel
  .parallel(
    Array.from({ length: 100 }, (_, i) => `process-partition-${i}`),
    Array.from({ length: 100 }, (_, i) => async (ctx) => {
      const partition = ctx.inputs['partition'][i]
      
      const result = await processPartition(partition, {
        retry: { maxAttempts: 3 },
        timeout: 300000
      })
      
      return result
    }),
    {
      dependsOn: ['partition'],
      concurrency: 20 // 20 partitions en parallèle
    }
  )
  
  // Aggregate results
  .addNode('aggregate', async (ctx) => {
    const results = Array.from({ length: 100 }, (_, i) => 
      ctx.inputs[`process-partition-${i}`]
    )
    
    return aggregateResults(results)
  }, {
    dependsOn: Array.from({ length: 100 }, (_, i) => `process-partition-${i}`)
  })
  
  // Generate report
  .addNode('report', async (ctx) => {
    const aggregated = ctx.inputs['aggregate']
    const report = generateReport(aggregated)
    await uploadToS3(report, 'reports/daily-report.pdf')
    return { reportUrl: '...' }
  }, {
    dependsOn: ['aggregate']
  })
  
  .build()
```

---

**Version :** 1.0.0  
**Exemples :** 4
