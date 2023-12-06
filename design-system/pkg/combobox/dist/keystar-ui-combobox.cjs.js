'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var collections = require('@react-stately/collections');
var combobox$1 = require('@react-aria/combobox');
var i18n = require('@react-aria/i18n');
var interactions = require('@react-aria/interactions');
var utils = require('@react-aria/utils');
var combobox = require('@react-stately/combobox');
var React = require('react');
var button$1 = require('@keystar/ui/button');
var core = require('@keystar/ui/core');
var field = require('@keystar/ui/field');
var icon = require('@keystar/ui/icon');
var chevronDownIcon = require('@keystar/ui/icon/icons/chevronDownIcon');
var layout = require('@keystar/ui/layout');
var listbox = require('@keystar/ui/listbox');
var overlays$1 = require('@keystar/ui/overlays');
var progress = require('@keystar/ui/progress');
var style = require('@keystar/ui/style');
var textField = require('@keystar/ui/text-field');
var typography = require('@keystar/ui/typography');
var button = require('@react-aria/button');
var dialog = require('@react-aria/dialog');
var focus = require('@react-aria/focus');
var label = require('@react-aria/label');
var overlays = require('@react-aria/overlays');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const comboboxClassList = new style.ClassList('Combobox', ['input', 'mobile-trigger']);

var localizedMessages = {
	"ar-AE": {
		clear: "مسح",
		invalid: "(غير صالح)",
		loading: "جارٍ التحميل...",
		noResults: "لا توجد نتائج"
	},
	"bg-BG": {
		clear: "Изчисти",
		invalid: "(невалиден)",
		loading: "Зареждане...",
		noResults: "Няма резултати"
	},
	"cs-CZ": {
		clear: "Vymazat",
		invalid: "(neplatné)",
		loading: "Načítání...",
		noResults: "Žádné výsledky"
	},
	"da-DK": {
		clear: "Ryd",
		invalid: "(ugyldig)",
		loading: "Indlæser ...",
		noResults: "Ingen resultater"
	},
	"de-DE": {
		clear: "Löschen",
		invalid: "(ungültig)",
		loading: "Wird geladen...",
		noResults: "Keine Ergebnisse"
	},
	"el-GR": {
		clear: "Καθαρισμός",
		invalid: "(δεν ισχύει)",
		loading: "Φόρτωση...",
		noResults: "Χωρίς αποτέλεσμα"
	},
	"en-US": {
		loading: "Loading...",
		noResults: "No results",
		clear: "Clear",
		invalid: "(invalid)"
	},
	"es-ES": {
		clear: "Borrar",
		invalid: "(no válido)",
		loading: "Cargando...",
		noResults: "Sin resultados"
	},
	"et-EE": {
		clear: "Puhasta",
		invalid: "(kehtetu)",
		loading: "Laadimine...",
		noResults: "Tulemusi pole"
	},
	"fi-FI": {
		clear: "Kirkas",
		invalid: "(epäkelpo)",
		loading: "Ladataan...",
		noResults: "Ei tuloksia"
	},
	"fr-FR": {
		clear: "Effacer",
		invalid: "(non valide)",
		loading: "Chargement en cours...",
		noResults: "Aucun résultat"
	},
	"he-IL": {
		clear: "נקי",
		invalid: "(לא חוקי)",
		loading: "טוען...",
		noResults: "אין תוצאות"
	},
	"hr-HR": {
		clear: "Izbriši",
		invalid: "(nevažeće)",
		loading: "Učitavam...",
		noResults: "Nema rezultata"
	},
	"hu-HU": {
		clear: "Törlés",
		invalid: "(érvénytelen)",
		loading: "Betöltés folyamatban…",
		noResults: "Nincsenek találatok"
	},
	"it-IT": {
		clear: "Cancella",
		invalid: "(non valido)",
		loading: "Caricamento in corso...",
		noResults: "Nessun risultato"
	},
	"ja-JP": {
		clear: "クリア",
		invalid: "(無効)",
		loading: "読み込み中...",
		noResults: "結果なし"
	},
	"ko-KR": {
		clear: "지우기",
		invalid: "(유효하지 않음)",
		loading: "로드 중...",
		noResults: "결과 없음"
	},
	"lt-LT": {
		clear: "Skaidrus",
		invalid: "(netinkama)",
		loading: "Įkeliama...",
		noResults: "Be rezultatų"
	},
	"lv-LV": {
		clear: "Notīrīt",
		invalid: "(nederīgs)",
		loading: "Notiek ielāde...",
		noResults: "Nav rezultātu"
	},
	"nb-NO": {
		clear: "Tøm",
		invalid: "(ugyldig)",
		loading: "Laster inn ...",
		noResults: "Ingen resultater"
	},
	"nl-NL": {
		clear: "Helder",
		invalid: "(ongeldig)",
		loading: "Laden...",
		noResults: "Geen resultaten"
	},
	"pl-PL": {
		clear: "Wyczyść",
		invalid: "(nieprawidłowy)",
		loading: "Trwa ładowanie...",
		noResults: "Brak wyników"
	},
	"pt-BR": {
		clear: "Limpar",
		invalid: "(inválido)",
		loading: "Carregando...",
		noResults: "Nenhum resultado"
	},
	"pt-PT": {
		clear: "Limpar",
		invalid: "(inválido)",
		loading: "A carregar...",
		noResults: "Sem resultados"
	},
	"ro-RO": {
		clear: "Golire",
		invalid: "(nevalid)",
		loading: "Se încarcă...",
		noResults: "Niciun rezultat"
	},
	"ru-RU": {
		clear: "Очистить",
		invalid: "(недействительно)",
		loading: "Загрузка...",
		noResults: "Результаты отсутствуют"
	},
	"sk-SK": {
		clear: "Vymazať",
		invalid: "(neplatné)",
		loading: "Načítava sa...",
		noResults: "Žiadne výsledky"
	},
	"sl-SI": {
		clear: "Jasen",
		invalid: "(neveljavno)",
		loading: "Nalaganje...",
		noResults: "Ni rezultatov"
	},
	"sr-SP": {
		clear: "Izbriši",
		invalid: "(nevažeće)",
		loading: "Učitavam...",
		noResults: "Nema rezultata"
	},
	"sv-SE": {
		clear: "Rensa",
		invalid: "(ogiltigt)",
		loading: "Läser in...",
		noResults: "Inga resultat"
	},
	"tr-TR": {
		clear: "Temizle",
		invalid: "(geçersiz)",
		loading: "Yükleniyor...",
		noResults: "Sonuç yok"
	},
	"uk-UA": {
		clear: "Очистити",
		invalid: "(недійсне)",
		loading: "Завантаження...",
		noResults: "Результатів немає"
	},
	"zh-CN": {
		clear: "透明",
		invalid: "（无效）",
		loading: "正在加载...",
		noResults: "无结果"
	},
	"zh-TW": {
		clear: "清除",
		invalid: "(無效)",
		loading: "正在載入...",
		noResults: "無任何結果"
	}
};

