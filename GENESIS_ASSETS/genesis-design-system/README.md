# 🪐 Genesis Design System

> Complete design system for the Genesis AI ecosystem — reusable across Nexus, Aion, Desktop, Mobile, Extensions, and all future projects.

## 📁 Structure

```
genesis-design-system/
├── genesis-design.css       # Main entry (imports all below)
├── tokens.css               # CSS custom properties (colors, spacing, typography, shadows)
├── components.css           # Reusable component classes (panels, buttons, badges, inputs, layout)
├── branding.css             # Logo, mascot, splash screen, watermark, spinner styles
├── README.md                # This file
└── assets/
    ├── logos/               # SVG + PNG logos (6 variants)
    │   ├── genesis-logo-fullcolor.svg
    │   ├── genesis-logo-monochrome.svg
    │   ├── genesis-logo-icon.svg
    │   ├── genesis-logo-minimal.svg
    │   ├── genesis-logo-white.svg
    │   ├── genesis-logo-amber.svg
    │   └── genesis-logo-*512px.png (6 variants)
    ├── favicons/            # All favicon sizes
    │   ├── favicon-16x16.png
    │   ├── favicon-32x32.png
    │   ├── favicon-64x64.png
    │   ├── favicon-128x128.png
    │   ├── favicon-256x256.png
    │   └── favicon-512x512.png
    └── mascotte/            # Guardian mascot HTML renders
        ├── GENESIS_SPLASHSCREEN_v2.html
        ├── NEXUS_GUARDIAN_STATIC.html
        ├── POLY_GUARDIAN_CHARACTER_COMPLETE.html
        └── POLY_GUARDIAN_FINAL.html
```

## 🎨 Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--genesis-obsidian` | `#09090B` | Primary background |
| `--genesis-obsidian-alt` | `#0F0F12` | Panel/card background |
| `--genesis-neon` | `#3B82F6` | Primary accent (Cognitive Neon) |
| `--genesis-neon-glow` | `rgba(59,130,246,0.15)` | Soft neon glow effect |
| `--genesis-titanium` | `#E4E4E7` | Light text on dark |
| `--genesis-zinc` | `#737373` | Muted text |
| `--genesis-white` | `#FFFFFF` | Primary text |
| `--genesis-border` | `#27272A` | Borders |
| `--genesis-success` | `#22C55E` | Online/healthy status |
| `--genesis-warning` | `#F59E0B` | Degraded/attention |
| `--genesis-error` | `#EF4444` | Offline/error |
| `--genesis-info` | `#06B6D4` | Info/neutral |

## 🚀 Usage

### Web (HTML/CSS)

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Genesis — My App</title>
  <link rel="icon" type="image/png" sizes="32x32" href="genesis-design-system/assets/favicons/favicon-32x32.png">
  <link rel="stylesheet" href="genesis-design-system/genesis-design.css">
</head>
<body class="genesis-body">
  <header class="genesis-header">
    <a class="genesis-brand" href="/">
      <img class="genesis-logo genesis-logo--md genesis-logo--fullcolor"
           src="genesis-design-system/assets/logos/genesis-logo-fullcolor.svg"
           alt="Genesis">
      <span class="genesis-brand__name">GENESIS</span>
    </a>
  </header>
  <main class="genesis-container genesis-stack genesis-gap-6">
    <div class="genesis-panel genesis-panel--glow genesis-p-6">
      <h1 class="genesis-heading genesis-heading--lg">Welcome</h1>
      <p class="genesis-text--muted">Powered by Genesis Design System</p>
    </div>
  </main>
</body>
</html>
```

### React / Next.js

```tsx
// _app.tsx or layout.tsx
import '../genesis-design-system/genesis-design.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="genesis-body">
        {children}
      </body>
    </html>
  );
}

// Component usage
export function StatusBadge({ status }: { status: 'online' | 'degraded' | 'offline' }) {
  return (
    <span className={`genesis-badge genesis-badge--${status}`}>
      <span className="genesis-badge__dot" />
      {status}
    </span>
  );
}
```

### Electron (Main process)

```javascript
// Use the design system for your splash screen
const splash = new BrowserWindow({
  width: 800,
  height: 600,
  frame: false,
  transparent: true,
  alwaysOnTop: true,
  webPreferences: { nodeIntegration: true },
});

splash.loadFile('genesis-design-system/assets/mascotte/GENESIS_SPLASHSCREEN_v2.html');
```

### React Native / Expo

```tsx
// Map CSS tokens to React Native StyleSheet
import { StyleSheet } from 'react-native';

const genesisTokens = {
  obsidian: '#09090B',
  neon: '#3B82F6',
  white: '#FFFFFF',
  zinc: '#737373',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: genesisTokens.obsidian,
  },
  accentText: {
    color: genesisTokens.neon,
    fontFamily: 'Space Grotesk',
  },
});
```

## 🏗️ Components

### Panels
```html
<div class="genesis-panel genesis-panel--glow">
  <!-- Card with glowing border -->
</div>
```

### Buttons
```html
<button class="genesis-btn genesis-btn--primary">Primary</button>
<button class="genesis-btn genesis-btn--secondary">Secondary</button>
<button class="genesis-btn genesis-btn--ghost">Ghost</button>
```

### Status Badges
```html
<span class="genesis-badge genesis-badge--online">
  <span class="genesis-badge__dot"></span> Online
</span>
```

### Metrics
```html
<div class="genesis-metric">
  <span class="genesis-metric__value">1,234</span>
  <span class="genesis-metric__label">Requests</span>
</div>
```

## 🎭 Branding

### Logos
- **Full Color**: Default usage on dark backgrounds
- **Monochrome**: Print, B&W documents
- **Icon**: Favicons, app icons, restricted spaces
- **Minimal**: Watermarks, loading spinners
- **White**: Video overlays, very dark backgrounds
- **Amber**: Genesis Capital (FinTech variant)

### Guardian Mascot
The Guardian is Genesis's visual identity character. Use it:
- **Splash screens** → `assets/mascotte/GENESIS_SPLASHSCREEN_v2.html`
- **About pages** → `assets/mascotte/NEXUS_GUARDIAN_STATIC.html`
- **Loading states** → Inline with `.genesis-guardian` class

## 📱 Responsive

All components use relative units (`rem`) and CSS custom properties. Override tokens for custom breakpoints:

```css
@media (max-width: 768px) {
  :root {
    --genesis-sidebar-width: 200px;
    --genesis-max-width: 100%;
  }
}
```

## 📄 License

Internal use only — Genesis AI ecosystem projects.

---

*Version 1.0.0 — April 2026*
*🪐 Built for Genesis AI*
