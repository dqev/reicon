#!/usr/bin/env node
/**
 * build.cjs — Generates the `reicon-vue` Vue 3 package from icondata.json
 *
 * Usage:  node packages/reicon-vue/scripts/build.cjs  (or: npm run build:vue)
 *
 * Output (dist/):
 *   package.json, README.md
 *   index.js          ESM barrel — named exports for every icon
 *   index.d.ts        TypeScript declarations
 *   createIcon.js     Internal Vue defineComponent factory
 *   createIcon.d.ts
 *   icons/<Name>.js   One ESM file per icon (tree-shakeable)
 *   icons/<Name>.d.ts TypeScript declaration per icon
 *
 * Weights: Outline (O) and Filled (F)
 * Each icon file includes JSDoc with @preview (inline SVG).
 */

const fs = require('fs');
const path = require('path');

// ── paths ──────────────────────────────────────────────────────────────────
const DATA_PATH = path.join(__dirname, '..', '..', '..', 'data', 'icon-data.json');
const TAGS_PATH = path.join(__dirname, '..', '..', '..', 'data', 'icon-tags.json');
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

// ── clean & prepare dist ───────────────────────────────────────────────────
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'icons'), { recursive: true });

// ── createIcon.js (ESM, Vue 3) ────────────────────────────────────────────
const createIconJS = `import { defineComponent, h, computed } from 'vue';

const W_MAP = { Filled: 'F', Outline: 'O' };

/**
 * Factory that builds a Vue 3 icon component.
 * @param {string} displayName  PascalCase icon name
 * @param {Object} iconData     { F?: string, O?: string }
 * @returns {import('vue').DefineComponent}
 */
const createIcon = (displayName, iconData) => {
  return defineComponent({
    name: displayName,
    inheritAttrs: false,
    props: {
      /** Primary icon color. Default: \`currentColor\` */
      color: { type: String, default: 'currentColor' },
      /** Icon size (number = px, string = any CSS unit). Default: \`24\` */
      size: { type: [Number, String], default: 24 },
      /** Icon weight / style: \`'Outline'\` | \`'Filled'\`. Default: \`'Outline'\` */
      weight: {
        type: String,
        default: 'Outline',
        validator: (v) => ['Outline', 'Filled'].includes(v),
      },
      /** Override stroke-width on stroked weights */
      strokeWidth: { type: [Number, String], default: undefined },
    },
    setup(props, { attrs }) {
      const svgHtml = computed(() => {
        const key = W_MAP[props.weight] || 'O';
        let html = iconData[key] || iconData[Object.keys(iconData)[0]] || '';
        if (props.strokeWidth != null) {
          html = html.replace(/stroke-width="[^"]*"/g, 'stroke-width="' + props.strokeWidth + '"');
        }
        return html;
      });

      return () => {
        // Separate class/style from other attrs to avoid duplication
        const { class: userClass, style: userStyle, ...restAttrs } = attrs;

        return h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: props.size,
          height: props.size,
          viewBox: '0 0 24 24',
          fill: 'none',
          // Use array syntax so Vue correctly normalises string, array, and object class bindings
          class: ['reicon', userClass],
          style: [{ color: props.color }, userStyle],
          innerHTML: svgHtml.value,
          ...restAttrs,
        });
      };
    },
  });
};

export { createIcon };
export default createIcon;
`;

fs.writeFileSync(path.join(DIST, 'createIcon.js'), createIconJS);

// ── createIcon.d.ts ────────────────────────────────────────────────────────
const createIconDTS = `import { DefineComponent, ExtractPropTypes } from 'vue';

export type IconWeight = 'Filled' | 'Outline';

export declare const iconProps: {
  color: { type: StringConstructor; default: 'currentColor' };
  size: { type: (NumberConstructor | StringConstructor)[]; default: 24 };
  weight: { type: StringConstructor; default: 'Outline'; validator: (v: string) => boolean };
  strokeWidth: { type: (NumberConstructor | StringConstructor)[]; default: undefined };
};

export type IconProps = Partial<ExtractPropTypes<typeof iconProps>>;

export type IconComponent = DefineComponent<{
  /** Primary color. Default: \`currentColor\` */
  color?: string;
  /** Icon size (px when number). Default: \`24\` */
  size?: number | string;
  /** Icon weight / style. Default: \`Outline\` */
  weight?: IconWeight;
  /** Override stroke-width on stroked weights */
  strokeWidth?: number | string;
}>;

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

  fs.writeFileSync(path.join(DIST, 'icons', `${icon.pascal}.js`), iconJS);

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
    vue: '>=3.2.0',
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
# or
bun add reicon-vue
\`\`\`

## Usage

\`\`\`vue
<script setup>
import { Home, ShieldCheck, AltArrowDown } from 'reicon-vue';
</script>

<template>
  <Home />
  <ShieldCheck :size="32" color="#d97757" />
  <AltArrowDown weight="Filled" />
</template>
\`\`\`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`size\` | \`number \\| string\` | \`24\` | Icon size (number = px, string = any CSS unit) |
| \`color\` | \`string\` | \`currentColor\` | Primary icon color |
| \`weight\` | \`'Outline' \\| 'Filled'\` | \`Outline\` | Icon weight / style |
| \`strokeWidth\` | \`number \\| string\` | — | Override stroke width |

Plus all standard SVG/HTML attributes via \`v-bind\`.

### Weights

- **Outline** — clean outlined style (default)
- **Filled** — solid filled style

\`\`\`vue
<template>
  <Home />                              <!-- Outline (default) -->
  <Home weight="Filled" />              <!-- Filled -->
  <Home weight="Filled" color="red" />
</template>
\`\`\`

### Direct icon import (smallest bundle)

\`\`\`js
import Home from 'reicon-vue/icons/Home';
\`\`\`

### Styling with classes

\`\`\`vue
<template>
  <!-- class is automatically merged with the base 'reicon' class -->
  <Home class="my-icon" />

  <!-- inline style is merged too -->
  <Home :style="{ marginRight: '8px' }" />

  <!-- all native SVG attrs are passed through -->
  <Home @click="handleClick" aria-label="Home icon" />
</template>
\`\`\`

### Dynamic icons

\`\`\`vue
<script setup>
import { Home, Settings, User } from 'reicon-vue';
import { shallowRef } from 'vue';

const currentIcon = shallowRef(Home);
</script>

<template>
  <component :is="currentIcon" :size="32" />
</template>
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

\`\`\`vue
<script setup lang="ts">
import { Home } from 'reicon-vue';
import type { IconWeight } from 'reicon-vue';

const weight: IconWeight = 'Filled';
</script>

<template>
  <Home :size="32" color="#d97757" :weight="weight" />
</template>
\`\`\`

## Nuxt

Works out of the box with Nuxt 3 — just import and use:

\`\`\`vue
<script setup>
import { Home } from 'reicon-vue';
</script>

<template>
  <Home :size="24" />
</template>
\`\`\`

## License

MIT © [devchauhan](https://devchauhan.in)
`;

fs.writeFileSync(path.join(DIST, 'README.md'), readme);

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
