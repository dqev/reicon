/**
 * Utility helper to convert SVG (URL or String) to high-quality, transparent PNG / WebP and SVG file downloads.
 * Handles local dev proxy (/cdn-proxy) and CORS fallback automatically.
 */

export interface DownloadRasterOptions {
  svgUrl?: string;
  svgText?: string;
  filename: string;
  format?: 'png' | 'webp';
  exportSize?: number;
}

export interface DownloadSvgOptions {
  url?: string;
  svgText?: string;
  filename: string;
}

/**
 * Robustly fetches SVG content from a URL using Vite's /cdn-proxy and CORS fallbacks.
 */
export async function fetchSvgText(url: string): Promise<string> {
  // 1. Try local dev proxy (/cdn-proxy) if URL is on cdn.reicon.dev
  const proxiedUrl = url.startsWith('https://cdn.reicon.dev')
    ? url.replace('https://cdn.reicon.dev', '/cdn-proxy')
    : (url.startsWith('/') ? `${window.location.origin}${url}` : url);

  try {
    const res = await fetch(proxiedUrl);
    if (res.ok) {
      const text = await res.text();
      if (text.includes('<svg') || text.includes('<SVG')) {
        return text;
      }
    }
  } catch (err) {
    console.warn('Proxy fetch failed, attempting direct fetch:', err);
  }

  // 2. Direct fetch
  const fullUrl = url.startsWith('/') ? `${window.location.origin}${url}` : url;
  try {
    const res = await fetch(fullUrl);
    if (res.ok) {
      const text = await res.text();
      if (text.includes('<svg') || text.includes('<SVG')) {
        return text;
      }
    }
  } catch (err) {
    console.warn('Direct fetch failed, attempting fallback CORS proxy:', err);
  }

  // 3. Fallback CORS Proxy: allorigins.win
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(fullUrl)}`;
    const res = await fetch(proxyUrl);
    if (res.ok) {
      const text = await res.text();
      if (text.includes('<svg') || text.includes('<SVG')) {
        return text;
      }
    }
  } catch {
    // Failed all proxies
  }

  throw new Error(`Unable to fetch SVG content from ${url}`);
}

/**
 * Downloads SVG directly in the page without opening a new tab or redirecting.
 */
export async function downloadSvgFile({
  url,
  svgText,
  filename,
}: DownloadSvgOptions): Promise<void> {
  let content = svgText;

  if (!content && url) {
    content = await fetchSvgText(url);
  }

  if (!content) {
    throw new Error('Could not retrieve SVG content');
  }

  // Ensure xmlns is present for standalone rendering
  if (!/xmlns=/i.test(content)) {
    content = content.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  const cleanFilename = filename.endsWith('.svg') ? filename : `${filename}.svg`;
  const blob = new Blob([content], { type: 'image/svg+xml;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = cleanFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
}

/**
 * Converts SVG to high-quality transparent PNG or WebP and downloads it directly in browser.
 */
export async function downloadSvgAsRaster({
  svgUrl,
  svgText,
  filename,
  format = 'png',
  exportSize = 1024,
}: DownloadRasterOptions): Promise<void> {
  let content = svgText;

  if (!content && svgUrl) {
    try {
      content = await fetchSvgText(svgUrl);
    } catch (err) {
      console.warn('Fetch SVG for raster conversion failed:', err);
    }
  }

  const mimeType = format === 'webp' ? 'image/webp' : 'image/png';
  const ext = format === 'webp' ? 'webp' : 'png';
  const cleanFilename = filename.endsWith(`.${ext}`) ? filename : `${filename}.${ext}`;

  const canvas = document.createElement('canvas');
  canvas.width = exportSize;
  canvas.height = exportSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  const img = new Image();

  if (content) {
    // Ensure xmlns is present for standalone rendering
    if (!/xmlns=/i.test(content)) {
      content = content.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    // Extract viewBox to preserve intrinsic aspect ratio
    const viewBoxMatch = content.match(/viewBox=["']([^"']+)["']/i);
    let vbWidth = exportSize;
    let vbHeight = exportSize;
    if (viewBoxMatch) {
      const parts = viewBoxMatch[1].trim().split(/[\s,]+/).map(Number);
      if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
        vbWidth = parts[2];
        vbHeight = parts[3];
      }
    }

    // Ensure explicit width and height on root <svg>
    content = content.replace(/<svg\b([^>]*)>/i, (match) => {
      let updated = match;
      if (!/width=["']/i.test(match)) {
        updated = updated.replace(/<svg/i, `<svg width="${vbWidth}"`);
      }
      if (!/height=["']/i.test(match)) {
        updated = updated.replace(/<svg/i, `<svg height="${vbHeight}"`);
      }
      return updated;
    });

    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(content)}`;

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = (e) => reject(e);
      img.src = dataUrl;
    });
  } else if (svgUrl) {
    const fullUrl = svgUrl.startsWith('/') ? `${window.location.origin}${svgUrl}` : svgUrl;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = (e) => reject(e);
      img.src = fullUrl;
    });
  } else {
    throw new Error('No SVG source available');
  }

  // 100% transparent background (clear any previous canvas data)
  ctx.clearRect(0, 0, exportSize, exportSize);
  ctx.drawImage(img, 0, 0, exportSize, exportSize);

  // Export as PNG or WebP and trigger browser download
  const blob = await new Promise<Blob | null>((resolve) => {
    try {
      canvas.toBlob((b) => resolve(b), mimeType, 1.0);
    } catch {
      resolve(null);
    }
  });

  if (blob) {
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = cleanFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  } else {
    const dataUrl = canvas.toDataURL(mimeType, 1.0);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = cleanFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
