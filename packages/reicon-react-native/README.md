<p align="center">
  <a href="https://npmjs.com/package/reicon-react-native"><img src="https://img.shields.io/npm/v/reicon-react-native?color=black&label=npm" alt="npm version" /></a>
  <a href="https://npmjs.com/package/reicon-react-native"><img src="https://img.shields.io/npm/dm/reicon-react-native?color=black&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/dqev/reicon/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-black" alt="MIT License" /></a>
  <a href="https://reicon.dev"><img src="https://img.shields.io/badge/docs-reicon.dev-black" alt="Documentation" /></a>
</p>

# Reicon React Native

> 2680+ pixel-perfect SVG icons • Outline & Filled weights • React Native component wrapper • Zero dependencies • MIT Licensed

**Reicon React Native** is the official React Native package for Reicon — a free, open-source SVG icon library with 2680+ handcrafted, grid-aligned icons built for developers and designers. Every component is optimized for tree-shaking and fully TypeScript-ready.

- 🔗 **Website & icon browser:** [reicon.dev](https://reicon.dev)
- 📦 **Core package:** [reicon](https://npmjs.com/package/reicon)
- ⚛️ **React package:** [reicon-react](https://npmjs.com/package/reicon-react)
- 🎨 **Figma plugin:** [reicon.dev/figma](https://reicon.dev/figma)

---

## Install

```bash
npm i reicon-react-native react-native-svg
# or
yarn add reicon-react-native react-native-svg
# or
bun add reicon-react-native react-native-svg
```

**Note:** This package requires `react-native-svg` as a peer dependency. Make sure to install it and follow its [setup instructions](https://github.com/software-mansion/react-native-svg#installation).

---

## Usage

```jsx
import { Home, ShieldCheck, AltArrowDown } from 'reicon-react-native';

function App() {
  return (
    <View>
      <Home />
      <ShieldCheck size={32} color="#d97757" />
      <AltArrowDown weight="Filled" />
    </View>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `24` | Icon size in pixels |
| `color` | `string` | `#000000` | Primary icon color |
| `secondaryColor` | `string` | same as color | Secondary color |
| `weight` | `IconWeight` | `Outline` | Icon weight / style |
| `strokeWidth` | `number | string` | — | Override stroke width |

Plus all standard `react-native-svg` SVG props.

### Weights

- **Outline** — clean outlined style (default)
- **Filled** — solid filled style

```jsx
import { Home } from 'reicon-react-native';

<Home />                           {/* Outline (default) */}
<Home weight="Filled" />           {/* Filled */}
<Home weight="Filled" color="red" />
```

### Direct icon import (smallest bundle)

```jsx
import Home from 'reicon-react-native/icons/Home';
```

### All react-native-svg props are supported

```jsx
<Home
  size={48}
  color="red"
  style={{ marginRight: 8 }}
  onPress={() => console.log('pressed')}
/>
```

---

## Tree-shaking — import only what you use

Every icon is a standalone ES module. Metro bundler will tree-shake unused icons automatically.

```jsx
// ✅ Only Home is included in your bundle
import { Home } from 'reicon-react-native';
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
import { Home, IconProps, IconWeight } from 'reicon-react-native';

const weight: IconWeight = 'Filled';
const props: IconProps = { size: 32, color: '#d97757', weight };

<Home {...props} />
```

---

## Why Reicon?

| | Reicon | React Native Vector Icons | Lucide RN |
|--|--------|---------------------------|-----------|
| **Icons** | 2680+ | 3000+ | 1600+ |
| **Weights** | Outline + Filled | Varies by set | Outline only |
| **Tree-shakeable** | ✅ | ❌ | ✅ |
| **TypeScript** | ✅ | ✅ | ✅ |
| **Zero dependencies** | ✅ (+ react-native-svg) | ✅ | ✅ (+ react-native-svg) |
| **MIT License** | ✅ | ✅ | ✅ |

---

## Related packages

| Package | Description |
|---------|-------------|
| [`reicon`](https://npmjs.com/package/reicon) | Core vanilla JS + CDN |
| [`reicon-react`](https://npmjs.com/package/reicon-react) | React components for all 2680+ icons |
| [`reicon-react-native`](https://npmjs.com/package/reicon-react-native) | **This package.** React Native components for all 2680+ icons |
| [`reicon-vue`](https://npmjs.com/package/reicon-vue) | Vue 3 components for all 2680+ icons |
| [`reicon-svelte`](https://npmjs.com/package/reicon-svelte) | Svelte components for all 2680+ icons |

---

## Links

- 🌐 Website: [reicon.dev](https://reicon.dev)
- 📖 Documentation: [reicon.dev/docs](https://reicon.dev/docs)
- 📦 npm (React Native): [npmjs.com/package/reicon-react-native](https://npmjs.com/package/reicon-react-native)
- 🐙 GitHub: [github.com/dqev/reicon](https://github.com/dqev/reicon)
- 🐛 Issues: [github.com/dqev/reicon/issues](https://github.com/dqev/reicon/issues)

---

## License

MIT © [Dev Chauhan](https://devchauhan.in)

Free to use in personal and commercial projects.
