'use client';
import { forwardRef, useCallback } from 'react';
import { useHover, usePress } from '@react-aria/interactions';
import { useObjectRef, useLayoutEffect, chain } from '@react-aria/utils';
import { FieldPrimitive, validateFieldProps } from '@keystar/ui/field';
import { classNames, css, FocusRing, toDataAttributes, tokenSchema, transition } from '@keystar/ui/style';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useTextField } from '@react-aria/textfield';
import { warning } from 'emery';
import { useControlledState } from '@react-stately/utils';

/** Internal component for default appearance and behaviour. */
const TextFieldPrimitive = /*#__PURE__*/forwardRef(function TextFieldPrimitive(props, forwardedRef) {
  const {
    autoFocus,
    description,
    descriptionProps,
    endElement,
    errorMessage,
    errorMessageProps,
    id,
    inputProps,
    inputWrapperProps,
    isDisabled,
    isMultiline = false,
    isRequired,
    label,
    labelProps,
    startElement,
    ...otherProps
  } = props;
  const InputElement = isMultiline ? 'textarea' : 'input';
  let {
    hoverProps,
    isHovered
  } = useHover({
    isDisabled
  });
  let inputClassName = useTextFieldStyles();
  let inputRef = useObjectRef(forwardedRef);

  // Sits behind everything, should only trigger when the press is "through"
  // (e.g. `pointer-events: none`) a start or end element.
  // NOTE: When CSS supports the `:has()` selector, we can detect interactive
  // children and automatically apply pointer-event styles.
  let onIndicatorPressStart = () => {
    if (document.activeElement === inputRef.current) {
      return;
    }
    inputRef.current.focus();
  };
  let {
    pressProps
  } = usePress({
    isDisabled,
    onPressStart: onIndicatorPressStart,
    preventFocusOnPress: true
  });
  return /*#__PURE__*/jsx(FieldPrimitive, {
    isRequired: isRequired,
    description: description,
    descriptionProps: descriptionProps,
    errorMessage: errorMessage,
    errorMessageProps: errorMessageProps,
    label: label,
    labelProps: labelProps,
    ...otherProps,
    children: /*#__PURE__*/jsxs("div", {
      ...inputWrapperProps,
      ...hoverProps,
      className: classNames(css({
        display: 'flex',
        flex: '1 1 auto',
        position: 'relative',
        zIndex: 0
      }), inputWrapperProps === null || inputWrapperProps === void 0 ? void 0 : inputWrapperProps.className),
      children: [startElement, /*#__PURE__*/jsx(FocusRing, {
        autoFocus: autoFocus,
        isTextInput: true,
        children: /*#__PURE__*/jsx(InputElement, {
          ...inputProps,
          ...toDataAttributes({
            adornment: getAdornmentType(props),
            hovered: isHovered || undefined,
            multiline: isMultiline || undefined
          }),
          className: classNames(inputClassName, inputProps === null || inputProps === void 0 ? void 0 : inputProps.className),
          "data-adornment": getAdornmentType(props)
          // @ts-ignore FIXME: not sure how to properly resolve this type
          ,
          ref: inputRef,
          rows: isMultiline ? 1 : undefined
        })
      }), /*#__PURE__*/jsx(InputStateIndicator, {
        inputClassName: inputClassName,
        ...pressProps
      }), endElement]
    })
  });
});

// Styled components
// ----------------------------------------------------------------------------

