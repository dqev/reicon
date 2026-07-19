#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync, readdirSync, unlinkSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PostHog } from 'posthog-node';
import { ROUTES } from './seo/config.mjs';
import { SITE, buildMeta, injectMeta, fixFavicons, toTitle } from './seo/meta.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '../dist');

async function main() {
  if (!existsSync(DIST)) { console.error('dist/ not found — run vite build first'); process.exit(1); }

  const srcFavicon = resolve(__dirname, '../public/favicon');
  const destFavicon = resolve(DIST, 'favicon');
  try { cpSync(srcFavicon, destFavicon, { recursive: true }); console.log('✓ favicon copied'); }
  catch (e) { console.error('favicon copy failed:', e.message); }

  const indexHtmlPath = resolve(DIST, 'index.html');
  const baseHtml = fixFavicons(readFileSync(indexHtmlPath, 'utf-8'));
  writeFileSync(indexHtmlPath, baseHtml, 'utf-8');
  console.log('✓ favicon refs unhasked');

  const assetsDir = resolve(DIST, 'assets');
  if (existsSync(assetsDir)) {
    let removed = 0;
    for (const f of readdirSync(assetsDir)) {
      if (f.startsWith('favicon-') || f.startsWith('apple-touch-icon-') || (f.startsWith('site-') && f.endsWith('.webmanifest'))) {
        try { unlinkSync(resolve(assetsDir, f)); removed++; } catch {}
      }
    }
    if (removed > 0) console.log(`✓ removed ${removed} hashed favicon assets`);
  }

  for (const route of ROUTES) {
    const url = route.path === '/' ? `${SITE}/` : `${SITE}${route.path}`;
    const parts = route.path.split('/').filter(Boolean);
    const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Reicon', item: SITE }];
    let acc = '';
    for (const p of parts) {
      acc += `/${p}`;
      crumbs.push({ '@type': 'ListItem', position: crumbs.length + 1, name: toTitle(p), item: `${SITE}${acc}` });
    }
    const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs };
    const meta = buildMeta({ title: route.title, desc: route.description, url, ogImage: route.ogImage, breadcrumb });
    const html = injectMeta(baseHtml, meta);
    if (route.path === '/') {
      writeFileSync(resolve(DIST, 'index.html'), html, 'utf-8');
    } else {
      const dir = resolve(DIST, route.path.replace(/^\//, ''));
      mkdirSync(dir, { recursive: true });
      writeFileSync(resolve(dir, 'index.html'), html, 'utf-8');
    }
  }
  console.log(`✓ ${ROUTES.length} static pages`);

  const ph = new PostHog(process.env.POSTHOG_API_KEY, { host: process.env.POSTHOG_HOST, flushAt: 1, flushInterval: 0 });
  ph.capture({ distinctId: 'build-system', event: 'prerender complete', properties: { static: ROUTES.length } });
  await ph.shutdown();
}

main();
