'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var selection = require('@react-aria/selection');
var utils = require('@react-aria/utils');
var list = require('@react-stately/list');
var React = require('react');
var listbox = require('@keystar/ui/listbox');
var jsxRuntime = require('react/jsx-runtime');
var react = require('@floating-ui/react');
var style = require('@keystar/ui/style');
var focus = require('@react-aria/focus');
var i18n = require('@react-aria/i18n');
var interactions = require('@react-aria/interactions');
var emery = require('emery');
var button = require('@keystar/ui/button');
var layout = require('@keystar/ui/layout');

function EditorListbox(props) {
  let {
    listenerRef,
    onEscape,
    scrollRef,
    ...otherProps
  } = props;
  let state = list.useListState(props);
  let layout = listbox.useListBoxLayout(state);

  // keyboard and selection management
  let listboxRef = React.useRef(null);
  let {
    collectionProps
  } = selection.useSelectableCollection({
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
  let keydownListener = utils.chain(onKeyDown, collectionProps.onKeyDown);
  React.useEffect(() => {
    let domNode = listenerRef.current;
    domNode === null || domNode === void 0 || domNode.addEventListener('keydown', keydownListener);
    return () => domNode === null || domNode === void 0 ? void 0 : domNode.removeEventListener('keydown', keydownListener);
  }, [keydownListener, listenerRef]);
  return /*#__PURE__*/jsxRuntime.jsx(listbox.ListBoxBase, {
    ref: listboxRef,
    layout: layout,
    state: state,
    autoFocus: "first"
    // focusOnPointerEnter
    ,
    shouldUseVirtualFocus: true,
    shouldFocusWrap: true,
    UNSAFE_className: listbox.listStyles,
    ...otherProps
  });
}

const EditorPopover = /*#__PURE__*/React.forwardRef(function EditorPopover(props, forwardedRef) {
  props = useDefaultProps(props);
  const {
    children,
    reference,
    placement,
    portal
  } = props;
  const Wrapper = portal ? react.FloatingPortal : React.Fragment;
  const styleProps = style.useStyleProps(props);
  const [floating, setFloating] = React.useState(null);
  const middleware = getMiddleware(props);
  const {
    floatingStyles,
    context,
    update
  } = react.useFloating({
    elements: {
      reference,
      floating
    },
    middleware,
    placement,
    whileElementsMounted: react.autoUpdate
  });
  React.useImperativeHandle(forwardedRef, () => {
    return {
      context,
      update
    };
  }, [context, update]);
  return /*#__PURE__*/jsxRuntime.jsx(Wrapper, {
    children: /*#__PURE__*/jsxRuntime.jsx(DialogElement, {
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
  let portalMiddlewares = [...(props.portal ? [react.hide({
    boundary
  })] : []), applyStyles()];

  // stick to the boundary
  if (adaptToBoundary === 'stick') {
    return [react.offset(DEFAULT_OFFSET), react.shift({
      boundary,
      crossAxis: true,
      padding: DEFAULT_OFFSET,
      limiter: react.limitShift({
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
    return [react.offset(DEFAULT_OFFSET), react.flip({
      boundary,
      padding: DEFAULT_OFFSET
    }), react.size({
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
  return [react.offset(DEFAULT_OFFSET), react.flip({
    boundary,
    padding: DEFAULT_OFFSET
  }), react.shift({
    padding: DEFAULT_OFFSET
  }), ...portalMiddlewares];
}

// Styled components
// ------------------------------

const DialogElement = /*#__PURE__*/React.forwardRef(function DialogElement(props, forwardedRef) {
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    role: "dialog",
    ref: forwardedRef,
    ...props,
    className: style.classNames(style.css({
      backgroundColor: style.tokenSchema.color.background.surface,
      borderRadius: style.tokenSchema.size.radius.medium,
      border: `${style.tokenSchema.size.border.regular} solid ${style.tokenSchema.color.border.emphasis}`,
      boxShadow: `${style.tokenSchema.size.shadow.medium} ${style.tokenSchema.color.shadow.regular}`,
      boxSizing: 'content-box',
      // resolves measurement/scroll issues related to border
      minHeight: style.tokenSchema.size.element.regular,
      minWidth: style.tokenSchema.size.element.regular,
      outline: 0
    }), props.className)
  });
});

const EditorToolbarContext = /*#__PURE__*/React.createContext(null);
function useToolbarContext() {
  let context = React.useContext(EditorToolbarContext);
  if (context == null) {
    throw new Error('useToolbarContext must be used within a EditorToolbar');
  }
  return context;
}
function EditorToolbar(props) {
  let {
    children
  } = props;
  let ref = React.useRef(null);
  let {
    state,
    toolbarProps
  } = useToolbar(props, ref);
  return /*#__PURE__*/jsxRuntime.jsx(EditorToolbarContext.Provider, {
    value: {
      state
    },
    children: /*#__PURE__*/jsxRuntime.jsx(focus.FocusScope, {
      children: /*#__PURE__*/jsxRuntime.jsx(layout.HStack, {
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
const GroupSelectionContext = /*#__PURE__*/React.createContext(null);
function useGroupSelectionContext() {
  let context = React.useContext(GroupSelectionContext);
  emery.assert(context !== null, 'An `EditorToolbarItem` is only valid inside an `EditorToolbarGroup` with a `selectionMode` of "single" or "multiple". When no selection is needed, use `EditorToolbarButton` instead.');
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
        ...utils.filterDOMProps(props, {
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
        ...utils.filterDOMProps(props, {
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
  emery.assertNever(context);
}
function EditorToolbarGroup(props) {
  if (props.selectionMode === 'single') {
    return /*#__PURE__*/jsxRuntime.jsx(EditorSingleSelectionGroup, {
      ...props
    });
  }
  if (props.selectionMode === 'multiple') {
    return /*#__PURE__*/jsxRuntime.jsx(EditorMultipleSelectionGroup, {
      ...props
    });
  }
  return /*#__PURE__*/jsxRuntime.jsx(layout.HStack, {
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
  return /*#__PURE__*/jsxRuntime.jsx(GroupSelectionContext.Provider, {
    value: context,
    children: /*#__PURE__*/jsxRuntime.jsx(layout.HStack, {
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
  return /*#__PURE__*/jsxRuntime.jsx(GroupSelectionContext.Provider, {
    value: context,
    children: /*#__PURE__*/jsxRuntime.jsx(layout.HStack, {
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
  return /*#__PURE__*/jsxRuntime.jsx(interactions.PressResponder, {
    ...utils.mergeProps(buttonProps, itemProps),
    children: /*#__PURE__*/jsxRuntime.jsx(button.ActionButton, {
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
  return /*#__PURE__*/jsxRuntime.jsx(interactions.PressResponder, {
    ...itemProps,
    children: /*#__PURE__*/jsxRuntime.jsx(button.ToggleButton, {
      prominence: "low",
      ...props
    })
  });
}
function EditorToolbarSeparator() {
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    role: "separator",
    "aria-orientation": "vertical",
    className: style.css({
      alignSelf: 'center',
      backgroundColor: style.tokenSchema.color.border.muted,
      flexShrink: 0,
      height: style.tokenSchema.size.icon.regular,
      width: style.tokenSchema.size.border.regular
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
    ...style.onlyStyleProps(props),
    ...utils.filterDOMProps(props, {
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
  let id = React.useId();
  let tabIndex = lastFocusedId === id || lastFocusedId == null ? 0 : -1;

  // clear the last focused ID when the item is unmounted or becomes disabled,
  // which will reset the tabIndex for each item to 0 avoiding a situation where
  // the user cannot tab to any items
  React.useEffect(() => {
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
  let [lastFocusedId, setLastFocusedId] = React.useState(null);
  let {
    direction
  } = i18n.useLocale();
  let focusManager = focus.createFocusManager(ref, {
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
    let options = (utils.isMac() ? e.altKey : e.ctrlKey) ? {
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
  return React.useMemo(() => value == null ? new Set() : new Set(value), [value]);
}

Object.defineProperty(exports, 'Item', {
  enumerable: true,
  get: function () { return listbox.Item; }
});
Object.defineProperty(exports, 'Section', {
  enumerable: true,
  get: function () { return listbox.Section; }
});
exports.EditorListbox = EditorListbox;
exports.EditorPopover = EditorPopover;
exports.EditorToolbar = EditorToolbar;
exports.EditorToolbarButton = EditorToolbarButton;
exports.EditorToolbarGroup = EditorToolbarGroup;
exports.EditorToolbarItem = EditorToolbarItem;
exports.EditorToolbarSeparator = EditorToolbarSeparator;