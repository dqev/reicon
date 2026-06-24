import createIcon from '../createIcon.js';

/**
 * @name ChevronDown
 * @description Reicon SVG icon function, creates an SVG element.
 * @preview ![ChevronDown](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEuMzMzMzMpIj48cG9seWxpbmUgcG9pbnRzPSIxNS4yNSA2LjUgOSAxMi43NSAyLjc1IDYuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTRlNGU3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij48L3BvbHlsaW5lPjwvZz48L3N2Zz4=) - https://reicon.dev/icons/chevron-down
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconOptions} [options] — Icon options
 * @returns {SVGSVGElement} SVG Element
 */
const ChevronDown = createIcon('ChevronDown', {
  F: `<g transform="scale(1.33333)"><path d="M9,13.5c-.192,0-.384-.073-.53-.22L2.22,7.03c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0l5.72,5.72,5.72-5.72c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061l-6.25,6.25c-.146,.146-.338,.22-.53,.22Z" fill="currentColor"></path></g>`,
  O: `<g transform="scale(1.33333)"><polyline points="15.25 6.5 9 12.75 2.75 6.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></polyline></g>`
});

export { ChevronDown };
export default ChevronDown;
