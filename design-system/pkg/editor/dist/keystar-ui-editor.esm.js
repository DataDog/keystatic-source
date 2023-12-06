'use client';
import { useSelectableCollection } from '@react-aria/selection';
import { chain, mergeProps, filterDOMProps, isMac } from '@react-aria/utils';
import { useListState } from '@react-stately/list';
import { useRef, useEffect, forwardRef, useState, useImperativeHandle, Fragment, useId, createContext, useContext, useMemo } from 'react';
import { useListBoxLayout, ListBoxBase, listStyles } from '@keystar/ui/listbox';
export { Item, Section } from '@keystar/ui/listbox';
import { jsx } from 'react/jsx-runtime';
import { useFloating, autoUpdate, hide, offset, shift, limitShift, flip, size, FloatingPortal } from '@floating-ui/react';
import { useStyleProps, classNames, css, tokenSchema, onlyStyleProps } from '@keystar/ui/style';
import { FocusScope, createFocusManager } from '@react-aria/focus';
import { useLocale } from '@react-aria/i18n';
import { PressResponder } from '@react-aria/interactions';
import { assertNever, assert } from 'emery';
import { ActionButton, ToggleButton } from '@keystar/ui/button';
import { HStack } from '@keystar/ui/layout';

function EditorListbox(props) {
  let {
    listenerRef,
    onEscape,
    scrollRef,
    ...otherProps
  } = props;
  let state = useListState(props);
  let layout = useListBoxLayout(state);

  // keyboard and selection management
  let listboxRef = useRef(null);
  let {
    collectionProps
  } = useSelectableCollection({
    keyboardDelegate: layout,
    ref: listenerRef,
    scrollRef: scrollRef !== null && scrollRef !== void 0 ? scrollRef : listboxRef,
    selectionManager: state.selectionManager,
    disallowEmptySelection: true,
    disallowTypeAhead: true,
    isVirtualized: true,
    shouldFocusWrap: true
  });
  let onKeyDown = e => {
    var _props$onAction;
    switch (e.key) {
      case 'Enter':
        state.selectionManager.select(state.selectionManager.focusedKey);
        (_props$onAction = props.onAction) === null || _props$onAction === void 0 || _props$onAction.call(props, state.selectionManager.focusedKey);
        break;
      case 'Escape':
        onEscape === null || onEscape === void 0 || onEscape();
        break;
    }
  };
  let keydownListener = chain(onKeyDown, collectionProps.onKeyDown);
  useEffect(() => {
    let domNode = listenerRef.current;
    domNode === null || domNode === void 0 || domNode.addEventListener('keydown', keydownListener);
    return () => domNode === null || domNode === void 0 ? void 0 : domNode.removeEventListener('keydown', keydownListener);
  }, [keydownListener, listenerRef]);
  return /*#__PURE__*/jsx(ListBoxBase, {
    ref: listboxRef,
    layout: layout,
    state: state,
    autoFocus: "first"
    // focusOnPointerEnter
    ,
    shouldUseVirtualFocus: true,
    shouldFocusWrap: true,
    UNSAFE_className: listStyles,
    ...otherProps
  });
}

const EditorPopover = /*#__PURE__*/forwardRef(function EditorPopover(props, forwardedRef) {
  props = useDefaultProps(props);
  const {
    children,
    reference,
    placement,
    portal
  } = props;
  const Wrapper = portal ? FloatingPortal : Fragment;
  const styleProps = useStyleProps(props);
  const [floating, setFloating] = useState(null);
  const middleware = getMiddleware(props);
  const {
    floatingStyles,
    context,
    update
  } = useFloating({
    elements: {
      reference,
      floating
    },
    middleware,
    placement,
    whileElementsMounted: autoUpdate
  });
  useImperativeHandle(forwardedRef, () => {
    return {
      context,
      update
    };
  }, [context, update]);
  return /*#__PURE__*/jsx(Wrapper, {
    children: /*#__PURE__*/jsx(DialogElement, {
      ref: setFloating,
      ...styleProps,
      style: {
        ...floatingStyles,
        ...styleProps.style
      },
      children: children
    })
  });
});

