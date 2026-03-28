---
sidebar_position: 1
---

# Genesis Desktop - Documentation Complète

**Genesis Desktop** est l'application desktop principale de Genesis AI, construite avec Electron, Vite et React 19, offrant une interface glassmorphism premium avec Nexus embarqué.

---

## 📊 Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| **Fichiers TypeScript** | 100+ fichiers |
| **Composants React** | 50+ composants |
| **Composants Radix UI** | 11 composants |
| **Intégrations 3D** | Spline Runtime |
| **Port de développement** | 5173 |
| **Framework** | Electron 40+ |

---

## 🏗️ Architecture Détaillée

### Structure du Projet

```
genesis-desktop/
├── dist/                           # Build de production
├── dist-electron/                  # Build Electron
├── electron/                       # Code Electron
│   ├── main/
│   │   ├── index.ts                # Processus principal
│   │   ├── window-manager.ts       # Gestion des fenêtres
│   │   ├── ipc-handlers.ts         # Handlers IPC
│   │   ├── menu.ts                 # Menu application
│   │   ├── tray.ts                 # Tray icon
│   │   ├── auto-updater.ts         # Mises à jour auto
│   │   └── protocol.ts             # Custom protocol
│   │
│   ├── preload/
│   │   ├── index.ts                # Preload script
│   │   └── api.ts                  # API exposée au renderer
│   │
│   └── utils/
│       ├── paths.ts                # Gestion des chemins
│       └── security.ts             # Security helpers
│
├── resources/                      # Assets
│   ├── icons/
│   │   ├── icon.icns               # macOS icon
│   │   ├── icon.ico                # Windows icon
│   │   └── icon.png                # Linux icon
│   └── splash.html                 # Splash screen
│
├── scripts/
│   ├── notarize.js                 # Notarization macOS
│   └── sign.js                     # Code signing
│
├── src/                            # Code React (Renderer)
│   ├── components/
│   │   ├── ui/                     # Composants UI de base
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/                 # Composants de layout
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── grid.tsx
│   │   │
│   │   ├── workflow/               # Composants Workflow
│   │   │   ├── workflow-list.tsx
│   │   │   ├── workflow-editor.tsx
│   │   │   ├── workflow-canvas.tsx
│   │   │   ├── node-palette.tsx
│   │   │   ├── node-renderer.tsx
│   │   │   └── edge-renderer.tsx
│   │   │
│   │   ├── agent/                  # Composants Agent
│   │   │   ├── agent-list.tsx
│   │   │   ├── agent-card.tsx
│   │   │   ├── agent-config.tsx
│   │   │   └── agent-status.tsx
│   │   │
│   │   ├── chat/                   # Composants Chat
│   │   │   ├── chat-window.tsx
│   │   │   ├── message-bubble.tsx
│   │   │   ├── message-input.tsx
│   │   │   └── typing-indicator.tsx
│   │   │
│   │   ├── dashboard/              # Composants Dashboard
│   │   │   ├── stats-cards.tsx
│   │   │   ├── activity-chart.tsx
│   │   │   ├── recent-workflows.tsx
│   │   │   └── system-health.tsx
│   │   │
│   │   ├── settings/               # Composants Settings
│   │   │   ├── general-settings.tsx
│   │   │   ├── agent-settings.tsx
│   │   │   ├── security-settings.tsx
│   │   │   └── appearance-settings.tsx
│   │   │
│   │   └── 3d/                     # Composants 3D
│   │       ├── spline-scene.tsx
│   │       ├── model-loader.tsx
│   │       └── interactive-object.tsx
│   │
│   ├── hooks/                      # Hooks React personnalisés
│   │   ├── use-nexus.ts            # Hook Nexus
│   │   ├── use-workflow.ts         # Hook Workflow
│   │   ├── use-agent.ts            # Hook Agent
│   │   ├── use-chat.ts             # Hook Chat
│   │   ├── use-settings.ts         # Hook Settings
│   │   ├── use-theme.ts            # Hook Theme
│   │   └── use-toast.ts            # Hook Toast notifications
│   │
│   ├── main/                       # Application principale
│   │   ├── App.tsx
│   │   └── routes.tsx
│   │
│   ├── renderer/                   # Pages/Views
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │
│   │   ├── workflows/
│   │   │   ├── page.tsx
│   │   │   ├── list.tsx
│   │   │   ├── editor.tsx
│   │   │   └── detail.tsx
│   │   │
│   │   ├── agents/
│   │   │   ├── page.tsx
│   │   │   ├── marketplace.tsx
│   │   │   └── detail.tsx
│   │   │
│   │   ├── chat/
│   │   │   ├── page.tsx
│   │   │   └── conversation.tsx
│   │   │
│   │   ├── settings/
│   │   │   ├── page.tsx
│   │   │   └── tabs/
│   │   │
│   │   └── about/
│   │       └── page.tsx
│   │
│   ├── store/                      # State Management (Zustand)
│   │   ├── index.ts
│   │   ├── workflow-store.ts
│   │   ├── agent-store.ts
│   │   ├── chat-store.ts
│   │   ├── settings-store.ts
│   │   └── ui-store.ts
│   │
│   ├── styles/                     # Styles globaux
│   │   ├── globals.css
│   │   ├── glassmorphism.css
│   │   └── animations.css
│   │
│   ├── types/                      # Types TypeScript
│   │   ├── workflow.ts
│   │   ├── agent.ts
│   │   ├── chat.ts
│   │   ├── settings.ts
│   │   └── api.ts
│   │
│   ├── utils/                      # Utilitaires
│   │   ├── cn.ts                   # Classnames helper
│   │   ├── format.ts               # Format helpers
│   │   ├── validators.ts           # Validation schemas
│   │   └── constants.ts
│   │
│   └── lib/                        # Bibliothèques externes
│       ├── radix.ts
│       └── spline.ts
│
├── tests/                          # Tests
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example                    # Variables d'environnement
├── electron-builder.yml            # Configuration Electron Builder
├── entitlements.mac.plist          # Entitlements macOS
├── index.html                      # HTML principal
├── package.json                    # Dépendances
├── pnpm-lock.yaml
├── postcss.config.js               # Configuration PostCSS
├── tailwind.config.js              # Configuration Tailwind
├── tsconfig.json                   # Configuration TypeScript
├── tsconfig.node.json              # TS config Node
├── vite.config.ts                  # Configuration Vite
└── vitest.config.ts                # Configuration Vitest
```

