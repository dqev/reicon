import { generateCode } from '../../core/codegen.js';
import { loadIndex } from '../../core/load-index.js';
import { findIcon } from '../../core/search.js';
import type { ApplyIconInput } from '../../core/types.js';

export function handleApplyIcon(args: ApplyIconInput) {
  const index = loadIndex();
  const icon = findIcon(index, args.name);
  if (!icon) {
    return { error: `Icon "${args.name}" not found.` };
  }

  return generateCode(icon, args);
}
