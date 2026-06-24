import createIcon from '../createIcon.js';

/**
 * @component
 * @name PuzzlePiece
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![PuzzlePiece](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEuMzMzMzMpIj48cGF0aCBkPSJNMTQuNzUsOC4yNWMuMzcyLDAsLjcxNiwuMTE4LDEsLjMxN3YtMi4zMTdjMC0xLjEwNC0uODk1LTItMi0yaC0yLjMxN2MuMTk4LS4yODQsLjMxNy0uNjI3LC4zMTctMSwwLS45NjctLjc4NC0xLjc1LTEuNzUtMS43NXMtMS43NSwuNzgzLTEuNzUsMS43NWMwLC4zNzMsLjExOCwuNzE2LC4zMTcsMWgtMi4zMTdjLTEuMTA1LDAtMiwuODk2LTIsMnYyLjMxN2MtLjI4NC0uMTk4LS42MjgtLjMxNy0xLS4zMTctLjk2NiwwLTEuNzUsLjc4My0xLjc1LDEuNzVzLjc4NCwxLjc1LDEuNzUsMS43NWMuMzcyLDAsLjcxNi0uMTE4LDEtLjMxN3YyLjMxN2MwLDEuMTA0LC44OTUsMiwyLDJoMi4zMTdjLS4xOTgtLjI4NC0uMzE3LS42MjctLjMxNy0xLDAtLjk2NywuNzg0LTEuNzUsMS43NS0xLjc1czEuNzUsLjc4MywxLjc1LDEuNzVjMCwuMzczLS4xMTgsLjcxNi0uMzE3LDFoMi4zMTdjMS4xMDUsMCwyLS44OTYsMi0ydi0yLjMxN2MtLjI4NCwuMTk4LS42MjgsLjMxNy0xLC4zMTctLjk2NiwwLTEuNzUtLjc4My0xLjc1LTEuNzVzLjc4NC0xLjc1LDEuNzUtMS43NVoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U0ZTRlNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSI+PC9wYXRoPjwvZz48L3N2Zz4=) - https://reicon.dev/icons/puzzle-piece
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const PuzzlePiece = createIcon('PuzzlePiece', {
  F: `<g transform="scale(1.33333)"><path d="M15.414,8.665c.233,.117,.509,.104,.73-.032,.221-.137,.356-.378,.356-.638v-1.744c0-1.517-1.233-2.75-2.75-2.75h-1.775c.01-.083,.025-.164,.025-.25,0-1.103-.897-2-2-2s-2,.897-2,2c0,.086,.015,.167,.025,.25h-1.775c-1.517,0-2.75,1.233-2.75,2.75v1.775c-.083-.011-.164-.025-.25-.025-1.103,0-2,.897-2,2s.897,2,2,2c.086,0,.167-.015,.25-.025v1.775c0,1.517,1.233,2.75,2.75,2.75h1.744c.26,0,.501-.135,.638-.355,.136-.221,.149-.498,.033-.73-.109-.219-.165-.442-.165-.665,0-.827,.673-1.5,1.5-1.5s1.5,.673,1.5,1.5c0,.221-.056,.445-.166,.666-.116,.232-.103,.508,.034,.729,.137,.221,.378,.355,.638,.355h1.744c1.517,0,2.75-1.233,2.75-2.75v-1.744c0-.26-.135-.501-.356-.638s-.498-.15-.73-.032c-1.027,.515-2.164-.285-2.164-1.335,0-1.05,1.134-1.85,2.164-1.335Z" fill="currentColor"></path></g>`,
  O: `<g transform="scale(1.33333)"><path d="M14.75,8.25c.372,0,.716,.118,1,.317v-2.317c0-1.104-.895-2-2-2h-2.317c.198-.284,.317-.627,.317-1,0-.967-.784-1.75-1.75-1.75s-1.75,.783-1.75,1.75c0,.373,.118,.716,.317,1h-2.317c-1.105,0-2,.896-2,2v2.317c-.284-.198-.628-.317-1-.317-.966,0-1.75,.783-1.75,1.75s.784,1.75,1.75,1.75c.372,0,.716-.118,1-.317v2.317c0,1.104,.895,2,2,2h2.317c-.198-.284-.317-.627-.317-1,0-.967,.784-1.75,1.75-1.75s1.75,.783,1.75,1.75c0,.373-.118,.716-.317,1h2.317c1.105,0,2-.896,2-2v-2.317c-.284,.198-.628,.317-1,.317-.966,0-1.75-.783-1.75-1.75s.784-1.75,1.75-1.75Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g>`
});

export { PuzzlePiece };
export default PuzzlePiece;
