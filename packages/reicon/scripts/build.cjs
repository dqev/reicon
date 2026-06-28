#!/usr/bin/env node
/**
 * build.cjs — Generates the `reicon` vanilla JS package from data/icon-data.json
 *
 * Usage:  node packages/reicon/scripts/build.cjs  (or: npm run build:js)
 *
 * Output:
 *   src/icons/        Individual JS icon files and type declarations (git-ignored)
 *   src/index.js      Barrel ESM exports (git-ignored)
 *   src/index.d.ts    Barrel TypeScript declarations (git-ignored)
 *   dist/             Standard NPM package ready to publish (git-ignored)
 */

const fs = require('fs');
const path = require('path');

// ── paths ──────────────────────────────────────────────────────────────────
const DATA_PATH = path.join(__dirname, '..', '..', '..', 'data', 'icon-data.json');
const TAGS_PATH = path.join(__dirname, '..', '..', '..', 'data', 'icon-tags.json');
const SRC = path.join(__dirname, '..', 'src');
const DIST = path.join(__dirname, '..', 'dist');

// ── weight short keys ──────────────────────────────────────────────────────
const W_KEY = { Filled: 'F', Outline: 'O' };

// ── helpers ────────────────────────────────────────────────────────────────
function toPascalCase(str) {
  return str
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function stripSvgWrapper(code) {
  if (!code) return '';
  return code.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
}

// Fix hardcoded fill="white" → currentColor so user color option works correctly.
function rewriteColors(svg) {
  return svg.replace(/fill="white"/g, 'fill="currentColor"');
}

function escapeForJS(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

/**
 * Build a base64 data URI for an inline SVG preview (shown in IDE hover).
 */
function buildPreviewDataUri(weights) {
  const inner = weights['O'] || weights['F'] || '';
  if (!inner) return '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">${inner}</svg>`
    .replace(/currentColor/g, '#e4e4e7')
    .replace(/__RI_SECONDARY__/g, '#9ca3af');
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

// ── read data ──────────────────────────────────────────────────────────────
console.log('Reading icondata.json …');
const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

let TAGS = {};
if (fs.existsSync(TAGS_PATH)) {
  TAGS = JSON.parse(fs.readFileSync(TAGS_PATH, 'utf-8'));
  console.log(`Read ${Object.keys(TAGS).length} tag entries`);
}

// ── collect icons ──────────────────────────────────────────────────────────
const icons = [];
const pascalLowerSet = new Set();

for (const [catKey, catData] of Object.entries(data.categories || {})) {
  for (const [iconKey, icon] of Object.entries(catData.icons || {})) {
    let pascal = toPascalCase(iconKey);

    if (pascalLowerSet.has(pascal.toLowerCase())) {
      pascal += toPascalCase(catKey);
    }
    pascalLowerSet.add(pascal.toLowerCase());

    const weights = {};
    for (const [wName, wData] of Object.entries(icon.weights || {})) {
      const short = W_KEY[wName];
      if (short && wData.code) {
        weights[short] = rewriteColors(stripSvgWrapper(wData.code));
      }
    }

    if (Object.keys(weights).length > 0) {
      icons.push({
        kebab: iconKey,
        pascal,
        category: catKey,
        weights,
        tags: TAGS[iconKey] || icon.description || [],
      });
    }
  }
}

icons.sort((a, b) => a.pascal.localeCompare(b.pascal));
console.log(`Found ${icons.length} icons`);

// ── clean & prepare src/icons ──────────────────────────────────────────────
fs.rmSync(path.join(SRC, 'icons'), { recursive: true, force: true });
fs.mkdirSync(path.join(SRC, 'icons'), { recursive: true });

// ── individual icon files ──────────────────────────────────────────────────
console.log('Generating vanilla JS component files in src/icons/ …');

const barrelExports = [];
const dtsExports = [];

for (const icon of icons) {
  const wEntries = Object.entries(icon.weights)
    .map(([k, v]) => `  ${k}: \`${escapeForJS(v)}\``)
    .join(',\n');

  const previewUri = buildPreviewDataUri(icon.weights);
  const kebab = icon.kebab;

  // ── icon .js file ──
  const iconJS = `import createIcon from '../createIcon.js';

/**
 * @name ${icon.pascal}
 * @description Reicon SVG icon function, creates an SVG element.
 * @preview ![${icon.pascal}](${previewUri}) - https://reicon.dev/icons/${kebab}
 * @see https://reicon.dev/docs - Documentation
 * @param {import('../createIcon').IconOptions} [options] - Icon options
 * @returns {SVGSVGElement} SVG Element
 */
const ${icon.pascal} = createIcon('${icon.pascal}', {
${wEntries}
});

export { ${icon.pascal} };
export default ${icon.pascal};
`;

  fs.writeFileSync(path.join(SRC, 'icons', `${icon.pascal}.js`), iconJS);

  // ── icon .d.ts file ──
  const iconDTS = `import { IconFunction } from '../createIcon';

/**
 * @name ${icon.pascal}
 * @description Reicon SVG icon function, creates an SVG element.
 * @preview ![${icon.pascal}](${previewUri}) - https://reicon.dev/icons/${kebab}
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconOptions} [options] — Icon options
 * @returns {SVGSVGElement} SVG Element
 */
declare const ${icon.pascal}: IconFunction;
export { ${icon.pascal} };
export default ${icon.pascal};
`;

  fs.writeFileSync(path.join(SRC, 'icons', `${icon.pascal}.d.ts`), iconDTS);

  barrelExports.push(`export { ${icon.pascal} } from './icons/${icon.pascal}.js';`);
  dtsExports.push(`export { ${icon.pascal} } from './icons/${icon.pascal}.js';`);
}

// ── index.js (ESM barrel in src/) ──────────────────────────────────────────
const indexJS = `// Auto-generated barrel — do not edit
export { createIcon } from './createIcon.js';

${barrelExports.join('\n')}
`;

fs.writeFileSync(path.join(SRC, 'index.js'), indexJS);

// ── index.d.ts (types in src/) ─────────────────────────────────────────────
const indexDTS = `// Auto-generated — do not edit
export { createIcon, IconOptions, IconWeight, IconFunction } from './createIcon';

${dtsExports.join('\n')}
`;

fs.writeFileSync(path.join(SRC, 'index.d.ts'), indexDTS);

// ── recreate src/icons/.gitkeep ────────────────────────────────────────────
fs.writeFileSync(path.join(SRC, 'icons', '.gitkeep'), '# Keep directory in Git\n');

// ── clean & prepare dist ───────────────────────────────────────────────────
console.log('Preparing production build in dist/ …');
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'icons'), { recursive: true });

// ── copy src files to dist ─────────────────────────────────────────────────
fs.copyFileSync(path.join(SRC, 'createIcon.js'), path.join(DIST, 'createIcon.js'));
fs.copyFileSync(path.join(SRC, 'createIcon.d.ts'), path.join(DIST, 'createIcon.d.ts'));
fs.copyFileSync(path.join(SRC, 'index.js'), path.join(DIST, 'index.js'));
fs.copyFileSync(path.join(SRC, 'index.d.ts'), path.join(DIST, 'index.d.ts'));

for (const icon of icons) {
  fs.copyFileSync(path.join(SRC, 'icons', `${icon.pascal}.js`), path.join(DIST, 'icons', `${icon.pascal}.js`));
  fs.copyFileSync(path.join(SRC, 'icons', `${icon.pascal}.d.ts`), path.join(DIST, 'icons', `${icon.pascal}.d.ts`));
}

// ── UMD bundle ─────────────────────────────────────────────────────────────
console.log('Generating UMD bundle …');
fs.mkdirSync(path.join(DIST, 'umd'), { recursive: true });

const umdIconEntries = icons
  .map(icon => {
    const wEntries = Object.entries(icon.weights)
      .map(([k, v]) => `    ${k}: \`${escapeForJS(v)}\``)
      .join(',\n');
    return `  ${icon.pascal}: createIcon('${icon.pascal}', {\n${wEntries}\n  })`;
  })
  .join(',\n');

const umdBundle = `(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.reicon = {}));
})(this, (function (exports) { 'use strict';

  var W_MAP = { Filled: 'F', Outline: 'O' };

  function escAttr(v) { return String(v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function createIcon(displayName, iconData) {
    var icon = function(options) {
      options = options || {};
      var color = options.color || 'currentColor';
      var size = options.size || 24;
      var weight = options.weight || 'Outline';
      var strokeWidth = options.strokeWidth;
      var className = options.className;
      var attrs = options.attrs || {};

      var key = W_MAP[weight] || 'O';
      var html = iconData[key] || iconData[Object.keys(iconData)[0]] || '';

      if (strokeWidth != null) {
        html = html.replace(/stroke-width="[^"]*"/g, 'stroke-width="' + strokeWidth + '"');
      }

      if (typeof document === 'undefined') {
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('reicon: document is not defined when rendering icon "' + displayName + '". Use toSvg() for Server-Side Rendering (SSR).');
        }
        return null;
      }

      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.setAttribute('width', String(size));
      svg.setAttribute('height', String(size));
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('class', className ? 'reicon ' + className : 'reicon');
      svg.style.color = color;

      var attrKeys = Object.keys(attrs);
      for (var i = 0; i < attrKeys.length; i++) {
        svg.setAttribute(attrKeys[i], String(attrs[attrKeys[i]]));
      }

      svg.innerHTML = html;
      return svg;
    };

    icon.displayName = displayName;
    icon.iconData = iconData;

    icon.toSvg = function(options) {
      options = options || {};
      var color = options.color || 'currentColor';
      var size = options.size || 24;
      var weight = options.weight || 'Outline';
      var strokeWidth = options.strokeWidth;
      var className = options.className;
      var attrs = options.attrs || {};

      var key = W_MAP[weight] || 'O';
      var html = iconData[key] || iconData[Object.keys(iconData)[0]] || '';

      if (strokeWidth != null) {
        html = html.replace(/stroke-width="[^"]*"/g, 'stroke-width="' + strokeWidth + '"');
      }

      var extraAttrs = Object.keys(attrs).map(function(k) { return escAttr(k) + '="' + escAttr(attrs[k]) + '"'; }).join(' ');
      return '<svg xmlns="http://www.w3.org/2000/svg" width="' + escAttr(size) + '" height="' + escAttr(size) + '" viewBox="0 0 24 24" fill="none" class="' + escAttr(className ? 'reicon ' + className : 'reicon') + '" style="color: ' + escAttr(color) + '"' + (extraAttrs ? ' ' + extraAttrs : '') + '>' + html + '</svg>';
    };

    return icon;
  }

  exports.createIcon = createIcon;

  var icons = {\n${umdIconEntries}\n  };

  var iconNames = Object.keys(icons);
  for (var i = 0; i < iconNames.length; i++) {
    exports[iconNames[i]] = icons[iconNames[i]];
  }

}));
`;

fs.writeFileSync(path.join(DIST, 'umd', 'reicon.js'), umdBundle);
console.log(`  UMD bundle:  ${(Buffer.byteLength(umdBundle) / 1024 / 1024).toFixed(2)} MB`);

// ── CDN bundle ─────────────────────────────────────────────────────────────
console.log('Generating CDN bundle …');

const catList = Object.keys(data.categories || {});
const catIndexMap = {};
catList.forEach((c, idx) => { catIndexMap[c] = idx; });

const cdnIconsMap = {};
for (const icon of icons) {
  cdnIconsMap[icon.kebab] = [
    catIndexMap[icon.category],
    icon.weights
  ];
}

const catsJSON = JSON.stringify(catList);
const iconsJSON = JSON.stringify(cdnIconsMap);

const runtimeJS = `/*!
 * Reicon CDN — drop-in web component for 1000+ icons, 2 weights (Outline & Filled).
 * ALL icon data is inlined — zero network fetch, instant rendering.
 *
 *   <re-icon icon="home"></re-icon>
 *   <re-icon icon="home" weight="filled" size="32" color="#d97757"></re-icon>
 *
 * Attributes (all reactive):
 *   icon, weight, size, color, secondary-color, stroke-width,
 *   rotate, flip, spin, loading, label, decorative,
 *   gradient, gradient-type, gradient-angle, secondary-gradient
 *
 * JS API:
 *   Reicon.preload([...names])     warm cache for given icons
 *   Reicon.ready                   Promise (resolves immediately — data is inline)
 *   Reicon.icons                   Array of all icon names
 *   Reicon.categories              Array of all category names
 */
(function (global) {
  'use strict';

  // ─── inline icon data ─────────────────────────────────────────────────────
  var CATS = ${catsJSON};
  var ICONS = ${iconsJSON};

  // Weight short→full and full→short maps
  var W_FULL = { F: 'Filled', O: 'Outline' };
  var W_SHORT = { Filled: 'F', Outline: 'O' };
  var WEIGHTS = ['Filled', 'Outline'];
  var WEIGHT_ALIASES = {
    filled: 'Filled', bold: 'Filled',
    outline: 'Outline', linear: 'Outline',
  };

  // ─── caches ───────────────────────────────────────────────────────────────
  var SVG_CACHE = new Map();

  // ─── helpers ──────────────────────────────────────────────────────────────
  function normalizeWeight(w) {
    if (!w) return null;
    return WEIGHT_ALIASES[String(w).toLowerCase()] || null;
  }

  function parseIconAttr(raw) {
    if (!raw) return null;
    var category = null, spec = String(raw).trim();
    if (spec.startsWith('reicon:')) {
      var parts = spec.split(':');
      if (parts.length === 3) { category = parts[1]; spec = parts[2]; }
      else if (parts.length === 2) { spec = parts[1]; }
      else return null;
    }
    var name = spec, weight = null;
    var dash = spec.lastIndexOf('-');
    if (dash > 0) {
      var w = normalizeWeight(spec.substring(dash + 1));
      if (w) {
        var base = spec.substring(0, dash);
        if (ICONS[base] && !ICONS[spec]) { name = base; weight = w; }
      }
    }
    return { category: category, name: name, weight: weight };
  }

  function normalizeSize(s) {
    if (s == null || s === '') return null;
    var v = String(s).trim();
    if (/^-?\\d*\\.?\\d+$/.test(v)) return v + 'px';
    return v;
  }

  function buildTransform(rotate, flip) {
    var t = [];
    if (rotate) t.push('rotate(' + rotate + 'deg)');
    if (flip === 'horizontal') t.push('scaleX(-1)');
    else if (flip === 'vertical') t.push('scaleY(-1)');
    else if (flip === 'both') t.push('scale(-1,-1)');
    return t.length ? t.join(' ') : 'none';
  }

  function wrapSvg(inner) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">' + inner + '</svg>';
  }

  function rewriteSvg(svg) {
    return svg.replace(/currentColor/g, 'var(--ri-primary)');
  }

  // ─── gradients ────────────────────────────────────────────────────────────
  function parseGradientStops(attr) {
    if (!attr) return null;
    var colors = String(attr).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    return colors.length >= 2 ? colors : null;
  }

  function buildStops(colors) {
    return colors.map(function (c, i) {
      var offset = colors.length === 1 ? 0 : (i / (colors.length - 1)) * 100;
      return '<stop offset="' + offset.toFixed(2) + '%" stop-color="' + c + '"/>';
    }).join('');
  }

  function buildLinearGradient(id, colors, angleDeg) {
    var rad = (Number(angleDeg) || 0) * Math.PI / 180;
    var sin = Math.sin(rad), cos = Math.cos(rad);
    return '<linearGradient id="' + id + '" x1="' + (0.5 - sin * 0.5).toFixed(4) + '" y1="' + (0.5 + cos * 0.5).toFixed(4) + '" x2="' + (0.5 + sin * 0.5).toFixed(4) + '" y2="' + (0.5 - cos * 0.5).toFixed(4) + '">' + buildStops(colors) + '</linearGradient>';
  }

  function buildRadialGradient(id, colors) {
    return '<radialGradient id="' + id + '" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">' + buildStops(colors) + '</radialGradient>';
  }

  function applyGradients(svg, opts) {
    if (!opts.primary && !opts.secondary) return svg;
    var defs = [], out = svg;
    if (opts.primary) {
      defs.push(opts.type === 'radial' ? buildRadialGradient('ri-primary', opts.primary) : buildLinearGradient('ri-primary', opts.primary, opts.angle));
      out = out.replace(/var\\(--ri-primary\\)/g, 'url(#ri-primary)');
    }
    if (opts.secondary) {
      defs.push(opts.type === 'radial' ? buildRadialGradient('ri-secondary', opts.secondary) : buildLinearGradient('ri-secondary', opts.secondary, opts.angle));
      out = out.replace(/var\\(--ri-secondary\\)/g, 'url(#ri-secondary)');
    }
    return out.replace(/(<svg\\b[^>]*>)/i, '$1<defs>' + defs.join('') + '</defs>');
  }

  var FALLBACK_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '<rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2" opacity="0.6"/>' +
    '<path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/></svg>';

  // ─── inline data lookup ───────────────────────────────────────────────────
  function lookupIcon(name, weight) {
    var entry = ICONS[name];
    if (!entry) return null;
    var ws = entry[1];
    var short = W_SHORT[weight];
    if (short && ws[short]) return { cat: CATS[entry[0]], inner: ws[short] };
    var order = ['O', 'F'];
    for (var i = 0; i < order.length; i++) {
      if (ws[order[i]]) return { cat: CATS[entry[0]], inner: ws[order[i]] };
    }
    return null;
  }

  // ─── intersection observer for loading="lazy" ────────────────────────────
  var lazyObserver = null;
  function lazyObserve(el) {
    if (typeof IntersectionObserver === 'undefined') { el._render(); return; }
    if (!lazyObserver) {
      lazyObserver = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            lazyObserver.unobserve(entries[i].target);
            entries[i].target._render();
          }
        }
      }, { rootMargin: '128px' });
    }
    lazyObserver.observe(el);
  }

  // ─── element ──────────────────────────────────────────────────────────────
  class ReiconElement extends HTMLElement {
    static get observedAttributes() {
      return [
        'icon', 'weight', 'size', 'color', 'secondary-color', 'stroke-width',
        'rotate', 'flip', 'spin', 'loading', 'label', 'decorative',
        'gradient', 'gradient-type', 'gradient-angle', 'secondary-gradient',
      ];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._svgEl = null;
      this._currentKey = null;
      this._rendered = false;
      this._mounted = false;
    }

    connectedCallback() {
      this._mounted = true;
      this._installSkeleton();
      this._applyHostStyle();
      if (this.getAttribute('loading') === 'lazy') { lazyObserve(this); }
      else { this._render(); }
    }

    disconnectedCallback() {
      this._mounted = false;
      if (lazyObserver) lazyObserver.unobserve(this);
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (oldVal === newVal || !this._mounted) return;
      var styleOnly = ['size', 'color', 'secondary-color', 'stroke-width', 'rotate', 'flip', 'spin', 'label', 'decorative'];
      if (styleOnly.includes(name)) { this._applyHostStyle(); this._applyA11y(); return; }
      var gradientAttrs = ['gradient', 'gradient-type', 'gradient-angle', 'secondary-gradient'];
      if (gradientAttrs.includes(name)) {
        if (this._rawSvg) this._injectProcessed(); else this._render();
        return;
      }
      if (name === 'loading' && newVal === 'lazy' && !this._rendered) { lazyObserve(this); }
      else { this._render(); }
    }

    _installSkeleton() {
      if (this.shadowRoot.firstChild) return;
      var style = document.createElement('style');
      style.textContent =
        ':host{display:inline-block;vertical-align:middle;line-height:0;width:var(--ri-size,1em);height:var(--ri-size,1em);color:var(--ri-primary,currentColor);contain:layout paint}' +
        ':host([hidden]){display:none}' +
        '.wrap{display:block;width:100%;height:100%;transform:var(--ri-transform,none);transform-origin:50% 50%}' +
        ':host([spin]) .wrap{animation:ri-spin 1.6s linear infinite}' +
        '@keyframes ri-spin{to{transform:var(--ri-transform,rotate(0)) rotate(360deg)}}' +
        'svg{display:block;width:100%;height:100%;shape-rendering:geometricPrecision;overflow:visible}' +
        'svg [stroke]:not([stroke="none"]){stroke-width:var(--ri-stroke-width,inherit)}';
      var wrap = document.createElement('div');
      wrap.className = 'wrap';
      this.shadowRoot.append(style, wrap);
      this._wrap = wrap;
    }

    _applyHostStyle() {
      var size = normalizeSize(this.getAttribute('size'));
      var color = this.getAttribute('color') || 'currentColor';
      var secondary = this.getAttribute('secondary-color') || color;
      var stroke = this.getAttribute('stroke-width');
      var rotate = this.getAttribute('rotate');
      var flip = this.getAttribute('flip');
      var s = this.style;
      function set(k, v) { if (v == null || v === '') s.removeProperty(k); else s.setProperty(k, v); }
      set('--ri-size', size);
      set('--ri-primary', color);
      set('--ri-secondary', secondary);
      set('--ri-stroke-width', stroke);
      set('--ri-transform', buildTransform(rotate, flip));
    }

    _applyA11y() {
      if (this.hasAttribute('decorative')) {
        this.setAttribute('aria-hidden', 'true');
        this.removeAttribute('role');
        this.removeAttribute('aria-label');
        return;
      }
      this.removeAttribute('aria-hidden');
      this.setAttribute('role', 'img');
      var label = this.getAttribute('label') || this._lastIconName || '';
      if (label) this.setAttribute('aria-label', label);
    }

    _render() {
      this._installSkeleton();
      this._applyHostStyle();

      var iconAttr = this.getAttribute('icon');
      if (!iconAttr) return;

      var parsed = parseIconAttr(iconAttr);
      if (!parsed) { this._injectSvg(FALLBACK_SVG); return; }

      var weightAttr = normalizeWeight(this.getAttribute('weight'));
      var weight = weightAttr || parsed.weight || 'Outline';
      var name = parsed.name;
      this._lastIconName = name;
      this._applyA11y();

      var key = name + ':' + weight;
      if (this._currentKey === key && this._rendered) return;

      var svg = SVG_CACHE.get(key);
      if (!svg) {
        var found = lookupIcon(name, weight);
        if (!found) { this._injectSvg(FALLBACK_SVG); return; }
        svg = rewriteSvg(wrapSvg(found.inner));
        SVG_CACHE.set(key, svg);
      }

      this._currentKey = key;
      this._rawSvg = svg;
      this._injectProcessed();
    }

    _injectProcessed() {
      var primary = parseGradientStops(this.getAttribute('gradient'));
      var secondary = parseGradientStops(this.getAttribute('secondary-gradient'));
      var type = this.getAttribute('gradient-type') || 'linear';
      var angle = this.getAttribute('gradient-angle') || 135;
      var out = (primary || secondary) ? applyGradients(this._rawSvg, { primary: primary, secondary: secondary, type: type, angle: angle }) : this._rawSvg;
      this._injectSvg(out);
    }

    _injectSvg(svg) {
      this._wrap.innerHTML = svg;
      this._rendered = true;
    }
  }

  // ─── public JS API ────────────────────────────────────────────────────────
  var Reicon = {
    preload: function (names) {
      if (!names || !Array.isArray(names)) return;
      for (var i = 0; i < names.length; i++) {
        var n = names[i];
        var entry = ICONS[n];
        if (!entry) continue;
        var ws = entry[1];
        for (var s in ws) {
          if (ws.hasOwnProperty(s)) {
            var full = W_FULL[s];
            if (full) SVG_CACHE.set(n + ':' + full, rewriteSvg(wrapSvg(ws[s])));
          }
        }
      }
    },
    get ready() { return Promise.resolve(true); },
    get icons() { return Object.keys(ICONS); },
    get categories() { return CATS.slice(); },
    categoryOf: function (name) {
      var entry = ICONS[name];
      return entry ? CATS[entry[0]] : null;
    },
    get categoryMap() {
      var m = {};
      for (var n in ICONS) {
        if (ICONS.hasOwnProperty(n)) m[n] = CATS[ICONS[n][0]];
      }
      return m;
    },
  };

  if (!customElements.get('re-icon')) {
    customElements.define('re-icon', ReiconElement);
  }
  global.Reicon = Reicon;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ReiconElement: ReiconElement, Reicon: Reicon };
  }
})(typeof window !== 'undefined' ? window : globalThis);
`;

const cdnDist = path.join(DIST, 'cdn');
fs.mkdirSync(cdnDist, { recursive: true });
fs.writeFileSync(path.join(cdnDist, 'reicon.js'), runtimeJS);
console.log(`  CDN bundle:  ${(Buffer.byteLength(runtimeJS) / 1024 / 1024).toFixed(2)} MB`);

// ── package.json ───────────────────────────────────────────────────────────
const pkg = {
  name: 'reicon',
  version: '1.1.1',
  type: 'module',
  description:
    `Core vanilla JS icon components for ${icons.length}+ icons in 2 weights (Outline & Filled). Tree-shakeable, TypeScript-ready.`,
  main: './index.js',
  module: './index.js',
  types: './index.d.ts',
  unpkg: './umd/reicon.js',
  jsdelivr: './umd/reicon.js',
  browser: './umd/reicon.js',
  exports: {
    '.': {
      import: './index.js',
      types: './index.d.ts',
    },
    './icons/*': {
      import: './icons/*.js',
      types: './icons/*.d.ts',
    },
    './createIcon': {
      import: './createIcon.js',
      types: './createIcon.d.ts',
    },
    './umd/reicon.js': {
      import: './umd/reicon.js',
    },
    './cdn/reicon.js': {
      import: './cdn/reicon.js',
    },
    './cdn/*': {
      import: './cdn/*.js',
    },
  },
  sideEffects: false,
  files: ['index.js', 'index.d.ts', 'createIcon.js', 'createIcon.d.ts', 'icons/', 'umd/', 'cdn/', 'README.md'],
  keywords: [
    'icons',
    'vanilla-js',
    'svg-icons',
    'icon-library',
    'reicon',
    'outline',
    'filled',
    'tree-shakeable',
    'typescript',
  ],
  author: {
    name: 'devchauhan',
    email: 'dev@devchauhan.in',
    url: 'https://devchauhan.in',
  },
  license: 'MIT',
  repository: { type: 'git', url: 'https://github.com/dqev/reicon.git' },
  bugs: { url: 'https://github.com/dqev/reicon/issues' },
  homepage: 'https://reicon.dev',
};

fs.writeFileSync(path.join(DIST, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');

// ── README.md ──────────────────────────────────────────────────────────────
const readme = `# Reicon Vanilla JS

Vanilla JS icon components for **${icons.length}+** icons in **2 weights** (Outline & Filled) — tree-shakeable, TypeScript-ready, zero config.

## Install

\`\`\`bash
npm i reicon
\`\`\`

## License

MIT © [devchauhan](https://devchauhan.in)
`;

fs.writeFileSync(path.join(DIST, 'README.md'), readme);

// ── icon name map ──────────────────────────────────────────────────────────
const nameMap = {};
for (const icon of icons) {
  nameMap[icon.kebab] = icon.pascal;
}
fs.writeFileSync(path.join(DIST, 'icon-names.json'), JSON.stringify(nameMap, null, 2));

// ── summary ────────────────────────────────────────────────────────────────
const totalFiles = (icons.length * 2) + 6;
console.log(`\nDone!`);
console.log(`  Icons:       ${icons.length}`);
console.log(`  Weights:     Outline + Filled`);
console.log(`  Files:       ${totalFiles}`);
console.log(`  Output:      ${DIST}`);
console.log(`\nTo publish:`);
console.log(`  cd dist && npm publish --access public`);
