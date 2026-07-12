import { loadIndex } from '../../core/load-index.js';
import { listCategories } from '../../core/search.js';

export function handleListCategories() {
  const index = loadIndex();
  return { categories: listCategories(index) };
}
