#!/usr/bin/env node
/**
 * build.cjs — Generates the `reicon-astro` Astro package from icondata.json
 *
 * Usage:  node packages/reicon-astro/scripts/build.cjs  (or: npm run build:astro)
 *
 * Output:
 *   src/icons/        Individual Astro components and type declarations (git-ignored)
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

function rewriteColors(svg) {
  return svg.replace(/fill="white"/g, 'fill="currentColor"');
}

function escapeForJS(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\n/g, ' ').replace(/\s+/g, ' ').replace(/\$\{/g, '\\${');
}

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
const RESERVED_EXPORT_NAMES = ['icon', 'createicon', 'iconprops', 'iconweight', 'iconcomponent', 'iconoptions', 'iconfunction'];
const icons = [];
const pascalLowerSet = new Set(RESERVED_EXPORT_NAMES);

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
console.log('Generating Astro components in src/icons/ …');

const barrelExports = [];
const dtsExports = [];

for (const icon of icons) {
  const wEntries = Object.entries(icon.weights)
    .map(([k, v]) => `  ${k}: \`${escapeForJS(v)}\``)
    .join(',\n');

  const previewUri = buildPreviewDataUri(icon.weights);
  const kebab = icon.kebab;

  // ── icon .astro file ──
  const iconAstro = `---
import Icon from '../Icon.astro';

export interface Props {
  size?: number | string;
  color?: string;
  weight?: 'Outline' | 'Filled';
  strokeWidth?: number | string;
  class?: string;
  style?: string;
  [key: string]: any;
}

const iconData = {
${wEntries}
};
---

<!--
  @component
  @name ${icon.pascal}
  @description Reicon Astro icon component, renders an SVG Element.
  @preview ![${icon.pascal}](${previewUri}) - https://reicon.dev/icons/${kebab}
  @see https://reicon.dev/docs/astro — Documentation
-->
<Icon iconData={iconData} {...Astro.props} />
`;

  fs.writeFileSync(path.join(SRC, 'icons', `${icon.pascal}.astro`), iconAstro);

  // ── icon .astro.d.ts file ──
  const iconDTS = `export interface Props {
  size?: number | string;
  color?: string;
  weight?: 'Outline' | 'Filled';
  strokeWidth?: number | string;
  class?: string;
  style?: string;
  [key: string]: any;
}

export declare const ${icon.pascal}: (props: Props) => any;
export default ${icon.pascal};
`;

  fs.writeFileSync(path.join(SRC, 'icons', `${icon.pascal}.astro.d.ts`), iconDTS);

  barrelExports.push(`export { default as ${icon.pascal} } from './icons/${icon.pascal}.astro';`);
  dtsExports.push(`export declare const ${icon.pascal}: (props: IconProps) => any;`);
}

// ── index.js (ESM barrel in src/) ──────────────────────────────────────────
const indexJS = `// Auto-generated barrel — do not edit
export { default as Icon } from './Icon.astro';

${barrelExports.join('\n')}
`;

fs.writeFileSync(path.join(SRC, 'index.js'), indexJS);

// ── index.d.ts (types in src/) ─────────────────────────────────────────────
const indexDTS = `// Auto-generated — do not edit

export interface IconProps {
  /** Primary icon color. Default: inherits from CSS */
  color?: string;
  /** Icon size (px when number, or any CSS unit). Default: \`24\` */
  size?: number | string;
  /** Icon weight / style: \`'Outline'\` | \`'Filled'\`. Default: \`'Outline'\` */
  weight?: 'Outline' | 'Filled';
  /** Override stroke-width on stroked weights */
  strokeWidth?: number | string;
  /** Class name for the SVG element */
  class?: string;
  /** Inline styles */
  style?: string;
  // allow other standard SVG/HTML attributes
  [key: string]: any;
}

export type IconWeight = 'Outline' | 'Filled';

export declare const Icon: (props: IconProps) => any;

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
fs.copyFileSync(path.join(SRC, 'Icon.astro'), path.join(DIST, 'Icon.astro'));
fs.copyFileSync(path.join(SRC, 'index.js'), path.join(DIST, 'index.js'));
fs.copyFileSync(path.join(SRC, 'index.d.ts'), path.join(DIST, 'index.d.ts'));

