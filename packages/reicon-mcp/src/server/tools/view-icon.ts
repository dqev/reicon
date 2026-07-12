import { buildSvgMarkup } from '../../core/codegen.js';
import { loadIndex } from '../../core/load-index.js';
import { findIcon } from '../../core/search.js';
import type { IconWeight } from '../../core/types.js';

export function handleViewIcon(args: { name: string; weight: IconWeight }) {
  const index = loadIndex();
  const icon = findIcon(index, args.name);
  if (!icon) {
    // Try a soft match in case casing or dashes differ
    const lower = args.name.toLowerCase().replace(/\s+/g, '-');
    const match = index.icons.find(
      (i) => i.name.toLowerCase() === lower || i.pascal.toLowerCase() === lower.replace(/-/g, ''),
    );
    if (match) {
      return {
        error: `Icon "${args.name}" not found. Did you mean "${match.name}"?`,
        suggestion: match.name,
      };
    }
    return { error: `Icon "${args.name}" not found. Use search_icons to find the correct name.` };
  }

  const svg = buildSvgMarkup(icon, args.weight);
  if (typeof svg !== 'string') {
    return svg;
  }

  const weightData = icon.weights[args.weight]!;
  const availableWeights = Object.keys(icon.weights) as IconWeight[];

  return {
    name: icon.name,
    weight: args.weight,
    availableWeights,
    category: icon.category,
    tags: icon.tags,
    viewBox: weightData.viewBox,
    svg,
    hint: 'Call apply_icon with this name and weight to generate framework-specific code.',
  };
}
