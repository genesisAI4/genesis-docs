---
sidebar_position: 5
---

# igon7 Engine - Node Types

Documentation complète de tous les types de noeuds disponibles dans igon7.

---

## 📊 Vue d'ensemble

igon7 Engine supporte **304 types de noeuds** regroupés en plusieurs catégories.

---

## 🔧 Noeuds de Base

### Task Node

```typescript
interface TaskNode {
  type: 'task';
  id: string;
  name: string;
  fn: (context: NodeContext) => Promise<unknown>;
  options: {
    retry?: RetryPolicy;
    timeout?: number;
    cache?: CacheConfig;
  };
}

// Exemple
const taskNode = {
  type: 'task',
  id: 'fetch-data',
  name: 'Fetch Data from API',
  fn: async (context) => {
    const response = await fetch('https://api.example.com/data');
    return response.json();
  },
  options: {
    retry: { maxAttempts: 3 },
    timeout: 30000,
  },
};
```

### Decision Node

```typescript
interface DecisionNode {
  type: 'decision';
  id: string;
  name: string;
  condition: (context: NodeContext) => Promise<boolean>;
  branches: {
    ifTrue: string;
    ifFalse: string;
  };
}

// Exemple
const decisionNode = {
  type: 'decision',
  id: 'check-data',
  name: 'Check if data is valid',
  condition: async (context) => {
    const data = context.inputs['fetch-data'];
    return data && data.length > 0;
  },
  branches: {
    ifTrue: 'process-data',
    ifFalse: 'handle-empty',
  },
};
```

### Parallel Node

```typescript
interface ParallelNode {
  type: 'parallel';
  id: string;
  name: string;
  nodes: string[];
  options: {
    concurrency?: number;
    failFast?: boolean;
  };
}

// Exemple
const parallelNode = {
  type: 'parallel',
  id: 'fetch-all-sources',
  name: 'Fetch from all sources',
  nodes: ['fetch-api-1', 'fetch-api-2', 'fetch-api-3'],
  options: {
    concurrency: 3,
    failFast: false,
  },
};
```

---

## 📡 Noeuds de Communication

### HTTP Request Node

```typescript
interface HttpRequestNode {
  type: 'http-request';
  config: {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: unknown;
    timeout?: number;
  };
}

// Exemple
const httpNode = {
  type: 'http-request',
  config: {
    url: 'https://api.example.com/users',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer {{secret:api-key}}',
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  },
};
```

### Email Node

```typescript
interface EmailNode {
  type: 'email';
  config: {
    provider: 'smtp' | 'sendgrid' | 'ses';
    to: string[];
    subject: string;
    body: string;
    html?: boolean;
    attachments?: string[];
  };
}
```

### Slack Node

```typescript
interface SlackNode {
  type: 'slack';
  config: {
    channel: string;
    message: string;
    blocks?: SlackBlock[];
    attachments?: SlackAttachment[];
  };
}
```

---

## 💾 Noeuds de Base de Données

### PostgreSQL Node

```typescript
interface PostgreSQLNode {
  type: 'postgres';
  config: {
    operation: 'query' | 'insert' | 'update' | 'delete';
    query: string;
    params?: unknown[];
    connection: {
      host: string;
      port: number;
      database: string;
      user: string;
      password: string;
    };
  };
}

// Exemple
const postgresNode = {
  type: 'postgres',
  config: {
    operation: 'query',
    query: 'SELECT * FROM users WHERE created_at > $1',
    params: ['2024-01-01'],
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'mydb',
      user: 'user',
      password: '{{secret:db-password}}',
    },
  },
};
```

### MongoDB Node

```typescript
interface MongoDBNode {
  type: 'mongodb';
  config: {
    operation: 'find' | 'insert' | 'update' | 'delete' | 'aggregate';
    collection: string;
    query?: Record<string, unknown>;
    pipeline?: Record<string, unknown>[];
  };
}
```

### Redis Node

```typescript
interface RedisNode {
  type: 'redis';
  config: {
    operation: 'get' | 'set' | 'del' | 'publish' | 'subscribe';
    key: string;
    value?: string;
    ttl?: number;
  };
}
```

---

## 🤖 Noeuds AI/ML

### OpenAI Node

