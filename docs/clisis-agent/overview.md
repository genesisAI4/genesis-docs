---
sidebar_position: 1
---

# Clisis Agent - Vue d'ensemble

**Clisis Agent** est l'agent système de Genesis AI, responsable de l'interaction avec le système d'exploitation, le matériel, et l'exécution sandboxée de tâches.

---

## 🛡️ Rôle de Clisis

Clisis agit comme un **pont sécurisé** entre les agents AI et le système :
- **Contrôle système** : Fichiers, processus, réseau, hardware
- **Exécution sandboxée** : Isolation des tâches non fiables
- **Guardian Layer** : Validation de sécurité avant exécution
- **Audit** : Journalisation immuable de toutes les actions

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph "Interfaces"
        Nexus[Genesis Nexus]
        Igon7[igon7 Engine]
        User[Utilisateur]
    end

    subgraph "Clisis Core"
        Guardian[Guardian Layer<br/>Security Validation]
        Modules[System Modules]
        Sandbox[Sandbox Executor<br/>Deno Permissions]
        Audit[Security Audit<br/>Immutable Logs]
    end

    subgraph "System Modules"
        FS[File System]
        Process[Process Control]
        Network[Network Access]
        Hardware[Hardware Info]
        Registry[Registry (Windows)]
    end

    Nexus --> Guardian
    Igon7 --> Guardian
    User --> Guardian

    Guardian --> Modules
    Guardian --> Sandbox
    Guardian --> Audit

    Modules --> FS
    Modules --> Process
    Modules --> Network
    Modules --> Hardware
    Modules --> Registry

    Sandbox --> FS
    Sandbox --> Process
    Sandbox --> Network

    Audit --> CloudAPI[Cloud API]
```

---

## 🔒 Guardian Layer

### Validation de Sécurité

```typescript
import { Guardian } from "./guardian.ts";

const guardian = new Guardian({
  policies: await loadSecurityPolicies(),
  riskThreshold: 0.8,
  auditEnabled: true,
});

// Intercepter une requête
const request: SystemRequest = {
  type: "FILE_READ",
  path: "/home/user/sensitive.txt",
  context: {
    agentId: "data-analyst",
    userId: "alice",
    purpose: "Analyzing user data",
  },
};

// Validation
const validation = await guardian.validate(request);

if (!validation.approved) {
  console.error("Request blocked:", validation.reason);
  // → "Access to sensitive files requires explicit user consent"
} else {
  // Exécuter avec audit
  const result = await guardian.execute(request);
  await guardian.audit(request, result);
}
```

### Risk Assessment

```typescript
interface RiskAssessment {
  calculate(request: SystemRequest): RiskScore;
}

class RiskScorer implements RiskAssessment {
  calculate(request: SystemRequest): RiskScore {
    let score = 0;
    
    // Base score par type de requête
    const baseScores: Record<string, number> = {
      FILE_READ: 0.2,
      FILE_WRITE: 0.4,
      PROCESS_EXECUTE: 0.6,
      NETWORK_REQUEST: 0.3,
      HARDWARE_ACCESS: 0.5,
    };
    
    score += baseScores[request.type] || 0.5;
    
    // Modifiers
    if (this.isSensitivePath(request.path)) {
      score += 0.3;
    }
    
    if (this.isOutsideBusinessHours()) {
      score += 0.1;
    }
    
    if (this.isNewLocation(request.context.ipAddress)) {
      score += 0.2;
    }
    
    if (request.context.agentTrustScore < 0.8) {
      score += 0.2;
    }
    
    return {
      score: Math.min(score, 1.0),
      level: this.getRiskLevel(score),
    };
  }
  
  private getRiskLevel(score: number): RiskLevel {
    if (score >= 0.8) return "CRITICAL";
    if (score >= 0.6) return "HIGH";
    if (score >= 0.4) return "MEDIUM";
    return "LOW";
  }
}
```

---

## 📦 System Modules

### File System Module

```typescript
import { FileSystemModule } from "./modules/file-system.ts";

