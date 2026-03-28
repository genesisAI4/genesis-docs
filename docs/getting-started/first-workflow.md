---
sidebar_position: 4
---

# Premier Workflow

Créez et exécutez votre premier workflow Genesis AI.

---

## 🎯 Objectif

À la fin de ce guide, vous aurez créé et exécuté un workflow simple qui :
1. Récupère des données depuis une API
2. Les transforme avec une fonction simple
3. Stocke le résultat

---

## 📝 Étape 1 : Définir le Workflow

Créez un fichier `hello-workflow.ts` :

```typescript
// hello-workflow.ts
import { WorkflowBuilder } from "@igon7/core";
import { TemporalExecutor } from "@igon7/executor";

// 1. Définir le workflow
const workflow = new WorkflowBuilder("hello-world")
  
  // Noeud 1 : Fetch data
  .addNode("fetch-data", async () => {
    console.log("📡 Fetching data from API...");
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await response.json();
    console.log("✅ Data fetched:", data.title);
    return data;
  })
  
  // Noeud 2 : Transform data
  .addNode("transform-data", async (inputs) => {
    console.log("🔄 Transforming data...");
    const fetchData = inputs["fetch-data"];
    const transformed = {
      id: fetchData.id,
      title: fetchData.title.toUpperCase(),
      transformedAt: new Date().toISOString(),
    };
    console.log("✅ Data transformed:", transformed);
    return transformed;
  }, {
    dependsOn: ["fetch-data"],
  })
  
  // Noeud 3 : Store result
  .addNode("store-result", async (inputs) => {
    console.log("💾 Storing result...");
    const transformed = inputs["transform-data"];
    
    // Simulation de stockage
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = {
      success: true,
      storedData: transformed,
      storedAt: new Date().toISOString(),
    };
    console.log("✅ Result stored:", result);
    return result;
  }, {
    dependsOn: ["transform-data"],
  })
  
  .build();

// 2. Exécuter le workflow
async function main() {
  console.log("🚀 Starting workflow execution...\n");
  
  const executor = new TemporalExecutor({
    temporalAddress: "localhost:7233",
    namespace: "genesis",
    taskQueue: "igon7-workflows",
  });

  try {
    const result = await executor.execute(workflow, {
      workflowId: `hello-world-${Date.now()}`,
    });

    console.log("\n🎉 Workflow completed successfully!");
    console.log("Final result:", result);
  } catch (error) {
    console.error("\n❌ Workflow failed:", error);
    throw error;
  }
}

// Lancer l'exécution
if (import.meta.main) {
  await main();
}
```

---

## ▶️ Étape 2 : Exécuter

```bash
# Assurez-vous que Temporal tourne
docker-compose up -d  # Dans genesis-temporal

# Assurez-vous que igon7 est installé
cd igon7_deno
pnpm install

# Exécuter le workflow
deno run --allow-all --node-modules-dir hello-workflow.ts
```

### Sortie Attendue

```
🚀 Starting workflow execution...

📡 Fetching data from API...
✅ Data fetched: sunt aut facere repellat provident occaecati excepturi optio reprehenderit
🔄 Transforming data...
✅ Data transformed: { id: 1, title: 'SUNT AUT FACERE...', transformedAt: '...' }
💾 Storing result...
✅ Result stored: { success: true, storedData: {...}, storedAt: '...' }

🎉 Workflow completed successfully!
Final result: { success: true, storedData: {...}, storedAt: '...' }
```

---

## 🔍 Étape 3 : Monitorer

### Via Temporal UI

Ouvrez `http://localhost:8080` et recherchez votre workflow par ID.

### Via igon7 Monitor

```typescript
import { WorkflowMonitor } from "@igon7/monitor";

const monitor = new WorkflowMonitor({
  cloudApiEndpoint: "http://localhost:3000",
  apiKey: process.env.MONITOR_API_KEY,
});

// S'abonner aux événements
monitor.on("workflow.started", (event) => {
  console.log(`Workflow ${event.workflowId} started`);
});

monitor.on("node.completed", (event) => {
  console.log(`Node ${event.nodeId} completed in ${event.duration}ms`);
});

monitor.on("workflow.completed", (event) => {
  console.log(`Workflow completed with result:`, event.result);
});

// Récupérer les métriques
const metrics = await monitor.getMetrics(workflowId);
console.log(metrics);
```

---

## 🧪 Étape 4 : Tester

```typescript
// hello-workflow.test.ts
import { assertEquals } from "@std/assert";
import { WorkflowBuilder } from "@igon7/core";
import { TestExecutor } from "@igon7/testing";

Deno.test("Hello Workflow - should execute all nodes", async () => {
  const workflow = new WorkflowBuilder("test-hello")
    .addNode("fetch", async () => ({ value: 42 }))
    .addNode("transform", async (inputs) => ({
      result: inputs["fetch"].value * 2
    }), { dependsOn: ["fetch"] })
    .build();

  const executor = new TestExecutor();
  const result = await executor.execute(workflow);

  assertEquals(result.success, true);
  assertEquals(result.result.result, 84);
});
```

---

## 🎓 Concepts Clés

| Concept | Description |
|---------|-------------|
| **Node** | Une tâche individuelle dans le workflow |
| **Edge** | Dépendance entre deux noeuds |
| **DAG** | Graphe orienté acyclique du workflow |
| **Executor** | Moteur qui exécute le workflow |
| **Monitor** | Outil de suivi d'exécution |

---

## 📚 Suite

- [Architecture igon7](../igon7-engine/architecture)
- [Workflow Patterns](../advanced/workflow-patterns)
- [API Reference](../api-reference/overview)

---

**Temps estimé :** 20 minutes  
**Difficulté :** Débutant
