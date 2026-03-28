---
sidebar_position: 4
---

# Genesis Nexus - Documentation Complète

**Genesis Nexus** est le cerveau central de l'écosystème, implémentant le protocole A2A pour la communication inter-agents et le routage neural des requêtes.

---

## 📊 Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| **Fichiers TypeScript** | 150+ fichiers |
| **Scripts de simulation** | 18 scripts |
| **Protocoles implémentés** | A2A v1.0, WebSocket, gRPC |
| **Agents supportés** | 7 types d'agents |
| **Ports** | 8080 (HTTP/WS), 18789 (ClawX) |
| **Lignes de code** | ~50,000+ lignes |

---

## 🏗️ Architecture Détaillée

### Structure du Projet

```
genesis-nexus/
├── src/
│   ├── activities/              # Activités exécutables
│   │   ├── workflow-activity.ts
│   │   ├── agent-activity.ts
│   │   └── monitoring-activity.ts
│   │
│   ├── agents/                  # Registres d'agents
│   │   ├── cai-agents/          # Agents CAI (Conversational AI)
│   │   │   ├── agent-registry.ts
│   │   │   ├── capability-matcher.ts
│   │   │   └── intent-classifier.ts
│   │   ├── procurement.ts       # Agent d'approvisionnement
│   │   └── registry.ts          # Registre global
│   │
│   ├── ai/                      # Modules AI
│   │   ├── embedding-models.ts
│   │   ├── llm-clients.ts
│   │   └── vector-store.ts
│   │
│   ├── benchmarks/              # Benchmarks de performance
│   │   ├── routing-benchmark.ts
│   │   └── throughput-benchmark.ts
│   │
│   ├── brain/                   # Cerveau principal
│   │   ├── context7.ts          # Contexte LLM
│   │   ├── fabric-harvester.ts  # Récolte de patterns
│   │   ├── fabric-synthesis.ts  # Synthèse de patterns
│   │   ├── learner.ts           # Apprentissage continu
│   │   ├── mcp-forge.ts         # Génération MCP
│   │   ├── patterns.ts          # Patterns de décision
│   │   └── tutorial.ts          # Tutoriels
│   │
│   ├── bridge/                  # Ponts de communication
│   │   ├── clawx-bridge.ts
│   │   └── protocol-bridge.ts
│   │
│   ├── cache/                   # Système de cache
│   │   ├── lru-cache.ts
│   │   └── distributed-cache.ts
│   │
│   ├── chaos/                   # Tests de chaos
│   │   ├── chaos-engine.ts
│   │   └── failure-injection.ts
│   │
│   ├── config/                  # Configuration
│   │   ├── env.ts
│   │   ├── constants.ts
│   │   └── features.ts
│   │
│   ├── connectors/              # Connecteurs externes
│   │   ├── database-connector.ts
│   │   ├── redis-connector.ts
│   │   └── temporal-connector.ts
│   │
│   ├── core/                    # Coeur du système
│   │   ├── __tests__/
│   │   ├── vault-wasm/          # Vault WASM pour encryption
│   │   │   ├── vault.ts
│   │   │   └── crypto.ts
│   │   ├── database.ts          # Client PostgreSQL
│   │   ├── env.ts               # Variables d'environnement
│   │   ├── migrate.ts           # Migrations DB
│   │   ├── network-optimizer.ts # Optimisation réseau
│   │   ├── redis-cluster.ts     # Client Redis Cluster
│   │   └── vault.ts             # Gestion des secrets
│   │
│   ├── daemon/                  # Services background
│   │   └── ghost.ts             # Daemon fantôme
│   │
│   ├── engine/                  # Moteur d'exécution
│   │   ├── execution-engine.ts
│   │   └── task-scheduler.ts
│   │
│   ├── gateways/                # Passerelles d'entrée
│   │   ├── telegram.ts          # Gateway Telegram
│   │   ├── whatsapp.ts          # Gateway WhatsApp
│   │   ├── cli.ts               # Interface CLI
│   │   ├── mobile-app.ts        # Gateway Mobile
│   │   └── nexus.ts             # Gateway principal
│   │
│   ├── graphiti/                # Graphe de connaissances
│   │   ├── knowledge-graph.ts
│   │   └── relationship-extractor.ts
│   │
│   ├── guardian/                # Couche de sécurité
│   │   ├── exec.ts              # Exécution sécurisée
│   │   └── security.ts          # Politiques de sécurité
│   │
│   ├── igon7/                   # Intégration igon7
│   │   ├── workflow-client.ts
│   │   └── execution-monitor.ts
│   │
│   ├── logging/                 # Système de logs
│   │   ├── logger.ts
│   │   └── log-aggregator.ts
│   │
│   ├── mobile/                  # Support mobile
│   │   └── mobile-sync.ts
│   │
│   ├── observability/           # Observabilité
│   │   ├── metrics.ts
│   │   ├── tracing.ts
│   │   └── alerting.ts
│   │
│   ├── openclaw/                # Protocole OpenClaw
│   │   └── bridge.ts
│   │
│   ├── orchestration/           # Orchestration
│   │   ├── orchestrator.ts
│   │   └── coordinator.ts
│   │
│   ├── pentestgpt/              # AI Pentesting
│   │   ├── pentest-agent.ts
│   │   └── vulnerability-scanner.ts
│   │
│   ├── protocols/               # Protocoles de communication
│   │   ├── A2A_PROTOCOL_SPEC.md # Spécification A2A
│   │   └── a2a-protocol.ts      # Implémentation A2A
│   │
│   ├── reliability/             # Fiabilité
│   │   ├── circuit-breaker.ts
│   │   └── retry-manager.ts
│   │
│   ├── server/                  # Serveurs
│   │   ├── state.ts             # Gestion d'état
│   │   ├── skills.ts            # Registre de compétences
│   │   ├── sentinel.ts          # Health monitoring
│   │   ├── nexus-bridge.ts      # Pont Nexus
│   │   ├── nexus.ts             # Serveur principal
│   │   ├── router.ts            # Routeur de requêtes
│   │   ├── intelligence.ts      # Intelligence AI
│   │   ├── clawx-bridge.ts      # Pont ClawX
│   │   ├── identity.ts          # Gestion d'identité
│   │   ├── session-continuity.ts # Continuité de session
│   │   ├── agent-factory.ts     # Fabrique d'agents
│   │   ├── marketplace-client.ts # Client Marketplace
│   │   ├── rate-limiter.ts      # Limitation de débit
│   │   ├── websocket-server.ts  # Serveur WebSocket
│   │   └── api-routes.ts        # Routes API
│   │
│   ├── skills/                  # Compétences
│   │   ├── skill-registry.ts
│   │   └── skill-executor.ts
│   │
│   ├── tests/                   # Tests
│   │   ├── integration/
│   │   └── unit/
│   │
│   ├── tools/                   # Outils
│   │   ├── code-executor.ts
│   │   └── web-scraper.ts
│   │
│   ├── workers/                 # Workers
│   │   ├── background-worker.ts
│   │   └── queue-worker.ts
│   │
│   ├── workflows/               # Workflows
│   │   ├── workflow-manager.ts
│   │   └── workflow-templates/
│   │
│   ├── attack_simulation.ts     # Simulation d'attaques
│   ├── birth_test.ts            # Test de naissance
│   ├── chaos_test.ts            # Test de chaos
│   ├── companion_simulation.ts  # Simulation Companion
│   ├── crash_test_db.ts         # Test de crash DB
│   ├── dangerous_simulation.ts  # Simulation dangereuse
│   ├── final_awakening_sim.ts   # Simulation éveil
│   ├── genesis_personas_simulation.ts # Simulation personas
│   ├── load_test_igon7.ts       # Test de charge igon7
│   ├── load_test.ts             # Test de charge
│   ├── main.ts                  # Point d'entrée
│   ├── redteam_simulation.ts    # Simulation Red Team
│   ├── rust_signatures.ts       # Signatures Rust
│   ├── simulation_sync_desktop.ts # Sync Desktop
│   ├── simulation_trinity_final.ts # Trinity Final
│   ├── simulation_trinity.ts    # Trinity
│   ├── simulation.ts            # Simulation générale
│   ├── survival_test.ts         # Test de survie
│   ├── tentacles_ux_test.ts     # Test UX Tentacles
│   └── worker.ts                # Worker principal
│
├── public/                      # Assets publics
│
├── tests/                       # Tests E2E
│
├── deno.json                    # Configuration Deno
├── deno.lock                    # Lockfile
├── Dockerfile                   # Container Docker
└── README.md                    # Documentation
```

