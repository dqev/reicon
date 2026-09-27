# Styling & Color Guide

Reicon icons render as standard inline SVG elements that inherit parent styles, making them extremely customizable across framework environments. By default, icons inherit `currentColor` so they match surrounding text color.

---

### What You Can Accomplish
- Inherit parent text colors automatically using `currentColor`
- Pass custom hex, RGB, HSL, or CSS variable color strings
- Adjust stroke width thickness (`1.5` default, `1.0` thin, `2.5` bold)
- Style seamlessly with Tailwind CSS classes (`text-indigo-500`, `w-6`, `h-6`)
- Apply keyframe animations, hover transforms, and CSS transitions
- Toggle light and dark mode colors dynamically with CSS variables

---

### 1. Color Inheritance
With no `color` prop, icons inherit the text color of their parent element:

```jsx
<div style={{ color: "#9B8AFB" }}>
  <Home size={20} />       {/* Purple */}
  <Bell size={20} />        {/* Purple */}
</div>

<div style={{ color: "#ef4444" }}>
  <Heart size={20} />       {/* Red */}
</div>
```

---

### 2. Direct Color Props & Format Support
You can pass any valid CSS color string directly via the `color` prop:

```jsx
<Home color="#9B8AFB" size={24} />           {/* Hex */}
<Bell color="rgb(99, 102, 241)" size={24} />   {/* RGB */}
<User color="hsl(245, 82%, 67%)" size={24} />  {/* HSL */}
<Star color="var(--brand-primary)" size={24} />{/* CSS Variable */}
```

---

### 3. Stroke Width Customization
Adjust the thickness of outline icons using the `strokeWidth` prop. This overrides the default stroke width on stroked paths:

```jsx
<Home strokeWidth={1} size={24} />    {/* Thin (1.0px) */}
<Home strokeWidth={1.5} size={24} />  {/* Default (1.5px) */}
<Home strokeWidth={2.5} size={24} />  {/* Bold (2.5px) */}
```

---

### 4. Tailwind CSS Integration
Reicon components accept standard `className` props, allowing full utility class styling with Tailwind CSS:

```jsx
<Home className="w-6 h-6 text-indigo-500 hover:text-indigo-600 transition-colors" />

<Bell className="w-5 h-5 text-slate-400 dark:text-slate-200 hover:rotate-12 transition-transform" />
```

---

### 5. CSS Variables & Theme Switching
Easily manage dark mode and light mode color schemes using CSS custom properties:

```css
:root {
  --icon-primary: #1e293b;
  --icon-hover: #9B8AFB;
}

[data-theme='dark'] {
  --icon-primary: #f8fafc;
  --icon-hover: #a855f7;
}

.themed-icon {
  color: var(--icon-primary);
  transition: color 0.2s ease;
}

.themed-icon:hover {
  color: var(--icon-hover);
}
```

---

### 6. CSS Animations & Transitions
Apply keyframe animations, loading spinners, or hover effects directly:

```css
/* CSS Animation Keyframes */
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  50% { opacity: 0.5; }
}

.icon-spin { animation: spin 1s linear infinite; }
.icon-pulse { animation: pulse 2s ease-in-out infinite; }
```

```jsx
/* JSX Usage */
<Loader className="icon-spin" size={20} />
<Bell className="icon-pulse" size={20} />
```

---

### 7. Inline Styles & Dynamic State
The `style` prop merges directly with the SVG element's inline style attributes:

```jsx
<Heart
  size={24}
  style={{
    transition: "transform 0.2s ease",
    cursor: "pointer",
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
/>
```
