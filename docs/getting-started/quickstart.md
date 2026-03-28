---
sidebar_position: 1
---

# Quickstart Genesis AI

Démarrer rapidement avec Genesis AI en moins de 10 minutes.

---

## ⚡ Démarrage Ultra-Rapide

### Prérequis

Assurez-vous d'avoir installé :
- [Deno](https://deno.land/) v1.40+
- [Node.js](https://nodejs.org/) v20+
- [PNPM](https://pnpm.io/) v8+
- [Git](https://git-scm.com/)

### Installation Rapide

```bash
# 1. Cloner le dépôt
git clone https://github.com/genesisAI4/genesis_deno.git
cd genesis_deno

# 2. Installer les dépendances principales
cd igon7_deno && pnpm install

# 3. Démarrer Genesis Temporal (Docker)
cd ../genesis-temporal
docker-compose up -d

# 4. Démarrer Nexus
cd ../genesis-nexus
deno task dev

# Terminal 2 : Démarrer igon7
cd igon7_deno
pnpm dev

# Terminal 3 : Démarrer Desktop
cd genesis-desktop
npm install && npm run dev
```

### Vérification

Ouvrez votre navigateur sur `http://localhost:5173` et vous devriez voir l'interface Genesis Desktop.

---

## 📚 Prochaines Étapes

- [Installation Complète](./getting-started/installation)
- [Configuration](./getting-started/configuration)
- [Premier Workflow](./getting-started/first-workflow)

---

**Temps estimé :** 10 minutes  
**Difficulté :** Débutant
