import { jsxs, jsx } from 'react/jsx-runtime';

const splineIcon = /*#__PURE__*/jsxs("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  width: "1em",
  height: "1em",
  children: [/*#__PURE__*/jsx("circle", {
    cx: 19,
    cy: 5,
    r: 2
  }), /*#__PURE__*/jsx("circle", {
    cx: 5,
    cy: 19,
    r: 2
  }), /*#__PURE__*/jsx("path", {
    d: "M5 17A12 12 0 0 1 17 5"
  })]
});

export { splineIcon };
