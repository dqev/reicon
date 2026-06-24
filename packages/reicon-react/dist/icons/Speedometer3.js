import createIcon from '../createIcon.js';

/**
 * @component
 * @name Speedometer3
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![Speedometer3](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTkuMTQgMTkuNUMyMC45MSAxNy43IDIyIDE1LjIyIDIyIDEyLjVDMjIgNi45OCAxNy41MiAyLjUgMTIgMi41QzYuNDggMi41IDIgNi45OCAyIDEyLjVDMiAxNS4yMiAzLjA4IDE3LjY4IDQuODQgMTkuNDkiIHN0cm9rZT0iI2U0ZTRlNyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTEyIDIxLjVDMTMuODY2NyAyMS41IDE1LjM4IDE5Ljk4NjcgMTUuMzggMTguMTJDMTUuMzggMTYuMjUzMyAxMy44NjY3IDE0Ljc0IDEyIDE0Ljc0QzEwLjEzMzMgMTQuNzQgOC42MiAxNi4yNTMzIDguNjIgMTguMTJDOC42MiAxOS45ODY3IDEwLjEzMzMgMjEuNSAxMiAyMS41WiIgc3Ryb2tlPSIjZTRlNGU3IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMTUuMjUgMTJIMTZDMTYuODIgMTIgMTcuNSAxMS4zMyAxNy41IDEwLjVDMTcuNSA5LjY4IDE2LjgyIDkgMTYgOUMxNS4xOCA5IDE0LjUgOS42NyAxNC41IDEwLjVWMTEuMjVDMTQuNSAxMS42NiAxNC44NCAxMiAxNS4yNSAxMloiIHN0cm9rZT0iI2U0ZTRlNyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+) - https://reicon.dev/icons/speedometer3
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const Speedometer3 = createIcon('Speedometer3', {
  O: `<path d="M19.14 19.5C20.91 17.7 22 15.22 22 12.5C22 6.98 17.52 2.5 12 2.5C6.48 2.5 2 6.98 2 12.5C2 15.22 3.08 17.68 4.84 19.49" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 21.5C13.8667 21.5 15.38 19.9867 15.38 18.12C15.38 16.2533 13.8667 14.74 12 14.74C10.1333 14.74 8.62 16.2533 8.62 18.12C8.62 19.9867 10.1333 21.5 12 21.5Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.25 12H16C16.82 12 17.5 11.33 17.5 10.5C17.5 9.68 16.82 9 16 9C15.18 9 14.5 9.67 14.5 10.5V11.25C14.5 11.66 14.84 12 15.25 12Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>`,
  F: `<path d="M19.14 20.25C18.95 20.25 18.76 20.18 18.61 20.04C18.31 19.75 18.31 19.28 18.6 18.98C20.31 17.24 21.25 14.94 21.25 12.5C21.25 7.4 17.1 3.25 12 3.25C6.9 3.25 2.75 7.4 2.75 12.5C2.75 14.93 3.68 17.22 5.38 18.96C5.67 19.26 5.66 19.73 5.37 20.02C5.07 20.31 4.6 20.3 4.31 20.01C2.34 17.99 1.25 15.32 1.25 12.5C1.25 6.57 6.07 1.75 12 1.75C17.93 1.75 22.75 6.57 22.75 12.5C22.75 15.33 21.66 18.01 19.67 20.03C19.53 20.18 19.33 20.25 19.14 20.25Z" fill="currentColor"/><path d="M11.9991 21.9983C14.142 21.9983 15.8791 20.2611 15.8791 18.1183C15.8791 15.9754 14.142 14.2383 11.9991 14.2383C9.85628 14.2383 8.11914 15.9754 8.11914 18.1183C8.11914 20.2611 9.85628 21.9983 11.9991 21.9983Z" fill="currentColor"/><path d="M16 8.5C14.9 8.5 14 9.4 14 10.5V11.25C14 11.94 14.56 12.5 15.25 12.5H16C17.1 12.5 18 11.6 18 10.5C18 9.4 17.1 8.5 16 8.5Z" fill="currentColor"/>`
});

export { Speedometer3 };
export default Speedometer3;
