---
sidebar_position: 2
---

# Marketplace - Installation

Guide d'installation du Marketplace.

---

## 📋 Prérequis

| Outil | Version | Lien |
|-------|---------|------|
| **Deno** | 1.40+ | https://deno.land |
| **Git** | 2.30+ | https://git-scm.com |

---

## 🚀 Installation

### 1. Cloner

```bash
git clone https://github.com/genesisAI4/genesis-marketplace.git
cd genesis-marketplace
```

### 2. Démarrer

```bash
deno task start
```

---

## ⚙️ Configuration

### .env

```bash
MARKETPLACE_PORT=8081
BLOCKCHAIN_RPC_URL=https://rpc.example.com
CONTRACT_ADDRESS=0x...
IPFS_URL=https://ipfs.infura.io:5001
```

---

**Temps estimé :** 5 minutes
