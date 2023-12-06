'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var slots = require('@keystar/ui/slots');
var ts = require('@keystar/ui/utils/ts');
var style = require('@keystar/ui/style');
var utils = require('@keystar/ui/utils');
var jsxRuntime = require('react/jsx-runtime');
var visuallyHidden = require('@react-aria/visually-hidden');
var utils$1 = require('@react-aria/utils');
var emery = require('emery');
var i18n = require('@react-aria/i18n');

const HeadingContext = /*#__PURE__*/React.createContext(undefined);
function useHeadingContext() {
  return React.useContext(HeadingContext);
}

// 'medium' is arbitrary, we just want the shape
/**
 * Using [capsize](https://seek-oss.github.io/capsize/), get the leading-trim
 * styles for a text element.
 */
function getTrimStyles(fontDefinition) {
  const {
    capheightTrim: marginBottom,
    baselineTrim: marginTop
  } = fontDefinition;
  return {
    display: 'block',
    lineHeight: fontDefinition.lineheight,
    '::before': {
      content: '" "',
      display: 'table',
      marginBottom
    },
    '::after': {
      content: '" "',
      display: 'table',
      marginTop
    }
  };
}

const TextContext = /*#__PURE__*/React.createContext(undefined);
function useTextContext() {
  return React.useContext(TextContext);
}

const textClassList = new style.ClassList('Text');
function useTextStyles(props) {
  const prevContext = useTextContext();
  const {
    align,
    casing,
    overflow = 'breakword',
    size,
    color,
    trim = !prevContext,
    variant,
    weight,
    UNSAFE_className,
    ...otherProps
  } = props;
  const fontDefinition = style.tokenSchema.typography.text[size];
  const trimStyles = trim ? getTrimStyles(fontDefinition) : null;
  const styles = [{
    color: style.maybeTokenByKey('color.foreground', color),
    fontFamily: style.tokenSchema.typography.fontFamily.base,
    fontSize: fontDefinition.size,
    fontVariantNumeric: variant,
    fontWeight: weight === 'inherit' ? undefined : style.tokenSchema.typography.fontWeight[weight],
    minWidth: 0,
    textAlign: align ? alignmentMap[align] : undefined,
    textTransform: casing
  }, textOptimizationStyles, overflow && overflowMap[overflow], trimStyles];
  return style.useStyleProps({
    ...otherProps,
    UNSAFE_className: [style.css(styles), UNSAFE_className, textClassList.element('root')]
  });
}

// Constants
// ----------------------------------------------------------------------------

const textOptimizationStyles = {
  MozOsxFontSmoothing: 'auto',
  WebkitFontSmoothing: 'auto'
};
const alignmentMap = {
  start: 'start',
  center: 'center',
  end: 'end',
  FORCE_left: 'left',
  FORCE_right: 'right'
};
const overflowMap = {
  unset: {},
  nowrap: {
    whiteSpace: 'nowrap'
  },
  breakword: {
    // hyphens: 'auto', // too eager
    overflowWrap: 'break-word'
  }
};

const headingClassList = new style.ClassList('Heading');
function useHeadingStyles({
  align,
  size,
  UNSAFE_className,
  ...otherProps
}) {
  const fontDefinition = style.tokenSchema.typography.heading[size];
  const trimStyles = getTrimStyles(fontDefinition);
  const styles = [{
    color: style.tokenSchema.color.foreground.neutralEmphasis,
    fontSize: fontDefinition.size,
    fontFamily: style.tokenSchema.typography.fontFamily.base,
    fontWeight: sizeToWeight[size],
    textAlign: align
  }, textOptimizationStyles, trimStyles];
  return style.useStyleProps({
    ...otherProps,
    UNSAFE_className: [style.css(styles), UNSAFE_className, headingClassList.element('root')]
  });
}
const sizeToWeight = {
  small: style.tokenSchema.typography.fontWeight.semibold,
  regular: style.tokenSchema.typography.fontWeight.bold,
  medium: style.tokenSchema.typography.fontWeight.medium,
  large: style.tokenSchema.typography.fontWeight.bold
};