function makeSiblingSelector(base) {
  return function siblingSelector(...selectors) {
    return selectors.map(s => `.${base}${s} + &`).join(', ');
  };
}
const InputStateIndicator = ({
  inputClassName,
  ...props
}) => {
  const s = makeSiblingSelector(inputClassName);
  return /*#__PURE__*/jsx("div", {
    role: "presentation",
    ...props,
    className: css({
      backgroundColor: tokenSchema.color.background.canvas,
      border: `${tokenSchema.size.border.regular} solid ${tokenSchema.color.alias.borderIdle}`,
      borderRadius: tokenSchema.size.radius.regular,
      cursor: 'text',
      inset: 0,
      position: 'absolute',
      transition: transition(['border-color', 'box-shadow']),
      zIndex: -1,
      [s('[data-hovered]')]: {
        borderColor: tokenSchema.color.alias.borderHovered
      },
      [s(':invalid', '[aria-invalid]')]: {
        borderColor: tokenSchema.color.alias.borderInvalid
      },
      [s(':focus')]: {
        borderColor: tokenSchema.color.alias.borderFocused
      },
      [s(':focus:not([readonly])')]: {
        boxShadow: `0 0 0 1px ${tokenSchema.color.alias.borderFocused}`
      },
      [s(':disabled', '[aria-disabled]')]: {
        backgroundColor: tokenSchema.color.background.surfaceSecondary,
        borderColor: 'transparent',
        cursor: 'auto'
      }
    })
  });
};
function useTextFieldStyles() {
  return css({
    color: tokenSchema.color.foreground.neutral,
    flex: 1,
    fontFamily: tokenSchema.typography.fontFamily.base,
    fontSize: tokenSchema.typography.text.regular.size,
    fontWeight: tokenSchema.typography.fontWeight.regular,
    height: tokenSchema.size.element.regular,
    lineHeight: tokenSchema.typography.lineheight.small,
    outline: 0,
    overflow: 'visible',
    paddingBlock: tokenSchema.size.space.small,
    paddingInline: tokenSchema.size.space.medium,
    position: 'relative',
    textIndent: 0,
    textOverflow: 'ellipsis',
    verticalAlign: 'top',
    width: '100%',
    MozOsxFontSmoothing: 'auto',
    WebkitFontSmoothing: 'auto',
    '::placeholder': {
      color: tokenSchema.color.foreground.neutralTertiary
    },
    '&:disabled, &[aria-disabled]': {
      color: tokenSchema.color.alias.foregroundDisabled,
      '::placeholder': {
        color: tokenSchema.color.alias.foregroundDisabled
      }
    },
    /* Remove the inner padding and cancel buttons for input[type="search"] in Chrome and Safari on macOS. */
    '&::-webkit-search-cancel-button, &::-webkit-search-decoration': {
      WebkitAppearance: 'none'
    },
    // TEXTAREA
    // ------------------------------

    '&[data-multiline]': {
      height: 'auto',
      lineHeight: tokenSchema.typography.lineheight.medium,
      minHeight: tokenSchema.size.scale['700'],
      overflow: 'auto',
      paddingBlock: tokenSchema.size.space.regular,
      resize: 'none'
    }
  });
}

// Utils
// ----------------------------------------------------------------------------

function getAdornmentType(props) {
  if (props.startElement && props.endElement) {
    return 'both';
  } else if (props.startElement) {
    return 'start';
  } else if (props.endElement) {
    return 'end';
  }
  return 'none';
}

function validateTextFieldProps(props) {
  // warn if `placeholder` is used without a `description` present
  warning(!props.placeholder || !!props.description, 'Placeholder text is not accessible. Use the `description` prop to provide information that will aid user input.');
  return validateFieldProps(props);
}

const TextField = /*#__PURE__*/forwardRef(function TextField(props, forwardedRef) {
  props = validateTextFieldProps(props);
  let domRef = useObjectRef(forwardedRef);
  let {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps
  } = useTextField(props, domRef);
  return /*#__PURE__*/jsx(TextFieldPrimitive, {
    ref: domRef,
    ...props,
    labelProps: labelProps,
    inputProps: inputProps,
    descriptionProps: descriptionProps,
    errorMessageProps: errorMessageProps
  });
});

const TextArea = /*#__PURE__*/forwardRef(function TextArea({
  onChange,
  ...props
}, forwardedRef) {
  props = validateTextFieldProps(props);
  let domRef = useObjectRef(forwardedRef);
  let [inputValue, setInputValue] = useControlledState(props.value, props.defaultValue, () => {});
  let onHeightChange = useCallback(() => {
    let input = domRef.current;
    // Auto-grow unless an explicit height is set.
    if (!props.height && input) {
      let prevOverflow = input.style.overflow;
      // Firefox scroll position fix https://bugzilla.mozilla.org/show_bug.cgi?id=1787062
      let isFirefox = ('MozAppearance' in input.style);
      if (!isFirefox) {
        input.style.overflow = 'hidden';
      }
      input.style.height = 'auto';
      // offsetHeight - clientHeight accounts for the border/padding.
      input.style.height = `${input.scrollHeight + (input.offsetHeight - input.clientHeight)}px`;
      input.style.overflow = prevOverflow;
    }
  }, [domRef, props.height]);
  useLayoutEffect(() => {
    if (domRef.current) {
      onHeightChange();
    }
  }, [onHeightChange, inputValue, domRef]);
  let {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps
  } = useTextField({
    ...props,
    onChange: chain(onChange, setInputValue),
    inputElementType: 'textarea'
  }, domRef);
  return /*#__PURE__*/jsx(TextFieldPrimitive, {
    ...props,
    ref: domRef,
    labelProps: labelProps,
    inputProps: inputProps,
    descriptionProps: descriptionProps,
    errorMessageProps: errorMessageProps,
    isMultiline: true
  });
});

export { TextArea, TextField, TextFieldPrimitive, validateTextFieldProps };
