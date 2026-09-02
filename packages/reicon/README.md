<div align="center">

<br/>
<br/>

<img src="https://reicon.dev/readme-assets/banner.webp" alt="Reicon" width="200" />

<br/>

### Official Reicon core package — open-source icon library for designers & developers

[![npm](https://img.shields.io/npm/v/reicon?style=flat-square&label=reicon&color=9B8AFB)](https://www.npmjs.com/package/reicon)
[![Docs](https://img.shields.io/badge/Docs-reicon.dev-9B8AFB?style=flat-square)](https://reicon.dev/docs/vanilla)
[![License](https://img.shields.io/badge/License-MIT-9B8AFB?style=flat-square)](https://github.com/dqev/reicon/blob/main/LICENSE)

</div>

<br/>

## Installation

```bash
npm install reicon
# or
pnpm add reicon
# or
yarn add reicon
```

## Quick Start

```js
import { Home, Search3, HandHeart } from 'reicon';

// Appends SVG elements directly
document.body.appendChild(Home({ size: 24, color: '#9B8AFB' }));
document.body.appendChild(Search3({ size: 20, weight: 'Filled' }));
document.body.appendChild(HandHeart({ size: 24 }));
```

### CDN / HTML Script Tag

```html
<script src="https://unpkg.com/reicon/cdn/reicon.js"></script>

<re-icon icon="home" size="24"></re-icon>
```

## Options & Props

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `size` | `number | string` | `24` | Icon width and height in pixels. |
| `weight` | `'Outline' | 'Filled'` | `'Outline'` | Visual weight style. |
| `color` | `string` | `'currentColor'` | Icon fill or stroke color. |
| `className` | `string` | `undefined` | Custom CSS classes on the SVG element. |

## License

Free for commercial and personal use under the [MIT License](https://github.com/dqev/reicon/blob/main/LICENSE).

## Credits

Thank you to all the people who contributed and supported Reicon!

<a href="https://github.com/dqev/reicon/stargazers">
  <img src="https://reicon.dev/readme-assets/stargazers.webp" alt="Reicon Stargazers & Contributors" width="800" />
</a>
