<p align="center">
  <a href="https://npmjs.com/package/reicon-angular"><img src="https://img.shields.io/npm/v/reicon-angular?color=black&label=npm" alt="npm version" /></a>
  <a href="https://npmjs.com/package/reicon-angular"><img src="https://img.shields.io/npm/dm/reicon-angular?color=black&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/dqev/reicon/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-black" alt="MIT License" /></a>
  <a href="https://reicon.dev"><img src="https://img.shields.io/badge/docs-reicon.dev-black" alt="Documentation" /></a>
</p>

# Reicon Angular

> 2680+ pixel-perfect SVG icons • Outline & Filled weights • Angular component wrapper • Zero dependencies • MIT Licensed

**Reicon Angular** is the official Angular package for Reicon — a free, open-source SVG icon library with 2680+ handcrafted, grid-aligned icons built for developers and designers. Every component is optimized for tree-shaking and fully TypeScript-ready.

- 🔗 **Website & icon browser:** [reicon.dev](https://reicon.dev)
- 📦 **Core package:** [reicon](https://npmjs.com/package/reicon)
- 🎨 **Figma plugin:** [reicon.dev/figma](https://reicon.dev/figma)

---

## Install

```bash
npm i reicon-angular
# or
bun add reicon-angular
# or
yarn add reicon-angular
```

---

## Usage

First, add the components to your standalone component imports:

```typescript
import { Component } from '@angular/core';
import { Home, ShieldCheck, AltArrowDown } from 'reicon-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home, ShieldCheck, AltArrowDown],
  template: `
    <reicon-home></reicon-home>
    <reicon-shield-check [size]="32" color="#d97757"></reicon-shield-check>
    <reicon-alt-arrow-down weight="Filled"></reicon-alt-arrow-down>
  `
})
export class AppComponent {}
```

### Inputs

| Input | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number | string` | `24` | Icon size (number = px) |
| `color` | `string` | `currentColor` | Primary icon color |
| `weight` | `'Outline' | 'Filled'` | `Outline` | Icon weight / style |
| `strokeWidth` | `number | string` | — | Override stroke width |

### Styling

Standard Angular 'class' and 'style' bindings work natively directly on the host element:

```html
<reicon-home class="my-icon-class" [style.margin-left.px]="8"></reicon-home>
```

### Weights

- **Outline** — clean outlined style (default)
- **Filled** — solid filled style

```html
<reicon-home></reicon-home>                          <!-- Outline (default) -->
<reicon-home weight="Filled"></reicon-home>          <!-- Filled -->
<reicon-home weight="Filled" color="red"></reicon-home>
```

---

## Icon Names

Icons use **PascalCase** class names derived from their original kebab-case names:

| Original name | Class Component | Selector |
|---------------|-----------------|----------|
| `home` | `Home` | `reicon-home` |
| `shield-check` | `ShieldCheck` | `reicon-shield-check` |
| `alt-arrow-down` | `AltArrowDown` | `reicon-alt-arrow-down` |
| `user-circle` | `UserCircle` | `reicon-user-circle` |

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
| [`reicon-svelte`](https://npmjs.com/package/reicon-svelte) | Svelte components for all 2680+ icons |
| [`reicon-angular`](https://npmjs.com/package/reicon-angular) | **This package.** Angular components for all 2680+ icons |

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
