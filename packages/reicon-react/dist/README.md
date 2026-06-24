# Reicon

React icon components for **2680+** icons in **2 weights** (Outline & Filled) — tree-shakeable, TypeScript-ready, zero config.

## Install

```bash
npm i reicon-react
```

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
| `size` | `number \| string` | `24` | Icon size (number = px) |
| `color` | `string` | `currentColor` | Primary icon color |
| `secondaryColor` | `string` | same as color | Secondary color |
| `weight` | `IconWeight` | `Outline` | Icon weight / style |
| `strokeWidth` | `number \| string` | — | Override stroke width |
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

## Icon Names

Icons use PascalCase names derived from their kebab-case originals:

| Original | Import |
|----------|--------|
| `home` | `Home` |
| `shield-check` | `ShieldCheck` |
| `alt-arrow-down` | `AltArrowDown` |
| `shopping-cart` | `ShoppingCart` |

## TypeScript

Full TypeScript support out of the box:

```tsx
import { Home, IconProps, IconWeight } from 'reicon-react';

const weight: IconWeight = 'Filled';
const props: IconProps = { size: 32, color: '#d97757', weight };

<Home {...props} />
```

## License

MIT © [devchauhan](https://devchauhan.in)
