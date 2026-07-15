#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, '../data/icon-data.json');
const OUT_PATH = resolve(__dirname, '../src/data/search-index.json');

const data = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));

const entries = [];

for (const [catKey, catData] of Object.entries(data.categories || {})) {
  for (const [iconKey, icon] of Object.entries(catData.icons || {})) {
    const tags = new Set();
    for (const t of icon.description || []) tags.add(t);
    for (const part of iconKey.split('-')) {
      if (part.length > 1) tags.add(part);
    }
    entries.push({
      n: iconKey,
      c: catKey,
      t: [...tags],
    });
  }
}

entries.sort((a, b) => a.n.localeCompare(b.n));

writeFileSync(OUT_PATH, JSON.stringify(entries) + '\n', 'utf-8');
console.log(`generate-website-search-index: wrote ${entries.length} entries to src/data/search-index.json`);
