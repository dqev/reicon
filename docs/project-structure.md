# 📁 Reicon Project Structure

This document provides a detailed breakdown of the file structure and directory contents of the Reicon monorepo.

## Codebase Directory Tree

```
reicon/
├── data/                        # ⭐ Single source of truth
│   ├── icon-data.json          # Every icon (Outline + Filled) lives here
│   └── README.md               # Dataset schema & build pipeline
│
├── packages/                    # Local npm packages
│   ├── reicon-react/            # reicon-react  (React)
│   │   ├── scripts/build.cjs    # React package builder
│   │   └── dist/                # Package compilation output
│   ├── reicon-vue/              # reicon-vue    (Vue 3)
│   │   ├── scripts/build.cjs    # Vue package builder
│   │   └── dist/                # Package compilation output
│   ├── reicon/                  # reicon        (vanilla JS)
│   │   ├── scripts/             # Vanilla JS + CDN builders
│   │   │   ├── build.cjs        # Main package builder
│   │   │   └── build-cdn.cjs    # CDN web component builder
│   │   └── dist/                # Package compilation output
│   ├── reicon-mcp/              # reicon-mcp    (MCP Server & CLI)
│   │   ├── scripts/build.cjs    # Bundles offline search index + server
│   │   ├── src/server/          # MCP stdio server and tool handlers
│   │   └── dist/                # Package compilation output
│   ├── reicon-flutter/          # reicon_flutter (Dart & Flutter)
│   ├── reicon-vscode/           # reicon-vscode (VS Code extension)
│   └── reicon-figma/            # reicon-figma  (Figma plugin)
│
├── docs/
│   └── mcp/index.md             # MCP Server guide for agents and CLI
│
├── cdn/                         # Generated CDN bundles (git-ignored)
│   ├── reicon.js               # Main icon runtime (<re-icon>)
│   └── reicon-brands.js
│
├── public/                      # Static assets
│   ├── favicon/                # Favicon bundle (ico, svg, pngs, manifest)
│   ├── og-image.png            # Open Graph image (legacy)
│   ├── og/                     # Per-route Open Graph images
│   │   └── og-image.png        # Default OG image
│   ├── robots.txt              # SEO robots file
│   ├── sitemap.xml             # Generated sitemap
│   └── llms.txt                # LLM context file
│
├── scripts/
│   ├── generate-sitemap.mjs    # Sitemap generator
│   ├── generate-og-images.mjs  # OG image generator
│   ├── prerender-meta.mjs      # Meta tag prerendering
│   ├── ping-search-engines.mjs # Search engine notification (IndexNow)
│   ├── test-seo.mjs            # SEO audit
│   ├── setup-labels.sh         # GitHub label setup
│   └── icon-names.json         # Icon name map
│
├── src/
│   ├── components/             # Reusable components
│   │   ├── layout/            # Page chrome & shared structure
│   │   │   ├── Header.tsx     # Site header/navigation (with header/ subdir)
│   │   │   ├── Footer.tsx     # Site footer
│   │   │   ├── Sidebar.tsx    # Icons page sidebar (with sidebar/ subdir)
│   │   │   ├── Background.tsx # Animated WebGL background (with background/ subdir)
│   │   │   ├── CookieConsent.tsx (with cookie-consent/ subdir)
│   │   │   ├── SmoothScroll.tsx # Lenis scroll wrapper
│   │   │   └── ThemeContext.tsx  # Light/dark theme provider
│   │   ├── ui/               # Generic reusable atoms
│   │   │   ├── Button.tsx    # Custom button (was ClayButton)
│   │   │   ├── Card.tsx      # Feature card (was FeatureCard)
│   │   │   ├── ErrorBoundary.tsx # React error boundary
│   │   │   ├── Highlight.tsx
│   │   │   ├── IconCard.tsx  # Icon display card (+ skeleton)
│   │   │   ├── IconTooltip.tsx (with icon-tooltip/ subdir)
│   │   │   ├── LoadingScreen.tsx
│   │   │   └── ReIcon.tsx
│   │   └── docs/             # Documentation guide components
│   │       ├── ActionsBar.tsx
│   │       ├── CodeBlock.tsx
│   │       ├── EditOnGitHub.tsx
│   │       ├── InstallTabs.tsx
│   │       ├── SectionHeader.tsx
│   │       ├── SyntaxBlock.tsx
│   │       ├── TypeTable.tsx
│   │       ├── framework/    # Framework selector & constants
│   │       │   ├── constants.tsx
│   │       │   ├── helpers.ts
│   │       │   ├── icons.tsx
│   │       │   └── selector.tsx
│   │       └── sidebar/     # Docs sidebar components
│   │           ├── Left.tsx
│   │           ├── Mobile.tsx
│   │           ├── Right.tsx
│   │           └── styles.ts
│   │
│   ├── pages/                 # Route pages (one subdir per route)
│   │   ├── home/             # Homepage (was landing/)
│   │   │   ├── Home.tsx     # Root page component
│   │   │   ├── Hero.tsx, Features.tsx, CTA.tsx
│   │   │   ├── Integrations.tsx, IconShowcase.tsx
│   │   │   ├── LaunchBanner.tsx, BrandsOverlay.tsx
│   │   │   ├── Playground.tsx + playground/ (code/preview/controls)
│   │   │   └── icons.tsx
│   │   ├── icons/           # Icon browser
│   │   │   ├── IconsPage.tsx
│   │   │   ├── IconSearchBar.tsx, IconGrid.tsx
│   │   │   ├── IconCount.tsx, IconsHelmet.tsx
│   │   ├── icon/            # Individual icon page (was icon-detail/)
│   │   │   ├── IconDetail.tsx (composes all below)
│   │   │   ├── IconPreview.tsx, IconActions.tsx
│   │   │   ├── CodeTabs.tsx, Snippets.tsx
│   │   │   ├── Mockups.tsx, RelatedIcons.tsx
│   │   │   ├── SeoHelmet.tsx, useIconDetail.tsx
│   │   │   └── utils.ts
│   │   ├── docs/            # Documentation
│   │   │   ├── DocsPage.tsx, DocsContent.tsx
│   │   │   ├── DocsHelmet.tsx, useDocs.ts
│   │   │   ├── frameworks/ # Per-framework docs
│   │   │   │   ├── CdnDocs.tsx + cdn/
│   │   │   │   ├── ReactDocs.tsx + react/
│   │   │   │   ├── ReactNativeDocs.tsx + react-native/
│   │   │   │   ├── VueDocs.tsx + vue/
│   │   │   │   └── SvelteDocs.tsx + svelte/
│   │   │   ├── guides/     # Long-form tutorial docs
│   │   │   │   ├── McpDocs.tsx + mcp/
│   │   │   │   ├── Troubleshooting.tsx + troubleshooting/
│   │   │   │   ├── SvgDocs.tsx + svg-docs/
│   │   │   │   ├── Accessibility.tsx + accessibility/
│   │   │   │   └── FigmaDocs, VscodeDocs, Styling, Performance
│   │   │   └── reference/  # Quick-reference shared sections
│   │   │       ├── PropsTable.tsx
│   │   │       ├── Weights.tsx
│   │   │       └── TypeScriptSection.tsx
│   │   ├── faq/            # FAQ
│   │   │   ├── FaqPage.tsx
│   │   │   ├── FaqHelmet.tsx, FaqCategory.tsx, FaqItem.tsx
│   │   ├── packages/       # Package information
│   │   │   ├── PackagesPage.tsx
│   │   │   ├── PackageCard.tsx, SvgCard.tsx, ToolCard.tsx, data.tsx
│   │   ├── terms/          # Terms of service
│   │   ├── privacy/        # Privacy policy
│   │   ├── license/        # License page
│   │   ├── pack/           # Icon pack builder
│   │   └── not-found/      # 404 page
│   │
│   ├── lib/                 # Shared utilities
│   │   ├── icon-data.ts    # Lazy JSON loader for icon metadata
│   │   └── reicon-loader.ts # Shared Reicon web component readiness promise
│   ├── data/
│   │   └── search-index.json, search-data.ts
│   ├── hooks/
│   │   └── useIconSearch.ts
│   ├── types/
│   │   └── reicon.d.ts
│   ├── test/
│   │   ├── setup.ts
│   │   └── smoke.test.tsx
│   ├── App.tsx             # Routes + layout (Header/Footer, error boundary)
│   └── main.tsx            # App entry point
│
├── .github/                 # Community files, issue/PR templates
│   ├── CONTRIBUTING.md  CODE_OF_CONDUCT.md  SECURITY.md  SUPPORT.md
│   ├── CODEOWNERS  FUNDING.yml  dependabot.yml
│   └── ISSUE_TEMPLATE/ · PULL_REQUEST_TEMPLATE.md
│
├── CHANGELOG.md             # Release history
├── LICENSE                  # MIT
├── index.html               # Vite HTML entry point
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite configuration
├── vercel.json              # Vercel deploy config
└── README.md                # Main repository README
```

> **Note:** `packages/` and `cdn/` are generated from `data/icon-data.json`.
> While `cdn/` is git-ignored, `packages/` is committed and tracked. Build them with
> `npm run build:packages`. Never edit those outputs by hand.
