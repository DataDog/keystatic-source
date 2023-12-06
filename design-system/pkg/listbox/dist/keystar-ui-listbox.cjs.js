'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var collections = require('@react-stately/collections');
var icon = require('@keystar/ui/icon');
var checkIcon = require('@keystar/ui/icon/icons/checkIcon');
var slots = require('@keystar/ui/slots');
var style = require('@keystar/ui/style');
var ts = require('@keystar/ui/utils/ts');
var jsxRuntime = require('react/jsx-runtime');
var list = require('@react-stately/list');
var utils$1 = require('@react-aria/utils');
var React = require('react');
var focus = require('@react-aria/focus');
var listbox = require('@react-aria/listbox');
var i18n = require('@react-aria/i18n');
var virtualizer = require('@react-aria/virtualizer');
var layout$1 = require('@react-stately/layout');
var core = require('@keystar/ui/core');
var progress = require('@keystar/ui/progress');
var emery = require('emery');
var interactions = require('@react-aria/interactions');
var typography = require('@keystar/ui/typography');
var utils = require('@keystar/ui/utils');
var layout = require('@keystar/ui/layout');

// TODO: the styling is a mess. I need to clean it up.
/** Common list item component for menus and pickers. */
const ListItem = ts.forwardRefWithAs(function ListItem(props, forwardedRef) {
  let {
    children,
    elementType: ElementType = 'div',
    descriptionProps,
    keyboardShortcutProps,
    labelProps,
    isFocused,
    isHovered,
    isPressed,
    isSelected,
    ...otherProps
  } = props;
  let gridGutter = style.tokenSchema.size.space.regular;
  let contentGutter = style.tokenSchema.size.space.medium;
  let focusIndicatorWidth = style.tokenSchema.size.space.xsmall;
  let gridClassname = style.css({
    display: 'grid',
    // listboxes (options) have selection indicators at the end, whilst menus have them at the start
    gridTemplateAreas: '". icon text . kbd checkmark ." ". icon description . kbd checkmark ."',
    gridTemplateColumns: `${gridGutter} auto 1fr ${contentGutter} auto ${style.tokenSchema.size.icon.regular} ${gridGutter}`,
    gridTemplateRows: '1fr auto',
    borderRadius: style.tokenSchema.size.radius.small,
    paddingBlock: style.tokenSchema.size.space.regular
  });
  let rootClassname = style.css({
    cursor: 'default',
    color: style.tokenSchema.color.alias.foregroundIdle,
    display: 'block',
    outline: 0,
    position: 'relative',
    paddingInline: style.tokenSchema.size.space.small,
    // indicate when external link? e.g. `&[href^=http]`
    'a&': {
      cursor: 'pointer'
    },
    '& .list-item-text': {
      marginBlock: `calc((${style.tokenSchema.size.icon.regular} - ${style.tokenSchema.typography.text.regular.capheight}) / 2)`
    },
    [`&:not([aria-disabled=true])`]: {
      '& .list-item-checkmark': {
        stroke: style.tokenSchema.color.alias.foregroundSelected
      },
      '& .list-item-text': {
        color: style.tokenSchema.color.foreground.neutralEmphasis
      },
      '& .list-item-icon': {
        color: style.tokenSchema.color.foreground.neutralSecondary
      }
    },
    // standard menu items: no selection indicator
    [`&[role=menuitem] .${gridClassname}`]: {
      gridTemplateAreas: '". icon text . kbd ." ". icon description . kbd ."',
      gridTemplateColumns: `${gridGutter} auto 1fr ${contentGutter} auto ${gridGutter}`
    },
    [[
    // selectable menu items: selection indicator at the start
    `&[role=menuitemcheckbox] .${gridClassname}, &[role=menuitemradio] .${gridClassname}`,
    // menus with _any_ selectable items must make space for the selection indicator
    `[data-selection=single] &[role=menuitem] .${gridClassname}, [data-selection=multiple] &[role=menuitem] .${gridClassname}`].join(', ')]: {
      gridTemplateAreas: '". checkmark icon text . kbd ." ". checkmark icon description . kbd ."',
      gridTemplateColumns: `${style.tokenSchema.size.space.small} ${style.tokenSchema.size.icon.medium} auto 1fr ${contentGutter} auto ${gridGutter}`
    },
    // hover
    [`&[aria-disabled=false]:hover .${gridClassname}, &[data-hovered] .${gridClassname}`]: {
      backgroundColor: style.tokenSchema.color.alias.backgroundHovered,
      color: style.tokenSchema.color.alias.foregroundHovered
    },
    // focus
    [`&[aria-disabled=false]:focus .${gridClassname}, &[data-focused] .${gridClassname}`]: {
      backgroundColor: style.tokenSchema.color.alias.backgroundHovered,
      color: style.tokenSchema.color.alias.foregroundHovered
    },
    // emphasise `kbd` during interaction
    '&[aria-disabled=false]:hover kbd, &[data-hovered] kbd, &[aria-disabled=false]:focus kbd, &[data-focused] kbd': {
      color: style.tokenSchema.color.alias.foregroundIdle
    },
    // press
    [`&[aria-disabled=false]:active .${gridClassname}, &[data-pressed] .${gridClassname}`]: {
      backgroundColor: style.tokenSchema.color.alias.backgroundPressed,
      color: style.tokenSchema.color.alias.foregroundPressed
    },
    // focus indicator
    '&[data-focused]': {
      // [`& .${gridClassname}`]: {
      //   backgroundColor: tokenSchema.color.alias.backgroundSelected,
      // },
      '&::before': {
        backgroundColor: style.tokenSchema.color.background.accentEmphasis,
        borderRadius: focusIndicatorWidth,
        content: '""',
        insetBlock: style.tokenSchema.size.space.xsmall,
        insetInlineStart: 0,
        position: 'absolute',
        width: focusIndicatorWidth
      }
    },
    // disabled
    '&[aria-disabled=true]': {
      color: style.tokenSchema.color.alias.foregroundDisabled,
      '& kbd': {
        color: 'currentColor'
      },
      '& .list-item-checkmark': {
        stroke: 'currentColor'
      }
    }
  });
  const slots$1 = {
    text: {
      ...labelProps,
      color: 'inherit',
      gridArea: 'text',
      weight: 'medium',
      UNSAFE_className: 'list-item-text'
    },
    icon: {
      gridArea: 'icon',
      marginEnd: 'regular',
      UNSAFE_className: 'list-item-icon'
    },
    description: {
      color: 'neutralSecondary',
      gridArea: 'description',
      marginY: 'small',
      size: 'small',
      ...descriptionProps
    },
    kbd: {
      UNSAFE_className: style.css({
        alignItems: 'center',
        color: style.tokenSchema.color.foreground.neutralTertiary,
        display: 'flex',
        gridArea: 'kbd',
        height: style.tokenSchema.size.icon.regular
      }),
      ...keyboardShortcutProps
    }
  };
  return /*#__PURE__*/jsxRuntime.jsx(ElementType
  // NOTE: disabled and selected states should be stored against aria attributes
  , {
    ...style.toDataAttributes({
      focused: isFocused || undefined,
      hovered: isHovered || undefined,
      pressed: isPressed || undefined
    }),
    ...otherProps,
    ref: forwardedRef,
    className: style.classNames(rootClassname),
    children: /*#__PURE__*/jsxRuntime.jsx("div", {
      className: gridClassname,
      children: /*#__PURE__*/jsxRuntime.jsx(slots.ClearSlots, {
        children: /*#__PURE__*/jsxRuntime.jsxs(slots.SlotProvider, {
          slots: slots$1,
          children: [children, isSelected && /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
            src: checkIcon.checkIcon,
            slot: "checkmark",
            strokeScaling: false,
            gridArea: "checkmark",
            UNSAFE_className: "list-item-checkmark"
          })]
        })
      })
    })
  });
});

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
		loading: "Indlæser ...",
		loadingMore: "Indlæser flere ..."
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
		loading: "로드 중",
		loadingMore: "추가 로드 중"
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
		loading: "Nalaganje...",
		loadingMore: "Nalaganje več vsebine..."
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
		loading: "正在載入",
		loadingMore: "正在載入更多…"
	}
};

