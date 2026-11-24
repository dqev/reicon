import { loadIndex } from '../../core/load-index.js';
import { predictSemanticWords } from '../../core/predictor.js';
import { searchIcons } from '../../core/search.js';
import type { IconWeight } from '../../core/types.js';

export async function handleSearchIcons(args: {
  query: string;
  weight?: IconWeight;
  limit?: number;
}) {
  const index = loadIndex();
  const predictions = await predictSemanticWords(args.query, 8);
  return searchIcons(index, args.query, {
    weight: args.weight,
    limit: args.limit,
    predictions,
  });
}