/** @private Truncate text with an ellipsis after the specified number of lines */
function Truncate({
  lines,
  title,
  ...props
}) {
  const className = useTruncateStyles(typeof lines === 'boolean' ? 1 : lines);
  return /*#__PURE__*/jsxRuntime.jsx("span", {
    className: className,
    title: title !== null && title !== void 0 ? title : utils.isReactText(props.children) ? props.children.toString() : undefined,
    ...props
  });
}
function useTruncateStyles(lineClamp) {
  return style.css({
    display: '-webkit-box',
    WebkitLineClamp: lineClamp,
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  });
}

function useVisuallyHiddenRange(range) {
  let matchedBreakpoints = style.useResponsiveRange();
  let {
    visuallyHiddenProps
  } = visuallyHidden.useVisuallyHidden();
  if (range && matchedBreakpoints(range)) {
    return visuallyHiddenProps;
  }
}

const sizeToElement = {
  small: 'h4',
  regular: 'h3',
  medium: 'h2',
  large: 'h1'
};
const filterOptions$1 = {
  propNames: new Set(['aria-hidden'])
};

/** A typographic device used to communicate levels of hierarchy between text. */
const Heading = ts.forwardRefWithAs((props, ref) => {
  props = slots.useSlotProps(props, 'heading');
  const {
    children,
    size = 'regular',
    truncate,
    elementType: ElementType = sizeToElement[size],
    ...otherProps
  } = props;
  const styleProps = useHeadingStyles({
    size,
    ...otherProps
  });
  const headingContext = React.useMemo(() => ({
    size
  }), [size]);
  const visuallyHiddenProps = useVisuallyHiddenRange(props.visuallyHidden);

  // element preparation
  const content = truncate ? /*#__PURE__*/jsxRuntime.jsx(Truncate, {
    lines: truncate,
    children: children
  }) : children;
  return /*#__PURE__*/jsxRuntime.jsx(HeadingContext.Provider, {
    value: headingContext,
    children: /*#__PURE__*/jsxRuntime.jsx(ElementType, {
      ref: ref,
      ...utils$1.filterDOMProps(otherProps, filterOptions$1),
      ...styleProps,
      ...visuallyHiddenProps,
      children: content
    })
  });
});

const filterOptions = {
  propNames: new Set(['aria-hidden', 'role'])
};
const Text = ts.forwardRefWithAs((props, forwardedRef) => {
  var _prevContext$color, _prevContext$size, _prevContext$weight;
  props = slots.useSlotProps(props, 'text');
  const headingContext = useHeadingContext();
  const prevContext = useTextContext();
  validateProps$1(props, prevContext);

  // warn and bail if consumer tries to do something dodgy
  emery.warning(!headingContext, 'The `Text` component is not supported within `Heading` components.');
  if (headingContext) {
    return /*#__PURE__*/jsxRuntime.jsx("span", {
      children: props.children
    });
  }
  const {
    children,
    color = (_prevContext$color = prevContext === null || prevContext === void 0 ? void 0 : prevContext.color) !== null && _prevContext$color !== void 0 ? _prevContext$color : 'neutral',
    elementType: ElementType = 'span',
    size = (_prevContext$size = prevContext === null || prevContext === void 0 ? void 0 : prevContext.size) !== null && _prevContext$size !== void 0 ? _prevContext$size : 'regular',
    trim = !prevContext,
    truncate,
    visuallyHidden,
    weight = (_prevContext$weight = prevContext === null || prevContext === void 0 ? void 0 : prevContext.weight) !== null && _prevContext$weight !== void 0 ? _prevContext$weight : 'regular',
    ...otherProps
  } = props;
  const styleProps = useTextStyles({
    color,
    size,
    trim,
    weight,
    ...otherProps
  });
  const visuallyHiddenProps = useVisuallyHiddenRange(visuallyHidden);

  // element preparation
  const content = truncate ? /*#__PURE__*/jsxRuntime.jsx(Truncate, {
    lines: truncate,
    children: children
  }) : children;
  const element = /*#__PURE__*/jsxRuntime.jsx(ElementType, {
    ref: forwardedRef,
    ...utils$1.filterDOMProps(otherProps, filterOptions),
    ...styleProps,
    ...visuallyHiddenProps,
    children: content
  });

  // avoid unnecessary re-renders
  const nextContext = React.useMemo(() => ({
    size,
    color,
    weight
  }), [size, color, weight]);

  // avoid nested providers
  if (prevContext || visuallyHidden) {
    return element;
  }
  return /*#__PURE__*/jsxRuntime.jsx(TextContext.Provider, {
    value: nextContext,
    children: element
  });
});
function validateProps$1(props, context) {
  emery.assert(!context || !props.align, 'The "align" prop is unsupported on nested Text.');
  emery.assert(!context || !props.trim, 'The "trim" prop is unsupported on nested Text.');
}

