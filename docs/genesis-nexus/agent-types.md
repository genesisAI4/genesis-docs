---
sidebar_position: 4
---

# Genesis Nexus - Agent Types

Documentation complète de tous les types d'agents supportés par Nexus.

---

## 📊 Vue d'ensemble

Nexus supporte **7 types d'agents** principaux.

---

## 🧠 Agent Types

### 1. Nexus Agent

```typescript
interface NexusAgent {
  id: 'nexus';
  type: AgentType.NEXUS;
  capabilities: [
    'routing',
    'orchestration',
    'state-management',
    'a2a-protocol'
  ];
  config: {
    port: number;
    maxAgents: number;
    heartbeatInterval: number;
  };
}
```

### 2. igon7 Agent

```typescript
interface Igon7Agent {
  id: 'igon7';
  type: AgentType.IGON7;
  capabilities: [
    'workflow-execution',
    'dag-orchestration',
    'node-execution'
  ];
  config: {
    port: number;
    maxConcurrentWorkflows: number;
  };
}
```

### 3. Clisis Agent

```typescript
interface ClisisAgent {
  id: 'clisis';
  type: AgentType.CLISIS;
  capabilities: [
    'system-access',
    'file-operations',
    'process-control',
    'guardian-layer'
  ];
  config: {
    port: number;
    sandboxEnabled: boolean;
    securityLevel: 'low' | 'medium' | 'high';
  };
}
```

### 4. Mobile Agent

```typescript
interface MobileAgent {
  id: 'mobile';
  type: AgentType.MOBILE;
  capabilities: [
    'validation',
    'notifications',
    'remote-monitoring'
  ];
  config: {
    pushEnabled: boolean;
    biometricAuth: boolean;
  };
}
```

### 5. Desktop Agent

```typescript
interface DesktopAgent {
  id: 'desktop';
  type: AgentType.DESKTOP;
  capabilities: [
    'ui-interaction',
    'local-nexus',
    'file-management'
  ];
  config: {
    embeddedNexus: boolean;
    glassmorphismUI: boolean;
  };
}
```

### 6. Extension Agent

```typescript
interface ExtensionAgent {
  id: 'extension';
  type: AgentType.EXTENSION;
  capabilities: [
    'context-injection',
    'web-scraping',
    'bridge-protocol'
  ];
  config: {
    manifestVersion: 3;
    permissions: string[];
  };
}
```

### 7. MCP Agent

```typescript
interface MCPAgent {
  id: 'mcp';
  type: AgentType.MCP;
  capabilities: [
    'model-context',
    'tool-integration',
    'resource-access'
  ];
  config: {
    mcpServer: string;
    tools: string[];
  };
}
```

---

## 📋 Tableau récapitulatif

| Agent | Capabilities | Port | Protocol |
|-------|-------------|------|----------|
| **Nexus** | Routing, Orchestration | 8080 | WebSocket |
| **igon7** | Workflow Execution | 18791 | WebSocket |
| **Clisis** | System Access | 18792 | HTTP/WS |
| **Mobile** | Validation | - | REST/WS |
| **Desktop** | UI Interaction | 5173 | IPC |
| **Extension** | Context Injection | - | Bridge |
| **MCP** | Tool Integration | - | MCP |

---

**Version :** 1.0.0  
**Total Agent Types :** 7
