# Usage of Reicon Vue

The official Vue 3 package for Reicon. Import beautifully crafted icons as Vue components with full TypeScript support. All icons are tree-shakeable, ensuring only the icons you actually use end up in your bundle.

## What you can accomplish
- Import icons as individual Vue components
- Customize size, color, and weight via props
- Tree-shake unused icons to keep bundle sizes minimal
- Full TypeScript support with autocompletion
- Use icons in Nuxt 3, Vite, and more
- Apply CSS classes and inline styles directly

---

## Installation
```bash
npm install reicon-vue
# or
yarn add reicon-vue
# or
pnpm add reicon-vue
```

---

## Basic Usage
Import icons by their PascalCase name from `reicon-vue`. Each icon is a Vue component that accepts standard props.
```html
<script setup>
import { Home, ShieldCheck, AltArrowDown } from 'reicon-vue';
</script>

<template>
  <Home />
  <ShieldCheck :size="32" color="#d97757" />
  <AltArrowDown weight="Filled" />
</template>
```

---

## Props
Every icon component accepts the following props to customize its appearance. You can also pass any standard HTML/SVG attributes via `v-bind`.
```html
<!-- Size -->
<Home :size="16" />
<Home :size="24" />
<Home :size="32" />

<!-- Color -->
<Heart color="#ef4444" />
<Heart color="rgb(99, 102, 241)" />

<!-- Weight -->
<Star />                     <!-- Outline (default) -->
<Star weight="Filled" />     <!-- Filled -->

<!-- Class -->
<Home class="my-icon" />
```

---

## Direct Import for Smaller Bundles
For the absolute smallest bundle size, import each icon directly from its own module.
```javascript
import Home from 'reicon-vue/icons/Home';
```

---

## Dynamic Icons
Use Vue's `<component :is="..." />` pattern with `shallowRef` for dynamic icon switching.
```html
<script setup>
import { Home, Settings, User } from 'reicon-vue';
import { shallowRef } from 'vue';

const currentIcon = shallowRef(Home);
</script>

<template>
  <component :is="currentIcon" :size="32" />
</template>
```

---

## Nuxt 3
Works out of the box with Nuxt 3 — just import and use. No plugins or configuration needed.
```html
<script setup>
import { Home } from 'reicon-vue';
</script>

<template>
  <Home :size="24" />
</template>
```

> **Note:** All icon components are SSR-compatible and work with Nuxt 3, Vite, and other Vue 3 frameworks out of the box.
