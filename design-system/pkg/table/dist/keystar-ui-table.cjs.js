'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var table = require('@react-stately/table');
var React = require('react');
var focus = require('@react-aria/focus');
var i18n = require('@react-aria/i18n');
var interactions = require('@react-aria/interactions');
var table$1 = require('@react-aria/table');
var utils = require('@react-aria/utils');
var virtualizer$1 = require('@react-aria/virtualizer');
var visuallyHidden = require('@react-aria/visually-hidden');
var layout = require('@react-stately/layout');
var virtualizer = require('@react-stately/virtualizer');
var checkbox = require('@keystar/ui/checkbox');
var progress = require('@keystar/ui/progress');
var slots = require('@keystar/ui/slots');
var style = require('@keystar/ui/style');
var tooltip = require('@keystar/ui/tooltip');
var typography = require('@keystar/ui/typography');
var utils$1 = require('@keystar/ui/utils');
var arrowUpIcon = require('@keystar/ui/icon/icons/arrowUpIcon');
var icon = require('@keystar/ui/icon');
var jsxRuntime = require('react/jsx-runtime');

var localizedMessages = {
	"ar-AE": {
		loading: "جارٍ التحميل...",
		loadingMore: "جارٍ تحميل المزيد..."
	},
	"bg-BG": {
		loading: "Зареждане...",
		loadingMore: "Зареждане на още..."
	},
	"cs-CZ": {
		loading: "Načítání...",
		loadingMore: "Načítání dalších..."
	},
	"da-DK": {
		loading: "Indlæser...",
		loadingMore: "Indlæser flere..."
	},
	"de-DE": {
		loading: "Laden...",
		loadingMore: "Mehr laden ..."
	},
	"el-GR": {
		loading: "Φόρτωση...",
		loadingMore: "Φόρτωση περισσότερων..."
	},
	"en-US": {
		loading: "Loading…",
		loadingMore: "Loading more…"
	},
	"es-ES": {
		loading: "Cargando…",
		loadingMore: "Cargando más…"
	},
	"et-EE": {
		loading: "Laadimine...",
		loadingMore: "Laadi rohkem..."
	},
	"fi-FI": {
		loading: "Ladataan…",
		loadingMore: "Ladataan lisää…"
	},
	"fr-FR": {
		loading: "Chargement...",
		loadingMore: "Chargement supplémentaire..."
	},
	"he-IL": {
		loading: "טוען...",
		loadingMore: "טוען עוד..."
	},
	"hr-HR": {
		loading: "Učitavam...",
		loadingMore: "Učitavam još..."
	},
	"hu-HU": {
		loading: "Betöltés folyamatban…",
		loadingMore: "Továbbiak betöltése folyamatban…"
	},
	"it-IT": {
		loading: "Caricamento...",
		loadingMore: "Caricamento altri..."
	},
	"ja-JP": {
		loading: "読み込み中...",
		loadingMore: "さらに読み込み中..."
	},
	"ko-KR": {
		loading: "로드 중…",
		loadingMore: "추가 로드 중…"
	},
	"lt-LT": {
		loading: "Įkeliama...",
		loadingMore: "Įkeliama daugiau..."
	},
	"lv-LV": {
		loading: "Notiek ielāde...",
		loadingMore: "Tiek ielādēts vēl..."
	},
	"nb-NO": {
		loading: "Laster inn ...",
		loadingMore: "Laster inn flere ..."
	},
	"nl-NL": {
		loading: "Laden...",
		loadingMore: "Meer laden..."
	},
	"pl-PL": {
		loading: "Ładowanie...",
		loadingMore: "Wczytywanie większej liczby..."
	},
	"pt-BR": {
		loading: "Carregando...",
		loadingMore: "Carregando mais..."
	},
	"pt-PT": {
		loading: "A carregar...",
		loadingMore: "A carregar mais..."
	},
	"ro-RO": {
		loading: "Se încarcă...",
		loadingMore: "Se încarcă mai multe..."
	},
	"ru-RU": {
		loading: "Загрузка...",
		loadingMore: "Дополнительная загрузка..."
	},
	"sk-SK": {
		loading: "Načítava sa...",
		loadingMore: "Načítava sa viac..."
	},
	"sl-SI": {
		loading: "Nalaganje ...",
		loadingMore: "Nalaganje več vsebine ..."
	},
	"sr-SP": {
		loading: "Učitavam...",
		loadingMore: "Učitavam još..."
	},
	"sv-SE": {
		loading: "Läser in...",
		loadingMore: "Läser in mer..."
	},
	"tr-TR": {
		loading: "Yükleniyor...",
		loadingMore: "Daha fazla yükleniyor..."
	},
	"uk-UA": {
		loading: "Завантаження…",
		loadingMore: "Завантаження інших об’єктів..."
	},
	"zh-CN": {
		loading: "正在加载...",
		loadingMore: "正在加载更多..."
	},
	"zh-T": {
		loading: "載入中…",
		loadingMore: "正在載入更多…"
	}
};

