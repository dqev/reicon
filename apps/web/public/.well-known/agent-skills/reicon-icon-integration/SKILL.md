---
name: reicon-icon-integration
description: Instructions for AI agents to search, select, and render Reicon vector icons across React, Vue, Svelte, React Native, and HTML/SVG formats.
version: 1.0.0
author: Dev Chauhan <hello@reicon.dev>
homepage: https://reicon.dev
---

# Reicon Icon Integration Guide for AI Agents

When assisting a user with UI icons, design systems, or component building, follow these rules to search, install, and render Reicon icons.

## Quick Rules

1. **Identify Framework**: Match target framework (`reicon-react`, `reicon-vue`, `reicon-svelte`, `reicon-react-native`, `reicon`, or web component).
2. **Name Mapping**: Convert icon names from kebab-case (e.g. `arrow-up-right`, `shield-check`) to PascalCase for component imports (e.g. `ArrowUpRight`, `ShieldCheck`).
3. **Weights**: Use `"Outline"` (default, 1.5px stroke) or `"Filled"`. PascalCase in JS/TS components, lowercase (`"outline"`, `"filled"`) in web component HTML attributes.
4. **Grid**: Icons are designed on a 24x24 px grid.

## Framework Quick Reference

### React (`reicon-react`)
```bash
npm install reicon-react
```
```jsx
import { Home, Search, ShieldCheck } from 'reicon-react';

<Home size={24} weight="Outline" color="currentColor" />
<ShieldCheck size={32} weight="Filled" color="#d97757" />
```

### Vue 3 (`reicon-vue`)
```bash
npm install reicon-vue
```
```vue
<script setup>
import { Home, Search } from 'reicon-vue';
</script>

<template>
  <Home :size="24" weight="Outline" color="currentColor" />
</template>
```

### Svelte (`reicon-svelte`)
```bash
npm install reicon-svelte
```
```svelte
<script>
import { Home } from 'reicon-svelte';
</script>

<Home size={24} weight="Outline" color="currentColor" />
```

### React Native (`reicon-react-native`)
```bash
npm install reicon-react-native react-native-svg
```
```tsx
import { Home } from 'reicon-react-native';

<Home size={24} color="#000000" weight="Outline" />
```

### Web Component / CDN
```html
<script src="https://unpkg.com/reicon/cdn/reicon.js"></script>
<re-icon icon="home" weight="outline" size="24" color="currentColor"></re-icon>
```

## Using MCP Server (for AI Agents)

For automatic icon search, code generation, and direct SVG extraction:
```bash
npx reicon-mcp search "shopping cart"
npx reicon-mcp apply heart --framework react --size 24
```