// Utils
// ------------------------------

function useDefaultProps(props) {
  return Object.assign({}, {
    adaptToBoundary: 'flip',
    placement: 'bottom',
    portal: true
  }, props);
}
const DEFAULT_OFFSET = 8;

/**
 * Watch for values returned from other middlewares and apply the appropriate
 * styles to the floating element.
 */
function applyStyles() {
  return {
    name: 'applyStyles',
    async fn(state) {
      let {
        elements,
        middlewareData
      } = state;
      if (middlewareData.hide) {
        Object.assign(elements.floating.style, {
          visibility: middlewareData.hide.referenceHidden ? 'hidden' : 'visible'
        });
      }
      return {};
    }
  };
}
function getMiddleware(props) {
  const {
    adaptToBoundary,
    boundary
  } = props;

  // simulate clipping for portaled popovers
  let portalMiddlewares = [...(props.portal ? [hide({
    boundary
  })] : []), applyStyles()];

  // stick to the boundary
  if (adaptToBoundary === 'stick') {
    return [offset(DEFAULT_OFFSET), shift({
      boundary,
      crossAxis: true,
      padding: DEFAULT_OFFSET,
      limiter: limitShift({
        offset: ({
          rects,
          middlewareData,
          placement
        }) => {
          var _middlewareData$offse, _middlewareData$offse2;
          return {
            crossAxis: rects.floating.height + ((_middlewareData$offse = (_middlewareData$offse2 = middlewareData.offset) === null || _middlewareData$offse2 === void 0 ? void 0 : _middlewareData$offse2.y) !== null && _middlewareData$offse !== void 0 ? _middlewareData$offse : 0) * (placement === 'top' ? -1 : 1)
          };
        }
      })
    }), ...portalMiddlewares];
  }

  // stretch to fill
  if (adaptToBoundary === 'stretch') {
    return [offset(DEFAULT_OFFSET), flip({
      boundary,
      padding: DEFAULT_OFFSET
    }), size({
      apply({
        elements,
        availableHeight
      }) {
        Object.assign(elements.floating.style, {
          maxHeight: `${availableHeight}px`
        });
      },
      boundary,
      padding: DEFAULT_OFFSET
    }), ...portalMiddlewares];
  }

  // default: flip
  return [offset(DEFAULT_OFFSET), flip({
    boundary,
    padding: DEFAULT_OFFSET
  }), shift({
    padding: DEFAULT_OFFSET
  }), ...portalMiddlewares];
}

// Styled components
// ------------------------------

const DialogElement = /*#__PURE__*/forwardRef(function DialogElement(props, forwardedRef) {
  return /*#__PURE__*/jsx("div", {
    role: "dialog",
    ref: forwardedRef,
    ...props,
    className: classNames(css({
      backgroundColor: tokenSchema.color.background.surface,
      borderRadius: tokenSchema.size.radius.medium,
      border: `${tokenSchema.size.border.regular} solid ${tokenSchema.color.border.emphasis}`,
      boxShadow: `${tokenSchema.size.shadow.medium} ${tokenSchema.color.shadow.regular}`,
      boxSizing: 'content-box',
      // resolves measurement/scroll issues related to border
      minHeight: tokenSchema.size.element.regular,
      minWidth: tokenSchema.size.element.regular,
      outline: 0
    }), props.className)
  });
});

const EditorToolbarContext = /*#__PURE__*/createContext(null);
function useToolbarContext() {
  let context = useContext(EditorToolbarContext);
  if (context == null) {
    throw new Error('useToolbarContext must be used within a EditorToolbar');
  }
  return context;
}
function EditorToolbar(props) {
  let {
    children
  } = props;
  let ref = useRef(null);
  let {
    state,
    toolbarProps
  } = useToolbar(props, ref);
  return /*#__PURE__*/jsx(EditorToolbarContext.Provider, {
    value: {
      state
    },
    children: /*#__PURE__*/jsx(FocusScope, {
      children: /*#__PURE__*/jsx(HStack, {
        alignItems: "center",
        gap: "regular",
        ref: ref,
        ...toolbarProps,
        children: children
      })
    })
  });
}

