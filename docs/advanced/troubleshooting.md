---
sidebar_position: 6
---

# Troubleshooting

Guide de résolution des problèmes courants.

---

## 🐛 Problèmes Courants

### 1. Workflow ne démarre pas

**Symptômes :**
- Workflow reste en status "pending"
- Aucune exécution visible

**Causes possibles :**
- Temporal non connecté
- Task queue incorrecte
- Worker non démarré

**Solutions :**

```bash
# Vérifier Temporal
curl http://localhost:8233/api/v1/namespaces

# Vérifier les workers
docker ps | grep igon7

# Vérifier les logs
docker logs igon7-worker
```

---

### 2. Agent non trouvé

**Symptômes :**
- Erreur "Agent not found"
- Routing échoue

**Causes possibles :**
- Agent non enregistré
- Agent crashed
- Network partition

**Solutions :**

```bash
# Lister les agents
curl http://localhost:8080/agents

# Réenregistrer l'agent
curl -X POST http://localhost:8080/agents/register \
  -d '{"id": "my-agent", "type": "custom"}'

# Redémarrer l'agent
deno task restart
```

---

### 3. Erreurs de connexion Database

**Symptômes :**
- "Connection refused"
- "Too many connections"

**Causes possibles :**
- PostgreSQL non démarré
- Pool de connexions saturé
- Credentials incorrects

**Solutions :**

```bash
# Vérifier PostgreSQL
docker ps | grep postgres

# Vérifier les connexions
psql -c "SELECT count(*) FROM pg_stat_activity;"

# Augmenter le pool
# .env: DATABASE_POOL_MAX=50
```

---

### 4. Memory Leak

**Symptômes :**
- Mémoire augmente continuellement
- Ralentissement progressif

**Causes possibles :**
- Cache non limité
- Event listeners non nettoyés
- Objects non garbage collected

**Solutions :**

```typescript
// Limiter le cache
const cache = new LRUCache({
  max: 1000,
  ttl: 3600000,
});

// Nettoyer les listeners
listener.removeAllListeners();

// Profiler
deno run --prof main.ts
```

---

### 5. Timeout d'exécution

**Symptômes :**
- "Task timed out"
- Workflow échoue après timeout

**Causes possibles :**
- Tâche trop longue
- Timeout trop court
- Resource starvation

**Solutions :**

```typescript
// Augmenter le timeout
const workflow = new WorkflowBuilder('with-timeout')
  .addNode('long-task', longTask, {
    timeout: 300000, // 5 minutes
  })
  .build();

// Ou optimiser la tâche
```

---

## 🛠️ Outils de Diagnostic

### Logs

```bash
# Logs Nexus
docker logs genesis-nexus

# Logs igon7
docker logs igon7-engine

# Logs Temporal
docker logs temporal
```

### Métriques

```bash
# Prometheus
curl http://localhost:9090/metrics

# Grafana
http://localhost:3000
```

### Tracing

```bash
# Jaeger
http://localhost:16686

# Tempo
http://localhost:3200
```

---

## ✅ Checklist de Diagnostic

- [ ] Vérifier les logs d'erreur
- [ ] Vérifier les métriques (CPU, Memory)
- [ ] Vérifier la connectivité (ping, curl)
- [ ] Vérifier les configurations (.env)
- [ ] Redémarrer les services
- [ ] Vérifier les versions (compatibilité)

---

**Version :** 1.0.0  
**Niveau :** Avancé
