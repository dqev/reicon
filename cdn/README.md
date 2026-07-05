<p align="center">
  <a href="https://reicon.dev">
    <img src="https://raw.githubusercontent.com/dqev/reicon/main/public/readme-banner.png" alt="Reicon — Free Open-Source Icon Library" width="100%" />
  </a>
</p>

# 🌐 CDN Distribution Directory

This folder holds the compiled, self-contained JavaScript files ready for serving via Content Delivery Networks (like jsDelivr, unpkg, or Vercel edge routes).

## 🗂️ What's Inside

> **Note:** These files are git-ignored and automatically generated during compilation.

* **`reicon.js`**: Core vanilla JS runtime bundle containing all standard icons registered as custom web components (e.g. `<re-icon name="arrow-up"></re-icon>`).
* **`reicon.min.js`**: Production-optimized, mangled, and compressed version of the core runtime.
* **`reicon-brands.js` / `reicon-brands.min.js`**: Specialized bundles containing custom brand and social media icons.

## 🛠️ How to Generate

1. The raw bundles are built from `packages/reicon/scripts/build.cjs` by running:
   ```bash
   npm run build:js
   ```
2. The minified files are generated using Terser:
   ```bash
   npm run build:cdn:min
   ```
   *Alternative:* Run the comprehensive build script `npm run build:packages` which generates and minifies all assets at once.
