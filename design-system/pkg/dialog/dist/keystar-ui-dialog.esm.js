'use client';
import { useObjectRef, mergeProps, chain } from '@react-aria/utils';
import React, { forwardRef, useContext, useRef, useMemo, Children, useEffect, Fragment } from 'react';
import { ActionButton, ButtonGroup, Button } from '@keystar/ui/button';
import { SlotProvider, Content } from '@keystar/ui/slots';
import { ClassList, toDataAttributes, classNames, css, tokenSchema, useStyleProps, breakpointQueries, useMediaQuery } from '@keystar/ui/style';
import { Heading, Text } from '@keystar/ui/typography';
import { useHasChild, isReactText } from '@keystar/ui/utils';
import { useDialog } from '@react-aria/dialog';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { xIcon } from '@keystar/ui/icon/icons/xIcon';
import { Icon } from '@keystar/ui/icon';
import { Grid } from '@keystar/ui/layout';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { Modal, Popover, Tray } from '@keystar/ui/overlays';
import { assert, assertNever } from 'emery';
import { PressResponder } from '@react-aria/interactions';
import { useOverlayTrigger } from '@react-aria/overlays';

const DialogContext = /*#__PURE__*/React.createContext(null);

var localizedMessages = {
	"ar-AE": {
		alert: "تنبيه",
		dismiss: "تجاهل"
	},
	"bg-BG": {
		alert: "Сигнал",
		dismiss: "Отхвърляне"
	},
	"cs-CZ": {
		alert: "Výstraha",
		dismiss: "Odstranit"
	},
	"da-DK": {
		alert: "Advarsel",
		dismiss: "Luk"
	},
	"de-DE": {
		alert: "Warnhinweis",
		dismiss: "Schließen"
	},
	"el-GR": {
		alert: "Ειδοποίηση",
		dismiss: "Απόρριψη"
	},
	"en-US": {
		alert: "Alert",
		dismiss: "Dismiss"
	},
	"es-ES": {
		alert: "Alerta",
		dismiss: "Descartar"
	},
	"et-EE": {
		alert: "Teade",
		dismiss: "Lõpeta"
	},
	"fi-FI": {
		alert: "Hälytys",
		dismiss: "Hylkää"
	},
	"fr-FR": {
		alert: "Alerte",
		dismiss: "Rejeter"
	},
	"he-IL": {
		alert: "התראה",
		dismiss: "התעלם"
	},
	"hr-HR": {
		alert: "Upozorenje",
		dismiss: "Odbaci"
	},
	"hu-HU": {
		alert: "Figyelmeztetés",
		dismiss: "Elutasítás"
	},
	"it-IT": {
		alert: "Avviso",
		dismiss: "Ignora"
	},
	"ja-JP": {
		alert: "アラート",
		dismiss: "閉じる"
	},
	"ko-KR": {
		alert: "경고",
		dismiss: "무시"
	},
	"lt-LT": {
		alert: "Įspėjimas",
		dismiss: "Atmesti"
	},
	"lv-LV": {
		alert: "Brīdinājums",
		dismiss: "Nerādīt"
	},
	"nb-NO": {
		alert: "Varsel",
		dismiss: "Lukk"
	},
	"nl-NL": {
		alert: "Melding",
		dismiss: "Negeren"
	},
	"pl-PL": {
		alert: "Ostrzeżenie",
		dismiss: "Zignoruj"
	},
	"pt-BR": {
		alert: "Alerta",
		dismiss: "Descartar"
	},
	"pt-PT": {
		alert: "Alerta",
		dismiss: "Dispensar"
	},
	"ro-RO": {
		alert: "Alertă",
		dismiss: "Revocare"
	},
	"ru-RU": {
		alert: "Предупреждение",
		dismiss: "Пропустить"
	},
	"sk-SK": {
		alert: "Upozornenie",
		dismiss: "Zrušiť"
	},
	"sl-SI": {
		alert: "Opozorilo",
		dismiss: "Opusti"
	},
	"sr-SP": {
		alert: "Upozorenje",
		dismiss: "Odbaci"
	},
	"sv-SE": {
		alert: "Varning",
		dismiss: "Avvisa"
	},
	"tr-TR": {
		alert: "Uyarı",
		dismiss: "Kapat"
	},
	"uk-UA": {
		alert: "Сигнал тривоги",
		dismiss: "Скасувати"
	},
	"zh-CN": {
		alert: "警报",
		dismiss: "取消"
	},
	"zh-T": {
		alert: "警示",
		dismiss: "關閉"
	}
};

