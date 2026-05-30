#!/usr/bin/env node
/**
 * Generates sitemap.xml with all static pages + all 2700+ icon detail pages.
 * Fetches the icon list from the CDN at build time.
 *
 * Usage: node scripts/generate-sitemap.mjs
 * Output: public/sitemap.xml
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PostHog } from 'posthog-node';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://reicon.dev';
const ICON_NAMES_JSON = resolve(__dirname, 'icon-names.json');
const LASTMOD_CACHE = resolve(__dirname, 'lastmod-cache.json');

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

/**
 * Per-URL lastmod persistence.
 *
 * Google increasingly distrusts sitemaps where every <lastmod> changes on
 * every build. We persist the date each URL was first seen (or last legitimately
 * changed) so unchanged pages keep a stable date and only genuinely new URLs get
 * today's date. The cache lives in scripts/lastmod-cache.json (commit it).
 */
function loadLastmodCache() {
  if (!existsSync(LASTMOD_CACHE)) return {};
  try {
    return JSON.parse(readFileSync(LASTMOD_CACHE, 'utf-8'));
  } catch {
    return {};
  }
}

function resolveLastmod(cache, key, today) {
  if (!cache[key]) cache[key] = today;
  return cache[key];
}

function buildUrlset(entries, { withImages = false } = {}) {
  const ns = withImages
    ? `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`
    : `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const urls = entries.map((e) => {
    const image = e.image
      ? `
    <image:image>
      <image:loc>${e.image.loc}</image:loc>
      <image:title>${e.image.title}</image:title>
      <image:caption>${e.image.caption}</image:caption>
    </image:image>`
      : '';
    return `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>${image}
  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
${ns}
${urls.join('\n')}
</urlset>`;
}

function xmlEscape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
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

async function main() {
  const icons = loadIconNames();
  const today = new Date().toISOString().split('T')[0];
  const OUT_DIR = resolve(__dirname, '../public');
  const lastmodCache = loadLastmodCache();

  // 1. Static pages sitemap.
  //    Marketing/static pages legitimately change with each deploy, so they
  //    keep today's date; legal pages rarely change so they stay stable.
  const VOLATILE = new Set(['/', '/icons', '/usage', '/usage/react', '/usage/vue', '/usage/vanilla', '/packages', '/pack']);
  const staticEntries = STATIC_PAGES.map((p) => ({
    loc: `${SITE}${p.loc}`,
    lastmod: VOLATILE.has(p.loc) ? today : resolveLastmod(lastmodCache, `${SITE}${p.loc}`, today),
    changefreq: p.changefreq,
    priority: p.priority,
  }));
  writeFileSync(resolve(OUT_DIR, 'sitemap-pages.xml'), buildUrlset(staticEntries), 'utf-8');

  // 2. Icon sitemaps — split into chunks of 500, with image extensions
  //    so each icon page surfaces in Google Images. Per-icon lastmod is stable.
  const CHUNK = 500;
  const iconSitemaps = [];
  for (let i = 0; i < icons.length; i += CHUNK) {
    const chunk = icons.slice(i, i + CHUNK);
    const idx = Math.floor(i / CHUNK) + 1;
    const filename = `sitemap-icons-${idx}.xml`;
    const entries = chunk.map((name) => {
      const pretty = name
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      return {
        loc: `${SITE}/icon/${name}`,
        lastmod: resolveLastmod(lastmodCache, `${SITE}/icon/${name}`, today),
        changefreq: 'monthly',
        priority: '0.6',
        image: {
          loc: `https://cdn.reicon.dev/svg/${name}.svg`,
          title: xmlEscape(`${pretty} Icon — Reicon`),
          caption: xmlEscape(`Free ${pretty.toLowerCase()} SVG icon by Reicon. Available in Outline and Filled weights. MIT licensed.`),
        },
      };
    });
    writeFileSync(resolve(OUT_DIR, filename), buildUrlset(entries, { withImages: true }), 'utf-8');
    // Sub-sitemap lastmod = newest icon date inside it.
    const newest = entries.reduce((max, e) => (e.lastmod > max ? e.lastmod : max), entries[0]?.lastmod || today);
    iconSitemaps.push({ loc: `${SITE}/${filename}`, lastmod: newest });
  }

  // 3. Sitemap index
  const sitemapIndex = buildSitemapIndex([
    { loc: `${SITE}/sitemap-pages.xml`, lastmod: today },
    ...iconSitemaps,
  ]);
  writeFileSync(resolve(OUT_DIR, 'sitemap.xml'), sitemapIndex, 'utf-8');

  // Persist the lastmod cache so dates stay stable across builds.
  writeFileSync(LASTMOD_CACHE, JSON.stringify(lastmodCache, null, 0), 'utf-8');

  const totalUrls = STATIC_PAGES.length + icons.length;
  console.log(`Sitemap index written with ${1 + iconSitemaps.length} sub-sitemaps (${totalUrls} total URLs)`);

  const posthog = new PostHog(process.env.POSTHOG_API_KEY, {
    host: process.env.POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  posthog.capture({
    distinctId: 'build-system',
    event: 'sitemap generated',
    properties: {
      icon_count: icons.length,
      static_page_count: STATIC_PAGES.length,
      total_urls: totalUrls,
      sitemap_count: 1 + iconSitemaps.length,
    },
  });
  await posthog.shutdown();
}

main();