---

## 🔐 Protocole A2A (Agent-to-Agent)

### Spécification Complète

Le protocole A2A est le langage de communication universel entre tous les agents Genesis.

#### Message Format

```typescript
/**
 * Format de message A2A v1.0
 * Tous les champs sont requis sauf indication contraire
 */
interface A2AMessage {
  // Header (required)
  id: string;                    // UUID v4 unique
  type: MessageType;             // Type de message
  version: string;               // Version du protocole (ex: "1.0.0")
  timestamp: number;             // Unix timestamp en millisecondes
  
  // Routing
  from: AgentIdentity;           // Identité de l'expéditeur
  to: AgentIdentity;             // Identité du destinataire
  correlationId?: string;        // Pour lier request/response
  
  // Payload
  action?: string;               // Action à exécuter
  payload?: any;                 // Données du message
  result?: any;                  // Résultat (pour response)
  error?: A2AError;              // Erreur (pour error)
  
  // Security
  signature: string;             // Signature HMAC-SHA256
  encryption?: EncryptionData;   // Données chiffrées (optionnel)
  
  // Metadata
  priority: Priority;            // Priorité du message
  ttl: number;                   // Time to live en ms
  requiresAck: boolean;          // Accusé de réception requis
  requiresSignature: boolean;    // Signature requise
}

enum MessageType {
  COMMAND = 'command',           // Ordre d'exécution
  QUERY = 'query',               // Demande d'information
  EVENT = 'event',               // Notification d'événement
  RESPONSE = 'response',         // Réponse à une requête
  ACK = 'ack',                   // Accusé de réception
  ERROR = 'error',               // Notification d'erreur
}

enum AgentType {
  NEXUS = 'nexus',               // Cerveau central
  IGON7 = 'igon7',               // Moteur de workflow
  CLISIS = 'clisis',             // Agent système
  MOBILE = 'mobile',             // Application mobile
  DESKTOP = 'desktop',           // Application desktop
  EXTENSION = 'extension',       // Extension navigateur
  MCP = 'mcp',                   // Model Context Protocol
}

enum Priority {
  LOW = 'low',                   # Traitement quand possible
  NORMAL = 'normal',             # Traitement standard
  HIGH = 'high',                 # Traitement prioritaire
  CRITICAL = 'critical',         # Traitement immédiat
}

interface AgentIdentity {
  id: string;                    // UUID unique de l'agent
  type: AgentType;               // Type d'agent
  version: string;               // Version de l'agent
  capabilities: string[];        // Capacités de l'agent
  endpoint?: string;             # Endpoint de communication
  publicKey?: string;            # Clé publique pour vérification
}

interface EncryptionData {
  algorithm: 'AES-256-GCM';      # Algorithme de chiffrement
  iv: string;                    # Vecteur d'initialisation (base64)
  ciphertext: string;            # Données chiffrées (base64)
  authTag: string;               # Tag d'authentification (base64)
}

interface A2AError {
  code: string;                  # Code d'erreur unique
  message: string;               # Message lisible
  details?: any;                 # Détails supplémentaires
  stack?: string;                # Stack trace (debug)
  retryable: boolean;            # Peut-on retry?
  timestamp: number;             # Timestamp de l'erreur
}
```

