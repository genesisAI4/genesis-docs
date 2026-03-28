---
sidebar_position: 2
---

# Browser Extension - Installation

Guide d'installation de l'extension Chrome.

---

## 📋 Prérequis

| Outil | Version |
|-------|---------|
| **Node.js** | 20+ |
| **Chrome** | 120+ |

---

## 🚀 Installation (Dev)

### 1. Cloner

```bash
git clone https://github.com/genesisAI4/genesis-extension.git
cd genesis-extension
```

### 2. Installer

```bash
npm install
```

### 3. Build

```bash
npm run build
```

### 4. Charger dans Chrome

1. Ouvrir `chrome://extensions/`
2. Activer "Mode développeur"
3. Cliquer "Charger l'extension non empaquetée"
4. Sélectionner le dossier `dist/`

---

## 📦 Production Build

```bash
npm run build:prod
```

Le fichier ZIP sera dans `dist/genesis-extension.zip`

---

**Temps estimé :** 5 minutes
