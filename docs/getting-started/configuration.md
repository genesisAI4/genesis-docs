---
sidebar_position: 3
---

# Configuration

Guide de configuration de Genesis AI pour votre environnement.

---

## 📁 Structure des Fichiers de Configuration

Chaque projet Genesis a son propre fichier de configuration :

```
genesis_deno/
├── .env.example              # Template d'environnement global
├── igon7_deno/
│   └── .env                  # Configuration igon7
├── genesis-nexus/
│   └── deno.json             # Configuration Deno
├── genesis-cloud-api/
│   ├── .env.example
│   └── .env                  # Configuration NestJS
├── genesis-temporal/
│   └── config/
│       └── development.yaml  # Configuration Temporal
└── genesis-desktop/
    └── .env                  # Configuration Electron
```

---

## 🔑 Variables d'Environnement Globales

Copiez `.env.example` vers `.env` et configurez :

```bash
# .env
# Genesis AI - Global Configuration

# Nexus
NEXUS_URL=http://localhost:8080
NEXUS_WS_URL=ws://localhost:8080/ws

# Temporal
TEMPORAL_ADDRESS=localhost:7233
TEMPORAL_NAMESPACE=genesis

# Cloud API
CLOUD_API_URL=http://localhost:3000
CLOUD_API_WS_URL=ws://localhost:3000/ws

# Encryption (générer une clé unique)
ENCRYPTION_KEY=<your-master-key>

# Database (Cloud API)
DATABASE_URL=postgresql://temporal:temporal@localhost:5432/genesis

# Redis (Cache)
REDIS_URL=redis://localhost:6379

# JWT Secret
JWT_SECRET=<your-jwt-secret>
```

---

## ⚙️ Configuration par Projet

### igon7 Engine

```typescript
// igon7_deno/.env
DENO_DEPLOYMENT_ID=local
TEMPORAL_ADDRESS=localhost:7233
TEMPORAL_NAMESPACE=genesis
TASK_QUEUE=igon7-workflows
LOG_LEVEL=info
```

### Genesis Nexus

```json
// genesis-nexus/deno.json
{
  "tasks": {
    "dev": "deno run --watch --allow-all src/main.ts"
  },
  "env": {
    "A2A_PORT": "8080",
    "STATE_SYNC_ENABLED": "true",
    "AGENT_REGISTRY_PATH": "./data/agents.json"
  }
}
```

### Cloud API

```bash
# genesis-cloud-api/.env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://temporal:temporal@localhost:5432/genesis
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key-change-in-production
ENCRYPTION_ALGORITHM=aes-256-gcm
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
```

### Genesis Temporal

```yaml
# genesis-temporal/config/development.yaml
log:
  level: debug
  format: json

persistence:
  defaultStore:
    pluginName: sqlite
    databaseName: /tmp/genesis-temporal.db

services:
  frontend:
    grpcPort: 7233
    httpPort: 7243
  history:
    grpcPort: 7234
  matching:
    grpcPort: 7235
  worker:
    grpcPort: 7239
```

### Desktop

```bash
# genesis-desktop/.env
NODE_ENV=development
VITE_NEXUS_URL=http://localhost:8080
VITE_CLOUD_API_URL=http://localhost:3000
VITE_SENTRY_DSN=your-sentry-dsn
```

---

## 🔐 Génération des Clés

### Clé de Chiffrement

```bash
# Générer une clé AES-256
openssl rand -hex 32

# Ou avec Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### JWT Secret

```bash
# Générer un secret JWT
openssl rand -base64 64
```

### Clés X25519 (E2EE)

```typescript
// Avec Web Crypto API
const keyPair = await crypto.subtle.generateKey(
  { name: 'X25519' },
  true,
  ['deriveKey']
);

const exported = await crypto.subtle.exportKey('spki', keyPair.publicKey);
console.log(btoa(String.fromCharCode(...new Uint8Array(exported))));
```

---

## 🧪 Validation de Configuration

```bash
# Script de validation
cd genesis_deno
./scripts/validate-config.sh

# Doit afficher :
# ✅ .env files present
# ✅ All required variables set
# ✅ Database connection OK
# ✅ Redis connection OK
# ✅ Temporal connection OK
# ✅ Configuration valid
```

---

## 🌍 Variables de Production

Pour la production, configurez ces variables supplémentaires :

```bash
# Production
NODE_ENV=production
LOG_LEVEL=warn

# SSL/TLS
SSL_CERT_PATH=/path/to/cert.pem
SSL_KEY_PATH=/path/to/key.pem

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=60000

# Monitoring
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
PROMETHEUS_ENABLED=true
GRAFANA_URL=https://grafana.example.com

# Alerts
PAGERDUTY_KEY=your-pagerduty-key
SLACK_WEBHOOK_URL=https://hooks.slack.com/xxx
```

---

## 📚 Suite

- [Premier Workflow](./getting-started/first-workflow)
- [API Reference](../api-reference/overview)

---

**Temps estimé :** 15 minutes  
**Difficulté :** Intermédiaire