#### Codes d'Erreur

| Code | Description | Retryable |
|------|-------------|-----------|
| `AUTH_FAILED` | Échec d'authentification | Non |
| `UNAUTHORIZED` | Action non autorisée | Non |
| `NOT_FOUND` | Agent/resource introuvable | Non |
| `INVALID_MESSAGE` | Format de message invalide | Non |
| `SIGNATURE_INVALID` | Signature invalide | Non |
| `TIMEOUT` | Délai d'attente dépassé | Oui |
| `UNAVAILABLE` | Agent indisponible | Oui |
| `RATE_LIMITED` | Limite de débit atteinte | Oui |
| `INTERNAL_ERROR` | Erreur interne | Oui |
| `NETWORK_ERROR` | Erreur réseau | Oui |
| `VALIDATION_ERROR` | Erreur de validation | Non |
| `EXECUTION_FAILED` | Échec d'exécution | Oui |

---

## 🧠 Classes Principales

### A2AProtocol Class

```typescript
/**
 * Implémentation complète du protocole A2A
 * Gère la communication, le routage et la sécurité
 */
class A2AProtocol extends EventEmitter {
  // Constantes
  private static readonly PROTOCOL_VERSION = '1.0.0';
  private static readonly HEARTBEAT_INTERVAL = 30000;    // 30 secondes
  private static readonly HEARTBEAT_TIMEOUT = 90000;     // 90 secondes
  private static readonly MESSAGE_RATE_LIMIT = 100;      // 100 messages/seconde
  private static readonly RATE_LIMIT_WINDOW = 1000;      // 1 seconde
  
  // État interne
  private agents: Map<string, RegisteredAgent>;          // Agents enregistrés
  private pendingRequests: Map<string, PendingRequest>;  // Requêtes en attente
  private rateLimits: Map<string, RateLimitEntry>;       // Limites de débit
  private wss?: WebSocketServer;                         // Serveur WebSocket
  private secretKey: string;                             // Clé secrète pour HMAC
  
  /**
   * Démarre le serveur A2A
   * @param port - Port d'écoute
   */
  async start(port: number): Promise<void> {
    this.wss = new WebSocketServer({ port });
    
    this.wss.on('connection', (ws, request) => {
      this.handleConnection(ws, request);
    });
    
    // Heartbeat pour détecter les agents morts
    setInterval(() => this.checkStaleAgents(), this.HEARTBEAT_INTERVAL);
    
    console.log(`A2A Protocol server started on port ${port}`);
  }
  
  /**
   * Arrête le serveur
   */
  async stop(): Promise<void> {
    if (this.wss) {
      await this.closeAllConnections();
      this.wss.close();
    }
  }
  
  /**
   * Envoie un message à un agent spécifique
   * @param agentId - ID de l'agent destinataire
   * @param message - Message à envoyer
   * @returns Promesse résolue avec la réponse
   */
  async sendToAgent(agentId: string, message: A2AMessage): Promise<A2AMessage> {
    const agent = this.agents.get(agentId);
    
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }
    
    // Vérifier la limite de débit
    this.checkRateLimit(agentId);
    
    // Signer le message
    if (message.requiresSignature) {
      message.signature = this.signMessage(message);
    }
    
    // Envoyer via WebSocket
    agent.socket.send(JSON.stringify(message));
    
    // Attendre la réponse si nécessaire
    if (message.requiresAck || message.type === MessageType.QUERY) {
      return this.waitForResponse(message.id, agent.timeout);
    }
    
    return undefined;
  }
  
  /**
   * Broadcast un message à tous les agents
   * @param message - Message à broadcaster
   */
  async broadcast(message: A2AMessage): Promise<void> {
    const promises = Array.from(this.agents.values()).map(agent =>
      this.sendToAgent(agent.id, message).catch(err => {
        console.error(`Failed to send to ${agent.id}:`, err);
      })
    );
    
    await Promise.all(promises);
  }
  
  /**
   * Retourne la liste des agents enregistrés
   */
  getRegisteredAgents(): RegisteredAgent[] {
    return Array.from(this.agents.values());
  }
  
  /**
   * Retourne un agent par son ID
   */
  getAgent(agentId: string): RegisteredAgent | undefined {
    return this.agents.get(agentId);
  }
  
  /**
   * Statistiques des agents
   */
  getAgentStats(): AgentStats {
    const total = this.agents.size;
    const active = Array.from(this.agents.values()).filter(
      a => a.status === 'active'
    ).length;
    const stale = total - active;
    
    return { total, active, stale };
  }
  
  /**
   * Vérifie les agents obsolètes
   */
  checkStaleAgents(): void {
    const now = Date.now();
    
    for (const [id, agent] of this.agents) {
      if (now - agent.lastHeartbeat > this.HEARTBEAT_TIMEOUT) {
        console.warn(`Agent ${id} is stale, removing...`);
        this.unregisterAgent(id);
      }
    }
  }
  
  // Méthodes privées
  
  private handleConnection(ws: WebSocket, request: IncomingMessage): void {
    // Authentification
    const token = this.extractToken(request);
    const agentId = this.validateToken(token);
    
    if (!agentId) {
      ws.close(4001, 'Unauthorized');
      return;
    }
    
    // Enregistrement de l'agent
    ws.on('message', (data) => {
      const message = JSON.parse(data.toString());
      this.handleMessage(agentId, message, ws);
    });
    
    ws.on('close', () => {
      this.unregisterAgent(agentId);
    });
    
    ws.on('pong', () => {
      const agent = this.agents.get(agentId);
      if (agent) {
        agent.lastHeartbeat = Date.now();
      }
    });
  }
  
  private handleMessage(
    agentId: string,
    message: A2AMessage,
    ws: WebSocket
  ): void {
    // Vérifier la signature
    if (message.requiresSignature && !this.verifySignature(message)) {
      ws.send(JSON.stringify({
        type: MessageType.ERROR,
        correlationId: message.id,
        error: {
          code: 'SIGNATURE_INVALID',
          message: 'Invalid message signature',
          retryable: false,
          timestamp: Date.now(),
        },
      }));
      return;
    }
    
    // Traiter le message selon le type
    switch (message.type) {
      case MessageType.COMMAND:
        this.handleCommand(agentId, message);
        break;
      case MessageType.QUERY:
        this.handleQuery(agentId, message, ws);
        break;
      case MessageType.EVENT:
        this.handleEvent(agentId, message);
        break;
      case MessageType.RESPONSE:
        this.handleResponse(agentId, message);
        break;
      case MessageType.ACK:
        this.handleAck(agentId, message);
        break;
    }
  }
  
  private signMessage(message: A2AMessage): string {
    const payload = JSON.stringify({
      id: message.id,
      type: message.type,
      from: message.from,
      to: message.to,
      action: message.action,
      payload: message.payload,
      timestamp: message.timestamp,
    });
    
    return createHmac('sha256', this.secretKey)
      .update(payload)
      .digest('hex');
  }
  
  private verifySignature(message: A2AMessage): boolean {
    const expected = this.signMessage(message);
    return message.signature === expected;
  }
  
  private checkRateLimit(agentId: string): void {
    const now = Date.now();
    let entry = this.rateLimits.get(agentId);
    
    if (!entry) {
      entry = { count: 0, resetAt: now + this.RATE_LIMIT_WINDOW };
      this.rateLimits.set(agentId, entry);
    }
    
    if (now > entry.resetAt) {
      entry.count = 0;
      entry.resetAt = now + this.RATE_LIMIT_WINDOW;
    }
    
    entry.count++;
    
    if (entry.count > this.MESSAGE_RATE_LIMIT) {
      throw new Error('Rate limit exceeded');
    }
  }
  
  private async waitForResponse(
    messageId: string,
    timeout: number
  ): Promise<A2AMessage> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pendingRequests.delete(messageId);
        reject(new Error('Response timeout'));
      }, timeout);
      
      this.pendingRequests.set(messageId, { resolve, reject, timer });
    });
  }
}
```

