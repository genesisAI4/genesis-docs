---
sidebar_position: 2
---

# Genesis Temporal - Installation

Guide complet d'installation de Genesis Temporal.

---

## 📋 Prérequis

| Outil | Version | Lien |
|-------|---------|------|
| **Go** | 1.21+ | https://go.dev/dl/ |
| **Docker** | 24+ | https://docker.com |
| **Make** | 4+ | Package manager |

---

## 🚀 Installation rapide

### 1. Cloner

```bash
git clone https://github.com/genesisAI4/genesis-temporal.git
cd genesis-temporal
```

### 2. Installer Go

```bash
# macOS
brew install go@1.21

# Ubuntu/Debian
wget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
```

### 3. Build

```bash
make build
```

### 4. Démarrer (Docker)

```bash
cd docker
docker-compose up -d
```

---

## 📦 Installation détaillée

### Windows (WSL2)

```bash
# Dans WSL2
wsl --install
wsl --set-default-version 2

# Installer Go
wget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz

# Installer Docker Desktop
# Télécharger depuis https://desktop.docker.com
```

### macOS

```bash
# Homebrew
brew install go@1.21 docker make

# Démarrer Docker
open -a Docker
```

### Linux

```bash
# Go
wget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc

# Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

---

## 🧪 Vérification

```bash
# Vérifier Go
go version
# → go version go1.21.0

# Vérifier Docker
docker --version
# → Docker version 24.x.x

# Build Temporal
make build

# Démarrer
make start
```

---

## ⚙️ Configuration

### config/development.yaml

```yaml
log:
  level: debug
  format: json

persistence:
  defaultStore:
    pluginName: sqlite
    databaseName: /tmp/genesis-temporal.db

services:
  frontend:
    grpcPort: 7233
    httpPort: 7243
  history:
    grpcPort: 7234
  matching:
    grpcPort: 7235
  worker:
    grpcPort: 7239
```

---

**Temps estimé :** 20 minutes  
**Difficulté :** Intermédiaire
