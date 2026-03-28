---
sidebar_position: 1
---

# Marketplace - Vue d'ensemble

**Genesis Marketplace** est une plateforme décentralisée pour l'échange de blueprints d'agents AI chiffrés.

---

## 🛒 Fonctionnalités

- **Blueprint Trading** : Achat/vente de blueprints d'agents
- **Encryption** : Blueprints chiffrés avant publication
- **Smart Contracts** : Transactions décentralisées
- **Royalties** : Revenus récurrents pour créateurs

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph "Marketplace"
        Publish[Publish Agent<br/>Encrypt Blueprint]
        Browse[Browse & Search<br/>Encrypted Metadata]
        Purchase[Purchase Flow<br/>Smart Contract]
        Download[Download & Decrypt<br/>License Key]
    end

    subgraph "Blockchain"
        Contract[Smart Contract<br/>Escrow + Royalties]
        IPFS[IPFS Storage<br/>Encrypted Blobs]
        Wallet[Crypto Wallet<br/>Payments]
    end

    Publish --> IPFS
    Publish --> Contract
    Browse --> IPFS
    Purchase --> Contract
    Purchase --> Wallet
    Download --> Contract
```

---

## 📚 Références

- [Blueprint Trading](./marketplace/blueprint-trading)
- [Encryption](./marketplace/encryption)
- [Smart Contracts](./marketplace/smart-contracts)
- [Publishing Agents](./marketplace/agent-publishing)

---

**Version :** 1.0.0  
**Runtime :** Deno  
**Blockchain :** EVM-compatible  
**Storage :** IPFS
