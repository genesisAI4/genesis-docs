---
sidebar_position: 3
---

# Desktop Apps - Glassmorphism UI

Documentation du design system glassmorphism.

---

## 🎨 Design Tokens

```css
:root {
  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-bg-hover: rgba(255, 255, 255, 0.15);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-blur: 20px;
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  /* Brand Colors */
  --brand-primary: #3B82F6;
  --brand-secondary: #8B5CF6;
  --brand-accent: #06B6D4;
  
  /* Typography */
  --font-family: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## 🧩 Composants

### GlassCard

```tsx
// src/components/ui/glass-card.tsx
interface GlassCardProps {
  variant?: 'default' | 'primary' | 'secondary' | 'danger';
  intensity?: 'low' | 'medium' | 'high';
  hover?: boolean;
}

export const GlassCard = styled('div', {
  // Glassmorphism
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  
  // Variants
  variants: {
    variant: {
      default: { background: 'rgba(255, 255, 255, 0.1)' },
      primary: { background: 'rgba(59, 130, 246, 0.2)' },
      danger: { background: 'rgba(239, 68, 68, 0.2)' },
    },
  },
});
```

### GlassButton

```tsx
export const GlassButton = styled('button', {
  // Base
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  fontWeight: '500',
  transition: 'all 0.3s ease',
  
  // Glassmorphism
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  
  // Hover
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-2px)',
  },
  
  // Active
  '&:active': {
    transform: 'translateY(0)',
  },
});
```

---

## 🎭 Animations

```css
@keyframes glass-shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.glass-shimmer {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  background-size: 1000px 100%;
  animation: glass-shimmer 2s infinite;
}
```

---

## 📐 Layout

```tsx
// Grid layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <GlassCard>Card 1</GlassCard>
  <GlassCard>Card 2</GlassCard>
  <GlassCard>Card 3</GlassCard>
</div>
```

---

**Version :** 1.0.0