```typescript
interface OpenAINode {
  type: 'openai';
  config: {
    operation: 'chat' | 'completion' | 'embedding' | 'image';
    model: string;
    messages?: ChatMessage[];
    prompt?: string;
    maxTokens?: number;
    temperature?: number;
  };
}

// Exemple
const openaiNode = {
  type: 'openai',
  config: {
    operation: 'chat',
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Analyze this data: {{data}}' },
    ],
    maxTokens: 2000,
    temperature: 0.7,
  },
};
```

### Hugging Face Node

```typescript
interface HuggingFaceNode {
  type: 'huggingface';
  config: {
    operation: 'inference' | 'embedding' | 'classification';
    model: string;
    input: string | string[];
    parameters?: Record<string, unknown>;
  };
}
```

### LangChain Node

```typescript
interface LangChainNode {
  type: 'langchain';
  config: {
    chain: 'conversation' | 'llm' | 'sequential' | 'transform';
    llm: {
      provider: 'openai' | 'anthropic' | 'cohere';
      model: string;
    };
    memory?: boolean;
    prompt?: string;
  };
}
```

---

## 📊 Noeuds de Transformation

### Filter Node

```typescript
interface FilterNode {
  type: 'filter';
  config: {
    predicate: (item: unknown) => boolean;
    failOnEmpty?: boolean;
  };
}

// Exemple
const filterNode = {
  type: 'filter',
  config: {
    predicate: (item: any) => item.status === 'active',
    failOnEmpty: false,
  },
};
```

### Map Node

```typescript
interface MapNode {
  type: 'map';
  config: {
    transform: (item: unknown, index: number) => unknown;
  };
}
```

### Reduce Node

```typescript
interface ReduceNode {
  type: 'reduce';
  config: {
    reducer: (accumulator: unknown, item: unknown) => unknown;
    initialValue: unknown;
  };
}
```

### Merge Node

```typescript
interface MergeNode {
  type: 'merge';
  config: {
    strategy: 'concat' | 'merge' | 'zip';
    sources: string[];
  };
}
```

---

## ⏱️ Noeuds Temporels

### Delay Node

```typescript
interface DelayNode {
  type: 'delay';
  config: {
    duration: number;
    unit?: 'ms' | 's' | 'm' | 'h';
  };
}

// Exemple
const delayNode = {
  type: 'delay',
  config: {
    duration: 5,
    unit: 'm', // 5 minutes
  },
};
```

### Cron Node

```typescript
interface CronNode {
  type: 'cron';
  config: {
    schedule: string; // Expression cron
    timezone?: string;
  };
}
```

### Wait Until Node

```typescript
interface WaitUntilNode {
  type: 'wait-until';
  config: {
    condition: () => Promise<boolean>;
    timeout?: number;
    interval?: number;
  };
}
```

---

## 🔐 Noeuds de Sécurité

### Encrypt Node

```typescript
interface EncryptNode {
  type: 'encrypt';
  config: {
    algorithm: 'aes-256-gcm' | 'aes-128-gcm';
    keySource: 'secret' | 'input';
  };
}
```

### Decrypt Node

```typescript
interface DecryptNode {
  type: 'decrypt';
  config: {
    algorithm: 'aes-256-gcm' | 'aes-128-gcm';
    keySource: 'secret' | 'input';
  };
}
```

### Validate Node

```typescript
interface ValidateNode {
  type: 'validate';
  config: {
    schema: Record<string, unknown>;
    strict?: boolean;
  };
}
```

---

## 📝 Tableau récapitulatif

| Catégorie | Noeuds | Description |
|-----------|--------|-------------|
| **Base** | Task, Decision, Parallel, Merge, Split | Noeuds fondamentaux |
| **Communication** | HTTP, Email, Slack, Discord, Telegram | Communication externe |
| **Database** | PostgreSQL, MySQL, MongoDB, Redis | Bases de données |
| **AI/ML** | OpenAI, HuggingFace, LangChain | Intelligence Artificielle |
| **Transformation** | Filter, Map, Reduce, Merge | Transformation de données |
| **Temporel** | Delay, Cron, Wait Until | Gestion du temps |
| **Sécurité** | Encrypt, Decrypt, Validate | Sécurité des données |
| **Fichier** | Read, Write, Upload, Download | Gestion de fichiers |
| **Cloud** | AWS, GCP, Azure | Services cloud |

---

**Version :** 1.0.0  
**Total Node Types :** 304
