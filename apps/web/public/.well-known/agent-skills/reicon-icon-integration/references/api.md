# Reicon Framework API Reference

## Common Component Props & Attributes

| Prop / Attribute | Type | Default | Description |
|---|---|---|---|
| `size` | `number \| string` | `24` | Icon width and height in pixels (or CSS unit for Web Component) |
| `color` | `string` | `"currentColor"` | Primary stroke or fill color |
| `secondaryColor` | `string` | same as `color` | Secondary accent color for duo-tone icons |
| `weight` | `"Outline" \| "Filled"` | `"Outline"` | Style variant (PascalCase in JSX/Vue/Svelte, lowercase in Web Component) |
| `strokeWidth` | `number \| string` | `1.5` | Override stroke weight for outline variants |
| `className` / `class` | `string` | — | Additional CSS classes |

## Tree-shaking Deep Imports

- **React**: `import Home from 'reicon-react/icons/Home'`
- **Vue**: `import Home from 'reicon-vue/icons/Home'`
- **Svelte**: `import Home from 'reicon-svelte/icons/Home.svelte'`
- **React Native**: `import Home from 'reicon-react-native/icons/Home'`
- **Vanilla JS**: `import Home from 'reicon/icons/Home'`
