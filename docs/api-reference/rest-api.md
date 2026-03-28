---
sidebar_position: 2
---

# REST API

Documentation de l'API REST de Genesis AI.

---

## 📡 Base URL

```
Production : https://api.genesisai.io/api/v1
Development : http://localhost:3000/api/v1
```

---

## 🔐 Authentication

Tous les endpoints requis une authentification JWT.

```http
Authorization: Bearer <JWT_TOKEN>
X-Agent-ID: <AGENT_ID>
```

---

## 📝 Endpoints

### Workflows

#### GET /workflows

Lister les workflows.

```http
GET /api/v1/workflows?status=running&limit=10
```

**Response :**

```json
{
  "workflows": [
    {
      "id": "wf-123",
      "name": "Data Processing",
      "status": "running",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 100,
  "hasMore": true
}
```

#### POST /workflows

Créer un workflow.

```http
POST /api/v1/workflows
Content-Type: application/json

{
  "name": "My Workflow",
  "description": "Workflow description",
  "encryptedData": "...",
  "encryptionKey": "..."
}
```

#### POST /workflows/:id/execute

Exécuter un workflow.

```http
POST /api/v1/workflows/wf-123/execute
Content-Type: application/json

{
  "input": { "data": "value" }
}
```

---

### Sync

#### POST /sync/push

Push d'état chiffré.

```http
POST /api/v1/sync/push
Content-Type: application/json

{
  "type": "workflow",
  "entityId": "wf-123",
  "encryptedData": "...",
  "version": "1.0.0"
}
```

#### GET /sync/pull

Pull d'état chiffré.

```http
GET /api/v1/sync/pull?since=1704067200000
```

---

### Agents

#### GET /agents

Lister les agents.

```http
GET /api/v1/agents?status=active
```

#### POST /agents/register

Enregistrer un agent.

```http
POST /api/v1/agents/register
Content-Type: application/json

{
  "id": "my-agent",
  "type": "custom",
  "capabilities": ["search", "calculate"]
}
```

---

## ❌ Error Responses

```json
{
  "success": false,
  "error": {
    "code": "WORKFLOW_NOT_FOUND",
    "message": "Workflow not found",
    "details": {
      "workflowId": "wf-123"
    }
  }
}
```

### Codes d'erreur

| Code | HTTP | Description |
|------|------|-------------|
| `WORKFLOW_NOT_FOUND` | 404 | Workflow inexistant |
| `UNAUTHORIZED` | 401 | Token invalide |
| `RATE_LIMITED` | 429 | Limite dépassée |
| `INTERNAL_ERROR` | 500 | Erreur serveur |

---

## 📊 Rate Limiting

| Endpoint | Limite |
|----------|--------|
| **Auth** | 10 req/min |
| **Sync** | 100 req/min |
| **Workflows** | 50 req/min |
| **Agents** | 100 req/min |

---

**Version :** 1.0.0
