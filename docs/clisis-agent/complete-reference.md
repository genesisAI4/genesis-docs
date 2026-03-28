---
sidebar_position: 2
---

# Clisis Agent - Documentation Complète

**Clisis Agent** est l'agent système de Genesis AI, responsable de l'interaction avec le système d'exploitation, le matériel, et l'exécution sandboxée de tâches avec une sécurité renforcée.

---

## 📊 Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| **Fichiers TypeScript** | 80+ fichiers |
| **Modules système** | 12 modules |
| **Gardes de sécurité** | 4 couches (CAI Guardrails) |
| **Patterns d'injection** | 30+ patterns détectés |
| **Commandes critiques** | 78 commandes surveillées |
| **Port d'exécution** | 18792 (HTTP/WebSocket) |

---

## 🏗️ Architecture Détaillée

### Structure du Projet

```
clisis-agent/
├── src/
│   ├── agents/
│   │   └── graph.ts                    # Graphe d'agents
│   │
│   ├── guardian/                       # COUCHE DE SÉCURITÉ
│   │   ├── __tests__/
│   │   │   ├── cai-guardrails.test.ts
│   │   │   ├── interceptor.test.ts
│   │   │   └── risk_matrix.test.ts
│   │   │
│   │   ├── skills/                     # Compétences du guardian
│   │   │   ├── command-validator.ts    # Validation de commandes
│   │   │   ├── path-sanitizer.ts       # Nettoyage de chemins
│   │   │   ├── network-guard.ts        # Garde réseau
│   │   │   └── resource-monitor.ts     # Surveillance ressources
│   │   │
│   │   ├── cai-guardrails.ts           # 4 couches de défense CAI
│   │   ├── interceptor.ts              # Intercepteur de requêtes
│   │   ├── risk_matrix.ts              # Matrice de risque
│   │   ├── shadow.ts                   # Shadow execution
│   │   └── types.ts                    # Types de sécurité
│   │
│   ├── libs/
│   │   └── genes.ts                    # Bibliothèque générique
│   │
│   ├── modules/                        # MODULES SYSTÈME
│   │   ├── clisis-cai/                 # Module CAI
│   │   │   ├── cai-agent.ts
│   │   │   ├── cai-config.ts
│   │   │   └── cai-executor.ts
│   │   │
│   │   ├── clisis-cli-qwen/            # Module CLI Qwen
│   │   │   ├── cli-parser.ts
│   │   │   ├── command-registry.ts
│   │   │   └── repl.ts
│   │   │
│   │   ├── google-workspace/           # Intégration Google Workspace
│   │   │   ├── drive.ts                # Google Drive API
│   │   │   ├── gmail.ts                # Gmail API
│   │   │   ├── calendar.ts             # Google Calendar API
│   │   │   ├── sheets.ts               # Google Sheets API
│   │   │   ├── auth.ts                 # OAuth2 Google
│   │   │   └── index.ts
│   │   │
│   │   ├── agents.ts                   # Registre d'agents
│   │   ├── browser.ts                  # Automatisation navigateur
│   │   ├── channels.ts                 # Canaux de communication
│   │   ├── coder.ts                    # Exécution de code
│   │   ├── maintenance.ts              # Maintenance système
│   │   ├── sandbox.ts                  # Sandbox d'exécution
│   │   ├── sessions.ts                 # Gestion de sessions
│   │   ├── system.ts                   # Informations système
│   │   └── vision.ts                   # Analyse d'images
│   │
│   ├── runtime/
│   │   ├── runtime-context.ts
│   │   └── runtime-executor.ts
│   │
│   ├── telemetry/
│   │   ├── metrics-collector.ts
│   │   ├── tracing.ts
│   │   └── health-monitor.ts
│   │
│   ├── tools/
│   │   ├── file-tools.ts
│   │   ├── process-tools.ts
│   │   ├── network-tools.ts
│   │   └── system-tools.ts
│   │
│   ├── utils/
│   │   └── tui.ts                      # Interface texte
│   │
│   ├── env.ts                          # Variables d'environnement
│   └── main.ts                         # Point d'entrée
│
├── .env.example
├── .env.google-workspace.example
├── deno.json
├── deno.lock
└── README.md
```

---

## 🛡️ Guardian Layer - 4 Couches de Défense

### Couche 1 : Input Guardrails

