import createIcon from '../createIcon.js';

/**
 * @component
 * @name Tags
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![Tags](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEuMzMzMzMpIj48cGF0aCBkPSJtMi4yNSw0LjI1aDUuNTg2Yy4yNjUsMCwuNTIuMTA1LjcwNy4yOTNsNS4xMDY1LDUuMTA2NWMuNzgxLjc4MS43ODEsMi4wNDcsMCwyLjgyOGwtMy4xNzIsMy4xNzJjLS43ODEuNzgxLTIuMDQ3Ljc4MS0yLjgyOCwwbC01LjEwNjUtNS4xMDY1Yy0uMTg4LS4xODgtLjI5My0uNDQyLS4yOTMtLjcwN3YtNS41ODZaIiBmaWxsPSJub25lIiBzdHJva2U9IiNlNGU0ZTciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvcGF0aD48cGF0aCBkPSJtMy43NSwxLjI1aDUuNTg2Yy4yNjUsMCwuNTIuMTA1LjcwNy4yOTNsNS43NzA1LDUuNzcwNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTRlNGU3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij48L3BhdGg+PGNpcmNsZSBjeD0iNS43NSIgY3k9IjcuNzUiIHI9IjEuMjUiIGZpbGw9IiNlNGU0ZTciID48L2NpcmNsZT48L2c+PC9zdmc+) - https://reicon.dev/icons/tags
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const Tags = createIcon('Tags', {
  F: `<g transform="scale(1.33333)"><path d="m15.8135,8.0635c-.1924,0-.3838-.0732-.5303-.2197l-5.7705-5.7705c-.0469-.0474-.1104-.0732-.1768-.0732H3.75c-.4141,0-.75-.3359-.75-.75s.3359-.75.75-.75h5.5859c.4629,0,.915.1875,1.2393.5146l5.7686,5.7686c.293.293.293.7676,0,1.0605-.1465.1465-.3379.2197-.5303.2197Z" fill="currentColor" ></path><path d="m14.1797,9.1191l-5.1045-5.1045c-.3242-.3271-.7764-.5146-1.2393-.5146H2.25c-.4141,0-.75.3359-.75.75v5.5859c0,.4663.1816.9058.5127,1.2373l5.1064,5.1064c.5361.5361,1.2402.8042,1.9443.8042s1.4082-.2681,1.9443-.8042l3.1719-3.1719c1.0723-1.0723,1.0723-2.8164,0-3.8887Zm-8.4297-.1191c-.6904,0-1.25-.5596-1.25-1.25s.5596-1.25,1.25-1.25,1.25.5596,1.25,1.25-.5596,1.25-1.25,1.25Z" fill="currentColor"></path></g>`,
  O: `<g transform="scale(1.33333)"><path d="m2.25,4.25h5.586c.265,0,.52.105.707.293l5.1065,5.1065c.781.781.781,2.047,0,2.828l-3.172,3.172c-.781.781-2.047.781-2.828,0l-5.1065-5.1065c-.188-.188-.293-.442-.293-.707v-5.586Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="m3.75,1.25h5.586c.265,0,.52.105.707.293l5.7705,5.7705" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><circle cx="5.75" cy="7.75" r="1.25" fill="currentColor" ></circle></g>`
});

export { Tags };
export default Tags;
