---
sidebar_position: 1
---

# Genesis Marketplace - Documentation Complète

**Genesis Marketplace** est une plateforme décentralisée pour l'échange de blueprints d'agents AI chiffrés, avec système de paiement intégré et royalties automatiques.

---

## 📊 Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| **Fichiers TypeScript** | 40+ fichiers |
| **Services** | 4 services principaux |
| **Smart Contracts** | EVM-compatible |
| **Storage** | IPFS |
| **Runtime** | Deno |

---

## 🏗️ Architecture

### Structure du Projet

```
genesis-marketplace/
├── src/
│   ├── components/               # Composants UI
│   │   ├── AgentCard.tsx
│   │   ├── AgentList.tsx
│   │   ├── AgentDetail.tsx
│   │   ├── PurchaseDialog.tsx
│   │   ├── RatingStars.tsx
│   │   └── PriceTag.tsx
│   │
│   ├── repositories/             # Repositories
│   │   ├── agent-repository.ts
│   │   ├── listing-repository.ts
│   │   └── transaction-repository.ts
│   │
│   ├── services/                 # Services principaux
│   │   ├── marketplace.ts        # Service principal
│   │   ├── payment-service.ts    # Paiements
│   │   ├── staking-service.ts    # Staking
│   │   └── ipfs-service.ts       # Stockage décentralisé
│   │
│   ├── staking/                  # Module de Staking
│   │   ├── staking-pool.ts
│   │   ├── rewards-calculator.ts
│   │   └── lock-manager.ts
│   │
│   ├── types/                    # Types TypeScript
│   │   ├── agent.ts
│   │   ├── listing.ts
│   │   ├── transaction.ts
│   │   └── payment.ts
│   │
│   ├── api.ts                    # Client API
│   └── hub.ts                    # Hub principal
│
├── storage/                      # Storage local
├── CLAWHUB_ABSORPTION.md
├── GEMINI.md
├── INSTALL.md
├── LICENSE
├── QWEN.md
├── README.en.md
├── README.md
└── package.json
```

---

## 🛒 Core Services

### Marketplace Service

