#!/usr/bin/env node
/**
 * sync-icon-names.mjs
 *
 * Regenerates scripts/icon-names.json from data/icon-data.json.
 * This file is the single source of truth for icon slugs — packages/reicon-react/dist/
 * also emits one, but scripts/ uses THIS copy so the build scripts (sitemap, prerender)
 * are never out of sync with the actual icon set.
 *
 * Called automatically at the start of `npm run build`. Safe to run standalone:
 *   node scripts/sync-icon-names.mjs
 *
 * Output format: { "<kebab-name>": "<PascalName>", ... }
 * Sorted alphabetically by kebab name for stable diffs.
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, '../data/icon-data.json');
const OUT_PATH = resolve(__dirname, 'icon-names.json');

function toPascalCase(str) {
  return str.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

const data = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));

// Collect all icons with PascalCase names, handling duplicates the same way
// the build scripts do (append category suffix on collision).
const nameMap = {};
const pascalLowerSet = new Set();

for (const [catKey, catData] of Object.entries(data.categories || {})) {
  for (const iconKey of Object.keys(catData.icons || {})) {
    let pascal = toPascalCase(iconKey);
    if (pascalLowerSet.has(pascal.toLowerCase())) {
      pascal += toPascalCase(catKey);
    }
    pascalLowerSet.add(pascal.toLowerCase());
    nameMap[iconKey] = pascal;
  }
}

// Sort by key for stable, readable diffs — easier for contributors to review.
const sorted = Object.fromEntries(
  Object.entries(nameMap).sort(([a], [b]) => a.localeCompare(b))
);

writeFileSync(OUT_PATH, JSON.stringify(sorted, null, 2) + '\n', 'utf-8');

const count = Object.keys(sorted).length;
console.log(`sync-icon-names: wrote ${count} icons to scripts/icon-names.json`);
