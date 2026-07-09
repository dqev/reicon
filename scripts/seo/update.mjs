#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SITE, SITE_DEFAULTS, ROUTES, GLOBAL_JSON_LD, VOLATILE_ROUTES } from './config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function updateIndexHtml() {
  const path = resolve(ROOT, 'index.html');
  let html = readFileSync(path, 'utf-8');

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(SITE_DEFAULTS.title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(SITE_DEFAULTS.description)}" />`);
  html = html.replace(/<meta name="keywords" content="[^"]*" \/>/, `<meta name="keywords" content="${esc(SITE_DEFAULTS.keywords)}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(SITE_DEFAULTS.ogTitle)}" />`);
  html = html.replace(/<meta property="og:description"\s*\n\s*content="[^"]*" \/>/, `<meta property="og:description"\n    content="${esc(SITE_DEFAULTS.ogDescription)}" />`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(SITE_DEFAULTS.ogTitle)}" />`);
  html = html.replace(/<meta name="twitter:description"\s*\n\s*content="[^"]*" \/>/, `<meta name="twitter:description"\n    content="${esc(SITE_DEFAULTS.ogDescription)}" />`);

  const ldBlocks = GLOBAL_JSON_LD.map((ld) =>
    `  <script type="application/ld+json">\n  ${JSON.stringify(ld, null, 2).split('\n').join('\n  ')}\n  </script>`
  ).join('\n\n');
  html = html.replace(/(\s*<script type="application\/ld\+json">[\s\S]*?<\/script>\s*)+(?=<\/head>)/, `\n${ldBlocks}\n`);

  writeFileSync(path, html, 'utf-8');
  console.log('✓ index.html updated');
}

function updatePrerender() {
  const path = resolve(ROOT, 'scripts', 'prerender-meta.mjs');
  let src = readFileSync(path, 'utf-8');
  src = src.replace(
    /const ROUTES_OVERRIDE = \[[\s\S]*?\];/,
    ''
  );
  writeFileSync(path, src, 'utf-8');
  console.log('✓ prerender-meta.mjs uses seo/config.mjs directly — no override needed');
}

function updateSitemap() {
  const path = resolve(ROOT, 'scripts', 'generate-sitemap.mjs');
  let src = readFileSync(path, 'utf-8');
  const volatileList = [...VOLATILE_ROUTES].map((r) => JSON.stringify(r)).join(', ');
  src = src.replace(
    /const VOLATILE = new Set\(\[[\s\S]*?\]\);/,
    `const VOLATILE = new Set([${volatileList}]);`
  );
  writeFileSync(path, src, 'utf-8');
  console.log('✓ generate-sitemap.mjs VOLATILE updated');
}

console.log('Updating SEO from scripts/seo/config.mjs...\n');
updateIndexHtml();
updatePrerender();
updateSitemap();
console.log('\nDone. Run "npm run build" to apply to static output.');
