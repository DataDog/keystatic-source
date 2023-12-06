'use client';
import { filterDOMProps, useObjectRef, useLayoutEffect, useResizeObserver } from '@react-aria/utils';
import { useStyleProps, useResponsiveValue, classNames, css, filterStyleProps, ClassList, toDataAttributes, tokenSchema, resolvePropWithPath, resolveProp, sizeResolver, transition } from '@keystar/ui/style';
import { jsx } from 'react/jsx-runtime';
import { forwardRefWithAs } from '@keystar/ui/utils/ts';
import { useSeparator } from '@react-aria/separator';
import { useSlotProps } from '@keystar/ui/slots';
import { forwardRef, useState, useCallback, useContext, createContext } from 'react';
import { useGridStyleProps as useGridStyleProps$1 } from './keystar-ui-layout.esm.js';
import { TOKEN_PREFIX } from '@keystar/ui/primitives';

/**
 * Present responsive media, such as images and videos or anything within an
 * iFrame, at a specific aspect ratio.
 */
function AspectRatio(props) {
  const {
    children,
    value,
    ...otherProps
  } = props;
  const styleProps = useStyleProps(otherProps);
  const responsiveValue = useResponsiveValue();
  return /*#__PURE__*/jsx("div", {
    ...filterDOMProps(otherProps),
    className: classNames(css({
      position: 'relative',
      '> *': {
        height: '100%',
        inset: 0,
        position: 'absolute',
        width: '100%'
      }
    }), styleProps.className),
    style: {
      aspectRatio: responsiveValue(value),
      ...styleProps.style
    },
    children: children
  });
}

/** Exposes a prop-based API for adding styles to a view, within the constraints of the theme. */
const Box = forwardRefWithAs((props, forwardedRef) => {
  const {
    elementType: ElementType = 'div',
    children,
    ...otherProps
  } = props;
  const styleProps = useStyleProps(otherProps);
  return /*#__PURE__*/jsx(ElementType, {
    ref: forwardedRef,
    ...filterStyleProps(otherProps),
    ...styleProps,
    children: children
  });
});

const dividerClassList = new ClassList('Divider');
const filterOptions = {
  propNames: new Set(['role'])
};

/**
 * Dividers bring clarity to a layout by grouping and dividing content in close proximity.
 * They can also be used to establish rhythm and hierarchy.
 */
const Divider = forwardRefWithAs((props, forwardedRef) => {
  props = useSlotProps(props, 'divider');
  const {
    orientation = 'horizontal',
    elementType: Element = orientation === 'vertical' ? 'div' : 'hr',
    size = 'regular',
    ...otherProps
  } = props;
  const styleProps = useStyleProps(otherProps);
  let {
    separatorProps
  } = useSeparator({
    ...props,
    // FIXME: `forwardRefWithAs` yields `React.ElementType<any>` which is
    // incompatible with react-aria's expectations for `elementType`.
    elementType: Element
  });
  return /*#__PURE__*/jsx(Element, {
    ...styleProps,
    ...separatorProps,
    ...toDataAttributes({
      orientation,
      size
    }),
    ...filterDOMProps(otherProps, filterOptions),
    ref: forwardedRef,
    className: classNames(dividerClassList.element('root'), css({
      alignSelf: 'stretch',
      backgroundColor: tokenSchema.color.border.neutral,
      borderRadius: 'var(--size)',
      '&[data-size=regular]': {
        '--size': tokenSchema.size.border.regular
      },
      '&[data-size=medium]': {
        '--size': tokenSchema.size.border.medium
      },
      '&[data-size=large]': {
        '--size': tokenSchema.size.border.large
      },
      '&[data-orientation=horizontal]': {
        height: 'var(--size)'
      },
      '&[data-orientation=vertical]': {
        width: 'var(--size)'
      }
    }), styleProps.className)
  });
});

// Resolvers
// ============================================================================

