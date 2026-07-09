#!/usr/bin/env node

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PostHog } from 'posthog-node';
import { ROUTES, VOLATILE_ROUTES } from './seo/config.mjs';
import { SITE, xmlEscape } from './seo/meta.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public');
const ICON_NAMES_JSON = resolve(__dirname, 'icon-names.json');
const LASTMOD_CACHE = resolve(__dirname, 'lastmod-cache.json');

function loadIcons() {
  const data = JSON.parse(readFileSync(ICON_NAMES_JSON, 'utf-8'));
  const names = Object.keys(data);
  console.log(`Found ${names.length} icons`);
  return names;
}

function loadCache() {
  if (!existsSync(LASTMOD_CACHE)) return {};
  try { return JSON.parse(readFileSync(LASTMOD_CACHE, 'utf-8')); }
  catch { return {}; }
}

function stableDate(cache, key, today) {
  if (!cache[key]) cache[key] = today;
  return cache[key];
}

function urlset(entries, images = false) {
  const ns = images
    ? `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`
    : `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const urls = entries.map((e) => {
    const img = e.image ? `\n    <image:image>\n      <image:loc>${e.image.loc}</image:loc>\n      <image:title>${e.image.title}</image:title>\n      <image:caption>${e.image.caption}</image:caption>\n    </image:image>` : '';
    return `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>${img}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n${ns}\n${urls.join('\n')}\n</urlset>`;
}

function sitemapIndex(sitemaps) {
  const entries = sitemaps.map((s) => `  <sitemap>\n    <loc>${s.loc}</loc>\n    <lastmod>${s.lastmod}</lastmod>\n  </sitemap>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</sitemapindex>`;
}

async function main() {
  const icons = loadIcons();
  const today = new Date().toISOString().split('T')[0];
  const cache = loadCache();

  const staticEntries = ROUTES.map((r) => ({
    loc: `${SITE}${r.path === '/' ? '/' : r.path}`,
    lastmod: VOLATILE_ROUTES.has(r.path) ? today : stableDate(cache, `${SITE}${r.path}`, today),
    changefreq: r.changefreq,
    priority: r.priority,
  }));
  writeFileSync(resolve(OUT, 'sitemap-pages.xml'), urlset(staticEntries), 'utf-8');

  const CHUNK = 500;
  const iconSitemaps = [];
  for (let i = 0; i < icons.length; i += CHUNK) {
    const chunk = icons.slice(i, i + CHUNK);
    const idx = Math.floor(i / CHUNK) + 1;
    const filename = `sitemap-icons-${idx}.xml`;
    const entries = chunk.map((name) => {
      const label = name.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      return {
        loc: `${SITE}/icon/${name}`,
        lastmod: stableDate(cache, `${SITE}/icon/${name}`, today),
        changefreq: 'monthly',
        priority: '0.6',
        image: {
          loc: `https://cdn.reicon.dev/svg/${name}.svg`,
          title: xmlEscape(`${label} Icon — Reicon`),
          caption: xmlEscape(`Free ${label.toLowerCase()} SVG icon. Available in Outline and Filled weights. MIT licensed.`),
        },
      };
    });
    writeFileSync(resolve(OUT, filename), urlset(entries, true), 'utf-8');
    const newest = entries.reduce((max, e) => (e.lastmod > max ? e.lastmod : max), entries[0]?.lastmod || today);
    iconSitemaps.push({ loc: `${SITE}/${filename}`, lastmod: newest });
  }

  writeFileSync(resolve(OUT, 'sitemap.xml'), sitemapIndex([
    { loc: `${SITE}/sitemap-pages.xml`, lastmod: today },
    ...iconSitemaps,
  ]), 'utf-8');

  writeFileSync(LASTMOD_CACHE, JSON.stringify(cache, null, 0), 'utf-8');

  const total = ROUTES.length + icons.length;
  console.log(`Sitemap: ${1 + iconSitemaps.length} files, ${total} URLs`);

  const ph = new PostHog(process.env.POSTHOG_API_KEY, { host: process.env.POSTHOG_HOST, flushAt: 1, flushInterval: 0 });
  ph.capture({ distinctId: 'build-system', event: 'sitemap generated', properties: { icon_count: icons.length, page_count: ROUTES.length, total_urls: total } });
  await ph.shutdown();
}

main();