const tableViewClassList = new style.ClassList('TableView', ['cell', 'cell-wrapper', 'row']);
const SortIndicator = () => {
  // fix alignment: reduce the space the icon takes up, w/o affecting the icon layout itself
  let labelHeight = style.tokenSchema.typography.text.regular.capheight;
  return /*#__PURE__*/jsxRuntime.jsx("span", {
    "aria-hidden": "true",
    className: style.css({
      alignItems: 'center',
      display: 'flex',
      flexShrink: 0,
      height: labelHeight,
      justifyContent: 'center',
      marginInline: style.tokenSchema.size.space.small,
      opacity: 0,
      position: 'relative',
      transition: style.transition(['opacity', 'transform'], {
        easing: 'easeOut'
      }),
      width: labelHeight,
      svg: {
        position: 'absolute'
      },
      ['[aria-sort="ascending"] &, [aria-sort="descending"] &']: {
        opacity: 1
      },
      ['[aria-sort="descending"] &']: {
        transform: 'rotate(180deg)'
      }
    }),
    children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
      src: arrowUpIcon.arrowUpIcon
    })
  });
};

// ============================================================================
// HOOKS
// ============================================================================

// Table root
// ----------------------------------------------------------------------------

function useTableStyleProps(props) {
  let {
    density,
    overflowMode,
    prominence
  } = props;
  let styleProps = style.useStyleProps(props);
  return {
    ...style.toDataAttributes({
      density,
      overflowMode,
      prominence
    }),
    className: style.classNames(tableViewClassList.element('root'), styleProps.className, style.css({
      display: 'flex',
      flexDirection: 'column',
      isolation: 'isolate',
      minHeight: 0,
      minWidth: 0,
      outline: 'none',
      position: 'relative',
      userSelect: 'none'
    })),
    style: styleProps.style
  };
}

// Row group (head/body/foot)
// ----------------------------------------------------------------------------

function useHeaderWrapperStyleProps({
  style: style$1
} = {}) {
  return {
    className: style.css({
      overflow: 'hidden',
      position: 'relative',
      boxSizing: 'content-box',
      flex: 'none',
      // keep aligned with the border of the body
      [`${tableViewClassList.selector('root')}:not([data-prominence="low"]) &`]: {
        borderLeft: `${style.tokenSchema.size.border.regular} solid transparent`,
        borderRight: `${style.tokenSchema.size.border.regular} solid transparent`
      }
    }),
    style: style$1
  };
}
function useHeadStyleProps({
  style: style$1
} = {}) {
  return {
    className: style.css({
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }),
    style: style$1
  };
}
function useBodyStyleProps({
  style: style$1
} = {}) {
  return {
    className: style.css({
      [`${tableViewClassList.selector('root')}[data-prominence="low"] &`]: {
        borderBlock: `${style.tokenSchema.size.border.regular} solid ${style.tokenSchema.color.border.muted}`
      },
      [`${tableViewClassList.selector('root')}:not([data-prominence="low"]) &`]: {
        backgroundColor: style.tokenSchema.color.background.canvas,
        border: `${style.tokenSchema.size.border.regular} solid ${style.tokenSchema.color.border.muted}`,
        borderRadius: style.tokenSchema.size.radius.medium,
        /* Fix scrollbars on iOS with sticky row headers */
        transform: 'translate3d(0, 0, 0)'
      }
    }),
    style: style$1
  };
}

