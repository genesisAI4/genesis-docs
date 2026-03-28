---
sidebar_position: 3
---

# Genesis Ops - Kubernetes

Documentation des manifests Kubernetes.

---

## 📦 Deployments

### Nexus Deployment

```yaml
# k8s/nexus-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: genesis-nexus
  namespace: genesis
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nexus
  template:
    metadata:
      labels:
        app: nexus
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "8080"
    spec:
      containers:
      - name: nexus
        image: genesisai/nexus:latest
        ports:
        - containerPort: 8080
          name: http
        - containerPort: 8081
          name: ws
        resources:
          requests:
            cpu: 500m
            memory: 512Mi
          limits:
            cpu: 2000m
            memory: 2Gi
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
```

---

## 📊 Services

```yaml
# k8s/nexus-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: nexus
  namespace: genesis
spec:
  selector:
    app: nexus
  ports:
  - name: http
    port: 80
    targetPort: 8080
  - name: ws
    port: 8081
    targetPort: 8081
  type: ClusterIP
```

---

## 🔄 HPA

```yaml
# k8s/hpa.yaml
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
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

---

## 🛡️ Network Policies

```yaml
# k8s/network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: nexus-network-policy
spec:
  podSelector:
    matchLabels:
      app: nexus
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 8080
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: database
    ports:
    - protocol: TCP
      port: 5432
```

---

## 🚀 Déploiement

```bash
# Appliquer les manifests
kubectl apply -f k8s/base/

# Vérifier
kubectl get pods -n genesis

# Logs
kubectl logs -n genesis -l app=nexus

# Scale
kubectl scale deployment nexus --replicas=5 -n genesis
```

---

**Version :** 1.0.0
