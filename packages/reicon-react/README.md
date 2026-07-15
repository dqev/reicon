<p align="center">
  <a href="https://reicon.dev">
    <img src="https://reicon.dev/readme-banner.png" alt="Reicon React — SVG Icon Library for React" width="100%" />
  </a>
</p>

<p align="center">
  <a href="https://npmjs.com/package/reicon-react"><img src="https://img.shields.io/npm/v/reicon-react?color=black&label=npm" alt="npm version" /></a>
  <a href="https://npmjs.com/package/reicon-react"><img src="https://img.shields.io/npm/dm/reicon-react?color=black&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/dqev/reicon/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-black" alt="MIT License" /></a>
  <a href="https://reicon.dev"><img src="https://img.shields.io/badge/docs-reicon.dev-black" alt="Documentation" /></a>
  <a href="https://github.com/dqev/reicon"><img src="https://img.shields.io/badge/github-dqev/reicon-black" alt="GitHub" /></a>
</p>

<h1 align="center">Reicon React</h1>

<p align="center">
  <b>2680+ pixel-perfect SVG icons</b> • Outline & Filled weights • React component wrapper • Zero dependencies • MIT Licensed
</p>

<p align="center">
  <a href="#install">Install</a> •
  <a href="#usage">Usage</a> •
  <a href="#props">Props</a> •
  <a href="#tree-shaking">Tree-shaking</a> •
  <a href="#icon-names">Icon Names</a> •
  <a href="#typescript">TypeScript</a>
</p>

**Reicon React** is the official React package for <a href="https://reicon.dev">Reicon</a> — a free, open-source SVG icon library featuring 2680+ handcrafted, grid-aligned icons. Every component is tree-shakeable, fully TypeScript-ready, and ships with zero dependencies.

