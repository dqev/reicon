import type { CustomSvgIcon } from '@/components/ui/CustomSvgCard';

interface FileIconItem {
  name: string;
  path: string;
}

interface FileIconsData {
  viewBox?: string;
  icons?: FileIconItem[];
}

const VIEW_BOX = '0 0 1024 1024';

let fileIconsPromise: Promise<CustomSvgIcon[]> | null = null;
let fileIconsCache: CustomSvgIcon[] | null = null;

export function toFileSvg(pathData: string, viewBox = VIEW_BOX): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="${viewBox}" fill="currentColor" aria-hidden="true"><path d="${pathData}" fill="currentColor"/></svg>`;
}

export async function loadFileIcons(): Promise<CustomSvgIcon[]> {
  if (fileIconsCache) return fileIconsCache;
  if (fileIconsPromise) return fileIconsPromise;

  fileIconsPromise = (async () => {
    const mod = await import('@data/file-icons.json');
    const data = (mod.default || mod) as FileIconsData;
    const viewBox = data.viewBox || VIEW_BOX;

    const list: CustomSvgIcon[] = (data.icons || []).map((icon) => ({
      name: icon.name,
      svg: toFileSvg(icon.path, viewBox),
    }));

    fileIconsCache = list;
    return list;
  })();

  return fileIconsPromise;
}

export function getFileStandaloneSvg(pathData: string, viewBox = VIEW_BOX): string {
  return toFileSvg(pathData, viewBox);
}
