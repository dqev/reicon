<p align="center">
  <a href="https://npmjs.com/package/reicon-react"><img src="https://img.shields.io/npm/v/reicon-react?color=black&label=npm" alt="npm version" /></a>
  <a href="https://npmjs.com/package/reicon-react"><img src="https://img.shields.io/npm/dm/reicon-react?color=black&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/dqev/reicon/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-black" alt="MIT License" /></a>
  <a href="https://reicon.dev"><img src="https://img.shields.io/badge/docs-reicon.dev-black" alt="Documentation" /></a>
</p>

# Reicon React

> 2680+ pixel-perfect SVG icons • Outline & Filled weights • React component wrapper • Zero dependencies • MIT Licensed

**Reicon React** is the official React package for Reicon — a free, open-source SVG icon library with 2680+ handcrafted, grid-aligned icons built for developers and designers. Every component is optimized for tree-shaking and fully TypeScript-ready.

- 🔗 **Website & icon browser:** [reicon.dev](https://reicon.dev)
- 📦 **Core package:** [reicon](https://npmjs.com/package/reicon)
- 🎨 **Figma plugin:** [reicon.dev/figma](https://reicon.dev/figma)

---

## Install

```bash
npm i reicon-react
# or
bun add reicon-react
# or
yarn add reicon-react
```

---

## Usage

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

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number | string` | `24` | Icon size (number = px) |
| `color` | `string` | `currentColor` | Primary icon color |
| `secondaryColor` | `string` | same as color | Secondary color |
| `weight` | `IconWeight` | `Outline` | Icon weight / style |
| `strokeWidth` | `number | string` | — | Override stroke width |
| `className` | `string` | — | Additional CSS class |

Plus all standard SVG attributes.

### Weights

- **Outline** — clean outlined style (default)
- **Filled** — solid filled style

```jsx
import { Home } from 'reicon-react';

<Home />                           {/* Outline (default) */}
<Home weight="Filled" />           {/* Filled */}
<Home weight="Filled" color="red" />
```

### Direct icon import (smallest bundle)

```jsx
import Home from 'reicon-react/icons/Home';
```

### All SVG props are supported

```jsx
<Home
  size={48}
  color="red"
  className="my-icon"
  style={{ marginRight: 8 }}
  onClick={() => console.log('clicked')}
/>
```

---

## Tree-shaking — import only what you use

Every icon is a standalone ES module. Bundlers (Vite, Webpack, Rollup, esbuild) will tree-shake unused icons automatically.

```jsx
// ✅ Only Home is included in your bundle
import { Home } from 'reicon-react';
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

Full TypeScript support out of the box:

```tsx
import { Home, IconProps, IconWeight } from 'reicon-react';

const weight: IconWeight = 'Filled';
const props: IconProps = { size: 32, color: '#d97757', weight };

<Home {...props} />
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

---

## Related packages

| Package | Description |
|---------|-------------|
| [`reicon`](https://npmjs.com/package/reicon) | Core vanilla JS + CDN |
| [`reicon-react`](https://npmjs.com/package/reicon-react) | **This package.** React components for all 2680+ icons |
| [`reicon-vue`](https://npmjs.com/package/reicon-vue) | Vue 3 components for all 2680+ icons |
| [`reicon-svelte`](https://npmjs.com/package/reicon-svelte) | Svelte components for all 2680+ icons |

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
