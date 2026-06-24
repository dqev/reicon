# Usage of Reicon Vanilla JS & CDN

The official vanilla JavaScript package and CDN web components for Reicon. This package allows you to easily add precise, vector-based SVG icons to any JavaScript project or web application without framework dependencies.

## What you can accomplish
- Import individual icons as DOM element factories in vanilla JS
- Fetch SVG markup as strings directly (fully SSR/Node.js compatible)
- Register and render custom elements (`<re-icon>`) inside HTML templates or SPAs
- Load all icons via CDN script tags without build steps or bundlers
- Tree-shake unused icons automatically when using modern bundlers

---

## 1. Vanilla JS / Bundler (NPM)

Install the package using your preferred package manager and import tree-shakeable icons directly in your application code.

### Installation
```bash
npm install reicon
# or
yarn add reicon
# or
pnpm add reicon
```

### Creating DOM Elements
Import named icons directly from `reicon`. Each icon is a factory function that returns a native `SVGSVGElement`.
```javascript
import { Home, ShieldCheck } from 'reicon';

// Create SVG elements
const home = Home({ size: 24 });
const shield = ShieldCheck({ size: 32, color: '#6C5CE7', weight: 'Filled' });

// Append directly to document
document.body.appendChild(home);
document.body.appendChild(shield);
```

### Server-Side Rendering (SSR) & SVG Strings
To render icons on the server (SSR, Node.js, or framework environments), use the `toSvg()` method on the icon functions. This returns raw SVG strings without using DOM APIs.
```javascript
import { Home } from 'reicon';

// Get raw SVG string - works on server side!
const svgString = Home.toSvg({ size: 24, color: 'currentColor' });

// Inject into HTML output
res.send(`<div class="icon-wrap">${svgString}</div>`);
```

### Registering Custom Element (`<re-icon>`)
You can register and import the web component runtime right from your npm installation. Simply import `reicon/element` once in your application entry point.
```javascript
import 'reicon/element';

// Now use <re-icon icon="home"></re-icon> in your HTML templates!
```

### Direct Import for Smallest Bundles
For optimal build performance, import individual icons directly from their path:
```javascript
import Home from 'reicon/icons/Home';
const homeSvg = Home({ size: 24 });
```

---

## 2. CDN & HTML (No Build Tools)

Perfect for static HTML websites, legacy applications, and prototyping. Include a script tag and render icons instantly.

### Register Custom Element (`<re-icon>`)
Include the script tag inside your HTML page. This registers a reactive `<re-icon>` component that supports dynamic styling, sizes, weights, and gradients.
```html
<script src="https://unpkg.com/reicon/cdn/reicon.min.js"></script>
```
*Or load a specific version:* `https://unpkg.com/reicon@latest/cdn/reicon.min.js`

### Basic CDN Usage
Simply add the `<re-icon>` tags directly in your HTML:
```html
<re-icon icon="home"></re-icon>
<re-icon icon="shield-check" weight="filled" size="32" color="#6C5CE7"></re-icon>
```

### Load Functions globally via Script tag
If you want to use the global `reicon` object functions directly in a browser script tag:
```html
<script src="https://unpkg.com/reicon@latest/umd/reicon.js"></script>
<script>
  // Create icon elements via global object
  document.body.appendChild(reicon.Home({ size: 32 }));
</script>
```

### Customizing Elements (Attributes)
You can customize `<re-icon>` elements using reactive HTML attributes. Updates will be rendered instantly.
```html
<!-- Size -->
<re-icon icon="home" size="16"></re-icon>
<re-icon icon="home" size="32"></re-icon>

<!-- Color -->
<re-icon icon="heart" color="#ef4444"></re-icon>
<re-icon icon="heart" color="rgb(99, 102, 241)"></re-icon>

<!-- Weight -->
<re-icon icon="star" weight="outline"></re-icon>
<re-icon icon="star" weight="filled"></re-icon>
```

### Styling with CSS
The `<re-icon>` element acts like an inline block. It automatically inherits its parent's text color, allowing CSS utility-classes to adjust color naturally.
```html
<style>
  .icon-primary {
    color: #6C5CE7;
  }
</style>

<re-icon icon="home" class="icon-primary"></re-icon>

<!-- Inherits color from parent -->
<div style="color: #ef4444;">
  <re-icon icon="heart"></re-icon>
</div>
```

### Full Example HTML Page
A complete HTML document importing Reicon via CDN and showcasing customizations:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reicon Page</title>
  <script src="https://unpkg.com/reicon@latest/cdn/reicon.min.js"></script>
</head>
<body>
  <nav>
    <re-icon icon="home" size="20"></re-icon>
    <re-icon icon="user" size="20"></re-icon>
  </nav>
  <main>
    <h1>
      <re-icon icon="shield-check" size="28" weight="filled" color="#6C5CE7"></re-icon>
      App Verified
    </h1>
  </main>
</body>
</html>
```

> **Note:** If you are compiling your project with modern bundlers (e.g. Vite, Webpack, rollup), prefer installing via `npm install reicon` to enjoy full tree-shaking, static typing, and faster loading speeds.
