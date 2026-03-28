---
sidebar_position: 5
---

# Clisis Agent - CLI Commands

Documentation complète des commandes CLI.

---

## 🛠️ Commandes disponibles

### Status système

```bash
clisis > status
```

### Lister les processus

```bash
clisis > ps
```

### Audit de sécurité

```bash
clisis > audit
```

### Lister les agents

```bash
clisis > agents
```

### Query Genesis brain

```bash
clisis > ask <query>
```

### Diagnostiques

```bash
clisis > doctor
```

### Lister les fichiers

```bash
clisis > ls [path]
```

### Analyser une image

```bash
clisis > vision <image>
```

### Exécuter un pattern Fabric

```bash
clisis > run <pattern>
```

### Gestion des tokens

```bash
clisis > token:refresh
clisis > token:status
```

### Google Workspace

```bash
clisis > gws:init
clisis > gws:status
clisis > gws:drive:ls
clisis > gws:drive:upload <path>
clisis > gws:drive:share <fileId> <email> [role]
clisis > gws:gmail:send <to> <subject> <body>
clisis > gws:calendar:event <summary> <start> <end>
clisis > gws:sheets:create <title>
clisis > gws:sheets:read <spreadsheetId> <range>
clisis > gws:sheets:write <spreadsheetId> <range> <values>
```

---

**Version :** 1.0.0
