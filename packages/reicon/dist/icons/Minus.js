import createIcon from '../createIcon.js';

/**
 * @name Minus
 * @description Reicon SVG icon function, creates an SVG element.
 * @preview ![Minus](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48cGF0aCBkPSJNMjAuNzUgMTJDMjAuNzUgMTIuNDE0MiAyMC40MTQyIDEyLjc1IDIwIDEyLjc1SDRDMy41ODU3OSAxMi43NSAzLjI1IDEyLjQxNDIgMy4yNSAxMkMzLjI1IDExLjU4NTggMy41ODU3OSAxMS4yNSA0IDExLjI1SDIwQzIwLjQxNDIgMTEuMjUgMjAuNzUgMTEuNTg1OCAyMC43NSAxMloiIGZpbGw9IiNlNGU0ZTciLz48L3N2Zz4=) - https://reicon.dev/icons/minus
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconOptions} [options] — Icon options
 * @returns {SVGSVGElement} SVG Element
 */
const Minus = createIcon('Minus', {
  O: `<path d="M20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12Z" fill="currentColor"/>`,
  F: `<path d="M21 12C21 12.5523 20.5523 13 20 13H4C3.44771 13 3 12.5523 3 12C3 11.4477 3.44771 11 4 11H20C20.5523 11 21 11.4477 21 12Z" fill="currentColor"/>`
});

export { Minus };
export default Minus;
