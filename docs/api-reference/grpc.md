---
sidebar_position: 4
---

# gRPC API

Documentation de l'API gRPC de Genesis AI.

---

## 📡 Endpoint

```
Production : api.genesisai.io:7233
Development : localhost:7233
```

---

## 🔐 Authentication

```typescript
const credentials = grpc.credentials.combineChannelCredentials(
  grpc.credentials.createInsecure(),
  grpc.CallCredentials.fromMetadataCallback((metadata, callback) => {
    metadata.set('authorization', `Bearer ${JWT_TOKEN}`);
    metadata.set('x-agent-id', AGENT_ID);
    callback(null, metadata);
  })
);
```

---

## 📖 Services

### WorkflowService

```protobuf
service WorkflowService {
  rpc GetWorkflow(GetWorkflowRequest) returns (Workflow);
  rpc ListWorkflows(ListWorkflowsRequest) returns (ListWorkflowsResponse);
  rpc CreateWorkflow(CreateWorkflowRequest) returns (Workflow);
  rpc ExecuteWorkflow(ExecuteWorkflowRequest) returns (ExecutionResult);
}

message Workflow {
  string id = 1;
  string name = 2;
  string description = 3;
  WorkflowStatus status = 4;
  string encrypted_data = 5;
  google.protobuf.Timestamp created_at = 6;
  google.protobuf.Timestamp updated_at = 7;
}

enum WorkflowStatus {
  WORKFLOW_STATUS_UNSPECIFIED = 0;
  WORKFLOW_STATUS_DRAFT = 1;
  WORKFLOW_STATUS_RUNNING = 2;
  WORKFLOW_STATUS_COMPLETED = 3;
  WORKFLOW_STATUS_FAILED = 4;
}
```

### AgentService

```protobuf
service AgentService {
  rpc GetAgent(GetAgentRequest) returns (Agent);
  rpc ListAgents(ListAgentsRequest) returns (ListAgentsResponse);
  rpc RegisterAgent(RegisterAgentRequest) returns (Agent);
  rpc ExecuteAgent(ExecuteAgentRequest) returns (AgentResult);
}

message Agent {
  string id = 1;
  string name = 2;
  repeated string capabilities = 3;
  AgentStatus status = 4;
  bool is_public = 5;
}
```

### SyncService

```protobuf
service SyncService {
  rpc PushState(PushStateRequest) returns (PushStateResponse);
  rpc PullState(PullStateRequest) returns (PullStateResponse);
  rpc Subscribe(SubscribeRequest) returns (stream SyncUpdate);
}
```

---

## 💻 Exemple TypeScript

```typescript
import { WorkflowServiceClient } from './proto/workflow';

const client = new WorkflowServiceClient(
  'localhost:7233',
  grpc.credentials.createInsecure()
);

// Get workflow
client.getWorkflow({ id: 'wf-123' }, (err, workflow) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(workflow);
});

// Execute workflow
client.executeWorkflow({
  id: 'wf-123',
  input: JSON.stringify({ data: 'value' })
}, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result);
});
```

---

## 📊 Avantages gRPC

| Feature | gRPC | REST |
|---------|------|------|
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Streaming** | ✅ Bidirectionnel | ❌ Unidirectionnel |
| **Schema** | ✅ Protobuf (typé) | ⚠️ OpenAPI (optionnel) |
| **Codegen** | ✅ Auto-généré | ❌ Manuel |
| **Compression** | ✅ Native | ⚠️ Optionnelle |

---

**Version :** 1.0.0
