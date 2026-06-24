# Troubleshooting

Common issues and their solutions. If you don't find your answer here, open an issue on the [Reicon GitHub Issues tracker](https://github.com/dqev/reicon/issues).

---

## 1. Icons are not rendering (CDN)
Make sure the CDN script is loaded before any `<re-icon>` elements. Place the script tag in your `<head>` or before your markup.
```html
<!-- ✅ Place in <head> -->
<script src="https://unpkg.com/reicon/cdn/reicon.min.js"></script>
```

---

## 2. Wrong icon weight showing
The `weight` prop is case-sensitive in the React/Vue packages. Use `"Outline"` or `"Filled"` (PascalCase). In the CDN, use lowercase: `"outline"` or `"filled"`.
```jsx
// ✅ React / Vue — PascalCase
<Star weight="Filled" />

// ✅ CDN — lowercase
<re-icon icon="star" weight="filled"></re-icon>
```

---

## 3. TypeScript can't find icon names
Make sure you're importing from the correct package depending on your environment (e.g. `"reicon"` for vanilla JS or `"reicon-react"` for React). Both packages ship with full type definitions. If autocomplete isn't working, restart your TypeScript server.
```typescript
// ✅ For React projects
import { Home } from 'reicon-react';

// ✅ For vanilla JS projects
import { Home } from 'reicon';
```

---

## 4. Bundle size is too large
Avoid wildcard or star imports — they pull in every icon and defeat tree-shaking.
```javascript
// ❌ Pulls in everything
import * as Icons from 'reicon';

// ✅ Tree-shakeable
import { Home, Bell } from 'reicon';

// ✅ Smallest possible
import Home from 'reicon/icons/Home';
```

---

## 5. Icon color not changing
Icons use `currentColor` by default. If you set a `color` prop, it overrides inheritance. Check that no parent CSS is overriding the color. For Tailwind, use `text-*` utilities on the icon's `className`.
```jsx
// Color via prop
<Heart color="#ef4444" />

// Color via Tailwind
<Heart className="text-red-500" />

// Color via parent inheritance
<div style={{ color: "#ef4444" }}>
  <Heart />  {/* inherits red */}
</div>
```