// Cell common
// ----------------------------------------------------------------------------

const commonCellStyles = {
  // borderBottom: `${tokenSchema.size.border.regular} solid ${tokenSchema.color.border.neutral}`,
  boxSizing: 'border-box',
  cursor: 'default',
  display: 'flex',
  height: '100%',
  justifyContent: 'flex-start',
  minWidth: 0,
  outline: 0,
  paddingInline: style.tokenSchema.size.space.medium,
  position: 'relative',
  // Density
  paddingBlock: style.tokenSchema.size.space.medium,
  [`${tableViewClassList.selector('root')}[data-density="compact"] &:not([role="columnheader"])`]: {
    paddingBlock: style.tokenSchema.size.space.regular
  },
  [`${tableViewClassList.selector('root')}[data-density="spacious"] &:not([role="columnheader"])`]: {
    paddingBlock: style.tokenSchema.size.space.large
  },
  // wrapping text shouldn't be centered
  alignItems: 'center',
  [`${tableViewClassList.selector('root')}[data-overflow-mode="wrap"] &:not([role="columnheader"])`]: {
    alignItems: 'start'
  }
};
function useCellStyleProps(props, state) {
  const className = style.classNames(tableViewClassList.element('cell'), style.css([commonCellStyles, {
    // Alignment
    '&[data-align="end"]': {
      justifyContent: 'flex-end',
      textAlign: 'end'
    },
    '&[data-align="center"]': {
      justifyContent: 'center',
      textAlign: 'center'
    },
    // focus ring
    '&[data-focus="visible"]::after': {
      borderRadius: style.tokenSchema.size.radius.small,
      boxShadow: `inset 0 0 0 ${style.tokenSchema.size.alias.focusRing} ${style.tokenSchema.color.alias.focusRing}`,
      content: '""',
      inset: 0,
      position: 'absolute',
      transition: style.transition(['box-shadow', 'margin'], {
        easing: 'easeOut'
      })
    },
    // HEADERS
    '&[role="columnheader"]': {
      color: style.tokenSchema.color.foreground.neutralSecondary,
      ['&[aria-sort]']: {
        cursor: 'default',
        '&:hover, &[data-focus="visible"]': {
          color: style.tokenSchema.color.foreground.neutralEmphasis
        }
      }
    }
  }]));
  return {
    ...style.toDataAttributes({
      focus: state !== null && state !== void 0 && state.isFocusVisible ? 'visible' : undefined,
      align: props === null || props === void 0 ? void 0 : props.align
    }),
    className
    // style: getStyleFromColumn(props),
  };
}

function useSelectionCellStyleProps() {
  return {
    className: style.classNames(tableViewClassList.element('cell'), style.css(commonCellStyles, {
      alignItems: 'center',
      flex: '0 0 auto',
      paddingInlineStart: style.tokenSchema.size.space.medium,
      width: 'auto'
    }))
  };
}

// Row body
// ----------------------------------------------------------------------------

