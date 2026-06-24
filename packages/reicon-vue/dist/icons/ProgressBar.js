import createIcon from '../createIcon.js';

/**
 * @component
 * @name ProgressBar
 * @description Reicon Vue icon component, renders an SVG Element.
 * @preview ![ProgressBar](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEuMzMzMzMpIj48bGluZSB4MT0iMy43NSIgeTE9IjExLjc1IiB4Mj0iOSIgeTI9IjExLjc1IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNGU0ZTciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvbGluZT48cmVjdCB4PSIuNzUiIHk9IjguNzUiIHdpZHRoPSIxNi41IiBoZWlnaHQ9IjYiIHJ4PSIzIiByeT0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTRlNGU3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij48L3JlY3Q+PHBhdGggZD0iTTkuNDA0LDUuMDUybDEuNzU3LTIuNTNjLjIyNi0uMzI2LS4wMDctLjc3Mi0uNDA0LS43NzJoLTMuNTEzYy0uMzk3LDAtLjYzLC40NDYtLjQwNCwuNzcybDEuNzU3LDIuNTNjLjE5NiwuMjgyLC42MTIsLjI4MiwuODA4LDBaIiBmaWxsPSJub25lIiBzdHJva2U9IiNlNGU0ZTciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvcGF0aD48L2c+PC9zdmc+) - https://reicon.dev/icons/progress-bar
 * @see https://reicon.dev/docs — Documentation
 */
const ProgressBar = createIcon('ProgressBar', {
  F: `<g transform="scale(1.33333)"><path d="M14.25,8H3.75c-2.068,0-3.75,1.682-3.75,3.75s1.682,3.75,3.75,3.75H14.25c2.068,0,3.75-1.682,3.75-3.75s-1.682-3.75-3.75-3.75Zm-5.25,4.5H3.75c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h5.25c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z" fill="currentColor"></path><path d="M9,6c-.413,0-.798-.201-1.029-.537l-1.757-2.554c-.258-.375-.285-.858-.069-1.259s.637-.651,1.099-.651h3.512c.461,0,.882,.249,1.099,.651s.189,.884-.069,1.259l-1.756,2.553s0,0,0,0c-.231,.336-.616,.537-1.029,.537Zm.412-.949h0Z" fill="currentColor"></path></g>`,
  O: `<g transform="scale(1.33333)"><line x1="3.75" y1="11.75" x2="9" y2="11.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></line><rect x=".75" y="8.75" width="16.5" height="6" rx="3" ry="3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></rect><path d="M9.404,5.052l1.757-2.53c.226-.326-.007-.772-.404-.772h-3.513c-.397,0-.63,.446-.404,.772l1.757,2.53c.196,.282,.612,.282,.808,0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g>`
});

export { ProgressBar };
export default ProgressBar;
