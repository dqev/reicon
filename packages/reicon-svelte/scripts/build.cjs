#!/usr/bin/env node
/**
 * build.cjs — Generates the `reicon-svelte` Svelte package from icondata.json
 *
 * Usage:  node packages/reicon-svelte/scripts/build.cjs  (or: npm run build:svelte)
 *
 * Output:
 *   src/icons/        Individual Svelte components and Svelte type declarations (git-ignored)
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
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\n/g, ' ').replace(/\s+/g, ' ').replace(/\$\{/g, '\\${');
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

// ── clean & prepare src ────────────────────────────────────────────────────
fs.rmSync(path.join(SRC, 'icons'), { recursive: true, force: true });
fs.mkdirSync(path.join(SRC, 'icons'), { recursive: true });

// ── individual icon files ──────────────────────────────────────────────────
console.log('Generating Svelte components in src/icons/ …');

const barrelExports = [];
const dtsExports = [];

for (const icon of icons) {
  const wEntries = Object.entries(icon.weights)
    .map(([k, v]) => `    ${k}: \`${escapeForJS(v)}\``)
    .join(',\n');

  const previewUri = buildPreviewDataUri(icon.weights);
  const kebab = icon.kebab;

  // ── icon .svelte file ──
  const iconSvelte = `<script>
  import Icon from '../Icon.svelte';
  export let size = 24;
  export let color = 'currentColor';
  export let weight = 'Outline';
  export let strokeWidth = undefined;

  const iconData = {
${wEntries}
  };
</script>

<!--
  @component
  @name ${icon.pascal}
  @description Reicon Svelte icon component, renders an SVG Element.
  @preview ![${icon.pascal}](${previewUri}) - https://reicon.dev/icons/${kebab}
  @see https://reicon.dev/docs — Documentation
-->
<Icon {size} {color} {weight} {strokeWidth} {iconData} {...$$restProps} />
`;

  fs.writeFileSync(path.join(SRC, 'icons', `${icon.pascal}.svelte`), iconSvelte);

  // ── icon .svelte.d.ts file ──
  const iconDTS = `import { SvelteComponent } from 'svelte';
import { IconProps } from '../index';

/**
 * @component
 * @name ${icon.pascal}
 * @description Reicon Svelte icon component, renders an SVG Element.
 * @preview ![${icon.pascal}](${previewUri}) - https://reicon.dev/icons/${kebab}
 * @see https://reicon.dev/docs — Documentation
 */
export default class ${icon.pascal} extends SvelteComponent<IconProps, any, any> {}
`;

  fs.writeFileSync(path.join(SRC, 'icons', `${icon.pascal}.svelte.d.ts`), iconDTS);

  barrelExports.push(`export { default as ${icon.pascal} } from './icons/${icon.pascal}.svelte';`);
  dtsExports.push(`export { default as ${icon.pascal} } from './icons/${icon.pascal}.svelte';`);
}

// ── index.js (ESM barrel in src/) ──────────────────────────────────────────
const indexJS = `// Auto-generated barrel — do not edit
export { default as Icon } from './Icon.svelte';

${barrelExports.join('\n')}
`;

fs.writeFileSync(path.join(SRC, 'index.js'), indexJS);

// ── index.d.ts (types in src/) ─────────────────────────────────────────────
const indexDTS = `// Auto-generated — do not edit
import { SvelteComponent } from 'svelte';

export interface IconProps {
  /** Primary icon color. Default: \`currentColor\` */
  color?: string;
  /** Icon size (px when number, or any CSS unit). Default: \`24\` */
  size?: number | string;
  /** Icon weight / style: \`'Outline'\` | \`'Filled'\`. Default: \`'Outline'\` */
  weight?: 'Outline' | 'Filled';
  /** Override stroke-width on stroked weights */
  strokeWidth?: number | string;
  // allow other standard SVG/HTML attributes
  [key: string]: any;
}

