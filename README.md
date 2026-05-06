<p align="center">
  <a href="https://reicon.dev">
    <img src="public/og-image.png" alt="Reicon — Free Open-Source Icon Library" width="100%" />
  </a>
</p>

<h1 align="center">Reicon</h1>

<p align="center">
  <strong>Free, open-source icon library built with obsessive precision.</strong><br />
  1700+ handcrafted, pixel-perfect SVG icons for React, Figma, and the web.
</p>

<p align="center">
  <a href="https://reicon.dev">Website</a> ·
  <a href="https://reicon.dev/icons">Browse Icons</a> ·
  <a href="https://reicon.dev/usage">Usage Guide</a> ·
  <a href="https://www.npmjs.com/package/reicon-react">npm</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/reicon-react"><img src="https://img.shields.io/npm/v/reicon-react?color=6C5CE7&label=reicon-react" alt="reicon-react version" /></a>
  <a href="https://www.npmjs.com/package/reicon-react"><img src="https://img.shields.io/npm/dm/reicon-react?color=6C5CE7&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/devchauhann/reicon/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" /></a>
  <a href="https://reicon.dev/icons"><img src="https://img.shields.io/badge/icons-1700%2B-blue" alt="1700+ Icons" /></a>
  <a href="https://www.npmjs.com/package/reicon-react"><img src="https://img.shields.io/bundlephobia/minzip/reicon-react?color=6C5CE7&label=size" alt="bundle size" /></a>
</p>

---

## Features

- **1700+ Icons** — Outline and Filled weights for every icon
- **Pixel Perfect** — Every icon snaps to a 24x24 grid
- **Handcrafted** — No auto-generation, each icon is manually designed
- **Tree Shakeable** — Import only what you use
- **Zero Dependencies** — Lightweight and self-contained
- **MIT Licensed** — Free forever for personal and commercial use

## Quick Start

### React

```bash
npm install reicon-react
```

```jsx
import { Home } from 'reicon-react';

<Home size={24} weight="outline" />
```

### CDN (Vanilla HTML/JS)

```html
<script src="https://cdn.reicon.dev/cdn/reicon.min.js"></script>

<re-icon icon="home" size="24"></re-icon>
```

## Available Weights

Every icon comes in two weights:

| Weight | Description |
|--------|-------------|
| **Outline** | Clean stroke-based icons (default) |
| **Filled** | Solid filled variants |

```jsx
<Home weight="outline" />
<Home weight="filled" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` or `string` | `24` | Icon size in pixels |
| `weight` | `"outline"` or `"filled"` | `"outline"` | Icon weight variant |
| `color` | `string` | `currentColor` | Icon color |
| `className` | `string` | — | Additional CSS classes |

## Direct Import

For maximum tree-shaking, import icons directly:

```jsx
import Home from 'reicon-react/icons/Home';
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Generate sitemap
npm run sitemap
```

## Tech Stack

- **Framework** — React 19 + TypeScript
- **Build** — Vite
- **Styling** — Tailwind CSS v4
- **Routing** — React Router v7
- **Icons** — [reicon-react](https://www.npmjs.com/package/reicon-react)
- **Hosting** — Vercel

## Links

- [Website](https://reicon.dev)
- [npm](https://www.npmjs.com/package/reicon-react)
- [GitHub](https://github.com/devchauhann/reicon)
- [LinkedIn](https://www.linkedin.com/company/reicon-dev)
- [Bluesky](https://bsky.app/profile/reicondev.bsky.social)

## License

MIT - [Dev Chauhan](https://devchauhan.in)