const dialogClassList = new ClassList('Dialog', ['root', 'grid', 'heading', 'header', 'footer', 'button-group']);

/**
 * Dialogs are windows containing contextual information, tasks, or workflows
 * that appear over the user interface. Depending on the kind of dialog, further
 * interactions may be blocked until the dialog is closed.
 */
const Dialog = /*#__PURE__*/forwardRef(function Dialog(props, forwardedRef) {
  let {
    type = 'modal',
    ...contextProps
  } = useContext(DialogContext) || {};
  let {
    children,
    isDismissable = contextProps.isDismissable,
    onDismiss = contextProps.onClose,
    size
  } = props;
  let stringFormatter = useLocalizedStringFormatter(localizedMessages);
  let domRef = useObjectRef(forwardedRef);
  let gridRef = useRef(null);
  let {
    dialogProps,
    titleProps
  } = useDialog(mergeProps(contextProps, props), domRef);

  // analyse children to determine grid areas. need a unique identifier for each slot.
  // const headingSize = type === 'popover' ? 'small' : 'regular';
  const headingSize = 'regular';
  let hasHeading = useHasChild(dialogClassList.selector('heading'), gridRef);
  let hasHeader = useHasChild(dialogClassList.selector('header'), gridRef);
  let hasFooter = useHasChild(dialogClassList.selector('footer'), gridRef);
  let hasButtonGroup = useHasChild(dialogClassList.selector('button-group'), gridRef);
  let slots = useMemo(() => ({
    heading: {
      ...toDataAttributes({
        hasHeader
      }),
      UNSAFE_className: classNames(dialogClassList.element('heading'), getHeadingStyles()),
      elementType: 'h2',
      size: headingSize,
      // FIXME: declared as const—shouldn't need this weirdness.
      ...titleProps
    },
    header: {
      // ...toDataAttributes({ hasHeading }),
      UNSAFE_className: classNames(dialogClassList.element('header'), getHeaderStyles())
    },
    content: {
      ...toDataAttributes({
        hasHeader: hasHeader || hasHeading || undefined,
        hasFooter: hasFooter || hasButtonGroup && type !== 'fullscreen' || undefined
      }),
      UNSAFE_className: getContentStyles()
    },
    footer: {
      UNSAFE_className: classNames(dialogClassList.element('footer'), getFooterStyles())
    },
    buttonGroup: {
      ...toDataAttributes({
        hasFooter
      }),
      UNSAFE_className: classNames(dialogClassList.element('button-group'), getButtonGroupStyles()),
      align: 'end'
    }
  }), [hasButtonGroup, hasFooter, hasHeader, hasHeading, headingSize, titleProps, type]);
  const sizeVariant = getSizeVariant(type, size);
  const dialogStyleProps = useDialogStyleProps(props, sizeVariant);
  const gridStyleProps = useGridStyleProps({
    isDismissable,
    size: sizeVariant
  });
  return /*#__PURE__*/jsx("section", {
    ...dialogStyleProps,
    ...dialogProps,
    ref: domRef,
    children: /*#__PURE__*/jsxs(Grid, {
      ref: gridRef,
      ...gridStyleProps,
      children: [/*#__PURE__*/jsx(SlotProvider, {
        slots: slots,
        children: children
      }), isDismissable && /*#__PURE__*/jsx(ActionButton, {
        prominence: "low",
        "aria-label": stringFormatter.format('dismiss'),
        onPress: onDismiss,
        gridArea: "closeButton",
        UNSAFE_className: css({
          placeSelf: 'flex-start end',
          paddingInline: 0,
          marginBlock: `calc((${tokenSchema.size.element.regular} - ${tokenSchema.typography.heading[headingSize].capheight}) / 2 * -1)`,
          marginInlineEnd: `calc(${tokenSchema.size.space.medium} * -1)`,
          marginInlineStart: tokenSchema.size.space.regular
        }),
        children: /*#__PURE__*/jsx(Icon, {
          src: xIcon,
          size: "medium"
        })
      })]
    })
  });
});

// Utils
// =============================================================================
function getSizeVariant(type, size) {
  if (type === 'fullscreen') {
    return 'fullscreen';
  }
  if (type === 'popover') {
    return size || 'xsmall';
  }
  return size || 'medium';
}

// Styles
// =============================================================================

