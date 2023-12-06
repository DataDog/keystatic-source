'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@react-aria/utils');
var style = require('@keystar/ui/style');
var jsxRuntime = require('react/jsx-runtime');
var ts = require('@keystar/ui/utils/ts');
var separator = require('@react-aria/separator');
var slots = require('@keystar/ui/slots');
var React = require('react');
var index = require('./keystar-ui-layout.cjs.js');
var primitives = require('@keystar/ui/primitives');

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
  const styleProps = style.useStyleProps(otherProps);
  const responsiveValue = style.useResponsiveValue();
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...utils.filterDOMProps(otherProps),
    className: style.classNames(style.css({
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
const Box = ts.forwardRefWithAs((props, forwardedRef) => {
  const {
    elementType: ElementType = 'div',
    children,
    ...otherProps
  } = props;
  const styleProps = style.useStyleProps(otherProps);
  return /*#__PURE__*/jsxRuntime.jsx(ElementType, {
    ref: forwardedRef,
    ...style.filterStyleProps(otherProps),
    ...styleProps,
    children: children
  });
});

const dividerClassList = new style.ClassList('Divider');
const filterOptions = {
  propNames: new Set(['role'])
};

/**
 * Dividers bring clarity to a layout by grouping and dividing content in close proximity.
 * They can also be used to establish rhythm and hierarchy.
 */
const Divider = ts.forwardRefWithAs((props, forwardedRef) => {
  props = slots.useSlotProps(props, 'divider');
  const {
    orientation = 'horizontal',
    elementType: Element = orientation === 'vertical' ? 'div' : 'hr',
    size = 'regular',
    ...otherProps
  } = props;
  const styleProps = style.useStyleProps(otherProps);
  let {
    separatorProps
  } = separator.useSeparator({
    ...props,
    // FIXME: `forwardRefWithAs` yields `React.ElementType<any>` which is
    // incompatible with react-aria's expectations for `elementType`.
    elementType: Element
  });
  return /*#__PURE__*/jsxRuntime.jsx(Element, {
    ...styleProps,
    ...separatorProps,
    ...style.toDataAttributes({
      orientation,
      size
    }),
    ...utils.filterDOMProps(otherProps, filterOptions),
    ref: forwardedRef,
    className: style.classNames(dividerClassList.element('root'), style.css({
      alignSelf: 'stretch',
      backgroundColor: style.tokenSchema.color.border.neutral,
      borderRadius: 'var(--size)',
      '&[data-size=regular]': {
        '--size': style.tokenSchema.size.border.regular
      },
      '&[data-size=medium]': {
        '--size': style.tokenSchema.size.border.medium
      },
      '&[data-size=large]': {
        '--size': style.tokenSchema.size.border.large
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
  gap: style.resolvePropWithPath('gap', 'size.space'),
  columnGap: style.resolvePropWithPath('columnGap', 'size.space'),
  rowGap: style.resolvePropWithPath('rowGap', 'size.space'),
  alignContent: style.resolveProp('alignContent', flexAlignValue),
  alignItems: style.resolveProp('alignItems', flexAlignValue),
  direction: style.resolveProp('flexDirection'),
  justifyContent: style.resolveProp('justifyContent', flexAlignValue)
};
function displayInline(block) {
  // @ts-ignore FIXME: The `StyleResolver` type is not generic enough to support this.
  const resolver = inline => inline ? `inline-${block}` : block;
  return resolver;
}

// Flex
// ----------------------------------------------------------------------------

function useFlexStyleProps(props) {
  return style.useStyleProps({
    inline: false,
    ...props
  }, flexStyleProps);
}
const flexStyleProps = {
  ...sharedStyleProps,
  direction: style.resolveProp('flexDirection'),
  inline: style.resolveProp('display', displayInline('flex')),
  wrap: style.resolveProp('flexWrap', flexWrapValue)
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
  return style.sizeResolver(value);
}
function useGridStyleProps(props) {
  return style.useStyleProps({
    inline: false,
    ...props
  }, gridStyleProps);
}
const gridStyleProps = {
  ...sharedStyleProps,
  inline: style.resolveProp('display', displayInline('grid')),
  autoFlow: style.resolveProp('gridAutoFlow'),
  // @ts-ignore FIXME: The `StyleResolver` type is not generic enough to support this.
  autoColumns: style.resolveProp('gridAutoColumns', style.sizeResolver),
  // @ts-ignore FIXME: The `StyleResolver` type is not generic enough to support this.
  autoRows: style.resolveProp('gridAutoRows', style.sizeResolver),
  // @ts-ignore FIXME: The `StyleResolver` type is not generic enough to support this.
  areas: style.resolveProp('gridTemplateAreas', gridTemplateAreasValue),
  // @ts-ignore FIXME: The `StyleResolver` type is not generic enough to support this.
  columns: style.resolveProp('gridTemplateColumns', gridTemplateValue),
  // @ts-ignore FIXME: The `StyleResolver` type is not generic enough to support this.
  rows: style.resolveProp('gridTemplateRows', gridTemplateValue),
  justifyItems: style.resolveProp('justifyItems'),
  justifyContent: style.resolveProp('justifyContent'),
  alignItems: style.resolveProp('alignItems'),
  alignContent: style.resolveProp('alignContent')
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
const Flex = ts.forwardRefWithAs((props, forwardedRef) => {
  const {
    elementType: ElementType = 'div',
    children,
    ...otherProps
  } = props;
  const styleProps = useFlexStyleProps(otherProps);
  return /*#__PURE__*/jsxRuntime.jsx(ElementType, {
    ref: forwardedRef,
    ...style.filterStyleProps(otherProps, Object.keys(flexStyleProps)),
    ...styleProps,
    children: children
  });
});

/**
 * A layout container using CSS grid. Keystar UI dimension values provide
 * consistent sizing and spacing.
 */
const Grid = ts.forwardRefWithAs((props, forwardedRef) => {
  const {
    elementType: ElementType = 'div',
    children,
    ...otherProps
  } = props;
  const styleProps = useGridStyleProps(otherProps);
  return /*#__PURE__*/jsxRuntime.jsx(ElementType, {
    ref: forwardedRef,
    ...style.filterStyleProps(otherProps, Object.keys(gridStyleProps)),
    ...styleProps,
    children: children
  });
});

const ScrollView = /*#__PURE__*/React.forwardRef(function ScrollView(props, forwardedRef) {
  let {
    children,
    direction = 'vertical',
    ...otherProps
  } = props;
  let ref = utils.useObjectRef(forwardedRef);
  let [scrollIndicator, setScrollIndicator] = React.useState('none');
  let styleProps = index.useGridStyleProps(otherProps);
  let updateScrollPosition = React.useCallback(() => {
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
  utils.useLayoutEffect(() => {
    updateScrollPosition();
  }, [updateScrollPosition]);
  utils.useResizeObserver({
    ref,
    onResize: updateScrollPosition
  });

  // TODO: this is overly complex. switch from pseudo-elements to borders. move
  // to "layout" package and accept box style props
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...styleProps,
    ...utils.filterDOMProps(props),
    onScroll: updateScrollPosition,
    ref: ref,
    "data-scroll-indicator": scrollIndicator,
    "data-scroll-direction": direction,
    className: style.classNames(style.css({
      height: '100%',
      width: '100%',
      minHeight: 0,
      minWidth: 0,
      transition: style.transition('border-color', {
        duration: 'regular'
      }),
      WebkitOverflowScrolling: 'touch',
      '&[data-scroll-direction=vertical]': {
        borderBlock: `${style.tokenSchema.size.border.regular} solid transparent`,
        // marginBlock: `calc(${tokenSchema.size.border.regular} * -1)`,
        overflowX: 'hidden',
        overflowY: 'auto',
        '&[data-scroll-indicator=both]': {
          borderBlockColor: style.tokenSchema.color.border.neutral
        },
        '&[data-scroll-indicator=start]': {
          borderBlockStartColor: style.tokenSchema.color.border.neutral
        },
        '&[data-scroll-indicator=end]': {
          borderBlockEndColor: style.tokenSchema.color.border.neutral
        }
      },
      '&[data-scroll-direction=horizontal]': {
        borderInline: `${style.tokenSchema.size.border.regular} solid transparent`,
        // marginInline: `calc(${tokenSchema.size.border.regular} * -1)`,
        gridAutoFlow: 'column',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&[data-scroll-indicator=both]': {
          borderInlineColor: style.tokenSchema.color.border.neutral
        },
        '&[data-scroll-indicator=start]': {
          borderInlineStartColor: style.tokenSchema.color.border.neutral
        },
        '&[data-scroll-indicator=end]': {
          borderInlineEndColor: style.tokenSchema.color.border.neutral
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
const VStack = ts.forwardRefWithAs((props, forwardedRef) => {
  const {
    elementType: ElementType = 'div',
    children,
    ...otherProps
  } = props;
  const styleProps = useFlexStyleProps({
    direction: 'column',
    ...otherProps
  });
  return /*#__PURE__*/jsxRuntime.jsx(ElementType, {
    ref: forwardedRef,
    ...style.filterStyleProps(otherProps, Object.keys(flexStyleProps)),
    ...styleProps,
    children: children
  });
});

/** A thin wrapper around `Flex`, for stacking elements horizontally. */
const HStack = ts.forwardRefWithAs((props, forwardedRef) => {
  const {
    elementType: ElementType = 'div',
    children,
    ...otherProps
  } = props;
  const styleProps = useFlexStyleProps({
    direction: 'row',
    ...otherProps
  });
  return /*#__PURE__*/jsxRuntime.jsx(ElementType, {
    ref: forwardedRef,
    ...style.filterStyleProps(otherProps, Object.keys(flexStyleProps)),
    ...styleProps,
    children: children
  });
});

const levels = ['one', 'two', 'three'];
const MAX_LEVEL = levels.length - 1;
// CONTEXT

const SurfaceContext = /*#__PURE__*/React.createContext(1);

/**
 * Get information about the current surface. Use to
 * pull from the `level` for the surface of the invoking component.
 */
function useSurface() {
  const level = React.useContext(SurfaceContext);
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
const Surface = ts.forwardRefWithAs((props, forwardedRef) => {
  const {
    elementType: ElementType = 'div',
    children,
    level: overrideLevel,
    ...otherProps
  } = props;
  const contextLevel = React.useContext(SurfaceContext);
  const level = overrideLevel !== null && overrideLevel !== void 0 ? overrideLevel : contextLevel;
  const levelClassName = `${primitives.TOKEN_PREFIX}--surface-${levels[level]}`;
  const value = Math.max(0, Math.min(level + 1, MAX_LEVEL));
  const styleProps = style.useStyleProps(otherProps);
  return /*#__PURE__*/jsxRuntime.jsx(SurfaceContext.Provider, {
    value: value,
    children: /*#__PURE__*/jsxRuntime.jsx(ElementType, {
      ref: forwardedRef,
      ...style.filterStyleProps(otherProps),
      ...styleProps,
      className: style.classNames(levelClassName, styleProps.className),
      children: children
    })
  });
});

exports.AspectRatio = AspectRatio;
exports.Box = Box;
exports.Divider = Divider;
exports.Flex = Flex;
exports.Grid = Grid;
exports.HStack = HStack;
exports.ScrollView = ScrollView;
exports.Surface = Surface;
exports.VStack = VStack;
exports.fitContent = fitContent;
exports.minmax = minmax;
exports.repeat = repeat;
exports.useFlexStyleProps = useFlexStyleProps;
exports.useGridStyleProps = useGridStyleProps;
exports.useSurface = useSurface;