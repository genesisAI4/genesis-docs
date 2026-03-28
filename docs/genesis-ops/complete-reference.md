---
sidebar_position: 1
---

# Genesis Ops - Documentation Complète

**Genesis Ops** est l'ensemble des outils DevOps et d'infrastructure pour déployer, monitorer et gouverner l'écosystème Genesis AI avec Kubernetes, Terraform, Prometheus et Grafana.

---

## 📊 Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| **Fichiers Shell** | 30+ scripts |
| **Modules Terraform** | 10+ modules |
| **Manifests K8s** | 20+ manifests |
| **Dashboards Grafana** | 15+ dashboards |
| **Alertes Prometheus** | 50+ règles |

---

## 🏗️ Architecture

### Structure du Projet

```
genesis-ops/
├── .github/
├── audit/                        # Audits de sécurité
│   ├── security-audit.sh
│   ├── compliance-check.sh
│   └── penetration-test/
│
├── chaos-engineering/            # Tests de chaos
│   ├── chaos-experiments.yaml
│   ├── failure-injection.sh
│   └── resilience-tests/
│
├── deployment/                   # Scripts de déploiement
│   ├── deploy.sh
│   ├── rollback.sh
│   ├── blue-green.sh
│   └── canary.sh
│
├── docs/                         # Documentation Ops
│   ├── runbooks/
│   ├── playbooks/
│   └── procedures/
│
├── e2e-tests/                    # Tests E2E
│   ├── smoke-tests.sh
│   ├── integration-tests.sh
│   └── load-tests.sh
│
├── implementation/               # Implémentations
│   ├── kubernetes/
│   ├── terraform/
│   └── ansible/
│
├── k8s/                          # Manifests Kubernetes
│   ├── base/
│   │   ├── namespace.yaml
│   │   ├── configmap.yaml
│   │   ├── secrets.yaml
│   │   ├── services.yaml
│   │   └── deployments.yaml
│   │
│   ├── overlays/
│   │   ├── development/
│   │   ├── staging/
│   │   └── production/
│   │
│   ├── hpa.yaml                  # Horizontal Pod Autoscaler
│   ├── pdb.yaml                  # Pod Disruption Budget
│   ├── network-policy.yaml
│   └── ingress.yaml
│
├── load-tests/                   # Tests de charge
│   ├── k6/
│   │   ├── workflow-load.js
│   │   ├── api-load.js
│   │   └── nexus-load.js
│   │
│   └── results/
│
├── monitoring/                   # Monitoring
│   ├── prometheus/
│   │   ├── prometheus.yaml
│   │   ├── rules/
│   │   │   ├── alerts.yaml
│   │   │   ├── recording-rules.yaml
│   │   │   └── nexus-alerts.yaml
│   │   └── targets/
│   │
│   ├── grafana/
│   │   ├── dashboards/
│   │   │   ├── genesis-overview.json
│   │   │   ├── nexus-metrics.json
│   │   │   ├── igon7-workflows.json
│   │   │   ├── clisis-security.json
│   │   │   └── cloud-api-metrics.json
│   │   ├── datasources.yaml
│   │   └── alerting.yaml
│   │
│   └── alertmanager/
│       ├── alertmanager.yaml
│       └── templates/
│
├── my-agent-team/                # Équipe d'agents
│   ├── CLAUDE.md
│   ├── agents/
│   └── configs/
│
├── nginx/                        # Configuration Nginx
│   ├── nginx.conf
│   ├── ssl.conf
│   └── rate-limit.conf
│
├── observability/                # Observabilité
│   ├── tracing/
│   │   ├── jaeger.yaml
│   │   └── tempo.yaml
│   │
│   ├── logging/
│   │   ├── fluentd.yaml
│   │   └── loki.yaml
│   │
│   └── metrics/
│       └── otel-collector.yaml
│
├── pgbouncer/                    # PgBouncer configuration
│   ├── pgbouncer.ini
│   └── userlist.txt
│
├── runbooks/                     # Runbooks d'incident
│   ├── incident-response.md
│   ├── database-failure.md
│   ├── nexus-outage.md
│   ├── security-breach.md
│   └── performance-degradation.md
│
├── scripts/                      # Scripts utilitaires
│   ├── backup.sh
│   ├── restore.sh
│   ├── health-check.sh
│   ├── rotate-secrets.sh
│   ├── scale-services.sh
│   └── cleanup-resources.sh
│
├── security-tests/               # Tests de sécurité
│   ├── vulnerability-scan.sh
│   ├── dependency-audit.sh
│   └── pentest/
│
├── task-force/                   # Task Force
│   ├── emergency-response/
│   └── incident-command/
│
├── terraform/                    # Infrastructure as Code
│   ├── modules/
│   │   ├── kubernetes-cluster/
│   │   ├── database/
│   │   ├── redis/
│   │   ├── networking/
│   │   └── monitoring/
│   │
│   ├── environments/
│   │   ├── development/
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── staging/
│   │   └── production/
│   │
│   └── backend.tf
│
├── tests/                        # Tests
│   ├── unit/
│   └── integration/
│
├── ALPHA_TEST_PROTOCOL.md
├── DEPLOYMENT_80_CHECKLIST.md
├── DEPLOYMENT_TRUTH_TEST.md
├── Dockerfile
├── install.sh
├── LICENSE
├── QWEN.md
└── README.md
```

