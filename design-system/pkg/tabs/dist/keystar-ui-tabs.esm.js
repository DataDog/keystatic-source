'use client';
import { useCollection } from '@react-stately/collections';
export { Item } from '@react-stately/collections';
import { usePress, useHover } from '@react-aria/interactions';
import { useLocale } from '@react-aria/i18n';
import { useTabList, useTabPanel, useTab } from '@react-aria/tabs';
import { useObjectRef, useResizeObserver, useId, filterDOMProps, mergeProps, useLayoutEffect } from '@react-aria/utils';
import { ListCollection } from '@react-stately/list';
import { useTabListState } from '@react-stately/tabs';
import React, { useContext, useEffect, createElement, useRef, useState, useCallback } from 'react';
import { useProviderProps, useProvider } from '@keystar/ui/core';
import { Picker, Item } from '@keystar/ui/picker';
import { SlotProvider } from '@keystar/ui/slots';
import { ClassList, useStyleProps, toDataAttributes, classNames, css, tokenSchema, FocusRing, transition } from '@keystar/ui/style';
import { Text } from '@keystar/ui/typography';
import { isReactText } from '@keystar/ui/utils';
import { jsxs, jsx } from 'react/jsx-runtime';

const TabContext = /*#__PURE__*/React.createContext(null);
function useTabContext() {
  let ctx = useContext(TabContext);
  if (!ctx) {
    throw new Error('TabContext not found');
  }
  return ctx;
}

