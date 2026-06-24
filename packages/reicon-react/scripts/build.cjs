#!/usr/bin/env node
/**
 * build.cjs — Generates the `reicon-react` React package from icondata.json
 *
 * Usage:  node packages/reicon-react/scripts/build.cjs  (or: npm run build:react)
 *
 * Output (dist/):
 *   package.json, README.md
 *   index.js          ESM barrel — named exports for every icon
 *   index.d.ts        TypeScript declarations
 *   createIcon.js     Internal forwardRef factory
 *   createIcon.d.ts
 *   icons/<Name>.js   One ESM file per icon (tree-shakeable)
 *   icons/<Name>.d.ts TypeScript declaration per icon
 *
 * Weights: Outline (O) and Filled (F, sourced from Bold)
 * Each icon file includes Lucide-style JSDoc with @preview (inline SVG).
 */

const fs = require('fs');
const path = require('path');

// ── paths ──────────────────────────────────────────────────────────────────
const DATA_PATH = path.join(__dirname, '..', '..', '..', 'data', 'icon-data.json');
const TAGS_PATH = path.join(__dirname, '..', '..', '..', 'data', 'icon-tags.json');
const DIST = path.join(__dirname, '..', 'dist');

// ── weight short keys (reicondata.json already uses Outline/Filled) ──────
const W_KEY = { Filled: 'F', Outline: 'O' };

