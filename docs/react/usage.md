# Usage of Reicon React

The official React package for Reicon. Import beautifully crafted icons as React components with full TypeScript support. All icons are tree-shakeable, ensuring only the icons you actually use end up in your bundle.

## What you can accomplish
- Import icons as individual React components
- Customize size, color, and weight via props
- Tree-shake unused icons to keep bundle sizes minimal
- Full TypeScript support with autocompletion
- Use icons in Next.js, Vite, Create React App, and more
- Apply CSS classes and inline styles directly

---

## Installation
```bash
npm install reicon-react
# or
yarn add reicon-react
# or
pnpm add reicon-react
```

---

## Basic Usage
Import icons by their PascalCase name from `reicon-react`. Each icon is a React component that accepts standard props.
```jsx
import { Home, ShieldCheck, Bell } from 'reicon-react';

function App() {
  return (
    <div>
      <Home size={24} />
      <ShieldCheck size={24} color="#6C5CE7" />
      <Bell size={24} weight="Filled" />
    </div>
  );
}
```

---

## Customizing Icons
Every icon component accepts the following props to customize its appearance. You can also pass any standard HTML/SVG attributes.
```jsx
// Size
<Home size={16} />
<Home size={24} />
<Home size={32} />

// Color
<Heart color="#ef4444" />
<Heart color="rgb(99, 102, 241)" />

// Weight
<Star />                     // Outline (default)
<Star weight="Filled" />     // Filled

// ClassName
<Home className="text-blue-500 hover:text-blue-600" />
```

---

## Direct Import for Smaller Bundles
For the absolute smallest bundle size, you can import each icon directly from its own module. This guarantees only that single icon's code is included, which is ideal for production apps.
```jsx
import Home from 'reicon-react/icons/Home';
import ShieldCheck from 'reicon-react/icons/ShieldCheck';
```
> **Tip:** Direct imports are recommended for production apps where bundle size matters. Each icon is its own module, so the bundler can't accidentally pull in other icons.

---

## Using with Tailwind CSS
Reicon works seamlessly with Tailwind CSS. Use the `className` prop to apply Tailwind utilities. The icon inherits `currentColor` by default, so Tailwind's text color classes work out of the box.
```jsx
<Home className="text-gray-500 hover:text-gray-700 w-6 h-6 transition-colors" />

<button className="flex items-center gap-2 text-white">
  <ShieldCheck size={20} className="text-green-500" />
  Verified
</button>
```

---

## Full Component Example
Here's a complete example of a React component using multiple Reicon icons with different configurations.
```jsx
import { Home, Bell, User, Star, ShieldCheck } from 'reicon-react';

export default function Navbar() {
  return (
    <nav className="flex items-center gap-4 p-4">
      <Home size={20} />
      <Bell size={20} />
      <User size={20} />
      <Star size={20} weight="Filled" color="#f59e0b" />
      <ShieldCheck size={20} color="#6C5CE7" />
    </nav>
  );
}
```

> **Note:** All icon components are SSR-compatible and work with Next.js, Remix, and other React frameworks out of the box.
