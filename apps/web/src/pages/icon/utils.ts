export const EASE = [0.16, 1, 0.3, 1] as const;
export const EXPORT_SIZES = [16, 24, 32, 48, 64, 128, 256, 512];

export function pascalToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export async function copyToClipboard(
  text: string,
  field: string,
  setCopiedField: (f: string | null) => void,
  flashToast: (msg: string) => void
): Promise<void> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedField(field);
    flashToast('Copied to clipboard');
    setTimeout(() => setCopiedField(null), 2000);
  } catch {
    flashToast('Copy failed');
  }
}

let duotoneDataCache: Record<string, { code: string }> | null = null;
let duotoneLoadPromise: Promise<Record<string, { code: string }>> | null = null;

async function loadDuotoneData(): Promise<Record<string, { code: string }>> {
  if (duotoneDataCache) return duotoneDataCache;
  if (!duotoneLoadPromise) {
    duotoneLoadPromise = import('@data/icon-duotone.json').then((module) => {
      const icons = (module.default as any)?.icons || {};
      duotoneDataCache = icons;
      return icons;
    });
  }
  return duotoneLoadPromise;
}

export async function getSvgString(
  iconName: string,
  weight: string,
  size: number = 64
): Promise<string> {
  if (weight.toLowerCase() === 'duotone') {
    const map = await loadDuotoneData();
    const duotoneInfo = map?.[iconName];
    if (duotoneInfo?.code) {
      const innerHtml = duotoneInfo.code.replace(/fill="#[A-Fa-f0-9]{6}"/gi, 'fill="currentColor"');
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none">${innerHtml}</svg>`;
    }
  }

  const el = document.createElement('re-icon') as HTMLElement & { icon: string; weight: string; size: number };
  el.setAttribute('icon', iconName);
  el.setAttribute('weight', weight);
  el.setAttribute('size', String(size));
  el.style.position = 'absolute';
  el.style.opacity = '0';
  el.style.pointerEvents = 'none';
  document.body.appendChild(el);

  let svg: SVGElement | null = null;
  for (let i = 0; i < 10; i++) {
    await new Promise((r) => setTimeout(r, 100));
    svg = el.querySelector('svg') || el.shadowRoot?.querySelector('svg') || null;
    if (svg) break;
  }
  if (!svg) {
    const existing = document.querySelector(`re-icon[icon="${iconName}"]`);
    if (existing) svg = existing.querySelector('svg') || existing.shadowRoot?.querySelector('svg') || null;
  }

  let svgStr = '';
  if (svg) {
    const clone = svg.cloneNode(true) as SVGElement;
    clone.setAttribute('width', String(size));
    clone.setAttribute('height', String(size));
    svgStr = clone.outerHTML
      .replace(/var\(--ri-primary[^)]*\)/g, 'currentColor')
      .replace(/var\(--ri-secondary[^)]*\)/g, 'currentColor');
  }

  document.body.removeChild(el);
  return svgStr;
}

export async function copySvg(
  iconName: string,
  weight: string,
  useCustomColor: boolean,
  customColor: string,
  setCopiedField: (f: string | null) => void,
  flashToast: (msg: string) => void
): Promise<void> {
  try {
    let svgStr = await getSvgString(iconName, weight);
    if (!svgStr) { flashToast('SVG not found'); return; }
    if (useCustomColor) {
      svgStr = svgStr.replace(/currentColor/g, customColor);
    }
    await navigator.clipboard.writeText(svgStr);
    setCopiedField('svg');
    flashToast('SVG copied to clipboard');
    setTimeout(() => setCopiedField(null), 2000);
  } catch {
    flashToast('Copy failed');
  }
}

export async function downloadSvg(
  iconName: string,
  weight: string,
  exportSize: number,
  useCustomColor: boolean,
  customColor: string,
  flashToast: (msg: string) => void
): Promise<void> {
  let svgStr = await getSvgString(iconName, weight, exportSize);
  if (!svgStr) { flashToast('SVG not found'); return; }
  if (useCustomColor) {
    svgStr = svgStr.replace(/currentColor/g, customColor);
  }
  const blob = new Blob([svgStr], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${iconName}-${weight}.svg`;
  a.click();
  URL.revokeObjectURL(url);
}

async function downloadAsRaster(
  iconName: string,
  weight: string,
  size: number,
  format: 'png' | 'webp',
  exportSize: number,
  useCustomColor: boolean,
  customColor: string,
  flashToast: (msg: string) => void
): Promise<void> {
  const svgStr = await getSvgString(iconName, weight, size);
  if (!svgStr) { flashToast('SVG not found'); return; }
  const scale = 2;
  const canvas = document.createElement('canvas');
  canvas.width = size * scale;
  canvas.height = size * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const isLight = document.documentElement.classList.contains('light');
  const colorToUse = useCustomColor ? customColor : (isLight ? '#111111' : '#ffffff');
  const colored = svgStr.replace(/currentColor/g, colorToUse);
  const img = new Image();
  const svgBlob = new Blob([colored], { type: 'image/svg+xml' });
  const svgUrl = URL.createObjectURL(svgBlob);
  await new Promise<void>((resolve, reject) => {
    img.onload = () => { ctx.drawImage(img, 0, 0, size * scale, size * scale); resolve(); };
    img.onerror = reject;
    img.src = svgUrl;
  });
  URL.revokeObjectURL(svgUrl);
  const mime = format === 'png' ? 'image/png' : 'image/webp';
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${iconName}-${weight}-${size * scale}x${size * scale}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  }, mime, 1);
}

export function downloadAsPng(
  iconName: string,
  weight: string,
  exportSize: number,
  useCustomColor: boolean,
  customColor: string,
  flashToast: (msg: string) => void
): Promise<void> {
  return downloadAsRaster(iconName, weight, exportSize, 'png', exportSize, useCustomColor, customColor, flashToast);
}

export function downloadAsWebp(
  iconName: string,
  weight: string,
  exportSize: number,
  useCustomColor: boolean,
  customColor: string,
  flashToast: (msg: string) => void
): Promise<void> {
  return downloadAsRaster(iconName, weight, exportSize, 'webp', exportSize, useCustomColor, customColor, flashToast);
}

export function getDownloadUrl(iconName: string, weight: string, format: string, exportSize: number, color?: string): string {
  const params = new URLSearchParams({ icon: iconName, weight, format, size: String(exportSize) });
  if (color) params.set('color', color);
  return `/api/download?${params.toString()}`;
}
