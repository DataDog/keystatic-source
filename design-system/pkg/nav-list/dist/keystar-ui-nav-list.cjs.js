'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@react-aria/utils');
var React = require('react');
var layout = require('@keystar/ui/layout');
var slots = require('@keystar/ui/slots');
var style = require('@keystar/ui/style');
var jsxRuntime = require('react/jsx-runtime');
var link = require('@react-aria/link');
var typography = require('@keystar/ui/typography');
var utils$1 = require('@keystar/ui/utils');

const listBlockGutter = style.tokenSchema.size.space.large;
const itemIndicatorGutter = style.tokenSchema.size.space.regular;
const itemIndicatorWidth = style.tokenSchema.size.space.small;
const itemContentGutter = style.tokenSchema.size.space.medium;
const textInsetStart = `calc(${itemIndicatorWidth} + ${itemIndicatorGutter} + ${itemContentGutter})`;

/** Navigation lists let users navigate the application. */
const NavList = /*#__PURE__*/React.forwardRef(function NavList(props, forwardedRef) {
  const {
    children,
    ...otherProps
  } = props;
  const domRef = utils.useObjectRef(forwardedRef);
  const styleProps = style.useStyleProps(otherProps);
  const dividerStyles = useDividerStyles();
  const currentItem = useCurrentItem(domRef);

  // FIXME: called by the docs' example snippets. over eager; probably a good
  // indicator that it should be configurable.
  React.useEffect(() => {
    if (currentItem) {
      currentItem.scrollIntoView({
        block: 'center'
      });
    }
  }, [currentItem]);
  const slots$1 = React.useMemo(() => ({
    divider: {
      'aria-hidden': true,
      elementType: 'li',
      size: 'medium',
      UNSAFE_className: dividerStyles
    }
  }), [dividerStyles]);
  return /*#__PURE__*/jsxRuntime.jsx(layout.Flex, {
    elementType: "nav",
    ref: domRef,
    direction: "column",
    UNSAFE_className: styleProps.className,
    UNSAFE_style: styleProps.style,
    ...utils.filterDOMProps(otherProps, {
      labelable: true
    }),
    children: /*#__PURE__*/jsxRuntime.jsx(layout.Flex, {
      direction: "column",
      elementType: "ul",
      flex: "1 0 0",
      children: /*#__PURE__*/jsxRuntime.jsx(slots.SlotProvider, {
        slots: slots$1,
        children: children
      })
    })
  });
});

// Styles
// -----------------------------------------------------------------------------

function useDividerStyles() {
  return style.css({
    marginBlock: listBlockGutter,
    marginInlineStart: textInsetStart,
    width: `calc(40% - ${textInsetStart} - ${itemContentGutter})`,
    // FIXME: magic numbers
    minWidth: 80,
    maxWidth: 240
  });
}

// Utils
// -----------------------------------------------------------------------------

function useCurrentItem(ref) {
  let [currentItem, setCurrentItem] = React.useState(null);
  utils.useLayoutEffect(() => {
    let el = ref.current && ref.current.querySelector('[aria-current]');
    if (el) {
      setCurrentItem(el);
    }
  }, [ref]);
  return currentItem;
}

// TODO:
// - generic `Item` slot component
// - collection/virtualized?
/** An item within a `NavList`. */
const NavItem = /*#__PURE__*/React.forwardRef(function NavItem(props, forwardedRef) {
  const {
    'aria-current': ariaCurrent,
    children,
    href,
    ...otherProps
  } = props;
  const styles = useStyles();
  const domRef = utils.useObjectRef(forwardedRef);
  const {
    linkProps
  } = link.useLink(props, domRef);
  const slots$1 = React.useMemo(() => ({
    text: {
      color: 'inherit',
      UNSAFE_className: styles.text
    }
  }), [styles.text]);
  return /*#__PURE__*/jsxRuntime.jsx("li", {
    children: /*#__PURE__*/jsxRuntime.jsx(style.FocusRing, {
      children: /*#__PURE__*/jsxRuntime.jsx("a", {
        ref: domRef,
        "aria-current": ariaCurrent,
        href: href,
        className: style.classNames(styles.anchor),
        ...linkProps,
        ...utils.filterDOMProps(otherProps),
        children: /*#__PURE__*/jsxRuntime.jsx("div", {
          className: style.classNames(styles.content),
          children: /*#__PURE__*/jsxRuntime.jsx(slots.SlotProvider, {
            slots: slots$1,
            children: utils$1.isReactText(children) ? /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
              children: children
            }) : children
          })
        })
      })
    })
  });
});