---

## ☸️ Kubernetes

### Deployment Manifest

```yaml
# k8s/base/deployments.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: genesis-nexus
  namespace: genesis
  labels:
    app: nexus
    component: brain
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
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: genesis-secrets
              key: database-url
        - name: REDIS_URL
          valueFrom:
            configMapKeyRef:
              name: genesis-config
              key: redis-url
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
        securityContext:
          runAsNonRoot: true
          runAsUser: 1000
          allowPrivilegeEscalation: false
          capabilities:
            drop:
            - ALL
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: igon7-engine
  namespace: genesis
spec:
  replicas: 2
  selector:
    matchLabels:
      app: igon7
  template:
    spec:
      containers:
      - name: igon7
        image: genesisai/igon7:latest
        resources:
          requests:
            cpu: 1000m
            memory: 1Gi
          limits:
            cpu: 4000m
            memory: 4Gi
```

### HPA (Horizontal Pod Autoscaler)

```yaml
# k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nexus-hpa
  namespace: genesis
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
  - type: Pods
    pods:
      metric:
        name: requests_per_second
      target:
        type: AverageValue
        averageValue: 1000
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 100
        periodSeconds: 60
      - type: Pods
        value: 4
        periodSeconds: 60
      selectPolicy: Max
```

### Network Policy

```yaml
# k8s/network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: nexus-network-policy
  namespace: genesis
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
    - podSelector:
        matchLabels:
          app: igon7
    ports:
    - protocol: TCP
      port: 8080
    - protocol: TCP
      port: 8081
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: database
    ports:
    - protocol: TCP
      port: 5432
  - to:
    - namespaceSelector:
        matchLabels:
          name: redis
    ports:
    - protocol: TCP
      port: 6379
```

---

## 🌍 Terraform

### Kubernetes Cluster Module

