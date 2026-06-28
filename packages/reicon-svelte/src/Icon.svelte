<script>
  export let size = 24;
  export let color = 'currentColor';
  export let weight = 'Outline';
  export let strokeWidth = undefined;
  export let iconData = {};

  let className = '';
  export { className as class };

  let customStyle = '';
  export { customStyle as style };

  const W_MAP = { Filled: 'F', Outline: 'O' };

  $: key = W_MAP[weight] || 'O';
  $: rawHtml = (() => {
    let html = iconData[key] || iconData[Object.keys(iconData)[0]] || '';
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
