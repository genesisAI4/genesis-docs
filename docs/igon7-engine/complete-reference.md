---
sidebar_position: 1
---

# igon7 Engine - Documentation Complète

**igon7 Engine** est le moteur d'orchestration de workflows le plus avancé de l'écosystème Genesis, basé sur n8n avec des extensions propriétaires.

---

## 📊 Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| **Packages @n8n** | 39 sous-packages |
| **Noeuds de workflow** | 304 types de noeuds |
| **Credentials** | 390 types d'authentification |
| **Fichiers TypeScript** | 2,500+ fichiers |
| **Lignes de code** | ~500,000+ lignes |
| **Port d'exécution** | 18791 (WebSocket) |

---

## 🏗️ Architecture Détaillée

### Structure du Monorepo

```
igon7-engine/
├── packages/
│   ├── @n8n/                      # 39 sous-packages
│   │   ├── ai-node-sdk/           # SDK pour noeuds AI
│   │   ├── ai-utilities/          # Utilitaires AI
│   │   ├── ai-workflow-builder.ee/ # Builder de workflows AI
│   │   ├── api-types/             # Types API partagés
│   │   ├── backend-common/        # Commun backend
│   │   ├── backend-test-utils/    # Utilitaires de test
│   │   ├── benchmark/             # Benchmarks de performance
│   │   ├── chat-hub/              # Hub de conversation
│   │   ├── client-oauth2/         # Client OAuth2
│   │   ├── codemirror-lang/       # Langage CodeMirror
│   │   ├── codemirror-lang-html/  # Support HTML
│   │   ├── codemirror-lang-sql/   # Support SQL
│   │   ├── config/                # Configuration partagée
│   │   ├── constants/             # Constantes globales
│   │   ├── crdt/                  # CRDT pour sync
│   │   ├── create-node/           # Générateur de noeuds
│   │   ├── db/                    # Couche database
│   │   ├── decorators/            # Décorateurs TypeScript
│   │   ├── di/                    # Dependency Injection
│   │   ├── errors/                # Classes d'erreur
│   │   ├── eslint-config/         # Config ESLint
│   │   ├── eslint-plugin-community-nodes/ # Plugin ESLint
│   │   ├── expression-runtime/    # Runtime d'expressions
│   │   ├── extension-sdk/         # SDK d'extensions
│   │   ├── imap/                  # Client IMAP
│   │   ├── json-schema-to-zod/    # Conversion JSON Schema → Zod
│   │   ├── node-cli/              # CLI pour noeuds
│   │   ├── nodes-langchain/       # Noeuds LangChain
│   │   ├── permissions/           # Système de permissions
│   │   ├── scan-community-package/ # Scanner de sécurité
│   │   ├── stylelint-config/      # Config Stylelint
│   │   ├── syslog-client/         # Client Syslog
│   │   ├── task-runner/           # Exécuteur de tâches
│   │   ├── task-runner-python/    # Runner Python
│   │   ├── typescript-config/     # Config TypeScript
│   │   ├── utils/                 # Utilitaires généraux
│   │   ├── vitest-config/         # Config Vitest
│   │   ├── workflow-sdk/          # SDK de workflow
│   │   └── queue-manager.ts       # Gestion de files
│   │
│   ├── extensions/
│   │   └── insights/              # Module d'analytics
│   │
│   ├── nodes-base/
│   │   ├── credentials/           # 390 types de credentials
│   │   │   ├── openAiApi.credentials.ts
│   │   │   ├── googleOAuth2Api.credentials.ts
│   │   │   ├── aws.credentials.ts
│   │   │   ├── stripeApi.credentials.ts
│   │   │   └── ... (385 autres)
│   │   │
│   │   ├── nodes/                 # 304 types de noeuds
│   │   │   ├── Discord/
│   │   │   ├── Slack/
│   │   │   ├── Telegram/
│   │   │   ├── EmailSend/
│   │   │   ├── EmailReadImap/
│   │   │   ├── Twilio/
│   │   │   ├── PostgreSQL/
│   │   │   ├── MySQL/
│   │   │   ├── MongoDB/
│   │   │   ├── Redis/
│   │   │   ├── Elastic/
│   │   │   ├── CrateDb/
│   │   │   ├── AWS/
│   │   │   ├── Google/
│   │   │   ├── Azure/
│   │   │   ├── Salesforce/
│   │   │   ├── HubSpot/
│   │   │   ├── Pipedrive/
│   │   │   ├── Jira/
│   │   │   ├── Trello/
│   │   │   ├── Asana/
│   │   │   ├── ClickUp/
│   │   │   ├── Monday/
│   │   │   ├── Linear/
│   │   │   ├── OpenAI/
│   │   │   ├── HuggingFace/
│   │   │   ├── StabilityAI/
│   │   │   ├── AITransform/
│   │   │   ├── Shopify/
│   │   │   ├── WooCommerce/
│   │   │   ├── Stripe/
│   │   │   ├── PayPal/
│   │   │   ├── Square/
│   │   │   ├── Twitter/
│   │   │   ├── Facebook/
│   │   │   ├── Instagram/
│   │   │   ├── LinkedIn/
│   │   │   ├── TikTok/
│   │   │   ├── YouTube/
│   │   │   ├── GitHub/
│   │   │   ├── GitLab/
│   │   │   ├── Bitbucket/
│   │   │   ├── ExecuteCommand/
│   │   │   ├── Code/
│   │   │   ├── Filter/
│   │   │   ├── Merge/
│   │   │   ├── Split/
│   │   │   ├── Aggregate/
│   │   │   ├── DataTable/
│   │   │   ├── DateTime/
│   │   │   └── ... (200 autres)
│   │   │
│   │   ├── scripts/
│   │   ├── test/
│   │   ├── types/
│   │   └── utils/
│   │
│   └── workflow/
│       ├── src/
│       │   ├── common/
│       │   ├── errors/
│       │   ├── expressions/
│       │   ├── extensions/
│       │   ├── graph/
│       │   ├── native-methods/
│       │   ├── node-parameters/
│       │   ├── run-execution-data/
│       │   ├── augment-object.ts
│       │   ├── connections-diff.ts
│       │   ├── constants.ts
│       │   ├── cron.ts
│       │   ├── data-table.types.ts
│       │   ├── deferred-promise.ts
│       │   ├── evaluation-helpers.ts
│       │   ├── execution-context-establishment-hooks.ts
│       │   ├── execution-context.ts
│       │   ├── execution-status.ts
│       │   ├── expression-evaluator-proxy.ts
│       │   ├── expression-sandboxing.ts
│       │   ├── expression.ts
│       │   ├── from-ai-parse-utils.ts
│       │   ├── global-state.ts
│       │   ├── index.ts
│       │   ├── interfaces.ts
│       │   ├── logger-proxy.ts
│       │   ├── message-event-bus.ts
│       │   ├── metadata-utils.ts
│       │   ├── node-helpers.ts
│       │   ├── node-reference-parser-utils.ts
│       │   ├── node-validation.ts
│       │   ├── observable-object.ts
│       │   ├── result.ts
│       │   ├── run-execution-data-factory.ts
│       │   ├── schemas.ts
│       │   ├── telemetry-helpers.ts
│       │   ├── tool-helpers.ts
│       │   ├── type-guards.ts
│       │   ├── type-validation.ts
│       │   ├── types.d.ts
│       │   ├── utils.ts
│       │   ├── versioned-node-type.ts
│       │   ├── workflow-checksum.ts
│       │   ├── workflow-data-proxy-env-provider.ts
│       │   ├── workflow-data-proxy-helpers.ts
│       │   ├── workflow-data-proxy.ts
│       │   ├── workflow-diff.ts
│       │   ├── workflow-environments-helper.ts
│       │   ├── workflow-expression.ts
│       │   ├── workflow-validation.ts
│       │   └── workflow.ts
│       └── test/
│
├── src/
│   ├── nodes/
│   │   ├── mobile-money/
│   │   │   └── mobile-money.node.ts
│   │   ├── clisis_node.ts
│   │   ├── mobile_money_node.ts
│   │   └── stripe_node.ts
│   │
│   ├── templates/
│   │   └── workflow-templates/
│   │
│   ├── engine.ts
│   ├── loader.ts
│   └── node_registry.ts
│
├── scripts/
│   ├── build.ts
│   ├── test.ts
│   └── dev.ts
│
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── patches/
│
├── main.ts
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── deno.json
├── tsconfig.json
└── vitest.workspace.ts
```

