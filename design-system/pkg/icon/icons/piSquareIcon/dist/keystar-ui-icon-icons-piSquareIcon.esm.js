import { jsxs, jsx } from 'react/jsx-runtime';

const piSquareIcon = /*#__PURE__*/jsxs("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  width: "1em",
  height: "1em",
  children: [/*#__PURE__*/jsx("rect", {
    width: 18,
    height: 18,
    x: 3,
    y: 3,
    rx: 2
  }), /*#__PURE__*/jsx("path", {
    d: "M7 7h10M10 7v10M16 17a2 2 0 0 1-2-2V7"
  })]
});

export { piSquareIcon };