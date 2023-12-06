'use client';
import { cache } from '@keystar/ui/style';
import { KeystarProvider } from '@keystar/ui/core';
import { useServerInsertedHTML, useRouter } from 'next/navigation';
import { useRef, useMemo } from 'react';
import { ColorSchemeProvider, useRootColorScheme } from './useRootColorScheme-c64055b9.esm.js';
import { jsx } from 'react/jsx-runtime';

cache.compat = true;
function NextRootProvider(props) {
  return /*#__PURE__*/jsx(ColorSchemeProvider, {
    children: /*#__PURE__*/jsx(InnerProvider, {
      ...props
    })
  });
}
const insertedKeys = Object.keys(cache.inserted);
const prevInsert = cache.insert;
cache.insert = (...args) => {
  const serialized = args[1];
  if (cache.inserted[serialized.name] === undefined) {
    insertedKeys.push(serialized.name);
  }
  return prevInsert(...args);
};
function InnerProvider(props) {
  let lastIndexRef = useRef(0);
  let {
    colorScheme
  } = useRootColorScheme();
  useServerInsertedHTML(() => {
    const names = insertedKeys.slice(lastIndexRef.current);
    lastIndexRef.current = insertedKeys.length;
    if (names.length === 0) return null;
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return /*#__PURE__*/jsx("style", {
      "data-emotion": `${cache.key} ${names.join(' ')}`,
      dangerouslySetInnerHTML: {
        __html: styles
      }
    }, Math.random().toString(36));
  });
  const {
    push: navigate
  } = useRouter();
  const router = useMemo(() => {
    return {
      navigate
    };
  }, [navigate]);
  return /*#__PURE__*/jsx(KeystarProvider, {
    ...props,
    UNSAFE_className: props.fontClassName,
    colorScheme: colorScheme,
    elementType: "html",
    router: router
  });
}

export { NextRootProvider };