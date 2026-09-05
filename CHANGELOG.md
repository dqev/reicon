# Changelog

All notable changes to the Reicon project and open-source platform will be documented in this file.

## [v1.5.0] - 2026-09-05

### ⚖️ Removal of Vector Illustrations
- **Licensing Compliance with @nilbuild (Kamran Ahmed)**: Removed all vector illustrations, illustration catalog pages (`/illustration`), individual detail routes (`/illustration/:slug`), datasets (`public/illustration-data/`), build scripts (`scripts/sync-illustration-data.mjs`), and AI context files (`public/llms-illustrations.txt`) to resolve licensing issues with @nilbuild (Kamran Ahmed).

### 🎯 Strategic Refocus on Pure SVG Icon Library
- **Brand Logos Catalog Removal**: Removed the brand logos section (`/logos`, `/logo`, brand datasets) as a personal product choice to focus Reicon 100% exclusively on open-source vector UI icons.
- **Clean Navigation & UX**:
  - Removed illustration and logo toggle controls from the Home Page Playground.
  - Updated Navigation Header, Mobile Drawer Menu, and Footer ecosystem links to showcase only Icon Library destinations.
  - Replaced Orbit showcase brand logos in `IconShowcase.tsx` with pure UI icons.
  - Redesigned Hero section action buttons (`Browse Icons` = primary solid white, `Docs Guide` = translucent dark glassmorphic).

### ⚡ Performance & Rendering Optimizations
- **Progressive Auto-Batching in Icon Grid (`/icons`)**:
  - Replaced restrictive scroll sentinel caps with a non-blocking progressive batch loader (`INITIAL_BATCH = 120`, `STEP_BATCH = 200`).
  - First 120 icons render instantly, and all remaining 2,630 icons stream into the DOM in smooth background animation frames (<150ms total) without freezing the UI thread.
- **Reliable CDN Web Component Loader**:
  - Enhanced `waitForReicon()` with fallback script injection and an extended 15-second timeout window to ensure `<re-icon>` web components load seamlessly across high-latency networks.

### 🔍 Google Favicon Indexing & SEO Fixes
- **Root Favicon Assets**: Deployed root-level `/public/favicon.ico` (16x16, 32x32, 48x48 multi-resolution), `/public/favicon.svg`, and `/public/logo.png` (512x512) for Googlebot.
- **Head Link Tags & Vercel Rewrites**: Added standard Googlebot `<link rel="shortcut icon">` and `<link rel="icon">` tags in `index.html`, and updated `vercel.json` to bypass SPA index rewrites for static favicon requests.
- **Clean LLM Documentation**: Re-generated `llms.txt` and `llms-full.txt` context files containing 2,630 pure icon mappings for AI agents (ChatGPT, Claude, Cursor, Copilot).

---

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
