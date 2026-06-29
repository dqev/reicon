<p align="center">
  <a href="https://npmjs.com/package/reicon-svelte"><img src="https://img.shields.io/npm/v/reicon-svelte?color=black&label=npm" alt="npm version" /></a>
  <a href="https://npmjs.com/package/reicon-svelte"><img src="https://img.shields.io/npm/dm/reicon-svelte?color=black&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/dqev/reicon/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-black" alt="MIT License" /></a>
  <a href="https://reicon.dev"><img src="https://img.shields.io/badge/docs-reicon.dev-black" alt="Documentation" /></a>
</p>

# Reicon Svelte

> 2680+ pixel-perfect SVG icons • Outline & Filled weights • Svelte component wrapper • Zero dependencies • MIT Licensed

**Reicon Svelte** is the official Svelte package for Reicon — a free, open-source SVG icon library with 2680+ handcrafted, grid-aligned icons built for developers and designers. Every component is optimized for tree-shaking and fully TypeScript-ready.

- 🔗 **Website & icon browser:** [reicon.dev](https://reicon.dev)
- 📦 **Core package:** [reicon](https://npmjs.com/package/reicon)
- 🎨 **Figma plugin:** [reicon.dev/figma](https://reicon.dev/figma)

---

## Install

```bash
npm i reicon-svelte
# or
bun add reicon-svelte
# or
yarn add reicon-svelte
```

---

## Usage

```svelte
<script>
  import { Home, ShieldCheck, AltArrowDown } from 'reicon-svelte';
</script>

<Home />
<ShieldCheck size={32} color="#d97757" />
<AltArrowDown weight="Filled" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number | string` | `24` | Icon size (number = px) |
| `color` | `string` | `currentColor` | Primary icon color |
| `weight` | `'Outline' | 'Filled'` | `Outline` | Icon weight / style |
| `strokeWidth` | `number | string` | — | Override stroke width |

Plus all standard SVG attributes.

### Weights

- **Outline** — clean outlined style (default)
- **Filled** — solid filled style

```svelte
<Home />                              <!-- Outline (default) -->
<Home weight="Filled" />              <!-- Filled -->
<Home weight="Filled" color="red" />
```

### Direct icon import (smallest bundle)

```js
import Home from 'reicon-svelte/icons/Home.svelte';
```

---

## Tree-shaking — import only what you use

Every icon is a standalone ES module. Bundlers (Vite, Webpack, Rollup, esbuild) will tree-shake unused icons automatically.

```js
// ✅ Only Home is included in your bundle
import { Home } from 'reicon-svelte';
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

Full TypeScript support out of the box.

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

---

## Related packages

| Package | Description |
|---------|-------------|
| [`reicon`](https://npmjs.com/package/reicon) | Core vanilla JS + CDN |
| [`reicon-react`](https://npmjs.com/package/reicon-react) | React components for all 2680+ icons |
| [`reicon-vue`](https://npmjs.com/package/reicon-vue) | Vue 3 components for all 2680+ icons |
| [`reicon-svelte`](https://npmjs.com/package/reicon-svelte) | **This package.** Svelte components for all 2680+ icons |

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
