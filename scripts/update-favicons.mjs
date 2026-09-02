#!/usr/bin/env node
/**
 * Migration script to update all favicon and SEO references to the public/favicon/ directory
 * and clean up obsolete root-level favicon assets.
 * Now incorporates extra SEO fixes (viewport notches, theme-colors, non-blocking fonts).
 */

import { writeFileSync, readFileSync, existsSync, unlinkSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ROOT = resolve(__dirname, '..');
const INDEX_HTML = resolve(ROOT, 'index.html');
const MANIFEST_PATH = resolve(ROOT, 'public/favicon/site.webmanifest');
const PUBLIC_README = resolve(ROOT, 'public/README.md');
const STRUCT_MD = resolve(ROOT, 'docs/project-structure.md');

const OBSOLETE_FILES = [
  'public/favicon.ico',
  'public/favicon.svg',
  'public/apple-touch-icon.png',
  'public/favicon-48x48.png',
  'public/favicon-96x96.png',
  'public/web-app-manifest-192x192.png',
  'public/web-app-manifest-512x512.png',
  'public/site.webmanifest'
];

function runMigration() {
  console.log('Starting Favicon and SEO Reference Migration...');

  // 1. Update index.html
  if (existsSync(INDEX_HTML)) {
    console.log(`Updating: ${INDEX_HTML}`);
    let content = readFileSync(INDEX_HTML, 'utf-8');

    // Remove legacy X-UA-Compatible header if present
    content = content.replace('  <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n', '');

    // Update viewport for modern notched/safe-area devices
    content = content.replace(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />'
    );

    // Replace the theme-color tags (remove duplicate, support prefers-color-scheme media query)
    const oldThemeColors1 = `  <meta name="theme-color" content="#09090b" media="(prefers-color-scheme: dark)" />\n  <meta name="theme-color" content="#09090b" />`;
    const oldThemeColors2 = `  <meta name="theme-color" content="#09090b" media="(prefers-color-scheme: dark)" />\r\n  <meta name="theme-color" content="#09090b" />`;
    const newThemeColors = `  <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />\n  <meta name="theme-color" content="#09090b" media="(prefers-color-scheme: dark)" />`;

    if (content.includes(oldThemeColors1)) {
      content = content.replace(oldThemeColors1, newThemeColors);
    } else if (content.includes(oldThemeColors2)) {
      content = content.replace(oldThemeColors2, newThemeColors);
    }

    // Replace the favicon block if it is still using the old one
    const oldFaviconBlock1 = `  <!-- ── Favicon ───────────────────────────────────────────────────────────── -->
  <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
  <link rel="icon" href="/favicon-48x48.png?v=2" sizes="48x48" type="image/png" />
  <link rel="icon" href="/favicon-96x96.png?v=2" sizes="96x96" type="image/png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
  <link rel="manifest" href="/site.webmanifest?v=2" />`;

    const oldFaviconBlock2 = `  <!-- ── Favicon ───────────────────────────────────────────────────────────── -->
  <link rel="icon" href="/favicon.ico?v=2" sizes="any" />\r
  <link rel="icon" href="/favicon-48x48.png?v=2" sizes="48x48" type="image/png" />\r
  <link rel="icon" href="/favicon-96x96.png?v=2" sizes="96x96" type="image/png" />\r
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />\r
  <link rel="manifest" href="/site.webmanifest?v=2" />`;

    const newFaviconBlock = `  <!-- ── Favicon ───────────────────────────────────────────────────────────── -->
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon/favicon-48x48.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
  <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
  <link rel="manifest" href="/favicon/site.webmanifest" />`;

    if (content.includes(oldFaviconBlock1)) {
      content = content.replace(oldFaviconBlock1, newFaviconBlock);
    } else if (content.includes(oldFaviconBlock2)) {
      content = content.replace(oldFaviconBlock2, newFaviconBlock);
    }

    // Replace msapplication-TileImage to use the new favicon subdirectory path
    content = content.replace(
      `<meta name="msapplication-TileImage" content="/favicon-96x96.png?v=2" />`,
      `<meta name="msapplication-TileImage" content="/favicon/favicon-48x48.png" />`
    );

    // Replace structured data logo URL
    content = content.replace(
      `"logo": "https://reicon.dev/favicon-96x96.png?v=2",`,
      `"logo": "https://reicon.dev/favicon/apple-touch-icon.png",`
    );

    // Optimize Font Loading (Preload stylesheets & load asynchronously to fix render-blocking Core Web Vitals issues)
    const oldFonts1 = `  <!-- ── Fonts (with display=swap for CLS) ─────────────────────────────────── -->
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400;1,9..40,500&display=swap"
    rel="stylesheet" />
  <link rel="stylesheet" href="https://cooperfont.vercel.app/fonts.min.css" />`;

    const oldFonts2 = `  <!-- ── Fonts (with display=swap for CLS) ─────────────────────────────────── -->\r
  <link\r
    href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400;1,9..40,500&display=swap"\r
    rel="stylesheet" />\r
  <link rel="stylesheet" href="https://cooperfont.vercel.app/fonts.min.css" />`;

    const newFonts = `  <!-- ── Fonts (optimized with preloading & display=swap) ────────────────── -->
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400;1,9..40,500&display=swap" />
  <link rel="preload" as="style" href="https://cooperfont.vercel.app/fonts.min.css" />
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400;1,9..40,500&display=swap"
    rel="stylesheet" media="print" onload="this.media='all'" />
  <link rel="stylesheet" href="https://cooperfont.vercel.app/fonts.min.css" media="print" onload="this.media='all'" />`;

    if (content.includes(oldFonts1)) {
      content = content.replace(oldFonts1, newFonts);
    } else if (content.includes(oldFonts2)) {
      content = content.replace(oldFonts2, newFonts);
    }

    writeFileSync(INDEX_HTML, content, 'utf-8');
    console.log('✓ index.html updated successfully with favicon and SEO improvements');
  } else {
    console.error(`Error: ${INDEX_HTML} not found`);
  }

  // 2. Update site.webmanifest in public/favicon/
  if (existsSync(MANIFEST_PATH)) {
    console.log(`Updating: ${MANIFEST_PATH}`);
    const richManifest = {
      "name": "Reicon — Free Open-Source Icon Library",
      "short_name": "Reicon",
      "description": "Free, open-source SVG icon library built with obsessive precision. Pixel-perfect, handcrafted icons for UI design, React, Vue, Svelte, Figma, and the web.",
      "start_url": "/",
      "scope": "/",
      "id": "/",
      "display": "standalone",
      "orientation": "portrait-primary",
      "lang": "en",
      "dir": "ltr",
      "categories": [
        "design",
        "developer tools",
        "utilities"
      ],
      "icons": [
        {
          "src": "/favicon/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/favicon/android-chrome-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ],
      "theme_color": "#09090b",
      "background_color": "#09090b"
    };

    writeFileSync(MANIFEST_PATH, JSON.stringify(richManifest, null, 2), 'utf-8');
    console.log('✓ site.webmanifest updated successfully');
  } else {
    console.error(`Error: ${MANIFEST_PATH} not found`);
  }

  // 3. Update public/README.md
  if (existsSync(PUBLIC_README)) {
    console.log(`Updating: ${PUBLIC_README}`);
    let content = readFileSync(PUBLIC_README, 'utf-8');
    content = content.replace(
      `* \`favicon.ico\` / \`favicon.svg\` / \`favicon-*.png\`: Multi-resolution favicon files for browsers and bookmark bars.`,
      `* \`favicon/\`: Multi-resolution favicon files, Apple touch icon, and web manifest.`
    );
    writeFileSync(PUBLIC_README, content, 'utf-8');
    console.log('✓ public/README.md updated successfully');
  }

  // 4. Update docs/project-structure.md
  if (existsSync(STRUCT_MD)) {
    console.log(`Updating: ${STRUCT_MD}`);
    let content = readFileSync(STRUCT_MD, 'utf-8');
    content = content.replace(
      `│   ├── favicon.ico             # Favicons`,
      `│   ├── favicon/                # Favicon bundle (ico, svg, pngs, manifest)`
    );
    writeFileSync(STRUCT_MD, content, 'utf-8');
    console.log('✓ docs/project-structure.md updated successfully');
  }

  // 5. Clean up obsolete files
  console.log('Cleaning up obsolete root-level favicon files...');
  for (const f of OBSOLETE_FILES) {
    const p = resolve(ROOT, f);
    if (existsSync(p)) {
      unlinkSync(p);
      console.log(`- Deleted: ${f}`);
    } else {
      console.log(`- Already missing/deleted: ${f}`);
    }
  }

  console.log('Favicon and SEO reference migration complete.');
}

runMigration();