```typescript
/**
 * Première ligne de défense contre les injections
 * Analyse les entrées utilisateur pour détecter les patterns malveillants
 */

interface GuardrailResult {
  safe: boolean;
  confidence: number;      // 0.0 - 1.0
  reasoning: string;
  suspiciousPatterns: string[];
  layer: 1 | 2 | 3 | 4;
}

/**
 * Détecte les tentatives d'injection
 * 30+ patterns d'attaque connus
 */
const INJECTION_PATTERNS: RegExp[] = [
  // 1. Direct instruction overrides (5 patterns)
  /(?i)(ignore|disregard|forget|bypass|skip|override)\s+(all\s+)?(previous|prior|above|system)\s+(instructions?|rules?|commands?|prompts?)/i,
  /(?i)(new|updated?|revised?|changed?)\s+(instructions?|rules?|system\s+prompt)/i,
  /(?i)from\s+now\s+on\s*(,)?\s*(you|follow)/i,
  /(?i)disregard\s+any\s+(previous|prior)\s+instructions/i,
  /(?i)override\s+all\s+previous\s+constraints/i,

  // 2. Hidden instructions (4 patterns)
  /(?i)(note|important|attention|warning)\s+to\s+(system|ai|assistant|model|agent|llm)/i,
  /(?i)(system|admin|root)\s+(note|message|command|instruction)/i,
  /(?i)\[SYSTEM\s+INSTRUCTION\]/i,
  /(?i)<!--\s*instruction\s*-->/i,

  // 3. Output manipulation (3 patterns)
  /(?i)\[END\s+TOOL\s+OUTPUT\]/i,
  /(?i)---\s*END\s+OF\s+OUTPUT\s*---/i,
  /(?i)STOP\s+HERE/i,

  // 4. Security vulnerability claims (2 patterns)
  /(?i)THERE\s+IS\s+A\s+SECURITY\s+VULNERABILITY/i,
  /(?i)CRITICAL\s+BUG\s+DETECTED/i,

  // 5. Command injection (8 patterns)
  /(?i)(execute|run|eval|exec|os\.system|subprocess|shell)/i,
  /(?i)(nc|netcat|bash|sh|cmd|powershell)\s+[\-\w]+/i,
  /(?i)(curl|wget)\s+.*\|\s*(bash|sh)/i,
  /(?i)chmod\s+[0-7]{3,4}/i,
  /(?i)rm\s+-rf\s+\//i,
  /(?i)dd\s+if=.*of=\/dev/i,
  /(?i)mkfs/i,
  /(?i)fdisk/i,

  // 6. Data exfiltration (3 patterns)
  /(?i)(send|transmit|export|leak|exfiltrate)\s+(data|information|secrets|credentials)/i,
  /(?i)(upload|post)\s+to\s+(external|remote|attacker)/i,
  /(?i)bypass\s+(firewall|security|restriction)/i,

  // 7. Role manipulation (3 patterns)
  /(?i)you\s+are\s+(now|actually|really)\s+a?\s*\w+/i,
  /(?i)(act|behave|pretend)\s+(as|like)\s+a?\s*\w+/i,
  /(?i)enter\s+(developer|debug|admin)\s+mode/i,

  // 8. Encoding tricks (2 patterns)
  /(?i)(base64|hex|rot13|encoded|obfuscated)/i,
  /(?i)decode\s+and\s+execute/i,
];

/**
 * Normalise les homographes Unicode
 * Détecte les caractères trompeurs
 */
function normalizeUnicodeHomographs(text: string): string {
  const homographMap: Record<string, string> = {
    'а': 'a',  // Cyrillic
    'е': 'e',
    'о': 'o',
    'р': 'p',
    'с': 's',
    'х': 'x',
    'Α': 'A',  // Greek
    'Β': 'B',
    'Ε': 'E',
    'Η': 'H',
    'Ι': 'I',
    'Κ': 'K',
    'Μ': 'M',
    'Ν': 'N',
    'Ο': 'O',
    'Ρ': 'P',
    'Τ': 'T',
    'Χ': 'X',
    'Υ': 'Y',
  };
  
  return text.split('').map(char => homographMap[char] || char).join('');
}

/**
 * Détecte les payloads encodés
 */
function detectEncodedPayload(text: string): string | null {
  // Base64
  const base64Regex = /^[A-Za-z0-9+/]+=*$/;
  if (base64Regex.test(text) && text.length > 50) {
    try {
      const decoded = atob(text);
      if (decoded.match(/^(bash|sh|cmd|powershell)/i)) {
        return `Base64 encoded shell: ${decoded}`;
      }
    } catch {
      // Not valid base64
    }
  }
  
  // Hex
  const hexRegex = /^[0-9a-fA-F]+$/;
  if (hexRegex.test(text) && text.length > 20) {
    try {
      const decoded = Buffer.from(text, 'hex').toString();
      if (decoded.match(/^(bash|sh|cmd|powershell)/i)) {
        return `Hex encoded shell: ${decoded}`;
      }
    } catch {
      // Not valid hex
    }
  }
  
  return null;
}

/**
 * Garde d'entrée principale
 */
function inputGuardrail(input: string): GuardrailResult {
  const suspiciousPatterns: string[] = [];
  let maxConfidence = 0;
  let reasoning: string[] = [];
  
  // Normaliser Unicode
  const normalized = normalizeUnicodeHomographs(input);
  
  // Vérifier les patterns d'injection
  for (const pattern of INJECTION_PATTERNS) {
    const match = normalized.match(pattern);
    if (match) {
      suspiciousPatterns.push(pattern.source);
      maxConfidence = Math.max(maxConfidence, 0.9);
      reasoning.push(`Matched injection pattern: ${pattern.source}`);
    }
  }
  
  // Vérifier les payloads encodés
  const encodedPayload = detectEncodedPayload(input);
  if (encodedPayload) {
    suspiciousPatterns.push('encoded_payload');
    maxConfidence = Math.max(maxConfidence, 0.95);
    reasoning.push(encodedPayload);
  }
  
  // Vérifier la longueur (attaque par déni de service)
  if (input.length > 10000) {
    suspiciousPatterns.push('excessive_length');
    maxConfidence = Math.max(maxConfidence, 0.7);
    reasoning.push(`Input too long: ${input.length} chars`);
  }
  
  return {
    safe: suspiciousPatterns.length === 0,
    confidence: maxConfidence,
    reasoning: reasoning.join('; '),
    suspiciousPatterns,
    layer: 1,
  };
}
```

