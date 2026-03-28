---
sidebar_position: 6
---

# Genesis Temporal - Deployment

Guide de déploiement de Genesis Temporal.

---

## 🚀 Options de déploiement

1. **Docker Compose** (Développement)
2. **Kubernetes** (Production)
3. **Binaire natif** (Testing)

---

## 🐳 Docker Compose

### docker-compose.yml

```yaml
version: '3.8'

services:
  temporal:
    image: temporalio/auto-setup:1.26.0
    ports:
      - "7233:7233"
      - "7243:7243"
    environment:
      - DB=postgresql
      - DBNAME=temporal
      - POSTGRES_SEEDS=postgres
      - POSTGRES_USER=temporal
      - POSTGRES_PWD=temporal
      - NUM_HISTORY_SHARDS=4
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./config/dynamicconfig:/etc/temporal/config/dynamicconfig

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: temporal
      POSTGRES_PASSWORD: temporal
      POSTGRES_DB: temporal
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U temporal"]
      interval: 5s
      timeout: 5s
      retries: 5

  temporal-ui:
    image: temporalio/ui:2.31.2
    ports:
      - "8080:8080"
    environment:
      - TEMPORAL_ADDRESS=temporal:7233
      - TEMPORAL_CORS_ORIGINS=http://localhost:3000

  prometheus:
    image: prom/prometheus:v2.47.0
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

volumes:
  postgres-data:
```

### Démarrage

```bash
cd docker
docker-compose up -d

# Vérifier
docker-compose ps

# Logs
docker-compose logs -f temporal
```

---

## ☸️ Kubernetes

### Deployment

```yaml
# k8s/temporal-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: temporal-frontend
  namespace: temporal
spec:
  replicas: 3
  selector:
    matchLabels:
      app: temporal-frontend
  template:
    metadata:
      labels:
        app: temporal-frontend
    spec:
      containers:
      - name: frontend
        image: temporalio/server:1.26.0
        ports:
        - containerPort: 7233
        - containerPort: 7243
        env:
        - name: SERVICES
          value: "frontend"
        - name: DB
          value: "postgresql"
        - name: DBNAME
          value: "temporal"
        resources:
          requests:
            cpu: 500m
            memory: 512Mi
          limits:
            cpu: 2000m
            memory: 2Gi
        livenessProbe:
          grpc:
            port: 7233
          initialDelaySeconds: 30
          periodSeconds: 10
```

### Service

```yaml
# k8s/temporal-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: temporal-frontend
  namespace: temporal
spec:
  selector:
    app: temporal-frontend
  ports:
  - name: grpc
    port: 7233
    targetPort: 7233
  - name: http
    port: 7243
    targetPort: 7243
  type: ClusterIP
```

---

## 🔧 Makefile Commands

```bash
# Build
make build

# Run development (SQLite)
make start

# Run with PostgreSQL
make start-postgresql

# Install schema
make install-schema-postgresql

# Docker
make docker
make docker-up
make docker-down

# Tests
make test
make test-chasm
make test-coverage

# Lint
make lint
make fmt
```

---

## 📊 Monitoring

### Prometheus Config

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'temporal'
    static_configs:
      - targets: ['temporal:7233']
    metrics_path: '/metrics'
    
  - job_name: 'temporal-frontend'
    static_configs:
      - targets: ['temporal:7233']
    metrics_path: '/metrics/frontend'
```

---

**Temps estimé :** 30 minutes  
**Difficulté :** Avancé
