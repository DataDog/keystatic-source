'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var collections = require('@react-stately/collections');
var interactions = require('@react-aria/interactions');
var i18n = require('@react-aria/i18n');
var tabs$1 = require('@react-aria/tabs');
var utils = require('@react-aria/utils');
var list = require('@react-stately/list');
var tabs = require('@react-stately/tabs');
var React = require('react');
var core = require('@keystar/ui/core');
var picker = require('@keystar/ui/picker');
var slots = require('@keystar/ui/slots');
var style = require('@keystar/ui/style');
var typography = require('@keystar/ui/typography');
var utils$1 = require('@keystar/ui/utils');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const TabContext = /*#__PURE__*/React__default["default"].createContext(null);
function useTabContext() {
  let ctx = React.useContext(TabContext);
  if (!ctx) {
    throw new Error('TabContext not found');
  }
  return ctx;
}

const tabsClassList = new style.ClassList('Tabs', ['collapseWrapper', 'indicator', 'list', 'panel', 'picker', 'tab', 'tab-icon', 'tab-label']);
function Tabs(props, forwardedRef) {
  props = core.useProviderProps(props);
  let {
    orientation = 'horizontal',
    prominence = 'default',
    children,
    ...otherProps
  } = props;
  let domRef = utils.useObjectRef(forwardedRef);
  let tablistRef = React.useRef(null);
  let wrapperRef = React.useRef(null);
  let {
    direction
  } = i18n.useLocale();
  let styleProps = style.useStyleProps(otherProps);
  let [collapsed, setCollapsed] = React.useState(false);
  let [selectedTab, setSelectedTab] = React.useState();
  const [tabListState, setTabListState] = React.useState(null);
  React.useEffect(() => {
    if (tablistRef.current) {
      let selectedTab = tablistRef.current.querySelector(`[data-key="${tabListState === null || tabListState === void 0 ? void 0 : tabListState.selectedKey}"]`);
      if (selectedTab != null) {
        setSelectedTab(selectedTab);
      }
    }
    // collapse is in the dep array so selectedTab can be updated for  dicator positioning
  }, [children, tabListState === null || tabListState === void 0 ? void 0 : tabListState.selectedKey, collapsed, tablistRef]);
  let checkShouldCollapse = React.useCallback(() => {
    let wrapperEl = wrapperRef.current;
    let tablistEl = tablistRef.current;
    if (wrapperEl && tablistEl && orientation !== 'vertical') {
      let tabs = tablistEl.querySelectorAll('[role="tab"]');
      let lastTab = tabs[tabs.length - 1];
      const end = direction === 'rtl' ? 'left' : 'right';
      let farEdgeTabList = wrapperEl.getBoundingClientRect()[end];
      let farEdgeLastTab = lastTab === null || lastTab === void 0 ? void 0 : lastTab.getBoundingClientRect()[end];
      let shouldCollapse = direction === 'rtl' ? farEdgeLastTab < farEdgeTabList : farEdgeTabList < farEdgeLastTab;
      setCollapsed(shouldCollapse);
    }
  }, [tablistRef, wrapperRef, direction, orientation, setCollapsed]);
  React.useEffect(() => {
    checkShouldCollapse();
  }, [children, checkShouldCollapse]);
  utils.useResizeObserver({
    ref: wrapperRef,
    onResize: checkShouldCollapse
  });
  let tabPanelProps = {
    'aria-labelledby': undefined
  };

  // When the tabs are collapsed, the tabPanel should be labelled by the Picker button element.
  let collapsibleTabListId = utils.useId();
  if (collapsed && orientation !== 'vertical') {
    tabPanelProps['aria-labelledby'] = collapsibleTabListId;
  }
  return /*#__PURE__*/jsxRuntime.jsx(TabContext.Provider, {
    value: {
      tabProps: {
        ...props,
        orientation,
        prominence
      },
      tabState: {
        tabListState,
        setTabListState,
        selectedTab,
        collapsed
      },
      refs: {
        tablistRef,
        wrapperRef
      },
      tabPanelProps
    },
    children: /*#__PURE__*/jsxRuntime.jsx("div", {
      ...utils.filterDOMProps(otherProps),
      ...style.toDataAttributes({
        orientation
      }),
      ...styleProps,
      ref: domRef,
      className: style.classNames(style.css({
        display: 'flex',
        /*
        Allow collapse with wrapping block/flex containers out of the box.
        If consumers want to place element next to tabpanel, they must
        include flex: 1 1 auto and min-width: 0 on the Tabs component.
        */
        width: '100%',
        '&[data-orientation="vertical"]': {
          flexDirection: 'row'
        },
        '&[data-orientation="horizontal"]': {
          flexDirection: 'column'
        }
      }), tabsClassList.element('root'), styleProps.className),
      children: props.children
    })
  });
}
// @private
function Tab(props) {
  let {
    item,
    state,
    ...otherProps
  } = props;
  let {
    key,
    rendered
  } = item;
  let tabContext = useTabContext();
  let ref = React.useRef(null); // HTMLAnchorElement | HTMLDivElement
  let {
    tabProps,
    isDisabled
  } = tabs$1.useTab({
    key
  }, state, ref);
  let {
    pressProps,
    isPressed
  } = interactions.usePress({
    ...otherProps,
    isDisabled
  });
  let {
    hoverProps,
    isHovered
  } = interactions.useHover({
    ...otherProps,
    isDisabled
  });
  let ElementType = item.props.href ? 'a' : 'div';
  return /*#__PURE__*/jsxRuntime.jsx(style.FocusRing, {
    children: /*#__PURE__*/jsxRuntime.jsx(ElementType, {
      ...utils.mergeProps(tabProps, hoverProps, pressProps),
      ...style.toDataAttributes({
        interaction: isPressed ? 'press' : isHovered ? 'hover' : undefined,
        orientation: tabContext.tabProps.orientation,
        prominence: tabContext.tabProps.prominence
      }),
      ref: ref,
      className: style.classNames(style.css({
        display: 'flex',
        alignItems: 'center',
        gap: style.tokenSchema.size.space.small,
        color: style.tokenSchema.color.foreground.neutralSecondary,
        cursor: 'pointer',
        outline: 'none',
        position: 'relative',
        // Contain the focus ring
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        zIndex: '1',
        // Float above the tab line

        // interaction indicator
        '&::before': {
          content: '" "',
          // opacity: 0,
          position: 'absolute',
          // transition: transition('opacity'),
          zIndex: -1 // behind the tab content
        },

        '&[data-prominence=default]::before': {
          borderRadius: style.tokenSchema.size.radius.regular
        },
        '&[data-prominence=low]::before': {
          borderRadius: style.tokenSchema.size.radius.small
        },
        // modifiers
        '&[data-prominence=default]': {
          fontWeight: style.tokenSchema.typography.fontWeight.medium,
          fontSize: style.tokenSchema.typography.text.regular.size
        },
        '&[data-prominence=low]': {
          fontSize: style.tokenSchema.typography.text.regular.size
        },
        // orientation
        '&[orientation=horizontal]': {
          // modifiers
          '&[data-prominence=default]': {
            fontWeight: style.tokenSchema.typography.fontWeight.medium,
            fontSize: style.tokenSchema.typography.text.regular.size,
            height: style.tokenSchema.size.element.medium,
            paddingBottom: style.tokenSchema.size.space.regular,
            '&::before': {
              insetBlockEnd: style.tokenSchema.size.space.regular,
              insetBlockStart: 0,
              insetInline: `calc(${style.tokenSchema.size.space.medium} * -1)`
            }
          },
          '&[data-prominence=low]': {
            fontSize: style.tokenSchema.typography.text.regular.size,
            height: style.tokenSchema.size.element.regular,
            paddingBottom: style.tokenSchema.size.space.small,
            '&::before': {
              insetBlockEnd: style.tokenSchema.size.space.small,
              insetBlockStart: 0,
              insetInline: `calc(${style.tokenSchema.size.space.regular} * -1)`
            }
          }
        },
        '&[orientation=vertical]': {
          paddingInline: style.tokenSchema.size.space.large,
          '&[data-prominence=default]': {
            height: style.tokenSchema.size.element.large,
            '&::before': {
              insetBlock: style.tokenSchema.size.space.regular,
              insetInlineEnd: style.tokenSchema.size.space.regular,
              insetInlineStart: 0
            }
          },
          '&[data-prominence=low]': {
            height: style.tokenSchema.size.element.regular,
            '&::before': {
              insetBlock: style.tokenSchema.size.space.xsmall,
              insetInlineEnd: style.tokenSchema.size.space.regular,
              insetInlineStart: 0
            }
          }
        },
        // interaction

        '&:where([data-interaction=hover], [data-focus=visible])': {
          color: style.tokenSchema.color.foreground.neutral,
          '&::before': {
            backgroundColor: style.tokenSchema.color.alias.backgroundHovered
          }
        },
        '&[data-interaction=press]::before': {
          backgroundColor: style.tokenSchema.color.alias.backgroundPressed
        },
        // state
        '&[aria-selected=true]': {
          color: style.tokenSchema.color.foreground.neutralEmphasis
        },
        '&[aria-disabled=true]': {
          color: style.tokenSchema.color.alias.foregroundDisabled,
          cursor: 'default'
        }
      }), tabsClassList.element('tab')),
      children: /*#__PURE__*/jsxRuntime.jsx(slots.SlotProvider, {
        slots: {
          icon: {
            UNSAFE_className: tabsClassList.element('tab-icon')
          },
          text: {
            UNSAFE_className: style.classNames(style.css({
              color: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit'
            }), tabsClassList.element('tab-label'))
          }
        },
        children: utils$1.isReactText(rendered) ? /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
          children: rendered
        }) : rendered
      })
    })
  });
}
// @private
function SelectionIndicator(props) {
  let {
    orientation,
    // Is either the tab node (non-collapsed) or the picker node (collapsed)
    selectedTab,
    // selectedKey is provided so that the SelectionIndicator styles are updated when the TabPicker's width updates from a selection change
    selectedKey
  } = props;
  let {
    direction
  } = i18n.useLocale();
  let {
    scale
  } = core.useProvider();
  const tabContext = useTabContext();
  let [style$1, setStyle] = React.useState({
    width: undefined,
    height: undefined
  });
  utils.useLayoutEffect(() => {
    if (selectedTab) {
      var _selectedTab$offsetPa;
      let styleObj = {
        transform: undefined,
        width: undefined,
        height: undefined
      };
      // In RTL, calculate the transform from the right edge of the tablist so
      // that resizing the window doesn't break the Tabline position due to
      // offsetLeft changes
      let offset = direction === 'rtl' ? -1 * (((_selectedTab$offsetPa = selectedTab.offsetParent) === null || _selectedTab$offsetPa === void 0 ? void 0 : _selectedTab$offsetPa.offsetWidth) - selectedTab.offsetWidth - selectedTab.offsetLeft) : selectedTab.offsetLeft;
      styleObj.transform = orientation === 'vertical' ? `translateY(${selectedTab.offsetTop}px)` : `translateX(${offset}px)`;
      if (orientation === 'horizontal') {
        styleObj.width = `${selectedTab.offsetWidth}px`;
      } else {
        styleObj.height = `${selectedTab.offsetHeight}px`;
      }
      setStyle(styleObj);
    }
  }, [direction, setStyle, selectedTab, orientation, scale, selectedKey]);
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...style.toDataAttributes({
      disabled: tabContext.tabProps.isDisabled,
      orientation,
      prominence: tabContext.tabProps.prominence
    }),
    className: style.classNames(style.css({
      borderRadius: 9999,
      position: 'absolute',
      transformOrigin: 'top left',
      zIndex: 0,
      // Below tab content

      '&[data-orientation=horizontal]': {
        transition: style.transition(['transform', 'width'], {
          duration: 'regular'
        })
      },
      '&[data-orientation=vertical]': {
        transition: style.transition(['transform', 'width'], {
          duration: 'regular'
        })
      },
      '&[data-prominence=default]': {
        backgroundColor: style.tokenSchema.color.background.accentEmphasis,
        '&[data-orientation=horizontal]': {
          bottom: style.tokenSchema.size.border.medium,
          blockSize: style.tokenSchema.size.border.large
        },
        '&[data-orientation=vertical]': {
          insetInlineEnd: style.tokenSchema.size.border.regular,
          inlineSize: style.tokenSchema.size.border.large
        }
      },
      '&[data-prominence=low]': {
        backgroundColor: style.tokenSchema.color.foreground.neutralEmphasis,
        '&[data-orientation=horizontal]': {
          bottom: `calc(${style.tokenSchema.size.border.regular} * -1)`,
          blockSize: style.tokenSchema.size.border.medium
        },
        '&[data-orientation=vertical]': {
          insetInlineEnd: `calc(${style.tokenSchema.size.border.regular} * -1)`,
          inlineSize: style.tokenSchema.size.border.medium
        }
      },
      '&[data-disabled=true]': {
        backgroundColor: style.tokenSchema.color.alias.foregroundDisabled
      }
    }), tabsClassList.element('indicator')),
    role: "presentation",
    style: style$1
  });
}

