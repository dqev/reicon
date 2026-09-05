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
const OUTPUT_FILE = resolve(__dirname, '../public/llms-icons.txt');

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

  const output = `# Reicon — Complete Icon Names & Component Mapping

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

generateIcons();
