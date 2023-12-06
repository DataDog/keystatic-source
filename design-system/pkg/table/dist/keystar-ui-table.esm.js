'use client';
import { useTableState, TableColumnLayout, Column } from '@react-stately/table';
export { Cell, Row, TableBody, TableHeader } from '@react-stately/table';
import { useRef, useCallback, useMemo, forwardRef, createContext, useContext } from 'react';
import { FocusScope, useFocusRing } from '@react-aria/focus';
import { useLocale, useLocalizedStringFormatter } from '@react-aria/i18n';
import { useHover, usePress } from '@react-aria/interactions';
import { useTable, useTableRowGroup, useTableHeaderRow, useTableColumnHeader, useTableRow, useTableCell, useTableSelectionCheckbox, useTableSelectAllCheckbox } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { setScrollLeft, useVirtualizer, ScrollView, layoutInfoToStyle, VirtualizerItem } from '@react-aria/virtualizer';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { TableLayout } from '@react-stately/layout';
import { useVirtualizerState } from '@react-stately/virtualizer';
import { Checkbox } from '@keystar/ui/checkbox';
import { ProgressCircle } from '@keystar/ui/progress';
import { SlotProvider } from '@keystar/ui/slots';
import { ClassList, tokenSchema, useStyleProps, toDataAttributes, classNames, css, transition } from '@keystar/ui/style';
import { TooltipTrigger, Tooltip } from '@keystar/ui/tooltip';
import { Text } from '@keystar/ui/typography';
import { isReactText } from '@keystar/ui/utils';
import { arrowUpIcon } from '@keystar/ui/icon/icons/arrowUpIcon';
import { Icon } from '@keystar/ui/icon';
import { jsx, jsxs } from 'react/jsx-runtime';

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

