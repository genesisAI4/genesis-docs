---
sidebar_position: 1
---

# Genesis Browser Extension - Documentation Complète

**Genesis Extension** est une extension Chrome Manifest V3 qui injecte du contexte web dans les workflows Genesis AI et sert de pont entre le navigateur et Nexus.

---

## 📊 Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| **Fichiers TypeScript** | 30+ fichiers |
| **Manifest Version** | V3 |
| **Composants** | Content Scripts, Service Worker, Popup, Side Panel |
| **Permissions** | Minimal et contrôlées |

---

## 🏗️ Architecture

### Structure du Projet

```
genesis-extension/
├── .github/
├── content/                        # Content Scripts
│   ├── index.ts                    # Entry point
│   ├── context-extractor.ts        # Extraction de contexte
│   ├── page-analyzer.ts            # Analyse de page
│   ├── dom-utils.ts                # Utilitaires DOM
│   ├── highlighter.ts              # Surlignage
│   └── styles/
│       └── overlay.css
│
├── icons/                          # Icônes
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
│
├── lib/                            # Bibliothèques partagées
│   ├── bridge.ts                   # Bridge protocol
│   ├── storage.ts                  # Chrome Storage
│   └── messaging.ts                # Message handling
│
├── popup/                          # Popup UI
│   ├── index.html
│   ├── index.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── status-indicator.tsx
│   │   ├── quick-actions.tsx
│   │   ├── context-preview.tsx
│   │   └── settings-toggle.tsx
│   └── styles/
│       └── popup.css
│
├── background/                     # Service Worker (Background)
│   ├── index.ts                    # Entry point
│   ├── message-handler.ts          # Gestion des messages
│   ├── context-manager.ts          # Gestion du contexte
│   ├── nexus-bridge.ts             # Bridge vers Nexus
│   └── alarms.ts                   # Tâches planifiées
│
├── side-panel/                     # Side Panel (Chrome 114+)
│   ├── index.html
│   ├── index.tsx
│   └── App.tsx
│
├── tests/                          # Tests
│   ├── unit/
│   └── e2e/
│
├── .gitignore
├── manifest.json                   # Manifest V3
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📄 Manifest Configuration

```json
{
  "manifest_version": 3,
  "name": "Genesis AI Extension",
  "version": "1.0.0",
  "description": "Inject web context into Genesis AI workflows",
  
  "icons": {
    "16": "icons/icon-16.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  },
  
  "action": {
    "default_popup": "popup/index.html",
    "default_icon": {
      "16": "icons/icon-16.png",
      "48": "icons/icon-48.png",
      "128": "icons/icon-128.png"
    },
    "default_title": "Genesis AI"
  },
  
  "side_panel": {
    "default_path": "side-panel/index.html"
  },
  
  "background": {
    "service_worker": "background/index.js",
    "type": "module"
  },
  
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content/index.js"],
      "css": ["content/styles/overlay.css"],
      "run_at": "document_idle",
      "all_frames": false
    }
  ],
  
  "permissions": [
    "activeTab",
    "storage",
    "contextMenus",
    "scripting",
    "sidePanel",
    "alarms"
  ],
  
  "host_permissions": [
    "https://nexus.genesisai.io/*"
  ],
  
  "web_accessible_resources": [
    {
      "resources": ["content/styles/*", "icons/*"],
      "matches": ["<all_urls>"]
    }
  ],
  
  "commands": {
    "_execute_action": {
      "suggested_key": {
        "default": "Ctrl+Shift+G",
        "mac": "Command+Shift+G"
      }
    },
    "capture-context": {
      "suggested_key": {
        "default": "Ctrl+Shift+C",
        "mac": "Command+Shift+C"
      },
      "description": "Capture page context"
    }
  }
}
```

---

## 🔌 Content Scripts

### Context Extractor

```typescript
// content/context-extractor.ts
export interface PageContext {
  url: string;
  title: string;
  description?: string;
  content: string;
  metadata: Record<string, string>;
  links: Array<{ text: string; url: string }>;
  images: Array<{ src: string; alt: string }>;
  selectedText?: string;
  timestamp: number;
}

