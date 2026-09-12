<div align="center">

<br/>
<br/>

<img src="https://reicon.dev/readme-assets/banner.webp" alt="Reicon Astro" width="200" />

<br/>

### Official Reicon package for Astro — open-source icon library for designers & developers

[![npm](https://img.shields.io/npm/v/reicon-astro?style=flat-square&label=reicon-astro&color=9B8AFB)](https://www.npmjs.com/package/reicon-astro)
[![Docs](https://img.shields.io/badge/Docs-reicon.dev-9B8AFB?style=flat-square)](https://reicon.dev/docs/astro)
[![License](https://img.shields.io/badge/License-MIT-9B8AFB?style=flat-square)](https://github.com/dqev/reicon/blob/main/LICENSE)

</div>

<br/>

## Installation

```bash
npm install reicon-astro
# or
pnpm add reicon-astro
# or
yarn add reicon-astro
```

## Quick Start

```astro
---
import { Home, ShieldCheck, AltArrowDown } from 'reicon-astro';
---

<div>
  <Home size={24} color="#9B8AFB" />
  <ShieldCheck size={20} weight="Filled" />
  <AltArrowDown size={24} class="text-purple-500" />
</div>
```

## Direct Subpath Import

```astro
---
import Home from 'reicon-astro/icons/Home.astro';
import ShieldCheck from 'reicon-astro/icons/ShieldCheck.astro';
---
```

## Component Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `size` | `number | string` | `24` | Icon width and height in pixels. |
| `weight` | `'Outline' | 'Filled'` | `'Outline'` | Visual weight style. |
| `color` | `string` | `'currentColor'` | Icon fill or stroke color. |
| `class` | `string` | `undefined` | Custom CSS classes. |

## License

Free for commercial and personal use under the [MIT License](https://github.com/dqev/reicon/blob/main/LICENSE).

## Credits

Thank you to all the people who contributed and supported Reicon!

<a href="https://github.com/dqev/reicon/stargazers">
  <img src="https://reicon.dev/readme-assets/stargazers.webp" alt="Reicon Stargazers & Contributors" width="800" />
</a>
