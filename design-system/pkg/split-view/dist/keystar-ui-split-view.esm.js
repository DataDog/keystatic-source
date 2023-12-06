'use client';
import { useStyleProps, classNames, css, transition, tokenSchema } from '@keystar/ui/style';
import { useIsMounted, useId } from '@keystar/ui/utils';
import { useLocale } from '@react-aria/i18n';
import { useUpdateEffect, filterDOMProps } from '@react-aria/utils';
import { clamp } from '@react-stately/utils';
import { createContext, useContext, useState, useRef, useEffect, forwardRef } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

const SplitViewContext = /*#__PURE__*/createContext({
  activity: undefined,
  id: '',
  isCollapsed: undefined
});

/** @private */
const SplitViewProvider = SplitViewContext.Provider;

/** @private */
function useSplitView() {
  return useContext(SplitViewContext);
}

let currentState = null;
let element = null;
function getCursorStyle(state, isReversed) {
  switch (state) {
    case 'horizontal':
      return 'ew-resize';
    case 'horizontal-max':
      return isReversed ? 'e-resize' : 'w-resize';
    case 'horizontal-min':
      return isReversed ? 'w-resize' : 'e-resize';
  }
}
function resetGlobalCursorStyle() {
  if (element !== null) {
    document.head.removeChild(element);
    currentState = null;
    element = null;
  }
}
function setGlobalCursorStyle(state, isReversed) {
  if (currentState === state) {
    return;
  }
  currentState = state;
  const style = getCursorStyle(state, isReversed);
  if (element === null) {
    element = document.createElement('style');
    document.head.appendChild(element);
  }
  element.innerHTML = `*{cursor: ${style}!important;}`;
}

// Credit: https://github.com/bvaughn/react-resizable-panels/blob/main/packages/react-resizable-panels/src/PanelGroup.ts

// SplitView might be rendering in a server-side environment where
// `localStorage` is not available or on a browser with cookies/storage
// disabled. In either case, this function avoids accessing `localStorage` until
// needed, and avoids throwing user-visible errors.
function initializeDefaultStorage(storageObject) {
  try {
    if (typeof localStorage !== 'undefined') {
      // Bypass this check for future calls
      storageObject.getItem = name => {
        return localStorage.getItem(name);
      };
      storageObject.setItem = (name, value) => {
        localStorage.setItem(name, value);
      };
    } else {
      throw new Error('localStorage not supported in this environment');
    }
  } catch (error) {
    console.error(error);
    storageObject.getItem = () => null;
    storageObject.setItem = () => {};
  }
}
const defaultStorage = {
  getItem: name => {
    initializeDefaultStorage(defaultStorage);
    return defaultStorage.getItem(name);
  },
  setItem: (name, value) => {
    initializeDefaultStorage(defaultStorage);
    defaultStorage.setItem(name, value);
  }
};

function getPosition(e) {
  if (isMouseEvent(e)) {
    return e.clientX;
  } else if (isTouchEvent(e)) {
    return e.touches[0].clientX;
  }
  return 0;
}
function getPercentage(value, min, max) {
  return Math.round((value - min) / (max - min) * 100);
}
function getPrimaryPaneId(id) {
  return `primary-pane-${id}`;
}
function getSecondaryPaneId(id) {
  return `secondary-pane-${id}`;
}
function getResizeHandleId(id) {
  return `resize-handle-${id}`;
}
function getPrimaryPane(id) {
  return document.getElementById(getPrimaryPaneId(id));
}
function getSecondaryPane(id) {
  return document.getElementById(getSecondaryPaneId(id));
}
function getResizeHandle(id) {
  return document.getElementById(getResizeHandleId(id));
}
function px(value) {
  return `${value}px`;
}
function isMouseEvent(event) {
  return event.type.startsWith('mouse');
}
function isTouchEvent(event) {
  return event.type.startsWith('touch');
}