```hcl
# terraform/modules/kubernetes-cluster/main.tf
resource "aws_eks_cluster" "genesis" {
  name     = var.cluster_name
  role_arn = aws_iam_role.cluster.arn
  version  = var.kubernetes_version
  
  vpc_config {
    subnet_ids              = var.subnet_ids
    endpoint_private_access = true
    endpoint_public_access  = false
    security_group_ids      = [aws_security_policy.cluster.id]
  }
  
  enabled_cluster_log_types = ["api", "audit", "authenticator"]
  
  tags = merge(var.tags, {
    Name        = var.cluster_name
    Environment = var.environment
  })
}

resource "aws_eks_node_group" "genesis" {
  cluster_name    = aws_eks_cluster.genesis.name
  node_group_name = var.node_group_name
  node_role_arn   = aws_iam_role.node.arn
  subnet_ids      = var.subnet_ids
  
  instance_types = var.instance_types
  capacity_type  = var.capacity_type
  
  scaling_config {
    desired_size = var.desired_size
    max_size     = var.max_size
    min_size     = var.min_size
  }
  
  update_config {
    max_unavailable = 1
  }
  
  labels = {
    "workload-type" = var.workload_type
  }
  
  tags = merge(var.tags, {
    Name = var.node_group_name
  })
}

resource "aws_autoscaling_policy" "genesis" {
  name                   = "${var.cluster_name}-scaling-policy"
  autoscaling_group_name = aws_eks_node_group.genesis.resources[0].autoscaling_groups[0].name
  adjustment_type        = "ChangeInCapacity"
  scaling_adjustment     = 1
  cooldown              = 300
  policy_type           = "SimpleScaling"
}

resource "aws_autoscaling_policy" "genesis_scale_in" {
  name                   = "${var.cluster_name}-scale-in-policy"
  autoscaling_group_name = aws_eks_node_group.genesis.resources[0].autoscaling_groups[0].name
  adjustment_type        = "ChangeInCapacity"
  scaling_adjustment     = -1
  cooldown              = 300
  policy_type           = "SimpleScaling"
}
```

### Database Module

```hcl
# terraform/modules/database/main.tf
resource "aws_db_instance" "genesis" {
  identifier        = var.db_identifier
  engine            = "postgres"
  engine_version    = var.engine_version
  instance_class    = var.instance_class
  allocated_storage = var.allocated_storage
  
  db_name  = var.db_name
  username = var.db_username
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.database.id]
  db_subnet_group_name   = aws_db_subnet_group.genesis.name
  
  parameter_group_name = aws_db_parameter_group.genesis.name
  
  backup_retention_period = var.backup_retention_period
  backup_window          = var.backup_window
  maintenance_window     = var.maintenance_window
  
  multi_az               = var.multi_az
  publicly_accessible    = false
  storage_encrypted      = true
  deletion_protection    = var.deletion_protection
  
  performance_insights_enabled = var.performance_insights_enabled
  
  tags = merge(var.tags, {
    Name = var.db_identifier
  })
}

resource "aws_db_subnet_group" "genesis" {
  name       = "${var.db_identifier}-subnet-group"
  subnet_ids = var.subnet_ids
  
  tags = merge(var.tags, {
    Name = "${var.db_identifier}-subnet-group"
  })
}

resource "aws_security_group" "database" {
  name        = "${var.db_identifier}-sg"
  description = "Security group for ${var.db_identifier}"
  vpc_id      = var.vpc_id
  
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = var.allowed_security_groups
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = merge(var.tags, {
    Name = "${var.db_identifier}-sg"
  })
}
```

---

## 📊 Monitoring

### Prometheus Alerts

```yaml
# monitoring/prometheus/rules/alerts.yaml
groups:
- name: genesis-alerts
  interval: 30s
  rules:
  # High Error Rate
  - alert: HighErrorRate
    expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.05
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
      description: "Error rate is {{ $value | humanizePercentage }} over the last 5 minutes"
  
  # Nexus Unavailable
  - alert: NexusUnavailable
    expr: up{job="nexus"} == 0
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: "Nexus is unavailable"
      description: "Nexus instance {{ $labels.instance }} has been down for more than 1 minute"
  
  # Workflow Execution Slow
  - alert: WorkflowExecutionSlow
    expr: histogram_quantile(0.99, rate(igon7_workflow_duration_seconds_bucket[5m])) > 30
    for: 10m
    labels:
      severity: warning
    annotations:
      summary: "Workflow executions are slow"
      description: "P99 workflow duration is {{ $value }}s over the last 10 minutes"
  
  # Memory Usage High
  - alert: MemoryUsageHigh
    expr: container_memory_usage_bytes / container_spec_memory_limit_bytes > 0.9
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High memory usage"
      description: "Container {{ $labels.name }} memory usage is {{ $value | humanizePercentage }}"
  
  # Disk Space Low
  - alert: DiskSpaceLow
    expr: node_filesystem_avail_bytes / node_filesystem_size_bytes < 0.1
    for: 10m
    labels:
      severity: warning
    annotations:
      summary: "Low disk space"
      description: "Disk space on {{ $labels.mountpoint }} is {{ $value | humanizePercentage }}"
  
  # Database Connections High
  - alert: DatabaseConnectionsHigh
    expr: pg_stat_activity_count / pg_settings_max_connections > 0.8
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "Database connections high"
      description: "Database {{ $labels.datname }} connections at {{ $value | humanizePercentage }}"
```