---

## 🎨 Design System Glassmorphism

### Tokens de Design

```typescript
// src/styles/glassmorphism.css
:root {
  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-bg-hover: rgba(255, 255, 255, 0.15);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-border-hover: rgba(255, 255, 255, 0.3);
  --glass-blur: 20px;
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  /* Brand Colors */
  --brand-primary: #3B82F6;
  --brand-secondary: #8B5CF6;
  --brand-accent: #06B6D4;
  --brand-success: #10B981;
  --brand-warning: #F59E0B;
  --brand-error: #EF4444;
  
  /* Semantic Colors */
  --bg-primary: #0F172A;
  --bg-secondary: #1E293B;
  --bg-tertiary: #334155;
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
  
  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Animations */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}
```

### Composants Glassmorphism

```tsx
// src/components/ui/glass-card.tsx
import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'danger';
  intensity?: 'low' | 'medium' | 'high';
  hover?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', intensity = 'medium', hover = false, ...props }, ref) => {
    const variants = {
      default: 'bg-glass-default',
      primary: 'bg-glass-primary',
      secondary: 'bg-glass-secondary',
      danger: 'bg-glass-danger',
    };
    
    const intensities = {
      low: 'backdrop-blur-sm',
      medium: 'backdrop-blur-md',
      high: 'backdrop-blur-lg',
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'relative overflow-hidden rounded-xl border',
          
          // Glassmorphism
          variants[variant],
          intensities[intensity],
          'border-white/20',
          'shadow-glass',
          
          // Hover effect
          hover && 'transition-all duration-300 hover:bg-glass-hover hover:border-white/30',
          
          className
        )}
        {...props}
      />
    );
  }
);
```

```tsx
// src/components/ui/glass-button.tsx
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-glass-default hover:bg-glass-hover border border-white/20',
        primary: 'bg-brand-primary/80 hover:bg-brand-primary text-white',
        secondary: 'bg-brand-secondary/80 hover:bg-brand-secondary text-white',
        ghost: 'hover:bg-glass-hover',
        link: 'text-brand-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant, size, isLoading, loadingText, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {loadingText || children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
```

