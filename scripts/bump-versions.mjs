#!/usr/bin/env node
/**
 * bump-versions.mjs — Update all package versions across the monorepo
 *
 * Usage:
 *   node scripts/bump-versions.mjs          # interactive mode
 *   node scripts/bump-versions.mjs --list    # show current versions
 *
 * To set specific versions (semi-interactive), pass --auto which bumps the
 * patch segment by 1 for every package, or edit the printed JSON and re-run.
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ── package manifest ──────────────────────────────────────────────────────
const PACKAGES = [
  { key: 'reicon',         path: 'packages/reicon/package.json' },
  { key: 'reicon-react',   path: 'packages/reicon-react/package.json' },
  { key: 'reicon-vue',     path: 'packages/reicon-vue/package.json' },
  { key: 'reicon-svelte',  path: 'packages/reicon-svelte/package.json' },
  { key: 'reicon-react-native', path: 'packages/reicon-react-native/package.json' },
  { key: 'reicon-vscode',  path: 'packages/reicon-vscode/package.json' },
  { key: 'reicon-mcp',     path: 'packages/reicon-mcp/package.json' },
  { key: 'reicon-figma',   path: 'packages/reicon-figma/Reicon/package.json' },
  { key: 'reicon-docs',    path: 'package.json' },
];

// Website display versions are in src/pages/packages/data.tsx (TOOLS array)
const DATA_TSX = resolve(ROOT, 'src/pages/packages/data.tsx');

// ── helpers ───────────────────────────────────────────────────────────────
function readJson(rel) {
  return JSON.parse(readFileSync(resolve(ROOT, rel), 'utf-8'));
}

function writeJson(rel, obj) {
  writeFileSync(resolve(ROOT, rel), JSON.stringify(obj, null, 2) + '\n', 'utf-8');
}

function readCurrent() {
  const map = {};
  for (const pkg of PACKAGES) {
    try {
      const json = readJson(pkg.path);
      map[pkg.key] = json.version || '?';
    } catch { map[pkg.key] = '? (not found)'; }
  }
  return map;
}

// Parse display versions from data.tsx (TOOLS array entries)
function readDisplayVersions() {
  const src = readFileSync(DATA_TSX, 'utf-8');
  const versions = {};
  const regex = /id:\s*'(figma|vscode|mcp)'[\s\S]*?version:\s*'v([^']+)'/g;
  let m;
  while ((m = regex.exec(src)) !== null) {
    versions[m[1]] = m[2];
  }
  return versions;
}

// Update display version in data.tsx for a given tool
function updateDisplayVersion(toolKey, newVersion) {
  let src = readFileSync(DATA_TSX, 'utf-8');
  const re = new RegExp(`(id:\\s*'${toolKey}'[\\s\\S]*?version:\\s*)'v[^']+'`);
  if (re.test(src)) {
    src = src.replace(re, `$1'v${newVersion}'`);
    writeFileSync(DATA_TSX, src, 'utf-8');
    return true;
  }
  return false;
}

function ask(query) {
  return new Promise(resolve => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    rl.question(query, answer => { rl.close(); resolve(answer.trim()); });
  });
}

// ── main ──────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--list') || args.includes('-l')) {
    console.log('\nCurrent versions:\n');
    const cur = readCurrent();
    for (const pkg of PACKAGES) {
      console.log(`  ${pkg.key.padEnd(22)} ${cur[pkg.key]}`);
    }
    console.log('\nDisplay versions (website):');
    const disp = readDisplayVersions();
    for (const [k, v] of Object.entries(disp)) {
      console.log(`  ${k.padEnd(22)} v${v}`);
    }
    process.exit(0);
  }

  console.log('── Current versions ──\n');
  const cur = readCurrent();
  for (const pkg of PACKAGES) {
    const v = cur[pkg.key];
    const couldSkip = v === '?' || v === '? (not found)' || pkg.key === 'reicon-docs';
    console.log(`  ${pkg.key.padEnd(22)} ${v}${couldSkip ? '  (skipped)' : ''}`);
  }

  console.log('\n── Display versions on website ──');
  const disp = readDisplayVersions();
  for (const [k, v] of Object.entries(disp)) {
    console.log(`  ${k.padEnd(22)} v${v}`);
  }

  console.log('\nEnter new versions (or leave blank to skip, "auto" to bump patch+1):\n');

  for (const pkg of PACKAGES) {
    const curV = cur[pkg.key];
    if (pkg.key === 'reicon-docs' || curV === '?' || curV === '? (not found)') continue;

    const autoSuggestion = curV.split('.').map((s, i) => i === 2 ? String(Number(s) + 1) : s).join('.');
    const answer = await ask(`  ${pkg.key} (${curV}) [${autoSuggestion}]: `);
    const newV = answer || '';

    if (newV === 'auto' || (!newV && answer !== null)) {
      // apply auto suggestion
      const json = readJson(pkg.path);
      json.version = autoSuggestion;
      writeJson(pkg.path, json);
      console.log(`    → ${autoSuggestion}`);
    } else if (newV) {
      const json = readJson(pkg.path);
      json.version = newV;
      writeJson(pkg.path, json);
      console.log(`    → ${newV}`);
    } else {
      console.log('    → skipped');
    }
  }

  // Update display versions in data.tsx
  console.log('\n── Update display versions on website? ──');
  for (const [toolKey] of Object.entries(disp)) {
    const pkgMap = { figma: 'reicon-figma', vscode: 'reicon-vscode', mcp: 'reicon-mcp' };
    const pkgKey = pkgMap[toolKey];
    if (!pkgKey) continue;
    const json = readJson(PACKAGES.find(p => p.key === pkgKey).path);
    const newV = json.version;
    const oldV = disp[toolKey];
    const answer = await ask(`  ${toolKey} (v${oldV} → v${newV}) [Y/n]: `);
    if (answer.toLowerCase() !== 'n') {
      updateDisplayVersion(toolKey, newV);
      console.log(`    → v${newV}`);
    }
  }

  console.log('\n✅ Done. Run `git diff --stat` to review changes.');
}

main().catch(err => { console.error(err); process.exit(1); });
