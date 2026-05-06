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
  { loc: '/',         priority: '1.0', changefreq: 'weekly' },
  { loc: '/icons',    priority: '0.9', changefreq: 'weekly' },
  { loc: '/usage',    priority: '0.8', changefreq: 'monthly' },
  { loc: '/packages', priority: '0.7', changefreq: 'monthly' },
  { loc: '/terms',    priority: '0.3', changefreq: 'yearly' },
  { loc: '/privacy',  priority: '0.3', changefreq: 'yearly' },
  { loc: '/license',  priority: '0.3', changefreq: 'yearly' },
];

function loadIconNames() {
  console.log(`Reading icon names from ${ICON_NAMES_JSON}...`);
  const data = JSON.parse(readFileSync(ICON_NAMES_JSON, 'utf-8'));
  const names = Object.keys(data);
  console.log(`Found ${names.length} icons`);
  return names;
}

function buildSitemap(icons) {
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    ...STATIC_PAGES.map((p) =>
      `  <url>
    <loc>${SITE}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    ),
    ...icons.map((name) =>
      `  <url>
    <loc>${SITE}/icon/${name}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

function main() {
  const icons = loadIconNames();
  const xml = buildSitemap(icons);
  writeFileSync(OUT, xml, 'utf-8');
  console.log(`Sitemap written to ${OUT} (${STATIC_PAGES.length + icons.length} URLs)`);
}

main();