// Shared
// ----------------------------------------------------------------------------

const sharedStyleProps = {
  gap: resolvePropWithPath('gap', 'size.space'),
  columnGap: resolvePropWithPath('columnGap', 'size.space'),
  rowGap: resolvePropWithPath('rowGap', 'size.space'),
  alignContent: resolveProp('alignContent', flexAlignValue),
  alignItems: resolveProp('alignItems', flexAlignValue),
  direction: resolveProp('flexDirection'),
  justifyContent: resolveProp('justifyContent', flexAlignValue)
};
function displayInline(block) {
  // @ts-ignore FIXME: The `StyleResolver` type is not generic enough to support this.
  const resolver = inline => inline ? `inline-${block}` : block;
  return resolver;
}

// Flex
// ----------------------------------------------------------------------------

function useFlexStyleProps(props) {
  return useStyleProps({
    inline: false,
    ...props
  }, flexStyleProps);
}
const flexStyleProps = {
  ...sharedStyleProps,
  direction: resolveProp('flexDirection'),
  inline: resolveProp('display', displayInline('flex')),
  wrap: resolveProp('flexWrap', flexWrapValue)
};

/**
 * Normalize 'start' and 'end' alignment values to 'flex-start' and 'flex-end'
 * in flex containers for browser compatibility.
 */
function flexAlignValue(value) {
  if (value === 'start') {
    return 'flex-start';
  }
  if (value === 'end') {
    return 'flex-end';
  }
  return value;
}
function flexWrapValue(value) {
  if (typeof value === 'boolean') {
    return value ? 'wrap' : 'nowrap';
  }
  return value;
}

// Grid
// ----------------------------------------------------------------------------
function isFractionUnit(value) {
  return value.endsWith('fr');
}
function gridSizeResolver(value) {
  if (typeof value === 'number') {
    return value;
  }
  if (isFractionUnit(value)) {
    return value;
  }
  return sizeResolver(value);
}
function useGridStyleProps(props) {
  return useStyleProps({
    inline: false,
    ...props
  }, gridStyleProps);
}
const gridStyleProps = {
  ...sharedStyleProps,
  inline: resolveProp('display', displayInline('grid')),
  autoFlow: resolveProp('gridAutoFlow'),
  // @ts-ignore FIXME: The `StyleResolver` type is not generic enough to support this.
  autoColumns: resolveProp('gridAutoColumns', sizeResolver),
  // @ts-ignore FIXME: The `StyleResolver` type is not generic enough to support this.
  autoRows: resolveProp('gridAutoRows', sizeResolver),
  // @ts-ignore FIXME: The `StyleResolver` type is not generic enough to support this.
  areas: resolveProp('gridTemplateAreas', gridTemplateAreasValue),
  // @ts-ignore FIXME: The `StyleResolver` type is not generic enough to support this.
  columns: resolveProp('gridTemplateColumns', gridTemplateValue),
  // @ts-ignore FIXME: The `StyleResolver` type is not generic enough to support this.
  rows: resolveProp('gridTemplateRows', gridTemplateValue),
  justifyItems: resolveProp('justifyItems'),
  justifyContent: resolveProp('justifyContent'),
  alignItems: resolveProp('alignItems'),
  alignContent: resolveProp('alignContent')
};
function gridTemplateAreasValue(values) {
  return values.map(value => `"${value}"`).join('\n');
}
function gridTemplateValue(value) {
  if (Array.isArray(value)) {
    return value.map(gridSizeResolver).join(' ');
  }
  return value;
}

// Utils
// ============================================================================

/**
 * Can be used to make a repeating fragment of the columns or rows list.
 * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat).
 * @param count - The number of times to repeat the fragment.
 * @param repeat - The fragment to repeat.
 */
function repeat(count, repeat) {
  return `repeat(${count}, ${gridSizeResolver(repeat)})`;
}

