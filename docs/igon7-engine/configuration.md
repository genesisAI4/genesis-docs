---
sidebar_position: 4
---

# igon7 Engine - Configuration

Guide de configuration avancée d'igon7 Engine.

---

## 📁 Structure de configuration

```
igon7_deno/
├── deno.json              # Configuration principale
├── deno.lock              # Lockfile des dépendances
├── pnpm-workspace.yaml    # Configuration workspace
├── turbo.json             # Configuration Turborepo
├── tsconfig.json          # Configuration TypeScript
├── .env                   # Variables d'environnement
├── .env.local             # Variables locales (non versionnées)
└── packages/
    ├── core/
    │   └── deno.json
    ├── dag-builder/
    │   └── deno.json
    └── ...
```

---

## ⚙️ deno.json

### Configuration de base

```json
{
  "name": "@igon7/engine",
  "version": "1.0.0",
  "workspace": [
    "./packages/@n8n",
    "./packages/workflow",
    "./packages/nodes-base"
  ],
  
  "tasks": {
    "dev": "deno task dev:all",
    "dev:all": "pnpm dev",
    "dev:core": "deno run --watch --allow-all packages/core/main.ts",
    "dev:executor": "deno run --watch --allow-all packages/executor/main.ts",
    
    "build": "turbo build",
    "build:core": "deno compile --output dist/core packages/core/main.ts",
    
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    
    "lint": "deno lint",
    "lint:fix": "deno lint --fix",
    
    "fmt": "deno fmt",
    "fmt:check": "deno fmt --check",
    
    "check": "deno check **/*.ts",
    
    "clean": "rm -rf dist node_modules .turbo"
  },
  
  "imports": {
    "@igon7/core": "./packages/core/mod.ts",
    "@igon7/dag-builder": "./packages/dag-builder/mod.ts",
    "@igon7/executor": "./packages/executor/mod.ts",
    "@igon7/monitor": "./packages/monitor/mod.ts",
    "@igon7/sdk": "./packages/sdk/mod.ts",
    "@igon7/testing": "./packages/testing/mod.ts",
    "@igon7/shared": "./packages/shared/mod.ts",
    
    "postgres": "npm:postgres@^3.4.4",
    "ioredis": "npm:ioredis@^5.3.2",
    "bull": "npm:bull@^4.12.0",
    "async-mutex": "npm:async-mutex@^0.5.0",
    
    "@std/assert": "jsr:@std/assert@^1.0.0",
    "@std/testing": "jsr:@std/testing@^1.0.0",
    "@std/path": "jsr:@std/path@^1.0.0",
    "@std/fs": "jsr:@std/fs@^1.0.0"
  },
  
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  
  "lint": {
    "include": ["src/", "packages/"],
    "exclude": ["node_modules/", "dist/", "coverage/"],
    "rules": {
      "tags": ["recommended"],
      "include": ["ban-untagged-todo"],
      "exclude": ["no-unused-vars"]
    }
  },
  
  "fmt": {
    "include": ["src/", "packages/"],
    "exclude": ["node_modules/", "dist/", "coverage/"],
    "lineWidth": 100,
    "indentWidth": 2,
    "singleQuote": true,
    "proseWrap": "preserve"
  }
}
```

---

## 🗂️ pnpm-workspace.yaml

```yaml
packages:
  # Packages principaux
  - 'packages/core'
  - 'packages/dag-builder'
  - 'packages/executor'
  - 'packages/monitor'
  - 'packages/sdk'
  - 'packages/testing'
  - 'packages/shared'
  
  # Packages n8n
  - 'packages/@n8n/*'
  
  # Nodes de base
  - 'packages/nodes-base'
  
  # Extensions
  - 'packages/extensions/*'
  
  # Exclure
  - '!**/test/**'
  - '!**/dist/**'
  - '!**/node_modules/**'
```

---

