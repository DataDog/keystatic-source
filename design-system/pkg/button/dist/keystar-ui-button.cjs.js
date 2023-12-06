'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@react-aria/utils');
var React = require('react');
var core = require('@keystar/ui/core');
var slots = require('@keystar/ui/slots');
var style = require('@keystar/ui/style');
var jsxRuntime = require('react/jsx-runtime');
var button = require('@react-aria/button');
var interactions = require('@react-aria/interactions');
var link = require('@react-aria/link');
var typography = require('@keystar/ui/typography');
var utils$1 = require('@keystar/ui/utils');
var xIcon = require('@keystar/ui/icon/icons/xIcon');
var icon = require('@keystar/ui/icon');
var toggle = require('@react-stately/toggle');

/**
 * Handles overflow for a grouping of buttons whose actions are related to each
 * other.
 */
const ButtonGroup = /*#__PURE__*/React.forwardRef(function ButtonGroup(props, forwardedRef) {
  let {
    scale
  } = core.useProvider();
  props = core.useProviderProps(props);
  props = slots.useSlotProps(props, 'buttonGroup');
  let {
    align = 'start',
    children,
    isDisabled,
    orientation = 'horizontal',
    ...otherProps
  } = props;
  let styleProps = style.useStyleProps(otherProps);
  let domRef = utils.useObjectRef(forwardedRef);
  let [hasOverflow, setHasOverflow] = utils.useValueEffect(false);

  // Avoid widows, horizontal orientations may switch to vertical when there
  // isn't enough space for all buttons in a single row. There's no "wrap"
  // event, so we have to measure.
  let checkForOverflow = React.useCallback(() => {
    let computeHasOverflow = () => {
      if (domRef.current && orientation === 'horizontal') {
        let buttonGroupChildren = Array.from(domRef.current.children);
        let maxX = domRef.current.offsetWidth + 1; // + 1 to account for rounding errors
        // If any buttons have negative X positions (align="end") or extend beyond
        // the width of the button group (align="start"), then switch to vertical.
        if (buttonGroupChildren.some(child => child.offsetLeft < 0 || child.offsetLeft + child.offsetWidth > maxX)) {
          return true;
        }
        return false;
      }
    };
    if (orientation === 'horizontal') {
      setHasOverflow(function* () {
        // Force to horizontal for measurement.
        yield false;

        // Measure, and update if there is overflow.
        yield computeHasOverflow();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- children + scale affect flow/measurment
  }, [domRef, orientation, scale, setHasOverflow, children]);

  // There are two main reasons we need to remeasure:
  // 1. Internal changes: Check for initial overflow or when
  //    orientation/scale/children change (from checkForOverflow dep array)
  utils.useLayoutEffect(() => {
    checkForOverflow();
  }, [checkForOverflow]);

  // 2. External changes: buttongroup won't change size due to any parents
  //    changing size, so listen to its container for size changes to figure out
  //    if we should remeasure
  let parent = React.useRef();
  utils.useLayoutEffect(() => {
    if (domRef.current) {
      parent.current = domRef.current.parentElement;
    }
  });
  utils.useResizeObserver({
    ref: parent,
    onResize: checkForOverflow
  });
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...utils.filterDOMProps(otherProps),
    ...style.toDataAttributes({
      align,
      orientation: hasOverflow ? 'vertical' : orientation
    }),
    ...styleProps,
    ref: domRef,
    className: style.classNames(styleProps.className, style.css({
      alignItems: 'flex-start',
      display: 'inline-flex',
      gap: style.tokenSchema.size.space.regular,
      position: 'relative',
      '&[data-orientation="horizontal"]': {
        '&[data-align="center"]': {
          justifyContent: 'center'
        },
        '&[data-align="end"]': {
          justifyContent: 'flex-end'
        }
      },
      '&[data-orientation="vertical"]': {
        flexDirection: 'column',
        '&[data-align="center"]': {
          alignItems: 'center'
        },
        '&[data-align="end"]': {
          alignItems: 'flex-end'
        }
      }
    })),
    children: /*#__PURE__*/jsxRuntime.jsx(core.KeystarProvider, {
      isDisabled: isDisabled,
      children: children
    })
  });
});

const buttonClassList = new style.ClassList('Button', ['icon', 'text']);
function useButtonStyles(props, state) {
  const {
    prominence = 'default',
    tone = prominence === 'high' ? 'accent' : 'neutral'
  } = props;
  const {
    isHovered,
    isPressed
  } = state;
  const styleProps = style.useStyleProps(props);
  return {
    ...style.toDataAttributes({
      hovered: isHovered || undefined,
      pressed: isPressed || undefined,
      prominence: prominence === 'default' ? undefined : prominence,
      tone: tone === 'neutral' ? undefined : tone,
      static: props.static
    }),
    style: styleProps.style,
    className: style.classNames(buttonClassList.element('root'), style.css({
      alignItems: 'center',
      borderRadius: style.tokenSchema.size.radius.regular,
      cursor: 'default',
      display: 'inline-flex',
      flexShrink: 0,
      fontSize: style.tokenSchema.typography.text.regular.size,
      fontWeight: style.tokenSchema.typography.fontWeight.semibold,
      height: style.tokenSchema.size.element.regular,
      justifyContent: 'center',
      minWidth: style.tokenSchema.size.element.regular,
      outline: 0,
      gap: style.tokenSchema.size.space.regular,
      paddingInline: style.tokenSchema.size.space.large,
      position: 'relative',
      transitionDuration: '130ms',
      transitionProperty: 'background, border-color, box-shadow, color, ',
      transitionTimingFunction: 'ease-out',
      userSelect: 'none',
      // indicate when external link? e.g. `&[href^=http]`
      'a&': {
        cursor: 'pointer'
      },
      '&:disabled, &[aria-disabled]': {
        cursor: 'default'
      },
      // inherit text styles from parent
      [buttonClassList.selector('text', 'descendant')]: {
        fontSize: 'inherit',
        fontWeight: 'inherit'
      },
      // special size for button icons. otherwise they appear too "thin"
      // beside the bold text
      [buttonClassList.selector('icon', 'descendant')]: {
        height: style.tokenSchema.size.scale[225],
        width: style.tokenSchema.size.scale[225]
      },
      // focus ring
      '--focus-ring-color': style.tokenSchema.color.alias.focusRing,
      '&[data-static=light]': {
        '--focus-ring-color': '#fff'
      },
      '&[data-static=dark]': {
        '--focus-ring-color': '#000'
      },
      '&::after': {
        borderRadius: `calc(${style.tokenSchema.size.radius.regular} + ${style.tokenSchema.size.alias.focusRingGap})`,
        content: '""',
        inset: 0,
        pointerEvents: 'none',
        position: 'absolute',
        transition: style.transition(['box-shadow', 'margin'], {
          easing: 'easeOut'
        })
      },
      '&[data-focus=visible]::after': {
        boxShadow: `0 0 0 ${style.tokenSchema.size.alias.focusRing} var(--focus-ring-color)`,
        margin: `calc(-1 * ${style.tokenSchema.size.alias.focusRingGap})`
      },
      // PROMINENCE: default
      '&:not([data-prominence])': {
        backgroundColor: style.tokenSchema.color.scale.slate4,
        color: style.tokenSchema.color.foreground.neutralEmphasis,
        '&[data-hovered], &[data-focus="visible"]': {
          backgroundColor: style.tokenSchema.color.scale.slate5
        },
        '&[data-pressed]': {
          backgroundColor: style.tokenSchema.color.scale.slate6
        },
        // tones
        '&[data-tone=accent]': {
          color: style.tokenSchema.color.foreground.accent
        },
        '&[data-tone=critical]': {
          color: style.tokenSchema.color.foreground.critical
        },
        // states
        '&:disabled, &[aria-disabled]': {
          backgroundColor: style.tokenSchema.color.alias.backgroundHovered,
          color: style.tokenSchema.color.alias.foregroundDisabled
        },
        // static
        '&[data-static=light]': {
          backgroundColor: '#ffffff12',
          color: '#fff',
          '&[data-hovered], &[data-focus="visible"]': {
            backgroundColor: '#ffffff1a'
          },
          '&[data-pressed]': {
            backgroundColor: '#ffffff26'
          },
          '&:disabled, &[aria-disabled]': {
            backgroundColor: '#ffffff1a',
            color: '#ffffff8c'
          }
        },
        '&[data-static=dark]': {
          backgroundColor: '#00000012',
          color: '#000',
          '&[data-hovered], &[data-focus="visible"]': {
            backgroundColor: '#0000001a'
          },
          '&[data-pressed]': {
            backgroundColor: '#00000026'
          },
          '&:disabled, &[aria-disabled]': {
            backgroundColor: '#0000001a',
            color: '#0000008c'
          }
        }
      },
      // PROMINENCE: high
      '&[data-prominence=high]': {
        backgroundColor: style.tokenSchema.color.scale.slate10,
        color: style.tokenSchema.color.foreground.inverse,
        '&[data-hovered], &[data-focus="visible"]': {
          backgroundColor: style.tokenSchema.color.scale.slate11
        },
        '&[data-pressed]': {
          backgroundColor: style.tokenSchema.color.scale.slate11
        },
        // NOTE: "neutral" tone invalid for "high" prominence
        '&[data-tone=accent]': {
          backgroundColor: style.tokenSchema.color.scale.indigo9,
          color: style.tokenSchema.color.foreground.onEmphasis,
          '&[data-hovered], &[data-focus="visible"]': {
            backgroundColor: style.tokenSchema.color.scale.indigo10
          },
          '&[data-pressed]': {
            backgroundColor: style.tokenSchema.color.scale.indigo11
          }
        },
        '&[data-tone=critical]': {
          backgroundColor: style.tokenSchema.color.scale.red9,
          color: style.tokenSchema.color.foreground.onEmphasis,
          '&[data-hovered], &[data-focus="visible"]': {
            backgroundColor: style.tokenSchema.color.scale.red10
          },
          '&[data-pressed]': {
            backgroundColor: style.tokenSchema.color.scale.red11
          }
        },
        '&:disabled, &[aria-disabled]': {
          backgroundColor: style.tokenSchema.color.background.surfaceTertiary,
          color: style.tokenSchema.color.alias.foregroundDisabled
        },
        // static
        '&[data-static=light]': {
          backgroundColor: '#ffffffe6',
          color: '#000',
          '&[data-hovered], &[data-focus="visible"]': {
            backgroundColor: '#fff'
          },
          '&[data-pressed]': {
            backgroundColor: '#fff'
          },
          '&:disabled, &[aria-disabled]': {
            backgroundColor: '#ffffff1a',
            color: '#ffffff8c'
          }
        },
        '&[data-static=dark]': {
          backgroundColor: '#000000e6',
          color: '#fff',
          '&[data-hovered], &[data-focus="visible"]': {
            backgroundColor: '#000'
          },
          '&[data-pressed]': {
            backgroundColor: '#000'
          },
          '&:disabled, &[aria-disabled]': {
            backgroundColor: '#0000001a',
            color: '#0000008c'
          }
        }
      },
      // PROMINENCE: low
      '&[data-prominence=low]': {
        color: style.tokenSchema.color.foreground.neutral,
        // neutral interactions
        '&[data-hovered], &[data-focus="visible"]': {
          backgroundColor: style.tokenSchema.color.alias.backgroundHovered,
          color: style.tokenSchema.color.foreground.neutralEmphasis
        },
        '&[data-pressed]': {
          backgroundColor: style.tokenSchema.color.alias.backgroundPressed
        },
        // tones
        '&[data-tone=accent]': {
          color: style.tokenSchema.color.foreground.accent,
          '&[data-hovered], &[data-focus="visible"]': {
            backgroundColor: style.tokenSchema.color.scale.indigo3
          },
          '&[data-pressed]': {
            backgroundColor: style.tokenSchema.color.scale.indigo4
          }
        },
        '&[data-tone=critical]': {
          color: style.tokenSchema.color.foreground.critical,
          '&[data-hovered], &[data-focus="visible"]': {
            backgroundColor: style.tokenSchema.color.scale.red3
          },
          '&[data-pressed]': {
            backgroundColor: style.tokenSchema.color.scale.red4
          }
        },
        '&:disabled, &[aria-disabled]': {
          color: style.tokenSchema.color.alias.foregroundDisabled
        },
        // static
        '&[data-static=light]': {
          color: '#fff',
          '&[data-hovered], &[data-focus="visible"]': {
            backgroundColor: '#ffffff1a'
          },
          '&[data-pressed]': {
            backgroundColor: '#ffffff26'
          },
          '&:disabled, &[aria-disabled]': {
            color: '#ffffff8c'
          }
        },
        '&[data-static=dark]': {
          color: '#000',
          '&[data-hovered], &[data-focus="visible"]': {
            backgroundColor: '#0000001a'
          },
          '&[data-pressed]': {
            backgroundColor: '#00000026'
          },
          '&:disabled, &[aria-disabled]': {
            color: '#0000008c'
          }
        }
      }
    }), styleProps.className)
  };
}

const Button = /*#__PURE__*/React.forwardRef(function Button(props, forwardedRef) {
  props = core.useProviderProps(props);
  props = slots.useSlotProps(props, 'button');
  const children = useButtonChildren(props);
  const domRef = utils.useObjectRef(forwardedRef);
  if ('href' in props && props.href) {
    return /*#__PURE__*/jsxRuntime.jsx(style.FocusRing, {
      autoFocus: props.autoFocus,
      children: /*#__PURE__*/jsxRuntime.jsx(LinkButton$1, {
        ref: domRef,
        ...props,
        children: children
      })
    });
  }
  return /*#__PURE__*/jsxRuntime.jsx(style.FocusRing, {
    autoFocus: props.autoFocus,
    children: /*#__PURE__*/jsxRuntime.jsx(BaseButton$1, {
      ref: domRef,
      ...props,
      children: children
    })
  });
});

// Variants
// -----------------------------------------------------------------------------

/** @private Forked variant where an "href" is provided. */
const LinkButton$1 = /*#__PURE__*/React.forwardRef(function Button(props, forwardedRef) {
  const {
    children,
    isDisabled,
    // link specific
    download,
    href,
    hrefLang,
    ping,
    referrerPolicy,
    rel,
    target,
    ...otherProps
  } = props;
  const domRef = utils.useObjectRef(forwardedRef);
  const {
    buttonProps,
    isPressed
  } = button.useButton({
    elementType: 'a',
    ...props
  }, domRef);
  const {
    linkProps
  } = link.useLink(otherProps, domRef);
  const {
    hoverProps,
    isHovered
  } = interactions.useHover({
    isDisabled
  });
  const styleProps = useButtonStyles(props, {
    isHovered,
    isPressed
  });
  return /*#__PURE__*/jsxRuntime.jsx("a", {
    ...utils.filterDOMProps(otherProps),
    ...utils.mergeProps(buttonProps, linkProps, hoverProps, styleProps),
    ref: domRef,
    download: download,
    href: href,
    hrefLang: hrefLang,
    ping: ping,
    referrerPolicy: referrerPolicy,
    rel: rel,
    target: target,
    children: children
  });
});

/** @private Forked variant where an "href" is NOT provided. */
const BaseButton$1 = /*#__PURE__*/React.forwardRef(function Button(props, forwardedRef) {
  const {
    children,
    isDisabled,
    ...otherProps
  } = props;
  const domRef = utils.useObjectRef(forwardedRef);
  const {
    buttonProps,
    isPressed
  } = button.useButton(props, domRef);
  const {
    hoverProps,
    isHovered
  } = interactions.useHover({
    isDisabled
  });
  const styleProps = useButtonStyles(props, {
    isHovered,
    isPressed
  });
  return /*#__PURE__*/jsxRuntime.jsx("button", {
    ref: domRef,
    ...styleProps,
    ...utils.filterDOMProps(otherProps, {
      propNames: new Set(['form'])
    }),
    ...utils.mergeProps(buttonProps, hoverProps),
    children: children
  });
});

// Utils
// -----------------------------------------------------------------------------

const useButtonChildren = props => {
  const {
    children
  } = props;

  // avoid unnecessary re-renders
  const slots$1 = React.useMemo(() => {
    return {
      icon: {
        UNSAFE_className: buttonClassList.element('icon')
      },
      text: {
        color: 'inherit',
        overflow: 'unset',
        trim: false,
        UNSAFE_className: buttonClassList.element('text')
      }
    };
  }, []);
  return /*#__PURE__*/jsxRuntime.jsx(slots.SlotProvider, {
    slots: slots$1,
    children: utils$1.isReactText(children) ? /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
      children: children
    }) : children
  });
};

