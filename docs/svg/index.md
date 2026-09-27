# Reicon Raw SVGs & Assets Guide

Download and integrate raw SVG vector files directly into vanilla HTML layouts, static sites, build tools, or design platforms. We provide pre-compiled, optimized icon sheets in both Outline and Filled weights.

---

### What You Can Accomplish
- Download all 2,700+ icons as individual SVG files (5,400+ vectors total)
- Embed inline SVGs into any HTML document with full CSS control
- Load vector assets dynamically via CDN links (jsDelivr, unpkg)
- Create SVG sprite sheets using `<svg><use href="#id" /></svg>`
- Apply dynamic colors and hover effects using CSS `currentColor`
- Zero JavaScript dependencies or bundler requirements

---

### 1. Download ZIP Archive

Get the complete, compressed package containing all 2,700+ icons in both Outline and Filled weights (total 5,400+ vectors). All icons are compressed and optimized for lightweight load speeds, pre-colored in black (`#000000`) for standard vector previews.

[Download SVG Assets (.zip)](/reicon-icons.zip)

---

### 2. CDN & Direct URLs

Fetch raw SVG vectors on-demand via high-speed global CDNs without installing local packages:

```html
<!-- jsDelivr CDN -->
<img src="https://cdn.jsdelivr.net/npm/reicon@latest/icons/outline/home.svg" width="24" height="24" alt="Home" />

<!-- unpkg CDN -->
<img src="https://unpkg.com/reicon@latest/icons/filled/star.svg" width="24" height="24" alt="Star" />
```

---

### 3. Embedding in HTML

Use raw SVG code directly in your HTML documents for instant rendering and dynamic CSS styling.

#### Outline Style Integration:
```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  <polyline points="9 22 9 12 15 12 15 22" />
</svg>
```

#### Filled Style Integration:
```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
</svg>
```

---

### 4. SVG Sprites & `<use>` Tags

Combine multiple icons into a single SVG sprite sheet to minimize HTTP requests:

```html
<!-- Sprite Definition -->
<svg style="display: none;">
  <g id="icon-home">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="1.5" fill="none"/>
  </g>
</svg>

<!-- Usage in HTML -->
<svg class="icon" width="24" height="24">
  <use href="#icon-home" />
</svg>
```

---

### 5. Dynamic Styling via CSS

Since Reicon SVGs use `currentColor` for stroke and fill mapping, you can colorize them dynamically by setting the color on parent elements:

```css
.icon-container {
  color: #9B8AFB;
  width: 32px;
  height: 32px;
  transition: color 0.2s ease, transform 0.2s ease;
}

.icon-container:hover {
  color: #8B7AFB;
  transform: scale(1.1);
}
```

---

### 6. SVGO Optimization

All Reicon raw SVGs are pre-processed with SVGO:
- Removed unnecessary metadata, comments, and hidden layers
- Precision-rounded vector path coordinates for minimal byte size
- Guaranteed `viewBox="0 0 24 24"` aspect ratio box on all icons
