<p align="center">
  <a href="https://reicon.dev">
    <img src="https://reicon.dev/jspackage.png" alt="Reicon — SVG Icon Library for Vanilla JS" width="100%" />
  </a>
</p>

<p align="center">
  <a href="https://npmjs.com/package/reicon"><img src="https://img.shields.io/npm/v/reicon?color=black&label=npm" alt="npm version" /></a>
  <a href="https://npmjs.com/package/reicon"><img src="https://img.shields.io/npm/dm/reicon?color=black&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/dqev/reicon/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-black" alt="MIT License" /></a>
  <a href="https://reicon.dev"><img src="https://img.shields.io/badge/docs-reicon.dev-black" alt="Documentation" /></a>
  <a href="https://github.com/dqev/reicon"><img src="https://img.shields.io/badge/github-dqev/reicon-black" alt="GitHub" /></a>
</p>

<h1 align="center">Reicon</h1>

<p align="center">
  <b>2674+ pixel-perfect SVG icons</b> • Outline & Filled weights • Vanilla JS & CDN runtime • Zero dependencies • MIT Licensed
</p>

<p align="center">
  <a href="#install">Install</a> •
  <a href="#usage">Usage</a> •
  <a href="#options">Options</a> •
  <a href="#tree-shaking">Tree-shaking</a> •
  <a href="#icon-names">Icon Names</a> •
  <a href="#typescript">TypeScript</a> •
  <a href="#cdn">CDN</a>
</p>

**Reicon** is the core vanilla JavaScript package for <a href="https://reicon.dev">Reicon</a> — a free, open-source SVG icon library featuring 2674+ handcrafted, grid-aligned icons. Use it directly as ES modules, or load via CDN with zero build step. Every icon is tree-shakeable, fully TypeScript-ready, and ships with no dependencies.

| 🔗 &nbsp; Resource | Link |
|---|---|
| 🌐 &nbsp; Website & icon browser | [reicon.dev](https://reicon.dev) |
| 📖 &nbsp; Documentation | [reicon.dev/docs](https://reicon.dev/docs) |
| ⚛️ &nbsp; React package | [reicon-react](https://npmjs.com/package/reicon-react) |
| 🎨 &nbsp; Figma plugin | [reicon.dev/docs/figma](https://reicon.dev/docs/figma) |

---

## Install

```bash
npm i reicon
# or
bun add reicon
# or
yarn add reicon
```

### CDN (no build step required)

```html
<script src="https://unpkg.com/reicon@latest"></script>
```

No bundler, no framework — just a `<script>` tag.

---

## Usage

### Vanilla JS — create SVG elements

```js
import { Home, ShieldCheck, AltArrowDown } from 'reicon';

document.body.appendChild(Home());
document.body.appendChild(ShieldCheck({ size: 32, color: '#d97757' }));
document.body.appendChild(AltArrowDown({ weight: 'Filled' }));
```

### Get SVG as a string

```js
import { Home } from 'reicon';

const svgString = Home.toSvg({ size: 32, color: 'red' });
element.innerHTML = svgString;
```

### Weights

Every icon ships in two weights — **Outline** (default) and **Filled**:

```js
import { Home } from 'reicon';

Home()                    // Outline (default)
Home({ weight: 'Filled' }) // Filled
```

### Sizing & coloring

```js
Home({ size: 32 })                // 32×32px
Home({ size: 48, color: 'red' })  // Custom size and color
Home({ color: 'currentColor' })   // Inherits parent text color
```

### CDN / Script tag

```html
<script src="https://unpkg.com/reicon@latest"></script>
<script>
  document.body.appendChild(reicon.Home());
  document.body.appendChild(reicon.ShieldCheck({ size: 32, color: '#d97757' }));
</script>
```

### Direct icon import (smallest bundle)

```js
import Home from 'reicon/icons/Home';
import ShieldCheck from 'reicon/icons/ShieldCheck';
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `size` | `number | string` | `24` | Icon width & height (number = px) |
| `color` | `string` | — | Primary icon stroke/fill color. Leave unset to use CSS. |
| `weight` | `'Outline' | 'Filled'` | `'Outline'` | Icon style variant |
| `strokeWidth` | `number | string` | — | Override the default stroke width |
| `className` | `string` | — | Additional CSS class on the `<svg>` element |
| `attrs` | `object` | — | Any additional SVG attributes |

---

## Tree-shaking

Every icon is a standalone ES module. Modern bundlers — **Vite**, **Webpack**, **Rollup**, **esbuild** — automatically tree-shake unused icons, keeping only what you import.

```js
// ✅ Only Home is included in your production bundle
import { Home } from 'reicon';

// ✅ Even smaller — direct path import skips the barrel file entirely
import Home from 'reicon/icons/Home';
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

Browse and search all 2674+ icons at <a href="https://reicon.dev">reicon.dev</a>.

---

## TypeScript

Full type declarations ship with the package — no separate `@types/` installation needed.

```ts
import { Home, IconOptions, IconWeight } from 'reicon';

const weight: IconWeight = 'Filled';
const options: IconOptions = { size: 32, color: '#d97757', weight };

const svg: SVGSVGElement = Home(options);
document.body.appendChild(svg);
```

### Exported types

| Type | Description |
|------|-------------|
| `IconOptions` | Options for creating an SVG element |
| `IconWeight` | `'Outline' | 'Filled'` |

---

## Features

- **2674+ icons** — Handcrafted, pixel-perfect SVGs across a wide range of categories
- **Two weights** — Outline and Filled, with consistent 24×24 grid alignment
- **Tree-shakeable** — Import only what you use; every icon is a standalone ES module
- **Zero dependencies** — No runtime overhead whatsoever
- **TypeScript-ready** — Full type declarations included, no extra packages needed
- **CDN ready** — Drop a `<script>` tag and start using icons immediately
- **`toSvg()` helper** — Get raw SVG markup for any framework or template
- **MIT licensed** — Free for personal and commercial use

---

## Related packages

| Package | Description |
|---------|-------------|
| [`reicon`](https://npmjs.com/package/reicon) | **This package.** Core vanilla JS + CDN runtime. No framework required. |
| [`reicon-react`](https://npmjs.com/package/reicon-react) | React components for 2674+ icons. |
| [`reicon-vue`](https://npmjs.com/package/reicon-vue) | Vue 3 components for 2674+ icons. |
| [`reicon-svelte`](https://npmjs.com/package/reicon-svelte) | Svelte components for 2674+ icons. |

---

## Links

- 🌐 &nbsp; Website: [reicon.dev](https://reicon.dev)
- 📖 &nbsp; Documentation: [reicon.dev/docs](https://reicon.dev/docs)
- 📦 &nbsp; npm: [npmjs.com/package/reicon](https://npmjs.com/package/reicon)
- 🐙 &nbsp; GitHub: [github.com/dqev/reicon](https://github.com/dqev/reicon)
- 🐛 &nbsp; Issues: [github.com/dqev/reicon/issues](https://github.com/dqev/reicon/issues)

---

## License

MIT © [Dev Chauhan](https://devchauhan.in)

Free to use in personal and commercial projects. Attribution is appreciated but not required.
