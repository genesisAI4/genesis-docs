---
sidebar_position: 1
---

# Genesis Ops - Vue d'ensemble

**Genesis Ops** est l'ensemble des outils DevOps et d'infrastructure pour déployer, monitorer et gouverner l'écosystème Genesis.

---

## 🛠️ Fonctionnalités

- **Infrastructure as Code** : Docker, Kubernetes, Terraform
- **Monitoring** : Prometheus, Grafana, Alerting
- **CI/CD** : Pipelines automatisés
- **Governance** : Policies et compliance

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph "Infrastructure"
        Docker[Docker Compose<br/>Local Dev]
        K8s[Kubernetes<br/>Production]
        Terraform[Terraform<br/>Cloud Resources]
    end

    subgraph "Monitoring"
        Prometheus[Prometheus<br/>Metrics]
        Grafana[Grafana<br/>Dashboards]
        Alerting[AlertManager<br/>PagerDuty]
        Tracing[Tempo/Jaeger<br/>Distributed Tracing]
    end

    subgraph "CI/CD"
        GitHub[GitHub Actions<br/>CI Pipelines]
        Deploy[Deployment<br/>ArgoCD/Flux]
        Scan[Security Scan<br/>SAST/DAST]
    end

    Docker --> K8s
    Terraform --> K8s
    Prometheus --> Grafana
    Prometheus --> Alerting
    GitHub --> Deploy
    GitHub --> Scan
```

---

## 📚 Références

- [Infrastructure](./genesis-ops/infrastructure)
- [Docker Compose](./genesis-ops/docker-compose)
- [Kubernetes](./genesis-ops/kubernetes)
- [Monitoring](./genesis-ops/monitoring)
- [CI/CD](./genesis-ops/ci-cd)

---

**Version :** 1.0.0  
**Tools :** Docker, K8s, Terraform  
**Monitoring :** Prometheus, Grafana  
**CI/CD :** GitHub Actions