// ── helpers ────────────────────────────────────────────────────────────────
function toPascalCase(str) {
  return str
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function toKebabDisplay(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function stripSvgWrapper(code) {
  if (!code) return '';
  return code.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
}

// Fix hardcoded fill="white" → currentColor so user color prop works correctly.
// Some multi-part icons (circle + inner shape) ship with fill="white" baked in,
// which breaks on light backgrounds and ignores user-set colors.
function rewriteColors(svg) {
  return svg.replace(/fill="white"/g, 'fill="currentColor"');
}

function escapeForJS(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

/**
 * Build a base64 data URI for an inline SVG preview (shown in IDE hover).
 * Uses the Outline weight inner SVG, falling back to Filled.
 */
function buildPreviewDataUri(weights) {
  const inner = weights['O'] || weights['F'] || '';
  if (!inner) return '';
  // Build a full SVG with light fill/stroke so it shows in dark themes
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">${inner}</svg>`
    .replace(/currentColor/g, '#e4e4e7')
    .replace(/__RI_SECONDARY__/g, '#9ca3af');
  // Base64 encode to avoid markdown URL parser issues with special characters
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
const icons = []; // { kebab, pascal, category, weights: { F: "…", O: "…" }, tags }
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

// ── clean & prepare dist ───────────────────────────────────────────────────
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'icons'), { recursive: true });

// ── createIcon.js (ESM) ───────────────────────────────────────────────────
const createIconJS = `'use client';
import { forwardRef, createElement } from 'react';

const W_MAP = { Filled: 'F', Outline: 'O' };

/**
 * Factory that builds a forwardRef icon component.
 * @param {string} displayName  PascalCase icon name
 * @param {Object} iconData     { F?: string, O?: string }
 */
const createIcon = (displayName, iconData) => {
  const Icon = forwardRef(
    (
      {
        color = 'currentColor',
        secondaryColor,
        size = 24,
        weight = 'Outline',
        strokeWidth,
        className,
        style,
        ...rest
      },
      ref,
    ) => {
      const key = W_MAP[weight] || 'O';
      let html = iconData[key] || iconData[Object.keys(iconData)[0]] || '';

      // Colors are already currentColor from reicondata.json
      if (secondaryColor) {
        // noop — single-color icons, no secondary placeholder
      }

      if (strokeWidth != null) {
        html = html.replace(/stroke-width="[^"]*"/g, 'stroke-width="' + strokeWidth + '"');
      }

      return createElement('svg', {
        ref,
        xmlns: 'http://www.w3.org/2000/svg',
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        className: className ? 'reicon ' + className : 'reicon',
        style: { color, ...style },
        ...rest,
        dangerouslySetInnerHTML: { __html: html },
      });
    },
  );

  Icon.displayName = displayName;
  return Icon;
};

export { createIcon };
export default createIcon;
`;

fs.writeFileSync(path.join(DIST, 'createIcon.js'), createIconJS);

// ── createIcon.d.ts ────────────────────────────────────────────────────────
const createIconDTS = `import { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

export type IconWeight = 'Filled' | 'Outline';

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'color'> {
  /** Primary color. Default: \`currentColor\` */
  color?: string;
  /** Secondary color. Default: same as color */
  secondaryColor?: string;
  /** Icon size (px when number). Default: \`24\` */
  size?: number | string;
  /** Icon weight / style. Default: \`Outline\` */
  weight?: IconWeight;
  /** Override stroke-width on stroked weights */
  strokeWidth?: number | string;
}

export type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

export declare function createIcon(
  displayName: string,
  iconData: Partial<Record<string, string>>,
): IconComponent;

export default createIcon;
`;

fs.writeFileSync(path.join(DIST, 'createIcon.d.ts'), createIconDTS);

// ── individual icon files ──────────────────────────────────────────────────
console.log('Generating icon files …');

const barrelExports = [];
const dtsExports = [];

for (const icon of icons) {
  // Build weights object literal
  const wEntries = Object.entries(icon.weights)
    .map(([k, v]) => `  ${k}: \`${escapeForJS(v)}\``)
    .join(',\n');

  const previewUri = buildPreviewDataUri(icon.weights);
  const kebab = icon.kebab;

  // ── icon .js file with Lucide-style JSDoc ──
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

  fs.writeFileSync(path.join(DIST, 'icons', `${icon.pascal}.js`), iconJS);

  // ── icon .d.ts file with Lucide-style JSDoc ──
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

  fs.writeFileSync(path.join(DIST, 'icons', `${icon.pascal}.d.ts`), iconDTS);

  barrelExports.push(`export { ${icon.pascal} } from './icons/${icon.pascal}.js';`);
  dtsExports.push(`export { ${icon.pascal} } from './icons/${icon.pascal}.js';`);
}

// ── index.js (ESM barrel) ──────────────────────────────────────────────────
const indexJS = `// Auto-generated barrel — do not edit
export { createIcon } from './createIcon.js';

${barrelExports.join('\n')}
`;

fs.writeFileSync(path.join(DIST, 'index.js'), indexJS);

// ── index.d.ts ─────────────────────────────────────────────────────────────
const indexDTS = `// Auto-generated — do not edit
export { createIcon, IconProps, IconWeight, IconComponent } from './createIcon';

${dtsExports.join('\n')}
`;

fs.writeFileSync(path.join(DIST, 'index.d.ts'), indexDTS);

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
const readme = `# Reicon

React icon components for **${icons.length}+** icons in **2 weights** (Outline & Filled) — tree-shakeable, TypeScript-ready, zero config.

## Install

\`\`\`bash
npm i reicon-react
\`\`\`

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
| \`size\` | \`number \\| string\` | \`24\` | Icon size (number = px) |
| \`color\` | \`string\` | \`currentColor\` | Primary icon color |
| \`secondaryColor\` | \`string\` | same as color | Secondary color |
| \`weight\` | \`IconWeight\` | \`Outline\` | Icon weight / style |
| \`strokeWidth\` | \`number \\| string\` | — | Override stroke width |
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

## Icon Names

Icons use PascalCase names derived from their kebab-case originals:

| Original | Import |
|----------|--------|
| \`home\` | \`Home\` |
| \`shield-check\` | \`ShieldCheck\` |
| \`alt-arrow-down\` | \`AltArrowDown\` |
| \`shopping-cart\` | \`ShoppingCart\` |

## TypeScript

Full TypeScript support out of the box:

\`\`\`tsx
import { Home, IconProps, IconWeight } from 'reicon-react';

const weight: IconWeight = 'Filled';
const props: IconProps = { size: 32, color: '#d97757', weight };

<Home {...props} />
\`\`\`

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
const totalFiles = (icons.length * 2) + 5; // icons .js + .d.ts + createIcon.js/d.ts + index.js/d.ts + package.json
console.log(`\nDone!`);
console.log(`  Icons:       ${icons.length}`);
console.log(`  Weights:     Outline + Filled`);
console.log(`  Files:       ${totalFiles}`);
console.log(`  Output:      ${DIST}`);
console.log(`\nTo publish:`);
console.log(`  cd dist && npm publish --access public`);
