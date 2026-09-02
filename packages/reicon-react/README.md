<div align="center">

<br/>
<br/>

<img src="https://reicon.dev/readme-assets/banner.webp" alt="Reicon React" width="200" />

<br/>

### Official Reicon package for React — open-source icon library for designers & developers

[![npm](https://img.shields.io/npm/v/reicon-react?style=flat-square&label=reicon-react&color=9B8AFB)](https://www.npmjs.com/package/reicon-react)
[![Docs](https://img.shields.io/badge/Docs-reicon.dev-9B8AFB?style=flat-square)](https://reicon.dev/docs/react)
[![License](https://img.shields.io/badge/License-MIT-9B8AFB?style=flat-square)](https://github.com/dqev/reicon/blob/main/LICENSE)

</div>

<br/>

## Installation

```bash
npm install reicon-react
# or
pnpm add reicon-react
# or
yarn add reicon-react
```

## Quick Start

```tsx
import { Home, Search3, HandHeart } from 'reicon-react';

export default function App() {
  return (
    <div>
      <Home size={24} color="#9B8AFB" />
      <Search3 size={20} weight="Filled" />
      <HandHeart size={24} className="text-purple-500" />
    </div>
  );
}
```

## Component Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `size` | `number | string` | `24` | Icon width and height in pixels. |
| `weight` | `'Outline' | 'Filled'` | `'Outline'` | Visual weight style. |
| `color` | `string` | `'currentColor'` | Icon fill or stroke color. |
| `className` | `string` | `undefined` | Custom CSS classes. |

## License

Free for commercial and personal use under the [MIT License](https://github.com/dqev/reicon/blob/main/LICENSE).

## Credits

Thank you to all the people who contributed and supported Reicon!

<a href="https://github.com/dqev/reicon/stargazers">
  <img src="https://reicon.dev/readme-assets/stargazers.webp" alt="Reicon Stargazers & Contributors" width="800" />
</a>