function useRowStyleProps(props, state) {
  let {
    style: style$1
  } = props;
  let calculatedRadius = `calc(${style.tokenSchema.size.radius.medium} - ${style.tokenSchema.size.border.regular})`;
  const className = style.css({
    boxSizing: 'border-box',
    display: 'flex',
    position: 'relative',
    outline: 0,
    // separators
    '&:not(:last-child)': {
      backgroundColor: style.tokenSchema.color.border.muted,
      paddingBottom: 1
    },
    // prominence
    [`${tableViewClassList.selector('root')}:not([data-prominence="low"]) &`]: {
      '&:first-child': {
        borderStartStartRadius: calculatedRadius,
        borderStartEndRadius: calculatedRadius
      },
      '&:last-child': {
        borderEndStartRadius: calculatedRadius,
        borderEndEndRadius: calculatedRadius
      }
    },
    // focus indicator
    '&[data-focus="visible"]': {
      '&::before': {
        backgroundColor: style.tokenSchema.color.background.accentEmphasis,
        borderRadius: style.tokenSchema.size.space.small,
        content: '""',
        insetInlineStart: style.tokenSchema.size.space.xsmall,
        marginBlock: style.tokenSchema.size.space.xsmall,
        marginInlineEnd: `calc(${style.tokenSchema.size.space.small} * -1)`,
        position: 'sticky',
        width: style.tokenSchema.size.space.small,
        zIndex: 4
      }
    },
    // interactions
    [`&[data-interaction="hover"] ${tableViewClassList.selector('cell')}`]: {
      backgroundColor: style.tokenSchema.color.scale.slate2
    },
    [`&[data-interaction="press"] ${tableViewClassList.selector('cell')}`]: {
      backgroundColor: style.tokenSchema.color.scale.slate3
      // backgroundColor: tokenSchema.color.alias.backgroundPressed,
    },

    // selected
    [`&[aria-selected="true"] ${tableViewClassList.selector('cell')}`]: {
      backgroundColor: style.tokenSchema.color.alias.backgroundSelected
    },
    [`&[aria-selected="true"][data-interaction="hover"] ${tableViewClassList.selector('cell')}`]: {
      backgroundColor: style.tokenSchema.color.alias.backgroundSelectedHovered
    }
  });
  return {
    ...style.toDataAttributes({
      focus: state.isFocusVisible ? 'visible' : state.isFocusWithin ? 'within' : undefined,
      interaction: state.isPressed ? 'press' : state.isHovered ? 'hover' : undefined
    }),
    className: style.classNames(tableViewClassList.element('row'), className),
    style: style$1
  };
}

// Row header
// ----------------------------------------------------------------------------

function useRowHeaderStyleProps({
  style: style$1
}) {
  const className = style.css({
    display: 'flex'
  });
  return {
    className,
    style: style$1
  };
}

// Constants

const DEFAULT_HEADER_HEIGHT = 34;
const DEFAULT_HIDE_HEADER_CELL_WIDTH = 34;
const SELECTION_CELL_DEFAULT_WIDTH = 34;
const ROW_HEIGHTS = {
  compact: 26,
  regular: 34,
  spacious: 42
};

// Context

// @ts-ignore FIXME: generics in context?
const TableContext = /*#__PURE__*/React.createContext(null);
function useTableContext() {
  return React.useContext(TableContext);
}

// Main

