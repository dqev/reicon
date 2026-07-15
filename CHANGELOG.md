# Changelog

All notable changes to Reicon are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] — 2026-07-09

### Added
- **`reicon-react-native`** — new official React Native package using `react-native-svg` (`SvgXml`) for rendering. Supports all 2,680 icons in Outline and Filled weights, tree-shakeable, TypeScript-ready, works with Expo and bare React Native projects. Closes [#41](https://github.com/dqev/reicon/issues/41).
- React Native integration card on the landing page integrations section.
- React Native tab in the icon detail page code snippet picker.
- `/docs/react-native` documentation page with installation guide, Navigation tab example, and Pressable examples.
- React Native entry on the Packages page with npm badges and direct install instructions.
- Launch banner updated to announce the React Native package.

### Changed
- **Website refactored** — all major pages split into focused sub-components:
  - `Landing.tsx` → `landing/Hero`, `Features`, `Integrations`, `Playground`, `CTA`, `IconShowcase`, `LaunchBanner`
  - `Docs.tsx` → `docs/sidebar/Left`, `Right`, `Mobile`, `ActionsBar`, `framework/constants`, `helpers`, `icons`, `selector`
  - `Packages.tsx` → `packages/PackageCard`, `ToolCard`, `SvgCard`, `data`
- Inline CSS moved from `Docs.tsx` and `Faq.tsx` into `sidebar/styles.ts` shared module.
- `Faq.tsx` now uses shared `DocsRightSidebar` and `docsSidebarStyles` components.
- SEO scripts reorganized into `scripts/seo/` folder:
  - `config.mjs` — single source of truth for all page titles, descriptions, and JSON-LD
  - `meta.mjs` — shared `buildMeta()`, `injectMeta()`, `fixFavicons()` utilities
  - `update.mjs` — apply config changes across all scripts in one command (`npm run seo`)
  - `test.mjs` — 34 automated SEO checks (`npm run seo:check`)
  - `ping.mjs` — IndexNow + Google Indexing API pinger (replaces `ping-search-engines.mjs`)
- `prerender-meta.mjs` rewritten from scratch — imports from `seo/config.mjs`, cleaner icon page SSR body.
- `generate-sitemap.mjs` rewritten — imports routes from `seo/config.mjs`, no duplicate constants.
- `index.html` cleaned — all inline comments removed, organized grouping, React Native added to all descriptions and JSON-LD.
- Framework icons (Vue, Svelte, Figma, SVG) extracted to `components/docs/framework/icons.tsx` to eliminate duplication.
- `FrameworkConstants` and `frameworkHelpers` extracted so `FRAMEWORKS`, `NAV_ITEMS`, `getFrameworkLabel()`, `isStandaloneFramework()` are shared.

### Fixed
- Integrations section on the landing page now uses a uniform 3×2 grid (3 columns, 2 rows) with consistent card heights.
- React Native icon in the framework selector and code tabs now correctly uses `FaReact` (same as React).
- FAQ tree-shaking answer updated to include `reicon-react-native` and Metro bundler.
- Sitemap and prerender pipeline now include `/docs/react-native`.

## [1.0.0] — 2026-06-22

### Added
- Initial public release of the Reicon icon library.
- 2,700+ handcrafted SVG icons, each available in **Outline** and **Filled** weights.
- `reicon-react` package for React — tree-shakeable, with first-class TypeScript typings.
- `reicon-vue` package for Vue 3.
- CDN distribution exposing the `<re-icon>` custom element for vanilla HTML/JS.
- Component props: `size`, `color`, `weight`, and `className`.
- [reicon.dev](https://reicon.dev) website featuring:
  - Searchable icon browser with category, weight, and size filters.
  - Live playground to customize color, size, and weight.
  - Per-icon detail pages with copy-ready React, Vue, and HTML snippets.
  - Full docs documentation for React, Vue, and the CDN.

[Unreleased]: https://github.com/dqev/reicon/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/dqev/reicon/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/dqev/reicon/releases/tag/v1.0.0
