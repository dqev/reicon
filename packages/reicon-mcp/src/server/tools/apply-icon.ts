import { generateCode } from '../../core/codegen.js';
import { loadIndex } from '../../core/load-index.js';
import { findIcon } from '../../core/search.js';
import type { ApplyIconInput } from '../../core/types.js';

export function handleApplyIcon(args: ApplyIconInput) {
  const index = loadIndex();
  const icon = findIcon(index, args.name);
  if (!icon) {
    // Soft-match: try normalized kebab-case
    const lower = args.name.toLowerCase().replace(/\s+/g, '-');
    const match = index.icons.find(
      (i) =>
        i.name.toLowerCase() === lower ||
        i.pascal.toLowerCase() === lower.replace(/-/g, ''),
    );
    if (match) {
      return {
        error: `Icon "${args.name}" not found. Did you mean "${match.name}"? Call apply_icon again with name="${match.name}".`,
        suggestion: match.name,
      };
    }
    return {
      error: `Icon "${args.name}" not found. Use search_icons to find the correct name.`,
    };
  }

  const result = generateCode(icon, args);
  if ('error' in result) return result;

  return {
    ...result,
    // Echo back key info so the agent can confirm what was applied
    meta: {
      name: icon.name,
      weight: args.weight,
      framework: args.framework,
      size: args.size ?? 24,
    },
  };
}
