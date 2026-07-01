<p align="center">
  <a href="https://reicon.dev">
    <img src="public/og-image.png?v=2" alt="Reicon — Free Open-Source Icon Library" width="100%" />
  </a>
</p>

<h1 align="center">Reicon</h1>

<p align="center">
  <strong>An open-source SVG icon library featuring 2,700+ icons with dedicated packages for React, Vue 3, Svelte, vanilla JavaScript, CDN runtime, Figma design workspace, and VS Code code editor.</strong>
</p>

<p align="center">
  <a href="https://reicon.dev">Website</a> ·
  <a href="https://reicon.dev/icons">Browse Icons</a> ·
  <a href="https://reicon.dev/usage">Usage Guide</a> ·
  <a href="https://www.npmjs.com/package/reicon-react">npm</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/reicon"><img src="https://img.shields.io/npm/v/reicon?color=6C5CE7&label=reicon" alt="reicon version" /></a>
  <a href="https://www.npmjs.com/package/reicon-react"><img src="https://img.shields.io/npm/v/reicon-react?color=6C5CE7&label=reicon-react" alt="reicon-react version" /></a>
  <a href="https://www.npmjs.com/package/reicon-vue"><img src="https://img.shields.io/npm/v/reicon-vue?color=6C5CE7&label=reicon-vue" alt="reicon-vue version" /></a>
  <a href="https://www.npmjs.com/package/reicon-svelte"><img src="https://img.shields.io/npm/v/reicon-svelte?color=6C5CE7&label=reicon-svelte" alt="reicon-svelte version" /></a>
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" />
  <img src="https://img.shields.io/badge/icons-2700%2B-blue" alt="2700+ Icons" />
</p>

<br/>

## <img src="./public/readme-assets/overview.svg" width="22" height="22" align="center" alt="" />&nbsp; Overview

Reicon provides a comprehensive set of SVG icons designed on a strict 24×24 pixel grid. The library is built for high-performance web applications, offering complete tree-shakeability, zero external dependencies, and optimized wrappers for multiple frameworks.

All icons are maintained in two weights:
*   **Outline**: 1.5px stroke-width with consistent corner radiuses.
*   **Filled**: Solid path structures designed for active states or highlighted UI elements.



## <img src="./public/readme-assets/packages.svg" width="22" height="22" align="center" alt="" />&nbsp; Packages & Ecosystem

