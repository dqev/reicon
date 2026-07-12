#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const DATA_PATH = path.join(__dirname, '..', '..', '..', 'data', 'icon-data.json');
const INDEX_OUT = path.join(ROOT, 'src', 'data', 'icon-index.json');
const DIST_DATA = path.join(ROOT, 'dist', 'data');
const DIST_INDEX = path.join(DIST_DATA, 'icon-index.json');

const SEARCH_ALIASES = {
  x: ['close', 'dismiss', 'cancel'],
  cart: ['shopping cart', 'shopping'],
  trash: ['delete', 'remove', 'bin'],
  settings: ['gear', 'cog'],
  search: ['magnifier', 'find'],
  user: ['profile', 'account', 'avatar'],
  heart: ['love', 'favorite', 'like'],
};

function toPascalCase(str) {
  return str
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function stripSvgWrapper(code) {
  if (!code) return '';
  return code.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
}

function rewriteColors(svg) {
  return svg.replace(/fill="white"/g, 'fill="currentColor"');
}

function buildIndex(data) {
  const icons = [];
  const categorySet = new Set();
  const pascalLowerSet = new Set();

  for (const [catKey, catData] of Object.entries(data.categories || {})) {
    categorySet.add(catKey);

    for (const [iconKey, icon] of Object.entries(catData.icons || {})) {
      let pascal = toPascalCase(iconKey);

      if (pascalLowerSet.has(pascal.toLowerCase())) {
        pascal += toPascalCase(catKey);
      }
      pascalLowerSet.add(pascal.toLowerCase());

      const weights = {};

      for (const wName of ['Outline', 'Filled']) {
        const wData = icon.weights?.[wName];
        if (wData?.code) {
          weights[wName] = {
            code: rewriteColors(stripSvgWrapper(wData.code)),
            viewBox: '0 0 24 24',
          };
        }
      }

      if (Object.keys(weights).length > 0) {
        icons.push({
          name: iconKey,
          pascal,
          category: catKey,
          tags: [...(icon.description || []), ...(SEARCH_ALIASES[iconKey] || [])],
          weights,
        });
      }
    }
  }

  icons.sort((a, b) => a.name.localeCompare(b.name));

  return {
    icons,
    categories: [...categorySet].sort(),
  };
}

console.log('Building reicon-mcp …');

const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
const index = buildIndex(data);

fs.mkdirSync(path.dirname(INDEX_OUT), { recursive: true });
fs.writeFileSync(INDEX_OUT, JSON.stringify(index) + '\n');

fs.mkdirSync(DIST_DATA, { recursive: true });
fs.copyFileSync(INDEX_OUT, DIST_INDEX);

console.log(`Wrote ${index.icons.length} icons to icon-index.json`);

execSync('node ../../node_modules/typescript/bin/tsc -p tsconfig.json', { cwd: ROOT, stdio: 'inherit' });

const pkg = {
  name: 'reicon-mcp',
  version: '1.0.0',
  type: 'module',
  description: 'MCP server and CLI for browsing and applying Reicon icons.',
  bin: {
    'reicon-mcp': 'bin/run.cjs',
  },
  main: './server/index.js',
  files: ['bin', 'cli', 'server', 'core', 'data', 'README.md', 'LICENSE'],
  scripts: {
    build: 'node scripts/build.cjs',
  },
  keywords: ['reicon', 'icons', 'mcp', 'model-context-protocol', 'svg'],
  author: 'Dev Chauhan',
  license: 'MIT',
  repository: {
    type: 'git',
    url: 'https://github.com/dqev/reicon.git',
    directory: 'packages/reicon-mcp',
  },
  homepage: 'https://reicon.dev',
  bugs: {
    url: 'https://github.com/dqev/reicon/issues',
  },
  dependencies: {
    '@modelcontextprotocol/sdk': '^1.12.0',
    'zod': '^3.24.0',
  },
  engines: {
    node: '>=18',
  },
};

fs.writeFileSync(path.join(ROOT, 'dist', 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
fs.copyFileSync(path.join(ROOT, 'README.md'), path.join(ROOT, 'dist', 'README.md'));
fs.copyFileSync(path.join(ROOT, 'LICENSE'), path.join(ROOT, 'dist', 'LICENSE'));
fs.cpSync(path.join(ROOT, 'bin'), path.join(ROOT, 'dist', 'bin'), { recursive: true });
fs.chmodSync(path.join(ROOT, 'dist', 'bin', 'run.cjs'), 0o755);

console.log('reicon-mcp build complete');
