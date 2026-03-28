---
sidebar_position: 3
---

# Scaling Strategies

Stratégies de scaling pour Genesis AI.

---

## 📊 Types de Scaling

### 1. Horizontal Scaling

Ajouter plus d'instances.

```yaml
# Kubernetes HPA
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nexus-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: genesis-nexus
  minReplicas: 3
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### 2. Vertical Scaling

Augmenter les ressources par instance.

```yaml
# Kubernetes resources
resources:
  requests:
    cpu: 500m
    memory: 512Mi
  limits:
    cpu: 2000m
    memory: 2Gi
```

### 3. Auto-scaling

Scaling automatique basé sur la charge.

```yaml
# KEDA (Kubernetes Event-driven Autoscaling)
triggers:
- type: prometheus
  metadata:
    serverAddress: http://prometheus:9090
    metricName: igon7_queue_size
    threshold: '100'
```

---

## 🔄 Load Balancing

### Stratégies

| Stratégie | Description | Use Case |
|-----------|-------------|----------|
| **Round Robin** | Distribution égale | Charge uniforme |
| **Least Connections** | Moins de connexions | Long-running tasks |
| **IP Hash** | Sticky sessions | Sessions persistantes |
| **Weighted** | Poids par instance | Instances hétérogènes |

### Configuration Nginx

```nginx
upstream genesis {
    least_conn;
    server nexus-1:8080 weight=3;
    server nexus-2:8080 weight=2;
    server nexus-3:8080 weight=1;
}

server {
    location / {
        proxy_pass http://genesis;
    }
}
```

---

## 📈 Database Scaling

### Read Replicas

```yaml
# PostgreSQL avec replicas
primary:
  resources:
    cpu: 2000m
    memory: 4Gi
  
replicas: 3
read_only: true
```

### Sharding

```typescript
// Sharding par user_id
const shard = user_id % num_shards;
const db = databases[shard];
```

---

## 🚀 Performance Tuning

### Nexus

```typescript
// Configuration optimisée
const nexusConfig = {
  maxConcurrentAgents: 100,
  maxConnections: 10000,
  requestTimeout: 30000,
  heartbeatInterval: 30000,
};
```

### igon7

```typescript
// Configuration optimisée
const igon7Config = {
  maxConcurrentWorkflows: 100,
  maxConcurrentNodesPerWorkflow: 50,
  defaultTimeout: 300000,
};
```

---

## ✅ Monitoring

### Métriques clés

- **CPU Usage** : < 70%
- **Memory Usage** : < 80%
- **Queue Size** : < 1000
- **Response Time** : P95 < 500ms
- **Error Rate** : < 1%

---

**Version :** 1.0.0  
**Niveau :** Avancé
