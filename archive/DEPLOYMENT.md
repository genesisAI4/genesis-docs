# 🚀 Guide de Déploiement GitHub

Ce document explique comment pousser la documentation Genesis sur GitHub.

---

## 📋 Prérequis

- Compte GitHub avec accès à l'organisation `genesisAI4`
- Git installé localement
- Node.js 20+ installé

---

## 🔧 Configuration Initiale

### 1. Vérifier la structure du dépôt

```bash
cd genesis-docs

# Vérifier que tous les fichiers sont présents
ls -la
# Doit afficher :
# - .github/workflows/deploy.yml
# - docs/
# - src/
# - package.json
# - README.md
# - etc.
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Tester le build localement

```bash
# Build de production
npm run build

# Servir localement pour vérification
npm run serve
# Ouvrir http://localhost:3000
```

---

## 📤 Push vers GitHub

### Option A : Dépôt propre (recommandé)

```bash
# Initialiser un nouveau dépôt git
cd genesis-docs
git init
git add .
git commit -m "feat: initial comprehensive documentation for Genesis AI ecosystem

- Complete documentation for all 12 Genesis projects
- Architecture diagrams with Mermaid
- Getting started guides
- Security model documentation
- API references structure
- GitHub Actions deployment workflow

Co-authored-by: Genesis AI Team"

# Ajouter le remote
git remote add origin https://github.com/genesisAI4/genesis-docs.git

# Push vers main
git branch -M main
git push -u origin main
```

### Option B : Dépôt existant

```bash
cd genesis-docs
git add .
git commit -m "feat: comprehensive documentation update

- Added complete documentation for all Genesis projects
- Updated Docusaurus configuration for GitHub Pages
- Added deployment workflow
- Added getting started guides

Documentation coverage:
✅ igon7 Engine
✅ Genesis Nexus  
✅ Clisis Agent
✅ Genesis Temporal
✅ Cloud API
✅ Desktop Applications
✅ Mobile App
✅ Web Portal
✅ Browser Extension
✅ Marketplace
✅ Genesis Ops
✅ Security Model"

git push origin main
```

---

## ⚙️ Configuration GitHub Pages

### 1. Activer GitHub Pages

1. Allez sur `https://github.com/genesisAI4/genesis-docs/settings/pages`
2. Sous **Source**, sélectionnez :
   - **Deploy from a branch**
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Cliquez sur **Save**

### 2. Vérifier le déploiement automatique

Le workflow GitHub Actions va :
1. Se déclencher automatiquement à chaque push sur `main`
2. Build la documentation Docusaurus
3. Déployer sur la branche `gh-pages`
4. GitHub Pages servira le contenu

### 3. URL de la documentation

Après déploiement réussi, la documentation sera accessible à :

```
https://genesisAI4.github.io/genesis-docs/
```

---

## 🔍 Vérification du Déploiement

### Status du Workflow

```bash
# Vérifier le status sur GitHub
https://github.com/genesisAI4/genesis-docs/actions
```

### Pages Déployées

```bash
# Vérifier que le site est en ligne
curl -I https://genesisAI4.github.io/genesis-docs/

# Doit retourner HTTP/2 200
```

---

## 🔄 Mises à Jour Ultérieures

```bash
# Faire des changements dans docs/
git add .
git commit -m "docs: update [section] documentation"
git push origin main

# Le déploiement est automatique via GitHub Actions
```

---

## 🐛 Dépannage

### Build échoue

```bash
# Vérifier les erreurs
npm run build 2>&1 | tee build.log

# Vérifier Node version
node --version  # Doit être >= 20.0

# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment échoue

```bash
# Vérifier les logs GitHub Actions
https://github.com/genesisAI4/genesis-docs/actions/workflows/deploy.yml

# Vérifier les permissions
# Settings > Actions > General > Workflow permissions
# Doit être "Read and write permissions"
```

### Page blanche

```bash
# Vérifier la base URL dans docusaurus.config.ts
url: 'https://genesisAI4.github.io',
baseUrl: '/genesis-docs/',

# Rebuild et push
npm run build
git add .
git commit -m "fix: correct base URL"
git push
```

---

## 📊 Statistiques

Après le déploiement, vous pouvez activer les statistiques :

1. Settings > Pages > Analytics
2. Ajouter Google Analytics ou utiliser les stats GitHub

---

## 🎉 Checklist Finale

- [ ] Documentation build localement sans erreur
- [ ] Push vers GitHub effectué
- [ ] Workflow Actions s'est exécuté avec succès
- [ ] GitHub Pages est activé sur la branche `gh-pages`
- [ ] URL https://genesisAI4.github.io/genesis-docs/ fonctionne
- [ ] Tous les liens de navigation fonctionnent
- [ ] Les diagrammes Mermaid s'affichent correctement
- [ ] Le mode sombre/clair fonctionne
- [ ] La recherche (si configurée) fonctionne

---

## 📚 Ressources

- [Docusaurus Deployment](https://docusaurus.io/docs/deployment)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions for Docusaurus](https://github.com/peaceiris/actions-gh-pages)

---

**Dernière mise à jour :** 28 Mars 2026  
**Version :** 1.0.0