function MobileCombobox(props, forwardedRef) {
  props = core.useProviderProps(props);
  let {
    isDisabled,
    validationState,
    isReadOnly
  } = props;
  let {
    contains
  } = i18n.useFilter({
    sensitivity: 'base'
  });
  let state = combobox.useComboBoxState({
    ...props,
    defaultFilter: contains,
    allowsEmptyCollection: true,
    // Needs to be false here otherwise we double up on
    // commitSelection/commitCustomValue calls when user taps on underlay (i.e.
    // initial tap will call setFocused(false) ->
    // commitSelection/commitCustomValue via onBlur, then the closing of the
    // tray will call setFocused(false) again due to cleanup effect)
    shouldCloseOnBlur: false
  });
  let buttonRef = React.useRef(null);
  let domRef = utils.useObjectRef(forwardedRef);
  let {
    triggerProps,
    overlayProps
  } = overlays.useOverlayTrigger({
    type: 'listbox'
  }, state, buttonRef);
  let {
    labelProps,
    fieldProps
  } = label.useField({
    ...props,
    labelElementType: 'span'
  });

  // Focus the button and show focus ring when clicking on the label
  labelProps.onClick = () => {
    let button = buttonRef.current;
    if (button && !props.isDisabled) {
      button.focus();
      interactions.setInteractionModality('keyboard');
    }
  };
  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx(field.FieldPrimitive, {
      ...props,
      labelProps: labelProps
      // elementType="span"
      ,
      ref: domRef,
      supplementRequiredState: true,
      children: /*#__PURE__*/jsxRuntime.jsx(ComboboxButton, {
        ...utils.mergeProps(triggerProps, fieldProps, {
          autoFocus: props.autoFocus
        }),
        ref: buttonRef,
        isDisabled: isDisabled,
        isReadOnly: isReadOnly,
        isPlaceholder: !state.inputValue,
        validationState: validationState,
        onPress: () => !isReadOnly && state.open(null, 'manual'),
        children: state.inputValue || props.placeholder || ''
      })
    }), /*#__PURE__*/jsxRuntime.jsx(overlays$1.Tray, {
      state: state,
      isFixedHeight: true,
      ...overlayProps,
      children: /*#__PURE__*/jsxRuntime.jsx(ComboboxTray, {
        ...props,
        onClose: state.close,
        overlayProps: overlayProps,
        state: state
      })
    })]
  });
}
const ComboboxButton = /*#__PURE__*/React__default["default"].forwardRef(function ComboboxButton(props, forwardedRef) {
  let {
    isDisabled,
    isPlaceholder,
    validationState,
    children,
    style: style$1
  } = props;
  let valueId = utils.useId();
  let invalidId = utils.useId();
  let domRef = utils.useObjectRef(forwardedRef);
  let {
    hoverProps,
    isHovered
  } = interactions.useHover({});
  let {
    buttonProps,
    isPressed
  } = button.useButton({
    ...props,
    'aria-labelledby': [props['aria-labelledby'], props['aria-label'] && !props['aria-labelledby'] ? props.id : null, valueId, validationState === 'invalid' ? invalidId : null].filter(Boolean).join(' '),
    elementType: 'div'
  }, domRef);
  return /*#__PURE__*/jsxRuntime.jsx(style.FocusRing, {
    children: /*#__PURE__*/jsxRuntime.jsxs(layout.Flex, {
      position: "relative",
      width: "alias.singleLineWidth",
      zIndex: 0 // create a new stacking context
      ,
      ...style.toDataAttributes({
        readonly: props.isReadOnly
      }),
      ...utils.mergeProps(hoverProps, buttonProps),
      "aria-haspopup": "dialog",
      ref: domRef,
      UNSAFE_className: comboboxClassList.element('mobile-trigger'),
      UNSAFE_style: {
        ...style$1,
        outline: 'none'
      },
      children: [/*#__PURE__*/jsxRuntime.jsx(layout.Flex, {
        alignItems: "center",
        paddingX: "medium",
        flex: true,
        children: /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
          id: valueId,
          color: isPlaceholder ? 'neutralSecondary' : undefined,
          trim: false,
          truncate: true,
          children: children
        })
      }), /*#__PURE__*/jsxRuntime.jsx(InputStateIndicator, {
        isHovered: isHovered,
        isPressed: isPressed,
        isDisabled: isDisabled,
        validationState: validationState
      }), /*#__PURE__*/jsxRuntime.jsx(CosmeticFieldButton, {
        isHovered: isHovered,
        isPressed: isPressed,
        isDisabled: isDisabled,
        validationState: validationState,
        UNSAFE_className: style.css({
          borderEndStartRadius: 0,
          borderStartStartRadius: 0,
          [`${comboboxClassList.selector('mobile-trigger')}[data-focus] &`]: {
            borderColor: style.tokenSchema.color.alias.borderFocused
          }
        }),
        children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
          src: chevronDownIcon.chevronDownIcon
        })
      })]
    })
  });
});
const CosmeticFieldButton = props => {
  let {
    isHovered,
    isPressed,
    ...otherProps
  } = props;
  let {
    children,
    styleProps
  } = button$1.useFieldButton(otherProps, {
    isHovered,
    isPressed
  });
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    "data-disabled": props.isDisabled,
    ...styleProps,
    children: children
  });
};
const InputStateIndicator = props => {
  let {
    isDisabled,
    isHovered,
    isPressed
  } = props;
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    role: "presentation",
    ...style.toDataAttributes({
      disabled: isDisabled,
      interaction: isPressed ? 'press' : isHovered ? 'hover' : undefined,
      validation: props.validationState
    }),
    className: style.css({
      backgroundColor: style.tokenSchema.color.background.canvas,
      border: `${style.tokenSchema.size.border.regular} solid ${style.tokenSchema.color.alias.borderIdle}`,
      borderRadius: style.tokenSchema.size.radius.regular,
      inset: 0,
      position: 'absolute',
      transition: style.transition(['border-color', 'box-shadow']),
      zIndex: -1,
      '&[data-interaction=hover]': {
        borderColor: style.tokenSchema.color.alias.borderHovered
      },
      '&[data-validation=invalid]': {
        borderColor: style.tokenSchema.color.alias.borderInvalid
      },
      [`${comboboxClassList.selector('mobile-trigger')}[data-focus] &`]: {
        borderColor: style.tokenSchema.color.alias.borderFocused
      },
      [`${comboboxClassList.selector('mobile-trigger')}[data-focus]:not([data-readonly]) &`]: {
        boxShadow: `0 0 0 1px ${style.tokenSchema.color.alias.borderFocused}`
      },
      '&[data-disabled=true]': {
        backgroundColor: style.tokenSchema.color.background.surfaceSecondary,
        borderColor: 'transparent'
      }
    })
  });
};
function ComboboxTray(props) {
  let {
    state,
    isDisabled,
    validationState,
    label,
    overlayProps,
    loadingState,
    onLoadMore,
    onClose
  } = props;
  let timeoutRef = React.useRef();
  let [showLoading, setShowLoading] = React.useState(false);
  let inputRef = React.useRef(null);
  let buttonRef = React.useRef(null);
  let popoverRef = React.useRef(null);
  let listBoxRef = React.useRef(null);
  let layout$1 = listbox.useListBoxLayout(state);
  let stringFormatter = i18n.useLocalizedStringFormatter(localizedMessages);
  let {
    inputProps,
    listBoxProps,
    labelProps
  } = combobox$1.useComboBox({
    ...props,
    keyboardDelegate: layout$1,
    buttonRef,
    popoverRef,
    listBoxRef,
    inputRef
  }, state);
  React__default["default"].useEffect(() => {
    let input = inputRef.current;
    if (input) {
      focus.focusSafely(input);
    }

    // When the tray unmounts, set state.isFocused (i.e. the tray input's focus tracker) to false.
    // This is to prevent state.isFocused from being set to true when the tray closes via tapping on the underlay
    // (FocusScope attempts to restore focus to the tray input when tapping outside the tray due to "contain")
    // Have to do this manually since React doesn't call onBlur when a component is unmounted: https://github.com/facebook/react/issues/12363
    return () => {
      state.setFocused(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let {
    dialogProps
  } = dialog.useDialog({
    'aria-labelledby': utils.useId(labelProps.id)
  }, popoverRef);

  // Override the role of the input to "searchbox" instead of "combobox".
  // Since the listbox is always visible, the combobox role doesn't really give us anything.
  // VoiceOver on iOS reads "double tap to collapse" when focused on the input rather than
  // "double tap to edit text", as with a textbox or searchbox. We'd like double tapping to
  // open the virtual keyboard rather than closing the tray.
  inputProps.role = 'searchbox';
  inputProps['aria-haspopup'] = 'listbox';
  delete inputProps.onTouchEnd;
  let clearButton = /*#__PURE__*/jsxRuntime.jsx(button$1.ClearButton, {
    preventFocus: true,
    "aria-label": stringFormatter.format('clear'),
    excludeFromTabOrder: true,
    onPress: () => {
      state.setInputValue('');
      let input = inputRef.current;
      if (input) {
        input.focus();
      }
    },
    isDisabled: isDisabled
  });
  let loadingCircle = /*#__PURE__*/jsxRuntime.jsx(layout.Flex, {
    alignItems: "center",
    flexShrink: 0,
    justifyContent: "center",
    pointerEvents: "none",
    width: "element.regular",
    children: /*#__PURE__*/jsxRuntime.jsx(progress.ProgressCircle, {
      "aria-label": stringFormatter.format('loading'),
      size: "small",
      isIndeterminate: true
    })
  });

  // Close the software keyboard on scroll to give the user a bigger area to scroll.
  // But only do this if scrolling with touch, otherwise it can cause issues with touch
  // screen readers.
  let isTouchDown = React.useRef(false);
  let onTouchStart = () => {
    isTouchDown.current = true;
  };
  let onTouchEnd = () => {
    isTouchDown.current = false;
  };
  let onScroll = React.useCallback(() => {
    let input = inputRef.current;
    let popover = popoverRef.current;
    if (!input || document.activeElement !== input || !isTouchDown.current) {
      return;
    }
    if (popover) {
      popover.focus();
    }
  }, [inputRef, popoverRef, isTouchDown]);
  let inputValue = inputProps.value;
  let lastInputValue = React.useRef(inputValue);
  React.useEffect(() => {
    if (loadingState === 'filtering' && !showLoading) {
      if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          setShowLoading(true);
        }, 500);
      }

      // If user is typing, clear the timer and restart since it is a new request
      if (inputValue !== lastInputValue.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setShowLoading(true);
        }, 500);
      }
    } else if (loadingState !== 'filtering') {
      // If loading is no longer happening, clear any timers and hide the loading circle
      setShowLoading(false);
      // @ts-expect-error FIXME: NodeJS.Timeout is not assignable to number
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    lastInputValue.current = inputValue;
  }, [loadingState, inputValue, showLoading]);
  let onKeyDown = e => {
    let popover = popoverRef.current;
    // Close virtual keyboard if user hits Enter w/o any focused options
    if (popover && e.key === 'Enter' && state.selectionManager.focusedKey == null) {
      popover.focus();
    } else {
      var _inputProps$onKeyDown;
      (_inputProps$onKeyDown = inputProps.onKeyDown) === null || _inputProps$onKeyDown === void 0 || _inputProps$onKeyDown.call(inputProps, e);
    }
  };
  return /*#__PURE__*/jsxRuntime.jsx(focus.FocusScope, {
    restoreFocus: true,
    contain: true,
    children: /*#__PURE__*/jsxRuntime.jsxs(layout.Flex, {
      direction: "column",
      height: "100%",
      ref: popoverRef,
      ...utils.mergeProps(overlayProps, dialogProps),
      children: [/*#__PURE__*/jsxRuntime.jsx(overlays.DismissButton, {
        onDismiss: onClose
      }), /*#__PURE__*/jsxRuntime.jsx(textField.TextFieldPrimitive, {
        label: label,
        labelProps: labelProps,
        inputProps: {
          ...inputProps,
          onKeyDown
        },
        ref: inputRef,
        isDisabled: isDisabled,
        marginX: "small",
        marginTop: "regular",
        endElement: /*#__PURE__*/jsxRuntime.jsxs(layout.Flex, {
          children: [showLoading && loadingState === 'filtering' && loadingCircle, (state.inputValue !== '' || loadingState === 'filtering' || validationState != null) && !props.isReadOnly && clearButton]
        })
      }), /*#__PURE__*/jsxRuntime.jsx(listbox.ListBoxBase, {
        ...listBoxProps,
        domProps: {
          onTouchStart,
          onTouchEnd
        },
        disallowEmptySelection: true,
        shouldSelectOnPressUp: true,
        focusOnPointerEnter: true,
        layout: layout$1,
        state: state,
        shouldUseVirtualFocus: true,
        renderEmptyState: () => loadingState !== 'loading' && /*#__PURE__*/jsxRuntime.jsx(layout.Flex, {
          height: "element.regular",
          alignItems: "center",
          paddingX: "medium",
          children: /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
            color: "neutralSecondary",
            children: stringFormatter.format('noResults')
          })
        }),
        ref: listBoxRef,
        onScroll: onScroll,
        onLoadMore: onLoadMore,
        isLoading: loadingState === 'loading' || loadingState === 'loadingMore'
      }), /*#__PURE__*/jsxRuntime.jsx(overlays.DismissButton, {
        onDismiss: onClose
      })]
    })
  });
}
const _MobileCombobox = /*#__PURE__*/React__default["default"].forwardRef(MobileCombobox);

