'use client';
import { filterDOMProps } from '@react-aria/utils';
import React from 'react';
import { TOKEN_PREFIX } from '@keystar/ui/primitives';
import { useSlotProps } from '@keystar/ui/slots';
import { maybeTokenByKey, css, tokenSchema, useStyleProps, toDataAttributes, classNames } from '@keystar/ui/style';

const STROKE_VAR = `--${TOKEN_PREFIX}-icon-stroke`;
const Icon = props => {
  var _maybeTokenByKey;
  props = useSlotProps(props, 'icon');
  const {
    strokeScaling,
    size,
    color,
    ...otherProps
  } = props;
  const stroke = (_maybeTokenByKey = maybeTokenByKey('color.foreground', color)) !== null && _maybeTokenByKey !== void 0 ? _maybeTokenByKey : 'currentColor';
  const iconClassName = css({
    fill: 'none',
    stroke: `var(${STROKE_VAR})`,
    flexShrink: 0,
    height: tokenSchema.size.icon.regular,
    width: tokenSchema.size.icon.regular,
    '&[data-size=small]': {
      height: tokenSchema.size.icon.small,
      width: tokenSchema.size.icon.small
    },
    '&[data-size=medium]': {
      height: tokenSchema.size.icon.medium,
      width: tokenSchema.size.icon.medium
    },
    '&[data-size=large]': {
      height: tokenSchema.size.icon.large,
      width: tokenSchema.size.icon.large
    },
    // Maintain stroke width, no matter the size.
    // @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/vector-effect#non-scaling-stroke
    '&[data-stroke-scaling=false] > *': {
      vectorEffect: 'non-scaling-stroke'
    }
  });
  const styleProps = useStyleProps(otherProps);
  const hasAriaLabel = 'aria-label' in props && !!props['aria-label'];
  return /*#__PURE__*/React.cloneElement(props.src, {
    ...toDataAttributes({
      strokeScaling,
      size
    }),
    ...filterDOMProps(otherProps, {
      labelable: true
    }),
    'aria-hidden': !hasAriaLabel,
    focusable: 'false',
    role: 'img',
    className: classNames(iconClassName, styleProps.className),
    style: {
      [STROKE_VAR]: stroke,
      ...styleProps.style
    }
  });
};

export { Icon };
