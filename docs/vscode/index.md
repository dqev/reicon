# Reicon VS Code Extension Guide

Browse, configure, and insert Reicon code snippets directly into your HTML, React, Vue, Svelte, or vanilla JS code from your editor's sidebar panel in Visual Studio Code and Google Antigravity IDE.

---

### What You Can Accomplish
- Search 2,700+ icons right inside your code editor
- Copy formatted code snippets for React, Vue, Svelte, HTML, and raw SVG
- Insert code directly into your cursor location in active files
- Customize icon size, stroke width, and color before insertion
- Native support for Open VSX Registry (`dqev.reicon`) and Google Antigravity IDE
- Instant preview with light and dark theme adaptation

---

### 1. Installation

Find and install the official extension from the Visual Studio Code Marketplace or Open VSX Registry:

- [Open VSX Registry Page](https://open-vsx.org/extension/dqev/reicon)

#### Install via Editor Panel:
Open the Extensions panel in VS Code or Antigravity IDE (`Cmd+Shift+X` or `Ctrl+Shift+X`), search for **Reicon** (`dqev.reicon`), and click **Install**.

#### Install via Command Line:
```bash
code --install-extension dqev.reicon
```

---

### 2. Workflow & Sidebar Panel

1. **Open the Sidebar Explorer**: Click on the **Reicon** icon in the Activity Bar on the left toolbar.
2. **Select Code Snippet Format**: Choose your target format (React, Vue, Svelte, HTML, or Raw SVG).
3. **Configure Options**: Adjust target size (`24px`, `32px`), stroke weight (`1.5px`), and color (`currentColor` or custom hex).
4. **Click to Insert**: Click any icon card to insert the code directly into your active text editor cursor position.

---

### 3. Snippet Formats & Autocomplete

Reicon VS Code extension generates production-ready imports and component JSX:

#### React JSX Snippet:
```jsx
import { Home } from 'reicon-react';

<Home size={24} color="currentColor" />
```

#### Vue Component Snippet:
```vue
<script setup>
import { ReiconHome } from 'reicon-vue';
</script>

<template>
  <ReiconHome :size="24" color="currentColor" />
</template>
```

#### Svelte Snippet:
```svelte
<script>
  import Home from 'reicon-svelte/Home.svelte';
</script>

<Home size={24} color="currentColor" />
```

---

### 4. Antigravity IDE & AI Agent Integration

Reicon includes native integration for **Google Antigravity IDE** via the Open VSX Registry (`dqev.reicon`):

- **MCP Tool Integration**: Pair the extension with `reicon-mcp` and `@antigravity` agent workflows to let AI agents search and place icons automatically.
- **Context-Aware Insertion**: Antigravity agents can inspect your project setup and select the appropriate framework package (`reicon-react`, `reicon-vue`, etc.).
- **Direct SVG Injection**: Insert optimized SVG components directly into AI-generated web layouts.

---

### 5. Shortcuts & Extension Settings

- `Cmd+Shift+X` / `Ctrl+Shift+X`: Toggle Extensions panel.
- Customize default format setting in `settings.json`:
```json
{
  "reicon.defaultFormat": "react",
  "reicon.defaultSize": 24,
  "reicon.defaultColor": "currentColor"
}
```