---

## 🔧 Configuration

### deno.json

```json
{
  "workspace": ["./packages/@n8n", "./packages/workflow"],
  "tasks": {
    "dev": "pnpm dev",
    "build": "turbo build",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write \"**/*.{ts,tsx,json,md}\""
  },
  "imports": {
    "postgres": "npm:postgres@^3.4.4",
    "ioredis": "npm:ioredis@^5.3.2",
    "bull": "npm:bull@^4.12.0",
    "async-mutex": "npm:async-mutex@^0.5.0"
  },
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### pnpm-workspace.yaml

```yaml
packages:
  - 'packages/@n8n/*'
  - 'packages/workflow'
  - 'packages/nodes-base'
  - 'packages/extensions/*'
```

### turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    }
  }
}
```

---

## 📦 Classes Principales

### Igon7Engine (src/engine.ts)

```typescript
/**
 * Moteur principal d'exécution de workflows
 * Gère l'orchestration, l'exécution parallèle et la gestion d'erreurs
 */
interface NodeResult {
  success: boolean;
  data: any;
  error?: string;
  executionTime?: number;
  retryCount?: number;
}

interface NodeDefinition {
  id: string;
  type: string;
  name: string;
  config: Record<string, any>;
  parameters: NodeParameters;
  credentials?: CredentialMapping;
  retryPolicy?: RetryPolicy;
  timeout?: number;
}

interface NodeParameters {
  [key: string]: any;
}

interface CredentialMapping {
  [credentialType: string]: string;
}

interface RetryPolicy {
  maxAttempts: number;
  initialInterval: number;
  backoffCoefficient: number;
  maxInterval: number;
  retryableErrors?: string[];
}

class Igon7Engine {
  private nodeRegistry: Map<string, NodeConstructor>;
  private activeExecutions: Map<string, ExecutionContext>;
  private secretStore: SecretStore;
  
  /**
   * Exécute un workflow complet
   * @param nodes - Tableau de définitions de noeuds
   * @returns Map des résultats par noeud
   */
  async execute(nodes: NodeDefinition[]): Promise<Map<string, NodeResult>> {
    const dag = this.buildDAG(nodes);
    const order = this.topologicalSort(dag);
    const results = new Map<string, NodeResult>();
    
    for (const nodeId of order) {
      const node = nodes.find(n => n.id === nodeId)!;
      const config = await this.injectSecrets(node.config);
      
      try {
        const result = await this.executeNode(node, config);
        results.set(nodeId, result);
      } catch (error) {
        results.set(nodeId, {
          success: false,
          data: null,
          error: error.message,
        });
        
        if (node.retryPolicy) {
          await this.handleRetry(node, error);
        }
      }
    }
    
    return results;
  }
  
  /**
   * Injecte les secrets chiffrés dans la configuration
   * Utilise le Blind-Key pour ne jamais exposer les secrets
   */
  private async injectSecrets(config: Record<string, any>): Promise<Record<string, any>> {
    const injected = { ...config };
    
    for (const [key, value] of Object.entries(config)) {
      if (typeof value === 'string' && value.startsWith('{{secret:')) {
        const secretName = value.match(/{{secret:(.*)}}/)![1];
        injected[key] = await this.secretStore.get(secretName);
      }
    }
    
    return injected;
  }
  
  private async executeNode(node: NodeDefinition, config: Record<string, any>): Promise<NodeResult> {
    const NodeClass = this.nodeRegistry.get(node.type);
    
    if (!NodeClass) {
      throw new Error(`Node type "${node.type}" not found`);
    }
    
    const instance = new NodeClass(config);
    const startTime = Date.now();
    
    try {
      const data = await instance.execute();
      return {
        success: true,
        data,
        executionTime: Date.now() - startTime,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
        executionTime: Date.now() - startTime,
      };
    }
  }
  
  private buildDAG(nodes: NodeDefinition[]): DirectedGraph {
    // Construction du graphe orienté acyclique
    const graph = new DirectedGraph();
    
    for (const node of nodes) {
      graph.addNode(node.id);
      
      if (node.config.dependencies) {
        for (const dep of node.config.dependencies) {
          graph.addEdge(dep, node.id);
        }
      }
    }
    
    return graph;
  }
  
  private topologicalSort(dag: DirectedGraph): string[] {
    // Tri topologique de Kahn
    const inDegree = new Map<string, number>();
    const queue: string[] = [];
    const result: string[] = [];
    
    for (const node of dag.nodes) {
      inDegree.set(node, dag.getInEdges(node).length);
      if (inDegree.get(node) === 0) {
        queue.push(node);
      }
    }
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      result.push(current);
      
      for (const neighbor of dag.getNeighbors(current)) {
        const degree = inDegree.get(neighbor)! - 1;
        inDegree.set(neighbor, degree);
        if (degree === 0) {
          queue.push(neighbor);
        }
      }
    }
    
    if (result.length !== dag.nodes.length) {
      throw new Error('Cycle detected in workflow DAG');
    }
    
    return result;
  }
  
  private async handleRetry(node: NodeDefinition, error: Error): Promise<void> {
    const policy = node.retryPolicy!;
    
    for (let attempt = 1; attempt <= policy.maxAttempts; attempt++) {
      const delay = policy.initialInterval * Math.pow(
        policy.backoffCoefficient,
        attempt - 1
      );
      
      await sleep(Math.min(delay, policy.maxInterval));
      
      try {
        await this.executeNode(node, node.config);
        return;
      } catch (retryError) {
        if (attempt === policy.maxAttempts) {
          throw retryError;
        }
      }
    }
  }
}
```

