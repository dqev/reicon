#!/usr/bin/env node
/**
 * build.cjs — Generates the `reicon-vue` Vue 3 package from icondata.json
 *
 * Usage:  node packages/reicon-vue/scripts/build.cjs  (or: npm run build:vue)
 *
 * Output:
 *   src/icons/        Individual Vue icon files and type declarations (git-ignored)
 *   src/index.js      Barrel ESM exports (git-ignored)
 *   src/index.d.ts    Barrel TypeScript declarations (git-ignored)
 *   dist/             Standard NPM package ready to publish (git-ignored)
 */

const fs = require('fs');
const path = require('path');

// ── paths ──────────────────────────────────────────────────────────────────
const DATA_PATH = path.join(__dirname, '..', '..', '..', 'data', 'icon-data.json');
const TAGS_PATH = path.join(__dirname, '..', '..', '..', 'data', 'icon-tags.json');
const SRC = path.join(__dirname, '..', 'src');
const DIST = path.join(__dirname, '..', 'dist');

// ── weight short keys ──────────────────────────────────────────────────────
const W_KEY = { Filled: 'F', Outline: 'O' };

// ── helpers ────────────────────────────────────────────────────────────────
function toPascalCase(str) {
  return str
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function stripSvgWrapper(code) {
  if (!code) return '';
  return code.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
}

// Fix hardcoded fill="white" → currentColor so user color prop works correctly.
function rewriteColors(svg) {
  return svg.replace(/fill="white"/g, 'fill="currentColor"');
}

function escapeForJS(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

/**
 * Build a base64 data URI for an inline SVG preview (shown in IDE hover).
 */
function buildPreviewDataUri(weights) {
  const inner = weights['O'] || weights['F'] || '';
  if (!inner) return '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">${inner}</svg>`
    .replace(/currentColor/g, '#e4e4e7');
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

// ── read data ──────────────────────────────────────────────────────────────
console.log('Reading icondata.json …');
const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

let TAGS = {};
if (fs.existsSync(TAGS_PATH)) {
  TAGS = JSON.parse(fs.readFileSync(TAGS_PATH, 'utf-8'));
  console.log(`Read ${Object.keys(TAGS).length} tag entries`);
}

// ── collect icons ──────────────────────────────────────────────────────────
const icons = [];
const pascalLowerSet = new Set();

for (const [catKey, catData] of Object.entries(data.categories || {})) {
  for (const [iconKey, icon] of Object.entries(catData.icons || {})) {
    let pascal = toPascalCase(iconKey);

    if (pascalLowerSet.has(pascal.toLowerCase())) {
      pascal += toPascalCase(catKey);
    }
    pascalLowerSet.add(pascal.toLowerCase());

    const weights = {};
    for (const [wName, wData] of Object.entries(icon.weights || {})) {
      const short = W_KEY[wName];
      if (short && wData.code) {
        weights[short] = rewriteColors(stripSvgWrapper(wData.code));
      }
    }

    if (Object.keys(weights).length > 0) {
      icons.push({
        kebab: iconKey,
        pascal,
        category: catKey,
        weights,
        tags: TAGS[iconKey] || icon.description || [],
      });
    }
  }
}

icons.sort((a, b) => a.pascal.localeCompare(b.pascal));
console.log(`Found ${icons.length} icons`);

// ── clean & prepare src/icons ──────────────────────────────────────────────
fs.rmSync(path.join(SRC, 'icons'), { recursive: true, force: true });
fs.mkdirSync(path.join(SRC, 'icons'), { recursive: true });

// ── individual icon files ──────────────────────────────────────────────────
console.log('Generating Vue component files in src/icons/ …');

const barrelExports = [];
const dtsExports = [];

for (const icon of icons) {
  const wEntries = Object.entries(icon.weights)
    .map(([k, v]) => `  ${k}: \`${escapeForJS(v)}\``)
    .join(',\n');

  const previewUri = buildPreviewDataUri(icon.weights);
  const kebab = icon.kebab;

  // ── icon .js file ──
  const iconJS = `import createIcon from '../createIcon.js';

/**
 * @component
 * @name ${icon.pascal}
 * @description Reicon Vue icon component, renders an SVG Element.
 * @preview ![${icon.pascal}](${previewUri}) - https://reicon.dev/icons/${kebab}
 * @see https://reicon.dev/docs — Documentation
 */
const ${icon.pascal} = createIcon('${icon.pascal}', {
${wEntries}
});

export { ${icon.pascal} };
export default ${icon.pascal};
`;

  fs.writeFileSync(path.join(SRC, 'icons', `${icon.pascal}.js`), iconJS);

  // ── icon .d.ts file ──
  const iconDTS = `import { IconComponent } from '../createIcon';

/**
 * @component
 * @name ${icon.pascal}
 * @description Reicon Vue icon component, renders an SVG Element.
 * @preview ![${icon.pascal}](${previewUri}) - https://reicon.dev/icons/${kebab}
 * @see https://reicon.dev/docs — Documentation
 */
declare const ${icon.pascal}: IconComponent;
export { ${icon.pascal} };
export default ${icon.pascal};
`;

  fs.writeFileSync(path.join(SRC, 'icons', `${icon.pascal}.d.ts`), iconDTS);

  barrelExports.push(`export { ${icon.pascal} } from './icons/${icon.pascal}.js';`);
  dtsExports.push(`export { ${icon.pascal} } from './icons/${icon.pascal}.js';`);
}

// ── index.js (ESM barrel in src/) ──────────────────────────────────────────
const indexJS = `// Auto-generated barrel — do not edit
export { createIcon } from './createIcon.js';

${barrelExports.join('\n')}
`;

fs.writeFileSync(path.join(SRC, 'index.js'), indexJS);

// ── index.d.ts (types in src/) ─────────────────────────────────────────────
const indexDTS = `// Auto-generated — do not edit
export { createIcon, IconProps, IconWeight, IconComponent } from './createIcon';

${dtsExports.join('\n')}
`;

fs.writeFileSync(path.join(SRC, 'index.d.ts'), indexDTS);

// ── recreate src/icons/.gitkeep ────────────────────────────────────────────
fs.writeFileSync(path.join(SRC, 'icons', '.gitkeep'), '# Keep directory in Git\n');

// ── clean & prepare dist ───────────────────────────────────────────────────
console.log('Preparing production build in dist/ …');
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'icons'), { recursive: true });

// ── copy src files to dist ─────────────────────────────────────────────────
fs.copyFileSync(path.join(SRC, 'createIcon.js'), path.join(DIST, 'createIcon.js'));
fs.copyFileSync(path.join(SRC, 'createIcon.d.ts'), path.join(DIST, 'createIcon.d.ts'));
fs.copyFileSync(path.join(SRC, 'index.js'), path.join(DIST, 'index.js'));
fs.copyFileSync(path.join(SRC, 'index.d.ts'), path.join(DIST, 'index.d.ts'));

for (const icon of icons) {
  fs.copyFileSync(path.join(SRC, 'icons', `${icon.pascal}.js`), path.join(DIST, 'icons', `${icon.pascal}.js`));
  fs.copyFileSync(path.join(SRC, 'icons', `${icon.pascal}.d.ts`), path.join(DIST, 'icons', `${icon.pascal}.d.ts`));
}

// ── package.json ───────────────────────────────────────────────────────────
const pkg = {
  name: 'reicon-vue',
  version: '1.1.1',
  type: 'module',
  description:
    `Vue 3 icon components for ${icons.length}+ icons in 2 weights (Outline & Filled). Tree-shakeable, TypeScript-ready.`,
  main: './index.js',
  module: './index.js',
  types: './index.d.ts',
  exports: {
    '.': {
      import: './index.js',
      types: './index.d.ts',
    },
    './icons/*': {
      import: './icons/*.js',
      types: './icons/*.d.ts',
    },
    './createIcon': {
      import: './createIcon.js',
      types: './createIcon.d.ts',
    },
  },
  sideEffects: false,
  files: ['index.js', 'index.d.ts', 'createIcon.js', 'createIcon.d.ts', 'icons/', 'README.md'],
  peerDependencies: {
    vue: '^3.0.0',
  },
  keywords: [
    'icons',
    'vue',
    'vue3',
    'vue-icons',
    'svg-icons',
    'icon-library',
    'reicon',
    'outline',
    'filled',
    'tree-shakeable',
    'typescript',
  ],
  author: {
    name: 'devchauhan',
    email: 'dev@devchauhan.in',
    url: 'https://devchauhan.in',
  },
  license: 'MIT',
  repository: { type: 'git', url: 'https://github.com/dqev/reicon.git' },
  bugs: { url: 'https://github.com/dqev/reicon/issues' },
  homepage: 'https://reicon.dev',
};

fs.writeFileSync(path.join(DIST, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');

// ── README.md ──────────────────────────────────────────────────────────────
const readme = `# Reicon Vue

Vue 3 icon components for **${icons.length}+** icons in **2 weights** (Outline & Filled) — tree-shakeable, TypeScript-ready, zero config.

## Install

\`\`\`bash
npm i reicon-vue
\`\`\`

## Usage

\`\`\`html
<template>
  <div>
    <Home />
    <ShieldCheck :size="32" color="#d97757" />
    <AltArrowDown weight="Filled" />
  </div>
</template>

<script setup>
import { Home, ShieldCheck, AltArrowDown } from 'reicon-vue';
</script>
\`\`\`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`size\` | \`number | string\` | \`24\` | Icon size (number = px) |
| \`color\` | \`string\` | \`currentColor\` | Primary icon color |
| \`weight\` | \`IconWeight\` | \`Outline\` | Icon weight / style |
| \`strokeWidth\` | \`number | string\` | — | Override stroke width |
| \`class\` | \`string | array | object\` | — | Custom SVG classes |
| \`style\` | \`string | array | object\` | — | Custom SVG styles |

Plus all standard SVG attributes.

### Weights

- **Outline** — clean outlined style (default)
- **Filled** — solid filled style

\`\`\`html
<Home />                           <!-- Outline (default) -->
<Home weight="Filled" />           <!-- Filled -->
<Home weight="Filled" color="red" />
\`\`\`

### Direct icon import (smallest bundle)

\`\`\`js
import Home from 'reicon-vue/icons/Home';
\`\`\`

## Icon Names

Icons use PascalCase names derived from their kebab-case originals:

| Original | Import |
|----------|--------|
| \`home\` | \`Home\` |
| \`shield-check\` | \`ShieldCheck\` |
| \`alt-arrow-down\` | \`AltArrowDown\` |
| \`shopping-cart\` | \`ShoppingCart\` |

## TypeScript

Full TypeScript support out of the box.

## License

MIT © [devchauhan](https://devchauhan.in)
`;

fs.writeFileSync(path.join(DIST, 'README.md'), readme);

// ── icon name map (for documentation / search) ────────────────────────────
const nameMap = {};
for (const icon of icons) {
  nameMap[icon.kebab] = icon.pascal;
}
fs.writeFileSync(path.join(DIST, 'icon-names.json'), JSON.stringify(nameMap, null, 2));

// ── summary ────────────────────────────────────────────────────────────────
const totalFiles = (icons.length * 2) + 5;
console.log(`\nDone!`);
console.log(`  Icons:       ${icons.length}`);
console.log(`  Weights:     Outline + Filled`);
console.log(`  Files:       ${totalFiles}`);
console.log(`  Output:      ${DIST}`);
console.log(`\nTo publish:`);
console.log(`  cd dist && npm publish --access public`);
