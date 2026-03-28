---
sidebar_position: 5
---

# WebSocket API

Documentation de l'API WebSocket de Genesis AI.

---

## 📡 Endpoint

```
Production : wss://api.genesisai.io/ws
Development : ws://localhost:3000/ws
```

---

## 🔐 Authentication

```typescript
const ws = new WebSocket('ws://localhost:3000/ws', {
  headers: {
    'Authorization': `Bearer ${JWT_TOKEN}`,
    'X-Agent-ID': AGENT_ID,
  },
});
```

---

## 📨 Messages

### Format

```typescript
interface WSMessage {
  type: MessageType;
  payload: any;
  timestamp: number;
  correlationId?: string;
}

enum MessageType {
  // Client → Server
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
  EXECUTE_WORKFLOW = 'execute_workflow',
  
  // Server → Client
  WORKFLOW_STARTED = 'workflow_started',
  WORKFLOW_COMPLETED = 'workflow_completed',
  WORKFLOW_FAILED = 'workflow_failed',
  NODE_COMPLETED = 'node_completed',
  SYNC_UPDATE = 'sync_update',
  ERROR = 'error',
}
```

---

## 📖 Exemples

### S'abonner aux événements

```typescript
ws.send(JSON.stringify({
  type: 'subscribe',
  payload: {
    channels: ['workflow:wf-123', 'sync:user-456'],
  },
}));
```

### Exécuter un workflow

```typescript
ws.send(JSON.stringify({
  type: 'execute_workflow',
  payload: {
    workflowId: 'wf-123',
    input: { data: 'value' },
  },
  correlationId: 'req-789',
}));
```

### Recevoir des événements

```typescript
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  
  switch (message.type) {
    case 'workflow_started':
      console.log('Workflow started:', message.payload);
      break;
    case 'workflow_completed':
      console.log('Workflow completed:', message.payload);
      break;
    case 'error':
      console.error('Error:', message.payload);
      break;
  }
};
```

---

## 🔔 Channels

| Channel | Description |
|---------|-------------|
| `workflow:{id}` | Events d'un workflow |
| `sync:{userId}` | Mises à jour de sync |
| `agent:{id}` | Status d'un agent |
| `notifications:{userId}` | Notifications |

---

## 💓 Heartbeat

```typescript
// Envoyer un ping toutes les 30 secondes
setInterval(() => {
  ws.send(JSON.stringify({
    type: 'ping',
    timestamp: Date.now(),
  }));
}, 30000);

// Recevoir le pong
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.type === 'pong') {
    console.log('Latency:', Date.now() - message.timestamp);
  }
};
```

---

## ✅ Best Practices

1. **Reconnect** : Gérer les déconnexions
2. **Heartbeat** : Garder la connexion alive
3. **Error handling** : Gérer les erreurs
4. **Cleanup** : Nettoyer les subscriptions

---

**Version :** 1.0.0