### Couche 2 : Output Guardrails

```typescript
/**
 * Vérifie les sorties de l'IA
 * Détecte les fuites d'informations sensibles
 */

const SENSITIVE_PATTERNS: RegExp[] = [
  // Clés API
  /sk-[a-zA-Z0-9]{32,}/,                    // OpenAI
  /ghp_[a-zA-Z0-9]{36}/,                    // GitHub
  /AIza[a-zA-Z0-9_-]{35}/,                  // Google
  /AKIA[0-9A-Z]{16}/,                       // AWS
  /[a-f0-9]{32}-[a-f0-9]{4}-[a-f0-9]{4}/,  // Generic UUID key
  
  // Adresses IP privées
  /\b(10\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/,
  /\b(172\.(1[6-9]|2[0-9]|3[01])\.\d{1,3}\.\d{1,3})\b/,
  /\b(192\.168\.\d{1,3}\.\d{1,3})\b/,
  
  // Chemins sensibles
  /\/etc\/(passwd|shadow|hosts)/,
  /\/home\/[^\/]+\/\.ssh\//,
  /C:\\Windows\\System32/,
  /\/var\/log\//,
  
  // Emails
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  
  // Numéros de téléphone
  /\+?[\d\s-()]{10,}/,
  
  // Numéros de carte de crédit
  /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/,
];

function outputGuardrail(output: string): GuardrailResult {
  const suspiciousPatterns: string[] = [];
  let maxConfidence = 0;
  const reasoning: string[] = [];
  
  for (const pattern of SENSITIVE_PATTERNS) {
    const matches = output.match(pattern);
    if (matches) {
      suspiciousPatterns.push(pattern.source);
      maxConfidence = Math.max(maxConfidence, 0.8);
      reasoning.push(`Sensitive data detected: ${matches[0].substring(0, 20)}...`);
    }
  }
  
  // Vérifier les commandes exécutables
  if (output.match(/^(bash|sh|cmd|powershell)\s+/i)) {
    suspiciousPatterns.push('executable_command');
    maxConfidence = Math.max(maxConfidence, 0.9);
    reasoning.push('Output starts with shell command');
  }
  
  return {
    safe: suspiciousPatterns.length === 0,
    confidence: maxConfidence,
    reasoning: reasoning.join('; '),
    suspiciousPatterns,
    layer: 2,
  };
}
```

### Couche 3 : Tool-Level Validation

