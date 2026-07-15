import type { IconEntry, IconIndex, IconWeight } from './types.js';

const W_KEYS: IconWeight[] = ['Outline', 'Filled'];

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function stripSvgWrapper(code: string): string {
  if (!code) return '';
  return code.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
}

function rewriteColors(svg: string): string {
  return svg.replace(/fill="white"/g, 'fill="currentColor"');
}

function generateTags(name: string, description: string[]): string[] {
  const tags = new Set<string>();

  for (const t of description) tags.add(t);

  const parts = name.split('-');
  for (const part of parts) {
    if (part.length > 1) tags.add(part);
  }

  return [...tags];
}

export function buildIconIndex(data: {
  categories?: Record<string, { icons?: Record<string, { description?: string[]; weights?: Record<string, { code?: string }> }> }>;
}): IconIndex {
  const icons: IconEntry[] = [];
  const categorySet = new Set<string>();
  const pascalLowerSet = new Set<string>();

  for (const [catKey, catData] of Object.entries(data.categories || {})) {
    categorySet.add(catKey);

    for (const [iconKey, icon] of Object.entries(catData.icons || {})) {
      let pascal = toPascalCase(iconKey);

      if (pascalLowerSet.has(pascal.toLowerCase())) {
        pascal += toPascalCase(catKey);
      }
      pascalLowerSet.add(pascal.toLowerCase());

      const weights: IconEntry['weights'] = {};

      for (const wName of W_KEYS) {
        const wData = icon.weights?.[wName];
        if (wData?.code) {
          weights[wName] = {
            code: rewriteColors(stripSvgWrapper(wData.code)),
            viewBox: '0 0 24 24',
          };
        }
      }

      if (Object.keys(weights).length > 0) {
        icons.push({
          name: iconKey,
          pascal,
          category: catKey,
          tags: generateTags(iconKey, icon.description || []),
          weights,
        });
      }
    }
  }

  icons.sort((a, b) => a.name.localeCompare(b.name));

  return {
    icons,
    categories: [...categorySet].sort(),
  };
}
