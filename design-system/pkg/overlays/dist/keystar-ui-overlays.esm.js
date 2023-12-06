'use client';
import { useStyleProps, filterStyleProps, toDataAttributes, classNames, css, transition, tokenSchema, breakpointQueries, breakpoints } from '@keystar/ui/style';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Overlay as Overlay$1, useModalOverlay, usePopover, DismissButton } from '@react-aria/overlays';
import { useObjectRef, useViewportSize } from '@react-aria/utils';
import { Children, forwardRef, useState, useCallback, useRef } from 'react';
import { TOKEN_PREFIX } from '@keystar/ui/primitives';
import { KeystarProvider } from '@keystar/ui/core';
import Transition from 'react-transition-group/Transition';
import { cloneValidElement } from '@keystar/ui/utils';

/**
 * A low-level utility component that covers the underlying interface while an
 * overlay component is open.
 */
function Blanket(props) {
  const {
    isOpen,
    isTransparent,
    ...otherProps
  } = props;
  const styleProps = useStyleProps(otherProps);
  return /*#__PURE__*/jsx("div", {
    ...filterStyleProps(otherProps),
    ...toDataAttributes({
      fill: isTransparent ? 'transparent' : 'translucent',
      open: isOpen || undefined
    }),
    ...styleProps,
    className: classNames(css({
      inset: 0,
      opacity: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      position: 'fixed',
      visibility: 'hidden',
      zIndex: 1,
      // exit animation
      '&[data-fill="translucent"]': {
        backgroundColor: '#0006',
        // TODO: add token
        transition: [transition('opacity', {
          easing: 'easeOut',
          duration: 'regular',
          delay: 'short'
        }), transition('visibility', {
          delay: 'regular',
          duration: 0,
          easing: 'linear'
        })].join(', ')
      },
      '&[data-open="true"]': {
        opacity: 1,
        pointerEvents: 'auto',
        visibility: 'visible',
        // enter animation
        transition: transition('opacity', {
          easing: 'easeIn'
        })
      }
    }), styleProps.className)
  });
}

function DirectionIndicator({
  fill,
  placement,
  size,
  stroke,
  ...props
}) {
  return /*#__PURE__*/jsx("span", {
    ...props,
    ...toDataAttributes({
      fill,
      placement,
      size
    }),
    "data-placement": placement,
    className: classNames(css({
      height: 'var(--size)',
      position: 'absolute',
      width: 'var(--size)',
      // fill
      '&[data-fill="surface"]': {
        fill: tokenSchema.color.background.surface
      },
      '&[data-fill="inverse"]': {
        fill: tokenSchema.color.background.inverse
      },
      '&[data-fill="accent"]': {
        fill: tokenSchema.color.background.accentEmphasis
      },
      '&[data-fill="critical"]': {
        fill: tokenSchema.color.background.criticalEmphasis
      },
      '&[data-fill="positive"]': {
        fill: tokenSchema.color.background.positiveEmphasis
      },
      // size
      '&[data-size="xsmall"]': {
        '--size': tokenSchema.size.element.xsmall
      },
      '&[data-size="small"]': {
        '--size': tokenSchema.size.element.small
      },
      '&[data-size="regular"]': {
        '--size': tokenSchema.size.element.regular
      },
      // align block
      '&[data-placement="top"], &[data-placement="bottom"]': {
        left: '50%',
        transform: 'translateX(-50%)'
      },
      '&[data-placement="top"]': {
        top: '100%'
      },
      '&[data-placement="bottom"]': {
        bottom: '100%'
      },
      // align inline
      '&[data-placement="left"], &[data-placement="right"], &[data-placement="start"], &[data-placement="end"]': {
        top: '50%',
        transform: 'translateY(-50%)'
      },
      '&[data-placement="left"]': {
        left: '100%'
      },
      '&[data-placement="right"]': {
        right: '100%'
      },
      '&[data-placement="start"]': {
        insetInlineStart: '100%'
      },
      '&[data-placement="end"]': {
        insetInlineEnd: '100%'
      }
    }), props.className),
    children: /*#__PURE__*/jsxs("svg", {
      "data-placement": placement,
      viewBox: "0 0 30 30",
      className: css({
        // bottom is default; no rotation
        '&[data-placement="top"]': {
          transform: 'rotate(180deg)'
        },
        '&[data-placement="left"], [dir=ltr] &[data-placement="start"], [dir=rtl] &[data-placement="end"]': {
          transform: 'rotate(90deg)'
        },
        '&[data-placement="right"], [dir=ltr] &[data-placement="end"], [dir=rtl] &[data-placement="start"]': {
          transform: 'rotate(270deg)'
        }
      }),
      children: [stroke && /*#__PURE__*/jsx("path", {
        fill: stroke,
        d: "M23.7,27.1L17,19.9C16.5,19.3,15.8,19,15,19s-1.6,0.3-2.1,0.9l-6.6,7.2C5.3,28.1,3.4,29,2,29h26 C26.7,29,24.6,28.1,23.7,27.1z"
      }), /*#__PURE__*/jsx("path", {
        d: "M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"
      })]
    })
  });
}

