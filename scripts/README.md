<p align="center">
  <a href="https://reicon.dev">
    <img src="https://raw.githubusercontent.com/dqev/reicon/main/public/readme-banner.png" alt="Reicon — Free Open-Source Icon Library" width="100%" />
  </a>
</p>

# 🛠️ Tooling & Utilities Scripts

This folder contains the build pipeline automation, SEO utilities, and asset compile tools.

## 🗂️ Script Catalog

| Script File | Purpose | Command |
| :--- | :--- | :--- |
| [`generate-zip.mjs`](file:///Users/devchauhan/Documents/Website/reicon/scripts/generate-zip.mjs) | Compiles all outline and filled icon SVG assets from `icon-data.json` and compresses them into a zip file at `public/reicon-icons.zip`. | `node scripts/generate-zip.mjs` |
| [`generate-sitemap.mjs`](file:///Users/devchauhan/Documents/Website/reicon/scripts/generate-sitemap.mjs) | Generates `sitemap.xml` and partitions segmented icon sitemaps (`sitemap-icons-*.xml`) for search engine crawlers. | `npm run sitemap` |
| [`prerender-meta.mjs`](file:///Users/devchauhan/Documents/Website/reicon/scripts/prerender-meta.mjs) | Reads compiled icon pages and pre-renders static HTML pages with customized metadata to support previews and SEO indexing. | (Runs automatically on build) |
| [`test-seo.mjs`](file:///Users/devchauhan/Documents/Website/reicon/scripts/test-seo.mjs) | Audits the website build to check for missing HTML meta elements, headers, or broken page structures. | `npm run seo:check` |
| [`ping-search-engines.mjs`](file:///Users/devchauhan/Documents/Website/reicon/scripts/ping-search-engines.mjs) | Pings IndexNow endpoints and key search engine crawlers to request instant indexing of new/modified pages. | `npm run ping` |

## 📦 Helper Datasets
* **`icon-names.json`**: Cached lookup dictionary map of all valid kebab-case names, categories, and titles.
* **`lastmod-cache.json`**: Tracking logs for the last modified timestamp of documentation sub-routes, preventing redundant rebuilds.