```typescript
/**
 * Validation au niveau des outils
 * Vérifie les paramètres avant exécution
 */

interface ToolValidationResult {
  valid: boolean;
  riskScore: number;         // 1-10
  blockedReason?: string;
  sanitizedParams?: Record<string, any>;
}

const FORBIDDEN_PATHS = [
  '/etc', '/var/log', '/var/spool', '/root',
  '/boot', '/dev', '/proc', '/sys',
  'C:\\Windows', 'C:\\Program Files',
  '.ssh', '.gnupg', '.aws', '.bash_history',
  'node_modules', '.git',
];

const CRITICAL_COMMANDS: Array<{
  regex: RegExp;
  score: number;
  reason: string;
}> = [
  { regex: /rm\s+-rf\s+\/?$/, score: 10, reason: 'Suppression récursive massive' },
  { regex: /rm\s+-rf\s+\*$/, score: 10, reason: 'Suppression de tous les fichiers' },
  { regex: /format\s+\/C/i, score: 10, reason: 'Formatage de disque' },
  { regex: /dd\s+if=.*of=\/dev/, score: 10, reason: 'Écriture directe sur périphérique' },
  { regex: /mkfs/, score: 10, reason: 'Création de système de fichiers' },
  { regex: /fdisk/, score: 10, reason: 'Partitionnement de disque' },
  { regex: /chmod\s+777/, score: 9, reason: 'Permissions dangereuses' },
  { regex: /chmod\s+[4567][0-7]{2}/, score: 8, reason: 'Permissions élevées' },
  { regex: /sudo\s+/, score: 10, reason: 'Escalade de privilèges' },
  { regex: /su\s+-/, score: 9, reason: 'Changement d\'utilisateur' },
  { regex: /curl.*\|\s*bash/i, score: 10, reason: 'Exécution script distant' },
  { regex: /wget.*\|\s*bash/i, score: 10, reason: 'Exécution script distant' },
  { regex: /nc\s+-[el]/i, score: 9, reason: 'Netcat listener' },
  { regex: /netcat\s+-[el]/i, score: 9, reason: 'Netcat listener' },
  { regex: /bash\s+-i/i, score: 9, reason: 'Bash interactif' },
  { regex: /python\s+-c\s+.*socket/i, score: 9, reason: 'Reverse shell Python' },
  { regex: /perl\s+-e\s+.*socket/i, score: 9, reason: 'Reverse shell Perl' },
  { regex: /php\s+-r\s+.*socket/i, score: 9, reason: 'Reverse shell PHP' },
  { regex: /export\s+.*=.*;/i, score: 7, reason: 'Export de variable' },
  { regex: /eval\s*\(/i, score: 8, reason: 'Évaluation de code' },
  { regex: /exec\s*\(/i, score: 8, reason: 'Exécution de code' },
];

function toolLevelValidation(
  toolName: string,
  params: Record<string, any>
): ToolValidationResult {
  const riskFactors: string[] = [];
  let riskScore = 0;
  
  // Validation spécifique par outil
  switch (toolName) {
    case 'execute_command':
    case 'run_shell':
      return validateCommand(params.command as string);
    
    case 'read_file':
    case 'write_file':
      return validateFilePath(params.path as string);
    
    case 'http_request':
      return validateUrl(params.url as string);
    
    case 'list_directory':
      return validateDirectory(params.path as string);
    
    default:
      return { valid: true, riskScore: 0 };
  }
}

function validateCommand(command: string): ToolValidationResult {
  // Vérifier les commandes critiques
  for (const { regex, score, reason } of CRITICAL_COMMANDS) {
    if (regex.test(command)) {
      return {
        valid: false,
        riskScore: score,
        blockedReason: reason,
      };
    }
  }
  
  // Vérifier les chemins interdits
  for (const path of FORBIDDEN_PATHS) {
    if (command.includes(path)) {
      return {
        valid: false,
        riskScore: 9,
        blockedReason: `Accès interdit à: ${path}`,
      };
    }
  }
  
  // Score de risque basé sur la complexité
  if (command.includes('|') || command.includes('&&') || command.includes(';')) {
    riskScore += 3;
    riskFactors.push('Command chaining detected');
  }
  
  if (command.includes('$(') || command.includes('`')) {
    riskScore += 4;
    riskFactors.push('Command substitution detected');
  }
  
  if (command.includes('>')) {
    riskScore += 2;
    riskFactors.push('Output redirection detected');
  }
  
  return {
    valid: riskScore < 5,
    riskScore,
    blockedReason: riskScore >= 5 ? `Risk too high: ${riskFactors.join('; ')}` : undefined,
    sanitizedParams: { command: command.trim() },
  };
}

