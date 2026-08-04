# Changelog

All notable changes to the Reicon project and open-source platform will be documented in this file.

## [v1.2.0] - 2026-08-04

### 🎨 71,000+ Free SVG Illustrations Library Launch
- **New Illustration Catalog (`/illustration`)**: Introduced a dedicated browsing workspace for 71,000+ free, open-source vector SVG illustrations across 75+ categories and subcategories.
- **Illustration Detail Pages (`/illustration/:slug`)**: Added individual detail pages featuring:
  - Custom Color Accent Picker with real-time preview tinting.
  - High-resolution PNG exports up to 2048px with 100% transparent backgrounds (`ctx.clearRect`).
  - Customizable SVG downloads with color injection.
  - Syntax-highlighted React, Vue, HTML, and raw SVG code tabs with desktop/mobile horizontal scrolling and double-square copy icon feedback.
- **Interactive Illustration Hero Showcase**: Added an interactive 3D/ambient Playground on the home page and illustration catalog.

### 📢 Launch Banner & UX Enhancements
- **Illustration Launch Banner (`<IllustrationBanner />`)**: Added a floating modal banner introducing 71,000+ free SVG illustrations featuring 5 real vector illustrations (`aspen`, `bag`, `build`, `batch`, `bag-marbles`) with generous padding and spacing.
- **Navigation Links**: Integrated `Illustration` links across desktop header, mobile drawer menu, and footer ecosystem columns.

### 🚀 SEO & AI Agent Indexing
- **Rich Schema.org Metadata**: Integrated `Dataset`, `ImageGallery`, `CollectionPage`, and `BreadcrumbList` JSON-LD schemas on illustration pages for Google Search rich snippets.
- **IndexNow Instant Indexing (`ping.mjs`)**: Configured automatic URL submission to Bing and IndexNow search engine APIs upon build.
- **LLM Assets (`llms-illustrations.txt`)**: Generated comprehensive markdown documentation and category mappings for AI coding assistants (ChatGPT, Claude, Cursor, Copilot).

---

## [v1.1.1] - 2026-08-02
- Added Flutter SDK (`reicon_flutter`) support and docs guide.
- Added VS Code extension and MCP AI server documentation.

## [v1.1.0] - 2026-08-01
- Introduced Duotone variant icons across the icon catalog.

## [v1.0.0] - 2026-07-28
- Initial release of Reicon core library, React, Vue, Svelte, React Native, and CDN runtimes.
