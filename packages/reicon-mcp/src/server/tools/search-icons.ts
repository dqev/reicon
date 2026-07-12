import { loadIndex } from '../../core/load-index.js';
import { searchIcons } from '../../core/search.js';
import type { IconWeight } from '../../core/types.js';

export function handleSearchIcons(args: {
  query: string;
  weight?: IconWeight;
  limit?: number;
}) {
  const index = loadIndex();
  return searchIcons(index, args.query, {
    weight: args.weight,
    limit: args.limit,
  });
}