// =============================================================================
// Group
// =============================================================================
const GroupSelectionContext = /*#__PURE__*/createContext(null);
function useGroupSelectionContext() {
  let context = useContext(GroupSelectionContext);
  assert(context !== null, 'An `EditorToolbarItem` is only valid inside an `EditorToolbarGroup` with a `selectionMode` of "single" or "multiple". When no selection is needed, use `EditorToolbarButton` instead.');
  let disabledKeys = useSetFromIterable(context.disabledKeys);
  return {
    ...context,
    disabledKeys
  };
}
function useSelectionItem(props) {
  let context = useGroupSelectionContext();
  if (context.selectionMode === 'single') {
    let {
      disabledKeys,
      value,
      onChange
    } = context;
    let isDisabled = disabledKeys.has(props.value);
    let isSelected = value === props.value;
    return {
      isDisabled,
      isSelected,
      buttonProps: {
        ...filterDOMProps(props, {
          labelable: true
        }),
        role: 'radio',
        'aria-checked': isSelected,
        onPress: () => {
          if (isDisabled) {
            return;
          }
          onChange(props.value);
        }
      }
    };
  }
  if (context.selectionMode === 'multiple') {
    let {
      disabledKeys,
      value,
      onChange
    } = context;
    let isDisabled = disabledKeys.has(props.value);
    let isSelected = value.includes(props.value);
    return {
      isDisabled,
      isSelected,
      buttonProps: {
        ...filterDOMProps(props, {
          labelable: true
        }),
        role: 'checkbox',
        'aria-checked': isSelected,
        onPress: () => {
          if (isDisabled) {
            return;
          }
          onChange(props.value);
        }
      }
    };
  }
  assertNever(context);
}
function EditorToolbarGroup(props) {
  if (props.selectionMode === 'single') {
    return /*#__PURE__*/jsx(EditorSingleSelectionGroup, {
      ...props
    });
  }
  if (props.selectionMode === 'multiple') {
    return /*#__PURE__*/jsx(EditorMultipleSelectionGroup, {
      ...props
    });
  }
  return /*#__PURE__*/jsx(HStack, {
    gap: "xsmall",
    role: "group",
    ...filterPropsWithLabelWarning(props),
    children: props.children
  });
}
/** @private SINGLE selection */
function EditorSingleSelectionGroup(props) {
  let {
    children,
    ...context
  } = props;
  return /*#__PURE__*/jsx(GroupSelectionContext.Provider, {
    value: context,
    children: /*#__PURE__*/jsx(HStack, {
      gap: "xsmall",
      role: "radiogroup",
      ...filterPropsWithLabelWarning(props),
      children: children
    })
  });
}
/** @private MULTI selection */
function EditorMultipleSelectionGroup(props) {
  let {
    children,
    ...context
  } = props;
  return /*#__PURE__*/jsx(GroupSelectionContext.Provider, {
    value: context,
    children: /*#__PURE__*/jsx(HStack, {
      gap: "xsmall",
      role: "group",
      ...filterPropsWithLabelWarning(props),
      children: children
    })
  });
}

// =============================================================================
// Item
// =============================================================================
/** A toolbar item may be a checkbox/radio/toggle button, depending on context. */
function EditorToolbarItem(props) {
  let {
    isDisabled,
    isSelected,
    buttonProps
  } = useSelectionItem(props);
  let {
    itemProps
  } = useToolbarItem({
    ...props,
    isDisabled
  });

  // Use a PressResponder to send DOM props through, allow overriding things
  // like role and tabIndex.
  return /*#__PURE__*/jsx(PressResponder, {
    ...mergeProps(buttonProps, itemProps),
    children: /*#__PURE__*/jsx(ActionButton, {
      prominence: "low",
      isDisabled: isDisabled,
      isSelected: isSelected,
      children: props.children
    })
  });
}
function EditorToolbarButton(props) {
  let {
    itemProps
  } = useToolbarItem(props);
  return /*#__PURE__*/jsx(PressResponder, {
    ...itemProps,
    children: /*#__PURE__*/jsx(ToggleButton, {
      prominence: "low",
      ...props
    })
  });
}
function EditorToolbarSeparator() {
  return /*#__PURE__*/jsx("div", {
    role: "separator",
    "aria-orientation": "vertical",
    className: css({
      alignSelf: 'center',
      backgroundColor: tokenSchema.color.border.muted,
      flexShrink: 0,
      height: tokenSchema.size.icon.regular,
      width: tokenSchema.size.border.regular
    })
  });
}

