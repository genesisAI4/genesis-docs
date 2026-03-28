---
sidebar_position: 2
---

# Clisis Agent - Installation

Guide complet d'installation de Clisis Agent.

---

## 📋 Prérequis

- **Deno** v1.40.0+
- **Docker** (pour sandbox)
- **Git** v2.30.0+

---

## 🚀 Installation

### 1. Cloner

```bash
git clone https://github.com/genesisAI4/clisis-agent.git
cd clisis-agent
```

### 2. Installer Deno

```bash
curl -fsSL https://deno.land/install.sh | sh
```

### 3. Configurer

```bash
cp .env.example .env
```

### 4. Démarrer

```bash
deno task start
```

---

## ⚙️ Configuration

### .env

```bash
CLISIS_PORT=18792
GUARDIAN_ENABLED=true
GUARDIAN_LEVEL=strict
SANDBOX_ENABLED=true
SANDBOX_TYPE=docker
DATABASE_URL=postgres://localhost:5432/clisis
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret
AGENT_ID=clisis-001
```

---

**Temps estimé :** 10 minutes
