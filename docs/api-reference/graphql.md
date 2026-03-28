---
sidebar_position: 3
---

# GraphQL API

Documentation de l'API GraphQL de Genesis AI.

---

## 📡 Endpoint

```
Production : https://api.genesisai.io/graphql
Development : http://localhost:3000/graphql
```

---

## 🔐 Authentication

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## 📖 Schema

### Types

```graphql
type Workflow {
  id: ID!
  name: String!
  description: String
  status: WorkflowStatus!
  encryptedData: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum WorkflowStatus {
  DRAFT
  RUNNING
  COMPLETED
  FAILED
  ARCHIVED
}

type Agent {
  id: ID!
  name: String!
  capabilities: [String!]!
  status: AgentStatus!
  isPublic: Boolean!
}

type SyncState {
  id: ID!
  type: String!
  entityId: String!
  encryptedData: String!
  version: String!
  updatedAt: DateTime!
}
```

---

## 🔍 Queries

### Lister les workflows

```graphql
query ListWorkflows($status: WorkflowStatus, $limit: Int) {
  workflows(status: $status, limit: $limit) {
    id
    name
    status
    createdAt
  }
}
```

### Obtenir un workflow

```graphql
query GetWorkflow($id: ID!) {
  workflow(id: $id) {
    id
    name
    description
    status
    encryptedData
  }
}
```

### Lister les agents

```graphql
query ListAgents($status: AgentStatus) {
  agents(status: $status) {
    id
    name
    capabilities
    status
  }
}
```

---

## ✏️ Mutations

### Créer un workflow

```graphql
mutation CreateWorkflow($input: CreateWorkflowInput!) {
  createWorkflow(input: $input) {
    id
    name
    status
  }
}

input CreateWorkflowInput {
  name: String!
  description: String
  encryptedData: String!
  encryptionKey: String!
}
```

### Exécuter un workflow

```graphql
mutation ExecuteWorkflow($id: ID!, $input: JSON) {
  executeWorkflow(id: $id, input: $input) {
    executionId
    status
    result
  }
}
```

---

## 🔔 Subscriptions

### Workflow status changed

```graphql
subscription WorkflowStatusChanged {
  workflowStatusChanged {
    workflowId
    status
    updatedAt
  }
}
```

### Sync state updated

```graphql
subscription SyncStateUpdated {
  syncStateUpdated {
    type
    entityId
    version
    updatedAt
  }
}
```

---

## 🧪 Exemple complet

```graphql
# Requête
mutation CreateAndExecute($input: CreateWorkflowInput!) {
  create: createWorkflow(input: $input) {
    id
    name
  }
  execute: executeWorkflow(id: $create.id) {
    executionId
    status
  }
}

# Variables
{
  "input": {
    "name": "My Workflow",
    "encryptedData": "...",
    "encryptionKey": "..."
  }
}
```

---

**Version :** 1.0.0
