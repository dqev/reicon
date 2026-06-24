import createIcon from '../createIcon.js';

/**
 * @component
 * @name Magnifier
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![Magnifier](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEuMzMzMzMpIj48cGF0aCBkPSJNMTUuNzUgMTUuNzVMMTEuNjM4NiAxMS42Mzg2IiBzdHJva2U9IiNlNGU0ZTciIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbGw9Im5vbmUiPjwvcGF0aD4gPHBhdGggZD0iTTcuNzUgMTMuMjVDMTAuNzg3NSAxMy4yNSAxMy4yNSAxMC43ODc1IDEzLjI1IDcuNzVDMTMuMjUgNC43MTI1IDEwLjc4NzUgMi4yNSA3Ljc1IDIuMjVDNC43MTI1IDIuMjUgMi4yNSA0LjcxMjUgMi4yNSA3Ljc1QzIuMjUgMTAuNzg3NSA0LjcxMjUgMTMuMjUgNy43NSAxMy4yNVoiIHN0cm9rZT0iI2U0ZTRlNyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZmlsbD0ibm9uZSI+PC9wYXRoPjwvZz48L3N2Zz4=) - https://reicon.dev/icons/magnifier
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const Magnifier = createIcon('Magnifier', {
  F: `<g transform="scale(1.33333)"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.1083 11.1083C11.4012 10.8154 11.876 10.8154 12.1689 11.1083L16.2803 15.2197C16.5732 15.5126 16.5732 15.9874 16.2803 16.2803C15.9874 16.5732 15.5126 16.5732 15.2197 16.2803L11.1083 12.1689C10.8154 11.876 10.8154 11.4012 11.1083 11.1083Z" fill="currentColor"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 7.75C1.5 4.29829 4.29829 1.5 7.75 1.5C11.2017 1.5 14 4.29829 14 7.75C14 11.2017 11.2017 14 7.75 14C4.29829 14 1.5 11.2017 1.5 7.75ZM7.75 3C5.12671 3 3 5.12671 3 7.75C3 10.3733 5.12671 12.5 7.75 12.5C10.3733 12.5 12.5 10.3733 12.5 7.75C12.5 5.12671 10.3733 3 7.75 3Z" fill="currentColor"></path></g>`,
  O: `<g transform="scale(1.33333)"><path d="M15.75 15.75L11.6386 11.6386" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path> <path d="M7.75 13.25C10.7875 13.25 13.25 10.7875 13.25 7.75C13.25 4.7125 10.7875 2.25 7.75 2.25C4.7125 2.25 2.25 4.7125 2.25 7.75C2.25 10.7875 4.7125 13.25 7.75 13.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path></g>`
});

export { Magnifier };
export default Magnifier;
