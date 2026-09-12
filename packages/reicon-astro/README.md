<p align="center">
  <a href="https://reicon.dev">
    <img src="https://reicon.dev/readme-banner.png" alt="Reicon Astro — SVG Icon Library for Astro" width="100%" />
  </a>
</p>

<p align="center">
  <a href="https://npmjs.com/package/reicon-astro"><img src="https://img.shields.io/npm/v/reicon-astro?color=black&label=npm" alt="npm version" /></a>
  <a href="https://npmjs.com/package/reicon-astro"><img src="https://img.shields.io/npm/dm/reicon-astro?color=black&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/dqev/reicon/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-black" alt="MIT License" /></a>
  <a href="https://reicon.dev"><img src="https://img.shields.io/badge/docs-reicon.dev-black" alt="Documentation" /></a>
  <a href="https://github.com/dqev/reicon"><img src="https://img.shields.io/badge/github-dqev/reicon-black" alt="GitHub" /></a>
</p>

<h1 align="center">Reicon Astro</h1>

<p align="center">
  <b>2676+ pixel-perfect SVG icons</b> • Outline & Filled weights • Astro component wrapper • Zero dependencies • MIT Licensed
</p>

<p align="center">
  <a href="#install">Install</a> •
  <a href="#usage">Usage</a> •
  <a href="#props">Props</a> •
  <a href="#tree-shaking">Tree-shaking</a> •
  <a href="#icon-names">Icon Names</a> •
  <a href="#typescript">TypeScript</a>
</p>

**Reicon Astro** is the official Astro package for <a href="https://reicon.dev">Reicon</a> — a free, open-source SVG icon library featuring 2676+ handcrafted, grid-aligned icons. Every component is tree-shakeable, fully TypeScript-ready, and ships with zero dependencies.

| 🔗 &nbsp; Resource | Link |
|---|---|
| 🌐 &nbsp; Website & icon browser | [reicon.dev](https://reicon.dev) |
| 📖 &nbsp; Documentation | [reicon.dev/docs/astro](https://reicon.dev/docs/astro) |
| 📦 &nbsp; Core package (vanilla JS) | [reicon](https://npmjs.com/package/reicon) |
| 🎨 &nbsp; Figma plugin | [reicon.dev/docs/figma](https://reicon.dev/docs/figma) |

---

## Install

```bash
npm i reicon-astro
# or
bun add reicon-astro
# or
yarn add reicon-astro
```

---

## Usage

### Basic

```astro
---
import { Home, ShieldCheck, AltArrowDown } from 'reicon-astro';
---

<Home />
<ShieldCheck size={32} color="#d97757" />
<AltArrowDown weight="Filled" />
```

### Weights

Every icon ships in two weights — **Outline** (default) and **Filled**:

```astro
<Home />                        <!-- Outline (default) -->
<Home weight="Filled" />        <!-- Filled -->
```

### Sizing & coloring

```astro
<Home size={32} />                    <!-- 32×32px -->
<Home size={48} color="#d97757" />    <!-- Custom size and color -->
<Home color="currentColor" />         <!-- Inherits parent text color -->
```

### Direct icon import (smallest bundle)

For the absolute minimum bundle size, import icons directly from the sub-path:

```astro
---
import Home from 'reicon-astro/icons/Home.astro';
import ShieldCheck from 'reicon-astro/icons/ShieldCheck.astro';
---
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number | string` | `24` | Icon width & height (number = px) |
| `color` | `string` | — | Primary icon stroke/fill color. Leave unset to use CSS class. |
| `weight` | `'Outline' | 'Filled'` | `'Outline'` | Icon style variant |
| `strokeWidth` | `number | string` | — | Override default stroke width |
| `class` | `string` | — | Additional CSS class on `<svg>` element |
| `style` | `string` | — | Additional inline styles |

---

## TypeScript

Full type declarations ship with the package:

```ts
import type { IconProps, IconWeight } from 'reicon-astro';

const weight: IconWeight = 'Filled';
const props: IconProps = { size: 32, color: '#d97757', weight };
```

---

## License

MIT © [Dev Chauhan](https://devchauhan.in)
