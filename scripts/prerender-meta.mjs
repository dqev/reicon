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
    const targetOgImage = ogImage.endsWith('og-image.png') ? `${ogImage}?v=2` : ogImage;
    tags += `    <meta property="og:image" content="${targetOgImage}" />\n`;
    tags += `    <meta property="og:image:width" content="1200" />\n`;
    tags += `    <meta property="og:image:height" content="630" />\n`;
  }
  tags += `    <meta name="twitter:card" content="summary_large_image" />\n`;
  tags += `    <meta name="twitter:site" content="@reicon_dev" />\n`;
  tags += `    <meta name="twitter:title" content="${title}" />\n`;
  tags += `    <meta name="twitter:description" content="${desc}" />\n`;
  if (ogImage) {
    const targetOgImage = ogImage.endsWith('og-image.png') ? `${ogImage}?v=2` : ogImage;
    tags += `    <meta name="twitter:image" content="${targetOgImage}" />\n`;
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

    // Inject visible SSR content into <div id="root"> so Google indexes real content
    const tagList = tags.length > 0
      ? `<ul style="list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:0.5rem;justify-content:center;margin-top:1rem">${tags.map(t => `<li style="background:rgba(255,255,255,0.06);border-radius:6px;padding:4px 12px;font-size:0.8rem;color:rgba(255,255,255,0.5)">${t}</li>`).join('')}</ul>`
      : '';
    const categoryLine = category ? `<p style="color:rgba(108,92,231,0.8);font-size:0.8rem;margin-top:0.5rem">Category: ${category}</p>` : '';

    const ssrContent = `<div style="background:#09090b;color:#fff;min-height:100vh;font-family:'DM Sans',system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;text-align:center">
<nav aria-label="breadcrumb" style="margin-bottom:1.5rem;font-size:0.875rem;color:rgba(255,255,255,0.4)"><a href="/" style="color:rgba(255,255,255,0.5);text-decoration:none">Reicon</a> <span style="margin:0 0.25rem">›</span> <a href="/icons" style="color:rgba(255,255,255,0.5);text-decoration:none">Icons</a> <span style="margin:0 0.25rem">›</span> <span style="color:rgba(255,255,255,0.7)">${name}</span></nav>
<img src="https://cdn.reicon.dev/svg/${name}.svg" alt="${name} icon" width="64" height="64" style="filter:invert(1);margin-bottom:1rem" loading="eager" />
<h1 style="font-size:1.75rem;font-weight:600;margin:0 0 0.5rem">${pascal} Icon</h1>
<p style="color:rgba(255,255,255,0.6);max-width:520px;line-height:1.6;margin:0 auto">${desc}</p>
${categoryLine}${tagList}
<div style="margin-top:2rem;display:flex;gap:1rem;flex-wrap:wrap;justify-content:center">
<a href="/icons" style="color:#6C5CE7;text-decoration:none;font-size:0.9rem">← Browse all icons</a>
<a href="/usage" style="color:#6C5CE7;text-decoration:none;font-size:0.9rem">Usage guide</a>
<a href="/packages" style="color:#6C5CE7;text-decoration:none;font-size:0.9rem">Packages</a>
</div>
<p style="margin-top:2rem;font-size:0.8rem;color:rgba(255,255,255,0.3)">Available in Outline and Filled weights · Free SVG icon · MIT License</p>
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
