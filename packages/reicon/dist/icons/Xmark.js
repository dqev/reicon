import createIcon from '../createIcon.js';

/**
 * @name Xmark
 * @description Reicon SVG icon function, creates an SVG element.
 * @preview ![Xmark](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEuMzMzMzMpIj48bGluZSB4MT0iMTQiIHkxPSI0IiB4Mj0iNCIgeTI9IjE0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNGU0ZTciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvbGluZT48bGluZSB4MT0iNCIgeTE9IjQiIHgyPSIxNCIgeTI9IjE0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNGU0ZTciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvbGluZT48L2c+PC9zdmc+) - https://reicon.dev/icons/xmark
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconOptions} [options] — Icon options
 * @returns {SVGSVGElement} SVG Element
 */
const Xmark = createIcon('Xmark', {
  F: `<g transform="scale(1.33333)"><path d="M4,14.75c-.192,0-.384-.073-.53-.22-.293-.293-.293-.768,0-1.061L13.47,3.47c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061L4.53,14.53c-.146,.146-.338,.22-.53,.22Z" fill="currentColor"></path><path d="M14,14.75c-.192,0-.384-.073-.53-.22L3.47,4.53c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0L14.53,13.47c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z" fill="currentColor"></path></g>`,
  O: `<g transform="scale(1.33333)"><line x1="14" y1="4" x2="4" y2="14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></line><line x1="4" y1="4" x2="14" y2="14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></line></g>`
});

export { Xmark };
export default Xmark;