function validateFilePath(path: string): ToolValidationResult {
  let riskScore = 0;
  
  // Chemins absolus
  if (path.startsWith('/')) {
    riskScore += 2;
  }
  
  // Vérifier les chemins interdits
  for (const forbidden of FORBIDDEN_PATHS) {
    if (path.includes(forbidden)) {
      return {
        valid: false,
        riskScore: 10,
        blockedReason: `Accès interdit au chemin: ${forbidden}`,
      };
    }
  }
  
  // Tentative de traversal
  if (path.includes('../') || path.includes('..\\')) {
    riskScore += 5;
  }
  
  // Fichiers sensibles
  if (path.match(/\.(ssh|key|pem|env|config)$/i)) {
    riskScore += 4;
  }
  
  return {
    valid: riskScore < 6,
    riskScore,
    blockedReason: riskScore >= 6 ? 'File path too risky' : undefined,
    sanitizedParams: { path: path.replace(/\.\.\//g, '') },
  };
}

function validateUrl(url: string): ToolValidationResult {
  let riskScore = 0;
  
  try {
    const parsed = new URL(url);
    
    // IP privées
    if (parsed.hostname.match(/^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.)/)) {
      riskScore += 5;
    }
    
    // localhost
    if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
      riskScore += 4;
    }
    
    // Metadata cloud
    if (parsed.hostname === '169.254.169.254') {
      return {
        valid: false,
        riskScore: 10,
        blockedReason: 'Cloud metadata access blocked',
      };
    }
    
    // Ports sensibles
    const sensitivePorts = [22, 23, 3389, 5900, 6379, 27017];
    if (parsed.port && sensitivePorts.includes(parseInt(parsed.port))) {
      riskScore += 4;
    }
    
  } catch {
    return {
      valid: false,
      riskScore: 10,
      blockedReason: 'Invalid URL',
    };
  }
  
  return {
    valid: riskScore < 6,
    riskScore,
    blockedReason: riskScore >= 6 ? 'URL too risky' : undefined,
  };
}

function validateDirectory(path: string): ToolValidationResult {
  return validateFilePath(path);
}
```

### Couche 4 : Human-In-The-Loop

```typescript
/**
 * Interruption humaine
 * Permet à l'utilisateur d'interrompre l'exécution
 */

class HITLInterrupt {
  private interrupted = false;
  private interruptHandler?: () => void;
  private signal: AbortSignal;
  
  constructor() {
    this.signal = new AbortController().signal;
    
    // Écouter Ctrl+C
    Deno.addSignalListener('SIGINT', () => {
      this.interrupted = true;
      if (this.interruptHandler) {
        this.interruptHandler();
      }
    });
  }
  
  setup(): void {
    console.log('Press Ctrl+C to interrupt execution');
  }
  
  wasInterrupted(): boolean {
    return this.interrupted;
  }
  
  reset(): void {
    this.interrupted = false;
  }
  
  onInterrupt(handler: () => void): void {
    this.interruptHandler = handler;
  }
  
  async waitForConfirmation(prompt: string): Promise<boolean> {
    console.log(prompt);
    console.log('(y/n) > ');
    
    const input = await readLine();
    return input.toLowerCase() === 'y';
  }
}
```

---

## 📦 Modules Système

### SystemModule

```typescript
/**
 * Module d'informations système
 */
interface SystemInfo {
  platform: string;
  arch: string;
  cpus: number;
  totalMemory: number;
  freeMemory: number;
  uptime: number;
  hostname: string;
  username: string;
  homedir: string;
}

interface ProcessInfo {
  pid: number;
  name: string;
  cpu: number;
  memory: number;
  status: string;
  started: Date;
}

class SystemModule {
  /**
   * Informations système complètes
   */
  static getInfo(): SystemInfo {
    return {
      platform: Deno.build.os,
      arch: Deno.build.arch,
      cpus: navigator.hardwareConcurrency,
      totalMemory: Deno.systemMemoryInfo().total,
      freeMemory: Deno.systemMemoryInfo().available,
      uptime: performance.now(),
      hostname: Deno.hostname(),
      username: Deno.user().username,
      homedir: Deno.homeDir() || '',
    };
  }
  
  /**
   * Liste des processus
   */
  static async listProcesses(): Promise<ProcessInfo[]> {
    const output = await new Deno.Command('ps', {
      args: ['aux'],
      stdout: 'piped',
    }).output();
    
    const lines = new TextDecoder().decode(output.stdout).split('\n');
    
    return lines.slice(1).map(line => {
      const [user, pid, cpu, mem, , , , , , , name] = line.split(/\s+/);
      return {
        pid: parseInt(pid),
        name,
        cpu: parseFloat(cpu),
        memory: parseFloat(mem),
        status: 'running',
        started: new Date(),
      };
    }).filter(p => p.pid > 0);
  }
  
