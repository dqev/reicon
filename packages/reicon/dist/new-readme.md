<p align="center">
  <a href="https://reicon.dev">
    <img src="https://reicon.dev/jspackage.png" alt="Reicon — SVG Icon Library" width="50%" />
  </a>
</p>

<p align="center">
  <a href="https://npmjs.com/package/reicon"><img src="https://img.shields.io/npm/v/reicon?color=black&label=npm" alt="npm version" /></a>
  <a href="https://npmjs.com/package/reicon"><img src="https://img.shields.io/npm/dm/reicon?color=black&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/dqev/reicon/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-black" alt="MIT License" /></a>
  <a href="https://reicon.dev"><img src="https://img.shields.io/badge/docs-reicon.dev-black" alt="Documentation" /></a>
</p>

# Reicon

> 2680+ pixel-perfect SVG icons • Outline & Filled weights • React, Vue, Vanilla JS, Svelte, Astro • Zero dependencies • MIT Licensed

**Reicon** is a free, open-source SVG icon library with 2680+ handcrafted, grid-aligned icons built for developers and designers. Every icon ships in two weights — Outline and Filled — and works natively in vanilla JS with no framework required. Official React and Vue packages are available separately.

- 🔗 **Website & icon browser:** [reicon.dev](https://reicon.dev)
- 📦 **React package:** [reicon-react](https://npmjs.com/package/reicon-react)
- 🎨 **Figma plugin:** [reicon.dev/figma](https://reicon.dev/figma)

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
<!-- Latest production build -->
<script src="https://unpkg.com/reicon@latest"></script>

<!-- Development (unminified) -->
<script src="https://unpkg.com/reicon@latest/umd/reicon.js"></script>
```

---

## Usage

### Vanilla JS — create SVG elements

```js
import { Home, ShieldCheck, AltArrowDown } from 'reicon';

// Returns an SVGElement, append anywhere
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

### CDN / Script tag

```html
<script src="https://unpkg.com/reicon@latest"></script>
<script>
  document.body.appendChild(reicon.Home());
  document.body.appendChild(reicon.ShieldCheck({ size: 32, color: '#d97757' }));
  document.body.appendChild(reicon.AltArrowDown({ weight: 'Filled' }));
</script>
```

---

## Usage with React

Install the official React package:

```bash
npm i reicon-react
```

```tsx
import { Home, ShieldCheck, AltArrowDown } from 'reicon-react';

export default function App() {
  return (
    <div>
      <Home />
      <ShieldCheck size={32} color="#d97757" />
      <AltArrowDown weight="Filled" />
    </div>
  );
}
```

→ Full docs: [reicon.dev/usage](https://reicon.dev/usage) · npm: [reicon-react](https://npmjs.com/package/reicon-react)

---

## Usage with Vue

```bash
npm i reicon-vue
```

```vue
<script setup>
import { Home, ShieldCheck } from 'reicon-vue';
</script>

<template>
  <Home />
  <ShieldCheck :size="32" color="#d97757" />
</template>
```

---

## Usage with Svelte / Astro / plain HTML

Any framework that can render SVG strings or DOM elements works with the base `reicon` package directly. For Svelte and Astro, use `Home.toSvg()` to get the raw SVG markup and inject it with `{@html}`:

```svelte
<script>
  import { Home } from 'reicon';
  const icon = Home.toSvg({ size: 24 });
</script>

{@html icon}
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `size` | `number \| string` | `24` | Icon size (unitless = px) |
| `color` | `string` | `currentColor` | Icon color — accepts any CSS color value |
| `weight` | `'Outline' \| 'Filled'` | `'Outline'` | Icon style / weight |
| `strokeWidth` | `number \| string` | — | Override default stroke width |
| `className` | `string` | — | Extra CSS class on the `<svg>` element |
| `attrs` | `object` | — | Any additional SVG attributes |

### Weights

```js
import { Home } from 'reicon';

Home()                                    // Outline (default)
Home({ weight: 'Filled' })               // Filled
Home({ weight: 'Filled', color: 'red' }) // Filled + custom color
```

---

## Tree-shaking — import only what you use

Every icon is a standalone ES module. Bundlers (Vite, Webpack, Rollup, esbuild) will tree-shake unused icons automatically.

```js
// ✅ Only Home is included in your bundle
import { Home } from 'reicon';

// ✅ Direct import — smallest possible bundle
import Home from 'reicon/icons/Home';
```

---

## Icon Names

Icons use **PascalCase**, derived from their original kebab-case names:

| Original name | Import |
|---------------|--------|
| `home` | `Home` |
| `shield-check` | `ShieldCheck` |
| `alt-arrow-down` | `AltArrowDown` |
| `shopping-cart` | `ShoppingCart` |
| `user-circle` | `UserCircle` |

Browse all 2680+ icons at [reicon.dev](https://reicon.dev).

---

## TypeScript

Full TypeScript support — types ship with the package, no `@types/` install needed.

```ts
import { Home, IconOptions, IconWeight } from 'reicon';

const weight: IconWeight = 'Filled';
const options: IconOptions = { size: 32, color: '#d97757', weight };

const svg: SVGSVGElement = Home(options);
document.body.appendChild(svg);
```

---

## Why Reicon?

| | Reicon | Lucide | Heroicons | Phosphor |
|--|--------|--------|-----------|---------|
| **Icons** | 2680+ | 1600+ | 292 | 7700+ |
| **Weights** | Outline + Filled | Outline only | Outline + Solid | 6 weights |
| **Vanilla JS** | ✅ Native | ❌ | ❌ | ❌ |
| **React** | ✅ reicon-react | ✅ | ✅ | ✅ |
| **Vue** | ✅ reicon-vue | ✅ | ✅ | ✅ |
| **CDN / script tag** | ✅ | ❌ | ❌ | ❌ |
| **Zero dependencies** | ✅ | ✅ | ✅ | ✅ |
| **TypeScript** | ✅ | ✅ | ✅ | ✅ |
| **MIT License** | ✅ | ✅ | ✅ | ✅ |
| **Figma plugin** | ✅ | ✅ | ❌ | ✅ |

Reicon is the only major icon library with a **native vanilla JS API** — no React, no Vue, no build tools required. Add a `<script>` tag and you're done.

---

## Related packages

| Package | Description |
|---------|-------------|
| [`reicon`](https://npmjs.com/package/reicon) | **This package.** Core vanilla JS + CDN |
| [`reicon-react`](https://npmjs.com/package/reicon-react) | React components for all 2680+ icons |
| [`reicon-vue`](https://npmjs.com/package/reicon-vue) | Vue 3 components for all 2680+ icons |

---

## Links

- 🌐 Website: [reicon.dev](https://reicon.dev)
- 📖 Documentation: [reicon.dev/usage](https://reicon.dev/usage)
- 📦 npm (React): [npmjs.com/package/reicon-react](https://npmjs.com/package/reicon-react)
- 🐙 GitHub: [github.com/dqev/reicon](https://github.com/dqev/reicon)
- 🐛 Issues: [github.com/dqev/reicon/issues](https://github.com/dqev/reicon/issues)

---

## License

MIT © [Dev Chauhan](https://devchauhan.in)

Free to use in personal and commercial projects.