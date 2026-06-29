# Usage of Reicon Svelte

The official Svelte package for Reicon. Import beautifully crafted icons as Svelte components with full TypeScript support. All icons are tree-shakeable, ensuring only the icons you actually use end up in your bundle.

## What you can accomplish
- Import icons as individual Svelte components
- Customize size, color, and weight via props
- Tree-shake unused icons to keep bundle sizes minimal
- Full TypeScript support with autocompletion
- Use icons in SvelteKit, Vite, and more
- Apply CSS classes and inline styles directly

---

## Installation
```bash
npm install reicon-svelte
# or
yarn add reicon-svelte
# or
pnpm add reicon-svelte
```

---

## Basic Usage
Import icons by their PascalCase name from `reicon-svelte`. Each icon is a Svelte component that accepts standard props.
```svelte
<script>
  import { Home, ShieldCheck, Bell } from 'reicon-svelte';
</script>

<Home size={24} />
<ShieldCheck size={24} color="#6C5CE7" />
<Bell size={24} weight="Filled" />
```

---

## Customizing Icons
Every icon component accepts the following props to customize its appearance. You can also pass any standard SVG attributes.
```svelte
<script>
  import { Home, Heart, Star } from 'reicon-svelte';
</script>

<!-- Size -->
<Home size={16} />
<Home size={24} />
<Home size={32} />

<!-- Color -->
<Heart color="#ef4444" />
<Heart color="rgb(99, 102, 241)" />

<!-- Weight -->
<Star />                       <!-- Outline (default) -->
<Star weight="Filled" />       <!-- Filled -->

<!-- Class -->
<Home class="my-icon" />
```

---

## Direct Import for Smaller Bundles
For the absolute smallest bundle size, import each icon directly from its own module. This guarantees only that single icon's code is included.
```javascript
import Home from 'reicon-svelte/icons/Home.svelte';
import ShieldCheck from 'reicon-svelte/icons/ShieldCheck.svelte';
```
> **Tip:** Direct imports are recommended for production apps where bundle size matters.

---

## Using with Tailwind CSS
Reicon works seamlessly with Tailwind CSS. The icon inherits `currentColor` by default, so Tailwind's text color classes work out of the box.
```svelte
<script>
  import { Home, ShieldCheck } from 'reicon-svelte';
</script>

<Home class="text-gray-500 hover:text-gray-700 transition-colors" />

<button class="flex items-center gap-2 text-white">
  <ShieldCheck size={20} class="text-green-500" />
  Verified
</button>
```

---

## SvelteKit
Works out of the box with SvelteKit — just import and use. No plugins or configuration needed.
```svelte
<!-- src/routes/+page.svelte -->
<script>
  import { Home, User } from 'reicon-svelte';
</script>

<nav>
  <Home size={24} />
  <User size={24} />
</nav>
```

---

## Full Component Example
Here's a complete example of a Svelte component using multiple Reicon icons with different configurations.
```svelte
<script>
  import { Home, Bell, User, Star, ShieldCheck } from 'reicon-svelte';
</script>

<nav class="flex items-center gap-4 p-4">
  <Home size={20} />
  <Bell size={20} />
  <User size={20} />
  <Star size={20} weight="Filled" color="#f59e0b" />
  <ShieldCheck size={20} color="#6C5CE7" />
</nav>
```

> **Note:** All icon components are SSR-compatible and work with SvelteKit out of the box.
