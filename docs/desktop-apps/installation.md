---
sidebar_position: 2
---

# Desktop Apps - Installation

Guide d'installation des applications Desktop.

---

## 📋 Prérequis

| Outil | Version | Lien |
|-------|---------|------|
| **Node.js** | 20+ | https://nodejs.org |
| **PNPM** | 8+ | https://pnpm.io |
| **Git** | 2.30+ | https://git-scm.com |

---

## 🚀 Installation

### Genesis Desktop

```bash
# Cloner
git clone https://github.com/genesisAI4/genesis-desktop.git
cd genesis-desktop

# Installer
pnpm install

# Démarrer en dev
pnpm dev

# Build production
pnpm build
```

### Genesis Companion

```bash
# Cloner
git clone https://github.com/genesisAI4/genesis-companion.git
cd genesis-companion

# Installer
pnpm install

# Démarrer
pnpm dev
```

---

## ⚙️ Configuration

### .env (Desktop)

```bash
NODE_ENV=development
VITE_NEXUS_URL=http://localhost:8080
VITE_CLOUD_API_URL=http://localhost:3000
VITE_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

---

## 📦 Build par plateforme

### Windows

```bash
pnpm build
# Output: dist/Genesis AI Setup.exe
```

### macOS

```bash
pnpm build
# Output: dist/Genesis AI.dmg
```

### Linux

```bash
pnpm build
# Output: dist/Genesis AI.AppImage
```

---

**Temps estimé :** 10 minutes  
**Difficulté :** Débutant
