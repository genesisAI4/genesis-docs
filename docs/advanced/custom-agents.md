---
sidebar_position: 4
---

# Custom Agents

Créer et intégrer des agents personnalisés.

---

## 🤖 Types d'Agents

### 1. Agent Simple

```typescript
import { Agent } from '@genesis/nexus';

class SimpleAgent extends Agent {
  async execute(input: any): Promise<any> {
    // Logique de l'agent
    return { result: 'done' };
  }
}
```

### 2. Agent avec Outils

```typescript
class ToolAgent extends Agent {
  tools = [
    {
      name: 'search',
      fn: async (query: string) => {
        return await search(query);
      }
    },
    {
      name: 'calculate',
      fn: async (expression: string) => {
        return eval(expression);
      }
    }
  ];
  
  async execute(input: any): Promise<any> {
    const tool = this.tools.find(t => t.name === input.tool);
    return await tool.fn(input.params);
  }
}
```

### 3. Agent avec Mémoire

```typescript
class MemoryAgent extends Agent {
  private memory = new Map<string, any>();
  
  async execute(input: any): Promise<any> {
    // Utiliser la mémoire
    const context = this.memory.get(input.sessionId);
    
    // Mettre à jour la mémoire
    this.memory.set(input.sessionId, {
      ...context,
      lastInput: input,
    });
    
    return { result: 'done' };
  }
}
```

---

## 🔌 Intégration MCP

```typescript
import { MCPClient } from '@genesis/mcp';

class MCPAgent extends Agent {
  private mcp: MCPClient;
  
  constructor(config: MCPConfig) {
    super();
    this.mcp = new MCPClient(config);
  }
  
  async execute(input: any): Promise<any> {
    // Appeler un outil MCP
    const result = await this.mcp.callTool({
      name: input.tool,
      arguments: input.params,
    });
    
    return result;
  }
}
```

---

## 📦 Enregistrement

```typescript
// Enregistrer l'agent
await nexus.registerAgent({
  id: 'my-custom-agent',
  type: 'custom',
  capabilities: ['search', 'calculate'],
  handler: new CustomAgent(),
});
```

---

## ✅ Best Practices

1. **Isolation** : Chaque agent dans son propre contexte
2. **Timeout** : Limiter la durée d'exécution
3. **Retry** : Gérer les échecs
4. **Logging** : Tracker les exécutions
5. **Monitoring** : Métriques par agent

---

**Version :** 1.0.0  
**Niveau :** Avancé
