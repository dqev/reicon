<p align="center">
  <a href="https://reicon.dev">
    <img src="../public/readme-banner.png" alt="Reicon — Free Open-Source Icon Library" width="100%" />
  </a>
</p>

# 📊 Reicon Dataset (Single Source of Truth)

This folder holds the **single source of truth** for every Reicon icon.

## `icon-data.json`

The canonical dataset. Everything downstream — the CDN bundle, the website, the SEO pre-rendered pages, and the npm packages — is generated from this one file.

### Full schema

```jsonc
{
  "version": "1.0.0",
  "categories": {
    "<category-key>": {              // lowercase kebab, e.g. "arrows", "ui", "files"
      "icons": {
        "<icon-name>": {             // lowercase kebab, e.g. "arrow-down", "home-2"
          "description": ["tag", "alias"],   // optional — used for search & SEO
          "contributor": {                   // optional — only for community icons
            "github": "username"             // GitHub username of the designer
          },
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

#### Field notes

| Field | Required | Description |
| :---- | :------- | :---------- |
| `description` | No | Array of search tags / aliases. Used by the icon browser search and SEO meta. |
| `contributor.github` | No | GitHub username of the person who contributed this icon. When set, their avatar and a link to their profile appears on the icon's detail page on reicon.dev. |
| `weights.Outline.code` | Yes | Full `<svg>` markup. Build scripts strip the wrapper and normalise `fill="white"` → `currentColor`. |
| `weights.Filled.code` | No | Same as Outline. Omit if a filled variant doesn't make sense for the icon. |

**Icon names** are `kebab-case` and become `PascalCase` component names in the packages:
`arrow-up-right` → `ArrowUpRight`, `home-2` → `Home2`.

#### Example — core icon (no contributor)

```jsonc
"star": {
  "description": ["favourite", "bookmark", "rating"],
  "weights": {
    "Outline": { "code": "<path d=\"...\" fill=\"currentColor\"/>" },
    "Filled":  { "code": "<path d=\"...\" fill=\"currentColor\"/>" }
  }
}
```

#### Example — community-contributed icon

```jsonc
"wave-hand": {
  "description": ["hello", "greeting", "gesture"],
  "contributor": { "github": "octocat" },
  "weights": {
    "Outline": { "code": "<path d=\"...\" fill=\"currentColor\"/>" },
    "Filled":  { "code": "<path d=\"...\" fill=\"currentColor\"/>" }
  }
}
```

When `contributor.github` is set, the icon detail page on reicon.dev automatically shows the contributor's GitHub profile picture and a link — no extra work needed.

---

### `icon-tags.json` (optional override)

A `{ "<icon-name>": ["tag", "tag"] }` map for enriching search / SEO metadata outside of `icon-data.json`. Build scripts merge it on top of each icon's inline `description` array when the file is present.

---

## How it's consumed

| Output | Built by | Command | Who runs it |
| :---- | :------- | :------- | :---------- |
| Website + CDN bundle | `packages/reicon/scripts/build.cjs` | `npm run build` | Automatic on every deploy |
| `packages/reicon/dist` (npm) | `packages/reicon/scripts/build.cjs` | `npm run build:js` | **Maintainer only** |
| `packages/reicon-react/dist` (npm) | `packages/reicon-react/scripts/build.cjs` | `npm run build:react` | **Maintainer only** |
| `packages/reicon-vue/dist` (npm) | `packages/reicon-vue/scripts/build.cjs` | `npm run build:vue` | **Maintainer only** |
| `packages/reicon-svelte/dist` (npm) | `packages/reicon-svelte/scripts/build.cjs` | `npm run build:svelte` | **Maintainer only** |

> [!IMPORTANT]
> **Contributors only edit `data/icon-data.json`.** The website automatically shows new icons on the next deploy. npm packages are rebuilt and published by the maintainer in a separate release step — you do not need to run `build:packages` in your PR.

> [!WARNING]
> Never manually edit files inside `packages/*/dist/` or `cdn/`. They are regenerated from `data/icon-data.json` and any hand-edits will be overwritten.
