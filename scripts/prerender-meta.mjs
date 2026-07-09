#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync, readdirSync, unlinkSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PostHog } from 'posthog-node';
import { ROUTES } from './seo/config.mjs';
import { SITE, OG_IMAGE, buildMeta, injectMeta, fixFavicons, toPascal, toTitle, humanCat, xmlEscape } from './seo/meta.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '../dist');
const ICON_NAMES_JSON = resolve(__dirname, 'icon-names.json');
const ICON_DATA_JSON = resolve(__dirname, '../data/icon-data.json');

function iconTitle(name, catSlug, tags) {
  return `${toTitle(name)} Icon — Free ${humanCat(catSlug)} SVG | Reicon`;
}

function iconDesc(name, catSlug, tags) {
  const label = toTitle(name);
  const cat = humanCat(catSlug);
  const d = tags.length >= 2
    ? `Free ${label} SVG icon for React, React Native, Vue & HTML. Also called: ${tags.slice(0, 3).join(', ')}. Part of Reicon's ${cat} set — outline & filled, MIT licensed.`
    : `Download the free ${label} SVG icon from Reicon's ${cat} collection. Available in outline and filled weights for React, React Native, Vue, Svelte, Figma, and HTML. MIT licensed.`;
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

  const webPage = {
    '@context': 'https://schema.org', '@type': 'WebPage', '@id': url, url, name: title,
    description: desc, inLanguage: 'en-US',
    isPartOf: { '@type': 'WebSite', url: SITE, name: 'Reicon' },
    breadcrumb: { '@id': `${url}#breadcrumb` },
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
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

function ssrBody(name, catSlug, tags, desc, svgCode) {
  const pascal = toPascal(name);
  const cat = humanCat(catSlug);
  const url = `${SITE}/icon/${name}`;

  const svg = svgCode
    ? svgCode.replace(/currentColor/g, '#fff').replace(/<svg([^>]*)>/, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">`)
    : '';

  const iconBlock = svg
    ? `<div style="width:96px;height:96px;border-radius:16px;background:rgba(108,92,231,0.12);border:1px solid rgba(108,92,231,0.25);display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem" role="img" aria-label="${pascal} icon">${svg}</div>`
    : `<img src="${SITE}/svg/${name}.svg" alt="${pascal} SVG icon" width="72" height="72" style="margin-bottom:1.25rem" loading="eager" />`;

  const tagBadges = tags.length > 0
    ? `<div style="display:flex;flex-wrap:wrap;gap:0.375rem;justify-content:center;margin-top:0.75rem">${tags.map((t) => `<span style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:3px 10px;font-size:0.78rem;color:rgba(255,255,255,0.5)">${t}</span>`).join('')}</div>`
    : '';

  return `<div id="ssr-prerender" style="background:#09090b;color:#fff;min-height:100vh;font-family:'DM Sans',system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;padding:3rem 1.5rem 4rem;text-align:center">
  <nav aria-label="Breadcrumb" style="margin-bottom:2rem;font-size:0.8rem;color:rgba(255,255,255,0.35);align-self:flex-start;max-width:620px;width:100%">
    <ol style="list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:0.25rem;align-items:center">
      <li><a href="${SITE}" style="color:rgba(255,255,255,0.45);text-decoration:none">Reicon</a></li>
      <li style="opacity:0.4;margin:0 0.25rem">›</li>
      <li><a href="${SITE}/icons" style="color:rgba(255,255,255,0.45);text-decoration:none">Icons</a></li>
      <li style="opacity:0.4;margin:0 0.25rem">›</li>
      <li><a href="${SITE}/icons?category=${catSlug}" style="color:rgba(255,255,255,0.45);text-decoration:none">${cat}</a></li>
      <li style="opacity:0.4;margin:0 0.25rem">›</li>
      <li style="color:rgba(255,255,255,0.65)">${toTitle(name)}</li>
    </ol>
  </nav>
  <article style="max-width:620px;width:100%;display:flex;flex-direction:column;align-items:center">
    ${iconBlock}
    <h1 style="font-size:2rem;font-weight:700;margin:0 0 0.625rem;letter-spacing:-0.02em">${pascal} Icon</h1>
    <p style="color:rgba(255,255,255,0.55);max-width:480px;line-height:1.7;margin:0 auto;font-size:0.95rem">${desc}</p>
    <p style="display:inline-flex;align-items:center;background:rgba(108,92,231,0.12);border:1px solid rgba(108,92,231,0.3);border-radius:20px;padding:4px 12px;font-size:0.78rem;color:rgba(108,92,231,0.9);margin-top:1rem">${cat}</p>
    ${tags.length > 0 ? `<p style="font-size:0.78rem;color:rgba(255,255,255,0.3);margin-top:0.75rem">Also known as: ${tags.slice(0, 5).join(', ')}</p>` : ''}
    ${tagBadges}
    <section style="margin-top:2rem;text-align:left;max-width:540px;width:100%">
      <h2 style="font-size:0.85rem;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.3);margin:0 0 0.75rem">Quick Install</h2>
      <pre style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:0.875rem 1rem;font-size:0.82rem;color:rgba(255,255,255,0.7);overflow-x:auto;margin:0"><code>npm install reicon-react</code></pre>
      <pre style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:0.875rem 1rem;font-size:0.82rem;color:rgba(255,255,255,0.7);overflow-x:auto;margin:0.5rem 0 0"><code>import { ${pascal} } from 'reicon-react';\n// &lt;${pascal} size={24} /&gt;</code></pre>
    </section>
    <div style="margin-top:2rem;display:flex;gap:0.75rem;flex-wrap:wrap;justify-content:center">
      <a href="${url}" style="background:#6C5CE7;color:#fff;padding:0.6rem 1.25rem;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.875rem">View icon</a>
      <a href="${SITE}/icons" style="background:rgba(255,255,255,0.08);color:#fff;padding:0.6rem 1.25rem;border-radius:8px;text-decoration:none;font-size:0.875rem">Browse all icons</a>
    </div>
  </article>
</div>`;
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
    const meta = buildMeta({ title: route.title, desc: route.description, url, breadcrumb });
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
  const svgMap = {};
  for (const [catSlug, cat] of Object.entries(iconData.categories)) {
    for (const [name, info] of Object.entries(cat.icons)) {
      if (info.description) tagsMap[name] = info.description;
      catMap[name] = catSlug;
      svgMap[name] = info.weights?.Outline?.code || info.weights?.Filled?.code || '';
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
    const meta = buildMeta({ title, desc, url, ogImageAlt: `Reicon — ${toTitle(name)} icon`, keywords, jsonLd, breadcrumb, isIconPage: true });
    const ssr = ssrBody(name, catSlug, tags, desc, svgMap[name]);
    let html = injectMeta(baseHtml, meta);
    html = html.replace('<div id="root"></div>', `<div id="root"></div>\n  ${ssr}`);
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
