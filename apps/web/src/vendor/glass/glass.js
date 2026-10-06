// glass.js - Glass icon renderer (pure ESM, no dependencies).
//
// What it does:
//   Converts any raw icon markup (24x24 paths/shapes from icon-data.json,
//   or bare `d` path data) into a standalone 240x240 glassy SVG string with
//   a 3-stop ink gradient + engrave filter for thickness. All shading is
//   clipped to the glyph alpha via an outer mask, so nothing bleeds onto
//   card backgrounds (no outer drop-shadow by design).
//
// How it connects:
//   glassCache.ts --imports--> Glass.convert(rawCode, { color, size, id })
//     ^-- IconRenderer.tsx (cards + modal preview via getGlassSvg)
//     ^-- IconDetailModal.tsx (copy-SVG snippet + download-SVG file)
//   warmGlassCache() pre-converts the first page during idle so scrolling
//   shows glass immediately. Cache key = codeHash|color|size.
//
// Pieces in this file:
//   hexToRgb / rgbToHex / rgbToHsl / hslToRgb - color math for auto-shading.
//   createPalette(baseHex) -> { gradient: [light, mid, deep] }.
//   generateId(prefix) - unique gradient/filter/mask ids per SVG instance.
//   toMaskMarkup(src) - normalises raw markup for the glyph mask: strokes
//     stay strokes (fill="none"), fills turn white, fill="none" preserved.
//   convert(input, options) - main entry ({ color | colors, size, id }).
//   render(target, input, options) - convert + inject into a DOM node.
//   Default export Glass + named exports { Glass, createPalette, convert,
//   render }. NOTE: `themes` was removed; pass options.color instead.
function hexToRgb(hex) {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function rgbToHex(r, g, b) {
  const toHex = c => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
}

function hslToRgb(h, s, l) {
  h /= 360;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}

function createPalette(baseHex) {
  const rgb = hexToRgb(baseHex || '#2563EB');
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const lLight = Math.min(0.96, l + (1.0 - l) * 0.65);
  const sLight = Math.max(0.15, s * 0.75);
  const rgbLight = hslToRgb(h, sLight, lLight);

  const lMid = Math.max(0.25, Math.min(0.85, l * 1.02));
  const rgbMid = hslToRgb(h, s, lMid);

  const lDark = Math.max(0.1, l * 0.45);
  const sDark = Math.min(1.0, s * 1.25);
  const rgbDark = hslToRgb(h, sDark, lDark);

  return {
    gradient: [
      rgbToHex(rgbLight.r, rgbLight.g, rgbLight.b),
      rgbToHex(rgbMid.r, rgbMid.g, rgbMid.b),
      rgbToHex(rgbDark.r, rgbDark.g, rgbDark.b)
    ]
  };
}

function hashStr(s) {
  let h = 5381;
  const str = String(s || '');
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(36);
}

function generateId(prefix = 'glass', seed = '') {
  return `${prefix}_${hashStr(seed)}`;
}

function toMaskMarkup(src) {
  const input = String(src).trim();
  if (!/<(path|circle|ellipse|rect|line|polyline|polygon|g)\b/i.test(input)) {
    return `<path d="${input}" fill="white"/>`;
  }
  return input.replace(/<[a-zA-Z][^<>]*\/?>/g, (tag) => {
    const name = (/^<([a-zA-Z][a-zA-Z0-9]*)/.exec(tag) || [])[1] || '';
    const isShape = /^(path|circle|ellipse|rect|line|polyline|polygon)$/i.test(name);
    let out = tag
      .replace(/stroke\s*=\s*(['"])[^'"]*\1/gi, 'stroke="white"')
      .replace(/(fill|stroke)-opacity\s*=\s*(['"])[^'"]*\2/gi, '$1-opacity="1"')
      .replace(/fill\s*=\s*(['"])([^'"]*)\1/gi, (m, _q, v) =>
        /^none$/i.test(v.trim()) ? m : 'fill="white"');
    if (isShape && /stroke(\s|=|\/|>)/i.test(out) && !/fill\s*=/i.test(out)) {
      out = out.replace(/^<([a-zA-Z][a-zA-Z0-9]*)/, '<$1 fill="none"');
    }
    return out;
  });
}

function convert(input, options = {}) {
  if (!input) return '';

  const cleanPath = toMaskMarkup(input);

  let palette;
  if (options.color) {
    palette = createPalette(options.color);
  } else if (options.colors && Array.isArray(options.colors)) {
    palette = {
      gradient: options.colors,
      shadow: options.shadow || 'rgba(50, 46, 75, 0.55)'
    };
  } else {
    palette = createPalette('#64748B');
  }

  const uid = options.id || generateId('glass', input + (options.color || '') + (options.size || ''));
  const size = options.size || 240;
  const colors = palette.gradient;

  return `<svg width="${size}" height="${size}" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="glass-icon-glyph">
  <mask id="glyph_${uid}" maskUnits="userSpaceOnUse" x="0" y="0" width="240" height="240" style="mask-type: alpha;">
    <g transform="translate(24 24) scale(8)">
      <g fill="white" color="white">
        <g>${cleanPath}</g>
      </g>
    </g>
  </mask>
  <g mask="url(#glyph_${uid})">
    <g filter="url(#engrave_${uid})">
      <g mask="url(#glyph_${uid})">
        <rect x="0" y="0" width="240" height="240" fill="url(#ink_${uid})"></rect>
      </g>
    </g>
  </g>
  <defs>
    <filter id="engrave_${uid}" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="bg"></feFlood>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
      <feMorphology radius="24.2857" operator="erode" in="SourceAlpha"></feMorphology>
      <feOffset dx="14.5714" dy="17"></feOffset>
      <feGaussianBlur stdDeviation="9.71429"></feGaussianBlur>
      <feColorMatrix type="matrix" values="0 0 0 0 0.270757 0 0 0 0 0.230207 0 0 0 0 0.53433 0 0 0 0.35 0"></feColorMatrix>
      <feBlend mode="multiply" in2="bg" result="d1"></feBlend>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
      <feMorphology radius="24.2857" operator="erode" in="SourceAlpha"></feMorphology>
      <feOffset dx="4.85714" dy="4.85714"></feOffset>
      <feGaussianBlur stdDeviation="2.42857"></feGaussianBlur>
      <feColorMatrix type="matrix" values="0 0 0 0 0.0469801 0 0 0 0 0 0 0 0 0 0.352351 0 0 0 0.25 0"></feColorMatrix>
      <feBlend mode="multiply" in2="d1" result="d2"></feBlend>
      <feBlend mode="normal" in="SourceGraphic" in2="d2" result="shape"></feBlend>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="softTL"></feColorMatrix>
      <feOffset dx="-2.42857" dy="-2.42857"></feOffset>
      <feGaussianBlur stdDeviation="1.21429"></feGaussianBlur>
      <feComposite in2="softTL" operator="arithmetic" k2="-1" k3="1"></feComposite>
      <feColorMatrix type="matrix" values="0 0 0 0 0.130195 0 0 0 0 0.188321 0 0 0 0 0.420823 0 0 0 0.3 0"></feColorMatrix>
      <feBlend mode="normal" in2="shape" result="i1"></feBlend>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="softBR"></feColorMatrix>
      <feOffset dx="2.42857" dy="2.42857"></feOffset>
      <feGaussianBlur stdDeviation="1.21429"></feGaussianBlur>
      <feComposite in2="softBR" operator="arithmetic" k2="-1" k3="1"></feComposite>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0"></feColorMatrix>
      <feBlend mode="normal" in2="i1" result="i2"></feBlend>
    </filter>

    <radialGradient id="ink_${uid}" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(120 80) rotate(70) scale(180 360)">
      <stop stop-color="${colors[0]}"></stop>
      <stop offset="0.5" stop-color="${colors[1]}"></stop>
      <stop offset="1" stop-color="${colors[2]}"></stop>
    </radialGradient>
  </defs>
</svg>`;
}

function render(target, input, options = {}) {
  const svgMarkup = convert(input, options);
  let el = typeof target === 'string' ? document.querySelector(target) : target;
  if (el && el.nodeType) {
    el.innerHTML = svgMarkup;
  }
  return svgMarkup;
}

const Glass = {
  createPalette: createPalette,
  convert: convert,
  render: render
};

export default Glass;
export { Glass, createPalette, convert, render };
