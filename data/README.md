# Reicon data

This folder holds the **single source of truth** for every Reicon icon.

## `icon-data.json`

The canonical dataset. Everything downstream — the npm packages, the CDN bundle,
the website, and the pre-rendered SEO pages — is generated from this one file.

### Shape

```jsonc
{
  "categories": {
    "<category-key>": {
      "icons": {
        "<icon-name>": {
          "description": ["search", "tags"],   // optional
          "weights": {
            "Outline": { "code": "<svg>…</svg>" },
            "Filled":  { "code": "<svg>…</svg>" }
          }
        }
      }
    }
  }
}
```

- **Icon names** are `kebab-case` (e.g. `arrow-up-right`) and become `PascalCase`
  component names in the packages (`ArrowUpRight`).
- **Weights** are `Outline` and `Filled`. SVG `code` is the full `<svg>` markup;
  build scripts strip the wrapper and normalize `fill="white"` → `currentColor`.
- Current size: **38 categories**, **2,680 icons**.

### `icon-tags.json` (optional)

A `{ "<icon-name>": ["tag", "tag"] }` map used to enrich search/SEO metadata.
If present, build scripts merge it; if absent, they fall back to each icon's
inline `description`.

## How it's consumed

| Output | Built by | Command |
|--------|----------|---------|
| `packages/reicon-react/dist` | `packages/reicon-react/scripts/build.cjs` | `npm run build:react` |
| `packages/reicon-vue/dist`   | `packages/reicon-vue/scripts/build.cjs`   | `npm run build:vue` |
| `packages/reicon/dist`       | `packages/reicon/scripts/build.cjs`       | `npm run build:js` |
| `cdn/reicon.js`              | `packages/reicon/scripts/build-cdn.cjs`   | `npm run build:cdn` |
| Website SEO pages & OG images | `scripts/prerender-meta.mjs`, `scripts/generate-og-images.mjs` | `npm run build` |

Build everything at once:

```bash
npm run build:packages
```

> ⚠️ Edit icons here in data, never in the package outputs. Builds are run to keep packages in sync.

