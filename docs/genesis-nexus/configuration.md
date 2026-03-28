---
sidebar_position: 3
---

# Genesis Nexus - Configuration

Guide de configuration avancée de Genesis Nexus.

---

## 📁 Structure de configuration

```
genesis-nexus/
├── deno.json
├── deno.lock
├── .env
├── .env.example
└── src/
    ├── config/
    │   ├── env.ts
    │   ├── constants.ts
    │   └── features.ts
    └── ...
```

---

## ⚙️ deno.json

```json
{
  "name": "@genesis/nexus",
  "version": "1.0.0",
  "workspace": ["./src/openclaw"],
  
  "tasks": {
    "start": "deno run --allow-all src/main.ts",
    "dev": "deno run --watch --allow-all src/main.ts",
    "sim": "deno run --allow-all src/genesis_personas_simulation.ts",
    "harvest": "deno run --allow-all src/brain/fabric-harvester.ts",
    "worker": "deno run --allow-all src/worker.ts",
    "chaos-test": "deno run --allow-all src/chaos_test.ts",
    "build": "deno run --allow-all scripts/build_release.ts",
    "migrate": "deno run --allow-all src/core/migrate.ts"
  },
  
  "imports": {
    "postgres": "npm:postgres@^3.4.4",
    "ioredis": "npm:ioredis@^5.3.2",
    "rate-limiter-flexible": "npm:rate-limiter-flexible@^5.0.0",
    "ws": "npm:ws@^8.18.0",
    "hmac": "npm:hmac@^0.2.0"
  },
  
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

---

## 🔐 Variables d'environnement

### .env.example complet

```bash
# ===========================================
# GENESIS NEXUS - Environment Configuration
# ===========================================

# -------------------------------------------
# Server Configuration
# -------------------------------------------
NEXUS_PORT=8080
NEXUS_HOST=0.0.0.0
CLAWX_LEGACY_PORT=18789
GENESIS_NEXUS_URL=ws://localhost:8080/ws

# -------------------------------------------
# Database Configuration
# -------------------------------------------
DATABASE_URL=postgres://user:password@localhost:5432/genesis
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
DATABASE_STATEMENT_TIMEOUT=30000

# -------------------------------------------
# Redis Configuration
# -------------------------------------------
REDIS_URL=redis://localhost:6379
REDIS_PREFIX=nexus:
REDIS_CACHE_TTL=3600

# -------------------------------------------
# Security Configuration
# -------------------------------------------
VAULT_SALT=random-salt-2026
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
ENCRYPTION_KEY=your-32-character-encryption-key
ENCRYPTION_ALGORITHM=aes-256-gcm

# -------------------------------------------
# Agent URLs
# -------------------------------------------
IGON7_URL=ws://localhost:18791
CLISIS_URL=ws://localhost:18792
TEMPORAL_ADDRESS=localhost:7233
CLOUD_API_URL=https://api.genesisai.io

# -------------------------------------------
# A2A Protocol Configuration
# -------------------------------------------
A2A_PROTOCOL_VERSION=1.0.0
A2A_HEARTBEAT_INTERVAL=30000
A2A_HEARTBEAT_TIMEOUT=90000
A2A_MESSAGE_RATE_LIMIT=100
A2A_RATE_LIMIT_WINDOW=1000

# -------------------------------------------
# Monitoring & Observability
# -------------------------------------------
PROMETHEUS_ENABLED=true
PROMETHEUS_PORT=9090
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
LOG_LEVEL=info
LOG_FORMAT=json

# -------------------------------------------
# Performance Tuning
# -------------------------------------------
MAX_CONCURRENT_AGENTS=100
MAX_CONNECTIONS=10000
MAX_CONNECTIONS_PER_IP=10
REQUEST_TIMEOUT=30000
```

---

## 🎯 Configuration A2A Protocol

```typescript
// src/protocols/a2a-protocol.ts
export interface A2AConfig {
  version: string;
  heartbeat: {
    interval: number;
    timeout: number;
  };
  rateLimit: {
    maxMessages: number;
    windowMs: number;
  };
  retry: {
    maxAttempts: number;
    initialInterval: number;
    backoffCoefficient: number;
  };
}

export const defaultA2AConfig: A2AConfig = {
  version: '1.0.0',
  heartbeat: {
    interval: 30000,
    timeout: 90000,
  },
  rateLimit: {
    maxMessages: 100,
    windowMS: 1000,
  },
  retry: {
    maxAttempts: 3,
    initialInterval: 1000,
    backoffCoefficient: 2,
  },
};
```

---

**Temps estimé :** 20 minutes  
**Difficulté :** Intermédiaire