const tableViewClassList = new ClassList('TableView', ['cell', 'cell-wrapper', 'row']);
const SortIndicator = () => {
  // fix alignment: reduce the space the icon takes up, w/o affecting the icon layout itself
  let labelHeight = tokenSchema.typography.text.regular.capheight;
  return /*#__PURE__*/jsx("span", {
    "aria-hidden": "true",
    className: css({
      alignItems: 'center',
      display: 'flex',
      flexShrink: 0,
      height: labelHeight,
      justifyContent: 'center',
      marginInline: tokenSchema.size.space.small,
      opacity: 0,
      position: 'relative',
      transition: transition(['opacity', 'transform'], {
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
    children: /*#__PURE__*/jsx(Icon, {
      src: arrowUpIcon
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
  let styleProps = useStyleProps(props);
  return {
    ...toDataAttributes({
      density,
      overflowMode,
      prominence
    }),
    className: classNames(tableViewClassList.element('root'), styleProps.className, css({
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
  style
} = {}) {
  return {
    className: css({
      overflow: 'hidden',
      position: 'relative',
      boxSizing: 'content-box',
      flex: 'none',
      // keep aligned with the border of the body
      [`${tableViewClassList.selector('root')}:not([data-prominence="low"]) &`]: {
        borderLeft: `${tokenSchema.size.border.regular} solid transparent`,
        borderRight: `${tokenSchema.size.border.regular} solid transparent`
      }
    }),
    style
  };
}
function useHeadStyleProps({
  style
} = {}) {
  return {
    className: css({
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }),
    style
  };
}
function useBodyStyleProps({
  style
} = {}) {
  return {
    className: css({
      [`${tableViewClassList.selector('root')}[data-prominence="low"] &`]: {
        borderBlock: `${tokenSchema.size.border.regular} solid ${tokenSchema.color.border.muted}`
      },
      [`${tableViewClassList.selector('root')}:not([data-prominence="low"]) &`]: {
        backgroundColor: tokenSchema.color.background.canvas,
        border: `${tokenSchema.size.border.regular} solid ${tokenSchema.color.border.muted}`,
        borderRadius: tokenSchema.size.radius.medium,
        /* Fix scrollbars on iOS with sticky row headers */
        transform: 'translate3d(0, 0, 0)'
      }
    }),
    style
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
  paddingInline: tokenSchema.size.space.medium,
  position: 'relative',
  // Density
  paddingBlock: tokenSchema.size.space.medium,
  [`${tableViewClassList.selector('root')}[data-density="compact"] &:not([role="columnheader"])`]: {
    paddingBlock: tokenSchema.size.space.regular
  },
  [`${tableViewClassList.selector('root')}[data-density="spacious"] &:not([role="columnheader"])`]: {
    paddingBlock: tokenSchema.size.space.large
  },
  // wrapping text shouldn't be centered
  alignItems: 'center',
  [`${tableViewClassList.selector('root')}[data-overflow-mode="wrap"] &:not([role="columnheader"])`]: {
    alignItems: 'start'
  }
};
function useCellStyleProps(props, state) {
  const className = classNames(tableViewClassList.element('cell'), css([commonCellStyles, {
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
      borderRadius: tokenSchema.size.radius.small,
      boxShadow: `inset 0 0 0 ${tokenSchema.size.alias.focusRing} ${tokenSchema.color.alias.focusRing}`,
      content: '""',
      inset: 0,
      position: 'absolute',
      transition: transition(['box-shadow', 'margin'], {
        easing: 'easeOut'
      })
    },
    // HEADERS
    '&[role="columnheader"]': {
      color: tokenSchema.color.foreground.neutralSecondary,
      ['&[aria-sort]']: {
        cursor: 'default',
        '&:hover, &[data-focus="visible"]': {
          color: tokenSchema.color.foreground.neutralEmphasis
        }
      }
    }
  }]));
  return {
    ...toDataAttributes({
      focus: state !== null && state !== void 0 && state.isFocusVisible ? 'visible' : undefined,
      align: props === null || props === void 0 ? void 0 : props.align
    }),
    className
    // style: getStyleFromColumn(props),
  };
}

function useSelectionCellStyleProps() {
  return {
    className: classNames(tableViewClassList.element('cell'), css(commonCellStyles, {
      alignItems: 'center',
      flex: '0 0 auto',
      paddingInlineStart: tokenSchema.size.space.medium,
      width: 'auto'
    }))
  };
}

// Row body
// ----------------------------------------------------------------------------

function useRowStyleProps(props, state) {
  let {
    style
  } = props;
  let calculatedRadius = `calc(${tokenSchema.size.radius.medium} - ${tokenSchema.size.border.regular})`;
  const className = css({
    boxSizing: 'border-box',
    display: 'flex',
    position: 'relative',
    outline: 0,
    // separators
    '&:not(:last-child)': {
      backgroundColor: tokenSchema.color.border.muted,
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
        backgroundColor: tokenSchema.color.background.accentEmphasis,
        borderRadius: tokenSchema.size.space.small,
        content: '""',
        insetInlineStart: tokenSchema.size.space.xsmall,
        marginBlock: tokenSchema.size.space.xsmall,
        marginInlineEnd: `calc(${tokenSchema.size.space.small} * -1)`,
        position: 'sticky',
        width: tokenSchema.size.space.small,
        zIndex: 4
      }
    },
    // interactions
    [`&[data-interaction="hover"] ${tableViewClassList.selector('cell')}`]: {
      backgroundColor: tokenSchema.color.scale.slate2
    },
    [`&[data-interaction="press"] ${tableViewClassList.selector('cell')}`]: {
      backgroundColor: tokenSchema.color.scale.slate3
      // backgroundColor: tokenSchema.color.alias.backgroundPressed,
    },

    // selected
    [`&[aria-selected="true"] ${tableViewClassList.selector('cell')}`]: {
      backgroundColor: tokenSchema.color.alias.backgroundSelected
    },
    [`&[aria-selected="true"][data-interaction="hover"] ${tableViewClassList.selector('cell')}`]: {
      backgroundColor: tokenSchema.color.alias.backgroundSelectedHovered
    }
  });
  return {
    ...toDataAttributes({
      focus: state.isFocusVisible ? 'visible' : state.isFocusWithin ? 'within' : undefined,
      interaction: state.isPressed ? 'press' : state.isHovered ? 'hover' : undefined
    }),
    className: classNames(tableViewClassList.element('row'), className),
    style
  };
}

// Row header
// ----------------------------------------------------------------------------

function useRowHeaderStyleProps({
  style
}) {
  const className = css({
    display: 'flex'
  });
  return {
    className,
    style
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
const TableContext = /*#__PURE__*/createContext(null);
function useTableContext() {
  return useContext(TableContext);
}

// Main

function TableView(props) {
  let domRef = useRef(null);
  let headerRef = useRef(null);
  let bodyRef = useRef(null);
  let {
    direction
  } = useLocale();
  let stringFormatter = useLocalizedStringFormatter(localizedMessages);
  let {
    density = 'regular',
    overflowMode
  } = props;

  // Renderers

  // This overrides collection view's renderWrapper to support DOM hierarchy.
  let renderWrapper = (parent, reusableView, children, renderChildren) => {
    let style = layoutInfoToStyle(reusableView.layoutInfo, direction, parent && parent.layoutInfo);
    if (style.overflow === 'hidden') {
      style.overflow = 'visible'; // needed to support position: sticky
    }

    if (reusableView.viewType === 'rowgroup') {
      return /*#__PURE__*/jsx(TableBody, {
        style: style,
        children: renderChildren(children)
      }, reusableView.key);
    }
    if (reusableView.viewType === 'header') {
      return /*#__PURE__*/jsx(TableHead, {
        style: style,
        children: renderChildren(children)
      }, reusableView.key);
    }
    if (reusableView.viewType === 'row') {
      return /*#__PURE__*/jsx(TableRow, {
        item: reusableView.content,
        style: style,
        hasAction: !!props.onRowAction,
        children: renderChildren(children)
      }, reusableView.key);
    }
    if (reusableView.viewType === 'headerrow') {
      return /*#__PURE__*/jsx(TableHeaderRow, {
        style: style,
        item: reusableView.content,
        children: renderChildren(children)
      }, reusableView.key);
    }
    return /*#__PURE__*/jsx(VirtualizerItem, {
      layoutInfo: reusableView.layoutInfo,
      virtualizer: reusableView.virtualizer,
      parent: parent === null || parent === void 0 ? void 0 : parent.layoutInfo,
      className: classNames(tableViewClassList.element('cell-wrapper'), css({
        backgroundColor: tokenSchema.color.background.canvas
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
            return /*#__PURE__*/jsx(TableCheckboxCell, {
              cell: item
            });
          }
          return /*#__PURE__*/jsx(TableCell, {
            cell: item,
            overflowMode: overflowMode
          });
        }
      case 'placeholder':
        return /*#__PURE__*/jsx("div", {
          role: "gridcell",
          "aria-colindex": ((_item$index = item.index) !== null && _item$index !== void 0 ? _item$index : 0) + 1,
          "aria-colspan": ((_item$colspan = item.colspan) !== null && _item$colspan !== void 0 ? _item$colspan : 0) > 1 ? item.colspan : undefined
        });
      case 'column':
        if (item.props.isSelectionCell) {
          return /*#__PURE__*/jsx(TableSelectAllCell, {
            column: item
          });
        }
        if (item.props.hideHeader) {
          return /*#__PURE__*/jsxs(TooltipTrigger, {
            placement: "top",
            trigger: "focus",
            children: [/*#__PURE__*/jsx(TableColumnHeader, {
              column: item
            }), /*#__PURE__*/jsx(Tooltip, {
              children: item.rendered
            })]
          });
        }
        return /*#__PURE__*/jsx(TableColumnHeader, {
          column: item
        });
      case 'loader':
        return /*#__PURE__*/jsx(CenteredWrapper, {
          children: /*#__PURE__*/jsx(ProgressCircle, {
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
          return /*#__PURE__*/jsx(CenteredWrapper, {
            children: emptyState
          });
        }
    }
  };
  let state = useTableState({
    ...props,
    showSelectionCheckboxes: props.selectionMode === 'multiple'
  });
  const getDefaultWidth = useCallback(({
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
  const getDefaultMinWidth = useCallback(({
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
  let columnLayout = useMemo(() => new TableColumnLayout({
    getDefaultWidth,
    getDefaultMinWidth
  }), [getDefaultWidth, getDefaultMinWidth]);
  let tableLayout = useMemo(() => new TableLayout({
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
  let layout = useMemo(() => {
    let proxy = new Proxy(tableLayout, {
      get(target, prop, receiver) {
        return prop === 'tableState' ? state : Reflect.get(target, prop, receiver);
      }
    });
    return proxy;
  }, [state, tableLayout]);
  let {
    gridProps
  } = useTable({
    ...props,
    isVirtualized: true,
    layout
  }, state, domRef);
  const isEmpty = state.collection.size === 0;
  return /*#__PURE__*/jsx(TableContext.Provider, {
    value: {
      isEmpty,
      layout,
      state
    },
    children: /*#__PURE__*/jsx(TableVirtualizer, {
      layout: layout,
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
  } = useLocale();
  let loadingState = collection.body.props.loadingState;
  let isLoading = loadingState === 'loading' || loadingState === 'loadingMore';
  let onLoadMore = collection.body.props.onLoadMore;
  let virtualizerState = useVirtualizerState({
    layout,
    collection,
    renderView,
    renderWrapper,
    onVisibleRectChange(rect) {
      let bodyEl = bodyRef.current;
      if (bodyEl) {
        bodyEl.scrollTop = rect.y;
        setScrollLeft(bodyEl, direction, rect.x);
      }
    }
  });
  let styleProps = useTableStyleProps(props);

  // Sync the scroll position from the table body to the header container.
  let syncScroll = useCallback(() => {
    let bodyEl = bodyRef.current;
    let headerEl = headerRef.current;
    if (bodyEl && headerEl) {
      headerEl.scrollLeft = bodyEl.scrollLeft;
    }
  }, [bodyRef, headerRef]);
  let scrollToItem = useCallback(key => {
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
  let memoedVirtualizerProps = useMemo(() => ({
    scrollToItem,
    isLoading,
    onLoadMore
  }), [scrollToItem, isLoading, onLoadMore]);
  let {
    virtualizerProps,
    scrollViewProps
  } = useVirtualizer(memoedVirtualizerProps, virtualizerState, domRef);
  let mergedProps = mergeProps(otherProps, virtualizerProps);
  const [headerView, bodyView] = virtualizerState.visibleViews;
  let headerHeight = ((_layout$getLayoutInfo = layout.getLayoutInfo('header')) === null || _layout$getLayoutInfo === void 0 ? void 0 : _layout$getLayoutInfo.rect.height) || 0;
  let bodyStyleProps = useBodyStyleProps({
    style: {
      flex: 1
    }
  });
  return /*#__PURE__*/jsx(FocusScope, {
    children: /*#__PURE__*/jsxs("div", {
      ...mergedProps,
      ...styleProps,
      ref: domRef,
      children: [/*#__PURE__*/jsx(TableHeaderWrapper, {
        ref: headerRef,
        style: {
          height: headerHeight,
          willChange: virtualizerState.isScrolling ? 'scroll-position' : undefined
        },
        children: headerView
      }), /*#__PURE__*/jsx(ScrollView, {
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
  } = useTableRowGroup();
  let styleProps = useHeadStyleProps({
    style
  });
  return /*#__PURE__*/jsx("div", {
    ...rowGroupProps,
    ...styleProps,
    children: children
  });
}
function TableBody(props) {
  let {
    rowGroupProps
  } = useTableRowGroup();
  return /*#__PURE__*/jsx("div", {
    ...rowGroupProps,
    ...props
  });
}
const TableHeaderWrapper = /*#__PURE__*/forwardRef(function TableHeaderWrapper(props, ref) {
  let styleProps = useHeaderWrapperStyleProps(props);
  return /*#__PURE__*/jsx("div", {
    ref: ref,
    role: "presentation",
    ...styleProps,
    children: props.children
  });
});
function TableHeaderRow(props) {
  let ref = useRef(null);
  let {
    state
  } = useTableContext();
  let {
    rowProps
  } = useTableHeaderRow({
    node: props.item,
    isVirtualized: true
  }, state, ref);
  let styleProps = useRowHeaderStyleProps(props);
  return /*#__PURE__*/jsx("div", {
    ...rowProps,
    ...styleProps,
    ref: ref,
    children: props.children
  });
}
function TableColumnHeader({
  column
}) {
  let ref = useRef(null);
  let {
    state
  } = useTableContext();
  let {
    columnHeaderProps
  } = useTableColumnHeader({
    node: column,
    isVirtualized: true
  }, state, ref);
  let {
    isFocusVisible,
    focusProps
  } = useFocusRing();
  let columnProps = column.props;
  let cellStyleProps = useCellStyleProps(columnProps, {
    isFocusVisible
  });
  return /*#__PURE__*/jsxs("div", {
    ...mergeProps(columnHeaderProps, focusProps),
    ...cellStyleProps,
    ref: ref,
    children: [columnProps.allowsSorting && columnProps.align === 'end' && /*#__PURE__*/jsx(SortIndicator, {}), columnProps.hideHeader ? /*#__PURE__*/jsx(VisuallyHidden, {
      children: column.rendered
    }) : isReactText(column.rendered) ? /*#__PURE__*/jsx(Text, {
      color: "inherit",
      weight: "semibold",
      truncate: true,
      children: column.rendered
    }) : column.rendered, columnProps.allowsSorting && columnProps.align !== 'end' && /*#__PURE__*/jsx(SortIndicator, {})]
  });
}
function TableRow({
  children,
  hasAction,
  item,
  style
}) {
  let ref = useRef(null);
  let {
    state
  } = useTableContext();
  let allowsInteraction = state.selectionManager.selectionMode !== 'none' || hasAction;
  let isDisabled = !allowsInteraction || state.disabledKeys.has(item.key);
  let {
    rowProps
  } = useTableRow({
    node: item,
    isVirtualized: true
  }, state, ref);
  // The row should show the focus background style when any cell inside it is focused.
  // If the row itself is focused, then it should have a blue focus indicator on the left.
  let {
    isFocusVisible: isFocusWithin,
    focusProps: focusWithinProps
  } = useFocusRing({
    within: true
  });
  let {
    isFocusVisible,
    focusProps
  } = useFocusRing();
  let {
    hoverProps,
    isHovered
  } = useHover({
    isDisabled
  });
  let {
    pressProps,
    isPressed
  } = usePress({
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
  return /*#__PURE__*/jsx("div", {
    ...mergeProps(rowProps, focusWithinProps, focusProps, hoverProps, pressProps),
    ...styleProps,
    ref: ref,
    children: children
  });
}
function TableCell({
  cell,
  overflowMode
}) {
  let ref = useRef(null);
  let {
    state
  } = useTableContext();
  let {
    gridCellProps
  } = useTableCell({
    node: cell,
    isVirtualized: true
  }, state, ref);
  let {
    isFocusVisible,
    focusProps
  } = useFocusRing();
  let styleProps = useCellStyleProps(cell.column.props, {
    isFocusVisible
  });
  return /*#__PURE__*/jsx("div", {
    ...mergeProps(gridCellProps, focusProps),
    ...styleProps,
    ref: ref,
    children: /*#__PURE__*/jsx(SlotProvider, {
      slots: {
        text: {
          truncate: overflowMode === 'truncate'
        }
      },
      children: isReactText(cell.rendered) ? /*#__PURE__*/jsx(Text, {
        children: cell.rendered
      }) : cell.rendered
    })
  });
}
function TableCheckboxCell({
  cell
}) {
  let ref = useRef(null);
  let {
    state
  } = useTableContext();
  let {
    gridCellProps
  } = useTableCell({
    node: cell,
    isVirtualized: true
  }, state, ref);
  let {
    checkboxProps
  } = useTableSelectionCheckbox({
    key: cell.parentKey
  }, state);
  let styleProps = useSelectionCellStyleProps();
  return /*#__PURE__*/jsx("div", {
    ...styleProps,
    ...gridCellProps,
    ref: ref,
    children: /*#__PURE__*/jsx(Checkbox, {
      ...checkboxProps
    })
  });
}
function TableSelectAllCell({
  column
}) {
  let ref = useRef(null);
  let {
    state
  } = useTableContext();
  let {
    columnHeaderProps
  } = useTableColumnHeader({
    node: column,
    isVirtualized: true
  }, state, ref);
  let {
    checkboxProps
  } = useTableSelectAllCheckbox(state);
  let styleProps = useSelectionCellStyleProps();
  return /*#__PURE__*/jsx("div", {
    ...styleProps,
    ...columnHeaderProps,
    ref: ref,
    children: state.selectionManager.selectionMode === 'single' ? /*#__PURE__*/jsx(Text, {
      visuallyHidden: true,
      children: checkboxProps['aria-label']
    }) : /*#__PURE__*/jsx(Checkbox, {
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
  return /*#__PURE__*/jsx("div", {
    role: "row",
    "aria-rowindex": state.collection.headerRows.length + state.collection.size + 1,
    style: {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      width: '100%'
    },
    children: /*#__PURE__*/jsx("div", {
      role: "rowheader",
      "aria-colspan": state.collection.columns.length,
      children: children
    })
  });
}

// Override TS for Column to support Keystar UI specific props.
const VoussoirColumn = Column;

export { VoussoirColumn as Column, TableView };