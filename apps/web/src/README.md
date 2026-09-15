<p align="center">
  <a href="https://reicon.dev">
    <img src="../public/readme-banner.png" alt="Reicon — Free Open-Source Icon Library" width="100%" />
  </a>
</p>

# 💻 Website Source Code

This directory contains the source code for the Reicon documentation website, built with **React**, **TypeScript**, and **Vite** (styled with Tailwind CSS v4).

## 🗂️ What's Inside

| File / Folder | Purpose |
| :--- | :--- |
| [`components/`](file:///Users/devchauhan/Documents/Website/reicon/src/components) | Shared React visual components: |
| ├─ `Background.tsx` | High-performance dynamic WebGL background. |
| ├─ `Sidebar.tsx` | Main interface sidebar enabling categories, styling weights, and color customizations. |
| ├─ `IconCard.tsx` | Display cards rendering SVGs, coping HTML templates, or loading skeletons. |
| ├─ `ThemeContext.tsx` | Global dark/light mode toggle and user configuration state. |
| └─ `docs/` | Sub-components styling implementation guidelines (InstallTabs, CodeBlock). |
| [`pages/`](file:///Users/devchauhan/Documents/Website/reicon/src/pages) | Core route pages: |
| ├─ `Landing.tsx` | Landing page layout with interactive examples and features introduction. |
| ├─ `Icons.tsx` | Main interactive search interface and dashboard for Reicon icons. |
| ├─ `IconDetail.tsx` | Deep-dive page detailing individual icon configurations, CDN tags, and download triggers. |
| ├─ `Docs.tsx` | Integrations guidelines page. |
| └─ `Packages.tsx` | Direct comparison and package size breakdowns. |
| [`types/`](file:///Users/devchauhan/Documents/Website/reicon/src/types) | TypeScript interfaces outlining icon schemas, categories, and theme variants. |
| [`App.tsx`](file:///Users/devchauhan/Documents/Website/reicon/src/App.tsx) | Configures react-router lazy routes, error handlers, and global layout wrappers. |
| [`main.tsx`](file:///Users/devchauhan/Documents/Website/reicon/src/main.tsx) | React application DOM mount entry point. |
| [`index.css`](file:///Users/devchauhan/Documents/Website/reicon/src/index.css) | Core stylesheet setting up Tailwind CSS base layers, utilities, animations, and custom theme colors. |

---

## 🎨 Modifying UI Components

* All visual components utilize responsive design layouts.
* Color states are derived using standard styling classes that adapt to Dark and Light modes.
* When adding components, verify browser compatibility and maintain accessibility norms.
