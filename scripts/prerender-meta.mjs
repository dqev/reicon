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

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '../dist');
const ICON_NAMES_JSON = resolve(__dirname, 'icon-names.json');
const NEWDATA_JSON = resolve(__dirname, '../src/data/newdata.json');
const SITE = 'https://reicon.dev';

// ── Page definitions ────────────────────────────────────────────────
const STATIC_PAGES = [
  {
    path: '/',
    title: 'Reicon — Free Open-Source Icon Library for Designers & Developers',
    desc: 'Reicon is a free, open-source icon library with 1700+ handcrafted, pixel-perfect SVG icons for React, Figma, and the web. MIT licensed.',
    url: `${SITE}/`,
    ogImage: `${SITE}/og-image-v2.png`,
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
    title: 'Browse 1700+ Free Icons — Reicon Icon Library',
    desc: 'Browse and search 1700+ free, open-source SVG icons. Filter by category, weight, and size. Copy React or HTML code instantly.',
    url: `${SITE}/icons`,
    ogImage: `${SITE}/og-image-v2.png`,
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
    title: 'Usage Guide — Reicon | React & CDN Icon Library',
    desc: 'Learn how to install and use Reicon icons in React and vanilla JavaScript. Props reference, TypeScript support, icon weights, and code examples.',
    url: `${SITE}/usage`,
    ogImage: `${SITE}/og-image-v2.png`,
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
    path: '/packages',
    title: 'Packages — Reicon | React & JavaScript Icon Packages',
    desc: 'Install Reicon icon packages for React and JavaScript. Tree-shakeable, zero dependencies, MIT licensed.',
    url: `${SITE}/packages`,
    ogImage: `${SITE}/og-image-v2.png`,
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
    path: '/pack',
    title: 'Icon Pack Builder — Reicon | Custom Icon Packs',
    desc: 'Select and export custom icon packs from Reicon. Download as SVG, PNG, or WebP ZIP files. Build your own icon set.',
    url: `${SITE}/pack`,
    ogImage: `${SITE}/og-image-v2.png`,
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

function buildMetaTags({ title, desc, url, ogImage, keywords, jsonLd, breadcrumb }) {
  let tags = '';
  tags += `<title>${title}</title>\n`;
  tags += `    <meta name="description" content="${desc}" />\n`;
  tags += `    <link rel="canonical" href="${url}" />\n`;
  if (keywords) {
    tags += `    <meta name="keywords" content="${keywords}" />\n`;
  }
  tags += `    <meta property="og:type" content="website" />\n`;
  tags += `    <meta property="og:url" content="${url}" />\n`;
  tags += `    <meta property="og:site_name" content="Reicon" />\n`;
  tags += `    <meta property="og:title" content="${title}" />\n`;
  tags += `    <meta property="og:description" content="${desc}" />\n`;
  if (ogImage) {
    tags += `    <meta property="og:image" content="${ogImage}" />\n`;
    tags += `    <meta property="og:image:width" content="1200" />\n`;
    tags += `    <meta property="og:image:height" content="630" />\n`;
  }
  tags += `    <meta name="twitter:card" content="summary_large_image" />\n`;
  tags += `    <meta name="twitter:site" content="@reicon_dev" />\n`;
  tags += `    <meta name="twitter:title" content="${title}" />\n`;
  tags += `    <meta name="twitter:description" content="${desc}" />\n`;
  if (ogImage) {
    tags += `    <meta name="twitter:image" content="${ogImage}" />\n`;
  }
  if (jsonLd) {
    if (Array.isArray(jsonLd)) {
      for (const ld of jsonLd) {
        tags += `    <script type="application/ld+json">${JSON.stringify(ld)}</script>\n`;
      }
    } else {
      tags += `    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n`;
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

function main() {
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
  const newdata = JSON.parse(readFileSync(NEWDATA_JSON, 'utf-8'));
  const allIcons = Object.keys(iconNames);
  let count = 0;

  // Build icon→tags and icon→category lookup from newdata
  const iconTagsMap = {};
  const iconCategoryMap = {};
  for (const [catName, cat] of Object.entries(newdata.categories)) {
    for (const [iconName, iconData] of Object.entries(cat.icons)) {
      if (iconData.description) iconTagsMap[iconName] = iconData.description;
      iconCategoryMap[iconName] = catName.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  }

  for (const name of allIcons) {
    const pascal = toPascalCase(name);
    const tags = iconTagsMap[name] || [];
    const tagString = tags.join(', ');
    const category = iconCategoryMap[name] || '';

    const title = `${name} icon details — Reicon`;
    const desc = tags.length > 0
      ? `Details and related icons for ${name} icon. Tagged as: ${tagString}.`
      : `Details and related icons for ${name} icon. Available in Outline and Filled weights. Free, open-source SVG icon.`;
    const url = `${SITE}/icon/${name}`;
    const ogImage = `${SITE}/og/icons/${name}.png`;
    const keywords = tags.length > 0
      ? `${name}, ${tagString}, icon, svg icon, react icon, free icon, reicon`
      : `${name}, icon, svg icon, react icon, free icon, reicon`;

    const imageObjectLd = {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "name": `${pascal} Icon`,
      "description": desc,
      "contentUrl": `https://cdn.reicon.dev/svg/${name}.svg`,
      "thumbnailUrl": ogImage,
      "encodingFormat": "image/svg+xml",
      "license": "https://opensource.org/licenses/MIT",
      "acquireLicensePage": `${SITE}/usage`,
      "keywords": tagString,
      ...(category && { "category": category }),
      "isPartOf": {
        "@type": "CreativeWork",
        "name": "Reicon Icon Library",
        "url": SITE
      }
    };

    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Reicon", "item": SITE },
        { "@type": "ListItem", "position": 2, "name": "Icons", "item": `${SITE}/icons` },
        { "@type": "ListItem", "position": 3, "name": name, "item": url }
      ]
    };

    const outDir = resolve(DIST, 'icon', name);
    mkdirSync(outDir, { recursive: true });

    const metaTags = buildMetaTags({ title, desc, url, ogImage, keywords, jsonLd: imageObjectLd, breadcrumb: breadcrumbLd });
    const html = injectMeta(baseHtml, metaTags);

    // Add noscript fallback with semantic content for this specific icon
    const tagHtml = tags.length > 0 ? `<p style="color:rgba(255,255,255,0.4);margin-top:0.5rem">Tagged as: ${tagString}</p>` : '';
    const noscriptBlock = `<noscript><div style="background:#09090b;color:#fff;padding:2rem;font-family:system-ui,sans-serif;text-align:center;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center"><nav style="margin-bottom:1rem;color:rgba(255,255,255,0.4);font-size:0.875rem"><a href="/" style="color:rgba(255,255,255,0.5)">Reicon</a> › <a href="/icons" style="color:rgba(255,255,255,0.5)">Icons</a> › ${name}</nav><h1>${name} icon details</h1><p style="color:rgba(255,255,255,0.6);max-width:500px">${desc}</p>${tagHtml}<p style="margin-top:1rem"><a href="/icons" style="color:#6C5CE7">Browse all icons</a> · <a href="/usage" style="color:#6C5CE7">Usage guide</a></p></div></noscript>`;

    const finalHtml = html.replace('</body>', `${noscriptBlock}\n</body>`);
    writeFileSync(resolve(outDir, 'index.html'), finalHtml, 'utf-8');
    count++;
  }

  console.log(`  ✓ ${count} icon detail pages`);
  console.log(`Done! ${STATIC_PAGES.length + count} total pages pre-rendered.`);
}

main();