## 🔄 turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [
    "**/.env.*local",
    "deno.json",
    "pnpm-workspace.yaml"
  ],
  "globalEnv": [
    "TEMPORAL_ADDRESS",
    "TEMPORAL_NAMESPACE",
    "DATABASE_URL",
    "REDIS_URL",
    "LOG_LEVEL",
    "NODE_ENV"
  ],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": [
        "src/**/*.ts",
        "deno.json",
        "package.json"
      ],
      "outputs": [
        "dist/**",
        ".turbo/**"
      ],
      "cache": true
    },
    
    "test": {
      "dependsOn": ["build"],
      "inputs": [
        "src/**/*.ts",
        "test/**/*.ts",
        "vitest.config.ts"
      ],
      "outputs": [
        "coverage/**"
      ],
      "cache": true
    },
    
    "lint": {
      "inputs": [
        "src/**/*.ts"
      ],
      "cache": true
    },
    
    "dev": {
      "cache": false,
      "persistent": true
    },
    
    "clean": {
      "cache": false
    }
  }
}
```

---

## 📘 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "allowJs": true,
    
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "inlineSources": true,
    
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    
    "baseUrl": ".",
    "paths": {
      "@igon7/core": ["packages/core/mod.ts"],
      "@igon7/dag-builder": ["packages/dag-builder/mod.ts"],
      "@igon7/executor": ["packages/executor/mod.ts"],
      "@igon7/monitor": ["packages/monitor/mod.ts"],
      "@igon7/sdk": ["packages/sdk/mod.ts"],
      "@igon7/testing": ["packages/testing/mod.ts"],
      "@igon7/shared": ["packages/shared/mod.ts"]
    },
    
    "types": ["vitest/globals"]
  },
  "include": [
    "src/**/*",
    "packages/**/*",
    "scripts/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "coverage",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

---

## 🔐 Variables d'environnement

### .env.example

```bash
# ===========================================
# IGON7 ENGINE - Environment Configuration
# ===========================================

# -------------------------------------------
# Temporal Configuration
# -------------------------------------------
TEMPORAL_ADDRESS=localhost:7233
TEMPORAL_NAMESPACE=genesis
TEMPORAL_TASK_QUEUE=igon7-workflows
TEMPORAL_API_KEY=

# TLS pour Temporal (production)
TEMPORAL_TLS_ENABLED=false
TEMPORAL_TLS_CA_FILE=
TEMPORAL_TLS_CERT_FILE=
TEMPORAL_TLS_KEY_FILE=

# -------------------------------------------
# Database Configuration
# -------------------------------------------
DATABASE_URL=postgresql://user:password@localhost:5432/igon7
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
DATABASE_STATEMENT_TIMEOUT=30000

# -------------------------------------------
# Redis Configuration
# -------------------------------------------
REDIS_URL=redis://localhost:6379
REDIS_PREFIX=igon7:
REDIS_CACHE_TTL=3600

# -------------------------------------------
# Cloud API Configuration
# -------------------------------------------
CLOUD_API_URL=https://api.genesisai.io
CLOUD_API_KEY=your-api-key
CLOUD_API_WS_URL=wss://api.genesisai.io/ws

# -------------------------------------------
# Monitoring & Observability
# -------------------------------------------
PROMETHEUS_ENABLED=true
PROMETHEUS_PORT=9090
PROMETHEUS_PATH=/metrics

OTEL_ENABLED=false
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
OTEL_SERVICE_NAME=igon7-engine

# -------------------------------------------
# Logging Configuration
# -------------------------------------------
LOG_LEVEL=info
LOG_FORMAT=json
LOG_OUTPUT=stdout
LOG_FILE_PATH=/var/log/igon7/engine.log

# -------------------------------------------
# Security Configuration
# -------------------------------------------
ENCRYPTION_KEY=your-32-character-encryption-key
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=1h

# -------------------------------------------
# Performance Tuning
# -------------------------------------------
MAX_CONCURRENT_WORKFLOWS=100
MAX_CONCURRENT_NODES_PER_WORKFLOW=50
DEFAULT_WORKFLOW_TIMEOUT=300000
DEFAULT_NODE_TIMEOUT=60000

# -------------------------------------------
# Retry Configuration
# -------------------------------------------
DEFAULT_RETRY_MAX_ATTEMPTS=3
DEFAULT_RETRY_INITIAL_INTERVAL=1000
DEFAULT_RETRY_BACKOFF_COEFFICIENT=2
DEFAULT_RETRY_MAX_INTERVAL=30000