/**
 * Defines a size range greater than or equal to min and less than or equal to max.
 * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/minmax).
 * @param min - The minimum size.
 * @param max - The maximum size.
 */
function minmax(min, max) {
  return `minmax(${gridSizeResolver(min)}, ${gridSizeResolver(max)})`;
}

/**
 * Clamps a given size to an available size.
 * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/fit-content).
 * @param dimension - The size to clamp.
 */
function fitContent(dimension) {
  return `fit-content(${gridSizeResolver(dimension)})`;
}

/**
 * A layout container CSS flex. Keystar UI dimension values provide
 * consistent spacing between items.
 */
const Flex = forwardRefWithAs((props, forwardedRef) => {
  const {
    elementType: ElementType = 'div',
    children,
    ...otherProps
  } = props;
  const styleProps = useFlexStyleProps(otherProps);
  return /*#__PURE__*/jsx(ElementType, {
    ref: forwardedRef,
    ...filterStyleProps(otherProps, Object.keys(flexStyleProps)),
    ...styleProps,
    children: children
  });
});

/**
 * A layout container using CSS grid. Keystar UI dimension values provide
 * consistent sizing and spacing.
 */
const Grid = forwardRefWithAs((props, forwardedRef) => {
  const {
    elementType: ElementType = 'div',
    children,
    ...otherProps
  } = props;
  const styleProps = useGridStyleProps(otherProps);
  return /*#__PURE__*/jsx(ElementType, {
    ref: forwardedRef,
    ...filterStyleProps(otherProps, Object.keys(gridStyleProps)),
    ...styleProps,
    children: children
  });
});

const ScrollView = /*#__PURE__*/forwardRef(function ScrollView(props, forwardedRef) {
  let {
    children,
    direction = 'vertical',
    ...otherProps
  } = props;
  let ref = useObjectRef(forwardedRef);
  let [scrollIndicator, setScrollIndicator] = useState('none');
  let styleProps = useGridStyleProps$1(otherProps);
  let updateScrollPosition = useCallback(() => {
    let node = ref.current;
    if (!node) {
      return;
    }
    let {
      clientDimension,
      scrollDimension,
      scrollStart
    } = getScrollProps(direction, node);
    let indicator = 'none';
    if (scrollDimension > clientDimension) {
      if (scrollStart === 0) {
        indicator = 'end';
      } else if (Math.ceil(scrollStart + clientDimension) >= scrollDimension) {
        indicator = 'start';
      } else if (scrollStart > 0) {
        indicator = 'both';
      }
    }
    setScrollIndicator(indicator);
  }, [direction, ref]);
  useLayoutEffect(() => {
    updateScrollPosition();
  }, [updateScrollPosition]);
  useResizeObserver({
    ref,
    onResize: updateScrollPosition
  });

  // TODO: this is overly complex. switch from pseudo-elements to borders. move
  // to "layout" package and accept box style props
  return /*#__PURE__*/jsx("div", {
    ...styleProps,
    ...filterDOMProps(props),
    onScroll: updateScrollPosition,
    ref: ref,
    "data-scroll-indicator": scrollIndicator,
    "data-scroll-direction": direction,
    className: classNames(css({
      height: '100%',
      width: '100%',
      minHeight: 0,
      minWidth: 0,
      transition: transition('border-color', {
        duration: 'regular'
      }),
      WebkitOverflowScrolling: 'touch',
      '&[data-scroll-direction=vertical]': {
        borderBlock: `${tokenSchema.size.border.regular} solid transparent`,
        // marginBlock: `calc(${tokenSchema.size.border.regular} * -1)`,
        overflowX: 'hidden',
        overflowY: 'auto',
        '&[data-scroll-indicator=both]': {
          borderBlockColor: tokenSchema.color.border.neutral
        },
        '&[data-scroll-indicator=start]': {
          borderBlockStartColor: tokenSchema.color.border.neutral
        },
        '&[data-scroll-indicator=end]': {
          borderBlockEndColor: tokenSchema.color.border.neutral
        }
      },
      '&[data-scroll-direction=horizontal]': {
        borderInline: `${tokenSchema.size.border.regular} solid transparent`,
        // marginInline: `calc(${tokenSchema.size.border.regular} * -1)`,
        gridAutoFlow: 'column',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&[data-scroll-indicator=both]': {
          borderInlineColor: tokenSchema.color.border.neutral
        },
        '&[data-scroll-indicator=start]': {
          borderInlineStartColor: tokenSchema.color.border.neutral
        },
        '&[data-scroll-indicator=end]': {
          borderInlineEndColor: tokenSchema.color.border.neutral
        }
      }
    }), styleProps.className),
    children: children
  });
});
function getScrollProps(direction, node) {
  let scrollStart = direction === 'horizontal' ? node.scrollLeft : node.scrollTop;
  let scrollDimension = direction === 'horizontal' ? node.scrollWidth : node.scrollHeight;
  let clientDimension = direction === 'horizontal' ? node.clientWidth : node.clientHeight;
  return {
    clientDimension,
    scrollDimension,
    scrollStart
  };
}

