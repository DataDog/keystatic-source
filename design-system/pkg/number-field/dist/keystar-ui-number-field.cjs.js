'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var i18n = require('@react-aria/i18n');
var numberfield$1 = require('@react-aria/numberfield');
var utils = require('@react-aria/utils');
var numberfield = require('@react-stately/numberfield');
var React = require('react');
var core = require('@keystar/ui/core');
var style = require('@keystar/ui/style');
var textField = require('@keystar/ui/text-field');
var button = require('@react-aria/button');
var interactions = require('@react-aria/interactions');
var plusIcon = require('@keystar/ui/icon/icons/plusIcon');
var minusIcon = require('@keystar/ui/icon/icons/minusIcon');
var chevronDownIcon = require('@keystar/ui/icon/icons/chevronDownIcon');
var chevronUpIcon = require('@keystar/ui/icon/icons/chevronUpIcon');
var icon = require('@keystar/ui/icon');
var jsxRuntime = require('react/jsx-runtime');

/** @private "step" buttons for incrementing and decrementing. */
const StepButton = /*#__PURE__*/React.forwardRef(function StepButton(props, forwardedRef) {
  props = core.useProviderProps(props);
  let {
    scale
  } = core.useProvider();
  let {
    direction
  } = props;
  let domRef = utils.useObjectRef(forwardedRef);
  /**
   * Must use div for now because Safari pointer event bugs on disabled form elements.
   * Link https://bugs.webkit.org/show_bug.cgi?id=219188.
   */
  let {
    buttonProps,
    isPressed
  } = button.useButton({
    ...props,
    elementType: 'div'
  }, domRef);
  let {
    hoverProps,
    isHovered
  } = interactions.useHover(props);
  let incrementIcon = scale === 'large' ? plusIcon.plusIcon : chevronUpIcon.chevronUpIcon;
  let decrementIcon = scale === 'large' ? minusIcon.minusIcon : chevronDownIcon.chevronDownIcon;
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    ...style.toDataAttributes({
      direction,
      hovered: isHovered || undefined,
      pressed: isPressed || undefined,
      scale
    }),
    ...utils.mergeProps(hoverProps, buttonProps),
    ref: domRef,
    className: style.classNames(style.css({
      alignItems: 'center',
      color: style.tokenSchema.color.alias.foregroundIdle,
      cursor: 'default',
      display: 'flex',
      justifyContent: 'center',
      transition: style.transition('border-color'),
      svg: {
        position: 'absolute' // stop SVG from taking space; affecting layout.
      },

      // states
      '&[data-hovered]': {
        backgroundColor: style.tokenSchema.color.alias.backgroundHovered,
        color: style.tokenSchema.color.alias.foregroundHovered
      },
      '&[data-pressed]': {
        backgroundColor: style.tokenSchema.color.alias.backgroundPressed
      },
      '&[aria-disabled=true]': {
        backgroundColor: style.tokenSchema.color.background.surfaceSecondary,
        color: style.tokenSchema.color.alias.foregroundDisabled
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
          borderStartStartRadius: style.tokenSchema.size.radius.small,
          borderStartEndRadius: style.tokenSchema.size.radius.small
        },
        '&[data-direction=down]': {
          borderEndStartRadius: style.tokenSchema.size.radius.small,
          borderEndEndRadius: style.tokenSchema.size.radius.small
        },
        svg: {
          width: style.tokenSchema.size.icon.small
        }
      },
      // coarse pointers
      '&[data-scale=large]': {
        '&[data-direction=up]': {
          borderStartEndRadius: style.tokenSchema.size.radius.regular,
          borderEndEndRadius: style.tokenSchema.size.radius.regular
        },
        '&[data-direction=down]': {
          borderEndStartRadius: style.tokenSchema.size.radius.regular,
          borderStartStartRadius: style.tokenSchema.size.radius.regular
        },
        'input:enabled ~ &': {
          border: `${style.tokenSchema.size.border.regular} solid ${style.tokenSchema.color.alias.borderIdle}`
        },
        'input:focus ~ &': {
          borderColor: style.tokenSchema.color.alias.borderFocused
        }
      }
    })),
    children: [direction === 'up' && /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
      src: incrementIcon
    }), direction === 'down' && /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
      src: decrementIcon
    })]
  });
});

/**
 * Number fields let users enter a numeric value and incrementally increase or
 * decrease the value with a step-button control.
 */
const NumberField = /*#__PURE__*/React.forwardRef(function NumberField(props, forwardedRef) {
  props = core.useProviderProps(props);
  let {
    isReadOnly,
    isDisabled,
    hideStepper,
    label,
    description
  } = props;
  let {
    locale
  } = i18n.useLocale();
  let state = numberfield.useNumberFieldState({
    ...props,
    locale
  });
  let inputRef = utils.useObjectRef(forwardedRef);
  let {
    groupProps,
    labelProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
    descriptionProps,
    errorMessageProps
  } = numberfield$1.useNumberField(props, state, inputRef);
  let inputWrapperStyleProps = useInputWrapperStyleProps();
  return /*#__PURE__*/jsxRuntime.jsx(textField.TextFieldPrimitive, {
    width: "alias.singleLineWidth",
    ...utils.filterDOMProps(props),
    ...style.onlyStyleProps(props),
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
    endElement: !hideStepper && /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsx(StepButton, {
        direction: "up",
        ...incrementButtonProps
      }), /*#__PURE__*/jsxRuntime.jsx(StepButton, {
        direction: "down",
        ...decrementButtonProps
      })]
    })
  });
});
function useInputWrapperStyleProps() {
  let {
    scale
  } = core.useProvider();
  let className = style.css({
    display: 'grid',
    gap: style.tokenSchema.size.border.regular,
    gridTemplateColumns: `1fr calc(${style.tokenSchema.size.element.regular} - ${style.tokenSchema.size.border.regular} * 2) ${style.tokenSchema.size.border.regular}`,
    gridTemplateRows: `${style.tokenSchema.size.border.regular} auto auto ${style.tokenSchema.size.border.regular}`,
    gridTemplateAreas: '"field . ." "field increment ." "field decrement ." "field . ."',
    '&[data-scale="large"]': {
      gridTemplateColumns: `${style.tokenSchema.size.element.regular} 1fr ${style.tokenSchema.size.element.regular}`,
      gridTemplateRows: 'auto',
      gridTemplateAreas: '"decrement field increment"'
    },
    input: {
      gridArea: 'field'
    }
  });
  return {
    ...style.toDataAttributes({
      scale
    }),
    className
  };
}

exports.NumberField = NumberField;