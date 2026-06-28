# 🎨 Reicon Design System

This document outlines the design system specifications used for the Reicon website and branding, including the color palette, typography scales, responsive breakpoints, and animations.

## Color Palette

```css
/* Primary Colors */
--bg-primary: #09090b;        /* Main background */
--bg-secondary: #0e0e10;      /* Card backgrounds */
--text-primary: #ffffff;      /* Primary text */
--text-secondary: rgba(255, 255, 255, 0.6);  /* Secondary text */
--text-tertiary: rgba(255, 255, 255, 0.45);  /* Tertiary text */

/* Accent Colors */
--accent-primary: #6C5CE7;    /* Purple accent */
--accent-hover: #5a4bd1;      /* Purple hover state */
--success: #7fff7f;           /* Success green */

/* Border & Overlay */
--border-subtle: rgba(255, 255, 255, 0.06);
--border-medium: rgba(255, 255, 255, 0.12);
--overlay-light: rgba(255, 255, 255, 0.04);
--overlay-medium: rgba(255, 255, 255, 0.08);
```

## Typography

```css
/* Font Family */
--font-sans: "DM Sans", sans-serif;
--font-serif: "DM Sans", sans-serif;  /* Used for headings with font-weight: 600 */

/* Font Sizes */
--text-xs: 11px;
--text-sm: 13px;
--text-base: 14px;
--text-md: 15px;
--text-lg: 18px;
--heading-sm: clamp(24px, 3.2vw, 42px);
--heading-md: clamp(26px, 3.6vw, 46px);
--heading-lg: clamp(30px, 6.2vw, 76px);

/* Font Weights */
--weight-normal: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

## Spacing Scale

```css
/* Spacing (based on 4px grid) */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-14: 56px;
--space-16: 64px;
```

## Border Radius

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 14px;
--radius-xl: 18px;
--radius-full: 9999px;
```

## Interactive Components

### Clay Button

A custom button component with a clay/neumorphic design:

```tsx
import ClayButton from './components/ClayButton';

// Variants: primary, secondary, accent
// Sizes: sm, md

<ClayButton variant="primary" size="md" to="/icons">
  Browse Icons
</ClayButton>
```

**Variants:**
- `primary` — White background, dark text
- `secondary` — Glass/transparent with border
- `accent` — Purple gradient background

### Icon Card

Displays individual icons with hover effects:

```tsx
import IconCard from './components/IconCard';

<IconCard 
  name="home" 
  weight="outline" 
  size={24} 
/>
```

### Feature Card

Displays feature information with icon:

```tsx
import FeatureCard from './components/FeatureCard';

<FeatureCard 
  icon={<Icon />}
  title="Pixel Perfect"
  description="Every icon snaps to a 24×24 grid"
/>
```

## Keyframe Animations

### Orbit Animation

Used for the icon showcase section:

```css
@keyframes orbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-orbit-slow { animation: orbit 60s linear infinite; }
.animate-orbit-mid { animation: orbit-reverse 80s linear infinite; }
.animate-orbit-fast { animation: orbit 100s linear infinite; }
```

### Marquee Animation

Used for scrolling icon rows:

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-marquee { animation: marquee linear infinite; }
```

### Fade Up Animation

Used for scroll-reveal sections:

```css
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.52s ease, transform 0.52s ease;
}

.revealed {
  opacity: 1;
  transform: none;
}
```

## Responsive Breakpoints

```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```