for (const icon of icons) {
  fs.copyFileSync(path.join(SRC, 'icons', `${icon.pascal}.astro`), path.join(DIST, 'icons', `${icon.pascal}.astro`));
  fs.copyFileSync(path.join(SRC, 'icons', `${icon.pascal}.astro.d.ts`), path.join(DIST, 'icons', `${icon.pascal}.astro.d.ts`));
}

// ── package.json ───────────────────────────────────────────────────────────
const srcPkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'));
const pkg = {
  name: 'reicon-astro',
  version: srcPkg.version,
  type: 'module',
  description:
    `Astro icon components for ${icons.length}+ icons in 2 weights (Outline & Filled). Tree-shakeable, TypeScript-ready.`,
  main: './index.js',
  module: './index.js',
  types: './index.d.ts',
  exports: {
    '.': {
      types: './index.d.ts',
      astro: './index.js',
      default: './index.js'
    },
    './icons/*.astro': {
      types: './icons/*.astro.d.ts',
      astro: './icons/*.astro',
      default: './icons/*.astro'
    },
    './icons/*': {
      types: './icons/*.astro.d.ts',
      astro: './icons/*.astro',
      default: './icons/*.astro'
    },
    './Icon.astro': {
      astro: './Icon.astro',
      default: './Icon.astro'
    }
  },
  sideEffects: false,
  files: ['index.js', 'index.d.ts', 'Icon.astro', 'icons/', 'README.md'],
  peerDependencies: {
    astro: '>=3.0.0',
  },
  keywords: [
    'icons',
    'astro',
    'astro-icons',
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
  <a href="https://reicon.dev">
    <img src="https://reicon.dev/readme-banner.png" alt="Reicon Astro — SVG Icon Library for Astro" width="100%" />
  </a>
</p>

<p align="center">
  <a href="https://npmjs.com/package/reicon-astro"><img src="https://img.shields.io/npm/v/reicon-astro?color=black&label=npm" alt="npm version" /></a>
  <a href="https://npmjs.com/package/reicon-astro"><img src="https://img.shields.io/npm/dm/reicon-astro?color=black&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/dqev/reicon/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-black" alt="MIT License" /></a>
  <a href="https://reicon.dev"><img src="https://img.shields.io/badge/docs-reicon.dev-black" alt="Documentation" /></a>
  <a href="https://github.com/dqev/reicon"><img src="https://img.shields.io/badge/github-dqev/reicon-black" alt="GitHub" /></a>
</p>

<h1 align="center">Reicon Astro</h1>

<p align="center">
  <b>${icons.length}+ pixel-perfect SVG icons</b> • Outline & Filled weights • Astro component wrapper • Zero dependencies • MIT Licensed
</p>

<p align="center">
  <a href="#install">Install</a> •
  <a href="#usage">Usage</a> •
  <a href="#props">Props</a> •
  <a href="#tree-shaking">Tree-shaking</a> •
  <a href="#icon-names">Icon Names</a> •
  <a href="#typescript">TypeScript</a>
</p>

**Reicon Astro** is the official Astro package for <a href="https://reicon.dev">Reicon</a> — a free, open-source SVG icon library featuring ${icons.length}+ handcrafted, grid-aligned icons. Every component is tree-shakeable, fully TypeScript-ready, and ships with zero dependencies.

| 🔗 &nbsp; Resource | Link |
|---|---|
| 🌐 &nbsp; Website & icon browser | [reicon.dev](https://reicon.dev) |
| 📖 &nbsp; Documentation | [reicon.dev/docs/astro](https://reicon.dev/docs/astro) |
| 📦 &nbsp; Core package (vanilla JS) | [reicon](https://npmjs.com/package/reicon) |
| 🎨 &nbsp; Figma plugin | [reicon.dev/docs/figma](https://reicon.dev/docs/figma) |

---

## Install

\`\`\`bash
npm i reicon-astro
# or
bun add reicon-astro
# or
yarn add reicon-astro
\`\`\`

<details>
<summary><b>Requirements</b></summary>

- **Astro** ≥ 3.0, 4.0, or 5.0
- No other dependencies required.

</details>

---

## Usage

### Basic

\`\`\`astro
---
import { Home, ShieldCheck, AltArrowDown } from 'reicon-astro';
---

<Home />
<ShieldCheck size={32} color="#d97757" />
<AltArrowDown weight="Filled" />
\`\`\`

### Weights

Every icon ships in two weights — **Outline** (default) and **Filled**:

\`\`\`astro
<Home />                        <!-- Outline (default) -->
<Home weight="Filled" />        <!-- Filled -->
\`\`\`

### Sizing & coloring

\`\`\`astro
<Home size={32} />                    <!-- 32×32px -->
<Home size={48} color="#d97757" />    <!-- Custom size and color -->
<Home color="currentColor" />         <!-- Inherits parent text color -->
\`\`\`

### Direct icon import (smallest bundle)

For the absolute minimum bundle size, import icons directly from the sub-path:

\`\`\`astro
---
import Home from 'reicon-astro/icons/Home.astro';
import ShieldCheck from 'reicon-astro/icons/ShieldCheck.astro';
---
\`\`\`

### All SVG attributes are supported

Pass any standard SVG attribute — \`class\`, \`style\`, \`aria-*\`, etc.:

\`\`\`astro
<Home
  size={48}
  color="red"
  class="my-icon"
  style="margin-right: 8px"
  aria-label="Home"
/>
\`\`\`

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`size\` | \`number | string\` | \`24\` | Icon width & height (number = px) |
| \`color\` | \`string\` | — | Primary icon stroke/fill color. Leave unset to use CSS class. |
| \`weight\` | \`'Outline' | 'Filled'\` | \`'Outline'\` | Icon style variant |
| \`strokeWidth\` | \`number | string\` | — | Override the default stroke width |
| \`class\` | \`string\` | — | Additional CSS class on the \`<svg>\` element |
| \`style\` | \`string\` | — | Additional inline styles |

Any valid SVG attribute (e.g. \`id\`, \`aria-*\`) is forwarded to the underlying \`<svg>\` element.

---

## Tree-shaking

Every icon is a standalone ES module. Modern bundlers — **Vite**, **Astro** — automatically tree-shake unused icons, keeping only what you import.

\`\`\`astro
---
// ✅ Only Home is included in your production build
import { Home } from 'reicon-astro';

// ✅ Even smaller — direct path import skips the barrel file entirely
import Home from 'reicon-astro/icons/Home.astro';
---
\`\`\`

The package is marked \`"sideEffects": false\` for optimal dead-code elimination.

---

## Icon Names

Icons use **PascalCase**, derived from their original kebab-case file names:

| Original name | PascalCase import |
|---------------|-------------------|
| \`home\` | \`Home\` |
| \`shield-check\` | \`ShieldCheck\` |
| \`alt-arrow-down\` | \`AltArrowDown\` |
| \`shopping-cart\` | \`ShoppingCart\` |
| \`user-circle\` | \`UserCircle\` |

Browse and search all ${icons.length}+ icons at <a href="https://reicon.dev">reicon.dev</a>.

---

## TypeScript

Full type declarations ship with the package — no separate \`@types/\` installation needed.

\`\`\`ts
import { Home, type IconProps, type IconWeight } from 'reicon-astro';

const weight: IconWeight = 'Filled';
const props: IconProps = { size: 32, color: '#d97757', weight };
\`\`\`

---

## License

MIT © [Dev Chauhan](https://devchauhan.in)
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
const totalFiles = (icons.length * 2) + 4;
console.log(`\nDone!`);
console.log(`  Icons:       ${icons.length}`);
console.log(`  Weights:     Outline + Filled`);
console.log(`  Files:       ${totalFiles}`);
console.log(`  Output:      ${DIST}`);
console.log(`\nTo publish:`);
console.log(`  cd dist && npm publish --access public\n`);