const actionButtonClassList = new style.ClassList('ActionButton', ['icon', 'text']);
function useActionButtonStyles(props, state) {
  const {
    prominence = 'default'
  } = props;
  const {
    isHovered,
    isPressed
  } = state;
  const isSelected = 'isSelected' in props && props.isSelected || state.isSelected;
  const styleProps = style.useStyleProps(props);
  return {
    ...style.toDataAttributes({
      interaction: isPressed ? 'press' : isHovered ? 'hover' : undefined,
      prominence: prominence === 'default' ? undefined : prominence,
      selected: isSelected || undefined,
      static: props.static
    }),
    style: styleProps.style,
    className: style.classNames(actionButtonClassList.element('root'), style.css({
      alignItems: 'center',
      borderColor: 'transparent',
      borderRadius: style.tokenSchema.size.radius.regular,
      borderStyle: 'solid',
      borderWidth: style.tokenSchema.size.border.regular,
      cursor: 'default',
      display: 'inline-flex',
      flexShrink: 0,
      fontWeight: style.tokenSchema.typography.fontWeight.medium,
      height: style.tokenSchema.size.element.regular,
      justifyContent: 'center',
      minWidth: style.tokenSchema.size.element.regular,
      outline: 0,
      paddingInline: style.tokenSchema.size.space.regular,
      position: 'relative',
      transitionDuration: '130ms',
      transitionProperty: 'background, border-color, box-shadow, color',
      transitionTimingFunction: 'ease-out',
      userSelect: 'none',
      // indicate when external link? e.g. `&[href^=http]`
      'a&': {
        cursor: 'pointer'
      },
      // CONTENTS
      [actionButtonClassList.selector('text', 'descendant')]: {
        fontWeight: 'inherit',
        marginInline: style.tokenSchema.size.space.small,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      // FOCUS RING
      '--focus-ring-color': style.tokenSchema.color.alias.focusRing,
      '&[data-static]': {
        '--focus-ring-color': 'currentColor'
      },
      '&::after': {
        borderRadius: `inherit`,
        content: '""',
        inset: 0,
        margin: 0,
        pointerEvents: 'none',
        position: 'absolute',
        transition: style.transition(['box-shadow', 'margin'], {
          easing: 'easeOut'
        })
      },
      '&[data-focus=visible]::after': {
        boxShadow: `0 0 0 ${style.tokenSchema.size.alias.focusRing} var(--focus-ring-color)`
      },
      // PROMINENCE

      // prominence: default
      '&:not([data-prominence])': {
        backgroundColor: style.tokenSchema.color.alias.backgroundIdle,
        borderColor: style.tokenSchema.color.alias.borderIdle,
        color: style.tokenSchema.color.alias.foregroundIdle,
        // interactions
        '&[data-interaction=hover]': {
          backgroundColor: style.tokenSchema.color.alias.backgroundHovered,
          borderColor: style.tokenSchema.color.alias.borderHovered,
          color: style.tokenSchema.color.alias.foregroundHovered
        },
        '&[data-interaction=press]': {
          backgroundColor: style.tokenSchema.color.alias.backgroundPressed,
          borderColor: style.tokenSchema.color.alias.borderPressed,
          color: style.tokenSchema.color.alias.foregroundPressed
        },
        // states
        '&[data-selected]': {
          backgroundColor: style.tokenSchema.color.alias.backgroundSelected,
          color: style.tokenSchema.color.foreground.neutralEmphasis,
          '&[data-interaction=hover]': {
            backgroundColor: style.tokenSchema.color.alias.backgroundSelectedHovered
          }
        },
        '&:disabled, &[aria-disabled=true], &[data-disabled=true]': {
          backgroundColor: style.tokenSchema.color.alias.backgroundDisabled,
          borderColor: 'transparent',
          color: style.tokenSchema.color.alias.foregroundDisabled
        },
        // static
        '&[data-static]': {
          backgroundColor: 'transparent'
        },
        '&[data-static=light]': {
          borderColor: '#fff6',
          color: '#fff',
          '&[data-interaction=hover], &[data-focus="visible"]': {
            backgroundColor: '#ffffff1a',
            borderColor: '#ffffff8c'
          },
          '&[data-interaction=press]': {
            backgroundColor: '#ffffff26',
            borderColor: '#ffffffb3'
          },
          '&:disabled, &[aria-disabled]': {
            borderColor: '#ffffff40',
            color: '#ffffff8c'
          }
        },
        '&[data-static=dark]': {
          borderColor: '#0006',
          color: '#000',
          '&[data-interaction=hover], &[data-focus="visible"]': {
            backgroundColor: '#0000001a',
            borderColor: '#0000008c'
          },
          '&[data-interaction=press]': {
            backgroundColor: '#00000026',
            borderColor: '#000000b3'
          },
          '&:disabled, &[aria-disabled]': {
            borderColor: '#00000040',
            color: '#0000008c'
          }
        }
      },
      // prominence: low
      '&[data-prominence=low]': {
        color: style.tokenSchema.color.foreground.neutral,
        // interactions
        '&[data-interaction=hover]': {
          backgroundColor: style.tokenSchema.color.alias.backgroundHovered,
          color: style.tokenSchema.color.foreground.neutralEmphasis
        },
        '&[data-interaction=press]': {
          backgroundColor: style.tokenSchema.color.alias.backgroundPressed
        },
        // states
        '&[data-selected]': {
          backgroundColor: style.tokenSchema.color.alias.backgroundSelected,
          color: style.tokenSchema.color.alias.foregroundSelected,
          '&[data-interaction=hover]': {
            backgroundColor: style.tokenSchema.color.alias.backgroundSelectedHovered
          }
        },
        '&:disabled, &[aria-disabled=true], &[data-disabled=true]': {
          borderColor: 'transparent',
          color: style.tokenSchema.color.alias.foregroundDisabled
        },
        // static
        '&[data-static=light]': {
          color: '#fff',
          '&[data-interaction=hover], &[data-focus="visible"]': {
            backgroundColor: '#ffffff1a'
          },
          '&[data-interaction=press]': {
            backgroundColor: '#ffffff26'
          },
          '&:disabled, &[aria-disabled]': {
            color: '#ffffff8c'
          }
        },
        '&[data-static=dark]': {
          color: '#000',
          '&[data-interaction=hover], &[data-focus="visible"]': {
            backgroundColor: '#0000001a'
          },
          '&[data-interaction=press]': {
            backgroundColor: '#00000026'
          },
          '&:disabled, &[aria-disabled]': {
            color: '#0000008c'
          }
        }
      }
    }), styleProps.className)
  };
}

/**
 * Action buttons allow users to perform an action. They’re used for similar,
 * task-based options within a workflow, and are ideal for interfaces where
 * buttons aren’t meant to draw a lot of attention.
 */
const ActionButton = /*#__PURE__*/React.forwardRef(function ActionButton(props, forwardedRef) {
  const domRef = utils.useObjectRef(forwardedRef);
  const children = useActionButtonChildren(props);
  if ('href' in props && props.href) {
    return /*#__PURE__*/jsxRuntime.jsx(style.FocusRing, {
      autoFocus: props.autoFocus,
      children: /*#__PURE__*/jsxRuntime.jsx(LinkButton, {
        ref: domRef,
        ...props,
        children: children
      })
    });
  }
  return /*#__PURE__*/jsxRuntime.jsx(style.FocusRing, {
    autoFocus: props.autoFocus,
    children: /*#__PURE__*/jsxRuntime.jsx(BaseButton, {
      ref: domRef,
      ...props,
      children: children
    })
  });
});

// Variants
// -----------------------------------------------------------------------------

/** @private Forked variant where an "href" is provided. */
const LinkButton = /*#__PURE__*/React.forwardRef(function LinkActionButton(props, forwardedRef) {
  const {
    children,
    isDisabled,
    // link specific
    download,
    href,
    hrefLang,
    ping,
    referrerPolicy,
    rel,
    target,
    ...otherProps
  } = props;
  const domRef = utils.useObjectRef(forwardedRef);
  const {
    buttonProps,
    isPressed
  } = button.useButton({
    elementType: 'a',
    ...props
  }, domRef);
  const {
    linkProps
  } = link.useLink(otherProps, domRef);
  const {
    hoverProps,
    isHovered
  } = interactions.useHover({
    isDisabled
  });
  const styleProps = useActionButtonStyles(props, {
    isHovered,
    isPressed
  });
  return /*#__PURE__*/jsxRuntime.jsx("a", {
    ...utils.filterDOMProps(otherProps),
    ...utils.mergeProps(buttonProps, linkProps, hoverProps, styleProps),
    ref: domRef,
    download: download,
    href: href,
    hrefLang: hrefLang,
    ping: ping,
    referrerPolicy: referrerPolicy,
    rel: rel,
    target: target,
    children: children
  });
});

/** @private Forked variant where an "href" is NOT provided. */
const BaseButton = /*#__PURE__*/React.forwardRef(function BaseActionButton(props, forwardedRef) {
  props = core.useProviderProps(props);
  props = slots.useSlotProps(props, 'button');
  const {
    children,
    isDisabled,
    ...otherProps
  } = props;
  const domRef = utils.useObjectRef(forwardedRef);
  const {
    buttonProps,
    isPressed
  } = button.useButton(props, domRef);
  const {
    hoverProps,
    isHovered
  } = interactions.useHover({
    isDisabled
  });
  const styleProps = useActionButtonStyles(props, {
    isHovered,
    isPressed
  });
  return /*#__PURE__*/jsxRuntime.jsx("button", {
    ref: domRef,
    ...styleProps,
    ...utils.filterDOMProps(otherProps, {
      propNames: new Set(['form'])
    }),
    ...utils.mergeProps(buttonProps, hoverProps),
    children: children
  });
});

// Utils
// -----------------------------------------------------------------------------

let iconClassName = actionButtonClassList.element('icon');
let textClassName = actionButtonClassList.element('text');
const useActionButtonChildren = (props, alternateSlots) => {
  const {
    children
  } = props;

  // avoid unnecessary re-renders
  const slots$1 = React.useMemo(() => {
    return {
      ...alternateSlots,
      icon: {
        UNSAFE_className: iconClassName,
        ...(alternateSlots === null || alternateSlots === void 0 ? void 0 : alternateSlots.icon)
      },
      text: {
        color: 'inherit',
        overflow: 'unset',
        trim: false,
        UNSAFE_className: textClassName,
        ...(alternateSlots === null || alternateSlots === void 0 ? void 0 : alternateSlots.text)
      }
    };
  }, [alternateSlots]);
  return /*#__PURE__*/jsxRuntime.jsx(slots.SlotProvider, {
    slots: slots$1,
    children: utils$1.isReactText(children) ? /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
      children: children
    }) : children
  });
};