function TableView(props) {
  let domRef = React.useRef(null);
  let headerRef = React.useRef(null);
  let bodyRef = React.useRef(null);
  let {
    direction
  } = i18n.useLocale();
  let stringFormatter = i18n.useLocalizedStringFormatter(localizedMessages);
  let {
    density = 'regular',
    overflowMode
  } = props;

  // Renderers

  // This overrides collection view's renderWrapper to support DOM hierarchy.
  let renderWrapper = (parent, reusableView, children, renderChildren) => {
    let style$1 = virtualizer$1.layoutInfoToStyle(reusableView.layoutInfo, direction, parent && parent.layoutInfo);
    if (style$1.overflow === 'hidden') {
      style$1.overflow = 'visible'; // needed to support position: sticky
    }

    if (reusableView.viewType === 'rowgroup') {
      return /*#__PURE__*/jsxRuntime.jsx(TableBody, {
        style: style$1,
        children: renderChildren(children)
      }, reusableView.key);
    }
    if (reusableView.viewType === 'header') {
      return /*#__PURE__*/jsxRuntime.jsx(TableHead, {
        style: style$1,
        children: renderChildren(children)
      }, reusableView.key);
    }
    if (reusableView.viewType === 'row') {
      return /*#__PURE__*/jsxRuntime.jsx(TableRow, {
        item: reusableView.content,
        style: style$1,
        hasAction: !!props.onRowAction,
        children: renderChildren(children)
      }, reusableView.key);
    }
    if (reusableView.viewType === 'headerrow') {
      return /*#__PURE__*/jsxRuntime.jsx(TableHeaderRow, {
        style: style$1,
        item: reusableView.content,
        children: renderChildren(children)
      }, reusableView.key);
    }
    return /*#__PURE__*/jsxRuntime.jsx(virtualizer$1.VirtualizerItem, {
      layoutInfo: reusableView.layoutInfo,
      virtualizer: reusableView.virtualizer,
      parent: parent === null || parent === void 0 ? void 0 : parent.layoutInfo,
      className: style.classNames(tableViewClassList.element('cell-wrapper'), style.css({
        backgroundColor: style.tokenSchema.color.background.canvas
      })),
      children: reusableView.rendered
    }, reusableView.key);
  };
  let renderView = (type, item) => {
    var _item$index, _item$colspan;
    switch (type) {
      case 'header':
      case 'rowgroup':
      case 'section':
      case 'row':
      case 'headerrow':
        return null;
      case 'cell':
        {
          if (item.props.isSelectionCell) {
            return /*#__PURE__*/jsxRuntime.jsx(TableCheckboxCell, {
              cell: item
            });
          }
          return /*#__PURE__*/jsxRuntime.jsx(TableCell, {
            cell: item,
            overflowMode: overflowMode
          });
        }
      case 'placeholder':
        return /*#__PURE__*/jsxRuntime.jsx("div", {
          role: "gridcell",
          "aria-colindex": ((_item$index = item.index) !== null && _item$index !== void 0 ? _item$index : 0) + 1,
          "aria-colspan": ((_item$colspan = item.colspan) !== null && _item$colspan !== void 0 ? _item$colspan : 0) > 1 ? item.colspan : undefined
        });
      case 'column':
        if (item.props.isSelectionCell) {
          return /*#__PURE__*/jsxRuntime.jsx(TableSelectAllCell, {
            column: item
          });
        }
        if (item.props.hideHeader) {
          return /*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
            placement: "top",
            trigger: "focus",
            children: [/*#__PURE__*/jsxRuntime.jsx(TableColumnHeader, {
              column: item
            }), /*#__PURE__*/jsxRuntime.jsx(tooltip.Tooltip, {
              children: item.rendered
            })]
          });
        }
        return /*#__PURE__*/jsxRuntime.jsx(TableColumnHeader, {
          column: item
        });
      case 'loader':
        return /*#__PURE__*/jsxRuntime.jsx(CenteredWrapper, {
          children: /*#__PURE__*/jsxRuntime.jsx(progress.ProgressCircle, {
            isIndeterminate: true,
            "aria-label": state.collection.size > 0 ? stringFormatter.format('loadingMore') : stringFormatter.format('loading')
          })
        });
      case 'empty':
        {
          let emptyState = props.renderEmptyState ? props.renderEmptyState() : null;
          if (emptyState == null) {
            return null;
          }
          return /*#__PURE__*/jsxRuntime.jsx(CenteredWrapper, {
            children: emptyState
          });
        }
    }
  };
  let state = table.useTableState({
    ...props,
    showSelectionCheckboxes: props.selectionMode === 'multiple'
  });
  const getDefaultWidth = React.useCallback(({
    props: {
      hideHeader,
      isSelectionCell
    }
  }) => {
    if (hideHeader) {
      return DEFAULT_HIDE_HEADER_CELL_WIDTH;
    } else if (isSelectionCell) {
      return SELECTION_CELL_DEFAULT_WIDTH;
    }
  }, []);
  const getDefaultMinWidth = React.useCallback(({
    props: {
      hideHeader,
      isSelectionCell
    }
  }) => {
    if (hideHeader) {
      return DEFAULT_HIDE_HEADER_CELL_WIDTH;
    } else if (isSelectionCell) {
      return SELECTION_CELL_DEFAULT_WIDTH;
    }
    return 75;
  }, []);
  let columnLayout = React.useMemo(() => new table.TableColumnLayout({
    getDefaultWidth,
    getDefaultMinWidth
  }), [getDefaultWidth, getDefaultMinWidth]);
  let tableLayout = React.useMemo(() => new layout.TableLayout({
    // If props.rowHeight is auto, then use estimated heights, otherwise use fixed heights.
    rowHeight: overflowMode === 'wrap' ? undefined : ROW_HEIGHTS[density],
    estimatedRowHeight: overflowMode === 'wrap' ? ROW_HEIGHTS[density] : undefined,
    headingHeight: overflowMode === 'wrap' ? undefined : DEFAULT_HEADER_HEIGHT,
    estimatedHeadingHeight: overflowMode === 'wrap' ? DEFAULT_HEADER_HEIGHT : undefined,
    columnLayout,
    initialCollection: state.collection
  }),
  // don't recompute when state.collection changes, only used for initial value
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [overflowMode, density, columnLayout]);

  // Use a proxy so that a new object is created for each render so that alternate instances aren't affected by mutation.
  // This can be thought of as equivalent to `{…tableLayout, tableState: state}`, but works with classes as well.
  let layout$1 = React.useMemo(() => {
    let proxy = new Proxy(tableLayout, {
      get(target, prop, receiver) {
        return prop === 'tableState' ? state : Reflect.get(target, prop, receiver);
      }
    });
    return proxy;
  }, [state, tableLayout]);
  let {
    gridProps
  } = table$1.useTable({
    ...props,
    isVirtualized: true,
    layout: layout$1
  }, state, domRef);
  const isEmpty = state.collection.size === 0;
  return /*#__PURE__*/jsxRuntime.jsx(TableContext.Provider, {
    value: {
      isEmpty,
      layout: layout$1,
      state
    },
    children: /*#__PURE__*/jsxRuntime.jsx(TableVirtualizer, {
      layout: layout$1,
      collection: state.collection,
      renderView: renderView,
      renderWrapper: renderWrapper,
      bodyRef: bodyRef,
      domRef: domRef,
      headerRef: headerRef,
      ...gridProps,
      ...props
    })
  });
}
function TableVirtualizer(props) {
  var _layout$getLayoutInfo;
  let {
    layout,
    collection,
    // focusedKey,
    renderView,
    renderWrapper,
    domRef,
    bodyRef,
    headerRef,
    disallowEmptySelection: UNUSED_disallowEmptySelection,
    onRowAction: UNUSED_onRowAction,
    onSelectionChange: UNUSED_onSelectionChange,
    onSortChange: UNUSED_onSortChange,
    overflowMode: UNUSED_overflowMode,
    renderEmptyState: UNUSED_renderEmptyState,
    selectedKeys: UNUSED_selectedKeys,
    sortDescriptor: UNUSED_sortDescriptor,
    selectionMode,
    ...otherProps
  } = props;
  let {
    direction
  } = i18n.useLocale();
  let loadingState = collection.body.props.loadingState;
  let isLoading = loadingState === 'loading' || loadingState === 'loadingMore';
  let onLoadMore = collection.body.props.onLoadMore;
  let virtualizerState = virtualizer.useVirtualizerState({
    layout,
    collection,
    renderView,
    renderWrapper,
    onVisibleRectChange(rect) {
      let bodyEl = bodyRef.current;
      if (bodyEl) {
        bodyEl.scrollTop = rect.y;
        virtualizer$1.setScrollLeft(bodyEl, direction, rect.x);
      }
    }
  });
  let styleProps = useTableStyleProps(props);

  // Sync the scroll position from the table body to the header container.
  let syncScroll = React.useCallback(() => {
    let bodyEl = bodyRef.current;
    let headerEl = headerRef.current;
    if (bodyEl && headerEl) {
      headerEl.scrollLeft = bodyEl.scrollLeft;
    }
  }, [bodyRef, headerRef]);
  let scrollToItem = React.useCallback(key => {
    let item = collection.getItem(key);
    let column = collection.columns[0];
    let virtualizer = virtualizerState.virtualizer;
    virtualizer.scrollToItem(key, {
      duration: 0,
      // Prevent scrolling to the top when clicking on column headers.
      shouldScrollY: (item === null || item === void 0 ? void 0 : item.type) !== 'column',
      // Offset scroll position by width of selection cell
      // (which is sticky and will overlap the cell we're scrolling to).
      offsetX: column.props.isSelectionCell || column.props.isDragButtonCell ? layout.getColumnWidth(column.key) : 0
    });

    // Sync the scroll positions of the column headers and the body so scrollIntoViewport can
    // properly decide if the column is outside the viewport or not
    syncScroll();
  }, [collection, layout, syncScroll, virtualizerState.virtualizer]);
  let memoedVirtualizerProps = React.useMemo(() => ({
    scrollToItem,
    isLoading,
    onLoadMore
  }), [scrollToItem, isLoading, onLoadMore]);
  let {
    virtualizerProps,
    scrollViewProps
  } = virtualizer$1.useVirtualizer(memoedVirtualizerProps, virtualizerState, domRef);
  let mergedProps = utils.mergeProps(otherProps, virtualizerProps);
  const [headerView, bodyView] = virtualizerState.visibleViews;
  let headerHeight = ((_layout$getLayoutInfo = layout.getLayoutInfo('header')) === null || _layout$getLayoutInfo === void 0 ? void 0 : _layout$getLayoutInfo.rect.height) || 0;
  let bodyStyleProps = useBodyStyleProps({
    style: {
      flex: 1
    }
  });
  return /*#__PURE__*/jsxRuntime.jsx(focus.FocusScope, {
    children: /*#__PURE__*/jsxRuntime.jsxs("div", {
      ...mergedProps,
      ...styleProps,
      ref: domRef,
      children: [/*#__PURE__*/jsxRuntime.jsx(TableHeaderWrapper, {
        ref: headerRef,
        style: {
          height: headerHeight,
          willChange: virtualizerState.isScrolling ? 'scroll-position' : undefined
        },
        children: headerView
      }), /*#__PURE__*/jsxRuntime.jsx(virtualizer$1.ScrollView, {
        ...scrollViewProps,
        ...bodyStyleProps,
        role: "presentation",
        innerStyle: {
          overflow: 'visible'
        },
        ref: bodyRef,
        contentSize: virtualizerState.contentSize,
        onScrollStart: virtualizerState.startScrolling,
        onScrollEnd: virtualizerState.endScrolling,
        onScroll: syncScroll,
        children: bodyView
      })]
    })
  });
}

