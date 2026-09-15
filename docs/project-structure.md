# 📁 Reicon Project Structure

This document provides a detailed breakdown of the file structure and directory contents of the Reicon open-source monorepo workspace.

## Monorepo & Workspace Architecture

Reicon is configured as an **NPM Workspaces** monorepo (`apps/*`, `packages/*`) with microservice and component integration:

- **Single Source of Truth (`data/`)**: Centralized JSON definition (`icon-data.json`) for all outline/filled icon SVGs.
- **Web Application (`apps/web/src/`)**: Modern React & Vite documentation site and interactive icon search suite.
- **NPM Workspaces (`packages/`)**: Multi-framework libraries and microservices built modularly.
- **MCP Microservice (`packages/reicon-mcp`)**: Model Context Protocol stdio microservice server for AI assistants and CLI tools.
- **Open Source Standards**: `SECURITY.md`, `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `.github/`.

## Codebase Directory Tree

```
reicon/
├── apps/                        # Monorepo Web Applications & Microservices
│   └── web/                     # Self-Contained Web Application & Docs Site
│       ├── package.json         # Workspace package (@reicon/web)
│       ├── index.html           # HTML entry point
│       ├── vite.config.ts       # Vite configuration
│       ├── vitest.config.ts     # Vitest configuration
│       ├── vercel.json          # Deployment configuration
│       ├── public/              # Static web assets (favicons, og images)
│       └── src/                 # Application source code
│           ├── components/      # Reusable components (layout, ui, docs)
│           ├── pages/           # Route pages (home, icons, icon detail, docs, etc.)
│           ├── lib/             # Utility loaders
│           ├── hooks/           # Custom React hooks
│           ├── types/           # TypeScript definitions
│           ├── App.tsx          # Routes & main layout
│           └── main.tsx         # App entry point
│
├── packages/                    # Local npm workspace packages
│   ├── reicon-react/            # reicon-react  (React)
│   ├── reicon-angular/          # reicon-angular (Angular 20+)
│   ├── reicon-vue/              # reicon-vue    (Vue 3)
│   ├── reicon-svelte/           # reicon-svelte (Svelte 4/5)
│   ├── reicon-astro/            # reicon-astro  (Astro)
│   ├── reicon/                  # reicon        (vanilla JS + Web Component)
│   ├── reicon-mcp/              # reicon-mcp    (MCP Microservice Server & CLI)
│   │   ├── scripts/build.cjs    # Bundles offline search index + server
│   │   ├── src/server/          # MCP stdio server and tool handlers
│   │   └── dist/                # Package compilation output
│   ├── reicon-flutter/          # reicon_flutter (Dart & Flutter)
│   ├── reicon-vscode/           # reicon-vscode (VS Code extension)
│   └── reicon-figma/            # reicon-figma  (Figma plugin)
│
├── data/                        # ⭐ Single source of truth
│   ├── icon-data.json          # Every icon (Outline + Filled) lives here
│   └── README.md               # Dataset schema & build pipeline
│
├── docs/                        # Complete open-source developer documentation
│   └── mcp/index.md             # MCP Server guide for agents and CLI
│
├── cdn/                         # Generated CDN bundles (git-ignored)
│   ├── reicon.js               # Main icon runtime (<re-icon>)
│   └── reicon-brands.js
│
├── public/                      # Static assets
│   ├── favicon/                # Favicon bundle (ico, svg, pngs, manifest)
│   ├── og/                     # Per-route Open Graph images
│   ├── robots.txt              # SEO robots file
│   ├── sitemap.xml             # Generated sitemap
│   └── llms.txt                # LLM context file
│
├── scripts/                     # Workspace build and automation pipelines
│   ├── generate-sitemap.mjs    # Sitemap generator
│   ├── generate-website-search-index.mjs # Search index builder
│   ├── prerender-meta.mjs      # Meta tag prerendering
│   └── bump-versions.mjs       # Version sync across packages
│
├── .github/                 # Community files, issue/PR templates
│   ├── CONTRIBUTING.md  CODE_OF_CONDUCT.md  SECURITY.md  SUPPORT.md
│   ├── CODEOWNERS  FUNDING.yml  dependabot.yml
│   └── ISSUE_TEMPLATE/ · PULL_REQUEST_TEMPLATE.md
│
├── SECURITY.md              # Open-source security vulnerability reporting policy
├── CHANGELOG.md             # Release history
├── LICENSE                  # MIT
├── index.html               # Vite HTML entry point
├── package.json             # Dependencies & scripts (workspaces: apps/*, packages/*)
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite configuration
└── README.md                # Main repository README
```

> **Note:** `packages/` and `cdn/` are generated from `data/icon-data.json`.
> While `cdn/` is git-ignored, `packages/` is committed and tracked. Build them with
> `npm run build:packages`. Never edit those outputs by hand.
