#!/usr/bin/env node
/**
 * compress-file-icons.mjs – normalises and minifies data/file-icons.json.
 *
 * The file ships with the website and is also the source for the
 * `reicon-file` package build, so keep it small and predictable:
 *   - trim icon names
 *   - collapse whitespace inside path data
 *   - drop duplicate names
 *   - keep `count` in sync with the array length
 *   - write compact (no indentation) JSON
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FILE = path.join(ROOT, 'data', 'file-icons.json');

const before = fs.statSync(FILE).size;
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

if (!Array.isArray(data.icons)) {
  throw new Error('data/file-icons.json is missing an "icons" array');
}

const seen = new Set();
const icons = [];

for (const icon of data.icons) {
  const name = String(icon.name || '').trim();
  const d = String(icon.path || '').trim().replace(/\s+/g, ' ');
  if (!name || !d || seen.has(name)) continue;
  seen.add(name);
  icons.push({ name, path: d });
}

const out = {
  name: data.name || 'file-icons',
  viewBox: data.viewBox || '0 0 1024 1024',
  size: data.size || 256,
  count: icons.length,
  icons,
};

fs.writeFileSync(FILE, JSON.stringify(out));

const after = fs.statSync(FILE).size;
const saved = before - after;
const pct = before ? ((saved / before) * 100).toFixed(1) : '0.0';

console.log(`file-icons.json: ${icons.length} icons`);
console.log(`  ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB (${pct}% smaller)`);
