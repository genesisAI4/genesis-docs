# 📡 Genesis AI — API Documentation

**Purpose:** API reference, OpenAPI specs, and integration guides

---

## 📁 Structure

```
api/
├── README.md                 # Ce fichier
├── cloud-api.md              # Cloud API (NestJS) reference
├── nexus.md                  # Nexus API (Oak) reference
├── igon7.md                  # Igon7 API reference
├── database.md               # Database schema (Prisma)
├── security.md               # API security (auth, rate limiting)
├── openapi/                  # OpenAPI 3.1 specs
│   ├── cloud-api.yaml
│   ├── nexus.yaml
│   └── igon7.yaml
└── mcp/                      # MCP (Model Context Protocol) generators
```

---

## 🌐 APIs Overview

| API | Base URL | Auth | Rate Limit | Status |
|-----|----------|------|------------|--------|
| **Cloud API** | `/api/v1` | JWT (RS256) | 100 req/min | ✅ Production |
| **Nexus** | `/nexus/v1` | JWT + mTLS | 1000 req/min | ✅ Production |
| **Igon7** | `/workflows/v1` | JWT | 50 req/min | ✅ Production |
| **Clisis** | `/clisis/v1` | JWT + HMAC | 200 req/min | ✅ Production |

---

## 🔐 Authentication

### JWT (RS256)

```typescript
// Request
Authorization: Bearer <jwt_token>

// Token structure
{
  "sub": "user_123",
  "iat": 1711728000,
  "exp": 1711728900,  // 15 min
  "iss": "genesis-nexus",
  "aud": "genesis-api"
}
```

### mTLS (Service-to-Service)

```typescript
// Client certificate required
X-Client-Cert-Fingerprint: sha256/ABC123...

// Verified by middleware
```

### HMAC Command Signing

```typescript
// Request headers
X-Command-Signature: hmac-sha256=<hex>
X-Command-Timestamp: <unix_ms>

// Signature calculation
const message = JSON.stringify({ id, type, payload, timestamp });
const signature = createHmac('sha256', secret).update(message).digest('hex');
```

---

## 📊 Cloud API (NestJS)

### Endpoints

#### Auth

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}

Response: 201 Created
{
  "userId": "user_123",
  "token": "<jwt_token>"
}
```

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}

Response: 200 OK
{
  "token": "<jwt_token>",
  "refreshToken": "<refresh_token>"
}
```

#### Sync (E2EE)

```http
POST /api/v1/sync/push
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "encryptedData": "<base64>",
  "iv": "<base64>",
  "authTag": "<base64>",
  "timestamp": 1711728000
}

Response: 200 OK
{
  "success": true,
  "conflicts": []
}
```

#### Workflows

```http
GET /api/v1/workflows
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "workflows": [
    {
      "id": "wf_123",
      "name": "Daily Report",
      "status": "active",
      "nodes": 5,
      "lastExecuted": "2026-03-29T10:00:00Z"
    }
  ]
}
```

---

## 🧠 Nexus API (Oak)

### Endpoints

#### Agents

```http
GET /nexus/v1/agents
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "agents": [
    {
      "id": "agent_research",
      "name": "Research Agent",
      "status": "active",
      "capabilities": ["web_search", "summarization", "citation"]
    }
  ]
}
```

#### A2A Protocol

```http
POST /nexus/v1/a2a/send
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "from": "agent_research",
  "to": "agent_writing",
  "message": {
    "type": "research_results",
    "data": { ... }
  }
}

Response: 202 Accepted
{
  "messageId": "msg_456",
  "status": "queued"
}
```

---

## ⚡ Igon7 API

### Endpoints

#### Workflows

```http
POST /workflows/v1/execute
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "workflowId": "wf_123",
  "input": {
    "field1": "value1",
    "field2": "value2"
  }
}

Response: 202 Accepted
{
  "executionId": "exec_789",
  "status": "running"
}
```

```http
GET /workflows/v1/executions/{executionId}
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "executionId": "exec_789",
  "status": "completed",
  "output": { ... },
  "duration": 1234
}
```

---

## 🗄️ Database Schema

### Prisma Models

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // Hashed (bcrypt)
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  workflows Workflow[]
  agents    Agent[]
}

model Workflow {
  id        String   @id @default(uuid())
  name      String
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  nodes     Json
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  executions Execution[]
}

model Execution {
  id         String   @id @default(uuid())
  workflowId String
  workflow   Workflow @relation(fields: [workflowId], references: [id])
  status     String   // running, completed, failed
  input      Json?
  output     Json?
  duration   Int?     // ms
  createdAt  DateTime @default(now())
}

model Agent {
  id         String   @id @default(uuid())
  name       String
  type       String
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  config     Json
  active     Boolean  @default(true)
  createdAt  DateTime @default(now())
}
```

---

## 🔒 Security

### Rate Limiting

```typescript
// Configuration
{
  "global": {
    "max": 100,      // requests
    "ttl": 60        // seconds
  },
  "login": {
    "max": 5,        // attempts
    "ttl": 60        // per minute
  },
  "sync": {
    "max": 30,       // operations
    "ttl": 60        // per minute
  }
}
```

### Response Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1711728060
```

---

## 📋 OpenAPI Specs

### Generate

```bash
# Cloud API
cd genesis-cloud-api
npm run openapi:generate

# Output: genesis-docs/api/openapi/cloud-api.yaml
```

### View

```bash
# Swagger UI
cd genesis-docs/api/openapi
npx swagger-ui-serve cloud-api.yaml
```

---

## 🔗 Related Docs

- **Security:** `security.md`
- **Architecture:** `../architecture/README.md`
- **MCP Generator:** `mcp/README.md`

---

**Last Updated:** 29 Mars 2026  
**Owner:** API Team  
**Next Review:** J+30
