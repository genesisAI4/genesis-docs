---
sidebar_position: 4
---

# Genesis Ops - Monitoring

Documentation du monitoring avec Prometheus et Grafana.

---

## 📊 Prometheus

### Configuration

```yaml
# monitoring/prometheus/prometheus.yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

rule_files:
  - "rules/*.yaml"

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  
  - job_name: 'nexus'
    static_configs:
      - targets: ['nexus:8080']
    metrics_path: '/metrics'
  
  - job_name: 'igon7'
    static_configs:
      - targets: ['igon7:18791']
  
  - job_name: 'cloud-api'
    static_configs:
      - targets: ['cloud-api:3000']
```

---

## 🚨 Alertes

```yaml
# monitoring/prometheus/rules/alerts.yaml
groups:
- name: genesis-alerts
  rules:
  - alert: HighErrorRate
    expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.05
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
      description: "Error rate is {{ $value | humanizePercentage }}"
  
  - alert: NexusUnavailable
    expr: up{job="nexus"} == 0
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: "Nexus is unavailable"
  
  - alert: HighMemoryUsage
    expr: container_memory_usage_bytes / container_spec_memory_limit_bytes > 0.9
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High memory usage"
      description: "Memory usage is {{ $value | humanizePercentage }}"
```

---

## 📈 Grafana Dashboards

### Dashboard JSON

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
            "expr": "sum(rate(http_requests_total{status=~\"5..\"}[5m]))"
          }
        ]
      },
      {
        "title": "Active Workflows",
        "type": "stat",
        "targets": [
          {
            "expr": "sum(igon7_active_workflows)"
          }
        ]
      }
    ]
  }
}
```

---

## 🔔 Alertmanager

```yaml
# monitoring/alertmanager/alertmanager.yaml
global:
  smtp_smarthost: 'smtp.example.com:587'
  smtp_from: 'alertmanager@example.com'

route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'slack-notifications'
  routes:
  - match:
      severity: critical
    receiver: 'pagerduty'

receivers:
- name: 'slack-notifications'
  slack_configs:
  - api_url: 'https://hooks.slack.com/services/XXX'
    channel: '#alerts'

- name: 'pagerduty'
  pagerduty_configs:
  - service_key: 'YOUR_PAGERDUTY_KEY'
```

---

**Version :** 1.0.0