### GenesisVault Class

```typescript
/**
 * Coffre-fort pour la gestion des secrets
 * Utilise le chiffrement AES-256-GCM
 */
class GenesisVault {
  private static masterKey: CryptoKey | null = null;
  private static secretStore: Map<string, string> = new Map();
  
  /**
   * Déverrouille le vault avec un mot de passe
   * @param password - Mot de passe maître
   */
  static async unlock(password: string): Promise<void> {
    // Dériver la clé maître avec PBKDF2
    const encoder = new TextEncoder();
    const salt = encoder.encode(process.env.VAULT_SALT || 'default-salt');
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );
    
    this.masterKey = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }
  
  /**
   * Chiffre un texte
   * @param text - Texte à chiffrer
   * @returns Données chiffrées en base64
   */
  static async encrypt(text: string): Promise<string> {
    if (!this.masterKey) {
      throw new Error('Vault is locked');
    }
    
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      this.masterKey,
      encoder.encode(text)
    );
    
    const result = {
      iv: Buffer.from(iv).toString('base64'),
      ciphertext: Buffer.from(ciphertext).toString('base64'),
    };
    
    return JSON.stringify(result);
  }
  
  /**
   * Déchiffre un texte
   * @param base64 - Données chiffrées en base64
   * @returns Texte déchiffré
   */
  static async decrypt(base64: string): Promise<string> {
    if (!this.masterKey) {
      throw new Error('Vault is locked');
    }
    
    const { iv, ciphertext } = JSON.parse(atob(base64));
    
    const plaintext = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(Buffer.from(iv, 'base64')) },
      this.masterKey,
      new Uint8Array(Buffer.from(ciphertext, 'base64'))
    );
    
    return new TextDecoder().decode(plaintext);
  }
  
  /**
   * Déchiffre et exécute un callback avec le secret
   * Le secret n'est jamais stocké en clair
   * @param base64 - Données chiffrées
   * @param callback - Callback avec le secret déchiffré
   */
  static async decryptAndScrub(
    base64: string,
    callback: (secret: string) => void
  ): Promise<void> {
    const secret = await this.decrypt(base64);
    
    try {
      callback(secret);
    } finally {
      // Scrubbing - effacer le secret de la mémoire
      this.scrubString(secret);
    }
  }
  
  /**
   * Vérifie si un secret existe
   */
  static async hasSecret(key: string): Promise<boolean> {
    return this.secretStore.has(key);
  }
  
  /**
   * Retourne un secret chiffré
   */
  static async getEncrypted(key: string): Promise<string> {
    const encrypted = this.secretStore.get(key);
    
    if (!encrypted) {
      throw new Error(`Secret "${key}" not found`);
    }
    
    return encrypted;
  }
  
  /**
   * Stocke un secret chiffré
   */
  static async storeSecret(key: string, encryptedValue: string): Promise<void> {
    this.secretStore.set(key, encryptedValue);
  }
  
  /**
   * Vérifie si le vault est déverrouillé
   */
  static isUnlocked(): boolean {
    return this.masterKey !== null;
  }
  
  /**
   * Efface une chaîne de la mémoire (best effort)
   */
  private static scrubString(str: string): void {
    // Remplacer par des zéros (best effort, pas garanti en JS)
    for (let i = 0; i < str.length; i++) {
      str = str.substring(0, i) + '\0' + str.substring(i + 1);
    }
  }
}
```

