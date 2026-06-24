import createIcon from '../createIcon.js';

/**
 * @component
 * @name Plus
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![Plus](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTEuMjUgMjBDMTEuMjUgMjAuNDE0MiAxMS41ODU4IDIwLjc1IDEyIDIwLjc1QzEyLjQxNDIgMjAuNzUgMTIuNzUgMjAuNDE0MiAxMi43NSAyMFYxMi43NUgyMEMyMC40MTQyIDEyLjc1IDIwLjc1IDEyLjQxNDIgMjAuNzUgMTJDMjAuNzUgMTEuNTg1OCAyMC40MTQyIDExLjI1IDIwIDExLjI1SDEyLjc1VjRDMTIuNzUgMy41ODU3OSAxMi40MTQyIDMuMjUgMTIgMy4yNUMxMS41ODU4IDMuMjUgMTEuMjUgMy41ODU3OSAxMS4yNSA0VjExLjI1SDRDMy41ODU3OSAxMS4yNSAzLjI1IDExLjU4NTggMy4yNSAxMkMzLjI1IDEyLjQxNDIgMy41ODU3OSAxMi43NSA0IDEyLjc1SDExLjI1VjIwWiIgZmlsbD0iI2U0ZTRlNyIvPjwvc3ZnPg==) - https://reicon.dev/icons/plus
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const Plus = createIcon('Plus', {
  O: `<path d="M11.25 20C11.25 20.4142 11.5858 20.75 12 20.75C12.4142 20.75 12.75 20.4142 12.75 20V12.75H20C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25H12.75V4C12.75 3.58579 12.4142 3.25 12 3.25C11.5858 3.25 11.25 3.58579 11.25 4V11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H11.25V20Z" fill="currentColor"/>`,
  F: `<path d="M11 20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H13V4C13 3.44771 12.5523 3 12 3C11.4477 3 11 3.44771 11 4V11H4C3.44771 11 3 11.4477 3 12C3 12.5523 3.44771 13 4 13H11V20Z" fill="currentColor"/>`
});

export { Plus };
export default Plus;
