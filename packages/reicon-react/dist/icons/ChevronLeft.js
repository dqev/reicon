import createIcon from '../createIcon.js';

/**
 * @component
 * @name ChevronLeft
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![ChevronLeft](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEuMzMzMzMpIj48cG9seWxpbmUgcG9pbnRzPSIxMS41IDE1LjI1IDUuMjUgOSAxMS41IDIuNzUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U0ZTRlNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSI+PC9wb2x5bGluZT48L2c+PC9zdmc+) - https://reicon.dev/icons/chevron-left
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const ChevronLeft = createIcon('ChevronLeft', {
  F: `<g transform="scale(1.33333)"><path d="M11.5,16c-.192,0-.384-.073-.53-.22l-6.25-6.25c-.293-.293-.293-.768,0-1.061L10.97,2.22c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061l-5.72,5.72,5.72,5.72c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z" fill="currentColor"></path></g>`,
  O: `<g transform="scale(1.33333)"><polyline points="11.5 15.25 5.25 9 11.5 2.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></polyline></g>`
});

export { ChevronLeft };
export default ChevronLeft;