/**
 * A utility component for displaying emoji characters accessibly. Emojis can
 * add playfulness to your interface, but require formatting to ensure that they
 * are accessible for all users.
 */
const Emoji = /*#__PURE__*/React.forwardRef(function Emoji(props, forwardedRef) {
  const {
    label,
    symbol,
    ...otherProps
  } = props;
  const styleProps = style.useStyleProps(otherProps);
  return /*#__PURE__*/jsxRuntime.jsx("span", {
    "aria-hidden": label ? undefined : true,
    "aria-label": label,
    ref: forwardedRef,
    role: "img",
    ...styleProps,
    ...utils$1.filterDOMProps(otherProps),
    children: symbol
  });
});

function noopSubscribe() {
  return () => {};
}
function useIsMac() {
  return React.useSyncExternalStore(noopSubscribe, utils$1.isMac, () => false);
}
/** Represents text that specifies a keyboard command. */
const Kbd = /*#__PURE__*/React.forwardRef(function Kbd(props, forwardedRef) {
  props = slots.useSlotProps(props, 'kbd');
  let {
    alt,
    meta,
    shift,
    children,
    ...otherProps
  } = props;
  const styleProps = useTextStyles({
    casing: 'full-width',
    color: 'neutral',
    size: 'regular',
    weight: 'regular',
    ...otherProps
  });
  const isMac = useIsMac();
  const modifiers = React.useMemo(() => {
    const SYSTEM_KEYS = isMac ? {
      alt: '⌥',
      meta: '⌘',
      shift: '⇧'
    } : {
      alt: 'Alt',
      meta: 'Ctrl',
      shift: 'Shift'
      // shift: '⇧', // maybe?
    };

    let keys = [alt && SYSTEM_KEYS.alt, shift && SYSTEM_KEYS.shift, meta && SYSTEM_KEYS.meta].filter(Boolean);
    return joinModifierKeys(keys, isMac);
  }, [alt, meta, shift, isMac]);
  return /*#__PURE__*/jsxRuntime.jsxs("kbd", {
    ...utils$1.filterDOMProps(otherProps),
    ...styleProps,
    dir: "ltr",
    ref: forwardedRef,
    children: [modifiers, /*#__PURE__*/jsxRuntime.jsx(Char, {
      children: children
    })]
  });
});

/**
 * NOTE: The 'full-width' text-transform has limited support.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform#browser_compatibility
 * This hack ensures that single character shortcuts are visually aligned when
 * stacked, like when end-aligned in menu items, without needing to use a
 * monospace font.
 */
function Char(props) {
  return /*#__PURE__*/jsxRuntime.jsx("span", {
    className: style.css({
      display: 'inline-block',
      minWidth: '1em',
      textAlign: 'center'
    }),
    ...props
  });
}
function joinModifierKeys(modifiers, isMac) {
  if (modifiers.length === 0) {
    return '';
  }
  let delimiter = isMac ? '' : '+';
  return modifiers.join(delimiter) + delimiter;
}

const Numeral = /*#__PURE__*/React.forwardRef(function Numeral(props, forwardedRef) {
  props = useDerivedProps(props);
  validateProps(props);
  const formatter = i18n.useNumberFormatter(optionsByFormat(props));
  const {
    abbreviate,
    format,
    value,
    ...textProps
  } = props;
  const headingContext = useHeadingContext();
  const formattedText = formatter.format(value);
  if (headingContext) {
    return /*#__PURE__*/jsxRuntime.jsx("span", {
      ref: forwardedRef,
      children: formattedText
    });
  }
  return /*#__PURE__*/jsxRuntime.jsx(Text, {
    ref: forwardedRef,
    ...textProps,
    children: formattedText
  });
});

// Utils
// ----------------------------------------------------------------------------

