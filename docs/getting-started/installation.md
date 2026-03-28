---
sidebar_position: 2
---

# Installation Complète

Guide détaillé pour installer tous les composants de Genesis AI.

---

## 📋 Prérequis Détaillés

### Système d'Exploitation

- **Windows 10/11** (recommandé : WSL2)
- **macOS** 12+ (Intel ou Apple Silicon)
- **Linux** Ubuntu 22.04+, Debian 11+, Fedora 36+

### Outils Requis

| Outil | Version | Lien | Usage |
|-------|---------|------|-------|
| **Deno** | v1.40+ | [deno.land](https://deno.land/) | Projects Deno |
| **Node.js** | v20+ | [nodejs.org](https://nodejs.org/) | Projects Node.js |
| **PNPM** | v8+ | [pnpm.io](https://pnpm.io/) | Monorepo igon7 |
| **Go** | v1.26+ | [go.dev](https://go.dev/) | Genesis Temporal |
| **Docker** | v24+ | [docker.com](https://docker.com/) | Infrastructure |
| **Git** | v2.40+ | [git-scm.com](https://git-scm.com/) | Version control |

---

## 🔧 Installation par Projet

### 1. igon7 Engine

```bash
cd igon7_deno

# Installer Deno (si pas déjà fait)
curl -fsSL https://deno.land/install.sh | sh

# Installer les dépendances PNPM
pnpm install

# Vérifier l'installation
pnpm test
```

### 2. Genesis Nexus

```bash
cd genesis-nexus

# Installer les dépendances
deno install

# Vérifier
deno task test
```

### 3. Genesis Temporal

```bash
cd genesis-temporal

# Option A : Docker (recommandé)
docker-compose up -d

# Option B : Build local (nécessite Go)
make build
make start
```

### 4. Cloud API

```bash
cd genesis-cloud-api

# Installer les dépendances
npm install

# Setup database
npx prisma migrate dev

# Démarrer
npm run dev
```

### 5. Desktop

```bash
cd genesis-desktop

# Installer
npm install

# Démarrer
npm run dev
```

### 6. Mobile

```bash
cd genesis-mobile

# Installer
npm install

# Démarrer Expo
npm start
```

---

## ✅ Vérification Globale

```bash
# Script de vérification
cd genesis_deno
./scripts/verify-install.sh

# Doit afficher :
# ✅ Deno: 1.40.x
# ✅ Node: 20.x.x
# ✅ PNPM: 8.x.x
# ✅ Go: 1.26.x
# ✅ Docker: 24.x.x
# ✅ All systems operational
```

---

## 🐛 Dépannage

### Erreur : "Deno not found"

```bash
# macOS/Linux
curl -fsSL https://deno.land/install.sh | sh

# Windows (PowerShell)
irm https://deno.land/install.ps1 | iex
```

### Erreur : "Node version mismatch"

```bash
# Utiliser nvm (Node Version Manager)
nvm install 20
nvm use 20
```

### Erreur : "Docker daemon not running"

```bash
# macOS/Linux
sudo systemctl start docker

# Windows : Démarrer Docker Desktop
```

---

## 📚 Suite

- [Configuration](./getting-started/configuration)
- [Premier Workflow](./getting-started/first-workflow)

---

**Temps estimé :** 30 minutes  
**Difficulté :** Intermédiaire