function Combobox(props, forwardedRef) {
  props = core.useProviderProps(props);
  // FIXME
  props = textField.validateTextFieldProps(props);
  let isMobile = style.useIsMobileDevice();
  if (isMobile) {
    // menuTrigger=focus/manual don't apply to mobile combobox
    return /*#__PURE__*/jsxRuntime.jsx(_MobileCombobox, {
      ...props,
      menuTrigger: "input",
      ref: forwardedRef
    });
  } else {
    // @ts-expect-error FIXME: 'T' could be instantiated with an arbitrary type which could be unrelated to 'unknown'.
    return /*#__PURE__*/jsxRuntime.jsx(ComboboxBase, {
      ...props,
      ref: forwardedRef
    });
  }
}
const ComboboxBase = /*#__PURE__*/React__default["default"].forwardRef(function ComboboxBase(props, forwardedRef) {
  let {
    align = 'start',
    menuTrigger = 'input',
    shouldFlip = true,
    direction = 'bottom',
    loadingState,
    menuWidth: menuWidthProp,
    onLoadMore
  } = props;
  let isAsync = loadingState != null;
  let stringFormatter = i18n.useLocalizedStringFormatter(localizedMessages);
  let buttonRef = React.useRef(null);
  let inputRef = React.useRef(null);
  let listBoxRef = React.useRef(null);
  let [popoverRefLikeValue, popoverRef] = useStatefulRef();
  let fieldRef = utils.useObjectRef(forwardedRef);
  let {
    contains
  } = i18n.useFilter({
    sensitivity: 'base'
  });
  let state = combobox.useComboBoxState({
    ...props,
    defaultFilter: contains,
    allowsEmptyCollection: isAsync
  });
  let layout$1 = listbox.useListBoxLayout(state);
  let {
    buttonProps,
    inputProps,
    listBoxProps,
    labelProps,
    descriptionProps,
    errorMessageProps
  } = combobox$1.useComboBox({
    ...props,
    keyboardDelegate: layout$1,
    buttonRef,
    popoverRef: popoverRefLikeValue,
    listBoxRef,
    inputRef,
    menuTrigger
  }, state);

  // Measure the width of the input and the button to inform the width of the menu (below).
  let [menuWidth, setMenuWidth] = React.useState();
  let {
    scale
  } = core.useProvider();
  let onResize = React.useCallback(() => {
    if (buttonRef.current && inputRef.current) {
      let buttonWidth = buttonRef.current.offsetWidth;
      let inputWidth = inputRef.current.offsetWidth;
      setMenuWidth(inputWidth + buttonWidth);
    }
  }, [buttonRef, inputRef, setMenuWidth]);
  utils.useResizeObserver({
    ref: fieldRef,
    onResize: onResize
  });
  utils.useLayoutEffect(onResize, [scale, onResize]);
  let style = {
    width: menuWidth,
    minWidth: menuWidthProp !== null && menuWidthProp !== void 0 ? menuWidthProp : menuWidth
  };
  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx(field.FieldPrimitive, {
      width: "alias.singleLineWidth",
      ...props,
      descriptionProps: descriptionProps,
      errorMessageProps: errorMessageProps,
      labelProps: labelProps,
      ref: fieldRef,
      children: /*#__PURE__*/jsxRuntime.jsx(ComboboxInput, {
        ...props,
        isOpen: state.isOpen,
        loadingState: loadingState,
        inputProps: inputProps,
        inputRef: inputRef,
        triggerProps: buttonProps,
        triggerRef: buttonRef
      })
    }), /*#__PURE__*/jsxRuntime.jsx(overlays$1.Popover, {
      state: state,
      UNSAFE_style: style,
      ref: popoverRef,
      triggerRef: align === 'end' ? buttonRef : inputRef,
      scrollRef: listBoxRef,
      placement: `${direction} ${align}`,
      hideArrow: true,
      isNonModal: true,
      shouldFlip: shouldFlip,
      children: /*#__PURE__*/jsxRuntime.jsx(listbox.ListBoxBase, {
        ...listBoxProps,
        ref: listBoxRef,
        disallowEmptySelection: true,
        autoFocus: state.focusStrategy,
        shouldSelectOnPressUp: true,
        focusOnPointerEnter: true,
        layout: layout$1,
        state: state,
        shouldUseVirtualFocus: true,
        isLoading: loadingState === 'loadingMore',
        onLoadMore: onLoadMore,
        UNSAFE_className: listbox.listStyles,
        renderEmptyState: () => isAsync && /*#__PURE__*/jsxRuntime.jsx(layout.Flex, {
          height: "element.regular",
          alignItems: "center",
          paddingX: "medium",
          children: /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
            color: "neutralSecondary",
            children: loadingState === 'loading' ? stringFormatter.format('loading') : stringFormatter.format('noResults')
          })
        })
      })
    })]
  });
});