function getFormat(props) {
  const {
    format,
    currency,
    unit
  } = props;
  if (format) {
    return format;
  }
  if (currency) {
    return 'currency';
  }
  if (unit) {
    return 'unit';
  }
  return 'decimal';
}
function useDerivedProps(props) {
  return {
    ...props,
    format: getFormat(props)
  };
}
function toFractionDigits(precision) {
  return Array.isArray(precision) ? precision : [precision, precision];
}
function optionsByFormat(props) {
  const {
    abbreviate,
    format,
    precision,
    currency,
    unit
  } = props;
  const notation = abbreviate ? 'compact' : undefined;
  const [minimumFractionDigits, maximumFractionDigits] = toFractionDigits(precision);
  const common = {
    maximumFractionDigits,
    minimumFractionDigits,
    notation,
    compactDisplay: abbreviate === 'long' ? 'long' : 'short'
  };
  switch (format) {
    case 'currency':
      return {
        ...common,
        style: 'currency',
        currency,
        currencyDisplay: 'narrowSymbol'
      };
    case 'percent':
      return {
        ...common,
        style: 'percent'
      };
    case 'unit':
      return {
        ...common,
        style: 'unit',
        unit,
        unitDisplay: 'narrow'
      };
    default:
      return common;
  }
}
function validateProps(props) {
  const {
    format,
    currency,
    precision,
    unit
  } = props;
  emery.assert(currency ? format === 'currency' : true, 'When format is "currency", the currency property must be provided.');
  emery.assert(unit ? format === 'unit' : true, 'When format is "unit", the unit property must be provided.');
  emery.assert(!(currency && unit), 'Formatting of "currency" and "unit" cannot be combined.');
  if (precision) {
    emery.assert(Array.isArray(precision) ? precision.every(emery.isInteger) : emery.isInteger(precision), 'Precision must be an integer, or an integer tuple for min/max.');
  }
}

