---
sidebar_position: 2
---

# Architecture du Système Genesis

Cette page présente une vue d'ensemble approfondie de l'architecture du système Genesis AI, de ses composants interconnectés et des principes de conception qui guident son développement.

---

## 🏛️ Vue d'ensemble Architecturale

Genesis AI suit une **architecture distribuée en couches** où chaque projet joue un rôle spécifique dans le flux de traitement des requêtes AI et de l'orchestration de workflows.

### Principes Architecturaux Fondamentaux

1. **Séparation des préoccupations** : Chaque projet a une responsabilité unique et bien définie
2. **Couplage lâche** : Les projets communiquent via des protocoles standardisés (A2A, gRPC, REST)
3. **Exécution durable** : Tous les workflows critiques sont persistés et reprenables
4. **Zero-Knowledge** : Les données sensibles restent chiffrées de bout en bout
5. **Local-First** : Priorité à l'exécution locale avec synchronisation cloud optionnelle

---

## 🗺️ Carte des Projets

```mermaid
graph TB
    subgraph "Couche Interface (Frontend)"
        Desktop[Genesis Desktop<br/>Electron + Vite + React]
        Companion[Genesis Companion<br/>Electron + Glassmorphism]
        Mobile[Genesis Mobile<br/>Expo + React Native]
        Web[Web Portal<br/>Next.js 14+]
        Extension[Browser Extension<br/>Chrome MV3]
    end

    subgraph "Couche Intelligente (Brain)"
        Nexus[Genesis Nexus<br/>Deno + A2A Protocol]
    end

    subgraph "Couche Exécution (Workers)"
        Temporal[Genesis Temporal<br/>Go 1.26 + CHASM]
        Igon7[igon7 Engine<br/>Deno + PNPM + Turborepo]
        Clisis[Clisis Agent<br/>Deno + Guardian Layer]
    end

    subgraph "Couche Infrastructure (Backend)"
        CloudAPI[Cloud API<br/>NestJS + PostgreSQL]
        Marketplace[Marketplace<br/>Deno + Smart Contracts]
        Ops[Genesis Ops<br/>Docker + K8s + Monitoring]
    end

    Desktop -.->|IPC| Nexus
    Companion -.->|IPC| Nexus
    Mobile -.->|WebSocket| Nexus
    Web -.->|REST| Nexus
    Extension -.->|Bridge| Nexus

    Nexus -->|gRPC| Temporal
    Nexus -->|Native| Igon7
    Nexus -->|Native| Clisis

    Temporal -->|Sync E2EE| CloudAPI
    Igon7 -->|Sync E2EE| CloudAPI
    Clisis -->|Sync E2EE| CloudAPI

    CloudAPI -->|Encrypted| Marketplace
    Ops -.->|Monitor| Temporal
    Ops -.->|Monitor| CloudAPI
```

---

## 📐 Diagrammes par Projet

### 1. igon7 Engine - Architecture DAG

```mermaid
graph LR
    subgraph "Monorepo Structure"
        packages[packages/]
        scripts[scripts/]
        docker[docker/]
    end

    subgraph "Packages Clés"
        core[Core Engine]
        dag[DAG Builder]
        executor[Workflow Executor]
        monitor[Monitoring]
    end

    packages --> core
    packages --> dag
    packages --> executor
    packages --> monitor

    core -->|Orchestre| dag
    dag -->|Génère| executor
    executor -->|Rapporte| monitor

    executor -->|Utilise| Temporal[Genesis Temporal]
    monitor -->|Envoie| CloudAPI[Cloud API]
```

**Flux de traitement :**
1. L'utilisateur définit un workflow DAG
2. Le DAG Builder valide et optimise le graphe
3. Le Core Engine orchestre l'exécution via Temporal
4. Le Monitoring tracke la progression et les erreurs

---

### 2. Genesis Nexus - Protocole A2A

```mermaid
graph TB
    subgraph "Nexus Core"
        Router[Neural Router]
        State[Unified State Manager]
        Agents[Agent Registry]
    end

    subgraph "A2A Protocol"
        Discovery[Agent Discovery]
        Routing[Message Routing]
        Response[Response Aggregation]
    end

    Router --> State
    Router --> Agents
    Agents --> Discovery
    Discovery --> Routing
    Routing --> Response

    Desktop --> Router
    Mobile --> Router
    Extension --> Router
```

**Fonctionnement du routage neural :**
1. La requête utilisateur est analysée sémantiquement
2. Le Neural Router identifie les agents compétents
3. Les messages sont routés via A2A Protocol
4. Les réponses sont agrégées et retournées

---

### 3. Clisis Agent - Guardian Layer

