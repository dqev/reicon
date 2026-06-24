# Props Reference

All available props/attributes for both the package components (React, Vue) and the CDN custom element.

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number \| string` | `24` | Icon size in pixels |
| `color` | `string` | `currentColor` | Any valid CSS color |
| `weight` | `"Outline" \| "Filled"` (lowercase `"outline" \| "filled"` in CDN) | `Outline` | Icon weight variant |
| `strokeWidth` | `number \| string` | — | Override stroke width on outline icons |
| `secondaryColor` | `string` | same as color | Secondary color for dual-tone icons |
| `className` (or `class` in CDN/Vue) | `string` | — | Additional CSS classes |
| `ref` | `Ref<SVGSVGElement>` | — | Ref forwarded to the SVG element |
