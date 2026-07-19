#!/usr/bin/env node

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PostHog } from 'posthog-node';
import { ROUTES, VOLATILE_ROUTES } from './seo/config.mjs';
import { SITE } from './seo/meta.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public');
const LASTMOD_CACHE = resolve(__dirname, 'lastmod-cache.json');

function loadCache() {
  if (!existsSync(LASTMOD_CACHE)) return {};
  try { return JSON.parse(readFileSync(LASTMOD_CACHE, 'utf-8')); }
  catch { return {}; }
}

function stableDate(cache, key, today) {
  if (!cache[key]) cache[key] = today;
  return cache[key];
}

async function main() {
  const today = new Date().toISOString().split('T')[0];
  const cache = loadCache();

  const entries = ROUTES.map((r) => ({
    loc: `${SITE}${r.path === '/' ? '/' : r.path}`,
    lastmod: VOLATILE_ROUTES.has(r.path) ? today : stableDate(cache, `${SITE}${r.path}`, today),
    changefreq: r.changefreq,
    priority: r.priority,
  }));

  const urlset = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`).join('\n')}\n</urlset>`;

  writeFileSync(resolve(OUT, 'sitemap.xml'), urlset, 'utf-8');

  writeFileSync(LASTMOD_CACHE, JSON.stringify(cache, null, 0), 'utf-8');

  console.log(`Sitemap: 1 file, ${ROUTES.length} URLs`);

  const ph = new PostHog(process.env.POSTHOG_API_KEY, { host: process.env.POSTHOG_HOST, flushAt: 1, flushInterval: 0 });
  ph.capture({ distinctId: 'build-system', event: 'sitemap generated', properties: { page_count: ROUTES.length, total_urls: ROUTES.length } });
  await ph.shutdown();
}

main();
