import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import type { IconIndex } from './types.js';

let cached: IconIndex | null = null;

function resolveIndexPath(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    join(here, '..', 'data', 'icon-index.json'),
    join(here, '..', '..', 'src', 'data', 'icon-index.json'),
  ];
  for (const p of candidates) {
    try {
      readFileSync(p, 'utf-8');
      return p;
    } catch {
      continue;
    }
  }
  throw new Error('icon-index.json not found. Run npm run build:mcp first.');
}

export function loadIndex(): IconIndex {
  if (cached) return cached;
  const path = resolveIndexPath();
  cached = JSON.parse(readFileSync(path, 'utf-8')) as IconIndex;
  return cached;
}