### Igon7NodeLoader (src/loader.ts)

```typescript
/**
 * Chargeur dynamique de noeuds
 * Supporte le hot-reloading et la validation de schémas
 */
interface NodeInfo {
  name: string;
  path: string;
  version: string;
  status: 'loaded' | 'error' | 'pending';
  error?: string;
}

class Igon7NodeLoader {
  private static nodesPath: string = "./packages/nodes-base/nodes";
  private loadedNodes: Map<string, NodeInfo> = new Map();
  private watchHandle?: Deno.FsWatcher;
  
  /**
   * Charge un noeud spécifique
   */
  static async loadNode(nodeName: string): Promise<NodeInfo> {
    const nodePath = join(this.nodesPath, nodeName, `${nodeName}.node.ts`);
    
    try {
      await Deno.stat(nodePath);
      
      const module = await import(nodePath);
      const nodeClass = module.default || module[`${this.pascalCase(nodeName)}Node`];
      
      const nodeInfo: NodeInfo = {
        name: nodeName,
        path: nodePath,
        version: module.version || '1.0.0',
        status: 'loaded',
      };
      
      this.loadedNodes.set(nodeName, nodeInfo);
      
      return nodeInfo;
    } catch (error) {
      return {
        name: nodeName,
        path: nodePath,
        version: 'unknown',
        status: 'error',
        error: error.message,
      };
    }
  }
  
  /**
   * Charge tous les noeuds disponibles
   */
  static async loadAllNodes(): Promise<Map<string, NodeInfo>> {
    const nodes = new Map<string, NodeInfo>();
    const dir = await Deno.readDir(this.nodesPath);
    
    for await (const entry of dir) {
      if (entry.isDirectory) {
        const nodeInfo = await this.loadNode(entry.name);
        nodes.set(entry.name, nodeInfo);
      }
    }
    
    return nodes;
  }
  
  /**
   * Active le watch mode pour le hot-reload
   */
  async watchForChanges(callback: (node: string, action: 'added' | 'removed' | 'modified') => void): Promise<void> {
    this.watchHandle = Deno.watchFs(this.nodesPath);
    
    for await (const event of this.watchHandle) {
      const nodeName = basename(dirname(event.path));
      const action = event.kind === 'create' ? 'added'
        : event.kind === 'remove' ? 'removed'
        : 'modified';
      
      callback(nodeName, action);
      
      if (action === 'modified' || action === 'added') {
        await Igon7NodeLoader.loadNode(nodeName);
      }
    }
  }
  
  /**
   * Décharge un noeud
   */
  static async unloadNode(nodeName: string): Promise<void> {
    this.loadedNodes.delete(nodeName);
  }
  
  /**
   * Retourne la liste des noeuds chargés
   */
  static getLoadedNodes(): Map<string, NodeInfo> {
    return new Map(this.loadedNodes);
  }
  
  private static pascalCase(str: string): string {
    return str.replace(/(\w)(\w*)(_|-|\s)?/g, (g0, g1, g2) => 
      g1.toUpperCase() + g2.toLowerCase()
    );
  }
}
```