### GenesisDB Class

```typescript
/**
 * Couche de base de données avec cache Redis
 */
class GenesisDB {
  private sql: postgres.Sql | null = null;
  private redis: Redis | null = null;
  private redisPubSub: Redis | null = null;
  
  /**
   * Initialise les connexions
   */
  async init(): Promise<void> {
    // PostgreSQL
    this.sql = postgres(process.env.DATABASE_URL || 'postgres://localhost/genesis');
    
    // Redis
    this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
    this.redisPubSub = this.redis.duplicate();
    
    // Tester les connexions
    await this.sql`SELECT 1`;
    await this.redis.ping();
  }
  
  /**
   * Sauvegarde un message
   */
  async saveMessage(msg: MessageData): Promise<void> {
    await this.sql`
      INSERT INTO messages (id, channel_id, content, sender, timestamp)
      VALUES (${msg.id}, ${msg.channelId}, ${msg.content}, ${msg.sender}, ${msg.timestamp})
    `;
    
    // PubSub pour notification en temps réel
    await this.redisPubSub.publish(`channel:${msg.channelId}`, JSON.stringify(msg));
  }
  
  /**
   * Récupère les messages d'un canal
   */
  async getMessages(channelId: string, limit: number = 50): Promise<MessageData[]> {
    // Vérifier le cache Redis
    const cached = await this.redis.get(`messages:${channelId}`);
    
    if (cached) {
      return JSON.parse(cached);
    }
    
    // Requête DB
    const messages = await this.sql<MessageData[]>`
      SELECT * FROM messages
      WHERE channel_id = ${channelId}
      ORDER BY timestamp DESC
      LIMIT ${limit}
    `;
    
    // Cache pour 5 minutes
    await this.redis.setex(
      `messages:${channelId}`,
      300,
      JSON.stringify(messages)
    );
    
    return messages;
  }
  
  /**
   * Sauvegarde une action
   */
  async saveAction(action: ActionData): Promise<void> {
    await this.sql`
      INSERT INTO actions (id, type, status, payload, created_at)
      VALUES (${action.id}, ${action.type}, ${action.status}, ${action.payload}, ${action.createdAt})
    `;
  }
  
  /**
   * Récupère les actions par status
   */
  async getActions(status?: string, limit: number = 100): Promise<ActionData[]> {
    const query = status
      ? this.sql`SELECT * FROM actions WHERE status = ${status} ORDER BY created_at DESC LIMIT ${limit}`
      : this.sql`SELECT * FROM actions ORDER BY created_at DESC LIMIT ${limit}`;
    
    return query;
  }
  
  /**
   * Met à jour le status d'une action
   */
  async updateActionStatus(actionId: string, status: string): Promise<void> {
    await this.sql`
      UPDATE actions SET status = ${status}, updated_at = NOW()
      WHERE id = ${actionId}
    `;
  }
  
  /**
   * Sauvegarde un snapshot d'état
   */
  async saveStateSnapshot(snapshot: StateSnapshot): Promise<void> {
    await this.sql`
      INSERT INTO state_snapshots (id, state_data, created_at)
      VALUES (${snapshot.id}, ${JSON.stringify(snapshot.data)}, ${snapshot.createdAt})
    `;
  }
  
  /**
   * Récupère un snapshot
   */
  async getStateSnapshot(id: string): Promise<Record<string, unknown> | null> {
    const result = await this.sql<StateSnapshot[]>`
      SELECT state_data FROM state_snapshots WHERE id = ${id}
      ORDER BY created_at DESC LIMIT 1
    `;
    
    return result.length > 0 ? result[0].state_data : null;
  }
  
  /**
   * S'abonne aux changements d'un canal
   */
  async subscribe(channel: string, callback: (data: any) => void): Promise<() => void> {
    await this.redisPubSub.subscribe(channel, (message) => {
      callback(JSON.parse(message));
    });
    
    // Retourne une fonction de désabonnement
    return () => {
      this.redisPubSub.unsubscribe(channel);
    };
  }
  
  /**
   * Vérifie la santé des connexions
   */
  async healthCheck(): Promise<{ postgres: boolean; redis: boolean }> {
    try {
      await this.sql`SELECT 1`;
      await this.redis.ping();
      return { postgres: true, redis: true };
    } catch (error) {
      return {
        postgres: false,
        redis: false,
      };
    }
  }
  
  /**
   * Ferme les connexions
   */
  async close(): Promise<void> {
    if (this.sql) {
      await this.sql.end();
    }
    if (this.redis) {
      await this.redis.quit();
    }
    if (this.redisPubSub) {
      await this.redisPubSub.quit();
    }
  }
}
```