function useDialogStyleProps(props, sizeVariant) {
  let styleProps = useStyleProps(props);
  return {
    ...toDataAttributes({
      size: sizeVariant
    }),
    ...styleProps,
    className: classNames(dialogClassList.element('root'), css({
      display: 'flex',
      maxHeight: 'inherit',
      maxWidth: '100%',
      outline: 0,
      width: 'var(--dialog-width)',
      '--dialog-width': 'fit-content',
      '&[data-size="xsmall"]': {
        '--dialog-width': tokenSchema.size.dialog.xsmall
      },
      '&[data-size="small"]': {
        '--dialog-width': tokenSchema.size.dialog.small
      },
      '&[data-size="medium"]': {
        '--dialog-width': tokenSchema.size.dialog.medium
      },
      '&[data-size="large"]': {
        '--dialog-width': tokenSchema.size.dialog.large
      },
      '&[data-size="fullscreen"]': {
        maxHeight: 'none',
        maxWidth: 'none',
        height: '100%',
        '--dialog-width': '100%'
      }
    }), styleProps.className)
  };
}
function useGridStyleProps({
  isDismissable,
  size
}) {
  // NOTE: it's very tempting to use "gap" here but don't! It stops the grid
  // areas from collapsing, even when hidden or omitted.
  let gridStyles = css({
    display: 'grid',
    padding: tokenSchema.size.space.xxlarge,
    gridTemplateColumns: 'auto 1fr auto',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateAreas: `"heading header header"
      "content content content"
      "footer footer buttonGroup"`,
    width: '100%',
    '&[data-dismissable]': {
      gridTemplateColumns: 'auto 1fr auto minmax(0, auto)',
      gridTemplateAreas: `"heading header header closeButton"
        "content content content content"
        "footer footer footer footer"`,
      // slot styles
      [dialogClassList.selector('button-group')]: {
        display: 'none'
      }
    },
    // MOBILE SPECIFIC
    [breakpointQueries.below.tablet]: {
      padding: tokenSchema.size.space.xlarge,
      gridTemplateRows: 'auto auto 1fr auto',
      gridTemplateAreas: `"heading heading heading"
      "header header header"
        "content content content"
        "footer footer buttonGroup"`,
      '&[data-dismissable]': {
        gridTemplateAreas: `"heading heading closeButton"
          "header header header"
            "content content content"
            "footer footer buttonGroup"`
      }
    },
    // TABLET & ABOVE
    [breakpointQueries.above.mobile]: {
      '&[data-size="fullscreen"]': {
        gridTemplateAreas: `"heading header buttonGroup"
          "content content content"
          "footer footer footer"`
      }
    }
  });
  return {
    ...toDataAttributes({
      dismissable: isDismissable || undefined,
      size
    }),
    UNSAFE_className: classNames(dialogClassList.element('grid'), gridStyles)
  };
}

// Slots
// -----------------------------------------------------------------------------

function getHeadingStyles() {
  return css({
    alignSelf: 'center',
    gridArea: 'heading',
    paddingBottom: tokenSchema.size.space.large,
    [breakpointQueries.above.mobile]: {
      paddingBottom: tokenSchema.size.space.xlarge
    },
    '&[data-has-header=false]': {
      gridArea: 'heading-start / heading-start / header-end / header-end'
    }
  });
}
function getHeaderStyles() {
  return css({
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    gridArea: 'header',
    minWidth: 'fit-content',
    outline: 0,
    paddingBottom: tokenSchema.size.space.large,
    [breakpointQueries.above.mobile]: {
      justifyContent: 'flex-end',
      paddingBottom: tokenSchema.size.space.xlarge
    }
  });
}
function getContentStyles() {
  return css({
    gridArea: 'content',
    overflowX: 'hidden',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    // fixes two issues:
    // - focus rings get clipped by overflow: auto
    // - trimmed text (capsize) creates unwanted scrollbars
    padding: tokenSchema.size.space.regular,
    margin: `calc(${tokenSchema.size.space.regular} * -1)`
  });
}
function getButtonGroupStyles() {
  return css({
    gridArea: 'buttonGroup',
    minWidth: 0,
    marginInlineStart: tokenSchema.size.space.regular,
    paddingTop: tokenSchema.size.space.large,
    [breakpointQueries.above.mobile]: {
      paddingTop: tokenSchema.size.space.xlarge
    },
    [`${dialogClassList.selector('root')}:not([data-size=fullscreen]) &[data-has-footer=false]`]: {
      gridArea: 'footer-start / footer-start / buttonGroup-end / buttonGroup-end'
    },
    // correct consumer error; hide the button group when the dialog is dismissable
    [`${dialogClassList.selector('root')}[data-dismissable] &`]: {
      display: 'none'
    }
  });
}
function getFooterStyles() {
  return css({
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gridArea: 'footer',
    minWidth: 0,
    paddingTop: tokenSchema.size.space.large,
    [breakpointQueries.above.mobile]: {
      paddingTop: tokenSchema.size.space.xlarge
    }
  });
}