### NodeRegistry (src/node_registry.ts)

```typescript
/**
 * Registre central des noeuds disponibles
 * Gère l'instanciation et le caching des noeuds
 */
interface NodeConstructor {
  new (config: Record<string, any>): Igon7Node;
}

interface Igon7Node {
  execute(): Promise<any>;
  validate?(): boolean;
  close?(): Promise<void>;
}

const NodeRegistry: Record<string, NodeConstructor> = {
  // Noeuds personnalisés Genesis
  "clisis": ClisisNode,
  "stripe": StripeNode,
  "mobile_money": MobileMoneyNode,
  
  // Noeuds n8n importés
  "discord": DiscordNode,
  "slack": SlackNode,
  "telegram": TelegramNode,
  "email_send": EmailSendNode,
  "email_read_imap": EmailReadImapNode,
  "twilio": TwilioNode,
  "postgres": PostgreSQLNode,
  "mysql": MySQLNode,
  "mongodb": MongoDBNode,
  "redis": RedisNode,
  "elastic": ElasticNode,
  "salesforce": SalesforceNode,
  "hubspot": HubSpotNode,
  "jira": JiraNode,
  "trello": TrelloNode,
  "asana": AsanaNode,
  "openai": OpenAINode,
  "huggingface": HuggingFaceNode,
  "stability_ai": StabilityAINode,
  "shopify": ShopifyNode,
  "woocommerce": WooCommerceNode,
  "stripe_api": StripeAPINode,
  "paypal": PayPalNode,
  "twitter": TwitterNode,
  "facebook": FacebookNode,
  "instagram": InstagramNode,
  "linkedin": LinkedInNode,
  "tiktok": TikTokNode,
  "youtube": YouTubeNode,
  "github": GitHubNode,
  "gitlab": GitLabNode,
  "bitbucket": BitbucketNode,
  "execute_command": ExecuteCommandNode,
  "code": CodeNode,
  "filter": FilterNode,
  "merge": MergeNode,
  "split": SplitInBatchesNode,
  "aggregate": AggregateNode,
  "data_table": DataTableNode,
  "date_time": DateTimeNode,
};

class NodeRegistryManager {
  private static instance: NodeRegistryManager;
  private registry: Map<string, NodeConstructor> = new Map();
  private cache: Map<string, Igon7Node> = new Map();
  
  private constructor() {
    this.initialize();
  }
  
  static getInstance(): NodeRegistryManager {
    if (!NodeRegistryManager.instance) {
      NodeRegistryManager.instance = new NodeRegistryManager();
    }
    return NodeRegistryManager.instance;
  }
  
  private async initialize(): Promise<void> {
    // Charger tous les noeuds depuis le registre
    for (const [name, constructor] of Object.entries(NodeRegistry)) {
      this.registry.set(name, constructor);
    }
    
    // Charger les noeuds dynamiques
    const dynamicNodes = await Igon7NodeLoader.loadAllNodes();
    for (const [name, info] of dynamicNodes) {
      if (info.status === 'loaded') {
        // Récupérer le constructeur depuis le module chargé
        // ...
      }
    }
  }
  
  getNode(nodeType: string): NodeConstructor | undefined {
    return this.registry.get(nodeType);
  }
  
  async getNodeInstance(nodeType: string, config: Record<string, any>): Promise<Igon7Node> {
    const cacheKey = `${nodeType}:${JSON.stringify(config)}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }
    
    const constructor = this.getNode(nodeType);
    if (!constructor) {
      throw new Error(`Node type "${nodeType}" not found`);
    }
    
    const instance = new constructor(config);
    this.cache.set(cacheKey, instance);
    
    return instance;
  }
  
  listNodes(): string[] {
    return Array.from(this.registry.keys());
  }
  
  async close(): Promise<void> {
    for (const node of this.cache.values()) {
      if (node.close) {
        await node.close();
      }
    }
    this.cache.clear();
  }
}
```

---

## 📝 Types de Noeuds (304 Total)

### Catégories de Noeuds

#### 1. Communication (45 noeuds)

| Noeud | Description | Credentials |
|-------|-------------|-------------|
| **Discord** | Envoi/reception messages | Discord Bot Token |
| **Slack** | Messages, channels, files | Slack OAuth2 |
| **Telegram** | Bot messaging | Telegram Bot API |
| **EmailSend** | Envoi SMTP | SMTP Credentials |
| **EmailReadImap** | Lecture IMAP | IMAP Credentials |
| **Twilio** | SMS, Voice, WhatsApp | Twilio API Key |
| **WhatsApp** | Business API | WhatsApp Token |
| **Pushover** | Notifications push | Pushover Token |
| **SendGrid** | Email transactionnel | SendGrid API Key |
| **Mailchimp** | Email marketing | Mailchimp API Key |

#### 2. Bases de Données (38 noeuds)

| Noeud | Description | Credentials |
|-------|-------------|-------------|
| **PostgreSQL** | Requêtes SQL | PostgreSQL Connection |
| **MySQL** | Requêtes SQL | MySQL Connection |
| **MongoDB** | Operations CRUD | MongoDB Connection |
| **Redis** | Cache, pub/sub | Redis Connection |
| **Elastic** | Search, analytics | Elastic Cloud Auth |
| **CrateDB** | Time-series DB | CrateDB Connection |
| **DynamoDB** | NoSQL AWS | AWS IAM |
| **Cassandra** | Distributed DB | Cassandra Auth |
| **Snowflake** | Data warehouse | Snowflake Auth |
| **BigQuery** | Analytics GCP | GCP Service Account |

#### 3. Cloud Services (52 noeuds)

| Noeud | Description | Credentials |
|-------|-------------|-------------|
| **AWS S3** | Storage | AWS IAM |
| **AWS Lambda** | Serverless | AWS IAM |
| **AWS EC2** | Compute | AWS IAM |
| **AWS SQS** | Queue | AWS IAM |
| **AWS SNS** | Notifications | AWS IAM |
| **Google Drive** | File storage | Google OAuth2 |
| **Google Sheets** | Spreadsheets | Google OAuth2 |
| **Google Calendar** | Calendar events | Google OAuth2 |
| **Azure Blob** | Storage | Azure SAS |
| **Azure Functions** | Serverless | Azure AD |

#### 4. CRM & Sales (28 noeuds)

| Noeud | Description | Credentials |
|-------|-------------|-------------|
| **Salesforce** | CRM enterprise | Salesforce OAuth2 |
| **HubSpot** | CRM marketing | HubSpot API Key |
| **Pipedrive** | Sales pipeline | Pipedrive API |
| **Copper** | CRM G Suite | Copper API Key |
| **AgileCrm** | CRM tout-en-un | AgileCrm API |
| **Zoho** | Suite business | Zoho OAuth2 |

#### 5. Project Management (25 noeuds)

| Noeud | Description | Credentials |
|-------|-------------|-------------|
| **Jira** | Issue tracking | Jira API Token |
| **Trello** | Kanban boards | Trello API Key |
| **Asana** | Task management | Asana API Token |
| **ClickUp** | Project mgmt | ClickUp API Token |
| **Monday** | Work OS | Monday API Key |
| **Linear** | Issue tracking | Linear API Key |
| **Notion** | Wiki, docs | Notion Integration |

#### 6. AI & ML (35 noeuds)

| Noeud | Description | Credentials |
|-------|-------------|-------------|
| **OpenAI** | GPT, DALL-E | OpenAI API Key |
| **HuggingFace** | ML models | HuggingFace Token |
| **StabilityAI** | Image generation | StabilityAI Key |
| **AITransform** | AI transformations | Various |
| **LangChain** | LLM orchestration | Various |
| **Anthropic** | Claude AI | Anthropic API Key |
| **Cohere** | NLP models | Cohere API Key |

#### 7. E-commerce (22 noeuds)

| Noeud | Description | Credentials |
|-------|-------------|-------------|
| **Shopify** | Store mgmt | Shopify API Key |
| **WooCommerce** | WordPress shop | WooCommerce API |
| **Stripe** | Payments | Stripe API Key |
| **PayPal** | Payments | PayPal OAuth2 |
| **Square** | Payments POS | Square Access Token |

#### 8. Social Media (30 noeuds)

| Noeud | Description | Credentials |
|-------|-------------|-------------|
| **Twitter** | Tweets, DMs | Twitter OAuth2 |
| **Facebook** | Pages, posts | Facebook OAuth2 |
| **Instagram** | Posts, stories | Instagram Graph API |
| **LinkedIn** | Posts, messages | LinkedIn OAuth2 |
| **TikTok** | Video upload | TikTok API |
| **YouTube** | Video upload | YouTube OAuth2 |

#### 9. Development (29 noeuds)

| Noeud | Description | Credentials |
|-------|-------------|-------------|
| **GitHub** | Repos, issues | GitHub Token |
| **GitLab** | CI/CD, repos | GitLab Token |
| **Bitbucket** | Repos, pipelines | Bitbucket Token |
| **ExecuteCommand** | Shell commands | None |
| **Code** | JavaScript/Python | None |

---

## 🔐 Types de Credentials (390 Total)

### Catégories

#### OAuth2 (150+ services)

```typescript
interface OAuth2Credential {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresAt?: number;
  scope?: string;
}

