'use client';
import { useObjectRef, filterDOMProps, useLayoutEffect, useId } from '@react-aria/utils';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Flex, Box } from '@keystar/ui/layout';
import { SlotProvider } from '@keystar/ui/slots';
import { tokenSchema, useStyleProps, css, FocusRing, classNames, transition } from '@keystar/ui/style';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useLink } from '@react-aria/link';
import { Text } from '@keystar/ui/typography';
import { isReactText } from '@keystar/ui/utils';

const listBlockGutter = tokenSchema.size.space.large;
const itemIndicatorGutter = tokenSchema.size.space.regular;
const itemIndicatorWidth = tokenSchema.size.space.small;
const itemContentGutter = tokenSchema.size.space.medium;
const textInsetStart = `calc(${itemIndicatorWidth} + ${itemIndicatorGutter} + ${itemContentGutter})`;

/** Navigation lists let users navigate the application. */
const NavList = /*#__PURE__*/forwardRef(function NavList(props, forwardedRef) {
  const {
    children,
    ...otherProps
  } = props;
  const domRef = useObjectRef(forwardedRef);
  const styleProps = useStyleProps(otherProps);
  const dividerStyles = useDividerStyles();
  const currentItem = useCurrentItem(domRef);

  // FIXME: called by the docs' example snippets. over eager; probably a good
  // indicator that it should be configurable.
  useEffect(() => {
    if (currentItem) {
      currentItem.scrollIntoView({
        block: 'center'
      });
    }
  }, [currentItem]);
  const slots = useMemo(() => ({
    divider: {
      'aria-hidden': true,
      elementType: 'li',
      size: 'medium',
      UNSAFE_className: dividerStyles
    }
  }), [dividerStyles]);
  return /*#__PURE__*/jsx(Flex, {
    elementType: "nav",
    ref: domRef,
    direction: "column",
    UNSAFE_className: styleProps.className,
    UNSAFE_style: styleProps.style,
    ...filterDOMProps(otherProps, {
      labelable: true
    }),
    children: /*#__PURE__*/jsx(Flex, {
      direction: "column",
      elementType: "ul",
      flex: "1 0 0",
      children: /*#__PURE__*/jsx(SlotProvider, {
        slots: slots,
        children: children
      })
    })
  });
});

// Styles
// -----------------------------------------------------------------------------

function useDividerStyles() {
  return css({
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
  let [currentItem, setCurrentItem] = useState(null);
  useLayoutEffect(() => {
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
const NavItem = /*#__PURE__*/forwardRef(function NavItem(props, forwardedRef) {
  const {
    'aria-current': ariaCurrent,
    children,
    href,
    ...otherProps
  } = props;
  const styles = useStyles();
  const domRef = useObjectRef(forwardedRef);
  const {
    linkProps
  } = useLink(props, domRef);
  const slots = useMemo(() => ({
    text: {
      color: 'inherit',
      UNSAFE_className: styles.text
    }
  }), [styles.text]);
  return /*#__PURE__*/jsx("li", {
    children: /*#__PURE__*/jsx(FocusRing, {
      children: /*#__PURE__*/jsx("a", {
        ref: domRef,
        "aria-current": ariaCurrent,
        href: href,
        className: classNames(styles.anchor),
        ...linkProps,
        ...filterDOMProps(otherProps),
        children: /*#__PURE__*/jsx("div", {
          className: classNames(styles.content),
          children: /*#__PURE__*/jsx(SlotProvider, {
            slots: slots,
            children: isReactText(children) ? /*#__PURE__*/jsx(Text, {
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
  const ringColor = tokenSchema.color.alias.focusRing;
  const ringWidth = tokenSchema.size.alias.focusRing;
  const anchor = css({
    color: tokenSchema.color.foreground.neutral,
    display: 'flex',
    gap: itemIndicatorGutter,
    paddingBlock: tokenSchema.size.space.xsmall,
    outline: 0,
    // selected indicator
    '&::before': {
      borderRadius: itemIndicatorWidth,
      content: '""',
      insetInlineStart: tokenSchema.size.space.xsmall,
      marginBlock: tokenSchema.size.space.xsmall,
      position: 'relative',
      width: itemIndicatorWidth
    },
    // interaction
    '&:hover': {
      color: tokenSchema.color.foreground.neutralEmphasis
    },
    // selection
    '&[aria-current]': {
      color: tokenSchema.color.foreground.neutralEmphasis,
      '&::before': {
        backgroundColor: tokenSchema.color.background.accentEmphasis
      }
    }
  });
  const content = css({
    alignItems: 'center',
    borderRadius: tokenSchema.size.radius.regular,
    display: 'flex',
    flex: 1,
    flexShrink: 0,
    gap: tokenSchema.size.space.regular,
    minHeight: tokenSchema.size.element.regular,
    minWidth: 0,
    paddingInline: tokenSchema.size.space.medium,
    paddingBlock: tokenSchema.size.space.small,
    position: 'relative',
    // focus ring
    [`&::after`]: {
      borderRadius: tokenSchema.size.radius.regular,
      content: '""',
      insetBlock: 1,
      insetInline: -1,
      margin: 1,
      position: 'absolute',
      transition: transition(['box-shadow', 'margin'], {
        easing: 'easeOut'
      })
    },
    [`.${anchor}[data-focus=visible] &::after`]: {
      boxShadow: `0 0 0 ${ringWidth} ${ringColor}`,
      margin: 0
    },
    [`.${anchor}[aria-current] &`]: {
      backgroundColor: tokenSchema.color.alias.backgroundHovered
    },
    [`.${anchor}:hover &`]: {
      backgroundColor: tokenSchema.color.alias.backgroundHovered
    },
    [`.${anchor}:active &`]: {
      backgroundColor: tokenSchema.color.alias.backgroundPressed
    }
  });
  const text = css({
    fontWeight: tokenSchema.typography.fontWeight.medium,
    [`.${anchor}[aria-current] &`]: {
      fontWeight: tokenSchema.typography.fontWeight.semibold
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
  const headingId = useId(id);
  const groupStyles = useGroupStyles();
  const headingStyles = useHeadingStyles();
  return /*#__PURE__*/jsxs("li", {
    className: classNames(groupStyles),
    ...filterDOMProps(otherProps),
    children: [/*#__PURE__*/jsx(Text, {
      elementType: "h3",
      id: headingId,
      UNSAFE_className: headingStyles,
      children: title
    }), /*#__PURE__*/jsx(Box, {
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
  return css({
    '&:not(:first-child)': {
      marginBlockStart: listBlockGutter
    },
    '&:not(:last-child)': {
      marginBlockEnd: listBlockGutter
    }
  });
}
function useHeadingStyles() {
  return css({
    color: tokenSchema.color.foreground.neutralSecondary,
    fontSize: tokenSchema.typography.text.small.size,
    fontWeight: tokenSchema.typography.fontWeight.medium,
    paddingBlock: tokenSchema.size.space.regular,
    paddingInlineEnd: itemContentGutter,
    paddingInlineStart: textInsetStart,
    textTransform: 'uppercase'
  });
}

export { NavGroup, NavItem, NavList };
