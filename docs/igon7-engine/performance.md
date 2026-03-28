---
sidebar_position: 8
---

# igon7 Engine - Performance

Guide d'optimisation des performances pour igon7 Engine.

---

## 📊 Métriques de performance

| Métrique | Cible | Description |
|----------|-------|-------------|
| **Workflow Latency** | < 100ms | Temps de démarrage |
| **Node Execution** | < 1s | Exécution moyenne |
| **Throughput** | 1000+ wf/s | Workflows par seconde |
| **Memory Usage** | < 512MB | Mémoire par worker |
| **CPU Usage** | < 70% | Utilisation CPU |

---

## ⚡ Optimisations

### Parallel Execution

```typescript
// Exécution parallèle de noeuds indépendants
const parallelConfig = {
  maxConcurrentNodes: 50,
  enableParallelExecution: true,
};

// Dans le workflow
const workflow = new WorkflowBuilder('parallel-optimized')
  .parallel(['task-1', 'task-2', 'task-3'], [
    async () => { /* ... */ },
    async () => { /* ... */ },
    async () => { /* ... */ }
  ], {
    concurrency: 3,
  })
  .build();
```

### Caching

```typescript
// Configuration du cache
const cacheConfig = {
  enabled: true,
  type: 'redis',
  ttl: 3600,
  maxSize: 1000,
};

// Noeud avec cache
const cachedNode = {
  type: 'task',
  config: {
    cache: {
      enabled: true,
      keyFn: (input) => hash(input),
      ttl: 3600,
    },
  },
};
```

### Connection Pooling

```typescript
// Pool de connexions PostgreSQL
const dbConfig = {
  max: 20,                    // Max connexions
  min: 5,                     // Min connexions
  idleTimeoutMillis: 30000,   // Timeout idle
  connectionTimeoutMillis: 5000,
};

// Pool Redis
const redisConfig = {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  keepAlive: 30000,
};
```

---

## 📈 Monitoring

### Prometheus Metrics

```typescript
// Métriques exposées
const metrics = {
  // Workflows
  'igon7_workflow_started_total': Counter,
  'igon7_workflow_completed_total': Counter,
  'igon7_workflow_failed_total': Counter,
  'igon7_workflow_duration_seconds': Histogram,
  
  // Noeuds
  'igon7_node_executions_total': Counter,
  'igon7_node_duration_seconds': Histogram,
  'igon7_node_retries_total': Counter,
  
  // Ressources
  'igon7_active_workflows': Gauge,
  'igon7_queue_size': Gauge,
  'igon7_memory_usage_bytes': Gauge,
};
```

### Dashboard Grafana

```json
{
  "dashboard": {
    "title": "igon7 Performance",
    "panels": [
      {
        "title": "Workflow Throughput",
        "targets": [
          {
            "expr": "rate(igon7_workflow_completed_total[5m])"
          }
        ]
      },
      {
        "title": "P95 Node Duration",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(igon7_node_duration_seconds_bucket[5m]))"
          }
        ]
      }
    ]
  }
}
```

---

**Version :** 1.0.0