function OpenTransition(props) {
  const {
    children
  } = props;
  return /*#__PURE__*/jsx(Transition, {
    timeout: {
      enter: 0,
      exit: 320
    },
    ...props,
    children: state => Children.map(children, child => {
      var _cloneValidElement;
      return (_cloneValidElement = cloneValidElement(child, {
        isOpen: state === 'entered'
      })) !== null && _cloneValidElement !== void 0 ? _cloneValidElement : child;
    })
  });
}

const Overlay = /*#__PURE__*/forwardRef(function Overlay(props, forwardedRef) {
  let {
    children,
    isOpen,
    container,
    nodeRef,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited
  } = props;
  let [exited, setExited] = useState(!isOpen);
  let handleEntered = useCallback(() => {
    setExited(false);
    if (onEntered) {
      onEntered();
    }
  }, [onEntered]);
  let handleExited = useCallback(() => {
    setExited(true);
    if (onExited) {
      onExited();
    }
  }, [onExited]);

  // NOTE: wait for the exit animation to complete before unmounting content.
  if (!(isOpen || !exited)) {
    return null;
  }
  return /*#__PURE__*/jsx(Overlay$1, {
    portalContainer: container,
    children: /*#__PURE__*/jsx(KeystarProvider, {
      ref: forwardedRef
      // ensure children
      ,
      UNSAFE_style: {
        background: 'transparent',
        isolation: 'isolate'
      }
      // unset container
      ,
      isDisabled: false,
      children: /*#__PURE__*/jsx(OpenTransition, {
        appear: true,
        in: isOpen,
        nodeRef: nodeRef,
        onEnter: onEnter,
        onEntered: handleEntered,
        onEntering: onEntering,
        onExit: onExit,
        onExited: handleExited,
        onExiting: onExiting,
        children: children
      })
    })
  });
});

/**
 * A low-level utility component for implementing things like dialogs and
 * popovers, in a layer above the page.
 */
