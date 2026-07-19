#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync, readdirSync, unlinkSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PostHog } from 'posthog-node';
import { ROUTES } from './seo/config.mjs';
import { SITE, buildMeta, injectMeta, fixFavicons, toPascal, toTitle, humanCat } from './seo/meta.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '../dist');
const ICON_NAMES_JSON = resolve(__dirname, 'icon-names.json');
const ICON_DATA_JSON = resolve(__dirname, '../data/icon-data.json');

function iconTitle(name, catSlug, tags) {
  return `${toTitle(name)} Icon — Reicon`;
}

function iconDesc(name, catSlug, tags) {
  const label = toTitle(name);
  const cat = humanCat(catSlug);
  const d = `Free ${label} SVG icon from Reicon's ${cat} collection. Outline & filled weights. MIT licensed.`;
  return d.length <= 155 ? d : d.slice(0, 152) + '…';
}

function iconKeywords(name, catSlug, tags) {
  const label = toTitle(name);
  const cat = humanCat(catSlug).toLowerCase();
  const base = [
    `${name} icon`, `${label} svg icon`, `${name} svg`, `download ${name} icon`,
    `${name} react`, `${name} react native`, `${name} vue`, `${name} svelte`,
    `free ${cat} icon`, `${cat} svg icon`, 'free svg icon', 'open source icon', 'reicon',
  ];
  return [...new Set([...tags.flatMap((t) => [`${t} icon`, `${t} svg`]), ...base])].slice(0, 20).join(', ');
}

function iconJsonLd(name, catSlug, tags, url, title, desc) {
  const pascal = toPascal(name);
  const cat = humanCat(catSlug);
  const iconOg = `${SITE}/og/icon-detail.jpg`;

  const webPage = {
    '@context': 'https://schema.org', '@type': 'WebPage', '@id': url, url, name: title,
    description: desc, inLanguage: 'en-US',
    isPartOf: { '@type': 'WebSite', url: SITE, name: 'Reicon' },
    breadcrumb: { '@id': `${url}#breadcrumb` },
    primaryImageOfPage: { '@type': 'ImageObject', url: iconOg },
    dateModified: new Date().toISOString().split('T')[0],
  };

  const software = {
    '@context': 'https://schema.org', '@type': 'SoftwareSourceCode',
    name: `${pascal} Icon`, description: desc, url,
    programmingLanguage: ['SVG', 'React', 'React Native', 'Vue', 'Svelte'],
    runtimePlatform: ['Browser', 'Node.js', 'React Native'],
    license: 'https://opensource.org/licenses/MIT',
    isPartOf: { '@type': 'SoftwareApplication', name: 'Reicon', url: SITE },
    ...(tags.length > 0 && { keywords: tags.join(', ') }),
  };

  const definedTerm = {
    '@context': 'https://schema.org', '@type': 'DefinedTerm',
    name: `${toTitle(name)} Icon`, description: desc,
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: `Reicon ${cat} Icons`, url: `${SITE}/icons` },
  };

  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Reicon', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Icons', item: `${SITE}/icons` },
      { '@type': 'ListItem', position: 3, name: cat, item: `${SITE}/icons?category=${catSlug}` },
      { '@type': 'ListItem', position: 4, name: `${toTitle(name)} Icon`, item: url },
    ],
  };

  return { jsonLd: [webPage, software, definedTerm], breadcrumb };
}

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

  const iconNames = JSON.parse(readFileSync(ICON_NAMES_JSON, 'utf-8'));
  const iconData = JSON.parse(readFileSync(ICON_DATA_JSON, 'utf-8'));
  const allIcons = Object.keys(iconNames);

  const tagsMap = {};
  const catMap = {};
  for (const [catSlug, cat] of Object.entries(iconData.categories)) {
    for (const [name, info] of Object.entries(cat.icons)) {
      if (info.description) tagsMap[name] = info.description;
      catMap[name] = catSlug;
    }
  }

  for (const name of allIcons) {
    const catSlug = catMap[name] || 'general';
    const tags = tagsMap[name] || [];
    const url = `${SITE}/icon/${name}`;
    const title = iconTitle(name, catSlug, tags);
    const desc = iconDesc(name, catSlug, tags);
    const keywords = iconKeywords(name, catSlug, tags);
    const { jsonLd, breadcrumb } = iconJsonLd(name, catSlug, tags, url, title, desc);
    const meta = buildMeta({ title, desc, url, ogImage: `${SITE}/og/icon-detail.jpg`, ogImageAlt: `Reicon — ${toTitle(name)} icon`, keywords, jsonLd, breadcrumb, isIconPage: true });
    const html = injectMeta(baseHtml, meta);
    const dir = resolve(DIST, 'icon', name);
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, 'index.html'), html, 'utf-8');
  }
  console.log(`✓ ${allIcons.length} icon pages`);

  const ph = new PostHog(process.env.POSTHOG_API_KEY, { host: process.env.POSTHOG_HOST, flushAt: 1, flushInterval: 0 });
  ph.capture({ distinctId: 'build-system', event: 'prerender complete', properties: { static: ROUTES.length, icons: allIcons.length } });
  await ph.shutdown();
}

main();