const ListBoxContext = /*#__PURE__*/React.createContext(null);
function useListBoxContext() {
  let context = React.useContext(ListBoxContext);
  emery.assert(!!context, 'ListBoxContext is missing');
  return context;
}

/** @private */
function ListBoxOption(props) {
  let {
    item,
    shouldSelectOnPressUp,
    shouldFocusOnHover,
    shouldUseVirtualFocus
  } = props;
  let {
    rendered,
    key
  } = item;
  let state = useListBoxContext();
  let ref = React.useRef(null);
  let {
    optionProps,
    labelProps,
    descriptionProps,
    isSelected,
    isDisabled,
    isFocused,
    isPressed
  } = listbox.useOption({
    'aria-label': item['aria-label'],
    key,
    shouldSelectOnPressUp,
    shouldFocusOnHover,
    isVirtualized: true,
    shouldUseVirtualFocus
  }, state, ref);
  let {
    hoverProps,
    isHovered
  } = interactions.useHover({
    ...props,
    isDisabled
  });
  let {
    isFocusVisible,
    focusProps
  } = focus.useFocusRing();
  let contents = utils.isReactText(rendered) ? /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
    children: rendered
  }) : rendered;
  let isKeyboardModality = interactions.isFocusVisible();
  return /*#__PURE__*/jsxRuntime.jsx(ListItem, {
    descriptionProps: descriptionProps,
    labelProps: labelProps
    // If using virtual focus, apply focused styles to the item when the user is interacting with keyboard modality
    ,
    isFocused: shouldUseVirtualFocus ? isFocused && isKeyboardModality : isFocusVisible
    // When shouldFocusOnHover is false, apply hover styles both when hovered with the mouse.
    // Otherwise, apply hover styles when focused using non-keyboard modality.
    ,
    isHovered: isHovered && !shouldFocusOnHover || isFocused && !isKeyboardModality,
    ...utils$1.mergeProps(optionProps, focusProps, shouldFocusOnHover ? {} : hoverProps),
    isPressed: isPressed,
    isSelected: isSelected,
    ref: ref,
    children: contents
  });
}

