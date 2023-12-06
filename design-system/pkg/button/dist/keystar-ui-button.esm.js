'use client';
import { useObjectRef, useValueEffect, useLayoutEffect, useResizeObserver, filterDOMProps, mergeProps } from '@react-aria/utils';
import { forwardRef, useCallback, useRef, useMemo } from 'react';
import { useProvider, useProviderProps, KeystarProvider } from '@keystar/ui/core';
import { useSlotProps, SlotProvider } from '@keystar/ui/slots';
import { useStyleProps, toDataAttributes, classNames, css, tokenSchema, ClassList, transition, FocusRing } from '@keystar/ui/style';
import { jsx } from 'react/jsx-runtime';
import { useButton, useToggleButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { useLink } from '@react-aria/link';
import { Text } from '@keystar/ui/typography';
import { isReactText } from '@keystar/ui/utils';
import { xIcon } from '@keystar/ui/icon/icons/xIcon';
import { Icon } from '@keystar/ui/icon';
import { useToggleState } from '@react-stately/toggle';

/**
 * Handles overflow for a grouping of buttons whose actions are related to each
 * other.
 */
const ButtonGroup = /*#__PURE__*/forwardRef(function ButtonGroup(props, forwardedRef) {
  let {
    scale
  } = useProvider();
  props = useProviderProps(props);
  props = useSlotProps(props, 'buttonGroup');
  let {
    align = 'start',
    children,
    isDisabled,
    orientation = 'horizontal',
    ...otherProps
  } = props;
  let styleProps = useStyleProps(otherProps);
  let domRef = useObjectRef(forwardedRef);
  let [hasOverflow, setHasOverflow] = useValueEffect(false);

  // Avoid widows, horizontal orientations may switch to vertical when there
  // isn't enough space for all buttons in a single row. There's no "wrap"
  // event, so we have to measure.
  let checkForOverflow = useCallback(() => {
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
  useLayoutEffect(() => {
    checkForOverflow();
  }, [checkForOverflow]);

  // 2. External changes: buttongroup won't change size due to any parents
  //    changing size, so listen to its container for size changes to figure out
  //    if we should remeasure
  let parent = useRef();
  useLayoutEffect(() => {
    if (domRef.current) {
      parent.current = domRef.current.parentElement;
    }
  });
  useResizeObserver({
    ref: parent,
    onResize: checkForOverflow
  });
  return /*#__PURE__*/jsx("div", {
    ...filterDOMProps(otherProps),
    ...toDataAttributes({
      align,
      orientation: hasOverflow ? 'vertical' : orientation
    }),
    ...styleProps,
    ref: domRef,
    className: classNames(styleProps.className, css({
      alignItems: 'flex-start',
      display: 'inline-flex',
      gap: tokenSchema.size.space.regular,
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
    children: /*#__PURE__*/jsx(KeystarProvider, {
      isDisabled: isDisabled,
      children: children
    })
  });
});

const buttonClassList = new ClassList('Button', ['icon', 'text']);
function useButtonStyles(props, state) {
  const {
    prominence = 'default',
    tone = prominence === 'high' ? 'accent' : 'neutral'
  } = props;
  const {
    isHovered,
    isPressed
  } = state;
  const styleProps = useStyleProps(props);
  return {
    ...toDataAttributes({
      hovered: isHovered || undefined,
      pressed: isPressed || undefined,
      prominence: prominence === 'default' ? undefined : prominence,
      tone: tone === 'neutral' ? undefined : tone,
      static: props.static
    }),
    style: styleProps.style,
    className: classNames(buttonClassList.element('root'), css({
      alignItems: 'center',
      borderRadius: tokenSchema.size.radius.regular,
      cursor: 'default',
      display: 'inline-flex',
      flexShrink: 0,
      fontSize: tokenSchema.typography.text.regular.size,
      fontWeight: tokenSchema.typography.fontWeight.semibold,
      height: tokenSchema.size.element.regular,
      justifyContent: 'center',
      minWidth: tokenSchema.size.element.regular,
      outline: 0,
      gap: tokenSchema.size.space.regular,
      paddingInline: tokenSchema.size.space.large,
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
        height: tokenSchema.size.scale[225],
        width: tokenSchema.size.scale[225]
      },
      // focus ring
      '--focus-ring-color': tokenSchema.color.alias.focusRing,
      '&[data-static=light]': {
        '--focus-ring-color': '#fff'
      },
      '&[data-static=dark]': {
        '--focus-ring-color': '#000'
      },
      '&::after': {
        borderRadius: `calc(${tokenSchema.size.radius.regular} + ${tokenSchema.size.alias.focusRingGap})`,
        content: '""',
        inset: 0,
        pointerEvents: 'none',
        position: 'absolute',
        transition: transition(['box-shadow', 'margin'], {
          easing: 'easeOut'
        })
      },
      '&[data-focus=visible]::after': {
        boxShadow: `0 0 0 ${tokenSchema.size.alias.focusRing} var(--focus-ring-color)`,
        margin: `calc(-1 * ${tokenSchema.size.alias.focusRingGap})`
      },
      // PROMINENCE: default
      '&:not([data-prominence])': {
        backgroundColor: tokenSchema.color.scale.slate4,
        color: tokenSchema.color.foreground.neutralEmphasis,
        '&[data-hovered], &[data-focus="visible"]': {
          backgroundColor: tokenSchema.color.scale.slate5
        },
        '&[data-pressed]': {
          backgroundColor: tokenSchema.color.scale.slate6
        },
        // tones
        '&[data-tone=accent]': {
          color: tokenSchema.color.foreground.accent
        },
        '&[data-tone=critical]': {
          color: tokenSchema.color.foreground.critical
        },
        // states
        '&:disabled, &[aria-disabled]': {
          backgroundColor: tokenSchema.color.alias.backgroundHovered,
          color: tokenSchema.color.alias.foregroundDisabled
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
        backgroundColor: tokenSchema.color.scale.slate10,
        color: tokenSchema.color.foreground.inverse,
        '&[data-hovered], &[data-focus="visible"]': {
          backgroundColor: tokenSchema.color.scale.slate11
        },
        '&[data-pressed]': {
          backgroundColor: tokenSchema.color.scale.slate11
        },
        // NOTE: "neutral" tone invalid for "high" prominence
        '&[data-tone=accent]': {
          backgroundColor: tokenSchema.color.scale.indigo9,
          color: tokenSchema.color.foreground.onEmphasis,
          '&[data-hovered], &[data-focus="visible"]': {
            backgroundColor: tokenSchema.color.scale.indigo10
          },
          '&[data-pressed]': {
            backgroundColor: tokenSchema.color.scale.indigo11
          }
        },
        '&[data-tone=critical]': {
          backgroundColor: tokenSchema.color.scale.red9,
          color: tokenSchema.color.foreground.onEmphasis,
          '&[data-hovered], &[data-focus="visible"]': {
            backgroundColor: tokenSchema.color.scale.red10
          },
          '&[data-pressed]': {
            backgroundColor: tokenSchema.color.scale.red11
          }
        },
        '&:disabled, &[aria-disabled]': {
          backgroundColor: tokenSchema.color.background.surfaceTertiary,
          color: tokenSchema.color.alias.foregroundDisabled
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
        color: tokenSchema.color.foreground.neutral,
        // neutral interactions
        '&[data-hovered], &[data-focus="visible"]': {
          backgroundColor: tokenSchema.color.alias.backgroundHovered,
          color: tokenSchema.color.foreground.neutralEmphasis
        },
        '&[data-pressed]': {
          backgroundColor: tokenSchema.color.alias.backgroundPressed
        },
        // tones
        '&[data-tone=accent]': {
          color: tokenSchema.color.foreground.accent,
          '&[data-hovered], &[data-focus="visible"]': {
            backgroundColor: tokenSchema.color.scale.indigo3
          },
          '&[data-pressed]': {
            backgroundColor: tokenSchema.color.scale.indigo4
          }
        },
        '&[data-tone=critical]': {
          color: tokenSchema.color.foreground.critical,
          '&[data-hovered], &[data-focus="visible"]': {
            backgroundColor: tokenSchema.color.scale.red3
          },
          '&[data-pressed]': {
            backgroundColor: tokenSchema.color.scale.red4
          }
        },
        '&:disabled, &[aria-disabled]': {
          color: tokenSchema.color.alias.foregroundDisabled
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

const Button = /*#__PURE__*/forwardRef(function Button(props, forwardedRef) {
  props = useProviderProps(props);
  props = useSlotProps(props, 'button');
  const children = useButtonChildren(props);
  const domRef = useObjectRef(forwardedRef);
  if ('href' in props && props.href) {
    return /*#__PURE__*/jsx(FocusRing, {
      autoFocus: props.autoFocus,
      children: /*#__PURE__*/jsx(LinkButton$1, {
        ref: domRef,
        ...props,
        children: children
      })
    });
  }
  return /*#__PURE__*/jsx(FocusRing, {
    autoFocus: props.autoFocus,
    children: /*#__PURE__*/jsx(BaseButton$1, {
      ref: domRef,
      ...props,
      children: children
    })
  });
});

// Variants
// -----------------------------------------------------------------------------

/** @private Forked variant where an "href" is provided. */
const LinkButton$1 = /*#__PURE__*/forwardRef(function Button(props, forwardedRef) {
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
  const domRef = useObjectRef(forwardedRef);
  const {
    buttonProps,
    isPressed
  } = useButton({
    elementType: 'a',
    ...props
  }, domRef);
  const {
    linkProps
  } = useLink(otherProps, domRef);
  const {
    hoverProps,
    isHovered
  } = useHover({
    isDisabled
  });
  const styleProps = useButtonStyles(props, {
    isHovered,
    isPressed
  });
  return /*#__PURE__*/jsx("a", {
    ...filterDOMProps(otherProps),
    ...mergeProps(buttonProps, linkProps, hoverProps, styleProps),
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
const BaseButton$1 = /*#__PURE__*/forwardRef(function Button(props, forwardedRef) {
  const {
    children,
    isDisabled,
    ...otherProps
  } = props;
  const domRef = useObjectRef(forwardedRef);
  const {
    buttonProps,
    isPressed
  } = useButton(props, domRef);
  const {
    hoverProps,
    isHovered
  } = useHover({
    isDisabled
  });
  const styleProps = useButtonStyles(props, {
    isHovered,
    isPressed
  });
  return /*#__PURE__*/jsx("button", {
    ref: domRef,
    ...styleProps,
    ...filterDOMProps(otherProps, {
      propNames: new Set(['form'])
    }),
    ...mergeProps(buttonProps, hoverProps),
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
  const slots = useMemo(() => {
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
  return /*#__PURE__*/jsx(SlotProvider, {
    slots: slots,
    children: isReactText(children) ? /*#__PURE__*/jsx(Text, {
      children: children
    }) : children
  });
};

const actionButtonClassList = new ClassList('ActionButton', ['icon', 'text']);
function useActionButtonStyles(props, state) {
  const {
    prominence = 'default'
  } = props;
  const {
    isHovered,
    isPressed
  } = state;
  const isSelected = 'isSelected' in props && props.isSelected || state.isSelected;
  const styleProps = useStyleProps(props);
  return {
    ...toDataAttributes({
      interaction: isPressed ? 'press' : isHovered ? 'hover' : undefined,
      prominence: prominence === 'default' ? undefined : prominence,
      selected: isSelected || undefined,
      static: props.static
    }),
    style: styleProps.style,
    className: classNames(actionButtonClassList.element('root'), css({
      alignItems: 'center',
      borderColor: 'transparent',
      borderRadius: tokenSchema.size.radius.regular,
      borderStyle: 'solid',
      borderWidth: tokenSchema.size.border.regular,
      cursor: 'default',
      display: 'inline-flex',
      flexShrink: 0,
      fontWeight: tokenSchema.typography.fontWeight.medium,
      height: tokenSchema.size.element.regular,
      justifyContent: 'center',
      minWidth: tokenSchema.size.element.regular,
      outline: 0,
      paddingInline: tokenSchema.size.space.regular,
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
        marginInline: tokenSchema.size.space.small,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      // FOCUS RING
      '--focus-ring-color': tokenSchema.color.alias.focusRing,
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
        transition: transition(['box-shadow', 'margin'], {
          easing: 'easeOut'
        })
      },
      '&[data-focus=visible]::after': {
        boxShadow: `0 0 0 ${tokenSchema.size.alias.focusRing} var(--focus-ring-color)`
      },
      // PROMINENCE

      // prominence: default
      '&:not([data-prominence])': {
        backgroundColor: tokenSchema.color.alias.backgroundIdle,
        borderColor: tokenSchema.color.alias.borderIdle,
        color: tokenSchema.color.alias.foregroundIdle,
        // interactions
        '&[data-interaction=hover]': {
          backgroundColor: tokenSchema.color.alias.backgroundHovered,
          borderColor: tokenSchema.color.alias.borderHovered,
          color: tokenSchema.color.alias.foregroundHovered
        },
        '&[data-interaction=press]': {
          backgroundColor: tokenSchema.color.alias.backgroundPressed,
          borderColor: tokenSchema.color.alias.borderPressed,
          color: tokenSchema.color.alias.foregroundPressed
        },
        // states
        '&[data-selected]': {
          backgroundColor: tokenSchema.color.alias.backgroundSelected,
          color: tokenSchema.color.foreground.neutralEmphasis,
          '&[data-interaction=hover]': {
            backgroundColor: tokenSchema.color.alias.backgroundSelectedHovered
          }
        },
        '&:disabled, &[aria-disabled=true], &[data-disabled=true]': {
          backgroundColor: tokenSchema.color.alias.backgroundDisabled,
          borderColor: 'transparent',
          color: tokenSchema.color.alias.foregroundDisabled
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
        color: tokenSchema.color.foreground.neutral,
        // interactions
        '&[data-interaction=hover]': {
          backgroundColor: tokenSchema.color.alias.backgroundHovered,
          color: tokenSchema.color.foreground.neutralEmphasis
        },
        '&[data-interaction=press]': {
          backgroundColor: tokenSchema.color.alias.backgroundPressed
        },
        // states
        '&[data-selected]': {
          backgroundColor: tokenSchema.color.alias.backgroundSelected,
          color: tokenSchema.color.alias.foregroundSelected,
          '&[data-interaction=hover]': {
            backgroundColor: tokenSchema.color.alias.backgroundSelectedHovered
          }
        },
        '&:disabled, &[aria-disabled=true], &[data-disabled=true]': {
          borderColor: 'transparent',
          color: tokenSchema.color.alias.foregroundDisabled
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
const ActionButton = /*#__PURE__*/forwardRef(function ActionButton(props, forwardedRef) {
  const domRef = useObjectRef(forwardedRef);
  const children = useActionButtonChildren(props);
  if ('href' in props && props.href) {
    return /*#__PURE__*/jsx(FocusRing, {
      autoFocus: props.autoFocus,
      children: /*#__PURE__*/jsx(LinkButton, {
        ref: domRef,
        ...props,
        children: children
      })
    });
  }
  return /*#__PURE__*/jsx(FocusRing, {
    autoFocus: props.autoFocus,
    children: /*#__PURE__*/jsx(BaseButton, {
      ref: domRef,
      ...props,
      children: children
    })
  });
});

// Variants
// -----------------------------------------------------------------------------

/** @private Forked variant where an "href" is provided. */
const LinkButton = /*#__PURE__*/forwardRef(function LinkActionButton(props, forwardedRef) {
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
  const domRef = useObjectRef(forwardedRef);
  const {
    buttonProps,
    isPressed
  } = useButton({
    elementType: 'a',
    ...props
  }, domRef);
  const {
    linkProps
  } = useLink(otherProps, domRef);
  const {
    hoverProps,
    isHovered
  } = useHover({
    isDisabled
  });
  const styleProps = useActionButtonStyles(props, {
    isHovered,
    isPressed
  });
  return /*#__PURE__*/jsx("a", {
    ...filterDOMProps(otherProps),
    ...mergeProps(buttonProps, linkProps, hoverProps, styleProps),
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
const BaseButton = /*#__PURE__*/forwardRef(function BaseActionButton(props, forwardedRef) {
  props = useProviderProps(props);
  props = useSlotProps(props, 'button');
  const {
    children,
    isDisabled,
    ...otherProps
  } = props;
  const domRef = useObjectRef(forwardedRef);
  const {
    buttonProps,
    isPressed
  } = useButton(props, domRef);
  const {
    hoverProps,
    isHovered
  } = useHover({
    isDisabled
  });
  const styleProps = useActionButtonStyles(props, {
    isHovered,
    isPressed
  });
  return /*#__PURE__*/jsx("button", {
    ref: domRef,
    ...styleProps,
    ...filterDOMProps(otherProps, {
      propNames: new Set(['form'])
    }),
    ...mergeProps(buttonProps, hoverProps),
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
  const slots = useMemo(() => {
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
  return /*#__PURE__*/jsx(SlotProvider, {
    slots: slots,
    children: isReactText(children) ? /*#__PURE__*/jsx(Text, {
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
const ClearButton = /*#__PURE__*/forwardRef(function ClearButton(props, forwardedRef) {
  let {
    autoFocus,
    isDisabled,
    preventFocus,
    elementType = preventFocus ? 'div' : 'button',
    ...otherProps
  } = props;
  let domRef = useObjectRef(forwardedRef);
  let {
    buttonProps,
    isPressed
  } = useButton({
    ...props,
    elementType
  }, domRef);
  let {
    hoverProps,
    isHovered
  } = useHover({
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
  return /*#__PURE__*/jsx(FocusRing, {
    autoFocus: autoFocus,
    children: /*#__PURE__*/jsx(ElementType, {
      ...styleProps,
      ...mergeProps(buttonProps, hoverProps),
      ref: domRef,
      children: /*#__PURE__*/jsx(Icon, {
        src: xIcon
      })
    })
  });
});
function useClearButtonStyles(props, state) {
  let {
    isPressed,
    isHovered
  } = state;
  let styleProps = useStyleProps(props);
  const clearButtonStyles = css({
    alignItems: 'center',
    borderRadius: '100%',
    color: tokenSchema.color.foreground.neutralSecondary,
    display: 'flex',
    height: tokenSchema.size.element.regular,
    justifyContent: 'center',
    outline: 0,
    position: 'relative',
    transition: transition(['box-shadow', 'margin'], {
      easing: 'easeOut'
    }),
    width: tokenSchema.size.element.regular,
    '--focus-ring-color': tokenSchema.color.alias.focusRing,
    '&[data-static]': {
      '--focus-ring-color': 'currentColor'
    },
    '&::after': {
      borderRadius: `inherit`,
      content: '""',
      inset: 0,
      pointerEvents: 'none',
      position: 'absolute',
      transition: transition(['box-shadow', 'margin'], {
        easing: 'easeOut'
      })
    },
    '&[data-focus=visible]::after': {
      boxShadow: `0 0 0 ${tokenSchema.size.alias.focusRing} var(--focus-ring-color)`,
      margin: `calc(-1 * ${tokenSchema.size.alias.focusRingGap})`
    },
    '&[data-interaction=hover]': {
      color: tokenSchema.color.foreground.neutral
    },
    '&[data-interaction=press]': {
      color: tokenSchema.color.foreground.neutralEmphasis
    },
    '&:disabled, &[aria-disabled]': {
      color: tokenSchema.color.alias.foregroundDisabled
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
    ...toDataAttributes({
      static: props.static,
      interaction: isPressed ? 'press' : isHovered ? 'hover' : undefined
    }),
    className: classNames(clearButtonStyles, styleProps.className)
  };
}

const FieldButton = /*#__PURE__*/forwardRef(function FieldButton(props, forwardedRef) {
  props = useSlotProps(props, 'button');
  let {
    elementType: ElementType = 'button',
    isDisabled,
    autoFocus,
    isActive
  } = props;
  let domRef = useObjectRef(forwardedRef);
  let {
    buttonProps,
    isPressed
  } = useButton(props, domRef);
  let {
    hoverProps,
    isHovered
  } = useHover({
    isDisabled
  });
  let {
    children,
    styleProps
  } = useFieldButton(props, {
    isHovered,
    isPressed: isActive !== null && isActive !== void 0 ? isActive : isPressed
  });
  return /*#__PURE__*/jsx(FocusRing, {
    autoFocus: autoFocus,
    children: /*#__PURE__*/jsx(ElementType, {
      ...styleProps,
      ...mergeProps(buttonProps, hoverProps),
      ref: domRef,
      className: classNames(css({
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
  let slots = useMemo(() => ({
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

const ToggleButton = /*#__PURE__*/forwardRef(function ToggleButton(props, forwardedRef) {
  const {
    isDisabled,
    ...otherProps
  } = props;
  props = useProviderProps(props);
  props = useSlotProps(props, 'button');
  const children = useActionButtonChildren(props);
  const domRef = useObjectRef(forwardedRef);
  const state = useToggleState(props);
  const {
    buttonProps,
    isPressed
  } = useToggleButton(props, state, domRef);
  const {
    hoverProps,
    isHovered
  } = useHover({
    isDisabled
  });
  const styleProps = useActionButtonStyles(props, {
    isHovered,
    isPressed,
    isSelected: state.isSelected
  });
  return /*#__PURE__*/jsx(FocusRing, {
    autoFocus: props.autoFocus,
    children: /*#__PURE__*/jsx("button", {
      ref: domRef,
      ...styleProps,
      ...mergeProps(buttonProps, hoverProps),
      ...filterDOMProps(otherProps),
      children: children
    })
  });
});

export { ActionButton, Button, ButtonGroup, ClearButton, FieldButton, ToggleButton, actionButtonClassList, buttonClassList, useFieldButton };