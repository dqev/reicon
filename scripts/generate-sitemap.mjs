#!/usr/bin/env node
/**
 * Generates sitemap.xml with all static pages + all 1700+ icon detail pages.
 * Fetches the icon list from the CDN at build time.
 *
 * Usage: node scripts/generate-sitemap.mjs
 * Output: public/sitemap.xml
 */

import { writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://reicon.dev';
const ICON_NAMES_JSON = resolve(__dirname, 'icon-names.json');
const OUT = resolve(__dirname, '../public/sitemap.xml');

const STATIC_PAGES = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/icons', priority: '0.9', changefreq: 'weekly' },
  { loc: '/usage', priority: '0.8', changefreq: 'monthly' },
  { loc: '/usage/react', priority: '0.8', changefreq: 'monthly' },
  { loc: '/usage/vue', priority: '0.8', changefreq: 'monthly' },
  { loc: '/usage/vanilla', priority: '0.8', changefreq: 'monthly' },
  { loc: '/packages', priority: '0.7', changefreq: 'monthly' },
  { loc: '/pack', priority: '0.7', changefreq: 'monthly' },
  { loc: '/terms', priority: '0.3', changefreq: 'yearly' },
  { loc: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { loc: '/license', priority: '0.3', changefreq: 'yearly' },
];

function loadIconNames() {
  console.log(`Reading icon names from ${ICON_NAMES_JSON}...`);
  const data = JSON.parse(readFileSync(ICON_NAMES_JSON, 'utf-8'));
  const names = Object.keys(data);
  console.log(`Found ${names.length} icons`);
  return names;
}

function buildUrlset(entries) {
  const urls = entries.map((e) =>
    `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

function buildSitemapIndex(sitemaps) {
  const entries = sitemaps.map((s) =>
    `  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</sitemapindex>`;
}

function main() {
  const icons = loadIconNames();
  const today = new Date().toISOString().split('T')[0];
  const OUT_DIR = resolve(__dirname, '../public');

  // 1. Static pages sitemap
  const staticEntries = STATIC_PAGES.map((p) => ({
    loc: `${SITE}${p.loc}`,
    lastmod: today,
    changefreq: p.changefreq,
    priority: p.priority,
  }));
  writeFileSync(resolve(OUT_DIR, 'sitemap-pages.xml'), buildUrlset(staticEntries), 'utf-8');

  // 2. Icon sitemaps — split into chunks of 500
  const CHUNK = 500;
  const iconSitemaps = [];
  for (let i = 0; i < icons.length; i += CHUNK) {
    const chunk = icons.slice(i, i + CHUNK);
    const idx = Math.floor(i / CHUNK) + 1;
    const filename = `sitemap-icons-${idx}.xml`;
    const entries = chunk.map((name) => ({
      loc: `${SITE}/icon/${name}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.6',
    }));
    writeFileSync(resolve(OUT_DIR, filename), buildUrlset(entries), 'utf-8');
    iconSitemaps.push({ loc: `${SITE}/${filename}`, lastmod: today });
  }

  // 3. Sitemap index
  const sitemapIndex = buildSitemapIndex([
    { loc: `${SITE}/sitemap-pages.xml`, lastmod: today },
    ...iconSitemaps,
  ]);
  writeFileSync(resolve(OUT_DIR, 'sitemap.xml'), sitemapIndex, 'utf-8');

  console.log(`Sitemap index written with ${1 + iconSitemaps.length} sub-sitemaps (${STATIC_PAGES.length + icons.length} total URLs)`);
}

main();
