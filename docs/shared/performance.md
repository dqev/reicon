# Performance & Tree-Shaking

All Reicon packages (`reicon`, `reicon-react`, `reicon-vue`) declare `"sideEffects": false` in their package configurations. Modern bundlers (Vite, Webpack, Rollup) automatically eliminate unused icons from your production bundle.

---

## Named Imports (Recommended)
Import icons by name from the main entry point. Your bundler will strip out everything you don't use.
```javascript
// Only Home and Bell are included in the bundle
import { Home, Bell } from 'reicon'; // or 'reicon-react' or 'reicon-vue'
```

---

## Direct Imports (Smallest Bundle)
For absolute minimal bundle size, import each icon directly from its own module. This guarantees only that single icon's code is included — no bundler analysis needed.
```javascript
// Guaranteed single-icon inclusion
import Home from 'reicon/icons/Home';
import Bell from 'reicon/icons/Bell';
```

---

## What to Avoid
Avoid wildcard or star imports — they pull in every icon in the package and defeat tree-shaking.
```javascript
// ❌ Imports ALL icons — entire library in bundle
import * as Icons from 'reicon';

// ❌ Re-exporting everything defeats tree-shaking
export * from 'reicon';
```

---

## CDN Performance
When using the CDN element, icons are fetched on demand and cached in the browser. Subsequent page loads use the cached SVGs — no duplicate network requests.

| Method | Bundle Impact | Best For |
|---|---|---|
| `reicon` | Only used icons | Vanilla JS, SPAs, custom setups |
| `reicon/icons/*` | Single icon per import | Production builds (Vanilla JS) |
| `reicon-react` | Only used icons | React / Next.js apps |
| `reicon-vue` | Only used icons | Vue / Nuxt apps |
| `CDN script` | On-demand fetching | Static sites, quick prototyping |
