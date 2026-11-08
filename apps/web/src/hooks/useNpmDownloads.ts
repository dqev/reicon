import { useEffect, useState } from 'react';

export const NPM_PACKAGE = 'reicon-react';

export interface NpmDownloads {
  total: number | null;
  weekly: number | null;
}

const EMPTY: NpmDownloads = { total: null, weekly: null };

let cached: NpmDownloads | null = null;
let inFlight: Promise<NpmDownloads> | null = null;

export function formatCount(n: number): string {
  return n.toLocaleString('en-US');
}

async function fetchDownloads(): Promise<NpmDownloads> {
  const today = new Date().toISOString().slice(0, 10);

  const [totalData, weeklyData] = await Promise.all([
    fetch(`https://api.npmjs.org/downloads/point/2015-01-01:${today}/${NPM_PACKAGE}`).then((res) => {
      if (!res.ok) throw new Error('total fetch failed');
      return res.json();
    }),
    fetch(`https://api.npmjs.org/downloads/point/last-week/${NPM_PACKAGE}`).then((res) => {
      if (!res.ok) throw new Error('weekly fetch failed');
      return res.json();
    }),
  ]);

  return {
    total: typeof totalData?.downloads === 'number' ? totalData.downloads : null,
    weekly: typeof weeklyData?.downloads === 'number' ? weeklyData.downloads : null,
  };
}

function getDownloads(): Promise<NpmDownloads> {
  if (cached) return Promise.resolve(cached);
  if (!inFlight) {
    inFlight = fetchDownloads()
      .then((stats) => {
        cached = stats;
        return stats;
      })
      .catch(() => EMPTY)
      .finally(() => {
        inFlight = null;
      });
  }
  return inFlight;
}

export function useNpmDownloads(): NpmDownloads {
  const [stats, setStats] = useState<NpmDownloads>(() => cached ?? EMPTY);

  useEffect(() => {
    let active = true;
    getDownloads().then((next) => {
      if (active) setStats(next);
    });
    return () => {
      active = false;
    };
  }, []);

  return stats;
}
