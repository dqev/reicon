#!/usr/bin/env node
/**
 * Post-build pre-renderer for SEO.
 * Takes dist/index.html and generates per-route HTML files with
 * unique <title>, <meta>, OG/Twitter tags, and JSON-LD baked into
 * the static HTML — so crawlers that don't execute JS still get
 * correct metadata.
 *
 * Usage: node scripts/prerender-meta.mjs  (run after vite build)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PostHog } from 'posthog-node';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '../dist');
const ICON_NAMES_JSON = resolve(__dirname, 'icon-names.json');
const ICON_DATA_JSON = resolve(__dirname, '../data/icon-data.json');
const SITE = 'https://reicon.dev';

// ── Page definitions ────────────────────────────────────────────────
const STATIC_PAGES = [
  {
    path: '/',
    title: 'Reicon — Free Open-Source Icon Library for Designers & Developers',
    desc: 'Reicon is a free, open-source icon library with 2700+ handcrafted, pixel-perfect SVG icons for React, Vue, Svelte, Figma, and the web. MIT licensed.',
    url: `${SITE}/`,
    ogImage: `${SITE}/og-image.png`,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE }
      ]
    },
  },
  {
    path: '/icons',
    title: 'Browse 2700+ Free Icons — Reicon Icon Library',
    desc: 'Browse and search 2700+ free, open-source SVG icons. Filter by category, weight, and size. Copy React, Vue, Svelte, or HTML code instantly.',
    url: `${SITE}/icons`,
    ogImage: `${SITE}/og-image.png`,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "Icons", "item": `${SITE}/icons` }
      ]
    },
  },
  {
    path: '/usage',
    title: 'Usage Guide — Reicon | React, Vue, Svelte & CDN Icon Library',
    desc: 'Learn how to install and use Reicon icons in React, Vue, Svelte, and vanilla JavaScript. Props reference, TypeScript support, icon weights, and code examples.',
    url: `${SITE}/usage`,
    ogImage: `${SITE}/og-image.png`,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "Usage", "item": `${SITE}/usage` }
      ]
    },
  },
  {
    path: '/usage/react',
    title: 'React Usage Guide — Reicon | React Icon Library',
    desc: 'Learn how to install and use Reicon icons in React. Import components, customize props, tree-shake unused icons, and use with Tailwind CSS.',
    url: `${SITE}/usage/react`,
    ogImage: `${SITE}/og-image.png`,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "Usage", "item": `${SITE}/usage` },
        { "@type": "ListItem", "position": 3, "name": "React", "item": `${SITE}/usage/react` }
      ]
    },
  },
  {
    path: '/usage/vue',
    title: 'Vue Usage Guide — Reicon | Vue 3 Icon Library',
    desc: 'Learn how to install and use Reicon icons in Vue 3 and Nuxt 3. Import components, customize props, tree-shake unused icons.',
    url: `${SITE}/usage/vue`,
    ogImage: `${SITE}/og-image.png`,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "Usage", "item": `${SITE}/usage` },
        { "@type": "ListItem", "position": 3, "name": "Vue", "item": `${SITE}/usage/vue` }
      ]
    },
  },
  {
    path: '/usage/svelte',
    title: 'Svelte Usage Guide — Reicon | Svelte Icon Library',
    desc: 'Learn how to install and use Reicon icons in Svelte. Import components, customize props, and integrate with SvelteKit.',
    url: `${SITE}/usage/svelte`,
    ogImage: `${SITE}/og-image.png`,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "Usage", "item": `${SITE}/usage` },
        { "@type": "ListItem", "position": 3, "name": "Svelte", "item": `${SITE}/usage/svelte` }
      ]
    },
  },
  {
    path: '/usage/vanilla',
    title: 'CDN / JavaScript Usage Guide — Reicon | Vanilla JS Icons',
    desc: 'Learn how to use Reicon icons via CDN in vanilla JavaScript and HTML. No build tools needed.',
    url: `${SITE}/usage/vanilla`,
    ogImage: `${SITE}/og-image.png`,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "Usage", "item": `${SITE}/usage` },
        { "@type": "ListItem", "position": 3, "name": "Vanilla", "item": `${SITE}/usage/vanilla` }
      ]
    },
  },
  {
    path: '/usage/figma',
    title: 'Figma Plugin Guide — Reicon | Drag & Drop Figma Icons',
    desc: 'Learn how to install and use the Reicon Figma Plugin. Search, customize stroke weights, and drag-and-drop vector icons directly onto your active design canvas.',
    url: `${SITE}/usage/figma`,
    ogImage: `${SITE}/og-image.png`,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "Usage", "item": `${SITE}/usage` },
        { "@type": "ListItem", "position": 3, "name": "Figma", "item": `${SITE}/usage/figma` }
      ]
    },
  },
  {
    path: '/usage/vscode',
    title: 'VS Code Extension Guide — Reicon | Sidebar Snippet Installer',
    desc: 'Learn how to install and use the Reicon VS Code Extension. Search, configure defaults, and insert custom React, Vue, Svelte, or raw SVG code directly at your cursor.',
    url: `${SITE}/usage/vscode`,
    ogImage: `${SITE}/og-image.png`,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "Usage", "item": `${SITE}/usage` },
        { "@type": "ListItem", "position": 3, "name": "VS Code", "item": `${SITE}/usage/vscode` }
      ]
    },
  },
  {
    path: '/usage/svg',
    title: 'Raw SVG Assets Guide — Reicon | Embed & Style Raw Vector Files',
    desc: 'Learn how to download and use raw Reicon SVG icons in HTML, static web layouts, or CMS templates. Customize dimensions, weights, and apply CSS currentColor styling.',
    url: `${SITE}/usage/svg`,
    ogImage: `${SITE}/og-image.png`,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "Usage", "item": `${SITE}/usage` },
        { "@type": "ListItem", "position": 3, "name": "Raw SVGs", "item": `${SITE}/usage/svg` }
      ]
    },
  },
  {
    path: '/packages',
    title: 'Packages — Reicon | React, Vue, Svelte & JavaScript Icon Packages',
    desc: 'Install Reicon icon packages for React, Vue, Svelte, and JavaScript. Tree-shakeable, zero dependencies, MIT licensed.',
    url: `${SITE}/packages`,
    ogImage: `${SITE}/og-image.png`,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "Packages", "item": `${SITE}/packages` }
      ]
    },
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions — Reicon | Free Open-Source Icons',
    desc: 'Frequently asked questions about Reicon icon library. License, Figma integration, React/Vue/Svelte support, custom request, and contribution guidelines.',
    url: `${SITE}/faq`,
    ogImage: `${SITE}/og-image.png`,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "FAQ", "item": `${SITE}/faq` }
      ]
    },
  },
  {
    path: '/pack',
    title: 'Icon Pack Builder — Reicon | Custom Icon Packs',
    desc: 'Select and export custom icon packs from Reicon. Download as SVG, PNG, or WebP ZIP files. Build your own icon set.',
    url: `${SITE}/pack`,
    ogImage: `${SITE}/og-image.png`,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "Icon Pack", "item": `${SITE}/pack` }
      ]
    },
  },
  {
    path: '/terms',
    title: 'Terms of Service — Reicon',
    desc: 'Terms of service for using Reicon, the free open-source icon library.',
    url: `${SITE}/terms`,
    ogImage: `${SITE}/og-image.png`,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "Terms", "item": `${SITE}/terms` }
      ]
    },
  },
  {
    path: '/privacy',
    title: 'Privacy Policy — Reicon',
    desc: 'Privacy policy for Reicon, the free open-source icon library. Learn how we handle your data.',
    url: `${SITE}/privacy`,
    ogImage: `${SITE}/og-image.png`,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "Privacy", "item": `${SITE}/privacy` }
      ]
    },
  },
  {
    path: '/license',
    title: 'License — Reicon | MIT License',
    desc: 'Reicon is free and open-source under the MIT license. Use it in personal and commercial projects.',
    url: `${SITE}/license`,
    ogImage: `${SITE}/og-image.png`,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "License", "item": `${SITE}/license` }
      ]
    },
  },
];

function toPascalCase(str) {
  return str.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

/**
 * Converts a slug like "arrow-left-down" → "Arrow Left Down"
 */
