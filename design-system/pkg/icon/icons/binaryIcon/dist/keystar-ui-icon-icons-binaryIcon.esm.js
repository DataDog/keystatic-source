import { jsxs, jsx } from 'react/jsx-runtime';

const binaryIcon = /*#__PURE__*/jsxs("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  width: "1em",
  height: "1em",
  children: [/*#__PURE__*/jsx("rect", {
    x: 14,
    y: 14,
    width: 4,
    height: 6,
    rx: 2
  }), /*#__PURE__*/jsx("rect", {
    x: 6,
    y: 4,
    width: 4,
    height: 6,
    rx: 2
  }), /*#__PURE__*/jsx("path", {
    d: "M6 20h4M14 10h4M6 14h2v6M14 4h2v6"
  })]
});

export { binaryIcon };