const Modal = /*#__PURE__*/forwardRef(function Modal(props, forwardedRef) {
  let {
    children,
    state,
    ...otherProps
  } = props;
  let wrapperRef = useRef(null);
  return (
    /*#__PURE__*/
    /* @ts-expect-error FIXME: resolve ref inconsistencies */
    jsx(Overlay, {
      ...otherProps,
      isOpen: state.isOpen,
      nodeRef: wrapperRef,
      children: /*#__PURE__*/jsx(ModalWrapper, {
        ref: forwardedRef,
        ...props,
        wrapperRef: wrapperRef,
        children: children
      })
    })
  );
});
const MAX_HEIGHT_VAR = `--${TOKEN_PREFIX}-visual-viewport-height`;
const ModalWrapper = /*#__PURE__*/forwardRef(function ModalWrapper(props, forwardedRef) {
  let {
    type,
    children,
    state,
    isOpen,
    wrapperRef
  } = props;
  let domRef = useObjectRef(forwardedRef);
  let {
    modalProps,
    underlayProps
  } = useModalOverlay(props, state, domRef);
  let styleProps = useStyleProps(props);

  // TODO: move to CSS' dynamic viewport units, when possible:
  // @see https://caniuse.com/viewport-unit-variants
  // ---------------------------------------------------------------------------
  // On mobile browsers, vh units are fixed based on the maximum height of the
  // screen. However, when you scroll, the toolbar and address bar shrink,
  // making the viewport resize. The visual viewport also shrinks when the
  // keyboard is displayed.
  let viewport = useViewportSize();

  // Attach Transition's nodeRef to outer most wrapper for node.reflow:
  // https://github.com/reactjs/react-transition-group/blob/c89f807067b32eea6f68fd6c622190d88ced82e2/src/Transition.js#L231
  return /*#__PURE__*/jsxs("div", {
    ref: wrapperRef,
    children: [/*#__PURE__*/jsx(Blanket, {
      ...underlayProps,
      isOpen: isOpen
    }), /*#__PURE__*/jsx("div", {
      className: css({
        alignItems: 'center',
        boxSizing: 'border-box',
        display: 'flex',
        insetBlockStart: 0,
        insetInlineStart: 0,
        justifyContent: 'center',
        pointerEvents: 'none',
        position: 'fixed',
        width: '100vw',
        zIndex: 2 // above blanket
      }),

      style: {
        // @ts-ignore
        [MAX_HEIGHT_VAR]: `${viewport.height}px`,
        height: `var(${MAX_HEIGHT_VAR})`
      },
      children: /*#__PURE__*/jsx("div", {
        ...modalProps,
        ...toDataAttributes({
          open: isOpen,
          type
        }),
        ...styleProps,
        ref: domRef,
        className: classNames(styleProps.className, css({
          backgroundColor: tokenSchema.color.background.surface,
          // TODO: component token?
          borderRadius: tokenSchema.size.radius.large,
          // TODO: component token?
          boxShadow: `${tokenSchema.size.shadow.large} ${tokenSchema.color.shadow.emphasis}`,
          maxHeight: `calc(var(${MAX_HEIGHT_VAR}) * 0.9)`,
          maxWidth: '90vw',
          opacity: 0,
          outline: 0,
          pointerEvents: 'auto',
          transform: `translateY(${tokenSchema.size.space.large})`,
          // initialise with offset
          zIndex: 2,
          // above blanket

          // exit animation
          transition: [transition('opacity', {
            easing: 'easeIn'
          }), transition('transform', {
            delay: 'short',
            duration: 0,
            easing: 'linear'
          })].join(', '),
          '&[data-type="fullscreen"]': {
            position: 'fixed',
            inset: tokenSchema.size.space.xxlarge,
            maxWidth: 'none',
            maxHeight: 'none',
            width: `calc(100% - calc(2 * ${tokenSchema.size.space.xxlarge}))`,
            height: `calc(100% - calc(2 * ${tokenSchema.size.space.xxlarge}))`
          },
          '&[data-open="true"]': {
            opacity: 1,
            transform: `translateY(0)`,
            // enter animation
            transition: transition(['opacity', 'transform'], {
              easing: 'easeOut'
            })
          }
        })),
        children: children
      })
    })]
  });
});

/**
 * A low-level utility component for implementing things like info dialogs,
 * menus and pickers.
 */
const Popover = /*#__PURE__*/forwardRef(function Popover(props, forwardedRef) {
  let {
    children,
    state,
    ...otherProps
  } = props;
  let wrapperRef = useRef(null);
  return (
    /*#__PURE__*/
    /* @ts-expect-error FIXME: resolve ref inconsistencies */
    jsx(Overlay, {
      ...otherProps,
      isOpen: state.isOpen,
      nodeRef: wrapperRef,
      children: /*#__PURE__*/jsx(PopoverWrapper, {
        ref: forwardedRef,
        ...props,
        wrapperRef: wrapperRef,
        children: children
      })
    })
  );
});
const PopoverWrapper = /*#__PURE__*/forwardRef(function PopoverWrapper(props, forwardedRef) {
  let {
    children,
    isOpen,
    hideArrow,
    isNonModal,
    state,
    wrapperRef
  } = props;
  let popoverRef = useObjectRef(forwardedRef);
  let {
    popoverProps,
    arrowProps,
    underlayProps,
    placement
  } = usePopover({
    ...props,
    containerPadding: 8,
    popoverRef,
    // @ts-expect-error we need to override the default value, but `undefined` doesn't work.
    maxHeight: null
  }, state);
  let styleProps = usePopoverStyles({
    ...props,
    placement: placement
  });

  // Attach Transition's nodeRef to outer most wrapper for node.reflow:
  // https://github.com/reactjs/react-transition-group/blob/c89f807067b32eea6f68fd6c622190d88ced82e2/src/Transition.js#L231
  return /*#__PURE__*/jsxs("div", {
    ref: wrapperRef,
    children: [!isNonModal && /*#__PURE__*/jsx(Blanket, {
      isTransparent: true,
      ...underlayProps,
      isOpen: isOpen
    }), /*#__PURE__*/jsxs("div", {
      ...styleProps,
      ...popoverProps,
      style: {
        ...styleProps.style,
        ...popoverProps.style
      },
      ref: popoverRef,
      role: "presentation",
      children: [!isNonModal && /*#__PURE__*/jsx(DismissButton, {
        onDismiss: state.close
      }), hideArrow ? null : /*#__PURE__*/jsx(DirectionIndicator, {
        ...arrowProps,
        fill: "surface" // TODO: component token?
        ,
        stroke: tokenSchema.color.border.emphasis // TODO: component token?
        ,
        placement: placement,
        size: "regular"
      }), children, /*#__PURE__*/jsx(DismissButton, {
        onDismiss: state.close
      })]
    })]
  });
});

