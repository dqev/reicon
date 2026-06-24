import createIcon from '../createIcon.js';

/**
 * @component
 * @name ChevronRight
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![ChevronRight](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEuMzMzMzMpIj48cG9seWxpbmUgcG9pbnRzPSI2LjUgMi43NSAxMi43NSA5IDYuNSAxNS4yNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTRlNGU3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij48L3BvbHlsaW5lPjwvZz48L3N2Zz4=) - https://reicon.dev/icons/chevron-right
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const ChevronRight = createIcon('ChevronRight', {
  F: `<g transform="scale(1.33333)"><path d="M13.28,8.47L7.03,2.22c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061l5.72,5.72-5.72,5.72c-.293,.293-.293,.768,0,1.061,.146,.146,.338,.22,.53,.22s.384-.073,.53-.22l6.25-6.25c.293-.293,.293-.768,0-1.061Z" fill="currentColor"></path></g>`,
  O: `<g transform="scale(1.33333)"><polyline points="6.5 2.75 12.75 9 6.5 15.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></polyline></g>`
});

export { ChevronRight };
export default ChevronRight;