/**
 * AlertDialogs are a specific type of Dialog. They display important
 * information that users need to acknowledge.
 */
const AlertDialog = /*#__PURE__*/forwardRef(function AlertDialog(props, forwardedRef) {
  let {
    onClose = () => {}
  } = useContext(DialogContext) || {};
  let {
    autoFocusButton,
    cancelLabel,
    children,
    isPrimaryActionDisabled,
    isSecondaryActionDisabled,
    onCancel = () => {},
    onPrimaryAction = () => {},
    onSecondaryAction = () => {},
    primaryActionLabel,
    secondaryActionLabel,
    title,
    tone,
    ...otherProps
  } = props;
  let styleProps = useStyleProps(otherProps);
  return /*#__PURE__*/jsxs(Dialog, {
    role: "alertdialog",
    ref: forwardedRef,
    size: "small",
    UNSAFE_className: styleProps.className,
    UNSAFE_style: styleProps.style,
    children: [/*#__PURE__*/jsx(Heading, {
      children: title
    }), /*#__PURE__*/jsx(Content, {
      children: isReactText(children) ? /*#__PURE__*/jsx(Text, {
        children: children
      }) : children
    }), /*#__PURE__*/jsxs(ButtonGroup, {
      align: "end",
      children: [cancelLabel && /*#__PURE__*/jsx(Button, {
        onPress: () => chain(onClose(), onCancel()),
        autoFocus: autoFocusButton === 'cancel',
        prominence: secondaryActionLabel ? 'low' : undefined,
        children: cancelLabel
      }), secondaryActionLabel && /*#__PURE__*/jsx(Button, {
        onPress: () => chain(onClose(), onSecondaryAction()),
        autoFocus: autoFocusButton === 'secondary',
        isDisabled: isSecondaryActionDisabled,
        children: secondaryActionLabel
      }), /*#__PURE__*/jsx(Button, {
        prominence: "high",
        tone: tone,
        onPress: () => chain(onClose(), onPrimaryAction()),
        isDisabled: isPrimaryActionDisabled,
        autoFocus: autoFocusButton === 'primary',
        children: primaryActionLabel
      })]
    })]
  });
});

/**
 * A DialogContainer accepts a single Dialog as a child, and manages showing and hiding
 * it in a modal. Useful in cases where there is no trigger element
 * or when the trigger unmounts while the dialog is open.
 */
function DialogContainer(props) {
  let {
    children,
    type = 'modal',
    onDismiss,
    isDismissable,
    isKeyboardDismissDisabled
  } = props;
  let childArray = React.Children.toArray(children);
  if (childArray.length > 1) {
    throw new Error('Only a single child can be passed to DialogContainer.');
  }
  let lastChild = useRef(null);
  let child = /*#__PURE__*/React.isValidElement(childArray[0]) ? childArray[0] : null;
  if (child) {
    // @ts-ignore
    lastChild.current = child;
  }
  let context = {
    type,
    onClose: onDismiss,
    isDismissable
  };
  let state = useOverlayTriggerState({
    isOpen: !!child,
    onOpenChange: isOpen => {
      if (!isOpen) {
        onDismiss();
      }
    }
  });
  return /*#__PURE__*/jsx(Modal, {
    state: state,
    type: type,
    isDismissable: isDismissable,
    isKeyboardDismissDisabled: isKeyboardDismissDisabled,
    children: /*#__PURE__*/jsx(DialogContext.Provider, {
      value: context,
      children: lastChild.current
    })
  });
}

/** A dialog may be abstracted from its trigger; this hook provides access to context. */
function useDialogContainer() {
  const context = useContext(DialogContext);
  assert(!!context, 'Cannot call `useDialogContext` outside of `<DialogTrigger>` or `<DialogContainer>`.');
  return {
    type: context.type,
    dismiss() {
      context.onClose();
    }
  };
}