/**
 * A clear button is a button that is typically found on search fields and is
 * used to clear the current search query. This can be useful if the user has
 * entered a search query by mistake, or if they want to start over with a new
 * search.
 */
const ClearButton = /*#__PURE__*/React.forwardRef(function ClearButton(props, forwardedRef) {
  let {
    autoFocus,
    isDisabled,
    preventFocus,
    elementType = preventFocus ? 'div' : 'button',
    ...otherProps
  } = props;
  let domRef = utils.useObjectRef(forwardedRef);
  let {
    buttonProps,
    isPressed
  } = button.useButton({
    ...props,
    elementType
  }, domRef);
  let {
    hoverProps,
    isHovered
  } = interactions.useHover({
    isDisabled
  });
  let styleProps = useClearButtonStyles(otherProps, {
    isHovered,
    isPressed
  });

  // For cases like the clear button in a search field, remove the tabIndex so
  // iOS 14 with VoiceOver doesn't focus the button and hide the keyboard when
  // moving the cursor over the clear button.
  if (preventFocus) {
    delete buttonProps.tabIndex;
  }
  let ElementType = elementType;
  return /*#__PURE__*/jsxRuntime.jsx(style.FocusRing, {
    autoFocus: autoFocus,
    children: /*#__PURE__*/jsxRuntime.jsx(ElementType, {
      ...styleProps,
      ...utils.mergeProps(buttonProps, hoverProps),
      ref: domRef,
      children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
        src: xIcon.xIcon
      })
    })
  });
});
function useClearButtonStyles(props, state) {
  let {
    isPressed,
    isHovered
  } = state;
  let styleProps = style.useStyleProps(props);
  const clearButtonStyles = style.css({
    alignItems: 'center',
    borderRadius: '100%',
    color: style.tokenSchema.color.foreground.neutralSecondary,
    display: 'flex',
    height: style.tokenSchema.size.element.regular,
    justifyContent: 'center',
    outline: 0,
    position: 'relative',
    transition: style.transition(['box-shadow', 'margin'], {
      easing: 'easeOut'
    }),
    width: style.tokenSchema.size.element.regular,
    '--focus-ring-color': style.tokenSchema.color.alias.focusRing,
    '&[data-static]': {
      '--focus-ring-color': 'currentColor'
    },
    '&::after': {
      borderRadius: `inherit`,
      content: '""',
      inset: 0,
      pointerEvents: 'none',
      position: 'absolute',
      transition: style.transition(['box-shadow', 'margin'], {
        easing: 'easeOut'
      })
    },
    '&[data-focus=visible]::after': {
      boxShadow: `0 0 0 ${style.tokenSchema.size.alias.focusRing} var(--focus-ring-color)`,
      margin: `calc(-1 * ${style.tokenSchema.size.alias.focusRingGap})`
    },
    '&[data-interaction=hover]': {
      color: style.tokenSchema.color.foreground.neutral
    },
    '&[data-interaction=press]': {
      color: style.tokenSchema.color.foreground.neutralEmphasis
    },
    '&:disabled, &[aria-disabled]': {
      color: style.tokenSchema.color.alias.foregroundDisabled
    },
    // static
    '&[data-static=light]': {
      color: '#fff',
      '&[data-interaction=hover], &[data-focus="visible"]': {
        backgroundColor: '#ffffff1a'
      },
      '&[data-interaction=press]': {
        backgroundColor: '#ffffff26'
      },
      '&:disabled, &[aria-disabled]': {
        backgroundColor: '#ffffff1a',
        color: '#ffffff8c'
      }
    },
    '&[data-static=dark]': {
      color: '#000',
      '&[data-interaction=hover], &[data-focus="visible"]': {
        backgroundColor: '#0000001a'
      },
      '&[data-interaction=press]': {
        backgroundColor: '#00000026'
      },
      '&:disabled, &[aria-disabled]': {
        backgroundColor: '#0000001a',
        color: '#0000008c'
      }
    }
  });
  return {
    ...styleProps,
    ...style.toDataAttributes({
      static: props.static,
      interaction: isPressed ? 'press' : isHovered ? 'hover' : undefined
    }),
    className: style.classNames(clearButtonStyles, styleProps.className)
  };
}

