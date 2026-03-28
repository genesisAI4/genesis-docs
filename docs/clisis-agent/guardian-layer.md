---
sidebar_position: 3
---

# Clisis Agent - Guardian Layer

Documentation complète du Guardian Layer.

---

## 🛡️ 4 Couches de Défense

### Couche 1 : Input Guardrails

```typescript
const INJECTION_PATTERNS: RegExp[] = [
  // Direct instruction overrides
  /(?i)(ignore|disregard|forget|bypass)\s+(previous|system)\s+instructions/i,
  
  // Hidden instructions
  /(?i)(note|important)\s+to\s+(system|ai)/i,
  
  // Command injection
  /(?i)(execute|run|eval|exec)/i,
  
  // Data exfiltration
  /(?i)(send|transmit|export|leak)\s+data/i,
  
  // Role manipulation
  /(?i)you\s+are\s+(now|actually)\s+\w+/i,
];

function inputGuardrail(input: string): GuardrailResult {
  const suspiciousPatterns: string[] = [];
  
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      suspiciousPatterns.push(pattern.source);
    }
  }
  
  return {
    safe: suspiciousPatterns.length === 0,
    confidence: suspiciousPatterns.length === 0 ? 1.0 : 0.9,
    suspiciousPatterns,
    layer: 1,
  };
}
```

### Couche 2 : Output Guardrails

```typescript
const SENSITIVE_PATTERNS: RegExp[] = [
  // API Keys
  /sk-[a-zA-Z0-9]{32,}/,
  /ghp_[a-zA-Z0-9]{36}/,
  /AKIA[0-9A-Z]{16}/,
  
  // Private IPs
  /\b(10\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/,
  /\b(192\.168\.\d{1,3}\.\d{1,3})\b/,
  
  // Sensitive paths
  /\/etc\/(passwd|shadow)/,
  /\/home\/[^\/]+\/\.ssh\//,
];
```

### Couche 3 : Tool-Level Validation

```typescript
const FORBIDDEN_PATHS = [
  '/etc', '/var/log', '/root',
  '.ssh', '.gnupg', '.aws',
];

const CRITICAL_COMMANDS = [
  { regex: /rm\s+-rf\s+\//, score: 10, reason: 'Suppression massive' },
  { regex: /chmod\s+777/, score: 9, reason: 'Permissions dangereuses' },
  { regex: /sudo\s+/, score: 10, reason: 'Escalade privilèges' },
  { regex: /curl.*\|\s*bash/i, score: 10, reason: 'Script distant' },
];
```

### Couche 4 : Human-In-The-Loop

```typescript
class HITLInterrupt {
  private interrupted = false;
  
  setup(): void {
    Deno.addSignalListener('SIGINT', () => {
      this.interrupted = true;
    });
  }
  
  wasInterrupted(): boolean {
    return this.interrupted;
  }
  
  async waitForConfirmation(prompt: string): Promise<boolean> {
    console.log(prompt);
    const input = await readLine();
    return input.toLowerCase() === 'y';
  }
}
```

---

## 📊 Risk Matrix

```typescript
class RiskMatrix {
  static evaluate(command: string, targetPath?: string): RiskEvaluation {
    let score = 0;
    const reasons: string[] = [];
    
    // Vérifier commandes critiques
    for (const { regex, score: s, reason } of CRITICAL_COMMANDS) {
      if (regex.test(command)) {
        score += s;
        reasons.push(reason);
      }
    }
    
    // Vérifier chemins interdits
    if (targetPath) {
      for (const path of FORBIDDEN_PATHS) {
        if (targetPath.includes(path)) {
          score += 10;
          reasons.push(`Accès interdit: ${path}`);
        }
      }
    }
    
    return {
      score: Math.min(score, 10),
      reason: reasons.join('; '),
      blocked: score >= 8,
    };
  }
}
```

---

**Version :** 1.0.0
