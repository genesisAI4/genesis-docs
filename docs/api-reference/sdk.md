---
sidebar_position: 6
---

# SDK

Documentation des SDKs Genesis AI.

---

## 📦 SDKs Disponibles

| Langage | Package | Status |
|---------|---------|--------|
| **TypeScript** | `@genesisai/sdk` | ✅ Officiel |
| **Python** | `genesis-ai` | ✅ Officiel |
| **Go** | `github.com/genesisAI4/sdk-go` | 🟡 Communautaire |

---

## 📘 TypeScript SDK

### Installation

```bash
npm install @genesisai/sdk
```

### Configuration

```typescript
import { GenesisClient } from '@genesisai/sdk';

const client = new GenesisClient({
  apiKey: 'your-api-key',
  apiUrl: 'https://api.genesisai.io',
  wsUrl: 'wss://api.genesisai.io/ws',
});
```

### Workflows

```typescript
// Lister les workflows
const workflows = await client.workflows.list({
  status: 'running',
  limit: 10,
});

// Créer un workflow
const workflow = await client.workflows.create({
  name: 'My Workflow',
  encryptedData: '...',
  encryptionKey: '...',
});

// Exécuter un workflow
const result = await client.workflows.execute('wf-123', {
  input: { data: 'value' },
});

// S'abonner aux événements
client.workflows.subscribe('wf-123', (event) => {
  console.log('Event:', event);
});
```

### Agents

```typescript
// Lister les agents
const agents = await client.agents.list({
  status: 'active',
});

// Enregistrer un agent
await client.agents.register({
  id: 'my-agent',
  type: 'custom',
  capabilities: ['search', 'calculate'],
});

// Exécuter un agent
const result = await client.agents.execute('my-agent', {
  query: 'search query',
});
```

### Sync

```typescript
// Push state
await client.sync.push({
  type: 'workflow',
  entityId: 'wf-123',
  encryptedData: '...',
  version: '1.0.0',
});

// Pull state
const states = await client.sync.pull({
  since: Date.now() - 3600000,
});

// Subscribe
client.sync.subscribe((update) => {
  console.log('Sync update:', update);
});
```

---

## 🐍 Python SDK

### Installation

```bash
pip install genesis-ai
```

### Configuration

```python
from genesis_ai import GenesisClient

client = GenesisClient(
    api_key='your-api-key',
    api_url='https://api.genesisai.io',
)
```

### Workflows

```python
# Lister les workflows
workflows = client.workflows.list(status='running')

# Créer un workflow
workflow = client.workflows.create(
    name='My Workflow',
    encrypted_data='...',
    encryption_key='...',
)

# Exécuter un workflow
result = client.workflows.execute('wf-123', input={'data': 'value'})
```

### Agents

```python
# Lister les agents
agents = client.agents.list(status='active')

# Enregistrer un agent
client.agents.register(
    id='my-agent',
    type='custom',
    capabilities=['search', 'calculate'],
)

# Exécuter un agent
result = client.agents.execute('my-agent', query='search query')
```

---

## 🐹 Go SDK

### Installation

```bash
go get github.com/genesisAI4/sdk-go
```

### Configuration

```go
import "github.com/genesisAI4/sdk-go"

client := genesis.NewClient(
    genesis.WithAPIKey("your-api-key"),
    genesis.WithAPIURL("https://api.genesisai.io"),
)
```

### Workflows

```go
// Lister les workflows
workflows, err := client.Workflows.List(ctx, &genesis.ListWorkflowsInput{
    Status: "running",
    Limit: 10,
})

// Créer un workflow
workflow, err := client.Workflows.Create(ctx, &genesis.CreateWorkflowInput{
    Name: "My Workflow",
    EncryptedData: "...",
    EncryptionKey: "...",
})

// Exécuter un workflow
result, err := client.Workflows.Execute(ctx, "wf-123", &genesis.ExecuteWorkflowInput{
    Input: map[string]interface{}{"data": "value"},
})
```

---

## ✅ Best Practices

1. **Error handling** : Toujours gérer les erreurs
2. **Retry** : Implémenter des retries
3. **Timeout** : Définir des timeouts
4. **Logging** : Logger les appels
5. **Caching** : Cacher les réponses statiques

---

**Version :** 1.0.0