  /**
   * Liste des fichiers
   */
  static async listFiles(path: string = '.'): Promise<string[]> {
    const entries: string[] = [];
    
    for await (const entry of Deno.readDir(path)) {
      entries.push(entry.name);
    }
    
    return entries.sort();
  }
}
```

### VisionModule

```typescript
/**
 * Module d'analyse d'images
 */
interface DetectedObject {
  label: string;
  confidence: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface VisionResult {
  objects: DetectedObject[];
  text: string[];
  scene: string;
  colors: string[];
  dimensions: {
    width: number;
    height: number;
  };
}

class VisionModule {
  /**
   * Analyse une image
   */
  static async analyzeImage(imagePath: string): Promise<VisionResult> {
    // Utiliser une API de vision par ordinateur
    const image = await Deno.readFile(imagePath);
    
    // Appel à un service de vision (ex: Google Vision, Azure Computer Vision)
    const response = await fetch('https://vision.googleapis.com/v1/images:annotate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GOOGLE_VISION_API_KEY}`,
      },
      body: JSON.stringify({
        requests: [{
          image: {
            content: Buffer.from(image).toString('base64'),
          },
          features: [
            { type: 'LABEL_DETECTION', maxResults: 10 },
            { type: 'TEXT_DETECTION', maxResults: 20 },
            { type: 'OBJECT_LOCALIZATION', maxResults: 10 },
          ],
        }],
      }),
    });
    
    const result = await response.json();
    
    return {
      objects: result.responses[0].localizationAnnotations?.map((a: any) => ({
        label: a.name,
        confidence: a.score,
        boundingBox: {
          x: a.boundingPoly.vertices[0].x,
          y: a.boundingPoly.vertices[0].y,
          width: a.boundingPoly.vertices[2].x - a.boundingPoly.vertices[0].x,
          height: a.boundingPoly.vertices[2].y - a.boundingPoly.vertices[0].y,
        },
      })) || [],
      text: result.responses[0].textAnnotations?.map((a: any) => a.description) || [],
      scene: result.responses[0].labelAnnotations?.[0]?.description || 'unknown',
      colors: [],
      dimensions: { width: 0, height: 0 },
    };
  }
}
```

### SandboxModule

```typescript
/**
 * Module de sandboxing
 */
interface SandboxStatus {
  isolation_level: string;
  active_sandboxes: number;
  docker_daemon: string;
}

class SandboxModule {
  /**
   * Status de la sandbox
   */
  static async status(): Promise<SandboxStatus> {
    try {
      const output = await new Deno.Command('docker', {
        args: ['info', '--format', '{{.NCPU}}'],
        stdout: 'piped',
      }).output();
      
      return {
        isolation_level: 'docker',
        active_sandboxes: await this.countActiveSandboxes(),
        docker_daemon: 'running',
      };
    } catch {
      return {
        isolation_level: 'none',
        active_sandboxes: 0,
        docker_daemon: 'not running',
      };
    }
  }
  
  /**
   * Redémarre la sandbox
   */
  static async restart(): Promise<void> {
    await new Deno.Command('docker', {
      args: ['restart', 'clisis-sandbox'],
    }).output();
  }
  
  private static async countActiveSandboxes(): Promise<number> {
    const output = await new Deno.Command('docker', {
      args: ['ps', '-q'],
      stdout: 'piped',
    }).output();
    
    const containers = new TextDecoder().decode(output.stdout).trim().split('\n');
    return containers.filter(c => c.length > 0).length;
  }
}
```

### GoogleWorkspaceModule

```typescript
/**
 * Module Google Workspace
 * Intégration complète avec les APIs Google
 */

interface GWSStatus {
  initialized: boolean;
  credentials_valid: boolean;
  enabled_apis: string[];
}

interface ListFilesResult {
  files: Array<{
    id: string;
    name: string;
    mimeType: string;
    size: number;
    createdTime: string;
    modifiedTime: string;
  }>;
  nextPageToken?: string;
}

interface UploadResult {
  id: string;
  name: string;
  webViewLink: string;
  webContentLink: string;
}

interface ShareResult {
  success: boolean;
  permissionId: string;
}

interface SendEmailResult {
  messageId: string;
  threadId: string;
  labelIds: string[];
}

interface CreateEventResult {
  id: string;
  htmlLink: string;
  status: string;
}

interface CreateSheetResult {
  spreadsheetId: string;
  spreadsheetUrl: string;
  sheetId: number;
}

interface ReadValuesResult {
  range: string;
  majorDimension: string;
  values: any[][];
}

interface WriteValuesResult {
  spreadsheetId: string;
  range: string;
  updatedCells: number;
}