const FieldButton = /*#__PURE__*/React.forwardRef(function FieldButton(props, forwardedRef) {
  props = slots.useSlotProps(props, 'button');
  let {
    elementType: ElementType = 'button',
    isDisabled,
    autoFocus,
    isActive
  } = props;
  let domRef = utils.useObjectRef(forwardedRef);
  let {
    buttonProps,
    isPressed
  } = button.useButton(props, domRef);
  let {
    hoverProps,
    isHovered
  } = interactions.useHover({
    isDisabled
  });
  let {
    children,
    styleProps
  } = useFieldButton(props, {
    isHovered,
    isPressed: isActive !== null && isActive !== void 0 ? isActive : isPressed
  });
  return /*#__PURE__*/jsxRuntime.jsx(style.FocusRing, {
    autoFocus: autoFocus,
    children: /*#__PURE__*/jsxRuntime.jsx(ElementType, {
      ...styleProps,
      ...utils.mergeProps(buttonProps, hoverProps),
      ref: domRef,
      className: style.classNames(style.css({
        justifyContent: 'space-between',
        textAlign: 'start'
      }), styleProps.className),
      style: {
        ...styleProps.style,
        boxShadow: 'none'
      },
      children: children
    })
  });
});

// Utils
// -----------------------------------------------------------------------------
function useFieldButton(props, state) {
  let {
    isHovered,
    isPressed
  } = state;
  const styleProps = useActionButtonStyles(props, {
    isHovered,
    isPressed
  });
  let slots = React.useMemo(() => ({
    text: {
      flex: true,
      truncate: true
    }
  }), []);
  let children = useActionButtonChildren(props, slots);
  return {
    children,
    styleProps
  };
}

