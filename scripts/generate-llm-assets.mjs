#!/usr/bin/env node
/**
 * Generates public/llms-icons.txt containing all icon mappings grouped by category.
 * Run during build time via `npm run build`.
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ICON_NAMES_JSON = resolve(__dirname, 'icon-names.json');
const CATS_JSON = resolve(__dirname, '../data/icons-names-categories.json');
const OUTPUT_FILE = resolve(__dirname, '../public/llms-icons.txt');

function generate() {
  console.log('Generating LLM Icon Directory...');

  if (!existsSync(ICON_NAMES_JSON)) {
    console.error(`Error: ${ICON_NAMES_JSON} not found`);
    process.exit(1);
  }

  if (!existsSync(CATS_JSON)) {
    console.error(`Error: ${CATS_JSON} not found`);
    process.exit(1);
  }

  const iconNames = JSON.parse(readFileSync(ICON_NAMES_JSON, 'utf-8'));
  const catsData = JSON.parse(readFileSync(CATS_JSON, 'utf-8'));

  // Create a mapping of kebab-case name -> category
  const categoryMap = {};
  for (const entry of catsData) {
    if (entry.name && entry.category) {
      categoryMap[entry.name] = entry.category;
    }
  }

  // Group icons by category
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

  // Format categories and icons as markdown
  const sections = [];

  // Sort category keys alphabetically
  const sortedCategories = Object.keys(grouped).sort();

  for (const cat of sortedCategories) {
    const items = grouped[cat];
    // Sort icons within category alphabetically by kebab case name
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
- **PascalCase rule**: split on \`-\`, capitalize each part, join

## Framework Quick Reference

### React — \`reicon-react\`
\`\`\`jsx
import { ArrowUpRight } from 'reicon-react';
<ArrowUpRight size={24} weight="Outline" color="currentColor" />
\`\`\`

### Vue 3 — \`reicon-vue\`
\`\`\`vue
<script setup>
import { ArrowUpRight } from 'reicon-vue';
</script>
<template>
  <ArrowUpRight :size="24" weight="Outline" />
</template>
\`\`\`

### Svelte — \`reicon-svelte\`
\`\`\`svelte
<script>
  import { ArrowUpRight } from 'reicon-svelte';
</script>
<ArrowUpRight size={24} weight="Outline" />
\`\`\`

### CDN / HTML
\`\`\`html
<script src="https://unpkg.com/reicon/cdn/reicon.js"></script>
<re-icon icon="arrow-up-right" weight="outline" size="24"></re-icon>
\`\`\`

---

## Icon Directory by Category

${sections.join('\n\n')}
`;

  writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`Successfully generated LLM Icon Directory containing ${totalCount} mappings to ${OUTPUT_FILE}`);
}

generate();