export declare class Icon extends SvelteComponent<IconProps, any, any> {}

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
fs.copyFileSync(path.join(SRC, 'Icon.svelte'), path.join(DIST, 'Icon.svelte'));
fs.copyFileSync(path.join(SRC, 'Icon.svelte.d.ts'), path.join(DIST, 'Icon.svelte.d.ts'));
fs.copyFileSync(path.join(SRC, 'index.js'), path.join(DIST, 'index.js'));
fs.copyFileSync(path.join(SRC, 'index.d.ts'), path.join(DIST, 'index.d.ts'));

for (const icon of icons) {
  fs.copyFileSync(path.join(SRC, 'icons', `${icon.pascal}.svelte`), path.join(DIST, 'icons', `${icon.pascal}.svelte`));
  fs.copyFileSync(path.join(SRC, 'icons', `${icon.pascal}.svelte.d.ts`), path.join(DIST, 'icons', `${icon.pascal}.svelte.d.ts`));
}

// ── package.json ───────────────────────────────────────────────────────────
const pkg = {
  name: 'reicon-svelte',
  version: '1.0.0',
  type: 'module',
  description:
    `Svelte icon components for ${icons.length}+ icons in 2 weights (Outline & Filled). Tree-shakeable, TypeScript-ready.`,
  main: './index.js',
  module: './index.js',
  svelte: './index.js',
  types: './index.d.ts',
  exports: {
    '.': {
      types: './index.d.ts',
      svelte: './index.js',
      default: './index.js'
    },
    './icons/*.svelte': {
      types: './icons/*.svelte.d.ts',
      svelte: './icons/*.svelte',
      default: './icons/*.svelte'
    },
    './icons/*': {
      types: './icons/*.svelte.d.ts',
      svelte: './icons/*.svelte',
      default: './icons/*.svelte'
    },
    './Icon.svelte': {
      types: './Icon.svelte.d.ts',
      svelte: './Icon.svelte',
      default: './Icon.svelte'
    }
  },
  sideEffects: false,
  files: ['index.js', 'index.d.ts', 'Icon.svelte', 'Icon.svelte.d.ts', 'icons/', 'README.md'],
  peerDependencies: {
    svelte: '>=3.0.0',
  },
  keywords: [
    'icons',
    'svelte',
    'svelte3',
    'svelte4',
    'svelte5',
    'svelte-icons',
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
const readme = `<p align="center">
  <a href="https://npmjs.com/package/reicon-svelte"><img src="https://img.shields.io/npm/v/reicon-svelte?color=black&label=npm" alt="npm version" /></a>
  <a href="https://npmjs.com/package/reicon-svelte"><img src="https://img.shields.io/npm/dm/reicon-svelte?color=black&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/dqev/reicon/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-black" alt="MIT License" /></a>
  <a href="https://reicon.dev"><img src="https://img.shields.io/badge/docs-reicon.dev-black" alt="Documentation" /></a>
</p>

# Reicon Svelte

> ${icons.length}+ pixel-perfect SVG icons • Outline & Filled weights • Svelte component wrapper • Zero dependencies • MIT Licensed

**Reicon Svelte** is the official Svelte package for Reicon — a free, open-source SVG icon library with ${icons.length}+ handcrafted, grid-aligned icons built for developers and designers. Every component is optimized for tree-shaking and fully TypeScript-ready.

- 🔗 **Website & icon browser:** [reicon.dev](https://reicon.dev)
- 📦 **Core package:** [reicon](https://npmjs.com/package/reicon)
- 🎨 **Figma plugin:** [reicon.dev/figma](https://reicon.dev/figma)

---

## Install

\`\`\`bash
npm i reicon-svelte
# or
bun add reicon-svelte
# or
yarn add reicon-svelte
\`\`\`

---

## Usage

\`\`\`svelte
<script>
  import { Home, ShieldCheck, AltArrowDown } from 'reicon-svelte';
</script>

<Home />
<ShieldCheck size={32} color="#d97757" />
<AltArrowDown weight="Filled" />
\`\`\`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`size\` | \`number | string\` | \`24\` | Icon size (number = px) |
| \`color\` | \`string\` | \`currentColor\` | Primary icon color |
| \`weight\` | \`'Outline' | 'Filled'\` | \`Outline\` | Icon weight / style |
| \`strokeWidth\` | \`number | string\` | — | Override stroke width |

Plus all standard SVG attributes.

### Weights

- **Outline** — clean outlined style (default)
- **Filled** — solid filled style

\`\`\`svelte
<Home />                              <!-- Outline (default) -->
<Home weight="Filled" />              <!-- Filled -->
<Home weight="Filled" color="red" />
\`\`\`

### Direct icon import (smallest bundle)

\`\`\`js
import Home from 'reicon-svelte/icons/Home.svelte';
\`\`\`

---

## Tree-shaking — import only what you use

Every icon is a standalone ES module. Bundlers (Vite, Webpack, Rollup, esbuild) will tree-shake unused icons automatically.

\`\`\`js
// ✅ Only Home is included in your bundle
import { Home } from 'reicon-svelte';
\`\`\`

---

## Icon Names

Icons use **PascalCase**, derived from their original kebab-case names:

| Original name | Import |
|---------------|--------|
| \`home\` | \`Home\` |
| \`shield-check\` | \`ShieldCheck\` |
| \`alt-arrow-down\` | \`AltArrowDown\` |
| \`shopping-cart\` | \`ShoppingCart\` |
| \`user-circle\` | \`UserCircle\` |

Browse all ${icons.length}+ icons at [reicon.dev](https://reicon.dev).

---

## TypeScript

Full TypeScript support out of the box.

---

## Why Reicon?

| | Reicon | Lucide | Heroicons | Phosphor |
|--|--------|--------|-----------|---------|
| **Icons** | ${icons.length}+ | 1600+ | 292 | 7700+ |
| **Weights** | Outline + Filled | Outline only | Outline + Solid | 6 weights |
| **Vanilla JS** | ✅ Native | ❌ | ❌ | ❌ |
| **React** | ✅ reicon-react | ✅ | ✅ | ✅ |
| **Vue** | ✅ reicon-vue | ✅ | ✅ | ✅ |
| **CDN / script tag** | ✅ | ❌ | ❌ | ❌ |
| **Zero dependencies** | ✅ | ✅ | ✅ | ✅ |
| **TypeScript** | ✅ | ✅ | ✅ | ✅ |
| **MIT License** | ✅ | ✅ | ✅ | ✅ |
| **Figma plugin** | ✅ | ✅ | ❌ | ✅ |

---

## Related packages

| Package | Description |
|---------|-------------|
| [\`reicon\`](https://npmjs.com/package/reicon) | Core vanilla JS + CDN |
| [\`reicon-react\`](https://npmjs.com/package/reicon-react) | React components for all ${icons.length}+ icons |
| [\`reicon-vue\`](https://npmjs.com/package/reicon-vue) | Vue 3 components for all ${icons.length}+ icons |
| [\`reicon-svelte\`](https://npmjs.com/package/reicon-svelte) | **This package.** Svelte components for all ${icons.length}+ icons |

---

## Links

- 🌐 Website: [reicon.dev](https://reicon.dev)
- 📖 Documentation: [reicon.dev/usage](https://reicon.dev/usage)
- 📦 npm (React): [npmjs.com/package/reicon-react](https://npmjs.com/package/reicon-react)
- 🐙 GitHub: [github.com/dqev/reicon](https://github.com/dqev/reicon)
- 🐛 Issues: [github.com/dqev/reicon/issues](https://github.com/dqev/reicon/issues)

---

## License

MIT © [Dev Chauhan](https://devchauhan.in)

Free to use in personal and commercial projects.
`;

fs.writeFileSync(path.join(DIST, 'README.md'), readme);
fs.writeFileSync(path.join(__dirname, '..', 'README.md'), readme);

// ── icon name map ──────────────────────────────────────────────────────────
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
