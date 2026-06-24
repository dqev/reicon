import createIcon from '../createIcon.js';

/**
 * @component
 * @name PinTack
 * @description Reicon SVG icon component, renders SVG Element with children.
 * @preview ![PinTack](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEuMzMzMzMpIj48bGluZSB4MT0iOSIgeTE9IjE2LjI1IiB4Mj0iOSIgeTI9IjEyLjI1IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNGU0ZTciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvbGluZT48cGF0aCBkPSJNMTQuMjUsMTIuMjVjLS4wODktLjY5OS0uMzE4LTEuNzYtLjk2OS0yLjg3NS0uMzM1LS41NzQtLjcwMy0xLjAyOC0xLjAzMS0xLjM3NVYzLjc1YzAtMS4xMDUtLjg5NS0yLTItMmgtMi41Yy0xLjEwNSwwLTIsLjg5NS0yLDJ2NC4yNWMtLjMyOSwuMzQ3LS42OTcsLjgwMS0xLjAzMSwxLjM3NS0uNjUsMS4xMTUtLjg4LDIuMTc2LS45NjksMi44NzVIMTQuMjVaIiBmaWxsPSJub25lIiBzdHJva2U9IiNlNGU0ZTciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvcGF0aD48L2c+PC9zdmc+) - https://reicon.dev/icons/pin-tack
 * @see https://reicon.dev/docs — Documentation
 * @param {import('../createIcon').IconProps} props — Reicon icon props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
const PinTack = createIcon('PinTack', {
  F: `<g transform="scale(1.33333)"><path d="M9,17c-.414,0-.75-.336-.75-.75v-4c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v4c0,.414-.336,.75-.75,.75Z" fill="currentColor"></path><path d="M13.929,8.997c-.266-.456-.578-.888-.929-1.288V3.75c0-1.517-1.233-2.75-2.75-2.75h-2.5c-1.517,0-2.75,1.233-2.75,2.75v3.959c-.352,.4-.663,.832-.929,1.288-.563,.965-.921,2.027-1.065,3.158-.027,.214,.039,.429,.181,.59,.143,.162,.348,.254,.563,.254H14.25c.215,0,.42-.093,.563-.254,.142-.162,.208-.376,.181-.59-.144-1.131-.502-2.193-1.065-3.158Z" fill="currentColor"></path></g>`,
  O: `<g transform="scale(1.33333)"><line x1="9" y1="16.25" x2="9" y2="12.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></line><path d="M14.25,12.25c-.089-.699-.318-1.76-.969-2.875-.335-.574-.703-1.028-1.031-1.375V3.75c0-1.105-.895-2-2-2h-2.5c-1.105,0-2,.895-2,2v4.25c-.329,.347-.697,.801-1.031,1.375-.65,1.115-.88,2.176-.969,2.875H14.25Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g>`
});

export { PinTack };
export default PinTack;
