#!/usr/bin/env node
/**
 * Generates public/llms-icons.txt containing all icon mappings grouped by category.
 * Run during build time.
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

  const output = `# Reicon — Icon Names & Component Mapping

This file lists all the available icons in the Reicon SVG icon library, categorized for easy lookup by AI models and code generators.

## Summary
- Canonical URL: https://reicon.dev
- Total unique designs: ${totalCount} (each design has Outline and Filled weights, totaling ${totalCount * 2} icons)
- Weights: "Outline" (default) or "Filled"

## How to Use
Use these component names when importing Reicon into React, Vue, or Svelte:

### React
\`\`\`jsx
import { [ComponentName] } from 'reicon-react';
<[ComponentName] size={24} weight="Outline" color="currentColor" />
\`\`\`

### Vue 3
\`\`\`vue
<script setup>
import { [ComponentName] } from 'reicon-vue';
</script>
<template>
  <[ComponentName] :size="24" weight="Outline" />
</template>
\`\`\`

### Svelte
\`\`\`svelte
<script>
  import { [ComponentName] } from 'reicon-svelte';
</script>
<[ComponentName] size={24} weight="Outline" />
\`\`\`

### Vanilla HTML / CDN
\`\`\`html
<script src="https://unpkg.com/reicon/cdn/reicon.min.js"></script>
<re-icon icon="[kebab-case-name]" weight="outline|filled" size="24"></re-icon>
\`\`\`

---

## Icon Directory by Category

${sections.join('\n\n')}
`;

  writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`Successfully generated LLM Icon Directory containing ${totalCount} mappings to ${OUTPUT_FILE}`);
}

generate();
