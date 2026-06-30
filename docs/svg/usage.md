# Usage of Reicon Raw SVGs & Assets

Download and integrate raw SVG vector files directly into vanilla HTML layouts, static sites, or design platforms. We provide pre-compiled, optimized icon sheets in both Outline and Filled weights.

### 1. Download ZIP Archive

Get the complete, compressed package containing all 2,700+ icons in both Outline and Filled weights (total 5,400+ vectors).

All icons are compressed and optimized for lightweight load speeds, pre-colored in black (#000000) for standard vector previews.

[Download SVG Assets (.zip)](/reicon-icons.zip)

### 2. Embedding in HTML

Use raw SVG code directly in your HTML documents. This allows you to style them dynamically using CSS.

#### Outline Style Integration:
```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- Icon stroke paths -->
</svg>
```

#### Filled Style Integration:
```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="..." fill="currentColor" />
</svg>
```

### 3. Dynamic Styling via CSS

Since Reicon SVGs use `currentColor` for stroke and fill mapping, you can colorize them dynamically by setting the color on parent elements.

Set custom dimensions and hover effects using standard CSS:

```css
.icon-container {
  color: #6C5CE7;
  width: 32px;
  height: 32px;
  transition: color 0.2s;
}
.icon-container:hover {
  color: #5A4BD1;
}
```
