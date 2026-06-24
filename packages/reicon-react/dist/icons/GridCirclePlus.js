import createIcon from '../createIcon.js';

/**
 * @component
 * @name GridCirclePlus
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![GridCirclePlus](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEuMzMzMzMpIj48bGluZSB4MT0iMTMiIHkxPSIxMC4yNSIgeDI9IjEzIiB5Mj0iMTUuMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U0ZTRlNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSI+PC9saW5lPjxsaW5lIHgxPSIxNS41IiB5MT0iMTIuNzUiIHgyPSIxMC41IiB5Mj0iMTIuNzUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U0ZTRlNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSI+PC9saW5lPjxjaXJjbGUgY3g9IjUiIGN5PSI1IiByPSIyLjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U0ZTRlNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTMiIGN5PSI1IiByPSIyLjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U0ZTRlNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNSIgY3k9IjEzIiByPSIyLjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U0ZTRlNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSI+PC9jaXJjbGU+PC9nPjwvc3ZnPg==) - https://reicon.dev/icons/grid-circle-plus
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const GridCirclePlus = createIcon('GridCirclePlus', {
  F: `<g transform="scale(1.33333)"><path d="M15.5,12h-1.75v-1.75c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75v1.75h-1.75c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h1.75v1.75c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-1.75h1.75c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z" fill="currentColor"></path><circle cx="5" cy="5" r="3.25" fill="currentColor"></circle><circle cx="13" cy="5" r="3.25" fill="currentColor"></circle><circle cx="5" cy="13" r="3.25" fill="currentColor"></circle></g>`,
  O: `<g transform="scale(1.33333)"><line x1="13" y1="10.25" x2="13" y2="15.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></line><line x1="15.5" y1="12.75" x2="10.5" y2="12.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></line><circle cx="5" cy="5" r="2.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle><circle cx="13" cy="5" r="2.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle><circle cx="5" cy="13" r="2.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle></g>`
});

export { GridCirclePlus };
export default GridCirclePlus;