// =============================================================================
// Utils
// =============================================================================

function filterPropsWithLabelWarning(props) {
  let {
    'aria-labelledby': ariaLabelledby,
    'aria-label': ariaLabel
  } = props;
  if (!ariaLabelledby && !ariaLabel) {
    console.warn('You must specify an aria-label or aria-labelledby attribute for accessibility.');
  }
  return {
    ...onlyStyleProps(props),
    ...filterDOMProps(props, {
      labelable: true
    })
  };
}
function useToolbarItem(props) {
  let {
    isDisabled
  } = props;
  let {
    state
  } = useToolbarContext();
  let {
    lastFocusedId,
    setLastFocusedId
  } = state;
  let id = useId();
  let tabIndex = lastFocusedId === id || lastFocusedId == null ? 0 : -1;

  // clear the last focused ID when the item is unmounted or becomes disabled,
  // which will reset the tabIndex for each item to 0 avoiding a situation where
  // the user cannot tab to any items
  useEffect(() => {
    let reset = lastId => lastId === id ? null : lastId;
    if (isDisabled) {
      setLastFocusedId(reset);
    }
    return () => {
      setLastFocusedId(reset);
    };
  }, [id, isDisabled, setLastFocusedId]);
  return {
    itemProps: {
      tabIndex,
      onFocus: () => {
        setLastFocusedId(id);
      }
    }
  };
}
function useToolbar(props, ref) {
  let [lastFocusedId, setLastFocusedId] = useState(null);
  let {
    direction
  } = useLocale();
  let focusManager = createFocusManager(ref, {
    wrap: true
  });
  let isRtl = direction === 'rtl';
  let onKeyDown = e => {
    if (!e.currentTarget.contains(e.target)) {
      return;
    }

    // let users navigate by group with alt/ctrl + arrow keys
    let accept = node => {
      var _node$parentElement, _node$parentElement2;
      let isFirstChild = ((_node$parentElement = node.parentElement) === null || _node$parentElement === void 0 ? void 0 : _node$parentElement.firstElementChild) === node;
      let isGroupChild = /group/.test(((_node$parentElement2 = node.parentElement) === null || _node$parentElement2 === void 0 ? void 0 : _node$parentElement2.role) || '');
      return !isGroupChild || isFirstChild;
    };
    let options = (isMac() ? e.altKey : e.ctrlKey) ? {
      accept
    } : {};
    switch (e.key) {
      case 'Home':
        e.preventDefault();
        e.stopPropagation();
        focusManager.focusFirst();
        break;
      case 'End':
        e.preventDefault();
        e.stopPropagation();
        focusManager.focusLast();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        e.stopPropagation();
        if (e.key === 'ArrowRight' && isRtl) {
          focusManager.focusPrevious(options);
        } else {
          focusManager.focusNext(options);
        }
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        e.stopPropagation();
        if (e.key === 'ArrowLeft' && isRtl) {
          focusManager.focusNext(options);
        } else {
          focusManager.focusPrevious(options);
        }
        break;
    }
  };
  return {
    toolbarProps: {
      ...filterPropsWithLabelWarning(props),
      onKeyDown,
      role: 'toolbar',
      'aria-orientation': 'horizontal'
    },
    state: {
      lastFocusedId,
      setLastFocusedId
    }
  };
}
function useSetFromIterable(value) {
  return useMemo(() => value == null ? new Set() : new Set(value), [value]);
}

export { EditorListbox, EditorPopover, EditorToolbar, EditorToolbarButton, EditorToolbarGroup, EditorToolbarItem, EditorToolbarSeparator };