/**
 * A TabList is used within Tabs to group tabs that a user can switch between.
 * The keys of the items within the <TabList> must match up with a corresponding
 * item inside the <TabPanels>.
 */
function TabList(props) {
  const tabContext = useTabContext();
  const {
    refs,
    tabState,
    tabProps,
    tabPanelProps
  } = tabContext;
  const {
    prominence,
    orientation
  } = tabProps;
  const {
    selectedTab,
    collapsed,
    setTabListState
  } = tabState;
  const {
    tablistRef,
    wrapperRef
  } = refs;
  // Pass original Tab props but override children to create the collection.
  const state = tabs.useTabListState({
    ...tabProps,
    children: props.children
  });
  let styleProps = style.useStyleProps(props);
  const {
    tabListProps
  } = tabs$1.useTabList({
    ...tabProps,
    ...props
  }, state, tablistRef);
  React.useEffect(() => {
    // Passing back to root as useTabPanel needs the TabListState
    setTabListState(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.disabledKeys, state.selectedItem, state.selectedKey, props.children]);
  let collapseStyle = collapsed && orientation !== 'vertical' ? {
    maxWidth: 'calc(100% + 1px)',
    overflow: 'hidden',
    visibility: 'hidden',
    position: 'absolute'
  } : {
    maxWidth: 'calc(100% + 1px)'
  };
  let stylePropsFinal = orientation === 'vertical' ? styleProps : {
    style: collapseStyle
  };
  if (collapsed && orientation !== 'vertical') {
    tabListProps['aria-hidden'] = true;
  }
  const tabContent = /*#__PURE__*/jsxRuntime.jsxs("div", {
    ...stylePropsFinal,
    ...tabListProps,
    ...style.toDataAttributes({
      orientation,
      prominence
    }),
    ref: tablistRef,
    className: style.classNames(style.css({
      display: 'flex',
      margin: 0,
      outline: 'none',
      padding: 0,
      position: 'relative',
      // Contain the selection indicator
      userSelect: 'none',
      verticalAlign: 'top',
      // Friends should align to the top of the tabs
      zIndex: 0,
      '&[data-orientation=horizontal]': {
        alignItems: 'flex-end',
        flex: 1,
        '&[data-prominence=default]': {
          gap: style.tokenSchema.size.space.xlarge
        },
        '&[data-prominence=low]': {
          gap: style.tokenSchema.size.space.large
        }
      },
      '&[data-orientation=vertical]': {
        flexDirection: 'column'
      }
    }), tabsClassList.element('list'), orientation === 'vertical' && styleProps.className),
    children: [[...state.collection].map(item => /*#__PURE__*/jsxRuntime.jsx(Tab, {
      item: item,
      state: state,
      orientation: orientation
    }, item.key)), /*#__PURE__*/jsxRuntime.jsx(SelectionIndicator, {
      orientation: orientation,
      selectedTab: selectedTab
    })]
  });
  if (orientation === 'vertical') {
    return tabContent;
  } else {
    return /*#__PURE__*/jsxRuntime.jsxs("div", {
      ...styleProps,
      ref: wrapperRef,
      className: style.classNames(style.css({
        display: 'flex',
        position: 'relative'
      }), tabsClassList.element('collapseWrapper'), styleProps.className),
      children: [/*#__PURE__*/jsxRuntime.jsx(TabPicker, {
        ...props,
        ...tabProps,
        visible: collapsed,
        id: tabPanelProps['aria-labelledby'],
        state: state
      }), tabContent]
    });
  }
}

/**
 * TabPanels is used within Tabs as a container for the content of each tab.
 * The keys of the items within the <TabPanels> must match up with a corresponding item inside the <TabList>.
 */
function TabPanels(props) {
  const {
    tabState,
    tabProps
  } = useTabContext();
  const {
    tabListState
  } = tabState;
  const factory = nodes => new list.ListCollection(nodes);
  const collection = collections.useCollection(
  // @ts-expect-error FIXME: not sure how to resolve, right now.
  {
    items: tabProps.items,
    ...props
  }, factory, {
    suppressTextValueWarning: true
  });
  const selectedItem = tabListState ? collection.getItem(tabListState.selectedKey) : null;
  return /*#__PURE__*/React.createElement(TabPanel, {
    ...props,
    key: tabListState === null || tabListState === void 0 ? void 0 : tabListState.selectedKey
  }, selectedItem && selectedItem.props.children);
}

// @private
function TabPanel(props) {
  const {
    tabState,
    tabPanelProps: ctxTabPanelProps
  } = useTabContext();
  const {
    tabListState
  } = tabState;
  let ref = React.useRef(null);
  // @ts-expect-error `tabListState` will exist by here...
  const {
    tabPanelProps
  } = tabs$1.useTabPanel(props, tabListState, ref);
  let styleProps = style.useStyleProps(props);
  if (ctxTabPanelProps['aria-labelledby']) {
    tabPanelProps['aria-labelledby'] = ctxTabPanelProps['aria-labelledby'];
  }
  return /*#__PURE__*/jsxRuntime.jsx(style.FocusRing, {
    children: /*#__PURE__*/jsxRuntime.jsx("div", {
      ...styleProps,
      ...tabPanelProps,
      ref: ref,
      className: style.classNames(style.css({
        flexGrow: 1,
        '&[data-focus=visible]': {
          boxShadow: `inset 0 0 0 ${style.tokenSchema.size.alias.focusRing} ${style.tokenSchema.color.alias.focusRing}`,
          outline: 'none'
        }
      }), tabsClassList.element('panel'), styleProps.className),
      children: props.children
    })
  });
}
function TabPicker(props) {
  let {
    isDisabled,
    state,
    'aria-labelledby': ariaLabeledBy,
    'aria-label': ariaLabel,
    prominence,
    className,
    id,
    visible
  } = props;
  let items = [...state.collection];
  let pickerProps = {
    'aria-labelledby': ariaLabeledBy,
    'aria-label': ariaLabel
  };
  const style$1 = visible ? {} : {
    visibility: 'hidden',
    position: 'absolute'
  };

  // wrapper around the picker, keeps everything aligned when viewport changes
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...style.toDataAttributes({
      prominence,
      orientation: 'horizontal'
    }),
    className: className,
    style: style$1,
    "aria-hidden": visible ? undefined : true,
    children: /*#__PURE__*/jsxRuntime.jsx(picker.Picker, {
      ...pickerProps,
      id: id,
      items: items,
      isDisabled: !visible || isDisabled,
      selectedKey: state.selectedKey,
      disabledKeys: state.disabledKeys,
      onSelectionChange: state.setSelectedKey,
      marginBottom: "xsmall",
      UNSAFE_className: tabsClassList.element('picker'),
      children: item => /*#__PURE__*/jsxRuntime.jsx(picker.Item, {
        ...item.props,
        children: item.rendered
      })
    })
  });
}

/**
 * Tabs organise related content into multiple sections. They allow the user to
 * navigate between groups of information that appear within the same context.
 */
// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _Tabs = /*#__PURE__*/React__default["default"].forwardRef(Tabs);

Object.defineProperty(exports, 'Item', {
  enumerable: true,
  get: function () { return collections.Item; }
});
exports.TabList = TabList;
exports.TabPanels = TabPanels;
exports.Tabs = _Tabs;
exports.tabsClassList = tabsClassList;