export class ContextExtractor {
  /**
   * Extrait le contexte complet de la page
   */
  static extract(): PageContext {
    return {
      url: window.location.href,
      title: document.title,
      description: this.extractMetaDescription(),
      content: this.extractMainContent(),
      metadata: this.extractMetadata(),
      links: this.extractLinks(),
      images: this.extractImages(),
      selectedText: this.getSelectedText(),
      timestamp: Date.now(),
    };
  }
  
  private static extractMetaDescription(): string | undefined {
    const meta = document.querySelector('meta[name="description"]');
    return meta?.getAttribute('content') || undefined;
  }
  
  private static extractMainContent(): string {
    // Extraire le contenu principal (éviter nav, footer, etc.)
    const main = document.querySelector('main, article, [role="main"]');
    if (main) {
      return main.textContent?.trim() || '';
    }
    
    // Fallback: body content
    return document.body.textContent?.trim() || '';
  }
  
  private static extractMetadata(): Record<string, string> {
    const metadata: Record<string, string> = {};
    const metas = document.querySelectorAll('meta');
    
    metas.forEach(meta => {
      const name = meta.getAttribute('name') || meta.getAttribute('property');
      const content = meta.getAttribute('content');
      
      if (name && content) {
        metadata[name] = content;
      }
    });
    
    return metadata;
  }
  
  private static extractLinks(): Array<{ text: string; url: string }> {
    const links: Array<{ text: string; url: string }> = [];
    const anchors = document.querySelectorAll('a[href]');
    
    anchors.forEach(anchor => {
      const href = anchor.getAttribute('href');
      const text = anchor.textContent?.trim() || '';
      
      if (href && text && href.startsWith('http')) {
        links.push({ text, url: href });
      }
    });
    
    return links.slice(0, 50); // Limiter à 50 liens
  }
  
  private static extractImages(): Array<{ src: string; alt: string }> {
    const images: Array<{ src: string; alt: string }> = [];
    const imgs = document.querySelectorAll('img[src]');
    
    imgs.forEach(img => {
      const src = img.getAttribute('src') || '';
      const alt = img.getAttribute('alt') || '';
      
      if (src.startsWith('http')) {
        images.push({ src, alt });
      }
    });
    
    return images.slice(0, 20); // Limiter à 20 images
  }
  
  private static getSelectedText(): string | undefined {
    const selection = window.getSelection();
    return selection?.toString().trim() || undefined;
  }
}
```

### Page Analyzer

```typescript
// content/page-analyzer.ts
export interface PageAnalysis {
  type: 'article' | 'product' | 'documentation' | 'social' | 'other';
  language: string;
  readingTime: number; // minutes
  wordCount: number;
  sentiment?: 'positive' | 'negative' | 'neutral';
  topics: string[];
}

export class PageAnalyzer {
  /**
   * Analyse le type et le contenu de la page
   */
  static analyze(context: PageContext): PageAnalysis {
    return {
      type: this.detectPageType(context),
      language: this.detectLanguage(context),
      readingTime: this.calculateReadingTime(context),
      wordCount: this.countWords(context),
      topics: this.extractTopics(context),
    };
  }
  
  private static detectPageType(context: PageContext): PageAnalysis['type'] {
    const url = context.url.toLowerCase();
    const content = context.content.toLowerCase();
    
    // Product page
    if (url.includes('/product/') || url.includes('/shop/') || content.includes('price')) {
      return 'product';
    }
    
    // Documentation
    if (url.includes('/docs/') || url.includes('/guide/') || content.includes('api')) {
      return 'documentation';
    }
    
    // Social media
    if (url.includes('twitter.com') || url.includes('facebook.com') || url.includes('linkedin.com')) {
      return 'social';
    }
    
    // Article
    if (context.metadata['article:published_time']) {
      return 'article';
    }
    
    return 'other';
  }
  
  private static detectLanguage(context: PageContext): string {
    return document.documentElement.lang || 'en';
  }
  
  private static calculateReadingTime(context: PageContext): number {
    const words = context.content.split(/\s+/).length;
    return Math.ceil(words / 200); // 200 mots/minute
  }
  
  private static countWords(context: PageContext): number {
    return context.content.split(/\s+/).length;
  }
  
  private static extractTopics(context: PageContext): string[] {
    // Extraction simple de mots-clés
    const words = context.content.toLowerCase().split(/\s+/);
    const wordFreq: Record<string, number> = {};
    
    words.forEach(word => {
      if (word.length > 4) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });
    
    return Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
  }
}
```

---

## 🌉 Bridge Protocol

### Nexus Bridge

```typescript
// background/nexus-bridge.ts
import { PageContext } from '../content/context-extractor';