```mermaid
graph TB
    subgraph "Clisis Architecture"
        Modules[System Modules]
        Guardian[Guardian Layer]
        Sandbox[Sandbox Executor]
    end

    subgraph "System Modules"
        FileSystem[File System]
        Process[Process Control]
        Network[Network Access]
        Hardware[Hardware Info]
    end

    subgraph "Guardian Layer"
        Validate[Request Validation]
        Authorize[Permission Check]
        Audit[Security Audit]
    end

    Modules --> FileSystem
    Modules --> Process
    Modules --> Network
    Modules --> Hardware

    FileSystem --> Validate
    Process --> Validate
    Network --> Authorize
    Hardware --> Authorize

    Validate --> Audit
    Authorize --> Audit
    Audit --> Sandbox
```

**Flux de sécurité :**
1. Chaque requête système passe par le Guardian Layer
2. Validation des permissions et du contexte
3. Audit de sécurité avant exécution
4. Exécution dans un environnement sandboxé

---

### 4. Genesis Temporal - CHASM Layer

```mermaid
graph TB
    subgraph "Services Temporal"
        Frontend[Frontend Service<br/>gRPC/HTTP Gateway]
        History[History Service<br/>Event Sourcing]
        Matching[Matching Service<br/>Task Queues]
        Worker[Worker Service<br/>Background Jobs]
    end

    subgraph "CHASM Engine"
        StateMachine[State Machine Registry]
        Component[Component Tree]
        Coordination[State Coordination]
    end

    Frontend --> History
    History --> Matching
    Matching --> Worker

    History --> StateMachine
    StateMachine --> Component
    Component --> Coordination
```

**Cycle de vie d'un workflow :**
1. Frontend reçoit la requête de démarrage
2. History crée l'état initial et l'event log
3. Matching queue les tâches pour les workers
4. Worker exécute et rapporte la complétion
5. CHASM coordonne les machines à états multiples

---

### 5. Cloud API - Zero-Knowledge Sync

```mermaid
graph TB
    subgraph "NestJS Modules"
        Auth[Auth Module<br/>JWT + Roles]
        Sync[Sync Module<br/>E2EE Data]
        Workflow[Workflow Module<br/>State Storage]
        User[User Module<br/>Profiles]
    end

    subgraph "Security Layer"
        Encryption[Encryption Service]
        KeyMgmt[Key Management]
        Audit[Audit Log]
    end

    Auth --> Encryption
    Sync --> Encryption
    Workflow --> KeyMgmt
    User --> Audit

    Encryption --> PostgreSQL[(PostgreSQL<br/>Encrypted)]
    KeyMgmt --> PostgreSQL
    Audit --> PostgreSQL
```

**Flux de synchronisation :**
1. Les données sont chiffrées côté client avant envoi
2. Cloud API stocke les données chiffrées sans les déchiffrer
3. La synchronisation push notifie les autres appareils
4. Chaque appareil déchiffre localement avec ses clés

---

## 🔄 Flux de Données Complets

### Scénario : Exécution d'un Workflow AI

```mermaid
sequenceDiagram
    autonumber
    participant U as Utilisateur
    participant D as Desktop App
    participant N as Genesis Nexus
    participant T as Genesis Temporal
    participant I as igon7 Engine
    participant C as Clisis Agent
    participant CA as Cloud API
    participant M as Mobile App

    U->>D: "Exécute le workflow AI"
    D->>N: Requête d'exécution (A2A)
    N->>N: Analyse sémantique + routage
    N->>T: StartWorkflowExecution(DAG)
    T->>T: Crée état + history events
    T->>I: Workflow Task (polling)
    I->>I: Exécute noeud DAG #1
    I->>C: System call (via Guardian)
    C->>C: Validation + sandbox
    C-->>I: Résultat
    I->>I: Exécute noeud DAG #2
    I-->>T: Workflow Task Completed
    T->>T: Update state + visibility
    T->>CA: Sync état (E2EE)
    CA->>CA: Persist + push notification
    CA->>M: Notification push
    M->>CA: Récupère état synchronisé
    CA-->>M: État chiffré
    M->>M: Déchiffre + affiche
    T-->>N: Workflow completed
    N-->>D: Résultat final
    D-->>U: Affiche résultat
```

---

## 🛡️ Architecture de Sécurité

### Modèle de Confiance Zéro

```mermaid
graph TB
    subgraph "Couches de Défense"
        L1[Couche 1 : Authentification<br/>JWT + MFA]
        L2[Couche 2 : Autorisation<br/>RBAC + Permissions]
        L3[Couche 3 : Validation<br/>Guardian Layer]
        L4[Couche 4 : Isolation<br/>Sandbox Execution]
        L5[Couche 5 : Chiffrement<br/>E2EE + Blind-Key]
    end

    L1 --> L2
    L2 --> L3
    L3 --> L4
    L4 --> L5
```

