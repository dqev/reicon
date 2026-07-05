<p align="center">
  <a href="https://reicon.dev">
    <img src="../public/readme-banner.png" alt="Reicon — Free Open-Source Icon Library" width="100%" />
  </a>
</p>

# Contributing to Reicon 💜

Welcome! Thank you for helping to make Reicon better. This guide provides a direct, concise reference for setting up the project, understanding the codebase structure, using key scripts, and submitting contributions.

---

## 🚀 Quick Start

1. **Fork and Clone** the repository:
   ```bash
   git clone https://github.com/<your-username>/reicon.git
   cd reicon
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The site will be available at [http://localhost:3000](http://localhost:3000).

---

## 📁 Repository Structure

Reicon is organized as a monorepo. Here is a breakdown of what each folder contains:

| Directory / File | Description |
| :--- | :--- |
| [`data/icon-data.json`](../data/icon-data.json) | **Single source of truth.** Every icon's raw SVG markup (Outline & Filled weights) and metadata live here. |
| [`packages/`](../packages) | Framework packages rebuilt automatically from `data/icon-data.json`. |
| ├─ [`reicon/`](../packages/reicon) | Vanilla JS & CDN core library. |
| ├─ [`reicon-react/`](../packages/reicon-react) | React wrapper components. |
| ├─ [`reicon-vue/`](../packages/reicon-vue) | Vue 3 wrapper components. |
| ├─ [`reicon-svelte/`](../packages/reicon-svelte) | Svelte wrapper components. |
| ├─ [`reicon-figma/`](../packages/reicon-figma) | Figma plugin build environment. |
| └─ [`reicon-vscode/`](../packages/reicon-vscode) | VS Code Extension helper. |
| [`scripts/`](../scripts) | Build and tooling utilities (Sitemap, SEO auditing, OG image generation). |
| [`src/`](../src) | Reicon documentation website source (Vite + React). |
| [`public/`](../public) | Website static assets, favicons, `robots.txt`, and `llms.txt`. |
| [`docs/`](../docs) | Additional guides and design system references. |
| [`cdn/`](../cdn) | Generated CDN bundles (git-ignored, compiled from JS build). |

> [!WARNING]
> Never manually edit files inside the `packages/` or `cdn/` output directories. They are automatically regenerated from `data/icon-data.json`.

---

## 🛠️ Key Scripts & Usage

Run these scripts from the repository root:

### Package Generation & Builds
* **Build all downstream packages and CDN assets**:
  ```bash
  npm run build:packages
  ```
* **Build individual packages**:
  * React: `npm run build:react`
  * Vue 3: `npm run build:vue`
  * Svelte: `npm run build:svelte`
  * Vanilla JS: `npm run build:js`
  * CDN Web Component: `npm run build:cdn` (followed by `npm run build:cdn:min`)
  * Figma Plugin: `npm run build:figma`
  * VS Code Extension: `npm run build:vscode`

### Website Development & Auditing
* **Start Vite dev server**:
  ```bash
  npm run dev
  ```
* **Production site build** (Site compilation + SEO meta prerendering):
  ```bash
  npm run build
  ```
* **Preview the production build**:
  ```bash
  npm run preview
  ```
* **Audit website SEO**:
  ```bash
  npm run seo:check
  ```
* **Lint codebase / Type-check**:
  ```bash
  npm run lint
  ```

---

## 🎨 Contributing New Icons

Reicon maintains strict design guidelines for consistency:

1. **Format**: SVGs must be built on a **24x24 px** viewbox.
2. **Stroke**: Stroke width and corner radiuses must match existing icons.
3. **Colors**: Avoid hardcoded hex codes. Use `currentColor` so users can change icon colors dynamically.
4. **Weights**: Provide both **Outline** and **Filled** weights where applicable.
5. **Optimization**: Optimize SVGs (e.g. using `svgo`) to strip editor metadata and minimize path codes.

### Step-by-Step Icon Integration:
1. Open [`data/icon-data.json`](../data/icon-data.json).
2. Insert your new icon inside the appropriate category using lowercase `kebab-case`:
   ```json
   "my-new-icon": {
     "description": ["tags", "for", "search"],
     "weights": {
       "Outline": { "code": "<path ... />" },
       "Filled": { "code": "<path ... />" }
     }
   }
   ```
3. Compile all packages:
   ```bash
   npm run build:packages
   ```
4. Run `npm run dev` to preview your changes on the local site.

---

## 💻 Submitting Code Changes

1. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # OR
   git checkout -b fix/bug-description
   ```
2. **Make your changes** and verify type safety:
   ```bash
   npm run lint
   npm run build
   ```
3. **Commit** using Conventional Commits:
   ```text
   feat: add my-new-icon
   fix: adjust alignment of close icon
   docs: improve installation instructions
   ```
4. **Push and open a Pull Request** against the `main` branch.