// Exemples: Google, Facebook, GitHub, Slack, Discord, etc.
```

#### API Key (200+ services)

```typescript
interface ApiKeyCredential {
  apiKey: string;
  apiSecret?: string;
  baseUrl?: string;
}

// Exemples: OpenAI, Stripe, Twilio, SendGrid, etc.
```

#### Basic Auth (40+ services)

```typescript
interface BasicAuthCredential {
  username: string;
  password: string;
}

// Exemples: SMTP, IMAP, FTP, etc.
```

---

## ❌ Types d'Erreurs

### Hiérarchie des Erreurs

```typescript
// packages/workflow/src/errors/

abstract class WorkflowError extends Error {
  code: string;
  cause?: Error;
  timestamp: number;
  
  constructor(message: string, code: string, cause?: Error) {
    super(message);
    this.code = code;
    this.cause = cause;
    this.timestamp = Date.now();
  }
}

class WorkflowActivationError extends WorkflowError {
  constructor(message: string, cause?: Error) {
    super(message, 'WORKFLOW_ACTIVATION_FAILED', cause);
  }
}

class NodeOperationError extends WorkflowError {
  nodeType: string;
  nodeId: string;
  
  constructor(nodeType: string, nodeId: string, message: string, cause?: Error) {
    super(message, 'NODE_OPERATION_FAILED', cause);
    this.nodeType = nodeType;
    this.nodeId = nodeId;
  }
}

