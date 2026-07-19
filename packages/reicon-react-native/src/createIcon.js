import { forwardRef, createElement } from 'react';
import { SvgXml } from 'react-native-svg';

const W_MAP = { Filled: 'F', Outline: 'O' };

/**
 * Factory that builds a forwardRef icon component for React Native.
 * @param {string} displayName  PascalCase icon name
 * @param {Object} iconData     { F?: string, O?: string }
 */
const createIcon = (displayName, iconData) => {
  const Icon = forwardRef(
    /**
     * @param {import('./createIcon').IconProps} props
     * @param {import('react').Ref<Svg>} ref
     */
    (
      {
        color,
        secondaryColor,
        size = 24,
        weight = 'Outline',
        strokeWidth,
        style,
        ...rest
      },
      ref,
    ) => {
      const key = W_MAP[weight] || 'O';
      let html = iconData[key] || iconData[Object.keys(iconData)[0]] || '';

      if (strokeWidth != null) {
        html = html.replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`);
      }

      if (color != null) {
        html = html.replace(/currentColor/g, color);
      }

      // Replace secondary color placeholder if present
      if (secondaryColor) {
        html = html.replace(/__RI_SECONDARY__/g, secondaryColor);
      }
      
      const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">${html}</svg>`;

      return createElement(SvgXml, {
        ref,
        xml: svgMarkup,
        width: size,
        height: size,
        style,
        ...rest,
      });
    },
  );

  Icon.displayName = displayName;
  return Icon;
};

export { createIcon };
export default createIcon;
