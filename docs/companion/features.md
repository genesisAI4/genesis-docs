---
sidebar_position: 3
---

# Companion - Features

Documentation des fonctionnalités.

---

## 🎯 Fonctionnalités principales

### Always-on-top

```typescript
// src/main/companion-window.ts
companionWindow = new BrowserWindow({
  width: 400,
  height: 600,
  alwaysOnTop: true,
  skipTaskbar: true,
  frame: false,
  transparent: true,
});
```

### Tray Icon

```typescript
// src/main/tray-manager.ts
const tray = new Tray(icon);

const contextMenu = Menu.buildFromTemplate([
  { label: 'Open', click: () => window.show() },
  { label: 'Quick Action 1' },
  { label: 'Quick Action 2' },
  { type: 'separator' },
  { label: 'Quit', click: () => app.quit() },
]);

tray.setContextMenu(contextMenu);
```

### Quick Actions

```typescript
// Quick Action 1: Capture screen
async function captureScreen() {
  const display = screen.getPrimaryDisplay();
  const image = await captureRegion(display.bounds);
  clipboard.writeImage(image);
}

// Quick Action 2: Note rapide
async function quickNote() {
  const note = await showInputDialog();
  await saveNote(note);
}
```

---

## 🎨 UI Components

### Companion Card

```tsx
export function CompanionCard({ title, children }) {
  return (
    <div className="glass-card p-3 rounded-lg">
      <h3 className="text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}
```

### Status Indicator

```tsx
export function StatusIndicator({ connected }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
      <span className="text-xs">{connected ? 'Connected' : 'Disconnected'}</span>
    </div>
  );
}
```

---

**Version :** 1.0.0
