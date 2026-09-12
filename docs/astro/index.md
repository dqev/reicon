# Using Reicon with Astro

The official Astro package for Reicon. Import handcrafted icons as Astro components (`.astro`) with full TypeScript support, tree-shaking, and zero dependencies. Works seamlessly in Astro SSG, SSR, and island architecture.

## What you can accomplish
- Import icons as individual `.astro` components
- Customize size, color, weight, and SVG attributes via props
- Tree-shake unused icons for optimal build performance
- Full TypeScript support with autocompletion
- Works out-of-the-box in Astro 3, 4, and 5 (no integration plugins required)
- Apply CSS classes and inline styles directly

---

## Installation
```bash
npm install reicon-astro
# or
yarn add reicon-astro
# or
pnpm add reicon-astro
```

---

## Basic Usage
Import icons by their PascalCase name from `reicon-astro` inside your Astro component script frontmatter (`---`).
```astro
---
import { Home, ShieldCheck, Bell } from 'reicon-astro';
---

<Home size={24} />
<ShieldCheck size={24} color="#9B8AFB" />
<Bell size={24} weight="Filled" />
```

---

## Customizing Icons
Every icon component accepts the following props to customize its appearance. You can also pass any standard SVG attributes.
```astro
---
import { Home, Heart, Star } from 'reicon-astro';
---

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
For the absolute smallest bundle size, import each icon directly from its own sub-path:
```astro
---
import Home from 'reicon-astro/icons/Home.astro';
import ShieldCheck from 'reicon-astro/icons/ShieldCheck.astro';
---
```
> **Tip:** Direct imports are recommended for production apps where bundle size matters.

---

## Using with Tailwind CSS
Reicon works seamlessly with Tailwind CSS in Astro. The icon inherits `currentColor` by default, so Tailwind's text color classes work out of the box.
```astro
---
import { Home, ShieldCheck } from 'reicon-astro';
---

<Home class="text-gray-500 hover:text-gray-700 transition-colors" />

<button class="flex items-center gap-2 text-white bg-indigo-600 px-4 py-2 rounded-lg">
  <ShieldCheck size={20} class="text-green-400" />
  <span>Verified</span>
</button>
```

---

## Full Astro Component Example
Here's a complete example of an Astro page or component using multiple Reicon icons with different configurations.
```astro
---
import { Home, Bell, User, Star, ShieldCheck } from 'reicon-astro';
---

<nav class="flex items-center gap-4 p-4 bg-slate-900 text-white rounded-xl">
  <Home size={20} />
  <Bell size={20} />
  <User size={20} />
  <Star size={20} weight="Filled" color="#f59e0b" />
  <ShieldCheck size={20} color="#9B8AFB" />
</nav>

> **Note:** All icon components are 100% static SVG elements generated at build time, adding zero client-side JavaScript.
