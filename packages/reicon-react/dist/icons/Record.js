import createIcon from '../createIcon.js';

/**
 * @component
 * @name Record
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![Record](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEyIDIuNzVDNi44OTEzNyAyLjc1IDIuNzUgNi44OTEzNyAyLjc1IDEyQzIuNzUgMTcuMTA4NiA2Ljg5MTM3IDIxLjI1IDEyIDIxLjI1QzE3LjEwODYgMjEuMjUgMjEuMjUgMTcuMTA4NiAyMS4yNSAxMkMyMS4yNSA2Ljg5MTM3IDE3LjEwODYgMi43NSAxMiAyLjc1Wk0xLjI1IDEyQzEuMjUgNi4wNjI5NCA2LjA2Mjk0IDEuMjUgMTIgMS4yNUMxNy45MzcxIDEuMjUgMjIuNzUgNi4wNjI5NCAyMi43NSAxMkMyMi43NSAxNy45MzcxIDE3LjkzNzEgMjIuNzUgMTIgMjIuNzVDNi4wNjI5NCAyMi43NSAxLjI1IDE3LjkzNzEgMS4yNSAxMloiIGZpbGw9IiNlNGU0ZTciLz48L3N2Zz4=) - https://reicon.dev/icons/record
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const Record = createIcon('Record', {
  O: `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="currentColor"/>`,
  F: `<circle cx="12" cy="12" r="10" fill="currentColor"/>`
});

export { Record };
export default Record;
