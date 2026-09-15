const SvgIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 300 300">
    <g stroke="#000" strokeWidth="38.009">
      <g id="svgstar-svgpage" transform="translate(150 150)">
        <path id="svgbar-svgpage" fill="#ffb13b" d="M-84.149-15.851a22.417 22.417 0 1 0 0 31.702H84.15a22.417 22.417 0 1 0 0-31.702Z"/>
        <use href="#svgbar-svgpage" transform="rotate(45)"/>
        <use href="#svgbar-svgpage" transform="rotate(90)"/>
        <use href="#svgbar-svgpage" transform="rotate(135)"/>
      </g>
    </g>
    <use href="#svgstar-svgpage"/>
  </svg>
);

export default SvgIcon;
