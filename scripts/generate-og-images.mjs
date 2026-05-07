#!/usr/bin/env node
/**
 * Generates OG images (1200×630 PNG) for each icon using SVG data from newdata.json.
 * Uses sharp to convert SVG → PNG for full social platform compatibility.
 * Outputs to dist/og/icons/{name}.png
 *
 * Usage: node scripts/generate-og-images.mjs  (run after vite build)
 */

import { readFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '../dist');
const NEWDATA_JSON = resolve(__dirname, '../src/data/newdata.json');
const OG_DIR = resolve(DIST, 'og/icons');

const CONCURRENCY = 20;

function generateOgSvg(name, svgCode, tags, category) {
  const tagText = tags.length > 0 ? tags.slice(0, 5).join(' \u00b7 ') : 'SVG Icon';
  const categoryText = category || 'Icon Library';

  // Clean up SVG code: replace currentColor with white
  const cleanSvg = svgCode
    .replace(/currentColor/g, '#ffffff')
    .replace(/fill="[^"]*"/g, 'fill="#ffffff"');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#09090b"/>
      <stop offset="100%" stop-color="#111113"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="3" fill="#6C5CE7" opacity="0.6"/>

  <!-- Icon preview -->
  <g transform="translate(552, 140)">
    <svg viewBox="0 0 24 24" width="96" height="96">
      ${cleanSvg}
    </svg>
  </g>

  <!-- Icon name -->
  <text x="600" y="300" text-anchor="middle" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="600">${escapeXml(name)}</text>

  <!-- Category + Tags -->
  <text x="600" y="345" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-family="system-ui, -apple-system, sans-serif" font-size="18">${escapeXml(categoryText)} \u00b7 ${escapeXml(tagText)}</text>

  <!-- Subtitle -->
  <text x="600" y="390" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="system-ui, -apple-system, sans-serif" font-size="15">See the icon preview, code snippets, release details and other resources</text>

  <!-- Bottom branding bar -->
  <rect x="0" y="540" width="1200" height="90" fill="rgba(255,255,255,0.02)"/>
  <text x="60" y="592" fill="rgba(255,255,255,0.4)" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="600">Reicon</text>
  <text x="1140" y="592" text-anchor="end" fill="rgba(255,255,255,0.15)" font-family="system-ui, -apple-system, sans-serif" font-size="14">https://reicon.dev</text>
</svg>`;
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function processIcon(iconName, svgCode, tags, category) {
  const ogSvg = generateOgSvg(iconName, svgCode, tags, category);
  const pngBuffer = await sharp(Buffer.from(ogSvg))
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(resolve(OG_DIR, `${iconName}.png`));
  return pngBuffer;
}

async function main() {
  const newdata = JSON.parse(readFileSync(NEWDATA_JSON, 'utf-8'));
  mkdirSync(OG_DIR, { recursive: true });

  // Collect all icons
  const tasks = [];
  for (const [catName, cat] of Object.entries(newdata.categories)) {
    const category = catName.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    for (const [iconName, iconData] of Object.entries(cat.icons)) {
      const tags = iconData.description || [];
      const svgCode = iconData.weights?.Outline?.code || iconData.weights?.Filled?.code || '';
      if (!svgCode) continue;
      tasks.push({ iconName, svgCode, tags, category });
    }
  }

  console.log(`Generating ${tasks.length} OG images (PNG) …`);

  // Process in batches for concurrency control
  let done = 0;
  for (let i = 0; i < tasks.length; i += CONCURRENCY) {
    const batch = tasks.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map((t) => processIcon(t.iconName, t.svgCode, t.tags, t.category)));
    done += batch.length;
    if (done % 200 === 0 || done === tasks.length) {
      console.log(`  ${done}/${tasks.length}`);
    }
  }

  console.log(`✓ Generated ${tasks.length} OG images (PNG) in dist/og/icons/`);
}

main().catch((err) => { console.error(err); process.exit(1); });
