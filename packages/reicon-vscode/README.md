<p align="center">
  <a href="https://reicon.dev">
    <img src="https://raw.githubusercontent.com/dqev/reicon/main/public/og-image.png" alt="Reicon — Free Open-Source Icon Library" width="100%" />
  </a>
</p>

<h1 align="center">Reicon for VS Code</h1>

<p align="center">
  <strong>Browse and insert 2,700+ handcrafted Reicon SVG icons directly into your HTML, React, Vue, Svelte, or vanilla JS code.</strong>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=DevChauhan.reicon"><img src="https://img.shields.io/visual-studio-marketplace/v/DevChauhan.reicon?color=6C5CE7&label=vs%20marketplace" alt="VS Marketplace version" /></a>
  <a href="https://github.com/dqev/reicon/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/icons-2,700%2B-blue" alt="2700+ Icons" />
</p>

<br/>

Reicon for VS Code brings the official, pixel-perfect Reicon library right into your code editor. Browse, search, customize, and insert icons instantly in multiple formats with zero context switching.

---

## 🎨 Features

- **Activity Bar Panel**: A custom sidebar panel that houses the icon browser.
- **2,700+ Pixel-Perfect Icons**: Browse the complete collection in both **Outline** and **Filled** weights.
- **Smart Code Insertion**: Click any icon to instantly insert it at your cursor in your preferred framework syntax:
  - **React (JSX)**: `<Home size={24} color="#6c5ce7" />`
  - **Vue**: `<Home :size="24" color="#6c5ce7" />`
  - **Svelte**: `<Home size={24} color="#6c5ce7" />`
  - **SVG**: Raw SVG code `<svg ...>...</svg>`
- **Live Customization**: Adjust size (in pixels) and color (using preset swatches or hex inputs) directly in the sidebar toolbar before inserting.
- **Smart Theme Adaptation**: Automatically uses `currentColor` by default to match your VS Code theme (automatically switches between dark/light text colors).
- **State Persistence**: Remembers your preferred format, color, size, and category choices between editor sessions.
- **Clipboard Fallback**: Copies the formatted code snippet to your clipboard automatically if no text editor is currently active.

---

## 🚀 Quick Start

1. Install the extension from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=DevChauhan.reicon).
2. Click the **Reicon** logo in the Activity Bar on the left.
3. Search for icons by name, category, or description keywords.
4. Set your preferred **Format** (React, Vue, Svelte, SVG), **Size**, and **Color**.
5. Click on any icon grid card to instantly insert the code at your cursor!

---

## ⚙️ Configuration & Shortcuts

- **Focus Search**: Press `Cmd+F` (Mac) or `Ctrl+F` (Windows/Linux) when the panel is open to instantly focus the search input.
- **Theme Color**: Use the `currentColor` option (the dashed-border swatch) to make icons match the surrounding text color in any editor theme.
- **Resizing Previews**: Open the button menu (top-right) to increase or decrease the preview size of grid glyphs.

---

## 🔗 Links & Resources

- 🌐 **Official Website**: [reicon.dev](https://reicon.dev)
- 📦 **NPM Packages**:
  - React: [`reicon-react`](https://npmjs.com/package/reicon-react)
  - Vue: [`reicon-vue`](https://npmjs.com/package/reicon-vue)
  - Svelte: [`reicon-svelte`](https://npmjs.com/package/reicon-svelte)
  - Core JS: [`reicon`](https://npmjs.com/package/reicon)
- 🎨 **Figma Plugin**: [reicon.dev/figma](https://reicon.dev/figma)
- 🐙 **GitHub Repository**: [github.com/dqev/reicon](https://github.com/dqev/reicon)

---

## 📄 License

MIT © [Dev Chauhan](https://devchauhan.in). Free to use in personal and commercial projects.
