import createIcon from '../createIcon.js';

/**
 * @component
 * @name Grid42
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![Grid42](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48cGF0aCBkPSJNOSAyMkgxNUMyMCAyMiAyMiAyMCAyMiAxNVY5QzIyIDQgMjAgMiAxNSAySDlDNCAyIDIgNCAyIDlWMTVDMiAyMCA0IDIyIDkgMjJaIiBzdHJva2U9IiNlNGU0ZTciIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNOSAyVjIyIiBzdHJva2U9IiNlNGU0ZTciIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=) - https://reicon.dev/icons/grid-42
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const Grid42 = createIcon('Grid42', {
  O: `<path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 2V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  F: `<path d="M22 7.81V16.19C22 19.83 19.83 22 16.19 22H9.75V2H16.19C19.83 2 22 4.17 22 7.81Z" fill="currentColor"/><path d="M8.25 2V22H7.81C4.17 22 2 19.83 2 16.19V7.81C2 4.17 4.17 2 7.81 2H8.25Z" fill="currentColor"/>`
});

export { Grid42 };
export default Grid42;
