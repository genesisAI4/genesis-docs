---
sidebar_position: 2
---

# Genesis Nexus - Installation

Guide complet d'installation et de configuration de Genesis Nexus.

---

## 📋 Prérequis

### Système d'exploitation

- **Windows 10/11** (WSL2 recommandé)
- **macOS** 12+ (Intel ou Apple Silicon)
- **Linux** Ubuntu 22.04+, Debian 11+, Fedora 36+

### Outils requis

| Outil | Version minimale | Version recommandée |
|-------|-----------------|---------------------|
| **Deno** | v1.38.0 | v1.40.0+ |
| **Git** | v2.30.0 | v2.40.0+ |
| **PostgreSQL** | v14.0 | v15.0+ |
| **Redis** | v7.0 | v7.2+ |

---

## 🚀 Installation rapide

### 1. Cloner le dépôt

```bash
git clone https://github.com/genesisAI4/genesis-nexus.git
cd genesis-nexus
```

### 2. Installer Deno

```bash
curl -fsSL https://deno.land/install.sh | sh
```

### 3. Configurer l'environnement

```bash
cp .env.example .env
```

### 4. Démarrer

```bash
deno task dev
```

---

## 📦 Installation détaillée

### PostgreSQL

```bash
# Ubuntu/Debian
sudo apt install postgresql-15 postgresql-contrib

# macOS
brew install postgresql@15

# Windows
# Télécharger depuis https://www.postgresql.org/download/windows/
```

### Redis

```bash
# Ubuntu/Debian
sudo apt install redis-server

# macOS
brew install redis

# Windows
# Utiliser WSL2 ou télécharger depuis https://github.com/microsoftarchive/redis/releases
```

---

## ⚙️ Configuration

### .env

```bash
# Nexus Configuration
NEXUS_PORT=8080
CLAWX_LEGACY_PORT=18789
GENESIS_NEXUS_URL=ws://localhost:8080/ws

# Database
DATABASE_URL=postgres://localhost:5432/genesis

# Redis
REDIS_URL=redis://localhost:6379

# Security
VAULT_SALT=random-salt-2026
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=master-encryption-key

# Agent URLs
IGON7_URL=ws://localhost:18791
CLISIS_URL=ws://localhost:18792
TEMPORAL_ADDRESS=localhost:7233
```

---

**Temps estimé :** 15 minutes  
**Difficulté :** Débutant
