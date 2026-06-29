<script>
  /** @type {string | number} */
  export let size = 24;
  /** @type {string} */
  export let color = 'currentColor';
  /** @type {string} */
  export let weight = 'Outline';
  /** @type {string | number | undefined} */
  export let strokeWidth = undefined;
  /** @type {Record<string, string>} */
  export let iconData = {};

  let className = '';
  export { className as class };

  let customStyle = '';
  export { customStyle as style };

  /** @type {Record<string, string>} */
  const W_MAP = { Filled: 'F', Outline: 'O' };

  $: key = W_MAP[weight] || 'O';
  $: rawHtml = (() => {
    /** @type {Record<string, string>} */
    const data = iconData;
    let html = data[key] || data[Object.keys(data)[0]] || '';
    if (strokeWidth != null) {
      html = html.replace(/stroke-width="[^"]*"/g, 'stroke-width="' + strokeWidth + '"');
    }
    return html;
  })();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  class="reicon {className}"
  style="color: {color}; {customStyle}"
  {...$$restProps}
>
  {@html rawHtml}
</svg>
