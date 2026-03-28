---
sidebar_position: 3
---

# igon7 Engine - Installation

Guide complet d'installation et de configuration d'igon7 Engine.

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
| **PNPM** | v8.0.0 | v8.15.0+ |
| **Git** | v2.30.0 | v2.40.0+ |
| **Node.js** (optionnel) | v18.0.0 | v20.0.0+ |

### Vérification des prérequis

```bash
# Vérifier Deno
deno --version
# Doit afficher : deno 1.40.x

# Vérifier PNPM
pnpm --version
# Doit afficher : 8.x.x

# Vérifier Git
git --version
# Doit afficher : git version 2.x.x
```

---

## 🚀 Installation rapide

### 1. Cloner le dépôt

```bash
git clone https://github.com/genesisAI4/igon7.git
cd igon7_deno
```

### 2. Installer les dépendances

```bash
pnpm install
```

### 3. Configurer l'environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer .env avec vos configurations
nano .env
```

### 4. Démarrer en mode développement

```bash
pnpm dev
```

---

## 📦 Installation détaillée par OS

### Windows (avec WSL2)

#### Étape 1 : Installer WSL2

```powershell
# PowerShell en tant qu'administrateur
wsl --install
wsl --set-default-version 2
```

#### Étape 2 : Installer Ubuntu

```bash
# Dans le Microsoft Store, installer Ubuntu 22.04 LTS
# Puis lancer Ubuntu et créer un utilisateur
```

#### Étape 3 : Installer Deno

```bash
curl -fsSL https://deno.land/install.sh | sh
```

#### Étape 4 : Installer PNPM

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

#### Étape 5 : Installer igon7

```bash
git clone https://github.com/genesisAI4/igon7.git
cd igon7_deno
pnpm install
```

### macOS

#### Étape 1 : Installer Homebrew (si pas déjà fait)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### Étape 2 : Installer Deno

```bash
brew install deno
```

#### Étape 3 : Installer PNPM

```bash
brew install pnpm
```

#### Étape 4 : Installer igon7

```bash
git clone https://github.com/genesisAI4/igon7.git
cd igon7_deno
pnpm install
```

### Linux (Ubuntu/Debian)

#### Étape 1 : Installer les dépendances système

```bash
sudo apt update
sudo apt install -y curl git unzip xz-utils zip libgl1-mesa-glx
```

#### Étape 2 : Installer Deno

```bash
curl -fsSL https://deno.land/install.sh | sh
```

#### Étape 3 : Installer PNPM

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

#### Étape 4 : Installer igon7

```bash
git clone https://github.com/genesisAI4/igon7.git
cd igon7_deno
pnpm install
```

---

## ⚙️ Configuration

### Fichier .env

```bash
# .env

# Temporal Configuration
TEMPORAL_ADDRESS=localhost:7233
TEMPORAL_NAMESPACE=genesis
TEMPORAL_TASK_QUEUE=igon7-workflows

# Database (optionnel pour certains features)
DATABASE_URL=postgresql://user:password@localhost:5432/igon7

# Redis (optionnel pour le cache)
REDIS_URL=redis://localhost:6379

# Cloud API (pour la synchronisation)
CLOUD_API_URL=https://api.genesisai.io
CLOUD_API_KEY=your-api-key

# Monitoring
PROMETHEUS_ENABLED=true
PROMETHEUS_PORT=9090

# Logging
LOG_LEVEL=info
LOG_FORMAT=json

# Security
ENCRYPTION_KEY=your-encryption-key
JWT_SECRET=your-jwt-secret
```

### Configuration Deno

```json
// deno.json
{
  "workspace": ["./packages/@n8n", "./packages/workflow"],
  "tasks": {
    "dev": "pnpm dev",
    "build": "turbo build",
    "test": "vitest"
  },
  "imports": {
    "postgres": "npm:postgres@^3.4.4",
    "ioredis": "npm:ioredis@^5.3.2"
  },
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true
  }
}
```

### Configuration PNPM Workspace

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/@n8n/*'
  - 'packages/workflow'
  - 'packages/nodes-base'
  - 'packages/extensions/*'
```

---

## 🧪 Vérification de l'installation

### Test 1 : Vérifier les packages

```bash
pnpm list --depth=0
```

### Test 2 : Lancer les tests

```bash
pnpm test
```

### Test 3 : Démarrer le serveur

```bash
pnpm dev
```

### Test 4 : Vérifier la connexion à Temporal

```bash
# Dans un autre terminal
curl http://localhost:8233/api/v1/namespaces
```

---

## 🐛 Dépannage

### Erreur : "Deno not found"

```bash
# Réinstaller Deno
curl -fsSL https://deno.land/install.sh | sh

# Ajouter Deno au PATH
export DENO_INSTALL="$HOME/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
```

### Erreur : "Module not found"

```bash
# Nettoyer le cache
pnpm clean

# Réinstaller les dépendances
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Erreur : "Port already in use"

```bash
# Trouver le processus utilisant le port
lsof -i :18791

# Tuer le processus
kill -9 <PID>
```

### Erreur : "Permission denied"

```bash
# Sur Linux/macOS
chmod +x scripts/*.sh

# Ou exécuter avec les permissions Deno
deno run --allow-all main.ts
```

---

## 📚 Prochaines étapes

- [Configuration avancée](./igon7-engine/configuration)
- [Premier workflow](./getting-started/first-workflow)
- [Architecture](./igon7-engine/architecture)

---

**Temps estimé :** 15 minutes  
**Difficulté :** Débutant