export interface BridgeMessage {
  type: 'CONTEXT_UPDATE' | 'WORKFLOW_REQUEST' | 'WORKFLOW_RESPONSE';
  payload: any;
  timestamp: number;
}

export class NexusBridge {
  private nexusUrl: string;
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  
  constructor(nexusUrl: string) {
    this.nexusUrl = nexusUrl;
  }
  
  /**
   * Connecte au Nexus local
   */
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.nexusUrl);
        
        this.ws.onopen = () => {
          console.log('Connected to Nexus');
          this.reconnectAttempts = 0;
          resolve();
        };
        
        this.ws.onclose = () => {
          console.log('Disconnected from Nexus');
          this.attemptReconnect();
        };
        
        this.ws.onerror = (error) => {
          console.error('Nexus connection error:', error);
          reject(error);
        };
        
        this.ws.onmessage = (event) => {
          this.handleMessage(JSON.parse(event.data));
        };
      } catch (error) {
        reject(error);
      }
    });
  }
  
  /**
   * Envoie le contexte de la page au Nexus
   */
  async sendContext(context: PageContext): Promise<void> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      await this.connect();
    }
    
    const message: BridgeMessage = {
      type: 'CONTEXT_UPDATE',
      payload: context,
      timestamp: Date.now(),
    };
    
    this.ws?.send(JSON.stringify(message));
  }
  
  /**
   * Demande l'exécution d'un workflow
   */
  async requestWorkflow(workflowId: string, input: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const message: BridgeMessage = {
        type: 'WORKFLOW_REQUEST',
        payload: { workflowId, input },
        timestamp: Date.now(),
      };
      
      const timeout = setTimeout(() => {
        reject(new Error('Workflow timeout'));
      }, 30000);
      
      this.ws?.send(JSON.stringify(message));
      
      // Attendre la réponse
      const responseHandler = (event: MessageEvent) => {
        const response = JSON.parse(event.data);
        if (response.type === 'WORKFLOW_RESPONSE') {
          clearTimeout(timeout);
          resolve(response.payload);
        }
      };
      
      this.ws?.addEventListener('message', responseHandler, { once: true });
    });
  }
  
  private async attemptReconnect(): Promise<void> {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.pow(2, this.reconnectAttempts) * 1000;
      
      setTimeout(() => {
        console.log(`Reconnecting to Nexus (attempt ${this.reconnectAttempts})`);
        this.connect();
      }, delay);
    }
  }
  
  private handleMessage(message: BridgeMessage): void {
    console.log('Received from Nexus:', message);
    // Handle incoming messages
  }
}
```

---

## 🎨 Popup UI

### Popup Component

```tsx
// popup/App.tsx
import { useState, useEffect } from 'react';
import { StatusIndicator } from './components/status-indicator';
import { QuickActions } from './components/quick-actions';
import { ContextPreview } from './components/context-preview';

export function App() {
  const [connected, setConnected] = useState(false);
  const [context, setContext] = useState<any>(null);
  
  useEffect(() => {
    // Check connection status
    chrome.runtime.sendMessage({ type: 'GET_STATUS' }, (response) => {
      setConnected(response.connected);
    });
    
    // Get current page context
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, { type: 'GET_CONTEXT' }, (response) => {
        setContext(response.context);
      });
    });
  }, []);
  
  return (
    <div className="w-80 p-4">
      <header className="mb-4">
        <h1 className="text-lg font-bold">Genesis AI</h1>
        <StatusIndicator connected={connected} />
      </header>
      
      {context && (
        <ContextPreview context={context} />
      )}
      
      <QuickActions />
      
      <footer className="mt-4 text-xs text-gray-500">
        Press Ctrl+Shift+G to open
      </footer>
    </div>
  );
}
```

---

## 📋 Configuration

### package.json

```json
{
  "name": "genesis-extension",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/chrome": "^0.0.254",
    "@types/react": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^7.3.1",
    "typescript": "^5.3.0"
  }
}
```

---

**Version :** 1.0.0  
**Dernière mise à jour :** 28 Mars 2026  
**Statut :** ✅ Documentation Complète
