<div align="center">

<br/>
<br/>

<img src="https://reicon.dev/readme-assets/banner.webp" alt="Reicon" width="200" />

<br/>

### Official Reicon file icon package – open-source file icons for designers & developers

[![npm](https://img.shields.io/npm/v/reicon-file?style=flat-square&label=reicon-file&color=9B8AFB)](https://www.npmjs.com/package/reicon-file)
[![Docs](https://img.shields.io/badge/Docs-reicon.dev-9B8AFB?style=flat-square)](https://reicon.dev/docs/vanilla)
[![License](https://img.shields.io/badge/License-MIT-9B8AFB?style=flat-square)](https://github.com/dqev/reicon/blob/main/LICENSE)

</div>

<br/>

## Installation

```bash
npm install reicon-file
# or
pnpm add reicon-file
# or
yarn add reicon-file
```

## Quick Start

```js
import { Github, Figma, Npm } from 'reicon-file';

document.body.appendChild(Github({ size: 24, color: '#9B8AFB' }));
document.body.appendChild(Figma({ size: 32 }));
```

### CDN / HTML Script Tag

```html
<script src="https://unpkg.com/reicon-file/cdn/reicon-file.js"></script>

<re-file icon="github" size="24"></re-file>
```

## Options & Props

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `size` | `number \| string` | `24` | Icon width and height in pixels. |
| `color` | `string` | `'currentColor'` | Icon fill color. |
| `className` | `string` | `undefined` | Custom CSS classes on the SVG element. |

## License

Free for commercial and personal use under the [MIT License](https://github.com/dqev/reicon/blob/main/LICENSE).

## Credits

Thank you to all the people who contributed and supported Reicon!

<a href="https://github.com/dqev/reicon/stargazers">
  <img src="https://reicon.dev/readme-assets/stargazers.webp" alt="Reicon Stargazers & Contributors" width="800" />
</a>