const tabsClassList = new ClassList('Tabs', ['collapseWrapper', 'indicator', 'list', 'panel', 'picker', 'tab', 'tab-icon', 'tab-label']);
function Tabs(props, forwardedRef) {
  props = useProviderProps(props);
  let {
    orientation = 'horizontal',
    prominence = 'default',
    children,
    ...otherProps
  } = props;
  let domRef = useObjectRef(forwardedRef);
  let tablistRef = useRef(null);
  let wrapperRef = useRef(null);
  let {
    direction
  } = useLocale();
  let styleProps = useStyleProps(otherProps);
  let [collapsed, setCollapsed] = useState(false);
  let [selectedTab, setSelectedTab] = useState();
  const [tabListState, setTabListState] = useState(null);
  useEffect(() => {
    if (tablistRef.current) {
      let selectedTab = tablistRef.current.querySelector(`[data-key="${tabListState === null || tabListState === void 0 ? void 0 : tabListState.selectedKey}"]`);
      if (selectedTab != null) {
        setSelectedTab(selectedTab);
      }
    }
    // collapse is in the dep array so selectedTab can be updated for  dicator positioning
  }, [children, tabListState === null || tabListState === void 0 ? void 0 : tabListState.selectedKey, collapsed, tablistRef]);
  let checkShouldCollapse = useCallback(() => {
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
  useEffect(() => {
    checkShouldCollapse();
  }, [children, checkShouldCollapse]);
  useResizeObserver({
    ref: wrapperRef,
    onResize: checkShouldCollapse
  });
  let tabPanelProps = {
    'aria-labelledby': undefined
  };

  // When the tabs are collapsed, the tabPanel should be labelled by the Picker button element.
  let collapsibleTabListId = useId();
  if (collapsed && orientation !== 'vertical') {
    tabPanelProps['aria-labelledby'] = collapsibleTabListId;
  }
  return /*#__PURE__*/jsx(TabContext.Provider, {
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
    children: /*#__PURE__*/jsx("div", {
      ...filterDOMProps(otherProps),
      ...toDataAttributes({
        orientation
      }),
      ...styleProps,
      ref: domRef,
      className: classNames(css({
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
  let ref = useRef(null); // HTMLAnchorElement | HTMLDivElement
  let {
    tabProps,
    isDisabled
  } = useTab({
    key
  }, state, ref);
  let {
    pressProps,
    isPressed
  } = usePress({
    ...otherProps,
    isDisabled
  });
  let {
    hoverProps,
    isHovered
  } = useHover({
    ...otherProps,
    isDisabled
  });
  let ElementType = item.props.href ? 'a' : 'div';
  return /*#__PURE__*/jsx(FocusRing, {
    children: /*#__PURE__*/jsx(ElementType, {
      ...mergeProps(tabProps, hoverProps, pressProps),
      ...toDataAttributes({
        interaction: isPressed ? 'press' : isHovered ? 'hover' : undefined,
        orientation: tabContext.tabProps.orientation,
        prominence: tabContext.tabProps.prominence
      }),
      ref: ref,
      className: classNames(css({
        display: 'flex',
        alignItems: 'center',
        gap: tokenSchema.size.space.small,
        color: tokenSchema.color.foreground.neutralSecondary,
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
          borderRadius: tokenSchema.size.radius.regular
        },
        '&[data-prominence=low]::before': {
          borderRadius: tokenSchema.size.radius.small
        },
        // modifiers
        '&[data-prominence=default]': {
          fontWeight: tokenSchema.typography.fontWeight.medium,
          fontSize: tokenSchema.typography.text.regular.size
        },
        '&[data-prominence=low]': {
          fontSize: tokenSchema.typography.text.regular.size
        },
        // orientation
        '&[orientation=horizontal]': {
          // modifiers
          '&[data-prominence=default]': {
            fontWeight: tokenSchema.typography.fontWeight.medium,
            fontSize: tokenSchema.typography.text.regular.size,
            height: tokenSchema.size.element.medium,
            paddingBottom: tokenSchema.size.space.regular,
            '&::before': {
              insetBlockEnd: tokenSchema.size.space.regular,
              insetBlockStart: 0,
              insetInline: `calc(${tokenSchema.size.space.medium} * -1)`
            }
          },
          '&[data-prominence=low]': {
            fontSize: tokenSchema.typography.text.regular.size,
            height: tokenSchema.size.element.regular,
            paddingBottom: tokenSchema.size.space.small,
            '&::before': {
              insetBlockEnd: tokenSchema.size.space.small,
              insetBlockStart: 0,
              insetInline: `calc(${tokenSchema.size.space.regular} * -1)`
            }
          }
        },
        '&[orientation=vertical]': {
          paddingInline: tokenSchema.size.space.large,
          '&[data-prominence=default]': {
            height: tokenSchema.size.element.large,
            '&::before': {
              insetBlock: tokenSchema.size.space.regular,
              insetInlineEnd: tokenSchema.size.space.regular,
              insetInlineStart: 0
            }
          },
          '&[data-prominence=low]': {
            height: tokenSchema.size.element.regular,
            '&::before': {
              insetBlock: tokenSchema.size.space.xsmall,
              insetInlineEnd: tokenSchema.size.space.regular,
              insetInlineStart: 0
            }
          }
        },
        // interaction

        '&:where([data-interaction=hover], [data-focus=visible])': {
          color: tokenSchema.color.foreground.neutral,
          '&::before': {
            backgroundColor: tokenSchema.color.alias.backgroundHovered
          }
        },
        '&[data-interaction=press]::before': {
          backgroundColor: tokenSchema.color.alias.backgroundPressed
        },
        // state
        '&[aria-selected=true]': {
          color: tokenSchema.color.foreground.neutralEmphasis
        },
        '&[aria-disabled=true]': {
          color: tokenSchema.color.alias.foregroundDisabled,
          cursor: 'default'
        }
      }), tabsClassList.element('tab')),
      children: /*#__PURE__*/jsx(SlotProvider, {
        slots: {
          icon: {
            UNSAFE_className: tabsClassList.element('tab-icon')
          },
          text: {
            UNSAFE_className: classNames(css({
              color: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit'
            }), tabsClassList.element('tab-label'))
          }
        },
        children: isReactText(rendered) ? /*#__PURE__*/jsx(Text, {
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
  } = useLocale();
  let {
    scale
  } = useProvider();
  const tabContext = useTabContext();
  let [style, setStyle] = useState({
    width: undefined,
    height: undefined
  });
  useLayoutEffect(() => {
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
  return /*#__PURE__*/jsx("div", {
    ...toDataAttributes({
      disabled: tabContext.tabProps.isDisabled,
      orientation,
      prominence: tabContext.tabProps.prominence
    }),
    className: classNames(css({
      borderRadius: 9999,
      position: 'absolute',
      transformOrigin: 'top left',
      zIndex: 0,
      // Below tab content

      '&[data-orientation=horizontal]': {
        transition: transition(['transform', 'width'], {
          duration: 'regular'
        })
      },
      '&[data-orientation=vertical]': {
        transition: transition(['transform', 'width'], {
          duration: 'regular'
        })
      },
      '&[data-prominence=default]': {
        backgroundColor: tokenSchema.color.background.accentEmphasis,
        '&[data-orientation=horizontal]': {
          bottom: tokenSchema.size.border.medium,
          blockSize: tokenSchema.size.border.large
        },
        '&[data-orientation=vertical]': {
          insetInlineEnd: tokenSchema.size.border.regular,
          inlineSize: tokenSchema.size.border.large
        }
      },
      '&[data-prominence=low]': {
        backgroundColor: tokenSchema.color.foreground.neutralEmphasis,
        '&[data-orientation=horizontal]': {
          bottom: `calc(${tokenSchema.size.border.regular} * -1)`,
          blockSize: tokenSchema.size.border.medium
        },
        '&[data-orientation=vertical]': {
          insetInlineEnd: `calc(${tokenSchema.size.border.regular} * -1)`,
          inlineSize: tokenSchema.size.border.medium
        }
      },
      '&[data-disabled=true]': {
        backgroundColor: tokenSchema.color.alias.foregroundDisabled
      }
    }), tabsClassList.element('indicator')),
    role: "presentation",
    style: style
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
  const state = useTabListState({
    ...tabProps,
    children: props.children
  });
  let styleProps = useStyleProps(props);
  const {
    tabListProps
  } = useTabList({
    ...tabProps,
    ...props
  }, state, tablistRef);
  useEffect(() => {
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
  const tabContent = /*#__PURE__*/jsxs("div", {
    ...stylePropsFinal,
    ...tabListProps,
    ...toDataAttributes({
      orientation,
      prominence
    }),
    ref: tablistRef,
    className: classNames(css({
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
          gap: tokenSchema.size.space.xlarge
        },
        '&[data-prominence=low]': {
          gap: tokenSchema.size.space.large
        }
      },
      '&[data-orientation=vertical]': {
        flexDirection: 'column'
      }
    }), tabsClassList.element('list'), orientation === 'vertical' && styleProps.className),
    children: [[...state.collection].map(item => /*#__PURE__*/jsx(Tab, {
      item: item,
      state: state,
      orientation: orientation
    }, item.key)), /*#__PURE__*/jsx(SelectionIndicator, {
      orientation: orientation,
      selectedTab: selectedTab
    })]
  });
  if (orientation === 'vertical') {
    return tabContent;
  } else {
    return /*#__PURE__*/jsxs("div", {
      ...styleProps,
      ref: wrapperRef,
      className: classNames(css({
        display: 'flex',
        position: 'relative'
      }), tabsClassList.element('collapseWrapper'), styleProps.className),
      children: [/*#__PURE__*/jsx(TabPicker, {
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
  const factory = nodes => new ListCollection(nodes);
  const collection = useCollection(
  // @ts-expect-error FIXME: not sure how to resolve, right now.
  {
    items: tabProps.items,
    ...props
  }, factory, {
    suppressTextValueWarning: true
  });
  const selectedItem = tabListState ? collection.getItem(tabListState.selectedKey) : null;
  return /*#__PURE__*/createElement(TabPanel, {
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
  let ref = useRef(null);
  // @ts-expect-error `tabListState` will exist by here...
  const {
    tabPanelProps
  } = useTabPanel(props, tabListState, ref);
  let styleProps = useStyleProps(props);
  if (ctxTabPanelProps['aria-labelledby']) {
    tabPanelProps['aria-labelledby'] = ctxTabPanelProps['aria-labelledby'];
  }
  return /*#__PURE__*/jsx(FocusRing, {
    children: /*#__PURE__*/jsx("div", {
      ...styleProps,
      ...tabPanelProps,
      ref: ref,
      className: classNames(css({
        flexGrow: 1,
        '&[data-focus=visible]': {
          boxShadow: `inset 0 0 0 ${tokenSchema.size.alias.focusRing} ${tokenSchema.color.alias.focusRing}`,
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
  const style = visible ? {} : {
    visibility: 'hidden',
    position: 'absolute'
  };

  // wrapper around the picker, keeps everything aligned when viewport changes
  return /*#__PURE__*/jsx("div", {
    ...toDataAttributes({
      prominence,
      orientation: 'horizontal'
    }),
    className: className,
    style: style,
    "aria-hidden": visible ? undefined : true,
    children: /*#__PURE__*/jsx(Picker, {
      ...pickerProps,
      id: id,
      items: items,
      isDisabled: !visible || isDisabled,
      selectedKey: state.selectedKey,
      disabledKeys: state.disabledKeys,
      onSelectionChange: state.setSelectedKey,
      marginBottom: "xsmall",
      UNSAFE_className: tabsClassList.element('picker'),
      children: item => /*#__PURE__*/jsx(Item, {
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
const _Tabs = /*#__PURE__*/React.forwardRef(Tabs);

export { TabList, TabPanels, _Tabs as Tabs, tabsClassList };
