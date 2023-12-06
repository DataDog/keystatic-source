'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var NextRootProvider = require('../../dist/NextRootProvider-48416700.cjs.js');
var primitives = require('@keystar/ui/primitives');
var jsxRuntime = require('react/jsx-runtime');
var useRootColorScheme = require('../../dist/useRootColorScheme-7bff500e.cjs.js');

const script = `
let classList = document.documentElement.classList;
let storedPreference = localStorage.getItem('keystatic-root-color-scheme');
let schemeClasses = [...classList].filter((name) => name.includes('scheme'));

if (storedPreference === 'dark') {
  classList.remove(schemeClasses);
  classList.add('${primitives.SCHEME_DARK}');
} else if (storedPreference === 'light') {
  classList.remove(schemeClasses);
  classList.add('${primitives.SCHEME_LIGHT}');
} else {
  classList.remove(schemeClasses);
  classList.add('${primitives.SCHEME_AUTO}');
}
`.replace(/\n|\s{2,}/g, '');

/** @deprecated use `nextRootScript` instead. */
const mediaQueryOnlyColorSchemeScaleScript = /*#__PURE__*/jsxRuntime.jsx("script", {
  dangerouslySetInnerHTML: {
    __html: script
  }
});
const nextRootScript = /*#__PURE__*/jsxRuntime.jsx("script", {
  dangerouslySetInnerHTML: {
    __html: script
  }
});

Object.defineProperty(exports, 'NextRootProvider', {
  enumerable: true,
  get: function () { return NextRootProvider.NextRootProvider; }
});
Object.defineProperty(exports, 'useRootColorScheme', {
  enumerable: true,
  get: function () { return useRootColorScheme.useRootColorScheme; }
});
exports.mediaQueryOnlyColorSchemeScaleScript = mediaQueryOnlyColorSchemeScaleScript;
exports.nextRootScript = nextRootScript;
