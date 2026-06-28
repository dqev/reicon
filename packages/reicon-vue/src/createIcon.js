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
        validator: (v) => ['Outline', 'Filled'].includes(String(v)),
      },
      /** Override stroke-width on stroked weights */
      strokeWidth: { type: [Number, String], default: undefined },
    },
    /**
     * @param {any} props
     * @param {import('vue').SetupContext} context
     */
    setup(props, { attrs }) {
      const svgHtml = computed(() => {
        const key = W_MAP[props.weight] || 'O';
        /** @type {Record<string, string>} */
        const data = iconData;
        const firstKey = Object.keys(data)[0] || '';
        let html = data[key] || (firstKey ? data[firstKey] : '') || '';
        if (props.strokeWidth != null) {
          html = html.replace(/stroke-width="[^"]*"/g, 'stroke-width="' + props.strokeWidth + '"');
        }
        return html;
      });

      return () => {
        const { class: userClass, style: userStyle, ...restAttrs } = attrs;

        return h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: props.size,
          height: props.size,
          viewBox: '0 0 24 24',
          fill: 'none',
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
