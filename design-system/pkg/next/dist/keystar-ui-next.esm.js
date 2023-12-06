export { NextRootProvider } from '../../dist/NextRootProvider-6dc6a882.esm.js';
import { SCHEME_DARK, SCHEME_LIGHT, SCHEME_AUTO } from '@keystar/ui/primitives';
import { jsx } from 'react/jsx-runtime';
export { useRootColorScheme } from '../../dist/useRootColorScheme-c64055b9.esm.js';

const script = `
let classList = document.documentElement.classList;
let storedPreference = localStorage.getItem('keystatic-root-color-scheme');
let schemeClasses = [...classList].filter((name) => name.includes('scheme'));

if (storedPreference === 'dark') {
  classList.remove(schemeClasses);
  classList.add('${SCHEME_DARK}');
} else if (storedPreference === 'light') {
  classList.remove(schemeClasses);
  classList.add('${SCHEME_LIGHT}');
} else {
  classList.remove(schemeClasses);
  classList.add('${SCHEME_AUTO}');
}
`.replace(/\n|\s{2,}/g, '');

/** @deprecated use `nextRootScript` instead. */
const mediaQueryOnlyColorSchemeScaleScript = /*#__PURE__*/jsx("script", {
  dangerouslySetInnerHTML: {
    __html: script
  }
});
const nextRootScript = /*#__PURE__*/jsx("script", {
  dangerouslySetInnerHTML: {
    __html: script
  }
});

export { mediaQueryOnlyColorSchemeScaleScript, nextRootScript };