// Styled components
// ------------------------------

function TableHead({
  children,
  style
}) {
  let {
    rowGroupProps
  } = table$1.useTableRowGroup();
  let styleProps = useHeadStyleProps({
    style
  });
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...rowGroupProps,
    ...styleProps,
    children: children
  });
}
function TableBody(props) {
  let {
    rowGroupProps
  } = table$1.useTableRowGroup();
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...rowGroupProps,
    ...props
  });
}
const TableHeaderWrapper = /*#__PURE__*/React.forwardRef(function TableHeaderWrapper(props, ref) {
  let styleProps = useHeaderWrapperStyleProps(props);
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ref: ref,
    role: "presentation",
    ...styleProps,
    children: props.children
  });
});
function TableHeaderRow(props) {
  let ref = React.useRef(null);
  let {
    state
  } = useTableContext();
  let {
    rowProps
  } = table$1.useTableHeaderRow({
    node: props.item,
    isVirtualized: true
  }, state, ref);
  let styleProps = useRowHeaderStyleProps(props);
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...rowProps,
    ...styleProps,
    ref: ref,
    children: props.children
  });
}
function TableColumnHeader({
  column
}) {
  let ref = React.useRef(null);
  let {
    state
  } = useTableContext();
  let {
    columnHeaderProps
  } = table$1.useTableColumnHeader({
    node: column,
    isVirtualized: true
  }, state, ref);
  let {
    isFocusVisible,
    focusProps
  } = focus.useFocusRing();
  let columnProps = column.props;
  let cellStyleProps = useCellStyleProps(columnProps, {
    isFocusVisible
  });
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    ...utils.mergeProps(columnHeaderProps, focusProps),
    ...cellStyleProps,
    ref: ref,
    children: [columnProps.allowsSorting && columnProps.align === 'end' && /*#__PURE__*/jsxRuntime.jsx(SortIndicator, {}), columnProps.hideHeader ? /*#__PURE__*/jsxRuntime.jsx(visuallyHidden.VisuallyHidden, {
      children: column.rendered
    }) : utils$1.isReactText(column.rendered) ? /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
      color: "inherit",
      weight: "semibold",
      truncate: true,
      children: column.rendered
    }) : column.rendered, columnProps.allowsSorting && columnProps.align !== 'end' && /*#__PURE__*/jsxRuntime.jsx(SortIndicator, {})]
  });
}
function TableRow({
  children,
  hasAction,
  item,
  style
}) {
  let ref = React.useRef(null);
  let {
    state
  } = useTableContext();
  let allowsInteraction = state.selectionManager.selectionMode !== 'none' || hasAction;
  let isDisabled = !allowsInteraction || state.disabledKeys.has(item.key);
  let {
    rowProps
  } = table$1.useTableRow({
    node: item,
    isVirtualized: true
  }, state, ref);
  // The row should show the focus background style when any cell inside it is focused.
  // If the row itself is focused, then it should have a blue focus indicator on the left.
  let {
    isFocusVisible: isFocusWithin,
    focusProps: focusWithinProps
  } = focus.useFocusRing({
    within: true
  });
  let {
    isFocusVisible,
    focusProps
  } = focus.useFocusRing();
  let {
    hoverProps,
    isHovered
  } = interactions.useHover({
    isDisabled
  });
  let {
    pressProps,
    isPressed
  } = interactions.usePress({
    isDisabled
  });
  let styleProps = useRowStyleProps({
    style
  }, {
    isFocusVisible,
    isFocusWithin,
    isHovered,
    isPressed
  });
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...utils.mergeProps(rowProps, focusWithinProps, focusProps, hoverProps, pressProps),
    ...styleProps,
    ref: ref,
    children: children
  });
}
function TableCell({
  cell,
  overflowMode
}) {
  let ref = React.useRef(null);
  let {
    state
  } = useTableContext();
  let {
    gridCellProps
  } = table$1.useTableCell({
    node: cell,
    isVirtualized: true
  }, state, ref);
  let {
    isFocusVisible,
    focusProps
  } = focus.useFocusRing();
  let styleProps = useCellStyleProps(cell.column.props, {
    isFocusVisible
  });
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...utils.mergeProps(gridCellProps, focusProps),
    ...styleProps,
    ref: ref,
    children: /*#__PURE__*/jsxRuntime.jsx(slots.SlotProvider, {
      slots: {
        text: {
          truncate: overflowMode === 'truncate'
        }
      },
      children: utils$1.isReactText(cell.rendered) ? /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
        children: cell.rendered
      }) : cell.rendered
    })
  });
}
function TableCheckboxCell({
  cell
}) {
  let ref = React.useRef(null);
  let {
    state
  } = useTableContext();
  let {
    gridCellProps
  } = table$1.useTableCell({
    node: cell,
    isVirtualized: true
  }, state, ref);
  let {
    checkboxProps
  } = table$1.useTableSelectionCheckbox({
    key: cell.parentKey
  }, state);
  let styleProps = useSelectionCellStyleProps();
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...styleProps,
    ...gridCellProps,
    ref: ref,
    children: /*#__PURE__*/jsxRuntime.jsx(checkbox.Checkbox, {
      ...checkboxProps
    })
  });
}
function TableSelectAllCell({
  column
}) {
  let ref = React.useRef(null);
  let {
    state
  } = useTableContext();
  let {
    columnHeaderProps
  } = table$1.useTableColumnHeader({
    node: column,
    isVirtualized: true
  }, state, ref);
  let {
    checkboxProps
  } = table$1.useTableSelectAllCheckbox(state);
  let styleProps = useSelectionCellStyleProps();
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...styleProps,
    ...columnHeaderProps,
    ref: ref,
    children: state.selectionManager.selectionMode === 'single' ? /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
      visuallyHidden: true,
      children: checkboxProps['aria-label']
    }) : /*#__PURE__*/jsxRuntime.jsx(checkbox.Checkbox, {
      ...checkboxProps
    })
  });
}
function CenteredWrapper({
  children
}) {
  let {
    state
  } = useTableContext();
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    role: "row",
    "aria-rowindex": state.collection.headerRows.length + state.collection.size + 1,
    style: {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      width: '100%'
    },
    children: /*#__PURE__*/jsxRuntime.jsx("div", {
      role: "rowheader",
      "aria-colspan": state.collection.columns.length,
      children: children
    })
  });
}

// Override TS for Column to support Keystar UI specific props.
const VoussoirColumn = table.Column;

Object.defineProperty(exports, 'Cell', {
  enumerable: true,
  get: function () { return table.Cell; }
});
Object.defineProperty(exports, 'Row', {
  enumerable: true,
  get: function () { return table.Row; }
});
Object.defineProperty(exports, 'TableBody', {
  enumerable: true,
  get: function () { return table.TableBody; }
});
Object.defineProperty(exports, 'TableHeader', {
  enumerable: true,
  get: function () { return table.TableHeader; }
});
exports.Column = VoussoirColumn;
exports.TableView = TableView;