class GoogleWorkspaceModule {
  private static oauth2Client?: OAuth2Client;
  private static drive?: drive_v3.Drive;
  private static gmail?: gmail_v1.Gmail;
  private static calendar?: calendar_v3.Calendar;
  private static sheets?: sheets_v4.Sheets;
  
  /**
   * Initialise le module
   */
  static async initialize(): Promise<{ success: boolean; error?: string }> {
    try {
      // Charger les credentials
      const credentials = JSON.parse(
        await Deno.readTextFile('./google-credentials.json')
      );
      
      // Créer le client OAuth2
      this.oauth2Client = new OAuth2Client({
        clientId: credentials.client_id,
        clientSecret: credentials.client_secret,
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
      });
      
      // Obtenir le token
      const authUrl = this.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
          'https://www.googleapis.com/auth/drive',
          'https://www.googleapis.com/auth/gmail.send',
          'https://www.googleapis.com/auth/calendar',
          'https://www.googleapis.com/auth/spreadsheets',
        ],
      });
      
      console.log('Authorize this app at:', authUrl);
      
      // Initialiser les clients
      this.drive = google.drive({ version: 'v3', auth: this.oauth2Client });
      this.gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
      this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
      this.sheets = google.sheets({ version: 'v4', auth: this.oauth2Client });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Status du module
   */
  static getStatus(): GWSStatus {
    return {
      initialized: this.oauth2Client !== undefined,
      credentials_valid: this.oauth2Client !== undefined,
      enabled_apis: ['drive', 'gmail', 'calendar', 'sheets'],
    };
  }
  
  /**
   * Lister les fichiers Drive
   */
  static async listFiles(options: {
    pageSize?: number;
    q?: string;
    pageToken?: string;
  } = {}): Promise<ListFilesResult> {
    const response = await this.drive!.files.list({
      pageSize: options.pageSize || 10,
      fields: 'nextPageToken, files(id, name, mimeType, size, createdTime, modifiedTime)',
      q: options.q,
      pageToken: options.pageToken,
    });
    
    return {
      files: response.data.files || [],
      nextPageToken: response.data.nextPageToken,
    };
  }
  
  /**
   * Upload un fichier
   */
  static async uploadFile(options: {
    path: string;
    mimeType?: string;
    description?: string;
  }): Promise<UploadResult> {
    const fileMetadata = {
      name: basename(options.path),
      description: options.description,
    };
    
    const media = {
      mimeType: options.mimeType || 'application/octet-stream',
      body: await Deno.readFile(options.path),
    };
    
    const response = await this.drive!.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name, webViewLink, webContentLink',
    });
    
    return response.data as UploadResult;
  }
  
  /**
   * Partager un fichier
   */
  static async shareFile(options: {
    fileId: string;
    email: string;
    role?: 'reader' | 'writer' | 'commenter' | 'organizer';
    type?: 'user' | 'group' | 'domain' | 'anyone';
  }): Promise<ShareResult> {
    const response = await this.drive!.permissions.create({
      fileId: options.fileId,
      requestBody: {
        role: options.role || 'reader',
        type: options.type || 'user',
        emailAddress: options.email,
      },
      fields: 'id',
    });
    
    return {
      success: true,
      permissionId: response.data.id!,
    };
  }
  
  /**
   * Envoyer un email
   */
  static async sendEmail(options: {
    to: string;
    subject: string;
    body: string;
    html?: string;
    attachments?: string[];
  }): Promise<SendEmailResult> {
    const message = [
      `To: ${options.to}`,
      `Subject: ${options.subject}`,
      'Content-Type: text/html; charset=utf-8',
      '',
      options.html || options.body,
    ].join('\n');
    
    const encodedMessage = Buffer.from(message).toString('base64');
    
    const response = await this.gmail!.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
      },
    });
    
    return response.data as SendEmailResult;
  }
  
  /**
   * Créer un événement calendar
   */
  static async createEvent(options: {
    summary: string;
    start: string;
    end: string;
    description?: string;
    attendees?: string[];
  }): Promise<CreateEventResult> {
    const response = await this.calendar!.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: options.summary,
        description: options.description,
        start: { dateTime: options.start },
        end: { dateTime: options.end },
        attendees: options.attendees?.map(email => ({ email })),
      },
    });
    
    return response.data as CreateEventResult;
  }
  
  /**
   * Créer un spreadsheet
   */
  static async createSpreadsheet(options: {
    title: string;
  }): Promise<CreateSheetResult> {
    const response = await this.sheets!.spreadsheets.create({
      requestBody: {
        properties: {
          title: options.title,
        },
      },
    });
    
    return {
      spreadsheetId: response.data.spreadsheetId!,
      spreadsheetUrl: response.data.spreadsheetUrl!,
      sheetId: response.data.sheets![0].properties!.sheetId!,
    };
  }
  
  /**
   * Lire des valeurs
   */
  static async readValues(options: {
    spreadsheetId: string;
    range: string;
  }): Promise<ReadValuesResult> {
    const response = await this.sheets!.spreadsheets.values.get({
      spreadsheetId: options.spreadsheetId,
      range: options.range,
    });
    
    return response.data as ReadValuesResult;
  }
  
  /**
   * Écrire des valeurs
   */
  static async writeValues(options: {
    spreadsheetId: string;
    range: string;
    values: any[][];
  }): Promise<WriteValuesResult> {
    const response = await this.sheets!.spreadsheets.values.update({
      spreadsheetId: options.spreadsheetId,
      range: options.range,
      valueInputOption: 'RAW',
      requestBody: {
        values: options.values,
      },
    });
    
    return response.data as WriteValuesResult;
  }
}
```

---

## 🛠️ Commandes CLI

```bash
# Status système
clisis > status

