---
sidebar_position: 1
---

# Genesis Companion - Documentation Complète

**Genesis Companion** est l'application desktop secondaire de Genesis AI, une interface légère toujours-visible pour un accès rapide aux fonctionnalités principales.

---

## 📊 Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| **Fichiers TypeScript** | 20+ fichiers |
| **Type** | Electron Agent Window |
| **Mode** | Always-on-top |
| **Intégration** | Tray icon |
| **Port** | 5174 |

---

## 🏗️ Architecture

### Structure du Projet

```
genesis-companion/
├── build/                        # Build outputs
├── src/
│   └── main/
│       ├── index.ts              # Entry point
│       ├── companion-window.ts   # Fenêtre companion
│       ├── tray-manager.ts       # Gestion tray
│       └── quick-actions.ts      # Actions rapides
├── electron-builder.json
├── package.json
├── tsconfig.json
└── README.md
```

### Main Process

```typescript
// src/main/index.ts
import { app, BrowserWindow, Tray, Menu, nativeImage } from 'electron';
import { join } from 'path';

let companionWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

app.whenReady().then(() => {
  createCompanionWindow();
  createTray();
});

function createCompanionWindow() {
  companionWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    vibrancy: 'under-window',
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  
  if (process.env.NODE_ENV === 'development') {
    companionWindow.loadURL('http://localhost:5174');
  } else {
    companionWindow.loadFile(join(__dirname, '../dist/index.html'));
  }
}

function createTray() {
  const icon = nativeImage.createFromPath(
    join(__dirname, '../resources/tray-icon.png')
  );
  
  tray = new Tray(icon);
  
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open Companion', click: () => companionWindow?.show() },
    { label: 'Quick Action 1', click: handleQuickAction1 },
    { label: 'Quick Action 2', click: handleQuickAction2 },
    { type: 'separator' },
    { label: 'Settings', click: openSettings },
    { label: 'Quit', click: () => app.quit() },
  ]);
  
  tray.setContextMenu(contextMenu);
  tray.setToolTip('Genesis Companion');
  
  tray.on('double-click', () => {
    if (companionWindow?.isVisible()) {
      companionWindow.hide();
    } else {
      companionWindow?.show();
      companionWindow?.focus();
    }
  });
}

function handleQuickAction1() {
  // Action rapide 1
}

function handleQuickAction2() {
  // Action rapide 2
}

function openSettings() {
  // Ouvrir les paramètres
}
```

---

## 🎨 UI Companion

### Companion Window

```typescript
// src/main/companion-window.ts
interface CompanionWindowConfig {
  width: number;
  height: number;
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  alwaysOnTop: boolean;
}

export class CompanionWindow {
  private window: BrowserWindow | null = null;
  private config: CompanionWindowConfig = {
    width: 400,
    height: 600,
    position: 'top-right',
    alwaysOnTop: true,
  };
  
  create(): BrowserWindow {
    const { width, height } = this.config;
    const position = this.getPosition();
    
    this.window = new BrowserWindow({
      width,
      height,
      x: position.x,
      y: position.y,
      frame: false,
      transparent: true,
      alwaysOnTop: this.config.alwaysOnTop,
      skipTaskbar: true,
      webPreferences: {
        preload: join(__dirname, 'preload.js'),
        contextIsolation: true,
      },
    });
    
    this.setupListeners();
    
    return this.window;
  }
  
  private getPosition(): { x: number; y: number } {
    const { width, height, position } = this.config;
    const { screen } = require('electron');
    const primaryDisplay = screen.getPrimaryDisplay();
    const { workArea } = primaryDisplay;
    
    switch (position) {
      case 'top-right':
        return {
          x: workArea.x + workArea.width - width - 20,
          y: workArea.y + 20,
        };
      case 'top-left':
        return {
          x: workArea.x + 20,
          y: workArea.y + 20,
        };
      case 'bottom-right':
        return {
          x: workArea.x + workArea.width - width - 20,
          y: workArea.y + workArea.height - height - 20,
        };
      case 'bottom-left':
        return {
          x: workArea.x + 20,
          y: workArea.y + workArea.height - height - 20,
        };
      default:
        return { x: 0, y: 0 };
    }
  }
  
  private setupListeners() {
    if (!this.window) return;
    
    // Sauvegarder la position
    this.window.on('moved', () => {
      const bounds = this.window?.getBounds();
      // Save to config
    });
  }
}
```

---

## ⚡ Quick Actions

```typescript
// src/main/quick-actions.ts
import { clipboard, nativeImage, Notification } from 'electron';

export class QuickActions {
  // Copier du texte
  static copyText(text: string): void {
    clipboard.writeText(text);
    new Notification({
      title: 'Copied',
      body: 'Text copied to clipboard',
    }).show();
  }
  
  // Capture d'écran
  static async captureScreen(): Promise<string> {
    const { screen } = require('electron');
    const displays = screen.getAllDisplays();
    const primaryDisplay = screen.getPrimaryDisplay();
    
    // Capture logic
    return '';
  }
  
  // Recherche rapide
  static async quickSearch(query: string): Promise<any[]> {
    // Search logic
    return [];
  }
  
  // Note rapide
  static async quickNote(content: string): Promise<void> {
    // Save note logic
  }
}
```

---

## 📋 Configuration

### electron-builder.json

```json
{
  "appId": "ai.genesis.companion",
  "productName": "Genesis Companion",
  "directories": {
    "output": "build"
  },
  "files": [
    "dist/**/*",
    "resources/**/*"
  ],
  "mac": {
    "category": "public.app-category.utilities",
    "type": "agent"
  },
  "win": {
    "target": "portable"
  },
  "linux": {
    "target": "AppImage"
  }
}
```

### package.json

```json
{
  "name": "genesis-companion",
  "version": "1.0.0",
  "main": "dist/main/index.js",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build && electron-builder",
    "electron:dev": "concurrently \"vite\" \"wait-on http://localhost:5174 && electron .\""
  },
  "dependencies": {
    "electron-store": "^11.0.2"
  },
  "devDependencies": {
    "electron": "^40.6.0",
    "electron-builder": "^26.8.1",
    "vite": "^7.3.1"
  }
}
```

---

**Version :** 1.0.0  
**Dernière mise à jour :** 28 Mars 2026  
**Statut :** ✅ Documentation Complète
