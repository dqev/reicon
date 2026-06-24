import createIcon from '../createIcon.js';

/**
 * @component
 * @name SquareMinus
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![SquareMinus](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEuMzMzMzMpIj48cmVjdCB4PSIyLjc1IiB5PSIyLjc1IiB3aWR0aD0iMTIuNSIgaGVpZ2h0PSIxMi41IiByeD0iMiIgcnk9IjIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U0ZTRlNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSI+PC9yZWN0PjxsaW5lIHgxPSI1Ljc1IiB5MT0iOSIgeDI9IjEyLjI1IiB5Mj0iOSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTRlNGU3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij48L2xpbmU+PC9nPjwvc3ZnPg==) - https://reicon.dev/icons/square-minus
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const SquareMinus = createIcon('SquareMinus', {
  F: `<g transform="scale(1.33333)"><path d="M13.25,2H4.75c-1.517,0-2.75,1.233-2.75,2.75V13.25c0,1.517,1.233,2.75,2.75,2.75H13.25c1.517,0,2.75-1.233,2.75-2.75V4.75c0-1.517-1.233-2.75-2.75-2.75Zm-1,7.75H5.75c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h6.5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z" fill="currentColor"></path></g>`,
  O: `<g transform="scale(1.33333)"><rect x="2.75" y="2.75" width="12.5" height="12.5" rx="2" ry="2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></rect><line x1="5.75" y1="9" x2="12.25" y2="9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></line></g>`
});

export { SquareMinus };
export default SquareMinus;
