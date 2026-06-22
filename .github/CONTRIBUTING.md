# Contributing to Reicon

First off — thank you for taking the time to contribute! 💜
Reicon is a free, open-source icon library, and it gets better with community input.

This guide covers how to report issues, request icons, and submit code or icon contributions.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to contribute](#ways-to-contribute)
- [Reporting bugs](#reporting-bugs)
- [Requesting an icon](#requesting-an-icon)
- [Development setup](#development-setup)
- [Project structure](#project-structure)
- [Submitting changes](#submitting-changes)
- [Commit conventions](#commit-conventions)
- [Icon contribution guidelines](#icon-contribution-guidelines)
- [Questions](#questions)

---

## Code of Conduct

This project follows our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating,
you agree to uphold it. Please report unacceptable behavior to **hello@reicon.dev**.

## Ways to contribute

- 🐛 **Report a bug** — something broken on the site or in a package.
- 🎨 **Request an icon** — tell us what's missing.
- ✏️ **Fix an icon** — alignment, stroke, or grid issues.
- 📖 **Improve docs** — the usage guide, README, or examples.
- 💡 **Suggest a feature** — for the website, packages, or tooling.
- 🔧 **Submit code** — bug fixes and improvements.

Browse [open issues](https://github.com/dqev/reicon/issues) (especially
[`good first issue`](https://github.com/dqev/reicon/labels/good%20first%20issue))
to find something to work on.

## Reporting bugs

Before opening an issue:

1. **Search existing issues** to avoid duplicates.
2. Use the **Bug report** issue template.
3. Include: what you expected, what happened, steps to reproduce, your
   environment (browser, framework, package version), and a screenshot if visual.

## Requesting an icon

Use the **Icon request** issue template and include:

- **Name / concept** — e.g. "split screen", "AI sparkle".
- **Use case** — where you'd use it.
- **Reference** — a screenshot or link, if you have one.
- **Weight** — Outline, Filled, or both.

👍 React to existing requests you also want — popular ones get prioritized.

## Development setup

**Prerequisites:** Node.js 18+ and npm.

```bash
# 1. Fork and clone
git clone https://github.com/<your-username>/reicon.git
cd reicon

# 2. Install dependencies
npm install

# 3. Start the dev server (http://localhost:3000)
npm run dev
```

Useful scripts:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build (sitemap + Vite build + prerender) |
| `npm run preview` | Preview the production build |
| `npm run lint` | TypeScript type checking (`tsc --noEmit`) |
| `npm run sitemap` | Regenerate the sitemap |
| `npm run build:react` | Build the `reicon-react` package from `data/icon-data.json` |
| `npm run build:vue` | Build the `reicon-vue` package |
| `npm run build:js` | Build the `reiconjs` (vanilla) package |
| `npm run build:cdn` | Build the CDN bundle (`cdn/reicon.js`) |
| `npm run build:packages` | Build all packages + the CDN bundle |

## Project structure

```
reicon/
├── data/
│   ├── icon-data.json   # ⭐ Single source of truth — every icon lives here
│   └── README.md        # Dataset schema & build pipeline docs
├── packages/            # Generated npm packages (git-ignored, rebuilt from data/)
│   ├── reicon-react/    #   reicon-react  (React)
│   ├── reicon-vue/      #   reicon-vue    (Vue 3)
│   └── reiconjs/        #   reiconjs      (vanilla JS)
├── cdn/                 # Generated CDN bundles (git-ignored): reicon.js / .min.js
├── scripts/
│   ├── build/           # Package + CDN build scripts (build-react/vue/js/cdn.cjs)
│   └── *.mjs            # Website/SEO tooling (sitemap, prerender, og-images, …)
├── src/
│   ├── components/      # Reusable UI (Header, Sidebar, IconCard, usage/…)
│   ├── pages/           # Route pages (Landing, Icons, IconDetail, Usage, …)
│   ├── App.tsx          # Routes
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles (Tailwind v4)
├── public/              # Static assets, robots.txt, sitemaps, llms.txt
└── .github/             # Community files, issue/PR templates, workflows
```

> **Important:** `packages/` and `cdn/` are **generated output** and are
> git-ignored. Never edit them by hand — change `data/icon-data.json` and
> rebuild with `npm run build:packages`.

## Submitting changes

1. **Create a branch** from `main`:
   ```bash
   git checkout -b fix/short-description
   ```
2. **Make your changes** and keep them focused — one logical change per PR.
3. **Run checks** before pushing:
   ```bash
   npm run lint
   npm run build
   ```
4. **Open a Pull Request** against `main` using the PR template. Link any
   related issue (e.g. "Closes #123") and add before/after screenshots for
   visual changes.

We review PRs as soon as we can. Please be patient and responsive to feedback.

## Commit conventions

We use [Conventional Commits](https://www.conventionalcommits.org/). Examples:

```
feat: add split-screen icon
fix: correct stroke width on bell icon
docs: clarify Vue installation steps
perf: memoize icon grid cards
chore: update dependencies
```

## Icon contribution guidelines

Reicon icons are handcrafted for visual consistency. All icons live in a single
file — **`data/icon-data.json`** — and every package and the CDN bundle are
generated from it. To contribute an icon:

1. **Add it to `data/icon-data.json`** under the right category, with `Outline`
   and `Filled` weights. See [`data/README.md`](../data/README.md) for the exact schema.
2. **Rebuild the outputs** to verify it generates cleanly:
   ```bash
   npm run build:packages
   ```
3. **Confirm it renders** on the dev site (`npm run dev`).

Design requirements:

- **Grid:** Design on a **24×24** grid.
- **Stroke:** Match the existing stroke width and corner radius of the set.
- **Weights:** Provide both **Outline** and **Filled** where it makes sense.
- **Optical balance:** Center and size the icon to feel consistent next to its peers.
- **Color:** Use `currentColor` (avoid hardcoded `fill="white"` — the build
  normalizes it, but author it correctly).
- **Optimize:** Clean the SVG (run it through SVGO) — minimal paths, no editor cruft.
- **Naming:** Use lowercase `kebab-case` (e.g. `arrow-up-right`). It becomes the
  `PascalCase` component name (`ArrowUpRight`).

> Don't edit files in `packages/` or `cdn/` — they're regenerated from the dataset
> and your changes there will be overwritten.

Not sure about a detail? Open a draft PR or a discussion — we're happy to help refine it.

## Questions

- 💬 [GitHub Discussions](https://github.com/dqev/reicon/discussions) — ideas, questions, show & tell.
- 📧 **hello@reicon.dev** — anything else.

Thanks again for helping make Reicon better. 💜