### Grafana Dashboard

```json
{
  "dashboard": {
    "title": "Genesis AI Overview",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total[5m]))",
            "legendFormat": "Requests/s"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m]))",
            "legendFormat": "Error Rate"
          }
        ]
      },
      {
        "title": "Workflow Executions",
        "type": "stat",
        "targets": [
          {
            "expr": "sum(igon7_workflow_executions_total)",
            "legendFormat": "Total Executions"
          }
        ]
      },
      {
        "title": "Active Agents",
        "type": "stat",
        "targets": [
          {
            "expr": "sum(nexus_active_agents)",
            "legendFormat": "Active Agents"
          }
        ]
      }
    ]
  }
}
```

---

## 📋 Scripts

### Health Check Script

```bash
#!/bin/bash
# scripts/health-check.sh

set -e

echo "=== Genesis Health Check ==="

# Check Kubernetes pods
echo "Checking Kubernetes pods..."
kubectl get pods -n genesis -o wide

# Check Nexus health
echo "Checking Nexus..."
curl -s http://nexus.genesis.svc.cluster.local:8080/health | jq .

# Check igon7 health
echo "Checking igon7..."
curl -s http://igon7.genesis.svc.cluster.local:18791/health | jq .

# Check database
echo "Checking database..."
kubectl exec -n database postgres-0 -- pg_isready

# Check Redis
echo "Checking Redis..."
kubectl exec -n redis redis-master-0 -- redis-cli ping

echo "=== Health Check Complete ==="
```

### Backup Script

```bash
#!/bin/bash
# scripts/backup.sh

set -e

BACKUP_DIR="/backups/genesis"
DATE=$(date +%Y%m%d_%H%M%S)

echo "=== Starting Backup ==="

# Backup PostgreSQL
echo "Backing up PostgreSQL..."
kubectl exec -n database postgres-0 -- pg_dumpall -U postgres > ${BACKUP_DIR}/postgres_${DATE}.sql

# Backup Redis
echo "Backing up Redis..."
kubectl exec -n redis redis-master-0 -- redis-cli SAVE
kubectl cp redis/redis-master-0:/data/dump.rdb ${BACKUP_DIR}/redis_${DATE}.rdb

# Backup configs
echo "Backing up configs..."
kubectl get all -n genesis -o yaml > ${BACKUP_DIR}/k8s_config_${DATE}.yaml

# Compress
echo "Compressing backups..."
tar -czf ${BACKUP_DIR}/backup_${DATE}.tar.gz ${BACKUP_DIR}/*_${DATE}*

# Upload to S3
echo "Uploading to S3..."
aws s3 cp ${BACKUP_DIR}/backup_${DATE}.tar.gz s3://genesis-backups/

# Cleanup old backups
echo "Cleaning up old backups..."
find ${BACKUP_DIR} -name "*.tar.gz" -mtime +7 -delete

echo "=== Backup Complete ==="
```

---

**Version :** 1.0.0  
**Dernière mise à jour :** 28 Mars 2026  
**Statut :** ✅ Documentation Complète