/** A typographic component that adds styles for rendering remote HTML content. */
const Prose = ts.forwardRefWithAs((props, ref) => {
  const {
    children,
    elementType: ElementType = 'div',
    ...otherProps
  } = props;
  const styleProps = useProseStyleProps(otherProps);
  return /*#__PURE__*/jsxRuntime.jsx(ElementType, {
    ref: ref,
    ...style.filterStyleProps(otherProps),
    ...styleProps,
    children: children
  });
});
function useProseStyleProps(props) {
  const {
    size = 'medium',
    ...otherProps
  } = props;
  const styleProps = style.useStyleProps(otherProps);
  return {
    ...styleProps,
    ...style.toDataAttributes({
      size
    }),
    className: style.classNames(style.css({
      color: style.tokenSchema.color.foreground.neutral,
      fontFamily: style.tokenSchema.typography.fontFamily.base,
      height: '100%',
      maxWidth: '100%',
      minHeight: 0,
      minWidth: 0,
      position: 'relative',
      overflowWrap: 'break-word',
      whiteSpace: 'break-spaces',
      fontVariantLigatures: 'none',
      fontFeatureSettings: '"liga" 0',
      // the above doesn't seem to work in Edge
      MozOsxFontSmoothing: 'auto',
      WebkitFontSmoothing: 'auto',
      '&[data-size="small"]': {
        fontSize: style.tokenSchema.typography.text.small.size,
        lineHeight: 1.6
      },
      '&[data-size="regular"]': {
        fontSize: style.tokenSchema.typography.text.regular.size,
        lineHeight: 1.5
      },
      '&[data-size="medium"]': {
        fontSize: style.tokenSchema.typography.text.medium.size,
        lineHeight: 1.5
      },
      '&[data-size="large"]': {
        fontSize: style.tokenSchema.typography.text.large.size,
        lineHeight: 1.4
      },
      // Elements
      // ---------------------------------------------------------------------

      '& :is(blockquote, p, pre, ol, ul, table)': {
        marginBlock: '0.75em',
        ':first-child': {
          marginTop: 0
        },
        ':last-child': {
          marginBottom: 0
        }
      },
      'ol, ul': {
        paddingInlineStart: '1em'
      },
      'ol ol, ul ul, ol ul, ul ol': {
        marginBlock: 0
      },
      'li :is(blockquote, p, pre, ol, ul, table)': {
        marginBottom: 0
      },
      blockquote: {
        borderInlineStart: `${style.tokenSchema.size.border.large} solid ${style.tokenSchema.color.foreground.neutral}`,
        marginInline: 0,
        paddingInlineStart: '1em'
      },
      hr: {
        backgroundColor: style.tokenSchema.color.alias.borderIdle,
        border: 0,
        borderRadius: style.tokenSchema.size.border.medium,
        height: style.tokenSchema.size.border.medium,
        marginBlock: '1.5em'
      },
      // inline elements
      img: {
        height: 'auto',
        maxWidth: '100%'
      },
      strong: {
        fontWeight: style.tokenSchema.typography.fontWeight.semibold
      },
      a: {
        color: style.tokenSchema.color.foreground.accent
      },
      // code block
      pre: {
        backgroundColor: style.tokenSchema.color.background.surface,
        borderRadius: style.tokenSchema.size.radius.medium,
        color: style.tokenSchema.color.foreground.neutralEmphasis,
        fontFamily: style.tokenSchema.typography.fontFamily.code,
        fontSize: '0.85em',
        lineHeight: style.tokenSchema.typography.lineheight.medium,
        minWidth: 0,
        maxWidth: '100%',
        overflow: 'auto',
        padding: style.tokenSchema.size.space.medium,
        whiteSpace: 'pre-wrap'
      },
      'pre > code': {
        fontFamily: 'inherit'
      },
      // inline code
      '& :not(pre) > code': {
        backgroundColor: style.tokenSchema.color.background.accent,
        borderRadius: style.tokenSchema.size.radius.small,
        color: style.tokenSchema.color.foreground.neutralEmphasis,
        display: 'inline-block',
        fontSize: '0.85em',
        fontFamily: style.tokenSchema.typography.fontFamily.code,
        paddingInline: style.tokenSchema.size.space.small
      },
      // Headings
      // ---------------------------------------------------------------------

      '& :is(h1, h2, h3, h4, h5, h6)': {
        color: style.tokenSchema.color.foreground.neutralEmphasis,
        lineHeight: 1.25,
        marginTop: '1.5em',
        marginBottom: '0.67em',
        ':first-child': {
          marginTop: 0
        },
        ':last-child': {
          marginBottom: 0
        }
      },
      h1: {
        fontSize: '2em',
        fontWeight: style.tokenSchema.typography.fontWeight.bold
      },
      h2: {
        fontSize: '1.5em',
        fontWeight: style.tokenSchema.typography.fontWeight.bold
      },
      h3: {
        fontSize: '1.25em',
        fontWeight: style.tokenSchema.typography.fontWeight.bold
      },
      h4: {
        fontSize: '1.1em',
        fontWeight: style.tokenSchema.typography.fontWeight.semibold
      },
      h5: {
        fontSize: '1em',
        fontWeight: style.tokenSchema.typography.fontWeight.semibold
      },
      h6: {
        fontSize: '0.9em',
        fontWeight: style.tokenSchema.typography.fontWeight.semibold,
        letterSpacing: '0.0125em'
      },
      ...getListStyles()
    }), styleProps.className)
  };
}
function getListStyles() {
  let styles = {};
  let listDepth = 10;
  const orderedListStyles = ['lower-roman', 'decimal', 'lower-alpha'];
  const unorderedListStyles = ['square', 'disc', 'circle'];
  while (listDepth--) {
    let arr = Array.from({
      length: listDepth
    });
    if (arr.length) {
      styles[arr.map(() => `ol`).join(' ')] = {
        listStyle: orderedListStyles[listDepth % 3]
      };
      styles[arr.map(() => `ul`).join(' ')] = {
        listStyle: unorderedListStyles[listDepth % 3]
      };
    }
  }
  return styles;
}

exports.Emoji = Emoji;
exports.Heading = Heading;
exports.Kbd = Kbd;
exports.Numeral = Numeral;
exports.Prose = Prose;
exports.Text = Text;
exports.headingClassList = headingClassList;
exports.textClassList = textClassList;
exports.useHeadingContext = useHeadingContext;
exports.useProseStyleProps = useProseStyleProps;
exports.useTextContext = useTextContext;
exports.useTextStyles = useTextStyles;