function toTitleCase(str) {
  return str.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

/**
 * Humanises a category slug into a readable label.
 * e.g. "arrows-action" → "Arrows Action", "ui" → "UI"
 */
function humanCategory(slug) {
  const overrides = {
    ui: 'UI',
    it: 'IT',
    newicons: 'General',
    'arrows-action': 'Arrows & Action',
    'text-formatting': 'Text Formatting',
  };
  return overrides[slug] ?? slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

/**
 * Builds a rich, natural-language title for an icon page.
 * Pattern: "{Label} Icon — Free SVG Download | Reicon"
 * Kept ≤60 chars where possible; always unique per icon.
 */
function buildIconTitle(name, category, tags) {
  const label = toTitleCase(name);
  const cat = humanCategory(category);
  // e.g. "Arrow Down Icon — Free Arrows SVG | Reicon"
  return `${label} Icon — Free ${cat} SVG | Reicon`;
}

/**
 * Builds a natural, search-friendly description (≤155 chars goal).
 * Uses tags when available to surface real keywords.
 */
function buildIconDesc(name, category, tags) {
  const label = toTitleCase(name);
  const cat = humanCategory(category);

  if (tags.length >= 2) {
    const tagPhrase = tags.slice(0, 3).join(', ');
    const desc = `Free ${label} SVG icon for React, Vue, Svelte & HTML. Also called: ${tagPhrase}. Part of Reicon's ${cat} set — outline & filled, MIT licensed.`;
    return desc.length <= 155 ? desc : desc.slice(0, 152) + '…';
  } else {
    const desc = `Download the free ${label} SVG icon from Reicon's ${cat} collection. Available in outline and filled weights for React, Vue, Svelte, Figma, and HTML. MIT licensed.`;
    return desc.length <= 155 ? desc : desc.slice(0, 152) + '…';
  }
}

/**
 * Builds a targeted keyword string for the icon.
 * Focus: download intent, framework usage, alt names.
 */
function buildIconKeywords(name, category, tags) {
  const label = toTitleCase(name);
  const cat = humanCategory(category).toLowerCase();
  const base = [
    `${name} icon`,
    `${label} svg icon`,
    `${name} svg`,
    `download ${name} icon`,
    `${name} png`,
    `${name} react`,
    `${name} react component`,
    `${name} vue`,
    `${name} svelte`,
    `free ${cat} icon`,
    `${cat} svg icon`,
    'free svg icon',
    'open source icon',
    'reicon',
    'reicon icon library',
  ];
  const tagKeywords = tags.flatMap((t) => [`${t} icon`, `${t} svg`]);
  return [...new Set([...tagKeywords, ...base])].slice(0, 20).join(', ');
}

/**
 * Builds the inline SVG markup to embed directly in the OG card and SSR body.
 * Replaces currentColor with white for static rendering contexts.
 */
function buildInlineSvg(svgCode, size = 64) {
  if (!svgCode) return '';
  return svgCode
    .replace(/currentColor/g, '#ffffff')
    .replace(/<svg([^>]*)>/, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">`);
}

function buildMetaTags({ title, desc, url, ogImage, ogImageAlt, keywords, jsonLd, breadcrumb, isIconPage = false }) {
  let tags = '';
  tags += `<title>${title}</title>\n`;
  tags += `    <meta name="description" content="${desc}" />\n`;
  tags += `    <link rel="canonical" href="${url}" />\n`;
  if (keywords) {
    tags += `    <meta name="keywords" content="${keywords}" />\n`;
  }
  tags += `    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n`;
  tags += `    <meta property="og:type" content="${isIconPage ? 'article' : 'website'}" />\n`;
  tags += `    <meta property="og:url" content="${url}" />\n`;
  tags += `    <meta property="og:site_name" content="Reicon" />\n`;
  tags += `    <meta property="og:locale" content="en_US" />\n`;
  tags += `    <meta property="og:title" content="${title}" />\n`;
  tags += `    <meta property="og:description" content="${desc}" />\n`;
  if (ogImage) {
    tags += `    <meta property="og:image" content="${ogImage}" />\n`;
    tags += `    <meta property="og:image:width" content="1200" />\n`;
    tags += `    <meta property="og:image:height" content="630" />\n`;
    if (ogImageAlt) {
      tags += `    <meta property="og:image:alt" content="${ogImageAlt}" />\n`;
    }
  }
  tags += `    <meta name="twitter:card" content="summary_large_image" />\n`;
  tags += `    <meta name="twitter:site" content="@reicon_dev" />\n`;
  tags += `    <meta name="twitter:creator" content="@reicon_dev" />\n`;
  tags += `    <meta name="twitter:title" content="${title}" />\n`;
  tags += `    <meta name="twitter:description" content="${desc}" />\n`;
  if (ogImage) {
    tags += `    <meta name="twitter:image" content="${ogImage}" />\n`;
    if (ogImageAlt) {
      tags += `    <meta name="twitter:image:alt" content="${ogImageAlt}" />\n`;
    }
  }
  if (jsonLd) {
    const lds = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    for (const ld of lds) {
      tags += `    <script type="application/ld+json">${JSON.stringify(ld)}</script>\n`;
    }
  }
  if (breadcrumb) {
    tags += `    <script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>\n`;
  }
  return tags;
}

function injectMeta(baseHtml, metaTags) {
  let html = baseHtml;
  // Remove existing generic tags that we're replacing
  html = html.replace(/<title>[^<]*<\/title>/, '');
  html = html.replace(/<link rel="canonical"[^>]*\/?>[\n]?/g, '');
  html = html.replace(/<meta name="description"[\s\S]*?\/?>[\n]?/g, '');
  html = html.replace(/<meta name="keywords"[\s\S]*?\/?>[\n]?/g, '');
  html = html.replace(/<meta property="og:[\s\S]*?\/?>[\n]?/g, '');
  html = html.replace(/<meta name="twitter:[\s\S]*?\/?>[\n]?/g, '');
  // Inject our page-specific tags before </head>
  html = html.replace('</head>', `    ${metaTags}  </head>`);
  return html;
}

function writePageHtml(baseHtml, pageDef) {
  const metaTags = buildMetaTags(pageDef);
  const html = injectMeta(baseHtml, metaTags);

  // Determine output path
  let outDir, outFile;
  if (pageDef.path === '/') {
    // index.html is already in dist root — overwrite it
    outFile = resolve(DIST, 'index.html');
  } else {
    outDir = resolve(DIST, pageDef.path.replace(/^\//, ''));
    mkdirSync(outDir, { recursive: true });
    outFile = resolve(outDir, 'index.html');
  }

  writeFileSync(outFile, html, 'utf-8');
}

async function main() {
  const baseHtml = readFileSync(resolve(DIST, 'index.html'), 'utf-8');

  if (!existsSync(DIST)) {
    console.error('dist/ folder not found. Run "vite build" first.');
    process.exit(1);
  }

  console.log('Pre-rendering meta tags into static HTML...');

  // 1. Static pages
  for (const page of STATIC_PAGES) {
    writePageHtml(baseHtml, page);
  }
  console.log(`  ✓ ${STATIC_PAGES.length} static pages`);

  // 2. Icon detail pages
  const iconNames = JSON.parse(readFileSync(ICON_NAMES_JSON, 'utf-8'));
  const iconData = JSON.parse(readFileSync(ICON_DATA_JSON, 'utf-8'));
  const allIcons = Object.keys(iconNames);
  let count = 0;

  // Build icon→tags and icon→category lookup from icon-data
  const iconTagsMap = {};
  const iconCategoryMap = {};
  for (const [catName, cat] of Object.entries(iconData.categories)) {
    for (const [iconName, iconInfo] of Object.entries(cat.icons)) {
      if (iconInfo.description) iconTagsMap[iconName] = iconInfo.description;
      iconCategoryMap[iconName] = catName.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  }

  // Build svgCode lookup from icon-data
  const iconSvgMap = {};
  for (const [, cat] of Object.entries(iconData.categories)) {
    for (const [iconName, iconInfo] of Object.entries(cat.icons)) {
      iconSvgMap[iconName] = iconInfo.weights?.Outline?.code || iconInfo.weights?.Filled?.code || '';
    }
  }

  for (const name of allIcons) {
    const pascal = toPascalCase(name);
    const tags = iconTagsMap[name] || [];
    const tagString = tags.join(', ');
    const categorySlug = iconCategoryMap[name] || 'general';
    const catLabel = humanCategory(categorySlug);
    const svgCode = iconSvgMap[name] || '';

    const title = buildIconTitle(name, categorySlug, tags);
    const desc = buildIconDesc(name, categorySlug, tags);
    const keywords = buildIconKeywords(name, categorySlug, tags);
    const url = `${SITE}/icon/${name}`;
    const ogImage = `${SITE}/og-image.png`;
    const ogImageAlt = `Reicon — ${toTitleCase(name)} icon preview`;

    // ── JSON-LD: WebPage (primary — gets sitelinks/rich results) ────────────
    const webPageLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url,
      "url": url,
      "name": title,
      "description": desc,
      "inLanguage": "en-US",
      "isPartOf": { "@type": "WebSite", "url": SITE, "name": "Reicon" },
      "breadcrumb": { "@id": `${url}#breadcrumb` },
      "primaryImageOfPage": { "@type": "ImageObject", "url": ogImage },
      "dateModified": new Date().toISOString().split('T')[0],
    };

    // ── JSON-LD: SoftwareSourceCode — the actual icon asset ─────────────────
    const softwareLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      "name": `${pascal} Icon`,
      "description": desc,
      "url": url,
      "codeRepository": "https://github.com/reicon-dev/reicon",
      "programmingLanguage": ["SVG", "React", "Vue", "Svelte"],
      "runtimePlatform": ["Browser", "Node.js"],
      "license": "https://opensource.org/licenses/MIT",
      "isPartOf": { "@type": "SoftwareApplication", "name": "Reicon", "url": SITE },
      ...(tags.length > 0 && { "keywords": tagString }),
    };

    // ── JSON-LD: DefinedTerm — helps Google understand "what this icon is" ──
    const definedTermLd = {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "name": `${toTitleCase(name)} Icon`,
      "description": desc,
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "name": `Reicon ${catLabel} Icons`,
        "url": `${SITE}/icons`,
      },
    };

    // ── JSON-LD: BreadcrumbList — 4 levels including category ───────────────
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "Icons", "item": `${SITE}/icons` },
        { "@type": "ListItem", "position": 3, "name": catLabel, "item": `${SITE}/icons?category=${categorySlug}` },
        { "@type": "ListItem", "position": 4, "name": `${toTitleCase(name)} Icon`, "item": url },
      ],
    };

    const outDir = resolve(DIST, 'icon', name);
    mkdirSync(outDir, { recursive: true });

    const metaTags = buildMetaTags({
      title, desc, url, ogImage, ogImageAlt, keywords,
      jsonLd: [webPageLd, softwareLd, definedTermLd],
      breadcrumb: breadcrumbLd,
      isIconPage: true,
    });
    const html = injectMeta(baseHtml, metaTags);

    // ── SSR body ─────────────────────────────────────────────────────────────
    const inlineSvg = buildInlineSvg(svgCode, 72);
    const svgBlock = inlineSvg
      ? `<div style="width:96px;height:96px;border-radius:16px;background:rgba(108,92,231,0.12);border:1px solid rgba(108,92,231,0.25);display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem" role="img" aria-label="${pascal} icon">${inlineSvg}</div>`
      : `<img src="${SITE}/svg/${name}.svg" alt="${pascal} SVG icon" width="72" height="72" style="margin-bottom:1.25rem;opacity:0.9" loading="eager" />`;

    const tagListHtml = tags.length > 0
      ? `<div style="display:flex;flex-wrap:wrap;gap:0.375rem;justify-content:center;margin-top:0.75rem" aria-label="Also known as">${
          tags.map(t => `<span style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:3px 10px;font-size:0.78rem;color:rgba(255,255,255,0.5)">${t}</span>`).join('')
        }</div>`
      : '';

    const usageSnippet = `
<section style="margin-top:2.5rem;text-align:left;max-width:540px;width:100%" aria-labelledby="usage-heading">
  <h2 id="usage-heading" style="font-size:0.85rem;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.3);margin:0 0 0.75rem">Quick Install</h2>
  <pre style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:0.875rem 1rem;font-size:0.82rem;color:rgba(255,255,255,0.7);overflow-x:auto;margin:0"><code>npm install reicon-react</code></pre>
  <pre style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:0.875rem 1rem;font-size:0.82rem;color:rgba(255,255,255,0.7);overflow-x:auto;margin:0.5rem 0 0"><code>import { ${pascal} } from 'reicon-react';\n// &lt;${pascal} size={24} /&gt;</code></pre>
</section>`;

    // Semantic attribute table for crawlers
    const attrTable = `
<section style="margin-top:2rem;text-align:left;max-width:540px;width:100%" aria-labelledby="details-heading">
  <h2 id="details-heading" style="font-size:0.85rem;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.3);margin:0 0 0.75rem">Icon Details</h2>
  <dl style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem 1rem;margin:0">
    <dt style="font-size:0.78rem;color:rgba(255,255,255,0.35)">Name</dt>
    <dd style="font-size:0.82rem;color:rgba(255,255,255,0.7);margin:0">${pascal}</dd>
    <dt style="font-size:0.78rem;color:rgba(255,255,255,0.35)">Slug</dt>
    <dd style="font-size:0.82rem;color:rgba(255,255,255,0.7);margin:0;font-family:monospace">${name}</dd>
    <dt style="font-size:0.78rem;color:rgba(255,255,255,0.35)">Category</dt>
    <dd style="font-size:0.82rem;color:rgba(255,255,255,0.7);margin:0">${catLabel}</dd>
    <dt style="font-size:0.78rem;color:rgba(255,255,255,0.35)">Weights</dt>
    <dd style="font-size:0.82rem;color:rgba(255,255,255,0.7);margin:0">Outline, Filled</dd>
    <dt style="font-size:0.78rem;color:rgba(255,255,255,0.35)">License</dt>
    <dd style="font-size:0.82rem;color:rgba(255,255,255,0.7);margin:0">MIT</dd>
    <dt style="font-size:0.78rem;color:rgba(255,255,255,0.35)">Formats</dt>
    <dd style="font-size:0.82rem;color:rgba(255,255,255,0.7);margin:0">SVG, PNG, WebP</dd>
  </dl>
</section>`;

    const ssrContent = `<div style="background:#09090b;color:#fff;min-height:100vh;font-family:'DM Sans',system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;padding:3rem 1.5rem 4rem;text-align:center">

  <nav aria-label="Breadcrumb" style="margin-bottom:2rem;font-size:0.8rem;color:rgba(255,255,255,0.35);align-self:flex-start;max-width:620px;width:100%">
    <ol style="list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;align-items:center;gap:0.25rem">
      <li><a href="${SITE}" style="color:rgba(255,255,255,0.45);text-decoration:none">Reicon</a></li>
      <li aria-hidden="true" style="margin:0 0.25rem;opacity:0.4">›</li>
      <li><a href="${SITE}/icons" style="color:rgba(255,255,255,0.45);text-decoration:none">Icons</a></li>
      <li aria-hidden="true" style="margin:0 0.25rem;opacity:0.4">›</li>
      <li><a href="${SITE}/icons?category=${categorySlug}" style="color:rgba(255,255,255,0.45);text-decoration:none">${catLabel}</a></li>
      <li aria-hidden="true" style="margin:0 0.25rem;opacity:0.4">›</li>
      <li aria-current="page" style="color:rgba(255,255,255,0.65)">${toTitleCase(name)}</li>
    </ol>
  </nav>

  <article style="max-width:620px;width:100%;display:flex;flex-direction:column;align-items:center" itemscope itemtype="https://schema.org/SoftwareSourceCode">
    <meta itemprop="name" content="${pascal} Icon" />
    <meta itemprop="license" content="https://opensource.org/licenses/MIT" />

    ${svgBlock}
    <h1 itemprop="description" style="font-size:2rem;font-weight:700;margin:0 0 0.625rem;letter-spacing:-0.02em">${pascal} Icon</h1>
    <p style="color:rgba(255,255,255,0.55);max-width:480px;line-height:1.7;margin:0 auto;font-size:0.95rem">${desc}</p>

    <p style="display:inline-flex;align-items:center;gap:0.375rem;background:rgba(108,92,231,0.12);border:1px solid rgba(108,92,231,0.3);border-radius:20px;padding:4px 12px;font-size:0.78rem;color:rgba(108,92,231,0.9);margin-top:1rem">
      ${catLabel}
    </p>
    ${tags.length > 0 ? `<p style="font-size:0.78rem;color:rgba(255,255,255,0.3);margin-top:0.75rem">Also known as: ${tags.slice(0,5).join(', ')}</p>` : ''}
    ${tagListHtml}
    ${attrTable}
    ${usageSnippet}

    <div style="margin-top:2rem;display:flex;gap:0.75rem;flex-wrap:wrap;justify-content:center">
      <a href="${SITE}/svg/${name}.svg" download itemprop="url" style="background:rgba(108,92,231,0.9);color:#fff;text-decoration:none;font-size:0.875rem;font-weight:500;padding:0.5rem 1.125rem;border-radius:8px">Download SVG</a>
      <a href="${SITE}/icons" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.8);text-decoration:none;font-size:0.875rem;padding:0.5rem 1.125rem;border-radius:8px">Browse Icons</a>
      <a href="${SITE}/usage" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.8);text-decoration:none;font-size:0.875rem;padding:0.5rem 1.125rem;border-radius:8px">Usage Guide</a>
    </div>
    <p style="margin-top:2.5rem;font-size:0.75rem;color:rgba(255,255,255,0.2)">Outline &amp; Filled · SVG · PNG · WebP · MIT License · <a href="https://github.com/reicon-dev/reicon" style="color:rgba(255,255,255,0.3)">GitHub</a></p>
  </article>
</div>`;

    const finalHtml = html.replace('<div id="root"></div>', `<div id="root">${ssrContent}</div>`);
    writeFileSync(resolve(outDir, 'index.html'), finalHtml, 'utf-8');
    count++;
  }

  const totalPages = STATIC_PAGES.length + count;
  console.log(`  ✓ ${count} icon detail pages`);
  console.log(`Done! ${totalPages} total pages pre-rendered.`);

  const posthog = new PostHog(process.env.POSTHOG_API_KEY, {
    host: process.env.POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  posthog.capture({
    distinctId: 'build-system',
    event: 'meta prerendered',
    properties: {
      static_page_count: STATIC_PAGES.length,
      icon_page_count: count,
      total_pages: totalPages,
    },
  });
  await posthog.shutdown();
}

main();
