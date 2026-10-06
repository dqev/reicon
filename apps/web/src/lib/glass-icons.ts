import type { CustomSvgIcon } from '@/components/ui/CustomSvgCard';
import { getGlassSvg as getCachedGlassSvg } from '@/utils/glassCache';

interface GlassIconItem extends CustomSvgIcon {
  rawCode: string;
  category: string;
}

let glassIconsPromise: Promise<CustomSvgIcon[]> | null = null;
let glassIconsCache: CustomSvgIcon[] | null = null;
let glassDetailMap: Map<string, GlassIconItem> | null = null;

/**
 * Loads filled.json metadata instantaneously in <5ms without blocking the UI.
 * Does NOT convert all SVGs synchronously at once; icons convert lazily on-demand.
 */
export async function loadGlassIcons(): Promise<CustomSvgIcon[]> {
  if (glassIconsCache) return glassIconsCache;
  if (glassIconsPromise) return glassIconsPromise;

  glassIconsPromise = (async () => {
    const mod = await import('@data/filled.json');
    const data = (mod.default || mod) as {
      categories: Record<string, Record<string, { code: string; tags?: string[] }>>;
    };

    const list: CustomSvgIcon[] = [];
    const detailMap = new Map<string, GlassIconItem>();

    const categories = data.categories || {};
    for (const [catName, icons] of Object.entries(categories)) {
      for (const [iconName, iconData] of Object.entries(icons)) {
        const rawCode = iconData.code;
        const tags = Array.isArray(iconData.tags) ? iconData.tags.join(' ') : (iconData.tags || '');

        const item: GlassIconItem = {
          name: iconName,
          category: catName,
          rawCode,
          tags,
        };

        list.push(item);

        detailMap.set(iconName.toLowerCase(), item);
      }
    }

    glassIconsCache = list;
    glassDetailMap = detailMap;
    return list;
  })();

  return glassIconsPromise;
}

/**
 * Lazily converts an individual icon's raw filled markup into a glass SVG on-demand.
 * Uses deterministic stable IDs and in-memory LRU cache to avoid GPU shader re-compilation lag.
 */
function getGlassSvg(rawCode: string, name: string, size: number | string = 240, color?: string): string {
  const numSize = typeof size === 'number' ? size : 240;
  return getCachedGlassSvg(rawCode, name, color, numSize);
}

/**
 * Generates a self-contained standalone glass SVG with deterministic IDs for download & copy.
 */
export function getGlassStandaloneSvg(rawCode: string, name: string, size = 240, color?: string): string {
  return getCachedGlassSvg(rawCode, name, color, size);
}

async function getGlassIconDetail(name: string): Promise<GlassIconItem | null> {
  if (!glassDetailMap) {
    await loadGlassIcons();
  }
  const clean = decodeURIComponent(name).trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const [k, v] of (glassDetailMap?.entries() || [])) {
    if (k.replace(/[^a-z0-9]/g, '') === clean) {
      return v;
    }
  }
  return null;
}
