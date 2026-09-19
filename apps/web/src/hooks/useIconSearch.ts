import { useMemo } from 'react';
import { searchIcons, type SearchResult } from '@/data/search-data';

export function useIconSearch(query: string, limit = 24): SearchResult[] {
  return useMemo(() => {
    if (!query.trim()) return [];
    return searchIcons(query, { limit });
  }, [query, limit]);
}

