'use client';
import { forwardRef, createElement } from 'react';

const W_MAP = { Filled: 'F', Outline: 'O' };
const DEFAULT_STROKE_WIDTH = 1.5;

function getNumericStrokeWidth(strokeWidth) {
  if (typeof strokeWidth === 'number') {
    return Number.isFinite(strokeWidth) ? Math.max(0, strokeWidth) : null;
  }

  if (typeof strokeWidth !== 'string' || strokeWidth.trim() === '') {
    return null;
  }

  const numericStrokeWidth = Number(strokeWidth);
  return Number.isFinite(numericStrokeWidth) ? Math.max(0, numericStrokeWidth) : null;
}

function hashIconHtml(html) {
  let hash = 2166136261;

  for (let index = 0; index < html.length; index += 1) {
    hash ^= html.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(36);
}

function getStrokeAdjustmentIdPrefix(displayName, html) {
  const safeDisplayName = displayName.replace(/[^a-zA-Z0-9_-]/g, '-');
  return `reicon-${safeDisplayName}-${hashIconHtml(html)}`;
}

function getExpandedPathData(displayName, html) {
  if (!html || html.includes('stroke-width=')) {
    return null;
  }

  return {
    html,
    strokeAdjustmentIdPrefix: getStrokeAdjustmentIdPrefix(displayName, html),
  };
}

function adjustExpandedPaths(adjustmentIdPrefix, html, strokeWidth) {
  const numericStrokeWidth = getNumericStrokeWidth(strokeWidth);

  if (numericStrokeWidth == null || numericStrokeWidth === DEFAULT_STROKE_WIDTH) {
    return html;
  }

  const strokeAdjustment = Math.abs(numericStrokeWidth - DEFAULT_STROKE_WIDTH);

  if (numericStrokeWidth > DEFAULT_STROKE_WIDTH) {
    return `<g stroke="currentColor" stroke-width="${strokeAdjustment}" stroke-linecap="round" stroke-linejoin="round" paint-order="stroke fill">${html}</g>`;
  }

  const safeStrokeWidth = String(numericStrokeWidth).replace(/[^a-zA-Z0-9_-]/g, '-');
  const adjustmentId = `${adjustmentIdPrefix}-${safeStrokeWidth}`;
  const sourceId = `${adjustmentId}-source`;
  const maskId = `${adjustmentId}-mask`;
  const inheritableHtml = html.replace(/\sfill="currentColor"/g, '');

  return `<defs><g id="${sourceId}">${inheritableHtml}</g><mask id="${maskId}" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="-12" y="-12" width="48" height="48"><use href="#${sourceId}" fill="white"/><use href="#${sourceId}" fill="none" stroke="black" stroke-width="${strokeAdjustment}" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><use href="#${sourceId}" fill="currentColor" mask="url(#${maskId})"/>`;
}

/**
 * Factory that builds a forwardRef icon component.
 * @param {string} displayName  PascalCase icon name
 * @param {Object} iconData     { F?: string, O?: string }
 */
const createIcon = (displayName, iconData) => {
  const expandedPathData = {
    F: getExpandedPathData(displayName, iconData.F),
    O: getExpandedPathData(displayName, iconData.O),
  };
  const Icon = forwardRef(
    /**
     * @param {import('./createIcon').IconProps} props
     * @param {import('react').Ref<SVGSVGElement>} ref
     */
    (
      {
        color,
        secondaryColor,
        size = 24,
        weight = 'Outline',
        strokeWidth,
        className,
        style,
        ...rest
      },
      ref,
    ) => {
      const key = W_MAP[weight] || 'O';
      let html = iconData[key] || iconData[Object.keys(iconData)[0]] || '';
      let inheritedStrokeWidth;

      if (strokeWidth != null) {
        const expandedPaths = expandedPathData[key];

        if (expandedPaths) {
          html = adjustExpandedPaths(
            expandedPaths.strokeAdjustmentIdPrefix,
            expandedPaths.html,
            strokeWidth,
          );
        } else if (html.includes('stroke-width=')) {
          html = html.replace(/\sstroke-width="[^"]*"/g, '');
          inheritedStrokeWidth = strokeWidth;
        }
      }

      return createElement('svg', {
        ref,
        xmlns: 'http://www.w3.org/2000/svg',
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        strokeWidth: inheritedStrokeWidth,
        className: className ? 'reicon ' + className : 'reicon',
        style: color != null ? { color, ...style } : style,
        ...rest,
        dangerouslySetInnerHTML: { __html: html },
      });
    },
  );

  Icon.displayName = displayName;
  return Icon;
};

export { createIcon };
export default createIcon;
