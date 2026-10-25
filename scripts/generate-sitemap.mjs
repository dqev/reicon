#!/usr/bin/env node

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PostHog } from 'posthog-node';
import { ROUTES, VOLATILE_ROUTES } from './seo/config.mjs';
import { buildDetailRoutes } from './seo/detail-routes.mjs';
import { SITE } from './seo/meta.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../apps/web/public');
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

function buildUrlset(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`).join('\n')}\n</urlset>`;
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

  writeFileSync(resolve(OUT, 'sitemap.xml'), buildUrlset(entries), 'utf-8');

  const detailRoutes = buildDetailRoutes();
  const groups = {
    icons: detailRoutes.filter((r) => r.path.startsWith('/icon/')),
    glass: detailRoutes.filter((r) => r.path.startsWith('/glass/')),
    brands: detailRoutes.filter((r) => r.path.startsWith('/brands/')),
    flags: detailRoutes.filter((r) => r.path.startsWith('/flags/')),
  };

  const sitemaps = [{ file: 'sitemap.xml', count: entries.length }];

  for (const [name, routes] of Object.entries(groups)) {
    const detailEntries = routes.map((r) => {
      const loc = `${SITE}${r.path}`;
      return {
        loc,
        lastmod: stableDate(cache, loc, today),
        changefreq: 'monthly',
        priority: name === 'icons' ? '0.6' : '0.5',
      };
    });
    const file = `sitemap-${name}.xml`;
    writeFileSync(resolve(OUT, file), buildUrlset(detailEntries), 'utf-8');
    sitemaps.push({ file, count: detailEntries.length });
  }

  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps.map((s) => `  <sitemap>\n    <loc>${SITE}/${s.file}</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>`).join('\n')}\n</sitemapindex>`;
  writeFileSync(resolve(OUT, 'sitemap-index.xml'), indexXml, 'utf-8');

  writeFileSync(LASTMOD_CACHE, JSON.stringify(cache, null, 0), 'utf-8');

  const detailCount = Object.values(groups).reduce((sum, routes) => sum + routes.length, 0);
  console.log(`Sitemaps: ${sitemaps.length + 1} files (${entries.length} pages + ${detailCount} detail URLs)`);
  sitemaps.forEach((s) => console.log(`  ${s.file}: ${s.count}`));

  const ph = new PostHog(process.env.POSTHOG_API_KEY, { host: process.env.POSTHOG_HOST, flushAt: 1, flushInterval: 0 });
  ph.capture({ distinctId: 'build-system', event: 'sitemap generated', properties: { page_count: entries.length, detail_count: detailCount, total_urls: entries.length + detailCount } });
  await ph.shutdown();
}

main();