/** A thin wrapper around `Flex`, for stacking elements vertically. */
const VStack = forwardRefWithAs((props, forwardedRef) => {
  const {
    elementType: ElementType = 'div',
    children,
    ...otherProps
  } = props;
  const styleProps = useFlexStyleProps({
    direction: 'column',
    ...otherProps
  });
  return /*#__PURE__*/jsx(ElementType, {
    ref: forwardedRef,
    ...filterStyleProps(otherProps, Object.keys(flexStyleProps)),
    ...styleProps,
    children: children
  });
});

/** A thin wrapper around `Flex`, for stacking elements horizontally. */
const HStack = forwardRefWithAs((props, forwardedRef) => {
  const {
    elementType: ElementType = 'div',
    children,
    ...otherProps
  } = props;
  const styleProps = useFlexStyleProps({
    direction: 'row',
    ...otherProps
  });
  return /*#__PURE__*/jsx(ElementType, {
    ref: forwardedRef,
    ...filterStyleProps(otherProps, Object.keys(flexStyleProps)),
    ...styleProps,
    children: children
  });
});

const levels = ['one', 'two', 'three'];
const MAX_LEVEL = levels.length - 1;
// CONTEXT

const SurfaceContext = /*#__PURE__*/createContext(1);

/**
 * Get information about the current surface. Use to
 * pull from the `level` for the surface of the invoking component.
 */
function useSurface() {
  const level = useContext(SurfaceContext);
  return {
    level
  };
}

// COMPONENT

/**
 * A surface contains UI in an isolated container, a bit like CSS stacking
 * contexts. Use surfaces to create interfaces that are related to but distinct
 * from those around them.
 */
const Surface = forwardRefWithAs((props, forwardedRef) => {
  const {
    elementType: ElementType = 'div',
    children,
    level: overrideLevel,
    ...otherProps
  } = props;
  const contextLevel = useContext(SurfaceContext);
  const level = overrideLevel !== null && overrideLevel !== void 0 ? overrideLevel : contextLevel;
  const levelClassName = `${TOKEN_PREFIX}--surface-${levels[level]}`;
  const value = Math.max(0, Math.min(level + 1, MAX_LEVEL));
  const styleProps = useStyleProps(otherProps);
  return /*#__PURE__*/jsx(SurfaceContext.Provider, {
    value: value,
    children: /*#__PURE__*/jsx(ElementType, {
      ref: forwardedRef,
      ...filterStyleProps(otherProps),
      ...styleProps,
      className: classNames(levelClassName, styleProps.className),
      children: children
    })
  });
});

export { AspectRatio, Box, Divider, Flex, Grid, HStack, ScrollView, Surface, VStack, fitContent, minmax, repeat, useFlexStyleProps, useGridStyleProps, useSurface };