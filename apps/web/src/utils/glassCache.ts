import Glass from '../vendor/glass/glass.js';

const cache = new Map<string, string>();
const MAX_CACHE = 1000;

function normalizeColor(color: string | undefined): string {
  if (color && /^#[0-9a-fA-F]{3,8}$/.test(color)) return color;
  return '#9B8AFB';
}

function hashStr(s: string): string {
  let h = 5381;
  const str = String(s || '');
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(36);
}

function stableId(rawCode: string, color: string, size: number | string): string {
  const c = color.replace('#', '');
  return `g${hashStr(rawCode)}_${c}_${size}`;
}

/**
 * In-Memory LRU Cache with Deterministic Stable IDs for Glass icons.
 * Never runs SVG conversion or filter generation inside unmemoized render loops.
 * Key format: `${codeHash}|${color}|${size}`
 */
export function getGlassSvg(
  rawCode: string,
  _kebab: string = '',
  arg3?: string | number,
  arg4?: number | string
): string {
  if (!rawCode) return '';
  let color = '#9B8AFB';
  let size = 240;

  if (typeof arg3 === 'number') {
    size = arg3;
    if (typeof arg4 === 'string') color = arg4;
  } else if (typeof arg3 === 'string') {
    color = arg3;
    if (typeof arg4 === 'number') size = arg4;
    else if (typeof arg4 === 'string' && !isNaN(Number(arg4))) size = Number(arg4);
  }

  const safeColor = normalizeColor(color);
  const codeHash = hashStr(rawCode);
  const key = `${codeHash}|${safeColor}|${size}`;

  const hit = cache.get(key);
  if (hit !== undefined) {
    // Refresh LRU order: delete & re-set places key at the most-recently-used position
    cache.delete(key);
    cache.set(key, hit);
    return hit;
  }

  // Deterministic stable ID: NEVER uses Math.random() or UUIDs,
  // which preserves browser GPU shader compilation caches.
  const id = stableId(rawCode, safeColor, size);
  const svg = Glass.convert(rawCode, {
    color: safeColor,
    size,
    id,
  });

  // LRU Eviction: delete least recently used item
  if (cache.size >= MAX_CACHE) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }

  cache.set(key, svg);
  return svg;
}

function clearGlassCache(): void {
  cache.clear();
}

let warmGen = 0;

/**
 * Idle cache warmer using requestIdleCallback running in <= 8ms time slices.
 * Pre-warms the next batch of glass icons without blocking the main 60 FPS thread.
 */
export function warmGlassCache(
  items: Array<{ code?: string; rawCode?: string; name?: string; kebab?: string }>,
  color: string | undefined = '#9B8AFB',
  size: number = 240,
  limit = 120
): void {
  if (typeof window === 'undefined' || !items || items.length === 0) return;
  const gen = ++warmGen;
  const queue = items.slice(0, limit);

  const schedule = (fn: () => void) => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(() => fn(), { timeout: 1000 });
    } else {
      setTimeout(fn, 16);
    }
  };

  const step = () => {
    if (gen !== warmGen) return;
    const start = performance.now();
    while (queue.length > 0 && performance.now() - start < 8) {
      const item = queue.shift();
      const code = item?.rawCode || item?.code;
      const kebab = item?.name || item?.kebab || '';
      if (code) {
        getGlassSvg(code, kebab, color, size);
      }
    }
    if (queue.length > 0) {
      schedule(step);
    }
  };

  schedule(step);
}