### Détail des Couches

| Couche | Mécanisme | Protection |
|--------|-----------|------------|
| **L1** | JWT + MFA | Authentification forte des utilisateurs |
| **L2** | RBAC | Contrôle d'accès basé sur les rôles |
| **L3** | Guardian | Validation contextuelle des requêtes |
| **L4** | Sandbox | Isolation des processus agents |
| **L5** | E2EE | Chiffrement des données sensibles |

---

## 📊 Stratégies de Scaling

### Scaling Horizontal

```mermaid
graph LR
    subgraph "Load Balancer"
        LB[Traffic Manager]
    end

    subgraph "Nexus Cluster"
        N1[Nexus Node 1]
        N2[Nexus Node 2]
        N3[Nexus Node 3]
    end

    subgraph "Temporal Cluster"
        T1[Temporal Shard 1-4]
        T2[Temporal Shard 5-8]
        T3[Temporal Shard 9-12]
    end

    subgraph "Cloud API"
        CA1[API Node 1]
        CA2[API Node 2]
    end

    LB --> N1
    LB --> N2
    LB --> N3

    N1 --> T1
    N2 --> T2
    N3 --> T3

    T1 --> CA1
    T2 --> CA2
    T3 --> CA1
```

### Points de Scaling

1. **Nexus** : Partitionnement par namespace d'agents
2. **Temporal** : Augmentation des shards (défaut: 4, max: 128+)
3. **Cloud API** : Réplication PostgreSQL + read replicas
4. **igon7** : Workers distribués sur plusieurs noeuds

---

## 🔧 Points d'Intégration

### APIs Exposées

| Projet | API | Protocole | Port |
|--------|-----|-----------|------|
| **Nexus** | A2A Protocol | WebSocket/gRPC | 8080/9090 |
| **Temporal** | Workflow API | gRPC/HTTP | 7233/7243 |
| **Cloud API** | REST API | HTTPS | 3000 |
| **Marketplace** | Blockchain RPC | JSON-RPC | 8545 |
| **Desktop** | IPC Local | Unix Socket/Named Pipe | - |

### SDK Disponibles

- **TypeScript SDK** : Généré depuis OpenAPI (Cloud API)
- **Go SDK** : Temporal client natif
- **Deno SDK** : Wrapper pour A2A Protocol
- **Python SDK** : En développement

---

## 🎯 Décisions Architecturales Clés

### 1. Pourquoi Deno pour igon7 et Nexus ?

- **Sécurité native** : Permissions explicites (fs, net, env)
- **TypeScript first** : Typage fort sans configuration
- **Module URL** : Imports directs depuis CDN
- **Runtime moderne** : Top-level await, ES modules

### 2. Pourquoi Go pour Temporal ?

- **Performance** : Compilation native, goroutines légères
- **Écosystème Temporal** : Serveur de référence en Go
- **Concurrency** : Modèle CSP idéal pour workflows
- **Stabilité** : ABI stable, déploiement simple

### 3. Pourquoi NestJS pour Cloud API ?

- **Architecture modulaire** : Injection de dépendances
- **TypeScript** : Typage end-to-end
- **Écosystème** : Guards, interceptors, pipes intégrés
- **Scalabilité** : Utilisable avec microservices

### 4. Pourquoi Electron pour Desktop ?

- **Cross-platform** : Code unique pour Windows/macOS/Linux
- **Intégration Nexus** : Embedding direct du runtime Deno
- **UI riche** : React + Vite pour performances
- **IPC sécurisé** : Isolation main/renderer processes

---

## 📈 Évolution Future

### Roadmap Architecturale

```mermaid
gantt
    title Évolution de l'Architecture Genesis
    dateFormat YYYY-MM
    section Core
    Nexus v1 :done, n1, 2024-01, 2024-06
    igon7 v1 :done, i1, 2024-02, 2024-07
    Temporal CHASM :active, t1, 2024-06, 2024-12
    section Extensions
    Marketplace Beta :m1, 2024-09, 2025-03
    Mobile App v1 :2024-10, 2025-04
    section Infrastructure
    Kubernetes Native :2025-01, 2025-06
    Multi-Cloud Sync :2025-03, 2025-09
```

---

## 📚 Références

- [Documentation igon7](./igon7-engine/overview)
- [Documentation Nexus](./genesis-nexus/overview)
- [Documentation Temporal](./genesis-temporal/overview)
- [Design System](https://github.com/genesisAI4/genesis-core/blob/main/DESIGN_SYSTEM.md)
- [AGENTS.md](https://github.com/genesisAI4/genesis_deno/blob/main/AGENTS.md)