---

## 🔌 Electron Main Process

### Main Entry Point

```typescript
// electron/main/index.ts
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { setupIpcHandlers } from './ipc-handlers';
import { createWindow } from './window-manager';
import { setupMenu } from './menu';
import { setupTray } from './tray';
import { setupAutoUpdater } from './auto-updater';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Disable GPU acceleration for better performance
app.disableHardwareAcceleration();

// Single instance lock
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    const windows = BrowserWindow.getAllWindows();
    if (windows.length > 0) {
      if (windows[0].isMinimized()) windows[0].restore();
      windows[0].focus();
    }
  });
}

// Lifecycle
app.whenReady().then(async () => {
  // Create main window
  const mainWindow = await createWindow();
  
  // Setup IPC handlers
  setupIpcHandlers(mainWindow);
  
  // Setup menu
  setupMenu();
  
  // Setup tray icon
  setupTray(mainWindow);
  
  // Setup auto-updater
  setupAutoUpdater();
  
  // Open devtools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
});

// Security
app.on('web-contents-created', (event, contents) => {
  // Prevent navigation to unknown URLs
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    if (parsedUrl.origin !== 'http://localhost:5173') {
      event.preventDefault();
    }
  });
  
  // Prevent new window creation
  contents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });
});
```

### IPC Handlers

```typescript
// electron/main/ipc-handlers.ts
import { ipcMain, BrowserWindow, dialog, shell } from 'electron';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

export function setupIpcHandlers(mainWindow: BrowserWindow) {
  // File system operations
  ipcMain.handle('file:open', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [
        { name: 'All Files', extensions: ['*'] },
        { name: 'JSON', extensions: ['json'] },
        { name: 'YAML', extensions: ['yml', 'yaml'] },
      ],
    });
    
    if (!result.canceled && result.filePaths.length > 0) {
      const content = readFileSync(result.filePaths[0], 'utf-8');
      return { path: result.filePaths[0], content };
    }
    
    return null;
  });
  
  ipcMain.handle('file:save', async (event, { path, content }) => {
    try {
      writeFileSync(path, content, 'utf-8');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  
  // Open external URLs
  ipcMain.handle('shell:open-external', async (event, url) => {
    await shell.openExternal(url);
    return true;
  });
  
  // Show item in folder
  ipcMain.handle('shell:show-in-folder', async (event, path) => {
    shell.showItemInFolder(path);
    return true;
  });
  
  // App version
  ipcMain.handle('app:version', () => {
    return app.getVersion();
  });
  
  // App paths
  ipcMain.handle('app:paths', () => {
    return {
      userData: app.getPath('userData'),
      temp: app.getPath('temp'),
      downloads: app.getPath('downloads'),
      documents: app.getPath('documents'),
    };
  });
  
  // Notifications
  ipcMain.handle('notification:show', async (event, options) => {
    const notification = new Notification({
      title: options.title,
      body: options.body,
      icon: options.icon,
    });
    
    notification.show();
    return true;
  });
}
```

### Window Manager

```typescript
// electron/main/window-manager.ts
import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { join } from 'path';

let mainWindow: BrowserWindow | null = null;

export async function createWindow(): Promise<BrowserWindow> {
  const options: BrowserWindowConstructorOptions = {
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    
    // Frameless window for custom UI
    frame: false,
    transparent: true,
    
    // Vibrancy for macOS
    vibrancy: 'under-window',
    visualEffectState: 'active',
    
    // Background material for Windows 11
    backgroundMaterial: 'mica',
    
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: process.env.NODE_ENV === 'production',
    },
  };
  
  mainWindow = new BrowserWindow(options);
  
  // Load app
  if (process.env.NODE_ENV === 'development') {
    await mainWindow.loadURL('http://localhost:5173');
  } else {
    await mainWindow.loadFile(join(__dirname, '../dist/index.html'));
  }
  
  // Window state management
  mainWindow.on('close', () => {
    // Save window state
    const bounds = mainWindow.getBounds();
    // Save to config file
  });
  
  return mainWindow;
}

export function getMainWindow(): BrowserWindow | null {
  return mainWindow;
}
```

---

