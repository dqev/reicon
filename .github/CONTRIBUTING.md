<p align="center">
  <a href="https://reicon.dev">
    <img src="../public/readme-banner.png" alt="Reicon — Free Open-Source Icon Library" width="100%" />
  </a>
</p>

# Contributing to Reicon 💜

Thank you for helping make Reicon better. This guide covers everything you need — from setting up locally to submitting a PR.

---

## How the project is structured

Reicon is a monorepo with two clearly separated concerns:

| Layer | What it is | Who manages it |
| :---- | :--------- | :------------- |
| `data/icon-data.json` | Single source of truth — SVG paths, tags, contributors | **Everyone** (contributors + maintainer) |
| `packages/*/dist/` | npm packages published to npm | **Maintainer only** |
| Website (`src/`) | React/Vite docs site, deployed on every merge to `main` | **Everyone** |

The website reads icons directly from the CDN bundle, which is rebuilt automatically on every deploy. **You never need to publish a package to make new icons appear on reicon.dev.**

---

## Quick start

```bash
git clone https://github.com/<your-username>/reicon.git
cd reicon
npm install
npm run dev          # http://localhost:3000
```

---

## � Repository map

| Path | Description |
| :--- | :---------- |
| `data/icon-data.json` | **Edit here.** All icon SVGs, tags, and contributor credits. |
| `data/README.md` | Full schema reference for `icon-data.json`. |
| `scripts/` | Build utilities — sitemap, SEO prerender, icon name sync. |
| `src/` | Documentation website (Vite + React). |
| `public/` | Static assets, favicons, robots.txt. |
| `docs/` | Framework usage guides. |
| `packages/` | npm package source — **do not edit dist/ directly.** |

---

## 🎨 Contributing icons

### Design guidelines

All icons must follow these rules to be accepted:

1. **Grid**: 24 × 24 px viewBox, paths snapped to grid.
2. **Stroke**: Outline weight uses 1.5 px strokes with consistent corner radii.
3. **Color**: No hardcoded hex values. Use `currentColor` everywhere so users can tint icons.
4. **Weights**: Provide **both** Outline and Filled variants. If a Filled variant doesn't make sense, Outline alone is fine.
5. **Optimisation**: Run through [SVGO](https://jakearchibald.github.io/svgomg/) before adding. Strip editor metadata, minimise path data.

### Step by step

1. **Fork and create a branch**:
   ```bash
   git checkout -b icon/my-new-icon
   ```

2. **Add your icon to `data/icon-data.json`** inside the correct category, using `kebab-case`:

   ```jsonc
   "my-new-icon": {
     "description": ["tag", "alias"],        // optional but helpful for search
     "contributor": { "github": "your-username" },   // add your GitHub username
     "weights": {
       "Outline": { "code": "<path .../>" },
       "Filled":  { "code": "<path .../>" }   // omit if no filled variant
     }
   }
   ```

   > **Tip:** The `contributor.github` field is how you get credit on reicon.dev. When set, your GitHub avatar and a link to your profile appear on the icon's detail page automatically.

3. **Sync the icon name registry**:
   ```bash
   npm run sync:icons
   ```
   This regenerates `scripts/icon-names.json` from your changes — required for the sitemap and SEO prerender to include your new icons.

4. **Preview locally**:
   ```bash
   npm run dev
   ```
   Browse to `http://localhost:3000/icons` and search for your icon name.

5. **Validate and type-check**:
   ```bash
   npm run validate:icons   # confirms icon-names.json is in sync
   npm run lint             # TypeScript check
   ```

6. **Open a Pull Request** against `main`. That's it — you're done.

> [!IMPORTANT]
> **Do not run `npm run build:packages`.** npm packages are rebuilt and published by the maintainer as a separate release step. Your PR only needs to touch `data/icon-data.json` (and `scripts/icon-names.json` after running `sync:icons`).

---

## 💻 Contributing code or docs

For website changes (`src/`), documentation (`docs/`), or tooling (`scripts/`):

1. Create a branch:
   ```bash
   git checkout -b feat/your-feature
   # or
   git checkout -b fix/bug-description
   ```

2. Make your changes, then verify:
   ```bash
   npm run lint     # TypeScript type check
   npm run build    # full production build
   ```

3. Commit with [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add contributor credit to icon detail page
   fix: sidebar active state invisible in light mode
   docs: clarify Vue 3 installation steps
   ```

4. Push and open a PR against `main`.

---

## 🔒 What only maintainers do

These steps are **not part of contributor PRs**. The maintainer handles them in a separate release:

- `npm run build:packages` — rebuilds all npm package dist files
- Publishing to npm (`npm publish`)
- Cutting a GitHub release with a version tag

When enough icons have accumulated (or on a regular cadence), the maintainer rebuilds and publishes all packages so the new icons become available via `npm install reicon-react` etc.

---

## Key scripts (for reference)

| Command | What it does |
| :------ | :----------- |
| `npm run dev` | Start local dev server at :3000 |
| `npm run sync:icons` | Regenerate `scripts/icon-names.json` from `data/icon-data.json` |
| `npm run validate:icons` | Check that icon-names.json is in sync — exits 1 if not |
| `npm run lint` | TypeScript type check |
| `npm run build` | Full production build (sync → sitemap → vite → prerender) |
| `npm run preview` | Preview the production build |
| `npm run seo:check` | Audit SEO meta tags |
