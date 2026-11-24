import searchIndex from './search-index.json';
import { executeSearch, type SearchIndexEntry, type SearchOptions, type SearchResult } from '../utils/search';

export type { SearchResult, SearchOptions };

const index: SearchIndexEntry[] = searchIndex as SearchIndexEntry[];

function getSearchIndex(): SearchIndexEntry[] {
  return index;
}

export function searchIcons(
  query: string,
  options: SearchOptions = {},
): SearchResult[] {
  return executeSearch(query, index, options);
}
