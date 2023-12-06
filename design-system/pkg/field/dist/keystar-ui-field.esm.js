'use client';
import { useField } from '@react-aria/label';
import { Flex } from '@keystar/ui/layout';
import { css, tokenSchema, useStyleProps } from '@keystar/ui/style';
import { useTextStyles, Text } from '@keystar/ui/typography';
import { forwardRef, useId, useMemo } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { forwardRefWithAs } from '@keystar/ui/utils/ts';
import { jsxs, jsx } from 'react/jsx-runtime';
import { alertTriangleIcon } from '@keystar/ui/icon/icons/alertTriangleIcon';
import { Icon } from '@keystar/ui/icon';
import { SlotProvider } from '../../slots/dist/keystar-ui-slots.esm.js';

var localizedMessages = {
	"ar-AE": {
		"(optional)": "(اختياري)",
		"(required)": "(مطلوب)"
	},
	"bg-BG": {
		"(optional)": "(незадължително)",
		"(required)": "(задължително)"
	},
	"cs-CZ": {
		"(optional)": "(volitelně)",
		"(required)": "(požadováno)"
	},
	"da-DK": {
		"(optional)": "(valgfrit)",
		"(required)": "(obligatorisk)"
	},
	"de-DE": {
		"(optional)": "(optional)",
		"(required)": "(erforderlich)"
	},
	"el-GR": {
		"(optional)": "(προαιρετικό)",
		"(required)": "(απαιτείται)"
	},
	"en-US": {
		"(optional)": "(optional)",
		"(required)": "(required)"
	},
	"es-ES": {
		"(optional)": "(opcional)",
		"(required)": "(necesario)"
	},
	"et-EE": {
		"(optional)": "(valikuline)",
		"(required)": "(nõutav)"
	},
	"fi-FI": {
		"(optional)": "(valinnainen)",
		"(required)": "(pakollinen)"
	},
	"fr-FR": {
		"(optional)": "(facultatif)",
		"(required)": "(requis)"
	},
	"he-IL": {
		"(optional)": "(אופציונלי)",
		"(required)": "(נדרש)"
	},
	"hr-HR": {
		"(optional)": "(opcionalno)",
		"(required)": "(obvezno)"
	},
	"hu-HU": {
		"(optional)": "(opcionális)",
		"(required)": "(kötelező)"
	},
	"it-IT": {
		"(optional)": "(facoltativo)",
		"(required)": "(obbligatorio)"
	},
	"ja-JP": {
		"(optional)": "（オプション）",
		"(required)": "（必須）"
	},
	"ko-KR": {
		"(optional)": "(선택 사항)",
		"(required)": "(필수 사항)"
	},
	"lt-LT": {
		"(optional)": "(pasirenkama)",
		"(required)": "(privaloma)"
	},
	"lv-LV": {
		"(optional)": "(neobligāti)",
		"(required)": "(obligāti)"
	},
	"nb-NO": {
		"(optional)": "(valgfritt)",
		"(required)": "(obligatorisk)"
	},
	"nl-NL": {
		"(optional)": "(optioneel)",
		"(required)": "(vereist)"
	},
	"pl-PL": {
		"(optional)": "(opcjonalne)",
		"(required)": "(wymagane)"
	},
	"pt-BR": {
		"(optional)": "(opcional)",
		"(required)": "(obrigatório)"
	},
	"pt-PT": {
		"(optional)": "(opcional)",
		"(required)": "(obrigatório)"
	},
	"ro-RO": {
		"(optional)": "(opţional)",
		"(required)": "(obligatoriu)"
	},
	"ru-RU": {
		"(optional)": "(дополнительно)",
		"(required)": "(обязательно)"
	},
	"sk-SK": {
		"(optional)": "(nepovinné)",
		"(required)": "(povinné)"
	},
	"sl-SI": {
		"(optional)": "(opcijsko)",
		"(required)": "(obvezno)"
	},
	"sr-SP": {
		"(optional)": "(opciono)",
		"(required)": "(obavezno)"
	},
	"sv-SE": {
		"(optional)": "(valfritt)",
		"(required)": "(krävs)"
	},
	"tr-TR": {
		"(optional)": "(isteğe bağlı)",
		"(required)": "(gerekli)"
	},
	"uk-UA": {
		"(optional)": "(необов’язково)",
		"(required)": "(обов’язково)"
	},
	"zh-CN": {
		"(optional)": "（可选）",
		"(required)": "（必填）"
	},
	"zh-TW": {
		"(optional)": "(選填)",
		"(required)": "(必填)"
	}
};

const FieldLabel = forwardRefWithAs(function FieldLabel({
  children,
  elementType: ElementType = 'label',
  isRequired,
  supplementRequiredState,
  ...labelProps
}, forwardedRef) {
  const styleProps = useTextStyles({
    color: 'neutral',
    size: 'regular',
    trim: true,
    weight: 'medium',
    UNSAFE_className: css({
      cursor: 'default'
    })
  });
  return /*#__PURE__*/jsxs(ElementType, {
    ref: forwardedRef,
    ...labelProps,
    ...styleProps,
    children: [children, isRequired && /*#__PURE__*/jsx(Asterisk, {
      supplementRequiredState: supplementRequiredState
    })]
  });
});

