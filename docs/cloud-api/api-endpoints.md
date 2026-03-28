---
sidebar_position: 4
---

# Cloud API - API Endpoints

Documentation complète des endpoints API.

---

## 📡 Authentication

### POST /api/auth/register

```typescript
interface RegisterRequest {
  email: string;
  password: string;
  publicKey: string;
}

interface RegisterResponse {
  user: {
    id: string;
    email: string;
    publicKey: string;
  };
  accessToken: string;
  refreshToken: string;
}
```

### POST /api/auth/login

```typescript
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  mfaRequired?: boolean;
}
```

### POST /api/auth/refresh

```typescript
interface RefreshRequest {
  refreshToken: string;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}
```

---

## 🔄 Sync

### POST /api/sync/push

```typescript
interface PushStateRequest {
  type: 'workflow' | 'agent' | 'settings';
  entityId: string;
  encryptedData: string;
  version: string;
  vectorClock: Record<string, number>;
}

interface PushStateResponse {
  success: boolean;
  version: string;
}
```

### GET /api/sync/pull

```typescript
interface PullStateRequest {
  since?: string;  // Timestamp
  type?: string;   // Filter by type
}

interface PullStateResponse {
  states: Array<{
    type: string;
    entityId: string;
    encryptedData: string;
    version: string;
    updatedAt: string;
  }>;
  hasMore: boolean;
}
```

---

## 📝 Workflows

### GET /api/workflows

```typescript
interface ListWorkflowsRequest {
  status?: 'draft' | 'running' | 'completed' | 'failed';
  limit?: number;
  offset?: number;
}

interface ListWorkflowsResponse {
  workflows: Workflow[];
  total: number;
  hasMore: boolean;
}
```

### POST /api/workflows

```typescript
interface CreateWorkflowRequest {
  name: string;
  description?: string;
  encryptedData: string;
  encryptionKey: string;
}

interface CreateWorkflowResponse {
  workflow: Workflow;
}
```

### POST /api/workflows/:id/execute

```typescript
interface ExecuteWorkflowRequest {
  input?: any;
}

interface ExecuteWorkflowResponse {
  executionId: string;
  status: 'running' | 'completed' | 'failed';
  result?: any;
}
```

---

## 🔐 Security Headers

```typescript
// Tous les endpoints requièrent
headers: {
  'Authorization': 'Bearer <JWT_TOKEN>',
  'X-Agent-ID': '<AGENT_ID>',
  'Content-Type': 'application/json',
}
```

---

## 📊 Rate Limiting

| Endpoint | Limite |
|----------|--------|
| **Auth** | 10 req/min |
| **Sync** | 100 req/min |
| **Workflows** | 50 req/min |
| **General** | 1000 req/min |

---

**Version :** 1.0.0
