import { useMemo, useDeferredValue } from 'react';
import { searchIcons, type SearchResult } from '@/data/search-data';

export function useIconSearch(query: string, limit = 24): SearchResult[] {
  const deferredQuery = useDeferredValue(query);

  return useMemo(() => {
    if (!deferredQuery.trim()) return [];
    return searchIcons(deferredQuery, { limit });
  }, [deferredQuery, limit]);
}
