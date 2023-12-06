import { jsxs, jsx } from 'react/jsx-runtime';

const currencyIcon = /*#__PURE__*/jsxs("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  width: "1em",
  height: "1em",
  children: [/*#__PURE__*/jsx("circle", {
    cx: 12,
    cy: 12,
    r: 8
  }), /*#__PURE__*/jsx("path", {
    d: "m3 3 3 3M21 3l-3 3M3 21l3-3M21 21l-3-3"
  })]
});

export { currencyIcon };
