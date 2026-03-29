# 🏗️ Genesis AI — Architecture Documentation

**Purpose:** System design, architecture decisions, and technical diagrams

---

## 📁 Structure

```
architecture/
├── README.md                 # Ce fichier
├── overview.md               # System overview (C4 Context/Container)
├── nexus.md                  # Nexus core architecture
├── igon7.md                  # Igon7 workflow engine
├── data-flow.md              # Data flow diagrams
├── deployment.md             # Deployment architecture (K8s)
├── decisions/                # Architecture Decision Records (ADRs)
└── diagrams/                 # Mermaid diagrams (generated)
```

---

## 🏛️ System Overview

### C4 Model

#### Level 1: Context

```
┌─────────────────────────────────────────────────────────────┐
│                    GENESIS AI ECOSYSTEM                      │
│                                                              │
│  Users (Power Users, SMBs, Africa, Enterprise)              │
│       ↓                                                       │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Desktop    │    │    Mobile    │    │     Web      │  │
│  │    Client    │    │    Client    │    │    Portal    │  │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘  │
│         │                   │                   │          │
│         └───────────────────┼───────────────────┘          │
│                             ↓                               │
│                  ┌──────────────────┐                      │
│                  │  Genesis Nexus   │                      │
│                  │   (Core Brain)   │                      │
│                  └────────┬─────────┘                      │
│                           │                                 │
│         ┌─────────────────┼─────────────────┐              │
│         ↓                 ↓                 ↓               │
│  ┌────────────┐   ┌────────────┐   ┌────────────┐         │
│  │   Clisis   │   │   Igon7    │   │  Temporal  │         │
│  │   Agent    │   │  (n8n)     │   │  (Go)      │         │
│  └────────────┘   └────────────┘   └────────────┘         │
│                                                            │
│  External Services:                                        │
│  - AI Models (Qwen, Claude, OpenAI)                       │
│  - Cloud (AWS, GCP, Azure)                                │
│  - Payments (Stripe, Mobile Money)                        │
└─────────────────────────────────────────────────────────────┘
```

#### Level 2: Container

```
┌────────────────────────────────────────────────────────────┐
│                   GENESIS NEXUS                             │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  HTTP Server │  │  WebSocket   │  │   Guardian    │     │
│  │   (Oak)      │  │   Gateway    │  │   (Risk)      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  A2A Protocol│  │   Cognitive  │  │    Vault     │     │
│  │   (Routing)  │  │    Modes     │  │  (Encryption)│     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              PostgreSQL + Redis                      │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

---

## 🧠 Core Components

### Genesis Nexus

**File:** `nexus.md`

- Central orchestration brain
- A2A Protocol (Agent-to-Agent)
- Cognitive Modes (Execution, Socratic, Co-Pilot)
- Guardian (Risk Matrix + HITL)
- Blind-Key Payments

**Stack:** Deno 2.x, TypeScript, Oak, PostgreSQL, Redis

---

### Igon7 Engine

**File:** `igon7.md`

- Workflow orchestration (DAG execution)
- 400+ nodes (HTTP, DB, Cloud, AI)
- Custom nodes (Clisis, Mobile Money, Stripe)
- MCP compatible

**Stack:** n8n fork, Turborepo, Biome, Jest

**⚠️ Licence:** Sustainable Use License (n8n) — Enterprise required

---

## 📊 Data Flow

### User → Cloud Sync

```
User Device (Desktop/Mobile)
    ↓
[Local Storage: Encrypted (AES-GCM-256)]
    ↓
[E2EE Tunnel: TLS 1.3 + Zero-Knowledge]
    ↓
Genesis Cloud API (NestJS)
    ↓
[Sync Hub: Conflict Resolution]
    ↓
Other Devices (Mobile/Desktop/Web)
```

### Command Execution (Guardian)

```
User Request
    ↓
Nexus (Intent Classification)
    ↓
Guardian (Risk Scoring 1-5)
    ↓
Risk < 3: Auto-approve
Risk ≥ 4: HITL (Human-In-The-Loop)
    ↓
Clisis Agent (Sandboxed Execution)
    ↓
Result → Audit Log
```

---

## 🚀 Deployment

### Production Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                     │
│                                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │   Nexus     │  │  Cloud API  │  │   Igon7     │      │
│  │  (Stateful) │  │ (Stateless) │  │ (Stateless) │      │
│  │  Replicas:3 │  │ Replicas:3  │  │ Replicas:2  │      │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘      │
│         │                │                │              │
│         └────────────────┼────────────────┘              │
│                          ↓                                │
│              ┌───────────────────────┐                   │
│              │   Redis Cluster       │                   │
│              │   (3 masters + 3 slaves)│                 │
│              └───────────────────────┘                   │
│                          ↓                                │
│              ┌───────────────────────┐                   │
│              │   PostgreSQL (HA)     │                   │
│              │   (PgBouncer pooling) │                   │
│              └───────────────────────┘                   │
│                                                           │
│  Ingress: nginx (TLS termination)                        │
│  Monitoring: Prometheus + Grafana                        │
│  Logging: Loki + Promtail                                │
│  Tracing: Jaeger/Tempo                                   │
└──────────────────────────────────────────────────────────┘
```

---

## 📋 Architecture Decision Records (ADRs)

### ADR-001: Deno Runtime

**Date:** 15 Janvier 2026  
**Status:** ✅ Accepted

**Decision:** Use Deno 2.x for Nexus core

**Rationale:**
- Built-in TypeScript (no transpilation)
- Secure by default (permission system)
- Native ES modules
- Better async performance

**Consequences:**
- Smaller talent pool (vs Node.js)
- Newer ecosystem (less mature)

---

### ADR-002: Zero-Knowledge Architecture

**Date:** 20 Janvier 2026  
**Status:** ✅ Accepted

**Decision:** All user data encrypted client-side

**Rationale:**
- Privacy-first positioning
- GDPR compliance easier
- Competitive differentiation

**Consequences:**
- More complex key management
- Password recovery impossible (by design)

---

### ADR-003: n8n Fork for Workflows

**Date:** 5 Février 2026  
**Status:** ✅ Accepted

**Decision:** Fork n8n under Sustainable Use License

**Rationale:**
- 400+ nodes (8 years dev)
- Battle-tested (production-ready)
- Time-to-market (immediate)

**Consequences:**
- Licence fee ($2K/mois)
- Vendor dependency
- Rust migration planned (Mois 12-24)

---

## 🔗 Related Docs

- **Security:** `../security/README.md`
- **API:** `../api/README.md`
- **Deployment:** `genesis-ops/k8s/`

---

**Last Updated:** 29 Mars 2026  
**Owner:** Architecture Team  
**Next Review:** J+90