// FIXME: this is a hack to work around a requirement of react-aria. object refs
// never have the value early enough, so we need to use a stateful ref to force
// a re-render.
function useStatefulRef() {
  let [current, statefulRef] = React.useState(null);
  return React.useMemo(() => {
    return [{
      current
    }, statefulRef];
  }, [current, statefulRef]);
}
const ComboboxInput = /*#__PURE__*/React__default["default"].forwardRef(function ComboboxInput(props, forwardedRef) {
  let {
    isDisabled,
    inputProps,
    inputRef,
    triggerProps,
    triggerRef,
    autoFocus,
    style: style$1,
    loadingState,
    isOpen,
    menuTrigger
  } = props;
  let stringFormatter = i18n.useLocalizedStringFormatter(localizedMessages);
  let timeoutRef = React.useRef();
  let [showLoading, setShowLoading] = React.useState(false);
  let loadingCircle = /*#__PURE__*/jsxRuntime.jsx(layout.Flex, {
    alignItems: "center",
    flexShrink: 0,
    justifyContent: "center",
    pointerEvents: "none",
    width: "element.regular",
    children: /*#__PURE__*/jsxRuntime.jsx(progress.ProgressCircle, {
      "aria-label": stringFormatter.format('loading'),
      size: "small",
      isIndeterminate: true
    })
  });
  let isLoading = loadingState === 'loading' || loadingState === 'filtering';
  let inputValue = inputProps.value;
  let lastInputValue = React.useRef(inputValue);
  React.useEffect(() => {
    if (isLoading && !showLoading) {
      if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          setShowLoading(true);
        }, 500);
      }

      // If user is typing, clear the timer and restart since it is a new request
      if (inputValue !== lastInputValue.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setShowLoading(true);
        }, 500);
      }
    } else if (!isLoading) {
      // If loading is no longer happening, clear any timers and hide the loading circle
      setShowLoading(false);
      // @ts-expect-error FIXME: not sure how to resolve this type error
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    lastInputValue.current = inputValue;
  }, [isLoading, showLoading, inputValue]);
  return /*#__PURE__*/jsxRuntime.jsx(style.FocusRing, {
    autoFocus: autoFocus,
    isTextInput: true,
    within: true,
    children: /*#__PURE__*/jsxRuntime.jsx("div", {
      ref: forwardedRef,
      style: style$1,
      children: /*#__PURE__*/jsxRuntime.jsx(textField.TextFieldPrimitive, {
        inputProps: {
          ...inputProps,
          className: comboboxClassList.element('input')
        },
        ref: inputRef,
        isDisabled: isDisabled
        // loading circle should only be displayed if menu is open, if
        // menuTrigger is "manual", or first time load (to stop circle from
        // showing up when user selects an option)
        // startElement={
        //   showLoading &&
        //   (isOpen || menuTrigger === 'manual' || loadingState === 'loading')
        //     ? loadingState != null && loadingCircle
        //     : null
        // }
        ,
        endElement: /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [showLoading && (isOpen || menuTrigger === 'manual' || loadingState === 'loading') ? loadingCircle : null, /*#__PURE__*/jsxRuntime.jsx(interactions.PressResponder, {
            preventFocusOnPress: true,
            isPressed: isOpen,
            children: /*#__PURE__*/jsxRuntime.jsx(button$1.FieldButton, {
              ...triggerProps,
              ref: triggerRef,
              UNSAFE_className: style.css({
                borderEndStartRadius: 0,
                borderStartStartRadius: 0,
                [`${comboboxClassList.selector('input')}[aria-invalid] ~ &`]: {
                  borderColor: style.tokenSchema.color.alias.borderInvalid
                },
                [`${comboboxClassList.selector('input')}[readonly] ~ &`]: {
                  borderColor: style.tokenSchema.color.alias.borderIdle
                },
                [`${comboboxClassList.selector('input')}:focus ~ &`]: {
                  borderColor: style.tokenSchema.color.alias.borderFocused
                }
              }),
              children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
                src: chevronDownIcon.chevronDownIcon
              })
            })
          })]
        })
      })
    })
  });
});

/**
 * A combobox combines a text input with a listbox, and allows users to filter a
 * list of options.
 */
const _Combobox = /*#__PURE__*/React__default["default"].forwardRef(Combobox);

Object.defineProperty(exports, 'Item', {
  enumerable: true,
  get: function () { return collections.Item; }
});
Object.defineProperty(exports, 'Section', {
  enumerable: true,
  get: function () { return collections.Section; }
});
exports.Combobox = _Combobox;
exports.comboboxClassList = comboboxClassList;