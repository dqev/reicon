#!/usr/bin/env node
/**
 * Generates public/llms-icons.txt
 * containing all icon mappings for AI agents & LLMs.
 * Run during build time via `npm run build`.
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ICON_NAMES_JSON = resolve(__dirname, 'icon-names.json');
const CATS_JSON = resolve(__dirname, '../data/icons-names-categories.json');
const FILE_ICONS_JSON = resolve(__dirname, '../data/file-icons.json');
const OUTPUT_FILE = resolve(__dirname, '../apps/web/public/llms-icons.txt');
const FILE_OUTPUT_FILE = resolve(__dirname, '../apps/web/public/llms-file-icons.txt');

function toPascalCase(str) {
  return str
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function generateIcons() {
  console.log('Generating LLM Icon Directory...');

  if (!existsSync(ICON_NAMES_JSON) || !existsSync(CATS_JSON)) {
    return;
  }

  const iconNames = JSON.parse(readFileSync(ICON_NAMES_JSON, 'utf-8'));
  const catsData = JSON.parse(readFileSync(CATS_JSON, 'utf-8'));

  const categoryMap = {};
  for (const entry of catsData) {
    if (entry.name && entry.category) {
      categoryMap[entry.name] = entry.category;
    }
  }

  const grouped = {};
  let totalCount = 0;

  for (const [kebab, pascal] of Object.entries(iconNames)) {
    const category = categoryMap[kebab] || 'general';
    const normalizedCategory = category.toLowerCase().trim();

    if (!grouped[normalizedCategory]) {
      grouped[normalizedCategory] = [];
    }

    grouped[normalizedCategory].push({ kebab, pascal });
    totalCount++;
  }

  const sections = [];
  const sortedCategories = Object.keys(grouped).sort();

  for (const cat of sortedCategories) {
    const items = grouped[cat];
    items.sort((a, b) => a.kebab.localeCompare(b.kebab));

    const formattedCatName = cat.charAt(0).toUpperCase() + cat.slice(1);
    const lines = [`### ${formattedCatName}`];

    for (const item of items) {
      lines.push(`- ${item.kebab} -> ${item.pascal}`);
    }

    sections.push(lines.join('\n'));
  }

  const output = `# Reicon - Complete Icon Names & Component Mapping

This file lists every icon in the Reicon SVG icon library by category. Use it to look up the correct import name (PascalCase) or CDN attribute value (kebab-case) for any icon.

**Quick lookup**: Find the icon's kebab-case name below, then:
- **Components** (React/Vue/Svelte): convert to PascalCase (\`arrow-up-right\` → \`ArrowUpRight\`)
- **CDN**: use the kebab-case name as-is: \`<re-icon icon="arrow-up-right">\`

## Stats
- **Total**: ${totalCount} unique designs (${totalCount * 2} icons counting both weights)
- **Weights**: "Outline" (default) | "Filled"
- **Grid**: 24×24 px

---

## Icon Directory by Category

${sections.join('\n\n')}
`;

  writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`Successfully generated LLM Icon Directory containing ${totalCount} mappings to ${OUTPUT_FILE}`);
}

function generateFileIcons() {
  console.log('Generating LLM File Icon Directory...');

  if (!existsSync(FILE_ICONS_JSON)) {
    return;
  }

  const data = JSON.parse(readFileSync(FILE_ICONS_JSON, 'utf-8'));
  const sourceIcons = Array.isArray(data.icons) ? data.icons : [];
  const pascalLowerSet = new Set();
  const items = [];

  for (const icon of sourceIcons) {
    const kebab = String(icon.name || '').trim();
    const path = String(icon.path || '').trim();
    if (!kebab || !path) continue;

    let pascal = toPascalCase(kebab);
    if (/^[0-9]/.test(pascal)) pascal = 'Icon' + pascal;
    if (pascalLowerSet.has(pascal.toLowerCase())) pascal += 'File';
    pascalLowerSet.add(pascal.toLowerCase());

    items.push({ kebab, pascal });
  }

  items.sort((a, b) => a.kebab.localeCompare(b.kebab));

  const output = `# Reicon File Icons - Complete Names & Import Mapping

This file lists every icon in the Reicon file icon set. Use it to look up the correct import name (PascalCase) or CDN attribute value (kebab-case).

**Quick lookup**: Find the icon's kebab-case name below, then:
- **Package**: import the PascalCase name from \`reicon-file\`
- **CDN**: use the kebab-case name as-is: \`<re-file icon="github">\`

## Stats
- **Total**: ${items.length} file icons
- **Grid**: 1024×1024 px
- **Styles**: Single color, filled paths

---

## File Icon Directory

${items.map((item) => `- ${item.kebab} -> ${item.pascal}`).join('\n')}
`;

  writeFileSync(FILE_OUTPUT_FILE, output, 'utf-8');
  console.log(`Successfully generated LLM File Icon Directory containing ${items.length} mappings to ${FILE_OUTPUT_FILE}`);
}

generateIcons();
generateFileIcons();