/** @private */
function ListBoxSection(props) {
  let {
    children,
    layoutInfo,
    headerLayoutInfo,
    virtualizer: virtualizer$1,
    item
  } = props;
  let {
    headingProps,
    groupProps
  } = listbox.useListBoxSection({
    heading: item.rendered,
    'aria-label': item['aria-label']
  });
  let headerRef = React.useRef(null);
  virtualizer.useVirtualizerItem({
    layoutInfo: headerLayoutInfo,
    virtualizer: virtualizer$1,
    ref: headerRef
  });
  let {
    direction
  } = i18n.useLocale();
  let state = useListBoxContext();
  return /*#__PURE__*/jsxRuntime.jsxs(React.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsxs("div", {
      role: "presentation",
      ref: headerRef,
      style: virtualizer.layoutInfoToStyle(headerLayoutInfo, direction),
      children: [item.key !== state.collection.getFirstKey() && /*#__PURE__*/jsxRuntime.jsx(layout.Divider, {
        role: "presentation",
        elementType: "div",
        size: "medium",
        UNSAFE_className: style.css({
          margin: style.tokenSchema.size.space.medium
        })
      }), item.rendered && /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
        ...headingProps,
        casing: "uppercase",
        color: "neutralSecondary",
        size: "small",
        weight: "medium",
        UNSAFE_className: style.css({
          padding: style.tokenSchema.size.space.medium
        }),
        children: item.rendered
      })]
    }), /*#__PURE__*/jsxRuntime.jsx("div", {
      ...groupProps,
      style: virtualizer.layoutInfoToStyle(layoutInfo, direction),
      className: style.classNames(style.css({}), 'ListBoxSection'),
      children: children
    })]
  });
}

/** @private */
function useListBoxLayout(state) {
  let {
    scale
  } = core.useProvider();
  let collator = i18n.useCollator({
    usage: 'search',
    sensitivity: 'base'
  });
  let layout = React.useMemo(() => new layout$1.ListLayout({
    estimatedRowHeight: scale === 'large' ? 48 : 32,
    estimatedHeadingHeight: scale === 'large' ? 33 : 26,
    padding: scale === 'large' ? 5 : 4,
    loaderHeight: 40,
    placeholderHeight: scale === 'large' ? 48 : 32,
    collator
  }), [collator, scale]);
  layout.collection = state.collection;
  layout.disabledKeys = state.disabledKeys;
  return layout;
}