// Utils
// -----------------------------------------------------------------------------

function usePopoverStyles(props) {
  let {
    hideArrow,
    isOpen,
    placement
  } = props;
  let consumerStyleProps = useStyleProps(props);
  let offset = 'var(--popover-offset)';
  let popoverStyles = css({
    backgroundColor: tokenSchema.color.background.surface,
    // TODO: component token?
    borderRadius: tokenSchema.size.radius.medium,
    // TODO: component token?
    border: `${tokenSchema.size.border.regular} solid ${tokenSchema.color.border.emphasis}`,
    boxSizing: 'content-box',
    // resolves measurement/scroll issues related to border
    opacity: 0,
    outline: 0,
    pointerEvents: 'auto',
    position: 'absolute',
    // drop shadow
    filter: `drop-shadow(0 1px 4px ${tokenSchema.color.shadow.regular})`,
    // use filter:drop-shadow instead of box-shadow so the arrow is included
    willChange: 'filter, transform',
    // filter bug in safari: https://stackoverflow.com/questions/56478925/safari-drop-shadow-filter-remains-visible-even-with-hidden-element

    // exit animation
    transition: [transition('opacity', {
      easing: 'easeIn'
    }), transition('transform', {
      delay: 'short',
      duration: 0,
      easing: 'linear'
    })].join(', '),
    // gutter between popover and viewport
    '&[data-placement=top]': {
      marginTop: tokenSchema.size.space.regular
    },
    '&[data-placement=bottom]': {
      marginBottom: tokenSchema.size.space.regular
    },
    '&[data-placement=left]': {
      marginLeft: tokenSchema.size.space.regular
    },
    '&[data-placement=right]': {
      marginRight: tokenSchema.size.space.regular
    },
    '&[data-open]': {
      opacity: 1,
      // enter animation
      transition: transition(['opacity', 'transform'], {
        easing: 'easeOut'
      })
    },
    // animate towards placement; re-enforce the illusion that the popover
    // originates from, and is bound to, the trigger.
    '&[data-placement=top][data-open]': {
      transform: `translateY(calc(${offset} * -1))`
    },
    '&[data-placement=bottom][data-open]': {
      transform: `translateY(${offset})`
    },
    '&[data-placement=left][data-open]': {
      transform: `translateX(calc(${offset} * -1))`
    },
    '&[data-placement=right][data-open]': {
      transform: `translateX(${offset})`
    }
  });
  return {
    ...toDataAttributes({
      arrow: !hideArrow || undefined,
      placement,
      open: isOpen || undefined
    }),
    className: classNames(popoverStyles, consumerStyleProps.className),
    style: {
      '--popover-offset': hideArrow ? tokenSchema.size.space.regular : tokenSchema.size.space.large,
      ...consumerStyleProps.style
    }
  };
}

/**
 * A low-level utility component for implementing things like info dialogs,
 * menus and pickers. They should only ever be displayed on devices with small
 * screens, for interfaces where popovers wouldn't be appropriate.
 */
