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
│   └── reicon/                  # reicon        (vanilla JS)
│       ├── scripts/             # Vanilla JS + CDN builders
│       │   ├── build.cjs        # Main package builder
│       │   └── build-cdn.cjs    # CDN web component builder
│       └── dist/                # Package compilation output
│
├── cdn/                         # Generated CDN bundles (git-ignored)
│   ├── reicon.js / .min.js     # Main icon runtime (<re-icon>)
│   └── reicon-brands.js / .min.js
│
├── public/                      # Static assets
│   ├── favicon.ico             # Favicons
│   ├── og-image.png            # Open Graph image
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
│   │   ├── Background.tsx      # Animated WebGL background
│   │   ├── ClayButton.tsx      # Custom button component
│   │   ├── CookieConsent.tsx   # Cookie consent banner
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Header.tsx          # Site header/navigation
│   │   ├── IconCard.tsx        # Icon display card (+ skeleton)
│   │   ├── Sidebar.tsx         # Icons page sidebar
│   │   ├── SmoothScroll.tsx    # Lenis scroll wrapper
│   │   └── usage/              # Usage guide components
│   │       ├── CodeBlock.tsx
│   │       ├── InstallTabs.tsx
│   │       ├── SyntaxBlock.tsx
│   │       └── TypeTable.tsx
│   │
│   ├── pages/                  # Route pages
│   │   ├── Landing.tsx         # Homepage
│   │   ├── Icons.tsx           # Icon browser
│   │   ├── IconDetail.tsx      # Individual icon page
│   │   ├── Usage.tsx           # Usage documentation
│   │   ├── Packages.tsx        # Package information
│   │   ├── Faq.tsx             # FAQ
│   │   ├── Terms.tsx / Privacy.tsx / LicensePage.tsx
│   │   └── NotFound.tsx        # 404 page
│   │
│   ├── App.tsx                 # Routes (lazy-loaded)
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles (Tailwind v4)
│
├── .github/                     # Community files, issue/PR templates
│   ├── CONTRIBUTING.md  CODE_OF_CONDUCT.md  SECURITY.md  SUPPORT.md
│   ├── CODEOWNERS  FUNDING.yml  dependabot.yml
│   └── ISSUE_TEMPLATE/ · PULL_REQUEST_TEMPLATE.md
│
├── CHANGELOG.md                 # Release history
├── LICENSE                      # MIT
├── index.html                   # Vite HTML entry point
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Vite configuration
├── vercel.json                  # Vercel deploy config
└── README.md                    # Main repository README
```

> **Note:** `packages/` and `cdn/` are generated from `data/icon-data.json`.
> While `cdn/` is git-ignored, `packages/` is committed and tracked. Build them with
> `npm run build:packages`. Never edit those outputs by hand.