## 📦 Configuration

### electron-builder.yml

```yaml
appId: ai.genesis.desktop
productName: Genesis AI
copyright: Copyright © 2026 Genesis AI

directories:
  output: dist
  buildResources: resources

files:
  - dist-electron
  - dist
  - resources

mac:
  category: public.app-category.productivity
  icon: resources/icons/icon.icns
  target:
    - target: dmg
      arch:
        - x64
        - arm64
  entitlements: entitlements.mac.plist
  entitlementsInherit: entitlements.mac.plist
  hardenedRuntime: true
  gatekeeperAssess: false
  notarize: true
  darkModeSupport: true

win:
  icon: resources/icons/icon.ico
  target:
    - target: nsis
      arch:
        - x64
    - target: portable
  artifactName: ${productName}-${version}-Setup.${ext}

nsis:
  oneClick: false
  allowToChangeInstallationDirectory: true
  createDesktopShortcut: true
  createStartMenuShortcut: true

linux:
  icon: resources/icons
  category: Utility
  target:
    - target: AppImage
      arch:
        - x64
    - target: deb
  artifactName: ${productName}-${version}.${ext}

publish:
  provider: github
  owner: genesisAI4
  repo: genesis-desktop
  releaseType: release
```

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV === 'development',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 5173,
  },
});
```

### package.json

```json
{
  "name": "genesis-desktop",
  "version": "1.5.0",
  "description": "Genesis AI Desktop Application",
  "main": "dist-electron/main/index.js",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build && tsc -p tsconfig.node.json && electron-builder",
    "preview": "vite preview",
    "electron:dev": "concurrently \"vite\" \"wait-on http://localhost:5173 && electron .\"",
    "electron:build": "vite build && tsc -p tsconfig.node.json && electron-builder",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint . --ext .ts,.tsx"
  },
  "dependencies": {
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-separator": "^1.2.8",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@splinetool/react-spline": "^4.1.0",
    "@splinetool/runtime": "^1.12.69",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.0",
    "electron-store": "^11.0.2",
    "electron-updater": "^6.8.3",
    "framer-motion": "^11.0.3",
    "i18next": "^25.8.18",
    "lucide-react": "^0.323.0",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-i18next": "^16.5.8",
    "react-markdown": "^10.1.0",
    "react-router-dom": "^7.13.1",
    "react-syntax-highlighter": "^16.1.1",
    "sonner": "^2.0.7",
    "tailwind-merge": "^2.2.1",
    "tailwindcss-animate": "^1.0.7",
    "ws": "^8.19.0",
    "zustand": "^4.4.7"
  },
  "devDependencies": {
    "@electron/notarize": "^2.3.0",
    "@playwright/test": "^1.40.0",
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/ws": "^8.5.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.17",
    "concurrently": "^8.2.0",
    "electron": "^40.6.0",
    "electron-builder": "^26.8.1",
    "eslint": "^8.55.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.0",
    "vite": "^7.3.1",
    "vite-plugin-electron": "^0.29.0",
    "vite-plugin-electron-renderer": "^0.14.6",
    "vitest": "^1.0.0",
    "wait-on": "^7.2.0"
  }
}
```

---

## 🔐 Security

### Preload Script

```typescript
// electron/preload/index.ts
import { contextBridge, ipcRenderer } from 'electron';

// API sécurisée exposée au renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // File system
  openFileDialog: () => ipcRenderer.invoke('file:open'),
  saveFile: (path: string, content: string) => 
    ipcRenderer.invoke('file:save', { path, content }),
  
  // Shell
  openExternal: (url: string) => ipcRenderer.invoke('shell:open-external', url),
  showInFolder: (path: string) => ipcRenderer.invoke('shell:show-in-folder', path),
  
  // App
  getVersion: () => ipcRenderer.invoke('app:version'),
  getPaths: () => ipcRenderer.invoke('app:paths'),
  
  // Notifications
  showNotification: (options: { title: string; body: string; icon?: string }) =>
    ipcRenderer.invoke('notification:show', options),
  
  // Platform
  platform: process.platform,
  
  // Versions
  versions: process.versions,
});
```

---

**Version :** 1.0.0  
**Dernière mise à jour :** 28 Mars 2026  
**Statut :** ✅ Documentation Complète