```typescript
// src/services/marketplace.ts
import { AgentBlueprint, EncryptedBlueprint } from '../types/agent';
import { AgentListing, ListingStatus } from '../types/listing';
import { Transaction, TransactionStatus } from '../types/transaction';

interface PublishAgentParams {
  blueprint: AgentBlueprint;
  description: string;
  price: number;
  currency: string;
  category: string;
  tags: string[];
}

interface PurchaseResult {
  success: boolean;
  transactionId: string;
  blueprint?: EncryptedBlueprint;
  error?: string;
}

export class MarketplaceService {
  private apiBaseUrl: string;
  private ipfsService: IPFSService;
  private paymentService: PaymentService;
  
  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
    this.ipfsService = new IPFSService();
    this.paymentService = new PaymentService();
  }
  
  /**
   * Publier un agent sur le marketplace
   */
  async publishAgent(params: PublishAgentParams): Promise<AgentListing> {
    // 1. Chiffrer le blueprint
    const encryptedBlueprint = await this.encryptBlueprint(params.blueprint);
    
    // 2. Upload sur IPFS
    const ipfsHash = await this.ipfsService.upload(encryptedBlueprint);
    
    // 3. Créer le listing
    const listing: AgentListing = {
      id: generateUUID(),
      agentId: params.blueprint.id,
      sellerId: await this.getCurrentUserId(),
      ipfsHash,
      price: params.price,
      currency: params.currency,
      description: params.description,
      category: params.category,
      tags: params.tags,
      status: ListingStatus.ACTIVE,
      salesCount: 0,
      rating: 0,
      createdAt: Date.now(),
    };
    
    // 4. Enregistrer sur le serveur
    const response = await fetch(`${this.apiBaseUrl}/marketplace/listings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(listing),
    });
    
    return response.json();
  }
  
  /**
   * Acheter un agent
   */
  async purchaseAgent(listingId: string): Promise<PurchaseResult> {
    try {
      // 1. Récupérer le listing
      const listing = await this.getListing(listingId);
      
      // 2. Traiter le paiement
      const payment = await this.paymentService.processPayment({
        amount: listing.price,
        currency: listing.currency,
        recipient: listing.sellerId,
      });
      
      if (!payment.success) {
        return { success: false, transactionId: '', error: 'Payment failed' };
      }
      
      // 3. Créer la transaction
      const transaction: Transaction = {
        id: generateUUID(),
        buyerId: await this.getCurrentUserId(),
        sellerId: listing.sellerId,
        listingId,
        amount: listing.price,
        currency: listing.currency,
        status: TransactionStatus.COMPLETED,
        createdAt: Date.now(),
      };
      
      // 4. Télécharger le blueprint chiffré
      const encryptedBlueprint = await this.ipfsService.download(listing.ipfsHash);
      
      // 5. Mettre à jour le compteur de ventes
      await this.incrementSalesCount(listingId);
      
      return {
        success: true,
        transactionId: transaction.id,
        blueprint: encryptedBlueprint,
      };
    } catch (error) {
      return {
        success: false,
        transactionId: '',
        error: error.message,
      };
    }
  }
  
  /**
   * Lister tous les agents
   */
  async listAgents(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price' | 'rating' | 'sales' | 'createdAt';
    limit?: number;
    offset?: number;
  }): Promise<AgentListing[]> {
    const params = new URLSearchParams();
    
    if (filters?.category) params.append('category', filters.category);
    if (filters?.minPrice) params.append('min_price', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('max_price', filters.maxPrice.toString());
    if (filters?.sortBy) params.append('sort_by', filters.sortBy);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());
    
    const response = await fetch(`${this.apiBaseUrl}/marketplace/agents?${params}`);
    return response.json();
  }
  
  /**
   * Obtenir un agent par ID
   */
  async getAgent(listingId: string): Promise<AgentListing> {
    const response = await fetch(`${this.apiBaseUrl}/marketplace/listings/${listingId}`);
    return response.json();
  }
  
  private async encryptBlueprint(blueprint: AgentBlueprint): Promise<EncryptedBlueprint> {
    // Implémentation du chiffrement
    return {} as EncryptedBlueprint;
  }
  
  private async getCurrentUserId(): Promise<string> {
    // Récupérer l'ID utilisateur actuel
    return '';
  }
  
  private async incrementSalesCount(listingId: string): Promise<void> {
    await fetch(`${this.apiBaseUrl}/marketplace/listings/${listingId}/sales`, {
      method: 'POST',
    });
  }
}
```

### Payment Service

```typescript
// src/services/payment-service.ts
interface PaymentParams {
  amount: number;
  currency: string;
  recipient: string;
}

interface PaymentResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

export class PaymentService {
  private providerUrl: string;
  private contractAddress: string;
  
  constructor(providerUrl: string, contractAddress: string) {
    this.providerUrl = providerUrl;
    this.contractAddress = contractAddress;
  }
  
