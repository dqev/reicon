import createIcon from '../createIcon.js';

/**
 * @component
 * @name BoltLightning
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![BoltLightning](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEuMzMzMzMpIj48cGF0aCBkPSJNNy4yNSwxNi4yNWwyLTdINC40NjZjLS4zNDgsMC0uNTg5LS4zNDYtLjQ2OS0uNjcyTDYuMzgsMi4wNzhjLjA3Mi0uMTk3LC4yNi0uMzI4LC40NjktLjMyOGg0LjE3Yy4zNTIsMCwuNTkzLC4zNTMsLjQ2NiwuNjgxbC0xLjQ4NSwzLjgxOWgzLjc1Yy40MTIsMCwuNjQ3LC40NywuNCwuOGwtNi45LDkuMloiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U0ZTRlNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSI+PC9wYXRoPjwvZz48L3N2Zz4=) - https://reicon.dev/icons/bolt-lightning
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const BoltLightning = createIcon('BoltLightning', {
  F: `<g transform="scale(1.33333)"><path d="M14.868,6.191c-.213-.426-.642-.691-1.118-.691h-2.653l1.088-2.798c.149-.385,.099-.818-.134-1.159-.233-.34-.619-.543-1.031-.543H6.85c-.522,0-.994,.329-1.174,.819l-2.385,6.501c-.14,.383-.083,.812,.15,1.146,.234,.334,.617,.533,1.024,.533h3.79l-1.727,6.044c-.1,.348,.063,.717,.387,.878,.107,.053,.221,.078,.334,.078,.229,0,.454-.106,.6-.3L14.751,7.5c.285-.381,.33-.882,.117-1.309Z" fill="currentColor"></path></g>`,
  O: `<g transform="scale(1.33333)"><path d="M7.25,16.25l2-7H4.466c-.348,0-.589-.346-.469-.672L6.38,2.078c.072-.197,.26-.328,.469-.328h4.17c.352,0,.593,.353,.466,.681l-1.485,3.819h3.75c.412,0,.647,.47,.4,.8l-6.9,9.2Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g>`
});

export { BoltLightning };
export default BoltLightning;
