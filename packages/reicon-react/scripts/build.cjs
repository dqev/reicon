#!/usr/bin/env node
/**
 * build.cjs — Generates the `reicon-react` React package from icondata.json
 *
 * Usage:  node packages/reicon-react/scripts/build.cjs  (or: npm run build:react)
 *
 * Output:
 *   src/icons/        Individual React icon files and type declarations (git-ignored)
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
    .replace(/currentColor/g, '#e4e4e7')
    .replace(/__RI_SECONDARY__/g, '#9ca3af');
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
console.log('Generating React component files in src/icons/ …');

const barrelExports = [];
const dtsExports = [];

for (const icon of icons) {
  const wEntries = Object.entries(icon.weights)
    .map(([k, v]) => `  ${k}: \`${escapeForJS(v)}\``)
    .join(',\n');

  const previewUri = buildPreviewDataUri(icon.weights);
  const kebab = icon.kebab;

  // ── icon .js file with JSDoc ──
  const iconJS = `import createIcon from '../createIcon.js';

/**
 * @component
 * @name ${icon.pascal}
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![${icon.pascal}](${previewUri}) - https://reicon.dev/icons/${kebab}
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const ${icon.pascal} = createIcon('${icon.pascal}', {
${wEntries}
});

export { ${icon.pascal} };
export default ${icon.pascal};
`;

  fs.writeFileSync(path.join(SRC, 'icons', `${icon.pascal}.js`), iconJS);

  // ── icon .d.ts file with JSDoc ──
  const iconDTS = `import { IconComponent } from '../createIcon';

/**
 * @component
 * @name ${icon.pascal}
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![${icon.pascal}](${previewUri}) - https://reicon.dev/icons/${kebab}
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
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
  name: 'reicon-react',
  version: '1.1.1',
  type: 'module',
  description:
    `React icon components for ${icons.length}+ icons in 2 weights (Outline & Filled). Tree-shakeable, TypeScript-ready.`,
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
    react: '>=16.8.0',
  },
  keywords: [
    'icons',
    'react',
    'react-icons',
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
  <a href="https://npmjs.com/package/reicon-react"><img src="https://img.shields.io/npm/v/reicon-react?color=black&label=npm" alt="npm version" /></a>
  <a href="https://npmjs.com/package/reicon-react"><img src="https://img.shields.io/npm/dm/reicon-react?color=black&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/dqev/reicon/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-black" alt="MIT License" /></a>
  <a href="https://reicon.dev"><img src="https://img.shields.io/badge/docs-reicon.dev-black" alt="Documentation" /></a>
</p>

# Reicon React

> ${icons.length}+ pixel-perfect SVG icons • Outline & Filled weights • React component wrapper • Zero dependencies • MIT Licensed

**Reicon React** is the official React package for Reicon — a free, open-source SVG icon library with ${icons.length}+ handcrafted, grid-aligned icons built for developers and designers. Every component is optimized for tree-shaking and fully TypeScript-ready.

- 🔗 **Website & icon browser:** [reicon.dev](https://reicon.dev)
- 📦 **Core package:** [reicon](https://npmjs.com/package/reicon)
- 🎨 **Figma plugin:** [reicon.dev/figma](https://reicon.dev/figma)

---

## Install

\`\`\`bash
npm i reicon-react
# or
bun add reicon-react
# or
yarn add reicon-react
\`\`\`

---

## Usage

\`\`\`jsx
import { Home, ShieldCheck, AltArrowDown } from 'reicon-react';

function App() {
  return (
    <div>
      <Home />
      <ShieldCheck size={32} color="#d97757" />
      <AltArrowDown weight="Filled" />
    </div>
  );
}
\`\`\`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`size\` | \`number | string\` | \`24\` | Icon size (number = px) |
| \`color\` | \`string\` | \`currentColor\` | Primary icon color |
| \`secondaryColor\` | \`string\` | same as color | Secondary color |
| \`weight\` | \`IconWeight\` | \`Outline\` | Icon weight / style |
| \`strokeWidth\` | \`number | string\` | — | Override stroke width |
| \`className\` | \`string\` | — | Additional CSS class |

Plus all standard SVG attributes.

### Weights

- **Outline** — clean outlined style (default)
- **Filled** — solid filled style

\`\`\`jsx
import { Home } from 'reicon-react';

<Home />                           {/* Outline (default) */}
<Home weight="Filled" />           {/* Filled */}
<Home weight="Filled" color="red" />
\`\`\`

### Direct icon import (smallest bundle)

\`\`\`jsx
import Home from 'reicon-react/icons/Home';
\`\`\`

### All SVG props are supported

\`\`\`jsx
<Home
  size={48}
  color="red"
  className="my-icon"
  style={{ marginRight: 8 }}
  onClick={() => console.log('clicked')}
/>
\`\`\`

---

## Tree-shaking — import only what you use

Every icon is a standalone ES module. Bundlers (Vite, Webpack, Rollup, esbuild) will tree-shake unused icons automatically.

\`\`\`jsx
// ✅ Only Home is included in your bundle
import { Home } from 'reicon-react';
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

Full TypeScript support out of the box:

\`\`\`tsx
import { Home, IconProps, IconWeight } from 'reicon-react';

const weight: IconWeight = 'Filled';
const props: IconProps = { size: 32, color: '#d97757', weight };

<Home {...props} />
\`\`\`

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
| [\`reicon-react\`](https://npmjs.com/package/reicon-react) | **This package.** React components for all ${icons.length}+ icons |
| [\`reicon-vue\`](https://npmjs.com/package/reicon-vue) | Vue 3 components for all ${icons.length}+ icons |
| [\`reicon-svelte\`](https://npmjs.com/package/reicon-svelte) | Svelte components for all ${icons.length}+ icons |
| [\`reicon-angular\`](https://npmjs.com/package/reicon-angular) | Angular components for all ${icons.length}+ icons |

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