class NodeApiError extends NodeOperationError {
  httpCode: number;
  response: any;
  
  constructor(
    nodeType: string,
    nodeId: string,
    message: string,
    httpCode: number,
    response: any,
    cause?: Error
  ) {
    super(nodeType, nodeId, message, cause);
    this.httpCode = httpCode;
    this.response = response;
  }
}

class ExpressionError extends WorkflowError {
  expression: string;
  context: any;
  
  constructor(expression: string, context: any, message: string, cause?: Error) {
    super(message, 'EXPRESSION_EVALUATION_FAILED', cause);
    this.expression = expression;
    this.context = context;
  }
}

class TimeoutError extends NodeOperationError {
  timeout: number;
  
  constructor(nodeType: string, nodeId: string, timeout: number) {
    super(nodeType, nodeId, `Operation timed out after ${timeout}ms`);
    this.timeout = timeout;
  }
}

class CredentialsNotFoundError extends WorkflowError {
  credentialType: string;
  credentialId: string;
  
  constructor(credentialType: string, credentialId: string) {
    super(`Credentials "${credentialType}:${credentialId}" not found`, 'CREDENTIALS_NOT_FOUND');
    this.credentialType = credentialType;
    this.credentialId = credentialId;
  }
}

class RateLimitError extends NodeApiError {
  retryAfter: number;
  
