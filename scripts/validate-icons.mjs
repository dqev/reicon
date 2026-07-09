#!/usr/bin/env node
/**
 * validate-icons.mjs
 *
 * Checks that scripts/icon-names.json is in sync with data/icon-data.json.
 * Exits with code 1 if there are any discrepancies so CI catches drift.
 *
 * Usage: node scripts/validate-icons.mjs
 *        npm run validate:icons
 *
 * Run this before opening a PR if you changed data/icon-data.json.
 * `npm run build` runs sync-icon-names automatically so you only need this
 * for a quick check without a full build.
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH   = resolve(__dirname, '../data/icon-data.json');
const NAMES_PATH  = resolve(__dirname, 'icon-names.json');

const iconData  = JSON.parse(readFileSync(DATA_PATH,  'utf-8'));
const nameMap   = JSON.parse(readFileSync(NAMES_PATH, 'utf-8'));

// Collect all icon slugs directly from the data file
const dataIcons   = new Set();
for (const cat of Object.values(iconData.categories || {})) {
  for (const name of Object.keys(cat.icons || {})) {
    dataIcons.add(name);
  }
}

const scriptIcons = new Set(Object.keys(nameMap));

const missing = [...dataIcons].filter((n) => !scriptIcons.has(n));
const stale   = [...scriptIcons].filter((n) => !dataIcons.has(n));

let ok = true;

if (missing.length) {
  console.error(`\n❌ ${missing.length} icon(s) in data/icon-data.json not in scripts/icon-names.json:`);
  missing.forEach((n) => console.error(`   + ${n}`));
  ok = false;
}

if (stale.length) {
  console.error(`\n❌ ${stale.length} icon(s) in scripts/icon-names.json not in data/icon-data.json (stale):`);
  stale.forEach((n) => console.error(`   - ${n}`));
  ok = false;
}

if (ok) {
  console.log(`✅ scripts/icon-names.json is in sync with data/icon-data.json (${dataIcons.size} icons).`);
} else {
  console.error('\n→ Fix: run  node scripts/sync-icon-names.mjs  then commit the updated icon-names.json');
  process.exit(1);
}