const MAX_WIDTH_PROP = '--primary-pane-max-width';
const MAX_WIDTH_VAR = `var(${MAX_WIDTH_PROP})`;
const MIN_WIDTH_PROP = '--primary-pane-min-width';
const MIN_WIDTH_VAR = `var(${MIN_WIDTH_PROP})`;
const WIDTH_PROP = '--primary-pane-width';
const WIDTH_VAR = `var(${WIDTH_PROP})`;
const SNAP_REGION_PX = 32;
const KEYBOARD_ARROW_STEPS = 10;
function SplitView(props) {
  let {
    autoSaveId,
    children,
    defaultSize,
    isCollapsed,
    minSize,
    maxSize,
    onCollapseChange,
    onResize,
    storage = defaultStorage
  } = props;
  const [startPane, endPane] = children;
  const getIsMounted = useIsMounted();
  const id = useId(props.id);
  const {
    direction
  } = useLocale();
  const styleProps = useStyleProps(props);
  const [isReversed, setReversed] = useState(false);
  const [isDragging, setDragging] = useState(false);
  const [handleIsFocused, setHandleFocus] = useState(false);
  const [size, setSize] = useState(() => {
    let size = defaultSize;
    if (autoSaveId) {
      let savedSize = storage.getItem(autoSaveId);
      if (savedSize) {
        size = Number.parseInt(savedSize);
      }
    }
    return size;
  });
  const wrapperRef = useRef(null);
  const offsetRef = useRef(0);
  const moveRef = useRef(0);

  // reverse drag logic when the primary pane is on the right or if the locale
  // direction is right-to-left
  useEffect(() => {
    const resizeHandle = getResizeHandle(id);
    const primaryPane = getPrimaryPane(id);
    const secondaryPane = getSecondaryPane(id);
    setReversed(direction === 'rtl' ? (resizeHandle === null || resizeHandle === void 0 ? void 0 : resizeHandle.previousElementSibling) === primaryPane : (resizeHandle === null || resizeHandle === void 0 ? void 0 : resizeHandle.previousElementSibling) === secondaryPane);
  }, [direction, id]);

  // sync size with subscribers
  useUpdateEffect(() => onResize === null || onResize === void 0 ? void 0 : onResize(size), [size]);
  useEffect(() => {
    var _wrapperRef$current;
    (_wrapperRef$current = wrapperRef.current) === null || _wrapperRef$current === void 0 || _wrapperRef$current.style.setProperty(WIDTH_PROP, px(size));
    moveRef.current = size;
    if (autoSaveId) {
      storage.setItem(autoSaveId, px(size));
    }
  }, [autoSaveId, onResize, size, storage]);
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const resizeHandle = getResizeHandle(id);
    const primaryPane = getPrimaryPane(id);
    if (!wrapper || !resizeHandle || !primaryPane) {
      return;
    }
    let collapseRequested = false;
    let collapseAllowed = typeof isCollapsed === 'boolean';
    const onMove = e => {
      e.preventDefault();
      let delta = getPosition(e) - offsetRef.current;
      if (isReversed) delta = delta * -1;
      let nextWidth = size + delta;

      // snap to the default width when the user drags near it
      if (Math.abs(nextWidth - defaultSize) < SNAP_REGION_PX / 2) {
        nextWidth = defaultSize;
      }

      // soft collapse the primary pane when smaller than half of its min-size.
      // collapse state is committed when the drag handle is released.
      if (collapseAllowed) {
        collapseRequested = nextWidth <= minSize / 2;
      }
      if (collapseRequested) {
        primaryPane.style.setProperty('width', '0px');
        moveRef.current = size;
      } else {
        moveRef.current = nextWidth;
        primaryPane.style.removeProperty('width');
      }
      wrapper.style.setProperty(WIDTH_PROP, px(moveRef.current));
      let cursorStyle = 'horizontal';
      if (moveRef.current < minSize) {
        cursorStyle = 'horizontal-min';
      }
      if (moveRef.current > maxSize) {
        cursorStyle = 'horizontal-max';
      }
      setGlobalCursorStyle(cursorStyle, isReversed);
    };
    const stopDragging = () => {
      resizeHandle.blur();
      setDragging(false);
      resetGlobalCursorStyle();
      if (collapseRequested) {
        onCollapseChange === null || onCollapseChange === void 0 || onCollapseChange(!isCollapsed);
        primaryPane.style.removeProperty('width');
      } else {
        setSize(clamp(moveRef.current, minSize, maxSize));
      }
      collapseRequested = false;
      document.body.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchend', stopDragging);
    };
    const startDragging = e => {
      if ('button' in e && e.button !== 0) {
        return;
      }
      if ('touches' in e && e.touches.length !== 1) {
        return;
      }
      setDragging(true);
      offsetRef.current = getPosition(e);
      document.body.addEventListener('mousemove', onMove);
      document.body.addEventListener('touchmove', onMove);
      window.addEventListener('mouseup', stopDragging);
      window.addEventListener('touchend', stopDragging);
    };
    const onKeyDown = e => {
      if (e.defaultPrevented) {
        return;
      }

      // allow 10 steps between the min and max
      let step = Math.round((maxSize - minSize) / KEYBOARD_ARROW_STEPS);
      let increment = () => setSize(size => Math.min(size + step, maxSize));
      let decrement = () => setSize(size => Math.max(size - step, minSize));
      switch (e.key) {
        case 'Enter':
          if (collapseAllowed) {
            e.preventDefault();
            onCollapseChange === null || onCollapseChange === void 0 || onCollapseChange(!isCollapsed);
          }
          break;
        case 'Home':
          e.preventDefault();
          setSize(minSize);
          break;
        case 'End':
          e.preventDefault();
          setSize(maxSize);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (isReversed) {
            increment();
          } else {
            decrement();
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (isReversed) {
            decrement();
          } else {
            increment();
          }
      }
    };
    let options = {
      passive: true
    };
    let onDoubleClick = e => {
      // reset to the default size when the drag handle is double-clicked. the
      // guard is to prevent this from firing when the user keeps the mouse down
      // after the second click and begins to drag, which yields some really
      // weird behavior.
      if (e.clientX === offsetRef.current) {
        setSize(defaultSize);
      }
    };
    resizeHandle.addEventListener('contextmenu', stopDragging);
    resizeHandle.addEventListener('dblclick', onDoubleClick);
    resizeHandle.addEventListener('keydown', onKeyDown);
    resizeHandle.addEventListener('mousedown', startDragging, options);
    resizeHandle.addEventListener('touchstart', startDragging, options);
    return () => {
      resizeHandle.removeEventListener('contextmenu', stopDragging);
      resizeHandle.removeEventListener('dblclick', onDoubleClick);
      resizeHandle.removeEventListener('keydown', onKeyDown);
      resizeHandle.removeEventListener('mousedown', startDragging);
      resizeHandle.removeEventListener('touchstart', startDragging);
    };
  }, [maxSize, minSize, defaultSize, id, isReversed, size, onCollapseChange, isCollapsed]);
  return /*#__PURE__*/jsx(SplitViewProvider, {
    value: {
      id,
      isCollapsed,
      activity: !getIsMounted() ? 'initializing' : isDragging ? 'pointer' : handleIsFocused ? 'keyboard' : undefined
    },
    children: /*#__PURE__*/jsxs("div", {
      ...styleProps,
      ...filterDOMProps(props),
      ref: wrapperRef,
      className: classNames(css({
        display: 'flex',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        [MIN_WIDTH_PROP]: px(minSize),
        [MAX_WIDTH_PROP]: px(maxSize),
        [WIDTH_PROP]: px(defaultSize)
      }), styleProps.className),
      children: [startPane, /*#__PURE__*/jsx(SplitViewResizeHandle, {
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": getPercentage(size, minSize, maxSize),
        onBlur: () => setHandleFocus(false),
        onFocus: () => setHandleFocus(true)
      }), endPane]
    })
  });
}

