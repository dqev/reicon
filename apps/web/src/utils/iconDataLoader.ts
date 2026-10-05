/**
 * Utility functions for icon data loading, subscriptions, and naming conventions.
 */

let isLoaded = false;
const listeners = new Set<() => void>();
const iconCodeMap = new Map<string, string>();

export function toKebabCase(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function iconsLoaded(): boolean {
  if (typeof window !== 'undefined' && (window as any).Reicon?.icons) {
    return true;
  }
  return isLoaded;
}

export function subscribeIcons(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function setIconCode(name: string, code: string): void {
  iconCodeMap.set(toKebabCase(name), code);
}

export function getIconCode(name: string): string {
  const kebab = toKebabCase(name);
  if (iconCodeMap.has(kebab)) {
    return iconCodeMap.get(kebab) || '';
  }
  if (typeof window !== 'undefined' && (window as any).Reicon?.getIcon) {
    const iconObj = (window as any).Reicon.getIcon(kebab);
    if (iconObj?.code) return iconObj.code;
  }
  return '';
}

export function notifyIconsLoaded(): void {
  isLoaded = true;
  listeners.forEach((fn) => {
    try {
      fn();
    } catch { }
  });
}
