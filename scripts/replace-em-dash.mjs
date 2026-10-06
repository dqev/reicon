#!/usr/bin/env node
/**
 * replace-em-dash.mjs
 *
 * Replaces all em dashes (U+2014) with a simple hyphen-minus (-) across the
 * website source files.
 *
 * Usage:
 *   node scripts/replace-em-dash.mjs [--dry-run] [--all] [paths...]
 *
 *   No args        -> website scope: apps/, docs/, data/, scripts/, *.md, *.html at root
 *   --all          -> entire repo (still skips excluded dirs/files below)
 *   [paths...]     -> explicit files/dirs to process
 *   --dry-run      -> report only, change nothing
 *
 * Skipped always:
 *   node_modules, .git, dist, .wrangler, .vercel, .vite, .cache,
 *   coverage, package-lock.json, binary assets (png/jpg/ico/woff2/etc.),
 *   generated outputs (Kotlin library, public/cdn, public/llms*.txt,
 *   page-meta.ts) unless --include-generated is passed. Generators themselves
 *   ARE fixed so the next build stays clean.
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { resolve, dirname, relative, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run') || args.includes('--check');
const INCLUDE_GENERATED = args.includes('--include-generated');
const ALL = args.includes('--all');
const explicitPaths = args.filter((a) => !a.startsWith('--'));

const EM_DASH = '\u2014';
const REPLACEMENT = '-';

const EXCLUDED_DIRS = new Set([
  'node_modules', '.git', 'dist', '.wrangler', '.vercel', '.vite',
  '.cache', 'coverage', '.agents', '.github',
]);

// Generated outputs: fixed via their generators, not bulk-edited,
// unless --include-generated is passed.
const GENERATED_PREFIXES = [
  'packages/reicon-compose/library/',
  'apps/web/public/cdn/',
  'apps/web/public/llms-icons.txt',
  'apps/web/public/llms.txt',
  'apps/web/public/llms-full.txt',
  'apps/web/src/data/page-meta.ts',
  'packages/reicon-astro/src/index.js',
  'packages/reicon-astro/src/index.d.ts',
];

const EXCLUDED_FILES = new Set(['package-lock.json', '.DS_Store']);

// Binary / non-text extensions to skip.
const BINARY_EXT = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.ico', '.icns',
  '.woff', '.woff2', '.ttf', '.otf', '.eot', '.mp4', '.webm', '.mov',
  '.mp3', '.wav', '.ogg', '.zip', '.gz', '.tgz', '.pdf', '.wasm',
  '.sketch', '.fig', '.DS_Store',
]);

function isGenerated(rel) {
  const p = rel.replace(/\\/g, '/');
  return GENERATED_PREFIXES.some((g) => p === g || p.startsWith(g));
}

function shouldSkip(rel, isDir) {
  const parts = rel.replace(/\\/g, '/').split('/');
  if (parts.some((p) => EXCLUDED_DIRS.has(p))) return true;
  if (!isDir) {
    const base = parts[parts.length - 1];
    if (EXCLUDED_FILES.has(base)) return true;
    const dot = base.lastIndexOf('.');
    const ext = dot >= 0 ? base.slice(dot).toLowerCase() : '';
    if (BINARY_EXT.has(ext)) return true;
    if (!INCLUDE_GENERATED && isGenerated(rel)) return true;
  } else if (!INCLUDE_GENERATED && isGenerated(rel + '/')) return true;
  return false;
}

function collectFiles(targets) {
  const out = [];
  const stack = [...targets];
  while (stack.length) {
    const abs = stack.pop();
    const rel = relative(ROOT, abs) || '.';
    let st;
    try {
      st = statSync(abs);
    } catch { continue; }
    if (st.isDirectory()) {
      if (rel !== '.' && shouldSkip(rel, true)) continue;
      for (const entry of readdirSync(abs)) {
        stack.push(join(abs, entry));
      }
    } else if (st.isFile()) {
      if (shouldSkip(rel, false)) continue;
      out.push(abs);
    }
  }
  return out;
}

function defaultTargets() {
  if (ALL) return [ROOT];
  if (explicitPaths.length) return explicitPaths.map((p) => resolve(ROOT, p));
  return [
    resolve(ROOT, 'apps'),
    resolve(ROOT, 'docs'),
    resolve(ROOT, 'data'),
    resolve(ROOT, 'scripts'),
    resolve(ROOT, 'packages/reicon-mcp/src'),
    resolve(ROOT, 'README.md'),
    resolve(ROOT, 'CONTRIBUTING.md'),
  ].filter((p) => {
    try { statSync(p); return true; } catch { return false; }
  });
}

const files = collectFiles(defaultTargets());
let changedFiles = 0;
let totalReplacements = 0;
const changedList = [];

for (const file of files) {
  let content;
  try {
    content = readFileSync(file, 'utf-8');
  } catch {
    continue; // unreadable / binary
  }
  if (!content.includes(EM_DASH)) continue;
  // Guard against files with NUL bytes (binary read as utf-8).
  if (content.includes('\0')) continue;
  const count = content.split(EM_DASH).length - 1;
  const next = content.split(EM_DASH).join(REPLACEMENT);
  totalReplacements += count;
  changedFiles += 1;
  changedList.push(`${relative(ROOT, file)} (${count})`);
  if (!DRY_RUN) writeFileSync(file, next, 'utf-8');
}

console.log(`${DRY_RUN ? '[dry-run] ' : ''}Files changed: ${changedFiles}`);
console.log(`${DRY_RUN ? '[dry-run] ' : ''}Em dashes replaced: ${totalReplacements}`);
for (const line of changedList.slice(0, 200)) console.log(`  ${DRY_RUN ? 'would fix' : 'fixed'}: ${line}`);
if (changedList.length > 200) console.log(`  ... and ${changedList.length - 200} more`);

if (!INCLUDE_GENERATED) {
  console.log('\nNote: generated outputs skipped (page-meta.ts, llms*.txt, cdn/, Kotlin library).');
  console.log('Their generators were fixed in source, so re-run: npm run helmets && node scripts/generate-llm-assets.mjs');
}