# -------------------------------------------
# Cache Configuration
# -------------------------------------------
CACHE_ENABLED=true
CACHE_TYPE=redis
CACHE_TTL=3600
CACHE_MAX_SIZE=1000

# -------------------------------------------
# Feature Flags
# -------------------------------------------
FEATURE_PARALLEL_EXECUTION=true
FEATURE_CACHING=true
FEATURE_RETRY_LOGIC=true
FEATURE_MONITORING=true
```

---

## 🎯 Configuration par package

### packages/core/deno.json

```json
{
  "name": "@igon7/core",
  "version": "1.0.0",
  "exports": "./mod.ts",
  "imports": {
    "@igon7/shared": "../shared/mod.ts"
  }
}
```

### packages/executor/deno.json

```json
{
  "name": "@igon7/executor",
  "version": "1.0.0",
  "exports": "./mod.ts",
  "imports": {
    "@igon7/core": "../core/mod.ts",
    "@igon7/shared": "../shared/mod.ts",
    "temporal": "npm:@temporalio/client@^1.0.0"
  }
}
```

---

## 🔧 Configuration avancée

### Configuration du Workflow Executor

```typescript
// packages/executor/config.ts
export interface ExecutorConfig {
  // Temporal
  temporal: {
    address: string;
    namespace: string;
    taskQueue: string;
    connection: {
      tls?: boolean;
      metadata?: Record<string, string>;
    };
  };
  
  // Performance
  performance: {
    maxConcurrentWorkflows: number;
    maxConcurrentNodesPerWorkflow: number;
    defaultTimeout: number;
  };
  
  // Retry
  retry: {
    maxAttempts: number;
    initialInterval: number;
    backoffCoefficient: number;
    maxInterval: number;
  };
  
  // Cache
  cache: {
    enabled: boolean;
    type: 'memory' | 'redis';
    ttl: number;
    maxSize: number;
  };
}

export const defaultConfig: ExecutorConfig = {
  temporal: {
    address: Deno.env.get('TEMPORAL_ADDRESS') || 'localhost:7233',
    namespace: Deno.env.get('TEMPORAL_NAMESPACE') || 'genesis',
    taskQueue: Deno.env.get('TEMPORAL_TASK_QUEUE') || 'igon7-workflows',
    connection: {
      tls: Deno.env.get('TEMPORAL_TLS_ENABLED') === 'true',
    },
  },
  performance: {
    maxConcurrentWorkflows: parseInt(Deno.env.get('MAX_CONCURRENT_WORKFLOWS') || '100'),
    maxConcurrentNodesPerWorkflow: parseInt(Deno.env.get('MAX_CONCURRENT_NODES_PER_WORKFLOW') || '50'),
    defaultTimeout: parseInt(Deno.env.get('DEFAULT_WORKFLOW_TIMEOUT') || '300000'),
  },
  retry: {
    maxAttempts: parseInt(Deno.env.get('DEFAULT_RETRY_MAX_ATTEMPTS') || '3'),
    initialInterval: parseInt(Deno.env.get('DEFAULT_RETRY_INITIAL_INTERVAL') || '1000'),
    backoffCoefficient: parseFloat(Deno.env.get('DEFAULT_RETRY_BACKOFF_COEFFICIENT') || '2'),
    maxInterval: parseInt(Deno.env.get('DEFAULT_RETRY_MAX_INTERVAL') || '30000'),
  },
  cache: {
    enabled: Deno.env.get('CACHE_ENABLED') !== 'false',
    type: (Deno.env.get('CACHE_TYPE') as 'memory' | 'redis') || 'redis',
    ttl: parseInt(Deno.env.get('CACHE_TTL') || '3600'),
    maxSize: parseInt(Deno.env.get('CACHE_MAX_SIZE') || '1000'),
  },
};
```

---

## 📚 Références

- [Installation](./igon7-engine/installation)
- [Architecture](./igon7-engine/architecture)
- [API Reference](./igon7-engine/api-reference)

---

**Temps estimé :** 20 minutes  
**Difficulté :** Intermédiaire