| Logo | Package | Version | Downloads | Links |
| :---: | :--- | :--- | :--- | :--- |
| <img src="https://cdn.simpleicons.org/javascript/F7DF1E" alt="JS logo" width="30"> | **`reicon`** | [![npm](https://img.shields.io/npm/v/reicon?color=6C5CE7&label=)](https://www.npmjs.com/package/reicon) | ![npm downloads](https://img.shields.io/npm/dm/reicon?color=6C5CE7&label=) | [Guide](docs/javascript/usage.md) · [Source](./packages/reicon) |
| <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React logo" width="30"> | **`reicon-react`** | [![npm](https://img.shields.io/npm/v/reicon-react?color=6C5CE7&label=)](https://www.npmjs.com/package/reicon-react) | ![npm downloads](https://img.shields.io/npm/dm/reicon-react?color=6C5CE7&label=) | [Guide](docs/react/usage.md) · [Source](./packages/reicon-react) |
| <img src="https://cdn.simpleicons.org/vuedotjs/4FC08D" alt="Vue logo" width="30"> | **`reicon-vue`** | [![npm](https://img.shields.io/npm/v/reicon-vue?color=6C5CE7&label=)](https://www.npmjs.com/package/reicon-vue) | ![npm downloads](https://img.shields.io/npm/dm/reicon-vue?color=6C5CE7&label=) | [Guide](docs/vue/usage.md) · [Source](./packages/reicon-vue) |
| <img src="https://cdn.simpleicons.org/svelte/FF3E00" alt="Svelte logo" width="30"> | **`reicon-svelte`** | [![npm](https://img.shields.io/npm/v/reicon-svelte?color=6C5CE7&label=)](https://www.npmjs.com/package/reicon-svelte) | ![npm downloads](https://img.shields.io/npm/dm/reicon-svelte?color=6C5CE7&label=) | [Guide](docs/svelte/usage.md) · [Source](./packages/reicon-svelte) |
| <img src="./public/readme-assets/figma.svg" alt="Figma logo" width="28"> | **`reicon-figma`** | — | — | [Guide](docs/figma/usage.md) · [Source](./packages/reicon-figma) |
| <img src="./public/readme-assets/vscode.svg" alt="VS Code logo" width="30"> | **`reicon-vscode`** | [![Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/DevChauhan.reicon?color=6C5CE7&label=)](https://marketplace.visualstudio.com/items?itemName=DevChauhan.reicon) | — | [Guide](docs/vscode/usage.md) · [Source](./packages/reicon-vscode) |
| <img src="./public/readme-assets/svg.svg" alt="SVG logo" width="30"> | **`reicon-svg`** | — | — | [Guide](docs/svg/usage.md) · [Download](./public/reicon-icons.zip) |



## <img src="./public/readme-assets/quick-start.svg" width="22" height="22" align="center" alt="" />&nbsp; Quick Start

### React Usage

```tsx
import { Heart } from 'reicon-react';

function App() {
  return <Heart size={24} weight="Outline" color="#000000" />;
}
```

### Vue 3 Usage

```html
<script setup>
import { Heart } from 'reicon-vue';
</script>

<template>
  <Heart :size="24" weight="Filled" color="#000000" />
</template>
```

### Svelte Usage

```svelte
<script>
import { Heart } from 'reicon-svelte';
</script>

<Heart size={24} weight="Outline" color="#000000" />
```


### HTML / CDN Usage

```html
<!-- Load the library -->
<script src="https://unpkg.com/reicon/cdn/reicon.min.js"></script>

<!-- Render the web component -->
<re-icon icon="heart" weight="outline" size="24"></re-icon>
```


## <img src="./public/readme-assets/structure.svg" width="22" height="22" align="center" alt="" />&nbsp; Project Structure

This project is organized as a monorepo holding the core dataset, package compilations, build scripts, and the showcase documentation site.

For a detailed file-by-file breakdown of the directory layout and file responsibilities, see the [Project Structure Guide](docs/project-structure.md).


## <img src="./public/readme-assets/design.svg" width="22" height="22" align="center" alt="" />&nbsp; Design System

The documentation site uses a custom layout system built using CSS custom variables and Tailwind CSS utility tokens.

For the specifications on typography scales, responsive breakpoints, animations, and reusable site components, see the [Design System Guide](docs/design-system.md).

---

## <img src="./public/readme-assets/development.svg" width="22" height="22" align="center" alt="" />&nbsp; Development & Building

### Running the Documentation Site
To start the React/Vite development server locally for the documentation website:
```bash
npm install
npm run dev
```

### Compiling Packages from Source
The core icons are maintained in `data/icon-data.json`, which acts as the single source of truth for the entire library.
1. Modify or add icons inside `data/icon-data.json`.
2. Run the compiler scripts to update all framework packages and CDN runtimes:
   ```bash
   npm run build:packages
   ```
3. Rebuild the website with updated package paths and prerendered SEO meta tags:
   ```bash
   npm run build:full
   ```



## <img src="./public/readme-assets/contributing.svg" width="22" height="22" align="center" alt="" />&nbsp; Contributing

Contributions to the codebase, packages, or documentation are welcome. Please refer to our [Contributing Guidelines](.github/CONTRIBUTING.md) for conventions on pull requests, testing, and formatting.



## <img src="./public/readme-assets/star-history.svg" width="22" height="22" align="center" alt="" />&nbsp; Star History

<a href="https://www.star-history.com/?repos=dqev%2Freicon&type=date&legend=bottom-right">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=dqev/reicon&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=dqev/reicon&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=dqev/reicon&type=date&legend=top-left" />
 </picture>
</a>



## <img src="./public/readme-assets/license.svg" width="22" height="22" align="center" alt="" />&nbsp; License

MIT License - Copyright (c) 2026 [Dev Chauhan](https://devchauhan.in).