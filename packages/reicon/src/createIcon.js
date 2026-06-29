const W_MAP = { Filled: 'F', Outline: 'O' };

/** Escape a value for safe embedding inside an HTML/SVG attribute. */
const escAttr = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Factory that builds an icon function returning an SVG element.
 * @param {string} displayName  PascalCase icon name
 * @param {Object} iconData     { F?: string, O?: string }
 * @returns {function(import('./createIcon').IconOptions=): SVGSVGElement}
 */
const createIcon = (displayName, iconData) => {
  /**
   * Create an SVG element for this icon.
   * @param {import('./createIcon').IconOptions} [options]
   * @returns {SVGSVGElement}
   */
  const icon = (options = {}) => {
    const {
      color = 'currentColor',
      size = 24,
      weight = 'Outline',
      strokeWidth,
      className,
      attrs = {},
    } = options;

    const key = W_MAP[weight] || 'O';
    /** @type {Record<string, string>} */
    const data = iconData;
    const firstKey = Object.keys(data)[0] || '';
    let html = data[key] || (firstKey ? data[firstKey] : '') || '';

    if (strokeWidth != null) {
      html = html.replace(/stroke-width="[^"]*"/g, 'stroke-width="' + strokeWidth + '"');
    }

    if (typeof document === 'undefined') {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('reicon: document is not defined when rendering icon "' + displayName + '". Use toSvg() for Server-Side Rendering (SSR).');
      }
      return null;
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', String(size));
    svg.setAttribute('height', String(size));
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('class', className ? 'reicon ' + className : 'reicon');
    svg.style.color = color;

    for (const [k, v] of Object.entries(attrs)) {
      svg.setAttribute(k, String(v));
    }

    svg.innerHTML = html;
    return svg;
  };

  icon.displayName = displayName;
  icon.iconData = iconData;

  /**
   * Returns the SVG markup as a string (useful for SSR or innerHTML).
   * @param {import('./createIcon').IconOptions} [options] - Same options as the icon function
   * @returns {string}
   */
  icon.toSvg = (options = {}) => {
    const {
      color = 'currentColor',
      size = 24,
      weight = 'Outline',
      strokeWidth,
      className,
      attrs = {},
    } = options;

    const key = W_MAP[weight] || 'O';
    /** @type {Record<string, string>} */
    const data = iconData;
    const firstKey = Object.keys(data)[0] || '';
    let html = data[key] || (firstKey ? data[firstKey] : '') || '';

    if (strokeWidth != null) {
      html = html.replace(/stroke-width="[^"]*"/g, 'stroke-width="' + strokeWidth + '"');
    }

    const extraAttrs = Object.entries(attrs)
      .map(([k, v]) => `${escAttr(k)}="${escAttr(v)}"`)
      .join(' ');

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${escAttr(size)}" height="${escAttr(size)}" viewBox="0 0 24 24" fill="none" class="${escAttr(className ? 'reicon ' + className : 'reicon')}" style="color: ${escAttr(color)}"${extraAttrs ? ' ' + extraAttrs : ''}>${html}</svg>`;
  };

  return icon;
};

export { createIcon };
export default createIcon;