const Tray = /*#__PURE__*/forwardRef(function Tray(props, forwardedRef) {
  let {
    children,
    state,
    ...otherProps
  } = props;
  let wrapperRef = useRef(null);
  return (
    /*#__PURE__*/
    /* @ts-expect-error FIXME: resolve ref inconsistencies */
    jsx(Overlay, {
      ...otherProps,
      isOpen: state.isOpen,
      nodeRef: wrapperRef,
      children: /*#__PURE__*/jsx(TrayWrapper, {
        ref: forwardedRef,
        ...props,
        wrapperRef: wrapperRef,
        children: children
      })
    })
  );
});
let TrayWrapper = /*#__PURE__*/forwardRef(function TrayWrapper(props, forwardedRef) {
  let {
    children,
    state,
    isFixedHeight,
    isOpen,
    wrapperRef
  } = props;
  let domRef = useObjectRef(forwardedRef);
  let {
    modalProps,
    underlayProps
  } = useModalOverlay({
    ...props,
    isDismissable: true
  }, state, domRef);
  let styleProps = useStyleProps(props);

  // TODO: move to CSS' dynamic viewport units, when possible:
  // @see https://caniuse.com/viewport-unit-variants
  // ---------------------------------------------------------------------------
  // On mobile browsers, vh units are fixed based on the maximum height of the
  // screen. However, when you scroll, the toolbar and address bar shrink,
  // making the viewport resize. The visual viewport also shrinks when the
  // keyboard is displayed.
  let viewport = useViewportSize();

  // Attach Transition's nodeRef to outer most wrapper for node.reflow:
  // https://github.com/reactjs/react-transition-group/blob/c89f807067b32eea6f68fd6c622190d88ced82e2/src/Transition.js#L231
  return /*#__PURE__*/jsxs("div", {
    ref: wrapperRef,
    children: [/*#__PURE__*/jsx(Blanket, {
      ...underlayProps,
      isOpen: isOpen
    }), /*#__PURE__*/jsx("div", {
      className: css({
        boxSizing: 'border-box',
        display: 'flex',
        insetBlockStart: 0,
        insetInlineStart: 0,
        justifyContent: 'center',
        pointerEvents: 'none',
        position: 'fixed',
        height: '100vh',
        width: '100%',
        zIndex: 2 // above blanket
      }),

      style: {
        height: viewport.height
      },
      children: /*#__PURE__*/jsx("div", {
        ...modalProps,
        ...toDataAttributes({
          open: isOpen,
          fillScreen: isFixedHeight || undefined
        }),
        ref: domRef,
        style: Object.assign({}, isFixedHeight ? {
          height: `calc(${viewport.height}px - ${tokenSchema.size.space.xxlarge})`,
          top: tokenSchema.size.space.xxlarge
        } : {}, {
          maxHeight: `calc(${viewport.height}px - ${tokenSchema.size.space.xxlarge})`,
          paddingBottom: `max(calc(100vh - ${viewport.height}px), env(safe-area-inset-bottom))`
        }, styleProps.style),
        className: classNames(styleProps.className, css({
          backgroundColor: tokenSchema.color.background.surface,
          // TODO: component token?
          bottom: 0,
          maxWidth: '100vw',
          opacity: 0,
          outline: 0,
          pointerEvents: 'auto',
          position: 'absolute',
          transform: 'translateY(100%)',
          // initialise with offset
          width: '100%',
          zIndex: 2,
          // above blanket

          // NOTE: trays shouldn't be used for larger screens, but in case
          // they are we need to tweak the appearance.
          [breakpointQueries.above.mobile]: {
            borderStartStartRadius: tokenSchema.size.radius.medium,
            // TODO: component token?
            borderStartEndRadius: tokenSchema.size.radius.medium,
            // TODO: component token?
            maxWidth: breakpoints.tablet
          },
          // exit animation
          transition: transition(['opacity', 'transform'], {
            easing: 'easeIn'
          }),
          '&[data-open="true"]': {
            opacity: 1,
            transform: `translateY(0)`,
            // enter animation
            transition: transition(['opacity', 'transform'], {
              easing: 'easeOut',
              delay: 'short'
            })
          }
        })),
        children: children
      })
    })]
  });
});

export { Blanket, DirectionIndicator, Modal, Overlay, Popover, Tray };
