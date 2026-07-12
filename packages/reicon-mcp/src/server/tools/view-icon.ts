import { buildSvgMarkup } from '../../core/codegen.js';
import { loadIndex } from '../../core/load-index.js';
import { findIcon } from '../../core/search.js';
import type { IconWeight } from '../../core/types.js';

export function handleViewIcon(args: { name: string; weight: IconWeight }) {
  const index = loadIndex();
  const icon = findIcon(index, args.name);
  if (!icon) {
    return { error: `Icon "${args.name}" not found.` };
  }

  const svg = buildSvgMarkup(icon, args.weight);
  if (typeof svg !== 'string') {
    return svg;
  }

  const weightData = icon.weights[args.weight]!;

  return {
    svg,
    viewBox: weightData.viewBox,
    tags: icon.tags,
    category: icon.category,
  };
}
