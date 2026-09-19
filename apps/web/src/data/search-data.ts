import searchIndex from './search-index.json';
import { executeSearch, type SearchIndexEntry, type SearchResult } from '../utils/search';

export type { SearchIndexEntry, SearchResult };

const index: SearchIndexEntry[] = searchIndex as SearchIndexEntry[];

export function getSearchIndex(): SearchIndexEntry[] {
  return index;
}

export function searchIcons(
  query: string,
  options: { limit?: number; category?: string } = {},
): SearchResult[] {
  return executeSearch(query, index, options);
}