/**
 * Display a required indicator for monitor users.
 *
 * In cases that don't include a semantic element for user input, describe the
 * required state for users of assistive technology.
 */
// NOTE: ideally this would be handled with the `aria-required` attribute, but
// that's not appropriate on buttons:
// > The attribute "aria-required" is not supported by the role button.
//
// It could go on the listbox, but the current implementation doesn't render the
// listbox until the dialog is open...
function Asterisk({
  supplementRequiredState
}) {
  let stringFormatter = useLocalizedStringFormatter(localizedMessages);
  return /*#__PURE__*/jsx("span", {
    "aria-label": supplementRequiredState ? stringFormatter.format('(required)') : undefined,
    children: /*#__PURE__*/jsx("span", {
      "aria-hidden": true,
      className: css({
        color: tokenSchema.color.foreground.critical,
        fontSize: tokenSchema.typography.text.large.size,
        lineHeight: 1,
        paddingInlineStart: '0.125em'
      }),
      children: "*"
    })
  });
}

const FieldMessage = props => {
  return /*#__PURE__*/jsxs(Flex, {
    gap: "regular",
    UNSAFE_className: css({
      marginTop: 'calc(var(--icon-offset) * -1)'
    }),
    UNSAFE_style: {
      // @ts-ignore
      '--icon-offset': `calc(${tokenSchema.size.icon.regular} - ${tokenSchema.typography.text.small.size})`
    },
    children: [/*#__PURE__*/jsx(Icon, {
      src: alertTriangleIcon,
      color: "critical"
    }), /*#__PURE__*/jsx(Text, {
      color: "critical",
      size: "small",
      UNSAFE_className: css({
        paddingTop: 'var(--icon-offset)'
      }),
      ...props
    })]
  });
};

const FieldPrimitive = /*#__PURE__*/forwardRef(function FieldPrimitive(props, forwardedRef) {
  const {
    children,
    contextualHelp,
    isRequired,
    label,
    labelElementType,
    labelProps,
    description,
    descriptionProps,
    errorMessage,
    errorMessageProps,
    supplementRequiredState
  } = props;
  const styleProps = useStyleProps(props);
  const contextualHelpId = useId();
  const contextualHelpSlots = useMemo(() => {
    return {
      // match capsize styles from the label text. stops the contextual help button
      // from pushing elements above/below it
      button: {
        UNSAFE_className: css({
          marginBottom: tokenSchema.typography.text.regular.capheightTrim,
          marginTop: tokenSchema.typography.text.regular.baselineTrim
        }),
        id: contextualHelpId,
        'aria-labelledby': labelProps !== null && labelProps !== void 0 && labelProps.id ? `${labelProps.id} ${contextualHelpId}` : undefined
      }
    };
  }, [contextualHelpId, labelProps === null || labelProps === void 0 ? void 0 : labelProps.id]);
  return /*#__PURE__*/jsxs(Flex, {
    ref: forwardedRef,
    direction: "column",
    gap: "medium",
    minWidth: 0,
    UNSAFE_className: styleProps.className,
    UNSAFE_style: styleProps.style,
    children: [(() => {
      if (!label) {
        return null;
      }
      const labelUI = /*#__PURE__*/jsx(FieldLabel, {
        elementType: labelElementType,
        isRequired: isRequired,
        supplementRequiredState: supplementRequiredState,
        ...labelProps,
        children: label
      });
      if (contextualHelp) {
        return /*#__PURE__*/jsxs(Flex, {
          gap: "small",
          alignItems: "center",
          children: [labelUI, /*#__PURE__*/jsx(SlotProvider, {
            slots: contextualHelpSlots,
            children: contextualHelp
          })]
        });
      }
      return labelUI;
    })(), description && /*#__PURE__*/jsx(Text, {
      ...descriptionProps,
      size: "small",
      color: "neutralSecondary",
      children: description
    }), children, errorMessage && /*#__PURE__*/jsx(FieldMessage, {
      ...errorMessageProps,
      children: errorMessage
    })]
  });
});

/**
 * Provides the accessibility implementation for input fields. Fields accept
 * user input, gain context from their label, and may display a description or
 * error message.
 */
const Field = props => {
  const {
    children,
    description,
    errorMessage,
    isDisabled,
    isReadOnly,
    isRequired,
    label,
    ...otherProps
  } = props;
  let {
    labelProps,
    fieldProps,
    descriptionProps,
    errorMessageProps
  } = useField(props);
  const renderProps = {
    ...fieldProps,
    disabled: isDisabled,
    readOnly: isReadOnly,
    'aria-required': isRequired || undefined,
    'aria-invalid': errorMessage ? true : undefined
  };
  return /*#__PURE__*/jsx(FieldPrimitive, {
    isRequired: isRequired,
    label: label,
    labelProps: labelProps,
    description: description,
    descriptionProps: descriptionProps,
    errorMessage: errorMessage,
    errorMessageProps: errorMessageProps,
    ...otherProps,
    children: children(renderProps)
  });
};

/**
 * Add `validationState` when `errorMessage` is provided. Used by
 * "@react-aria/*" hooks to determine aria attributes.
 */
function validateFieldProps(props) {
  if (props.errorMessage) {
    return Object.assign({}, {
      validationState: 'invalid'
    }, props);
  }
  return props;
}

export { Field, FieldLabel, FieldMessage, FieldPrimitive, validateFieldProps };