interface SearchIndexEntry {
  n: string;
  c: string;
  t: string[];
}

interface IconData {
  searchIndex: SearchIndexEntry[];
  iconNames: Record<string, string>;
}

let cache: IconData | null = null;

export async function loadIconData(): Promise<IconData> {
  if (cache) return cache;

  const [searchIndexModule, iconNamesModule] = await Promise.all([
    import('../data/search-index.json'),
    import('@scripts/icon-names.json'),
  ]);

  cache = {
    searchIndex: searchIndexModule.default as SearchIndexEntry[],
    iconNames: iconNamesModule.default as Record<string, string>,
  };
  return cache;
}
