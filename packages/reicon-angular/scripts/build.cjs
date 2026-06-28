#!/usr/bin/env node
/**
 * build.cjs — Generates the `reicon-angular` source components from icondata.json
 *
 * Usage:  node packages/reicon-angular/scripts/build.cjs  (or: npm run build:angular)
 *
 * Output (src/):
 *   public-api.ts      Library entry point
 *   icons/<Name>.ts    One Angular standalone component per icon
 */

const fs = require('fs');
const path = require('path');

// ── paths ──────────────────────────────────────────────────────────────────
const DATA_PATH = path.join(__dirname, '..', '..', '..', 'data', 'icon-data.json');
const TAGS_PATH = path.join(__dirname, '..', '..', '..', 'data', 'icon-tags.json');
const SRC = path.join(__dirname, '..', 'src');

// ── weight short keys ──────────────────────────────────────────────────────
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
function rewriteColors(svg) {
  return svg.replace(/fill="white"/g, 'fill="currentColor"');
}

function escapeForJS(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\n/g, ' ').replace(/\s+/g, ' ').replace(/\$\{/g, '\\${');
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
fs.rmSync(SRC, { recursive: true, force: true });
fs.mkdirSync(path.join(SRC, 'icons'), { recursive: true });

// ── individual icon files ──────────────────────────────────────────────────
console.log('Generating Angular icon files …');

const apiExports = [];

for (const icon of icons) {
  const wEntries = Object.entries(icon.weights)
    .map(([k, v]) => `    ${k}: \`${escapeForJS(v)}\``)
    .join(',\n');

  const kebab = icon.kebab;
  const selector = `reicon-${kebab}`;

  // ── icon .ts file ──
  const iconTS = `import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: '${selector}',
  standalone: true,
  template: \`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      [style.color]="color"
      [innerHTML]="safeHtml"
    ></svg>
  \`,
  styles: [\`
    :host {
      display: inline-block;
      line-height: 0;
    }
  \`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${icon.pascal} {
  @Input() size: number | string = 24;
  @Input() color: string = 'currentColor';
  @Input() weight: 'Outline' | 'Filled' = 'Outline';
  @Input() strokeWidth?: number | string;

  private sanitizer = inject(DomSanitizer);

  private iconData: { [key: string]: string } = {
${wEntries}
  };

  get safeHtml(): SafeHtml {
    const W_MAP = { Filled: 'F', Outline: 'O' };
    const key = W_MAP[this.weight] || 'O';
    let html = this.iconData[key] || this.iconData[Object.keys(this.iconData)[0]] || '';
    if (this.strokeWidth != null) {
      html = html.replace(/stroke-width="[^"]*"/g, 'stroke-width="' + this.strokeWidth + '"');
    }
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
`;

  fs.writeFileSync(path.join(SRC, 'icons', `${icon.pascal}.ts`), iconTS);
  apiExports.push(`export * from './icons/${icon.pascal}';`);
}

// ── public-api.ts ──────────────────────────────────────────────────────────
const publicAPI = `/*
 * Public API Surface of reicon-angular
 */

${apiExports.join('\n')}
`;

fs.writeFileSync(path.join(SRC, 'public-api.ts'), publicAPI);

// ── README.md ──────────────────────────────────────────────────────────────
const readme = `# Reicon Angular

Angular icon components for **${icons.length}+** icons in **2 weights** (Outline & Filled) — tree-shakeable, TypeScript-ready, zero config.

## Install

\`\`\`bash
npm i reicon-angular
# or
bun add reicon-angular
\`\`\`

## Usage

First, add the components to your standalone component imports:

\`\`\`typescript
import { Component } from '@angular/core';
import { Home, ShieldCheck, AltArrowDown } from 'reicon-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home, ShieldCheck, AltArrowDown],
  template: \`
    <reicon-home></reicon-home>
    <reicon-shield-check [size]="32" color="#d97757"></reicon-shield-check>
    <reicon-alt-arrow-down weight="Filled"></reicon-alt-arrow-down>
  \`
})
export class AppComponent {}
\`\`\`

### Inputs

| Input | Type | Default | Description |
|------|------|---------|-------------|
| \`size\` | \`number | string\` | \`24\` | Icon size (number = px) |
| \`color\` | \`string\` | \`currentColor\` | Primary icon color |
| \`weight\` | \`'Outline' | 'Filled'\` | \`Outline\` | Icon weight / style |
| \`strokeWidth\` | \`number | string\` | — | Override stroke width |

### Styling

Standard Angular 'class' and 'style' bindings work natively directly on the host element:

\`\`\`html
<reicon-home class="my-icon-class" [style.margin-left.px]="8"></reicon-home>
\`\`\`

### Weights

- **Outline** — clean outlined style (default)
- **Filled** — solid filled style

\`\`\`html
<reicon-home></reicon-home>                          <!-- Outline (default) -->
<reicon-home weight="Filled"></reicon-home>          <!-- Filled -->
<reicon-home weight="Filled" color="red"></reicon-home>
\`\`\`

## Icon Names

Icons use PascalCase class names derived from their kebab-case originals:

| Original | Class Component | Selector |
|----------|-----------------|----------|
| \`home\` | \`Home\` | \`reicon-home\` |
| \`shield-check\` | \`ShieldCheck\` | \`reicon-shield-check\` |
| \`alt-arrow-down\` | \`AltArrowDown\` | \`reicon-alt-arrow-down\` |

## License

MIT © [devchauhan](https://devchauhan.in)
`;

fs.writeFileSync(path.join(__dirname, '..', 'README.md'), readme);

console.log('\nAngular source components successfully generated.');
