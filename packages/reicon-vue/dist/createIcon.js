import { defineComponent, h, computed } from 'vue';

const W_MAP = { Filled: 'F', Outline: 'O' };

/**
 * Factory that builds a Vue 3 icon component.
 * @param {string} displayName  PascalCase icon name
 * @param {Object} iconData     { F?: string, O?: string }
 * @returns {import('vue').DefineComponent}
 */
const createIcon = (displayName, iconData) => {
  return defineComponent({
    name: displayName,
    inheritAttrs: false,
    props: {
      /** Primary icon color. Default: `currentColor` */
      color: { type: String, default: 'currentColor' },
      /** Icon size (number = px, string = any CSS unit). Default: `24` */
      size: { type: [Number, String], default: 24 },
      /** Icon weight / style: `'Outline'` | `'Filled'`. Default: `'Outline'` */
      weight: {
        type: String,
        default: 'Outline',
        validator: (v) => ['Outline', 'Filled'].includes(v),
      },
      /** Override stroke-width on stroked weights */
      strokeWidth: { type: [Number, String], default: undefined },
    },
    setup(props, { attrs }) {
      const svgHtml = computed(() => {
        const key = W_MAP[props.weight] || 'O';
        let html = iconData[key] || iconData[Object.keys(iconData)[0]] || '';
        if (props.strokeWidth != null) {
          html = html.replace(/stroke-width="[^"]*"/g, 'stroke-width="' + props.strokeWidth + '"');
        }
        return html;
      });

      return () => {
        // Separate class/style from other attrs to avoid duplication
        const { class: userClass, style: userStyle, ...restAttrs } = attrs;

        return h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: props.size,
          height: props.size,
          viewBox: '0 0 24 24',
          fill: 'none',
          // Use array syntax so Vue correctly normalises string, array, and object class bindings
          class: ['reicon', userClass],
          style: [{ color: props.color }, userStyle],
          innerHTML: svgHtml.value,
          ...restAttrs,
        });
      };
    },
  });
};

export { createIcon };
export default createIcon;
