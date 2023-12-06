import { jsxs, jsx } from 'react/jsx-runtime';

const microwaveIcon = /*#__PURE__*/jsxs("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  width: "1em",
  height: "1em",
  children: [/*#__PURE__*/jsx("rect", {
    width: 20,
    height: 15,
    x: 2,
    y: 4,
    rx: 2
  }), /*#__PURE__*/jsx("rect", {
    width: 8,
    height: 7,
    x: 6,
    y: 8,
    rx: 1
  }), /*#__PURE__*/jsx("path", {
    d: "M18 8v7M6 19v2M18 19v2"
  })]
});

export { microwaveIcon };
