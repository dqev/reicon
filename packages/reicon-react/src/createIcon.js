'use client';
import { forwardRef, createElement } from 'react';

const W_MAP = { Filled: 'F', Outline: 'O' };

/**
 * Factory that builds a forwardRef icon component.
 * @param {string} displayName  PascalCase icon name
 * @param {Object} iconData     { F?: string, O?: string }
 */
const createIcon = (displayName, iconData) => {
  const Icon = forwardRef(
    /**
     * @param {import('./createIcon').IconProps} props
     * @param {import('react').Ref<SVGSVGElement>} ref
     */
    (
      {
        color = 'currentColor',
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

      if (strokeWidth != null) {
        html = html.replace(/stroke-width="[^"]*"/g, 'stroke-width="' + strokeWidth + '"');
      }

      return createElement('svg', {
        ref,
        xmlns: 'http://www.w3.org/2000/svg',
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        className: className ? 'reicon ' + className : 'reicon',
        style: { color, ...style },
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
