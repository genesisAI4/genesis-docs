# Genesis AI Documentation

Documentation complète et approfondie de l'écosystème Genesis AI.

## 🌐 Vue d'ensemble

Genesis AI est une plateforme unifiée d'orchestration AI composée de **12 projets interconnectés** :

| Projet | Runtime | Rôle |
|--------|---------|------|
| **igon7 Engine** | Deno + PNPM | Orchestration de workflows DAG |
| **Genesis Nexus** | Deno | Cerveau central + protocole A2A |
| **Clisis Agent** | Deno | Agent système + Guardian Layer |
| **Genesis Temporal** | Go 1.26 | Serveur de workflows durables |
| **Cloud API** | NestJS | Sync zero-knowledge |
| **Genesis Desktop** | Electron | App desktop principale |
| **Genesis Companion** | Electron | Interface secondaire |
| **Genesis Mobile** | Expo/React Native | Cockpit mobile |
| **Web Portal** | Next.js | Portail web |
| **Browser Extension** | Chrome MV3 | Extension navigateur |
| **Marketplace** | Deno | Trading de blueprints |
| **Genesis Ops** | Docker/K8s | DevOps & monitoring |

## 📚 Documentation

La documentation complète est disponible sur : **https://genesisai4.github.io/genesis-docs**

### Sections Principales

- **[Introduction](./docs/introduction/overview.md)** - Vue d'ensemble et architecture
- **[Getting Started](./docs/getting-started/quickstart.md)** - Installation et premiers pas
- **[igon7 Engine](./docs/igon7-engine/overview.md)** - Moteur de workflows
- **[Genesis Nexus](./docs/genesis-nexus/overview.md)** - Routage neural A2A
- **[Clisis Agent](./docs/clisis-agent/overview.md)** - Agent système
- **[Genesis Temporal](./docs/genesis-temporal/overview.md)** - Workflows durables
- **[Cloud API](./docs/cloud-api/overview.md)** - Synchronisation E2EE
- **[Desktop Apps](./docs/desktop-apps/overview.md)** - Applications Electron
- **[Mobile App](./docs/mobile-app/overview.md)** - App React Native
- **[Web Portal](./docs/web-portal/overview.md)** - Portail Next.js
- **[Browser Extension](./docs/browser-extension/overview.md)** - Extension Chrome
- **[Marketplace](./docs/marketplace/overview.md)** - Marketplace décentralisé
- **[Genesis Ops](./docs/genesis-ops/overview.md)** - Infrastructure DevOps
- **[API Reference](./docs/api-reference/overview.md)** - Références API
- **[Advanced Topics](./docs/advanced/performance-optimization.md)** - Sujets avancés

## 🚀 Développement Local

### Prérequis

- **Node.js** >= 20.0
- **PNPM** >= 8.0
- **Deno** >= 1.40 (pour certains scripts)

### Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build

# Servir le build en local
npm run serve
```

### Structure

```
genesis-docs/
├── docs/                    # Documentation markdown
│   ├── introduction/        # Introduction & architecture
│   ├── getting-started/     # Guides de démarrage
│   ├── igon7-engine/        # Documentation igon7
│   ├── genesis-nexus/       # Documentation Nexus
│   ├── clisis-agent/        # Documentation Clisis
│   ├── genesis-temporal/    # Documentation Temporal
│   ├── cloud-api/           # Documentation Cloud API
│   ├── desktop-apps/        # Documentation Desktop
│   ├── mobile-app/          # Documentation Mobile
│   ├── web-portal/          # Documentation Web
│   ├── browser-extension/   # Documentation Extension
│   ├── marketplace/         # Documentation Marketplace
│   ├── genesis-ops/         # Documentation Ops
│   ├── api-reference/       # Références API
│   ├── advanced/            # Sujets avancés
│   └── contributing/        # Guide de contribution
├── blog/                    # Blog posts
├── src/                     # Code source (composants, pages)
├── static/                  # Assets statiques
├── tools/                   # Outils de génération
├── sidebars.ts              # Configuration des sidebars
├── docusaurus.config.ts     # Configuration Docusaurus
└── package.json             # Dépendances et scripts
```

## 📦 Déploiement

### GitHub Pages

La documentation est déployée automatiquement sur GitHub Pages via GitHub Actions.

```bash
# Build et déploiement manuel
npm run build
npm run deploy
```

### CI/CD

Le workflow GitHub Actions (`.github/workflows/ci.yml`) :
- Build la documentation à chaque push sur `main`
- Déploie sur GitHub Pages automatiquement
- Exécute les tests de lint et de build

## 🤝 Contribuer

Nous acceptons les contributions ! Veuillez lire notre [Guide de Contribution](./docs/contributing/development-setup.md).

### Types de Contributions

- 📝 Correction de fautes ou clarifications
- 📚 Ajout de nouvelles sections
- 🐛 Correction de bugs dans les exemples de code
- 🎨 Améliorations du design system
- 🌍 Traductions dans d'autres langues

### Processus

1. Forker le dépôt
2. Créer une branche (`git checkout -b feature/amélioration`)
3. Committer les changements (`git commit -m 'feat: ajout section Nexus'`)
4. Pusher la branche (`git push origin feature/amélioration`)
5. Ouvrir une Pull Request

## 📄 Licence

Cette documentation est distribuée sous licence **CC BY-SA 4.0**.

## 🔗 Liens Utiles

- **Site Principal :** https://genesisai.io
- **GitHub Organization :** https://github.com/genesisAI4
- **Discord :** https://discord.gg/genesisai
- **X (Twitter) :** https://x.com/genesis_ai

## 📞 Support

Pour toute question ou problème :
- 📧 Email : docs@genesisai.io
- 💬 Discord : Canal #documentation
- 🐛 Issues : https://github.com/genesisAI4/genesis-docs/issues

---

**Dernière mise à jour :** 28 Mars 2026  
**Version :** 1.0.0  
**Build Status :** ✅ Passing