  constructor(
    nodeType: string,
    nodeId: string,
    retryAfter: number,
    response: any
  ) {
    super(nodeType, nodeId, 'Rate limit exceeded', 429, response);
    this.retryAfter = retryAfter;
  }
}
```

---

## 🧪 Testing

### Configuration Vitest

```typescript
// vitest.workspace.ts
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    test: {
      name: 'workflow',
      root: './packages/workflow',
      environment: 'node',
      include: ['test/**/*.test.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  },
  {
    test: {
      name: 'nodes-base',
      root: './packages/nodes-base',
      environment: 'node',
      include: ['test/**/*.test.ts'],
    },
  },
]);
```

### Exemples de Tests

```typescript
// packages/workflow/test/workflow.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { Workflow } from '../src/workflow';
import { NodeOperationError } from '../src/errors';

describe('Workflow', () => {
  let workflow: Workflow;
  
  beforeEach(() => {
    workflow = new Workflow({
      id: 'test-workflow',
      name: 'Test Workflow',
    });
  });
  
  it('should create workflow with nodes', () => {
    workflow.addNode({
      id: 'node1',
      type: 'openai',
      parameters: { model: 'gpt-4' },
    });
    
    expect(workflow.nodes).toHaveLength(1);
  });
  
  it('should validate node connections', () => {
    workflow.addNode({ id: 'node1', type: 'openai' });
    workflow.addNode({ id: 'node2', type: 'slack' });
    
    workflow.addConnection('node1', 'node2', 'main');
    
    expect(workflow.connections).toHaveLength(1);
  });
  
  it('should throw on circular dependency', () => {
    workflow.addNode({ id: 'node1', type: 'openai' });
    workflow.addNode({ id: 'node2', type: 'slack' });
    
    workflow.addConnection('node1', 'node2', 'main');
    workflow.addConnection('node2', 'node1', 'main');
    
    expect(() => workflow.validate()).toThrow('Circular dependency');
  });
});
```

---

**Version :** 1.0.0  
**Dernière mise à jour :** 28 Mars 2026  
**Statut :** ✅ Documentation Complète