---

## 📋 Configuration

### deno.json

```json
{
  "workspace": ["./src/openclaw"],
  "tasks": {
    "start": "deno run --allow-all src/main.ts",
    "dev": "deno run --watch --allow-all src/main.ts",
    "sim": "deno run --allow-all src/genesis_personas_simulation.ts",
    "harvest": "deno run --allow-all src/brain/fabric-harvester.ts",
    "worker": "deno run --allow-all src/worker.ts",
    "chaos-test": "deno run --allow-all src/chaos_test.ts",
    "build": "deno run --allow-all scripts/build_release.ts",
    "migrate": "deno run --allow-all src/core/migrate.ts"
  },
  "imports": {
    "postgres": "npm:postgres@^3.4.4",
    "ioredis": "npm:ioredis@^5.3.2",
    "rate-limiter-flexible": "npm:rate-limiter-flexible@^5.0.0",
    "ws": "npm:ws@^8.18.0",
    "hmac": "npm:hmac@^0.2.0"
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

### Variables d'Environnement

```bash
# Nexus Configuration
NEXUS_PORT=8080
CLAWX_LEGACY_PORT=18789
GENESIS_NEXUS_URL=ws://localhost:8080/ws

# Database
DATABASE_URL=postgres://localhost:5432/genesis
REDIS_URL=redis://localhost:6379

# Security
VAULT_SALT=random-salt-2026
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=master-encryption-key

# Agent URLs
IGON7_URL=ws://localhost:18791
CLISIS_URL=ws://localhost:18792
TEMPORAL_ADDRESS=localhost:7233

# Monitoring
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
PROMETHEUS_PORT=9090
```

---

**Version :** 1.0.0  
**Dernière mise à jour :** 28 Mars 2026  
**Statut :** ✅ Documentation Complète
