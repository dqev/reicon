# Accessibility

Reicon components pass all extra props (including ARIA attributes) directly to the underlying `<svg>` element. Use these patterns to make your icons accessible.

---

## Decorative Icons
Icons that are purely visual (next to text labels) should be hidden from screen readers with `aria-hidden`.
```jsx
<button>
  <Home size={20} aria-hidden="true" />
  Settings
</button>
```

---

## Informational Icons
Icons that convey meaning without accompanying text need an accessible label. Use `aria-label` and `role="img"` so screen readers announce them.
```jsx
<AlertTriangle
  size={20}
  color="#ef4444"
  role="img"
  aria-label="Warning"
/>
```

---

## Icon-Only Buttons
For buttons that contain only an icon, add `aria-label` to the button itself and hide the icon from the accessibility tree.
```jsx
<button aria-label="Close dialog">
  <X size={20} aria-hidden="true" />
</button>

<button aria-label="Delete item">
  <Trash size={20} aria-hidden="true" />
</button>
```

---

## Ref Forwarding
All Reicon components use `forwardRef`, so you can attach a ref to the underlying SVG for focus management or measurements.
```jsx
import { useRef } from 'react';
import { Star } from 'reicon-react';

function App() {
  const iconRef = useRef(null);
  return <Star ref={iconRef} size={24} tabIndex={0} />;
}
```

> **Tip:** Since Reicon passes all props to the SVG element, you can use any standard SVG or ARIA attribute — `focusable`, `tabIndex`, `onFocus`, etc.
