---
sidebar_position: 7
---

# igon7 Engine - Testing

Guide complet de test pour igon7 Engine.

---

## 🧪 Types de tests

- **Unit Tests** - Tests unitaires avec Vitest
- **Integration Tests** - Tests d'intégration
- **E2E Tests** - Tests de bout en bout avec Playwright
- **Load Tests** - Tests de charge

---

## 📦 Unit Tests

### Configuration Vitest

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'test/'],
    },
  },
});
```

### Exemple de test unitaire

```typescript
// packages/core/workflow-builder.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { WorkflowBuilder } from './workflow-builder';

describe('WorkflowBuilder', () => {
  let builder: WorkflowBuilder;
  
  beforeEach(() => {
    builder = new WorkflowBuilder('test-workflow');
  });
  
  it('should create workflow with single node', () => {
    const workflow = builder
      .addNode('task-1', async () => 'result1')
      .build();
    
    expect(workflow.nodes).toHaveLength(1);
    expect(workflow.nodes[0].id).toBe('task-1');
  });
  
  it('should create workflow with dependencies', () => {
    const workflow = builder
      .addNode('task-1', async () => 'result1')
      .addNode('task-2', async (ctx) => ctx.inputs['task-1'], {
        dependsOn: ['task-1'],
      })
      .build();
    
    expect(workflow.nodes).toHaveLength(2);
    expect(workflow.edges).toHaveLength(1);
  });
  
  it('should detect circular dependencies', () => {
    expect(() => {
      builder
        .addNode('a', async () => {}, { dependsOn: ['b'] })
        .addNode('b', async () => {}, { dependsOn: ['a'] })
        .build();
    }).toThrow('Circular dependency detected');
  });
  
  it('should validate workflow before build', () => {
    const workflow = builder
      .addNode('task-1', async () => 'result1')
      .build();
    
    const validation = workflow.validate();
    expect(validation.valid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });
});
```

### Mocking dependencies

```typescript
// packages/executor/temporal-executor.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TemporalExecutor } from './temporal-executor';

// Mock du client Temporal
vi.mock('@temporalio/client', () => ({
  Client: vi.fn().mockImplementation(() => ({
    workflow: {
      start: vi.fn(),
      execute: vi.fn(),
    },
  })),
}));

describe('TemporalExecutor', () => {
  let executor: TemporalExecutor;
  
  beforeEach(() => {
    executor = new TemporalExecutor({
      address: 'localhost:7233',
      namespace: 'test',
    });
  });
  
  it('should execute workflow', async () => {
    const workflow = createTestWorkflow();
    
    const result = await executor.execute(workflow, {
      workflowId: 'test-123',
    });
    
    expect(result).toEqual({ success: true });
  });
});
```

---

## 🔗 Integration Tests

### Test avec Temporal embarqué

```typescript
// test/integration/workflow-execution.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { TemporalTestEnv } from '@igon7/testing';

describe('Workflow Execution Integration', () => {
  let testEnv: TemporalTestEnv;
  
  beforeAll(async () => {
    testEnv = new TemporalTestEnv();
    await testEnv.start();
  });
  
  afterAll(async () => {
    await testEnv.stop();
  });
  
  it('should execute complete workflow', async () => {
    const executor = testEnv.createExecutor();
    const workflow = createTestWorkflow();
    
    const result = await executor.execute(workflow, {
      workflowId: `test-${Date.now()}`,
      input: { testData: 'value' },
    });
    
    expect(result.success).toBe(true);
    expect(result.processedItems).toBe(10);
  });
  
  it('should handle workflow failure', async () => {
    const executor = testEnv.createExecutor();
    const workflow = createFailingWorkflow();
    
    await expect(
      executor.execute(workflow, {
        workflowId: `test-${Date.now()}`,
      })
    ).rejects.toThrow('Expected failure');
  });
});
```

---

## 🎭 E2E Tests

### Configuration Playwright

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 2,
  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
});
```

### Exemple de test E2E

```typescript
// e2e/workflow-execution.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Workflow Execution', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workflows');
  });
  
  test('should create and execute workflow', async ({ page }) => {
    // Créer un workflow
    await page.click('[data-testid="create-workflow"]');
    await page.fill('[data-testid="workflow-name"]', 'Test Workflow');
    
    // Ajouter un noeud
    await page.click('[data-testid="add-node"]');
    await page.selectOption('[data-testid="node-type"]', 'http-request');
    await page.fill('[data-testid="node-url"]', 'https://api.example.com/data');
    
    // Exécuter
    await page.click('[data-testid="execute-workflow"]');
    
    // Attendre le résultat
    await expect(page.locator('[data-testid="status"]'))
      .toHaveText('Completed', { timeout: 30000 });
  });
  
  test('should handle workflow error', async ({ page }) => {
    await page.click('[data-testid="create-workflow"]');
    await page.fill('[data-testid="workflow-name"]', 'Failing Workflow');
    
    // Configurer pour échouer
    await page.click('[data-testid="add-node"]');
    await page.selectOption('[data-testid="node-type"]', 'http-request');
    await page.fill('[data-testid="node-url"]', 'https://invalid-url.invalid');
    
    await page.click('[data-testid="execute-workflow"]');
    
    // Vérifier l'erreur
    await expect(page.locator('[data-testid="error-message"]'))
      .toBeVisible({ timeout: 30000 });
  });
});
```

---

## ⚡ Load Tests

### Configuration k6

```javascript
// load-tests/workflow-load.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Métriques personnalisées
const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Ramp up to 200
    { duration: '5m', target: 200 },  // Stay at 200 users
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% < 500ms
    errors: ['rate<0.01'],            // < 1% errors
  },
};

export default function () {
  const payload = JSON.stringify({
    workflowId: `load-test-${__VU}-${__ITER}`,
    input: { testData: 'load-test' },
  });
  
  const params = {
    headers: { 'Content-Type': 'application/json' },
  };
  
  const res = http.post(
    'http://localhost:18791/workflows/execute',
    payload,
    params
  );
  
  const success = check(res, {
    'status is 200': (r) => r.status === 200,
    'has success field': (r) => JSON.parse(r.body).success === true,
  });
  
  errorRate.add(!success);
  
  sleep(1);
}
```

---

## 📊 Coverage

### Rapport de coverage

```bash
# Générer le rapport
pnpm test:coverage

# Ouvrir le rapport HTML
open coverage/index.html
```

### Objectifs de coverage

```json
{
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
}
```

---

**Version :** 1.0.0
