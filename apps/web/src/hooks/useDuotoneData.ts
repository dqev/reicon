import { useState, useEffect } from 'react';

export interface DuotoneIconInfo {
  code: string;
  category?: string;
  description?: string[];
}

let duotoneCache: Record<string, DuotoneIconInfo> | null = null;
let duotonePromise: Promise<Record<string, DuotoneIconInfo>> | null = null;

export function useDuotoneData(activeStyle: string) {
  const [duotoneMap, setDuotoneMap] = useState<Record<string, DuotoneIconInfo> | null>(duotoneCache);
  const [loading, setLoading] = useState(activeStyle === 'Duotone' && !duotoneCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeStyle !== 'Duotone') return;
    if (duotoneCache) {
      setDuotoneMap(duotoneCache);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    if (!duotonePromise) {
      duotonePromise = import('@data/icon-duotone.json').then((module) => {
        const rawIcons = (module.default as any)?.icons || {};
        const parsed: Record<string, DuotoneIconInfo> = {};
        for (const [key, val] of Object.entries(rawIcons)) {
          parsed[key] = {
            code: (val as any).code || '',
            category: (val as any).category,
            description: (val as any).description,
          };
        }
        duotoneCache = parsed;
        return parsed;
      });
    }

    duotonePromise
      .then((map) => {
        if (!cancelled) {
          setDuotoneMap(map);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message || 'Failed to load duotone icons');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeStyle]);

  return { duotoneMap, loading, error };
}
