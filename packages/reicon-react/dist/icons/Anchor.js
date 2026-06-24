import createIcon from '../createIcon.js';

/**
 * @component
 * @name Anchor
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![Anchor](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEuMzMzMzMpIj48cGF0aCBkPSJNMTYuMjUsMTAuNTMxbC0xLTEuNTMxYzAsMy40NTItMi43OTgsNi4yNS02LjI1LDYuMjUtMy40NTIsMC02LjI1LTIuNzk4LTYuMjUtNi4yNWwtMSwxLjUzMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTRlNGU3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij48L3BhdGg+PGxpbmUgeDE9IjkiIHkxPSI1LjI1IiB4Mj0iOSIgeTI9IjE2LjI1IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNGU0ZTciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvbGluZT48Y2lyY2xlIGN4PSI5IiBjeT0iMy41IiByPSIxLjc1IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNGU0ZTciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvY2lyY2xlPjxsaW5lIHgxPSI3LjI1IiB5MT0iOC4yNSIgeDI9IjEwLjc1IiB5Mj0iOC4yNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTRlNGU3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij48L2xpbmU+PC9nPjwvc3ZnPg==) - https://reicon.dev/icons/anchor
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const Anchor = createIcon('Anchor', {
  F: `<g transform="scale(1.33333)"><path d="M16.878,10.121l-1-1.531c-.182-.278-.524-.403-.842-.309-.318,.095-.536,.387-.536,.719,0,2.778-2.072,5.075-4.75,5.443V5.25c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75V14.443c-2.678-.368-4.75-2.665-4.75-5.443,0-.332-.218-.624-.536-.719-.318-.095-.661,.031-.842,.309l-1,1.531c-.227,.347-.129,.812,.218,1.038,.312,.204,.719,.146,.963-.121,.804,2.636,3.131,4.596,5.947,4.899v.312c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-.312c2.816-.304,5.144-2.263,5.947-4.899,.244,.266,.651,.325,.963,.121,.347-.227,.444-.691,.218-1.038Z" fill="currentColor"></path><path d="M9,6c-1.378,0-2.5-1.122-2.5-2.5s1.122-2.5,2.5-2.5,2.5,1.122,2.5,2.5-1.122,2.5-2.5,2.5Zm0-3.5c-.551,0-1,.449-1,1s.449,1,1,1,1-.449,1-1-.449-1-1-1Z" fill="currentColor"></path><path d="M10.75,9h-3.5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h3.5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z" fill="currentColor"></path></g>`,
  O: `<g transform="scale(1.33333)"><path d="M16.25,10.531l-1-1.531c0,3.452-2.798,6.25-6.25,6.25-3.452,0-6.25-2.798-6.25-6.25l-1,1.531" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><line x1="9" y1="5.25" x2="9" y2="16.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></line><circle cx="9" cy="3.5" r="1.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle><line x1="7.25" y1="8.25" x2="10.75" y2="8.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></line></g>`
});

export { Anchor };
export default Anchor;