// Styles
// ------------------------------

function useStyles() {
  const ringColor = style.tokenSchema.color.alias.focusRing;
  const ringWidth = style.tokenSchema.size.alias.focusRing;
  const anchor = style.css({
    color: style.tokenSchema.color.foreground.neutral,
    display: 'flex',
    gap: itemIndicatorGutter,
    paddingBlock: style.tokenSchema.size.space.xsmall,
    outline: 0,
    // selected indicator
    '&::before': {
      borderRadius: itemIndicatorWidth,
      content: '""',
      insetInlineStart: style.tokenSchema.size.space.xsmall,
      marginBlock: style.tokenSchema.size.space.xsmall,
      position: 'relative',
      width: itemIndicatorWidth
    },
    // interaction
    '&:hover': {
      color: style.tokenSchema.color.foreground.neutralEmphasis
    },
    // selection
    '&[aria-current]': {
      color: style.tokenSchema.color.foreground.neutralEmphasis,
      '&::before': {
        backgroundColor: style.tokenSchema.color.background.accentEmphasis
      }
    }
  });
  const content = style.css({
    alignItems: 'center',
    borderRadius: style.tokenSchema.size.radius.regular,
    display: 'flex',
    flex: 1,
    flexShrink: 0,
    gap: style.tokenSchema.size.space.regular,
    minHeight: style.tokenSchema.size.element.regular,
    minWidth: 0,
    paddingInline: style.tokenSchema.size.space.medium,
    paddingBlock: style.tokenSchema.size.space.small,
    position: 'relative',
    // focus ring
    [`&::after`]: {
      borderRadius: style.tokenSchema.size.radius.regular,
      content: '""',
      insetBlock: 1,
      insetInline: -1,
      margin: 1,
      position: 'absolute',
      transition: style.transition(['box-shadow', 'margin'], {
        easing: 'easeOut'
      })
    },
    [`.${anchor}[data-focus=visible] &::after`]: {
      boxShadow: `0 0 0 ${ringWidth} ${ringColor}`,
      margin: 0
    },
    [`.${anchor}[aria-current] &`]: {
      backgroundColor: style.tokenSchema.color.alias.backgroundHovered
    },
    [`.${anchor}:hover &`]: {
      backgroundColor: style.tokenSchema.color.alias.backgroundHovered
    },
    [`.${anchor}:active &`]: {
      backgroundColor: style.tokenSchema.color.alias.backgroundPressed
    }
  });
  const text = style.css({
    fontWeight: style.tokenSchema.typography.fontWeight.medium,
    [`.${anchor}[aria-current] &`]: {
      fontWeight: style.tokenSchema.typography.fontWeight.semibold
    }
  });
  return {
    anchor,
    content,
    text
  };
}

// TODO:
// - generic `Group` or `Section` slot component
// - collapsible?
/** Render a group of navigation links. */
function NavGroup(props) {
  const {
    children,
    id,
    title,
    ...otherProps
  } = props;
  const headingId = utils.useId(id);
  const groupStyles = useGroupStyles();
  const headingStyles = useHeadingStyles();
  return /*#__PURE__*/jsxRuntime.jsxs("li", {
    className: style.classNames(groupStyles),
    ...utils.filterDOMProps(otherProps),
    children: [/*#__PURE__*/jsxRuntime.jsx(typography.Text, {
      elementType: "h3",
      id: headingId,
      UNSAFE_className: headingStyles,
      children: title
    }), /*#__PURE__*/jsxRuntime.jsx(layout.Box, {
      elementType: "ul",
      flexShrink: 0,
      "aria-labelledby": headingId,
      children: children
    })]
  });
}

// Styles
// ------------------------------

function useGroupStyles() {
  return style.css({
    '&:not(:first-child)': {
      marginBlockStart: listBlockGutter
    },
    '&:not(:last-child)': {
      marginBlockEnd: listBlockGutter
    }
  });
}
function useHeadingStyles() {
  return style.css({
    color: style.tokenSchema.color.foreground.neutralSecondary,
    fontSize: style.tokenSchema.typography.text.small.size,
    fontWeight: style.tokenSchema.typography.fontWeight.medium,
    paddingBlock: style.tokenSchema.size.space.regular,
    paddingInlineEnd: itemContentGutter,
    paddingInlineStart: textInsetStart,
    textTransform: 'uppercase'
  });
}

exports.NavGroup = NavGroup;
exports.NavItem = NavItem;
exports.NavList = NavList;