const ToggleButton = /*#__PURE__*/React.forwardRef(function ToggleButton(props, forwardedRef) {
  const {
    isDisabled,
    ...otherProps
  } = props;
  props = core.useProviderProps(props);
  props = slots.useSlotProps(props, 'button');
  const children = useActionButtonChildren(props);
  const domRef = utils.useObjectRef(forwardedRef);
  const state = toggle.useToggleState(props);
  const {
    buttonProps,
    isPressed
  } = button.useToggleButton(props, state, domRef);
  const {
    hoverProps,
    isHovered
  } = interactions.useHover({
    isDisabled
  });
  const styleProps = useActionButtonStyles(props, {
    isHovered,
    isPressed,
    isSelected: state.isSelected
  });
  return /*#__PURE__*/jsxRuntime.jsx(style.FocusRing, {
    autoFocus: props.autoFocus,
    children: /*#__PURE__*/jsxRuntime.jsx("button", {
      ref: domRef,
      ...styleProps,
      ...utils.mergeProps(buttonProps, hoverProps),
      ...utils.filterDOMProps(otherProps),
      children: children
    })
  });
});

exports.ActionButton = ActionButton;
exports.Button = Button;
exports.ButtonGroup = ButtonGroup;
exports.ClearButton = ClearButton;
exports.FieldButton = FieldButton;
exports.ToggleButton = ToggleButton;
exports.actionButtonClassList = actionButtonClassList;
exports.buttonClassList = buttonClassList;
exports.useFieldButton = useFieldButton;