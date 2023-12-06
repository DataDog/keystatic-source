'use client';
import { useLocale } from '@react-aria/i18n';
import { useNumberField } from '@react-aria/numberfield';
import { useObjectRef, mergeProps, filterDOMProps } from '@react-aria/utils';
import { useNumberFieldState } from '@react-stately/numberfield';
import { forwardRef } from 'react';
import { useProviderProps, useProvider } from '@keystar/ui/core';
import { toDataAttributes, classNames, css, tokenSchema, transition, onlyStyleProps } from '@keystar/ui/style';
import { TextFieldPrimitive } from '@keystar/ui/text-field';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { plusIcon } from '@keystar/ui/icon/icons/plusIcon';
import { minusIcon } from '@keystar/ui/icon/icons/minusIcon';
import { chevronDownIcon } from '@keystar/ui/icon/icons/chevronDownIcon';
import { chevronUpIcon } from '@keystar/ui/icon/icons/chevronUpIcon';
import { Icon } from '@keystar/ui/icon';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';

/** @private "step" buttons for incrementing and decrementing. */
const StepButton = /*#__PURE__*/forwardRef(function StepButton(props, forwardedRef) {
  props = useProviderProps(props);
  let {
    scale
  } = useProvider();
  let {
    direction
  } = props;
  let domRef = useObjectRef(forwardedRef);
  /**
   * Must use div for now because Safari pointer event bugs on disabled form elements.
   * Link https://bugs.webkit.org/show_bug.cgi?id=219188.
   */
  let {
    buttonProps,
    isPressed
  } = useButton({
    ...props,
    elementType: 'div'
  }, domRef);
  let {
    hoverProps,
    isHovered
  } = useHover(props);
  let incrementIcon = scale === 'large' ? plusIcon : chevronUpIcon;
  let decrementIcon = scale === 'large' ? minusIcon : chevronDownIcon;
  return /*#__PURE__*/jsxs("div", {
    ...toDataAttributes({
      direction,
      hovered: isHovered || undefined,
      pressed: isPressed || undefined,
      scale
    }),
    ...mergeProps(hoverProps, buttonProps),
    ref: domRef,
    className: classNames(css({
      alignItems: 'center',
      color: tokenSchema.color.alias.foregroundIdle,
      cursor: 'default',
      display: 'flex',
      justifyContent: 'center',
      transition: transition('border-color'),
      svg: {
        position: 'absolute' // stop SVG from taking space; affecting layout.
      },

      // states
      '&[data-hovered]': {
        backgroundColor: tokenSchema.color.alias.backgroundHovered,
        color: tokenSchema.color.alias.foregroundHovered
      },
      '&[data-pressed]': {
        backgroundColor: tokenSchema.color.alias.backgroundPressed
      },
      '&[aria-disabled=true]': {
        backgroundColor: tokenSchema.color.background.surfaceSecondary,
        color: tokenSchema.color.alias.foregroundDisabled
      },
      '&[data-direction=up]': {
        gridArea: 'increment'
      },
      '&[data-direction=down]': {
        gridArea: 'decrement'
      },
      // fine pointers
      '&:not([data-scale=large])': {
        '&[data-direction=up]': {
          borderStartStartRadius: tokenSchema.size.radius.small,
          borderStartEndRadius: tokenSchema.size.radius.small
        },
        '&[data-direction=down]': {
          borderEndStartRadius: tokenSchema.size.radius.small,
          borderEndEndRadius: tokenSchema.size.radius.small
        },
        svg: {
          width: tokenSchema.size.icon.small
        }
      },
      // coarse pointers
      '&[data-scale=large]': {
        '&[data-direction=up]': {
          borderStartEndRadius: tokenSchema.size.radius.regular,
          borderEndEndRadius: tokenSchema.size.radius.regular
        },
        '&[data-direction=down]': {
          borderEndStartRadius: tokenSchema.size.radius.regular,
          borderStartStartRadius: tokenSchema.size.radius.regular
        },
        'input:enabled ~ &': {
          border: `${tokenSchema.size.border.regular} solid ${tokenSchema.color.alias.borderIdle}`
        },
        'input:focus ~ &': {
          borderColor: tokenSchema.color.alias.borderFocused
        }
      }
    })),
    children: [direction === 'up' && /*#__PURE__*/jsx(Icon, {
      src: incrementIcon
    }), direction === 'down' && /*#__PURE__*/jsx(Icon, {
      src: decrementIcon
    })]
  });
});

/**
 * Number fields let users enter a numeric value and incrementally increase or
 * decrease the value with a step-button control.
 */
const NumberField = /*#__PURE__*/forwardRef(function NumberField(props, forwardedRef) {
  props = useProviderProps(props);
  let {
    isReadOnly,
    isDisabled,
    hideStepper,
    label,
    description
  } = props;
  let {
    locale
  } = useLocale();
  let state = useNumberFieldState({
    ...props,
    locale
  });
  let inputRef = useObjectRef(forwardedRef);
  let {
    groupProps,
    labelProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
    descriptionProps,
    errorMessageProps
  } = useNumberField(props, state, inputRef);
  let inputWrapperStyleProps = useInputWrapperStyleProps();
  return /*#__PURE__*/jsx(TextFieldPrimitive, {
    width: "alias.singleLineWidth",
    ...filterDOMProps(props),
    ...onlyStyleProps(props),
    label: label,
    description: description,
    descriptionProps: descriptionProps,
    errorMessageProps: errorMessageProps,
    labelProps: labelProps,
    inputWrapperProps: {
      ...groupProps,
      ...inputWrapperStyleProps
    },
    ref: inputRef,
    inputProps: inputProps,
    isDisabled: isDisabled,
    isReadOnly: isReadOnly
    // NOTE: step buttons must be a sibling of the `<input/>` AND after it
    // in the DOM, so we can respond to pseudo-classes.
    ,
    endElement: !hideStepper && /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx(StepButton, {
        direction: "up",
        ...incrementButtonProps
      }), /*#__PURE__*/jsx(StepButton, {
        direction: "down",
        ...decrementButtonProps
      })]
    })
  });
});
function useInputWrapperStyleProps() {
  let {
    scale
  } = useProvider();
  let className = css({
    display: 'grid',
    gap: tokenSchema.size.border.regular,
    gridTemplateColumns: `1fr calc(${tokenSchema.size.element.regular} - ${tokenSchema.size.border.regular} * 2) ${tokenSchema.size.border.regular}`,
    gridTemplateRows: `${tokenSchema.size.border.regular} auto auto ${tokenSchema.size.border.regular}`,
    gridTemplateAreas: '"field . ." "field increment ." "field decrement ." "field . ."',
    '&[data-scale="large"]': {
      gridTemplateColumns: `${tokenSchema.size.element.regular} 1fr ${tokenSchema.size.element.regular}`,
      gridTemplateRows: 'auto',
      gridTemplateAreas: '"decrement field increment"'
    },
    input: {
      gridArea: 'field'
    }
  });
  return {
    ...toDataAttributes({
      scale
    }),
    className
  };
}

export { NumberField };
