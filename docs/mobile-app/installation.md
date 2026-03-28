---
sidebar_position: 2
---

# Mobile App - Installation

Guide d'installation de Genesis Mobile.

---

## 📋 Prérequis

| Outil | Version | Lien |
|-------|---------|------|
| **Node.js** | 20+ | https://nodejs.org |
| **Expo CLI** | 7+ | https://expo.dev |
| **Xcode** (iOS) | 15+ | Mac App Store |
| **Android Studio** | 2023+ | https://developer.android.com |

---

## 🚀 Installation

### 1. Cloner

```bash
git clone https://github.com/genesisAI4/genesis-mobile.git
cd genesis-mobile
```

### 2. Installer

```bash
npm install
```

### 3. Démarrer

```bash
npm start
```

### 4. Ouvrir sur appareil

- **iOS :** Scanner le QR code avec Camera
- **Android :** Scanner avec Expo Go

---

## ⚙️ Configuration

### app.json

```json
{
  "expo": {
    "name": "Genesis AI",
    "slug": "genesis-mobile",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "ai.genesis.mobile"
    },
    "android": {
      "package": "ai.genesis.mobile"
    },
    "extra": {
      "apiUrl": "https://api.genesisai.io"
    }
  }
}
```

---

**Temps estimé :** 15 minutes