function DialogTrigger(props) {
  let {
    children,
    type = 'modal',
    mobileType = type === 'popover' ? 'modal' : type,
    hideArrow,
    targetRef,
    isDismissable,
    isKeyboardDismissDisabled,
    ...positionProps
  } = props;
  if (!Array.isArray(children) || children.length > 2) {
    throw new Error('DialogTrigger must have exactly 2 children');
  }
  // if a function is passed as the second child, it won't appear in toArray
  let [trigger, content] = children;

  // On small devices, show a modal or tray instead of a popover.
  let isMobile = useMediaQuery(breakpointQueries.below.tablet);
  if (isMobile) {
    // handle cases where desktop popovers need a close button for the mobile modal view
    if (type !== 'modal' && mobileType === 'modal') {
      isDismissable = true;
    }
    type = mobileType;
  }
  let state = useOverlayTriggerState(props);
  let wasOpen = useRef(false);
  wasOpen.current = state.isOpen;
  let isExiting = useRef(false);
  let onExiting = () => isExiting.current = true;
  let onExited = () => isExiting.current = false;

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      if ((wasOpen.current || isExiting.current) && type !== 'popover' && type !== 'tray') {
        console.warn('A DialogTrigger unmounted while open. This is likely due to being placed within a trigger that unmounts or inside a conditional. Consider using a DialogContainer instead.');
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (type === 'popover') {
    return /*#__PURE__*/jsx(PopoverTrigger, {
      ...positionProps,
      state: state,
      targetRef: targetRef,
      trigger: trigger,
      content: content,
      isKeyboardDismissDisabled: isKeyboardDismissDisabled,
      hideArrow: hideArrow
    });
  }
  let renderOverlay = () => {
    switch (type) {
      case 'fullscreen':
      case 'modal':
        return /*#__PURE__*/jsx(Modal, {
          state: state,
          isDismissable: type === 'modal' ? isDismissable : false,
          type: type,
          isKeyboardDismissDisabled: isKeyboardDismissDisabled,
          onExiting: onExiting,
          onExited: onExited,
          children: typeof content === 'function' ? content(state.close) : content
        });
      case 'tray':
        return /*#__PURE__*/jsx(Tray, {
          state: state,
          isKeyboardDismissDisabled: isKeyboardDismissDisabled,
          children: typeof content === 'function' ? content(state.close) : content
        });
    }
    assertNever(type);
  };
  return /*#__PURE__*/jsx(DialogTriggerBase, {
    type: type,
    state: state,
    isDismissable: isDismissable,
    trigger: trigger,
    overlay: renderOverlay()
  });
}

// Support DialogTrigger inside components using CollectionBuilder.
DialogTrigger.getCollectionNode = function* (props) {
  // @ts-ignore
  let [trigger] = Children.toArray(props.children);
  let [, content] = props.children;
  yield {
    element: trigger,
    wrapper: element => /*#__PURE__*/jsxs(DialogTrigger, {
      ...props,
      children: [element, content]
    }, element.key)
  };
};

/**
 * DialogTrigger serves as a wrapper around a Dialog and its associated trigger, linking the Dialog's
 * open state with the trigger's press state. Additionally, it allows you to customize the type and
 * positioning of the Dialog.
 */

// We don't want getCollectionNode to show up in the type definition
let _DialogTrigger = DialogTrigger;
function PopoverTrigger({
  state,
  targetRef,
  trigger,
  content,
  hideArrow,
  ...props
}) {
  let triggerRef = useRef(null);
  let {
    triggerProps,
    overlayProps
  } = useOverlayTrigger({
    type: 'dialog'
  }, state, triggerRef);
  let triggerPropsWithRef = {
    ...triggerProps,
    ref: targetRef ? undefined : triggerRef
  };
  let overlay = /*#__PURE__*/jsx(Popover, {
    ...props,
    hideArrow: hideArrow,
    triggerRef: targetRef || triggerRef,
    state: state,
    children: typeof content === 'function' ? content(state.close) : content
  });
  return /*#__PURE__*/jsx(DialogTriggerBase, {
    type: "popover",
    state: state,
    triggerProps: triggerPropsWithRef,
    dialogProps: overlayProps,
    trigger: trigger,
    overlay: overlay
  });
}
function DialogTriggerBase({
  type,
  state,
  isDismissable,
  dialogProps = {},
  triggerProps = {},
  overlay,
  trigger
}) {
  let context = {
    type,
    onClose: state.close,
    isDismissable,
    ...dialogProps
  };
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(PressResponder, {
      ...mergeProps(triggerProps, {
        onPress: state.open
      }),
      isPressed: state.isOpen && type !== 'modal' && type !== 'fullscreen',
      children: trigger
    }), /*#__PURE__*/jsx(DialogContext.Provider, {
      value: context,
      children: overlay
    })]
  });
}

export { AlertDialog, Dialog, DialogContainer, _DialogTrigger as DialogTrigger, useDialogContainer };