const fs = new FileSystemModule({
  allowedPaths: ["/home/user", "/tmp"],
  deniedPaths: ["/etc", "/root", "/var"],
  maxFileSize: 100 * 1024 * 1024, // 100MB
  auditAll: true,
});

// Lecture sécurisée
const content = await fs.readFile("/home/user/data.txt", {
  encoding: "utf-8",
  validate: true, // Vérifie les permissions
  audit: true,    // Journalise l'action
});

// Écriture avec validation
await fs.writeFile("/tmp/output.json", data, {
  validate: true,
  constraints: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedExtensions: [".json", ".txt"],
  },
});

// Watch avec permissions
const watcher = await fs.watch("/home/user/project", {
  recursive: true,
  events: ["change", "create", "remove"],
  callback: async (event, path) => {
    console.log(`File ${event}: ${path}`);
  },
});
```

### Process Control Module

```typescript
import { ProcessModule } from "./modules/process.ts";

const proc = new ProcessModule({
  allowedCommands: ["git", "npm", "deno", "node"],
  deniedCommands: ["rm", "sudo", "curl", "wget"],
  environmentWhitelist: ["NODE_ENV", "PATH"],
  maxCpuPercent: 50,
  maxMemoryMB: 1024,
});

// Exécution avec contraintes
const result = await proc.execute("git", ["status"], {
  cwd: "/home/user/project",
  timeout: 30000,
  constraints: {
    network: false,      // Pas d'accès réseau
    filesystem: "readonly", // Lecture seule
  },
});

console.log(result.stdout);
console.error(result.stderr);
console.log(`Exit code: ${result.exitCode}`);

// Spawn avec monitoring
const child = await proc.spawn("deno", ["task", "dev"], {
  monitoring: {
    cpu: { maxPercent: 30, alertThreshold: 25 },
    memory: { maxMB: 512, alertThreshold: 400 },
    duration: { maxMs: 300000, alertThreshold: 240000 },
  },
  onViolation: (violation) => {
    console.warn("Resource violation:", violation);
    child.kill();
  },
});
```

### Network Module

```typescript
import { NetworkModule } from "./modules/network.ts";

const net = new NetworkModule({
  allowlist: [
    "api.github.com",
    "api.openai.com",
    "localhost",
  ],
  denylist: [
    "169.254.169.254", // Cloud metadata
    "*.malware.com",
  ],
  maxConcurrentConnections: 10,
  maxBandwidthMbps: 10,
});

// Requête HTTP sécurisée
const response = await net.fetch("https://api.github.com/repos/genesisAI4/genesis_deno", {
  method: "GET",
  headers: { "Accept": "application/vnd.github.v3+json" },
  timeout: 10000,
  validate: true,
});

// WebSocket avec monitoring
const ws = await net.websocket("wss://nexus.genesisai.io/stream", {
  monitoring: {
    maxMessageSize: 1024 * 1024, // 1MB
    maxMessagesPerSecond: 100,
  },
  onMessage: (data) => {
    console.log("Received:", data);
  },
  onError: (error) => {
    console.error("WebSocket error:", error);
  },
});
```

---

## 📊 Sandboxed Execution

### Deno Permissions

```typescript
import { SandboxExecutor } from "./sandbox.ts";

const sandbox = new SandboxExecutor({
  permissions: {
    read: ["/home/user/project", "/tmp"],
    write: ["/tmp"],
    net: ["api.github.com", "api.openai.com"],
    env: ["OPENAI_API_KEY", "NODE_ENV"],
    run: ["git", "npm"],
  },
  resources: {
    maxCpuPercent: 50,
    maxMemoryMB: 1024,
    maxDurationMs: 300000,
  },
});

// Exécuter du code dans la sandbox
const code = `
  const data = await Deno.readFile("/home/user/data.txt");
  const result = await processWithAI(data);
  await Deno.writeFile("/tmp/result.json", result);
  return { success: true };
`;