// Styled components
// -----------------------------------------------------------------------------
const SplitPanePrimary = /*#__PURE__*/forwardRef(function SplitPanePrimary(props, forwardedRef) {
  let {
    activity,
    id,
    isCollapsed
  } = useSplitView();
  let styleProps = useStyleProps(props);

  // it feels like `aria-expanded` should be on the primary pane (which is
  // controlled by the "separator"), but it's actually not supported:
  // https://github.com/w3c/aria-practices/issues/129
  // https://www.w3.org/TR/wai-aria-1.1/#aria-expanded
  return /*#__PURE__*/jsx("div", {
    ...styleProps,
    ...filterDOMProps(props),
    ref: forwardedRef,
    id: getPrimaryPaneId(id),
    "data-split-pane": "primary",
    "data-split-view-activity": activity,
    "data-split-view-collapsed": isCollapsed || undefined,
    className: classNames(css({
      containerType: 'inline-size',
      overflow: 'hidden',
      width: `clamp(${MIN_WIDTH_VAR},${WIDTH_VAR},${MAX_WIDTH_VAR})`,
      // prevent the secondary pane from collapsing completely, regardless of
      // consumer preference. losing the drag handle is a bad experience.
      maxWidth: `calc(100% - 100px)`,
      // hide when collapsed
      '&[data-split-view-collapsed]': {
        visibility: 'hidden',
        width: 0
      },
      // support transition when not dragging
      '&:not([data-split-view-activity])': {
        transition: transition('width')
      },
      // disable interactive elements during drag
      '&[data-split-view-activity=pointer]': {
        pointerEvents: 'none'
      }
    }), styleProps.className),
    children: props.children
  });
});
const SplitPaneSecondary = /*#__PURE__*/forwardRef(function SplitPaneSecondary(props, forwardedRef) {
  let {
    id,
    activity
  } = useSplitView();
  let styleProps = useStyleProps(props);
  return /*#__PURE__*/jsx("div", {
    ...styleProps,
    ...filterDOMProps(props),
    ref: forwardedRef,
    id: getSecondaryPaneId(id),
    "data-split-pane": "secondary",
    "data-split-view-activity": activity,
    className: classNames(css({
      containerType: 'inline-size',
      flex: `1 1 0`,
      // prevent the secondary pane from collapsing completely, regardless of
      // consumer preference. losing the drag handle is a bad experience.
      minWidth: `100px`,
      overflow: 'hidden',
      // disable interactive elements during drag
      '&[data-split-view-activity=pointer]': {
        pointerEvents: 'none'
      }
    }), styleProps.className),
    children: props.children
  });
});
const SplitViewResizeHandle = /*#__PURE__*/forwardRef(function SplitViewResizeHandle(props, forwardedRef) {
  let {
    activity,
    id,
    isCollapsed
  } = useSplitView();
  return /*#__PURE__*/jsx("div", {
    ...props,
    ref: forwardedRef,
    "aria-controls": getPrimaryPaneId(id),
    "aria-label": "Resize" // FIXME: localize
    ,
    "aria-orientation": "vertical",
    id: getResizeHandleId(id),
    role: "separator",
    tabIndex: 0,
    "data-split-view-resize-handle": true,
    "data-split-view-activity": activity,
    "data-split-view-collapsed": isCollapsed || undefined,
    className: css({
      backgroundColor: tokenSchema.color.border.muted,
      boxSizing: 'border-box',
      cursor: 'ew-resize',
      flexShrink: 0,
      outline: 0,
      position: 'relative',
      touchAction: 'none',
      transition: transition('background-color'),
      userSelect: 'none',
      width: tokenSchema.size.border.regular,
      zIndex: 1,
      // hide visually when collapsed. still allow keyboard focus
      '&[data-split-view-collapsed]:not([data-split-view-activity])': visuallyHiddenStyles,
      // increase hit area
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: `calc(${tokenSchema.size.space.small} * -1)`
      },
      // drag indicator
      '&::after': {
        backgroundColor: tokenSchema.color.alias.backgroundHovered,
        content: '""',
        insetBlock: 0,
        insetInline: `calc(${tokenSchema.size.border.medium} * -1)`,
        opacity: 0,
        position: 'absolute',
        transition: transition('opacity')
      },
      // delay transition to avoid unexpected flicker, the user may just be
      // mousing between panes; this way we ensure intent
      '&:hover': {
        backgroundColor: tokenSchema.color.border.neutral,
        transitionDelay: tokenSchema.animation.duration.regular,
        '&::after': {
          opacity: 1,
          transitionDelay: tokenSchema.animation.duration.regular
        }
      },
      '&[data-split-view-activity=pointer]::after, &[data-split-view-activity=keyboard]::after': {
        backgroundColor: tokenSchema.color.background.accentEmphasis,
        insetInline: `calc(${tokenSchema.size.border.regular} * -1)`,
        opacity: 1
      }
    })
  });
});
const visuallyHiddenStyles = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  width: '1px',
  whiteSpace: 'nowrap'
};

export { SplitPanePrimary, SplitPaneSecondary, SplitView };
