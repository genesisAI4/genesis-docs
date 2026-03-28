---
sidebar_position: 2
---

# Cloud API - Installation

Guide complet d'installation de Genesis Cloud API.

---

## 📋 Prérequis

| Outil | Version | Lien |
|-------|---------|------|
| **Node.js** | 20+ | https://nodejs.org |
| **PNPM** | 8+ | https://pnpm.io |
| **PostgreSQL** | 15+ | https://postgresql.org |
| **Redis** | 7+ | https://redis.io |

---

## 🚀 Installation rapide

### 1. Cloner

```bash
git clone https://github.com/genesisAI4/genesis-cloud-api.git
cd genesis-cloud-api
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer

```bash
cp .env.example .env
```

### 4. Base de données

```bash
npx prisma migrate dev
```

### 5. Démarrer

```bash
npm run dev
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

# Windows (WSL2)
sudo apt install redis-server
```

---

## ⚙️ Configuration

### .env

```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/genesis
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-jwt-key
ENCRYPTION_ALGORITHM=aes-256-gcm
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
```

---

**Temps estimé :** 15 minutes  
**Difficulté :** Débutant