/** @private */
function ListBoxBase(props, forwardedRef) {
  let {
    layout,
    state,
    shouldSelectOnPressUp,
    focusOnPointerEnter,
    shouldUseVirtualFocus,
    domProps = {},
    transitionDuration = 0,
    onScroll
  } = props;
  let {
    listBoxProps
  } = listbox.useListBox({
    ...props,
    keyboardDelegate: layout,
    isVirtualized: true
  }, state, forwardedRef);
  let styleProps = style.useStyleProps(props);
  let stringFormatter = i18n.useLocalizedStringFormatter(localizedMessages);

  // Sync loading state into the layout.
  layout.isLoading = !!props.isLoading;

  // This overrides collection view's renderWrapper to support heirarchy of items in sections.
  // The header is extracted from the children so it can receive ARIA labeling properties.
  let renderWrapper = (parent, reusableView, children, renderChildren) => {
    if (reusableView.viewType === 'section') {
      var _children$find;
      return /*#__PURE__*/jsxRuntime.jsx(ListBoxSection, {
        item: reusableView.content,
        layoutInfo: reusableView.layoutInfo,
        virtualizer: reusableView.virtualizer,
        headerLayoutInfo: (_children$find = children.find(c => c.viewType === 'header')) === null || _children$find === void 0 ? void 0 : _children$find.layoutInfo,
        children: renderChildren(children.filter(c => c.viewType === 'item'))
      }, reusableView.key);
    }
    return /*#__PURE__*/jsxRuntime.jsx(virtualizer.VirtualizerItem, {
      layoutInfo: reusableView.layoutInfo,
      virtualizer: reusableView.virtualizer,
      parent: parent === null || parent === void 0 ? void 0 : parent.layoutInfo,
      children: reusableView.rendered
    }, reusableView.key);
  };
  return /*#__PURE__*/jsxRuntime.jsx(ListBoxContext.Provider, {
    value: state,
    children: /*#__PURE__*/jsxRuntime.jsx(focus.FocusScope, {
      children: /*#__PURE__*/jsxRuntime.jsx(virtualizer.Virtualizer, {
        ...styleProps,
        ...utils$1.mergeProps(listBoxProps, domProps),
        ref: forwardedRef,
        focusedKey: state.selectionManager.focusedKey,
        autoFocus: !!props.autoFocus,
        sizeToFit: "height",
        scrollDirection: "vertical",
        layout: layout,
        collection: state.collection,
        renderWrapper: renderWrapper,
        transitionDuration: transitionDuration,
        isLoading: props.isLoading,
        onLoadMore: props.onLoadMore,
        shouldUseVirtualFocus: shouldUseVirtualFocus,
        onScroll: onScroll,
        children: (type, item) => {
          if (type === 'item') {
            return /*#__PURE__*/jsxRuntime.jsx(ListBoxOption, {
              item: item,
              shouldSelectOnPressUp: shouldSelectOnPressUp,
              shouldFocusOnHover: focusOnPointerEnter,
              shouldUseVirtualFocus: shouldUseVirtualFocus
            });
          } else if (type === 'loader') {
            return /*#__PURE__*/jsxRuntime.jsx("div", {
              role: "option",
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              },
              children: /*#__PURE__*/jsxRuntime.jsx(progress.ProgressCircle, {
                isIndeterminate: true,
                size: "small",
                "aria-label": state.collection.size > 0 ? stringFormatter.format('loadingMore') : stringFormatter.format('loading')
              })
            });
          } else if (type === 'placeholder') {
            let emptyState = props.renderEmptyState ? props.renderEmptyState() : null;
            if (emptyState == null) {
              return null;
            }
            return /*#__PURE__*/jsxRuntime.jsx("div", {
              role: "option",
              children: emptyState
            });
          }
        }
      })
    })
  });
}

// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _ListBoxBase = /*#__PURE__*/React.forwardRef(ListBoxBase);

function ListBox(props, forwardedRef) {
  let domRef = utils$1.useObjectRef(forwardedRef);
  let state = list.useListState(props);
  let layout = useListBoxLayout(state);
  return /*#__PURE__*/jsxRuntime.jsx(_ListBoxBase, {
    ...props,
    ref: domRef,
    state: state,
    layout: layout
  });
}

// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref

/**
 * A list of options that can allow selection of one or more.
 */
const _ListBox = /*#__PURE__*/React.forwardRef(ListBox);

const listStyles = style.css({
  borderRadius: 'inherit',
  maxHeight: 'inherit',
  // maxWidth: tokenSchema.size.dialog.small,
  outline: 0,
  overflowY: 'auto',
  paddingBlock: style.tokenSchema.size.space.small,
  userSelect: 'none'
});

Object.defineProperty(exports, 'Item', {
  enumerable: true,
  get: function () { return collections.Item; }
});
Object.defineProperty(exports, 'Section', {
  enumerable: true,
  get: function () { return collections.Section; }
});
exports.ListBox = _ListBox;
exports.ListBoxBase = _ListBoxBase;
exports.ListItem = ListItem;
exports.listStyles = listStyles;
exports.useListBoxLayout = useListBoxLayout;