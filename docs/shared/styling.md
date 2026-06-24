# Styling & Color

Reicon icons render as standard inline SVG elements that inherit parent styles, making them extremely customizable. By default, they inherit `currentColor` so they match the surrounding text color.

---

## Color Inheritance
With no `color` prop, icons inherit the text color of their parent elements.
```jsx
<div style={{ color: "#6C5CE7" }}>
  <Home size={20} />       {/* purple */}
  <Bell size={20} />        {/* purple */}
</div>

<div style={{ color: "#ef4444" }}>
  <Heart size={20} />       {/* red */}
</div>
```

---

## Stroke Width
Adjust the thickness of outline icons using the `strokeWidth` prop. This overrides the default stroke width on stroked paths:
```jsx
<Home strokeWidth={1} />      // Thin
<Home strokeWidth={1.5} />    // Default (Medium)
<Home strokeWidth={2.5} />    // Bold
```

---

## CSS Animations
Apply transition classes, transforms, or hover transitions directly:
```css
/* CSS */
@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes pulse {
  50% { opacity: 0.5; }
}
.icon-spin { animation: spin 1s linear infinite; }
.icon-pulse { animation: pulse 2s ease-in-out infinite; }
```
```jsx
/* JSX / HTML */
<Loader className="icon-spin" size={20} />
<Bell className="icon-pulse" size={20} />
```

---

## Inline Styles
The `style` prop merges directly with the SVG element's attributes:
```jsx
<Heart
  size={24}
  style={{
    transition: "transform 0.2s ease",
    cursor: "pointer",
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
/>
```