  /**
   * Traiter un paiement
   */
  async processPayment(params: PaymentParams): Promise<PaymentResult> {
    try {
      // 1. Connecter au provider
      const provider = new ethers.JsonRpcProvider(this.providerUrl);
      
      // 2. Charger le smart contract
      const contract = new ethers.Contract(
        this.contractAddress,
        MARKETPLACE_ABI,
        provider
      );
      
      // 3. Exécuter la transaction
      const tx = await contract.processPayment(
        params.recipient,
        ethers.parseUnits(params.amount.toString(), 18),
        params.currency
      );
      
      // 4. Attendre la confirmation
      const receipt = await tx.wait();
      
      return {
        success: true,
        transactionHash: receipt.hash,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
  
  /**
   * Distribuer les royalties
   */
  async distributeRoyalties(
    transactionHash: string,
    royaltyPercentage: number
  ): Promise<void> {
    // Logique de distribution des royalties
  }
}

const MARKETPLACE_ABI = [
  "function processPayment(address recipient, uint256 amount, string currency) external payable returns (bool)",
  "function distributeRoyalties(bytes32 transactionHash, uint256 percentage) external",
  "event PaymentProcessed(bytes32 indexed transactionId, address buyer, address seller, uint256 amount)",
];
```

### IPFS Service

```typescript
// src/services/ipfs-service.ts
import { create } from 'ipfs-http-client';

export class IPFSService {
  private ipfs;
  
  constructor(host: string = 'https://ipfs.infura.io:5001/api/v0') {
    this.ipfs = create({ url: host });
  }
  
  /**
   * Upload de données sur IPFS
   */
  async upload(data: any): Promise<string> {
    const added = await this.ipfs.add(JSON.stringify(data));
    return added.path;
  }
  
  /**
   * Télécharger des données depuis IPFS
   */
  async download(hash: string): Promise<any> {
    const chunks = [];
    
    for await (const chunk of this.ipfs.cat(hash)) {
      chunks.push(chunk);
    }
    
    const content = Buffer.concat(chunks).toString();
    return JSON.parse(content);
  }
  
  /**
   * Pin un fichier pour le garder disponible
   */
  async pin(hash: string): Promise<void> {
    await this.ipfs.pin.add(hash);
  }
}
```

### Staking Service

```typescript
// src/staking/staking-pool.ts
interface StakingPool {
  id: string;
  name: string;
  totalStaked: number;
  apr: number;
  lockPeriod: number; // jours
  minStake: number;
}

interface Stake {
  poolId: string;
  amount: number;
  stakedAt: number;
  unlocksAt: number;
  rewards: number;
}

export class StakingPoolService {
  private pools: Map<string, StakingPool> = new Map();
  private stakes: Map<string, Stake[]> = new Map();
  
  /**
   * Créer un pool de staking
   */
  createPool(pool: StakingPool): void {
    this.pools.set(pool.id, pool);
  }
  
  /**
   * Staker des tokens
   */
  stake(poolId: string, userId: string, amount: number): Stake {
    const pool = this.pools.get(poolId);
    
    if (!pool) {
      throw new Error('Pool not found');
    }
    
    if (amount < pool.minStake) {
      throw new Error(`Minimum stake is ${pool.minStake}`);
    }
    
    const stake: Stake = {
      poolId,
      amount,
      stakedAt: Date.now(),
      unlocksAt: Date.now() + (pool.lockPeriod * 24 * 60 * 60 * 1000),
      rewards: 0,
    };
    
    const userStakes = this.stakes.get(userId) || [];
    userStakes.push(stake);
    this.stakes.set(userId, userStakes);
    
    // Mettre à jour le pool
    pool.totalStaked += amount;
    
    return stake;
  }
  
  /**
   * Calculer les rewards
   */
  calculateRewards(stake: Stake): number {
    const pool = this.pools.get(stake.poolId);
    
    if (!pool) return 0;
    
    const now = Date.now();
    const stakingDuration = now - stake.stakedAt;
    const yearInMs = 365 * 24 * 60 * 60 * 1000;
    
    return stake.amount * (pool.apr / 100) * (stakingDuration / yearInMs);
  }
  
  /**
   * Unstaker des tokens
   */
  unstake(userId: string, stakeIndex: number): Promise<void> {
    const userStakes = this.stakes.get(userId);
    
    if (!userStakes || !userStakes[stakeIndex]) {
      throw new Error('Stake not found');
    }
    
    const stake = userStakes[stakeIndex];
    
    if (Date.now() < stake.unlocksAt) {
      throw new Error('Tokens are still locked');
    }
    
    // Retirer le stake
    userStakes.splice(stakeIndex, 1);
    this.stakes.set(userId, userStakes);
    
    // Mettre à jour le pool
    const pool = this.pools.get(stake.poolId);
    if (pool) {
      pool.totalStaked -= stake.amount;
    }
    
    return Promise.resolve();
  }
  
  /**
   * Réclamer les rewards
   */
  claimRewards(userId: string, stakeIndex: number): Promise<number> {
    const userStakes = this.stakes.get(userId);
    
    if (!userStakes || !userStakes[stakeIndex]) {
      throw new Error('Stake not found');
    }
    
    const stake = userStakes[stakeIndex];
    const rewards = this.calculateRewards(stake);
    
    // Reset rewards
    stake.rewards = 0;
    
    return Promise.resolve(rewards);
  }
}
```

---

## 📋 Configuration

### package.json

```json
{
  "name": "genesis-marketplace",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "deno run --allow-all src/hub.ts",
    "dev": "deno run --watch --allow-all src/hub.ts",
    "test": "deno test --allow-all"
  },
  "imports": {
    "ethers": "npm:ethers@^6.0.0",
    "ipfs-http-client": "npm:ipfs-http-client@^60.0.0"
  }
}
```

---

**Version :** 1.0.0  
**Dernière mise à jour :** 28 Mars 2026  
**Statut :** ✅ Documentation Complète