# Lister les processus
clisis > ps

# Audit de sécurité
clisis > audit

# Lister les agents
clisis > agents

# Query Genesis brain
clisis > ask <query>

# Diagnostiques
clisis > doctor

# Lister les fichiers
clisis > ls [path]

# Analyser une image
clisis > vision <image>

# Exécuter un pattern Fabric
clisis > run <pattern>

# Utiliser un pattern wisdom
clisis > fabric <pattern>

# Gestion des tokens
clisis > token:refresh
clisis > token:status

# Google Workspace
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

## 🔐 JWT Authentication

```typescript
const TOKEN_LIFETIME_MS = 15 * 60 * 1000;  // 15 minutes
const TOKEN_REFRESH_THRESHOLD_MS = 5 * 60 * 1000;  // Refresh si < 5 min

interface JWTPayload {
  sub: string;           // Agent ID
  iss: 'clisis-agent';
  aud: string[];         // Audiences
  exp: number;           // Expiration
  iat: number;           // Issued at
  jti: string;           // JWT ID
  roles: string[];       // Rôles
  permissions: string[]; // Permissions
}

async function validateToken(token: string): Promise<boolean> {
  // 1. Vérifier la signature HMAC-SHA256
  const [header, payload, signature] = token.split('.');
  const expectedSignature = createHmac('sha256', JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');
  
  if (signature !== expectedSignature) {
    return false;
  }
  
  // 2. Vérifier l'expiration
  const decoded = JSON.parse(atob(payload));
  if (decoded.exp < Date.now() / 1000) {
    return false;
  }
  
  // 3. Vérifier not-before
  if (decoded.nbf && decoded.nbf > Date.now() / 1000) {
    return false;
  }
  
  // 4. Vérifier l'agent ID
  if (decoded.sub !== AGENT_ID) {
    return false;
  }
  
  // 5. Vérifier l'issuer
  if (decoded.iss !== 'clisis-agent') {
    return false;
  }
  
  return true;
}
```

---

## 📋 Configuration

### deno.json

```json
{
  "name": "@genesis/clisis-agent",
  "version": "1.0.0",
  "tasks": {
    "start": "deno run --allow-all src/main.ts",
    "dev": "deno run --watch --allow-all src/main.ts",
    "test": "deno test --allow-all src/guardian/__tests__/",
    "lint": "deno lint",
    "fmt": "deno fmt"
  },
  "imports": {
    "googleapis": "npm:googleapis@^128.0.0",
    "oauth2": "npm:oauth2-client@^4.1.0"
  },
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true
  }
}
```

### .env.example

```bash
# Clisis Configuration
CLISIS_PORT=18792
CLISIS_HOST=localhost

# Security
GUARDIAN_ENABLED=true
GUARDIAN_LEVEL=strict  # strict, moderate, permissive
VAULT_SALT=random-salt-2026

# Sandbox
SANDBOX_ENABLED=true
SANDBOX_TYPE=docker  # docker, none

# Database
DATABASE_URL=postgres://localhost:5432/clisis

# Redis
REDIS_URL=redis://localhost:6379

# Google Workspace
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=urn:ietf:wg:oauth:2.0:oob

# JWT
JWT_SECRET=your-jwt-secret
AGENT_ID=clisis-001
```

---

**Version :** 1.0.0  
**Dernière mise à jour :** 28 Mars 2026  
**Statut :** ✅ Documentation Complète
