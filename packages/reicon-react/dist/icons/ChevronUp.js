import createIcon from '../createIcon.js';

/**
 * @component
 * @name ChevronUp
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![ChevronUp](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEuMzMzMzMpIj48cG9seWxpbmUgcG9pbnRzPSIyLjc1IDExLjUgOSA1LjI1IDE1LjI1IDExLjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U0ZTRlNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSI+PC9wb2x5bGluZT48L2c+PC9zdmc+) - https://reicon.dev/icons/chevron-up
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const ChevronUp = createIcon('ChevronUp', {
  F: `<g transform="scale(1.33333)"><path d="M9.53,4.72c-.293-.293-.768-.293-1.061,0L2.22,10.97c-.293,.293-.293,.768,0,1.061s.768,.293,1.061,0l5.72-5.72,5.72,5.72c.146,.146,.338,.22,.53,.22s.384-.073,.53-.22c.293-.293,.293-.768,0-1.061l-6.25-6.25Z" fill="currentColor"></path></g>`,
  O: `<g transform="scale(1.33333)"><polyline points="2.75 11.5 9 5.25 15.25 11.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></polyline></g>`
});

export { ChevronUp };
export default ChevronUp;