| 🔗 &nbsp; Resource | Link |
|---|---|
| 🌐 &nbsp; Website & icon browser | [reicon.dev](https://reicon.dev) |
| 📖 &nbsp; Documentation | [reicon.dev/docs](https://reicon.dev/docs) |
| 📦 &nbsp; Core package (vanilla JS) | [reicon](https://npmjs.com/package/reicon) |
| 🎨 &nbsp; Figma plugin | [reicon.dev/docs/figma](https://reicon.dev/docs/figma) |

---

## Install

```bash
npm i reicon-react
# or
bun add reicon-react
# or
yarn add reicon-react
```

<details>
<summary><b>Requirements</b></summary>

- **React** ≥ 16.8 (Hooks-compatible)
- No other dependencies required.

</details>

---

## Usage

### Basic

```jsx
import { Home, ShieldCheck, AltArrowDown } from 'reicon-react';

function App() {
  return (
    <div>
      <Home />
      <ShieldCheck size={32} color="#d97757" />
      <AltArrowDown weight="Filled" />
    </div>
  );
}
```

### Weights

Every icon ships in two weights — **Outline** (default) and **Filled**:

```jsx
import { Home } from 'reicon-react';

<Home />                     {/* Outline (default) */}
<Home weight="Filled" />     {/* Filled */}
```

### Sizing & coloring

```jsx
<Home size={32} />                    {/* 32×32px */}
<Home size={48} color="#d97757" />    {/* Custom size and color */}
<Home color="currentColor" />         {/* Inherits parent text color */}
```

### Direct icon import (smallest bundle)

For the absolute minimum bundle size, import icons directly from the sub-path:

```jsx
import Home from 'reicon-react/icons/Home';
import ShieldCheck from 'reicon-react/icons/ShieldCheck';
```

### All SVG attributes are supported

Pass any standard SVG attribute — `className`, `style`, `onClick`, `aria-*`, etc.:

```jsx
<Home
  size={48}
  color="red"
  className="my-icon"
  style={{ marginRight: 8 }}
  onClick={() => console.log('clicked')}
  aria-label="Home"
/>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number | string` | `24` | Icon width & height (number = px) |
| `color` | `string` | `currentColor` | Primary icon stroke/fill color |
| `secondaryColor` | `string` | same as `color` | Secondary (accent) fill color |
| `weight` | `'Outline' | 'Filled'` | `'Outline'` | Icon style variant |
| `strokeWidth` | `number | string` | — | Override the default stroke width |
| `className` | `string` | — | Additional CSS class on the <svg> element |

Any valid SVG attribute (e.g. `style`, `onClick`, `id`, `aria-*`) is forwarded to the underlying <svg> element.

---

## Tree-shaking

Every icon is a standalone ES module. Modern bundlers — **Vite**, **Webpack**, **Rollup**, **esbuild**, **Next.js**, **Remix** — automatically tree-shake unused icons, keeping only what you import.

```jsx
// ✅ Only Home is included in your production bundle
import { Home } from 'reicon-react';

// ✅ Even smaller — direct path import skips the barrel file entirely
import Home from 'reicon-react/icons/Home';
```

The package is marked `"sideEffects": false` for optimal dead-code elimination.

---

## Icon Names

Icons use **PascalCase**, derived from their original kebab-case file names:

| Original name | PascalCase import |
|---------------|-------------------|
| `home` | `Home` |
| `shield-check` | `ShieldCheck` |
| `alt-arrow-down` | `AltArrowDown` |
| `shopping-cart` | `ShoppingCart` |
| `user-circle` | `UserCircle` |
| `arrow-right-up` | `ArrowRightUp` |

Browse and search all 2680+ icons at <a href="https://reicon.dev">reicon.dev</a>.

---

## TypeScript

Full type declarations ship with the package — no separate `@types/` installation needed.

```tsx
import { Home, type IconProps, type IconWeight } from 'reicon-react';

const weight: IconWeight = 'Filled';
const props: IconProps = { size: 32, color: '#d97757', weight };

<Home {...props} />
```

### Exported types

| Type | Description |
|------|-------------|
| `IconProps` | Combined icon props + React SVG attributes |
| `IconWeight` | `'Outline' | 'Filled'` |
| `IconComponent` | Signature of any icon component |

---

## Features

- **2680+ icons** — Handcrafted, pixel-perfect SVGs across a wide range of categories
- **Two weights** — Outline and Filled, with consistent 24×24 grid alignment
- **Tree-shakeable** — Import only what you use; every icon is a standalone ES module
- **Zero dependencies** — No runtime overhead beyond React itself
- **TypeScript-ready** — Full type declarations included, no extra packages needed
- **SVG attribute passthrough** — All standard SVG props (`style`, `onClick`, `aria-*`, etc.) are forwarded
- **MIT licensed** — Free for personal and commercial use

---

## Related packages

| Package | Description |
|---------|-------------|
| [`reicon`](https://npmjs.com/package/reicon) | Core vanilla JS + CDN runtime. No framework required. |
| [`reicon-react`](https://npmjs.com/package/reicon-react) | **You are here.** React components for 2680+ icons. |
| [`reicon-vue`](https://npmjs.com/package/reicon-vue) | Vue 3 components for 2680+ icons. |
| [`reicon-svelte`](https://npmjs.com/package/reicon-svelte) | Svelte components for 2680+ icons. |

---

## Links

- 🌐 &nbsp; Website: [reicon.dev](https://reicon.dev)
- 📖 &nbsp; Documentation: [reicon.dev/docs](https://reicon.dev/docs)
- 📦 &nbsp; npm: [npmjs.com/package/reicon-react](https://npmjs.com/package/reicon-react)
- 🐙 &nbsp; GitHub: [github.com/dqev/reicon](https://github.com/dqev/reicon)
- 🐛 &nbsp; Issues: [github.com/dqev/reicon/issues](https://github.com/dqev/reicon/issues)

---

## License

MIT © [Dev Chauhan](https://devchauhan.in)

Free to use in personal and commercial projects. Attribution is appreciated but not required.
