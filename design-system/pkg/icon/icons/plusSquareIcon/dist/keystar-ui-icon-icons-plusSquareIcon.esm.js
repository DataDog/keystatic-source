import { jsxs, jsx } from 'react/jsx-runtime';

const plusSquareIcon = /*#__PURE__*/jsxs("svg", {
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
    rx: 2,
    ry: 2
  }), /*#__PURE__*/jsx("path", {
    d: "M12 8v8M8 12h8"
  })]
});

export { plusSquareIcon };