const result = await sandbox.execute(code, {
  entryPoint: "main.ts",
  dependencies: ["@std/fs", "@genesis/ai"],
  timeout: 60000,
  
  onResourceViolation: (violation) => {
    console.warn("Resource violation:", violation);
  },
  
  onPermissionDenied: (denied) => {
    console.error("Permission denied:", denied);
  },
});
```

### Isolation Levels

```typescript
enum IsolationLevel {
  FULL = "full",           // Toutes permissions
  RESTRICTED = "restricted", // Permissions limitées
  SANDBOX = "sandbox",     // Permissions minimales
  ISOLATED = "isolated",   // Processus séparé
}

interface SandboxConfig {
  level: IsolationLevel;
  permissions: Permissions;
  resources: ResourceLimits;
  monitoring: MonitoringConfig;
}

const configs: Record<IsolationLevel, SandboxConfig> = {
  [IsolationLevel.FULL]: {
    level: "full",
    permissions: { read: ["/"], write: ["/"], net: ["*"], run: ["*"] },
    resources: { maxCpuPercent: 100, maxMemoryMB: 4096 },
    monitoring: { enabled: true, level: "minimal" },
  },
  [IsolationLevel.RESTRICTED]: {
    level: "restricted",
    permissions: { read: ["/home"], write: ["/tmp"], net: ["api.*"], run: ["git", "npm"] },
    resources: { maxCpuPercent: 50, maxMemoryMB: 2048 },
    monitoring: { enabled: true, level: "standard" },
  },
  [IsolationLevel.SANDBOX]: {
    level: "sandbox",
    permissions: { read: ["/tmp"], write: ["/tmp"], net: [], run: [] },
    resources: { maxCpuPercent: 25, maxMemoryMB: 512 },
    monitoring: { enabled: true, level: "strict" },
  },
  [IsolationLevel.ISOLATED]: {
    level: "isolated",
    permissions: { read: [], write: [], net: [], run: [] },
    resources: { maxCpuPercent: 10, maxMemoryMB: 256 },
    monitoring: { enabled: true, level: "maximum" },
    isolatedProcess: true,
  },
};
```

---

## 📋 Audit Logging

### Immutable Logs

```typescript
import { AuditLogger } from "./audit.ts";
import { hash, verify } from "@std/crypto/sha256";

class AuditLogger {
  private previousHash = "0".repeat(64);
  
  async log(action: AuditAction): Promise<void> {
    const logEntry: AuditLog = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      actor: action.actor,
      action: action.type,
      resource: action.resource,
      outcome: action.outcome,
      riskScore: action.riskScore,
      previousHash: this.previousHash,
    };
    
    // Calculer le hash de ce log
    const logHash = await hash(JSON.stringify(logEntry));
    logEntry.hash = logHash;
    logEntry.signature = await this.sign(logHash);
    
    // Persister
    await this.persist(logEntry);
    
    // Mettre à jour pour le prochain log
    this.previousHash = logHash;
  }
  
  private async sign(data: string): Promise<string> {
    // Signature avec clé privée
    const signature = await sign(this.privateKey, new TextEncoder().encode(data));
    return bytesToBase64(signature);
  }
  
  async verifyChain(): Promise<boolean> {
    const logs = await this.loadAll();
    
    for (let i = 1; i < logs.length; i++) {
      const current = logs[i];
      const previous = logs[i - 1];
      
      if (current.previousHash !== previous.hash) {
        return false; // Chaîne brisée
      }
      
      const valid = await this.verifySignature(current);
      if (!valid) return false;
    }
    
    return true;
  }
}
```

---

## 📚 Références

- [Intégration système](./clisis-agent/system-integration)
- [Guardian Layer](./clisis-agent/guardian-layer)
- [Sandboxed execution](./clisis-agent/sandboxed-execution)
- [Accès hardware](./clisis-agent/hardware-access)
- [Sécurité](./clisis-agent/security)

---

**Version :** 1.0.0  
**Runtime :** Deno 1.40+  
**Sécurité :** Guardian Layer v1.0
