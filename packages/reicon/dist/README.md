<p align="center">
  <a href="https://reicon.dev">
    <img src="https://reicon.dev/jspackage.png" alt="Reicon" width="50%" />
  </a>
</p>

# Reicon
**2680+**+ SVG icons in Outline & Filled weights. Zero dependencies, tree-shakeable, TypeScript-ready.
## Install

```bash
npm i reicon
# or
bun add reicon
```

### CDN (script tag)

```html
<!-- Development version -->
<script src="https://unpkg.com/reicon@latest/umd/reicon.js"></script>

<!-- Production version -->
<script src="https://unpkg.com/reicon@latest"></script>
```

All icons are available on the global `reicon` object:

```html
<script src="https://unpkg.com/reicon@latest"></script>
<script>
  document.body.appendChild(reicon.Home());
  document.body.appendChild(reicon.ShieldCheck({ size: 32, color: '#d97757' }));
  document.body.appendChild(reicon.AltArrowDown({ weight: 'Filled' }));
</script>
```

## Usage

### Create SVG elements

```js
import { Home, ShieldCheck, AltArrowDown } from 'reicon';

// Create an SVG element and append to DOM
document.body.appendChild(Home());
document.body.appendChild(ShieldCheck({ size: 32, color: '#d97757' }));
document.body.appendChild(AltArrowDown({ weight: 'Filled' }));
```

### Get SVG markup as a string

```js
import { Home } from 'reicon';

const svgString = Home.toSvg({ size: 32, color: 'red' });
element.innerHTML = svgString;
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `size` | `number \| string` | `24` | Icon size (number = px) |
| `color` | `string` | `currentColor` | Primary icon color |
| `weight` | `IconWeight` | `Outline` | Icon weight / style |
| `strokeWidth` | `number \| string` | — | Override stroke width |
| `className` | `string` | — | Additional CSS class |
| `attrs` | `object` | — | Extra SVG attributes |

### Weights

- **Outline** — clean outlined style (default)
- **Filled** — solid filled style

```js
import { Home } from 'reicon';

Home()                                  // Outline (default)
Home({ weight: 'Filled' })              // Filled
Home({ weight: 'Filled', color: 'red' })
```

### Direct icon import (smallest bundle)

```js
import Home from 'reicon/icons/Home';
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

```ts
import { Home, IconOptions, IconWeight } from 'reicon';

const weight: IconWeight = 'Filled';
const options: IconOptions = { size: 32, color: '#d97757', weight };

const svg = Home(options);
document.body.appendChild(svg);
```

## License

MIT © [devchauhan](https://devchauhan.in)
