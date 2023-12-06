import { cx, css } from '@emotion/css';
export { cache, css, injectGlobal, keyframes } from '@emotion/css';
import { isNumber, assert, typedKeys, typedEntries, assertNever, warning } from 'emery';
import { TOKEN_PREFIX } from '@keystar/ui/primitives';
import React, { useContext, useState, useLayoutEffect, Children, cloneElement, useEffect } from 'react';
import facepaint from 'facepaint';
import { jsx } from 'react/jsx-runtime';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { useIsSSR } from '@react-aria/ssr';

/**
 * Do not edit directly
 * Generated on Fri, 03 Nov 2023 05:52:12 GMT
 */

const tokenSchema = {
  animation: {
    duration: {
      short: 'var(--kui-animation-duration-short)',
      regular: 'var(--kui-animation-duration-regular)',
      long: 'var(--kui-animation-duration-long)',
      xlong: 'var(--kui-animation-duration-xlong)'
    },
    easing: {
      easeInOut: 'var(--kui-animation-easing-ease-in-out)',
      easeIn: 'var(--kui-animation-easing-ease-in)',
      easeOut: 'var(--kui-animation-easing-ease-out)'
    }
  },
  size: {
    alias: {
      focusRing: 'var(--kui-size-alias-focus-ring)',
      focusRingGap: 'var(--kui-size-alias-focus-ring-gap)',
      singleLineHeight: 'var(--kui-size-alias-single-line-height)',
      singleLineWidth: 'var(--kui-size-alias-single-line-width)'
    },
    element: {
      xsmall: 'var(--kui-size-element-xsmall)',
      small: 'var(--kui-size-element-small)',
      regular: 'var(--kui-size-element-regular)',
      medium: 'var(--kui-size-element-medium)',
      large: 'var(--kui-size-element-large)',
      xlarge: 'var(--kui-size-element-xlarge)'
    },
    icon: {
      small: 'var(--kui-size-icon-small)',
      regular: 'var(--kui-size-icon-regular)',
      medium: 'var(--kui-size-icon-medium)',
      large: 'var(--kui-size-icon-large)'
    },
    container: {
      xsmall: 'var(--kui-size-container-xsmall)',
      small: 'var(--kui-size-container-small)',
      medium: 'var(--kui-size-container-medium)',
      large: 'var(--kui-size-container-large)',
      xlarge: 'var(--kui-size-container-xlarge)'
    },
    dialog: {
      xsmall: 'var(--kui-size-dialog-xsmall)',
      small: 'var(--kui-size-dialog-small)',
      medium: 'var(--kui-size-dialog-medium)',
      large: 'var(--kui-size-dialog-large)'
    },
    border: {
      regular: 'var(--kui-size-border-regular)',
      medium: 'var(--kui-size-border-medium)',
      large: 'var(--kui-size-border-large)'
    },
    radius: {
      full: 'var(--kui-size-radius-full)',
      xsmall: 'var(--kui-size-radius-xsmall)',
      small: 'var(--kui-size-radius-small)',
      regular: 'var(--kui-size-radius-regular)',
      medium: 'var(--kui-size-radius-medium)',
      large: 'var(--kui-size-radius-large)',
      xlarge: 'var(--kui-size-radius-xlarge)'
    },
    shadow: {
      small: 'var(--kui-size-shadow-small)',
      medium: 'var(--kui-size-shadow-medium)',
      large: 'var(--kui-size-shadow-large)'
    },
    space: {
      xsmall: 'var(--kui-size-space-xsmall)',
      small: 'var(--kui-size-space-small)',
      regular: 'var(--kui-size-space-regular)',
      medium: 'var(--kui-size-space-medium)',
      large: 'var(--kui-size-space-large)',
      xlarge: 'var(--kui-size-space-xlarge)',
      xxlarge: 'var(--kui-size-space-xxlarge)'
    },
    scale: {
      '0': 'var(--kui-size-scale-0)',
      '10': 'var(--kui-size-scale-10)',
      '25': 'var(--kui-size-scale-25)',
      '40': 'var(--kui-size-scale-40)',
      '50': 'var(--kui-size-scale-50)',
      '65': 'var(--kui-size-scale-65)',
      '75': 'var(--kui-size-scale-75)',
      '85': 'var(--kui-size-scale-85)',
      '100': 'var(--kui-size-scale-100)',
      '115': 'var(--kui-size-scale-115)',
      '125': 'var(--kui-size-scale-125)',
      '130': 'var(--kui-size-scale-130)',
      '150': 'var(--kui-size-scale-150)',
      '160': 'var(--kui-size-scale-160)',
      '175': 'var(--kui-size-scale-175)',
      '200': 'var(--kui-size-scale-200)',
      '225': 'var(--kui-size-scale-225)',
      '250': 'var(--kui-size-scale-250)',
      '275': 'var(--kui-size-scale-275)',
      '300': 'var(--kui-size-scale-300)',
      '325': 'var(--kui-size-scale-325)',
      '350': 'var(--kui-size-scale-350)',
      '400': 'var(--kui-size-scale-400)',
      '450': 'var(--kui-size-scale-450)',
      '500': 'var(--kui-size-scale-500)',
      '550': 'var(--kui-size-scale-550)',
      '600': 'var(--kui-size-scale-600)',
      '675': 'var(--kui-size-scale-675)',
      '700': 'var(--kui-size-scale-700)',
      '800': 'var(--kui-size-scale-800)',
      '900': 'var(--kui-size-scale-900)',
      '1000': 'var(--kui-size-scale-1000)',
      '1200': 'var(--kui-size-scale-1200)',
      '1250': 'var(--kui-size-scale-1250)',
      '1600': 'var(--kui-size-scale-1600)',
      '1700': 'var(--kui-size-scale-1700)',
      '2000': 'var(--kui-size-scale-2000)',
      '2400': 'var(--kui-size-scale-2400)',
      '3000': 'var(--kui-size-scale-3000)',
      '3400': 'var(--kui-size-scale-3400)',
      '3600': 'var(--kui-size-scale-3600)',
      '4600': 'var(--kui-size-scale-4600)',
      '5000': 'var(--kui-size-scale-5000)',
      '6000': 'var(--kui-size-scale-6000)'
    }
  },
  typography: {
    fontFamily: {
      base: 'var(--kui-typography-font-family-base)',
      code: 'var(--kui-typography-font-family-code)'
    },
    fontWeight: {
      regular: 'var(--kui-typography-font-weight-regular)',
      medium: 'var(--kui-typography-font-weight-medium)',
      semibold: 'var(--kui-typography-font-weight-semibold)',
      bold: 'var(--kui-typography-font-weight-bold)'
    },
    lineheight: {
      large: 'var(--kui-typography-lineheight-large)',
      medium: 'var(--kui-typography-lineheight-medium)',
      small: 'var(--kui-typography-lineheight-small)'
    },
    text: {
      small: {
        size: 'var(--kui-typography-text-small-size)',
        lineheight: 'var(--kui-typography-text-small-lineheight)',
        baselineTrim: 'var(--kui-typography-text-small-baseline-trim)',
        capheightTrim: 'var(--kui-typography-text-small-capheight-trim)',
        capheight: 'var(--kui-typography-text-small-capheight)'
      },
      regular: {
        size: 'var(--kui-typography-text-regular-size)',
        lineheight: 'var(--kui-typography-text-regular-lineheight)',
        baselineTrim: 'var(--kui-typography-text-regular-baseline-trim)',
        capheightTrim: 'var(--kui-typography-text-regular-capheight-trim)',
        capheight: 'var(--kui-typography-text-regular-capheight)'
      },
      medium: {
        size: 'var(--kui-typography-text-medium-size)',
        lineheight: 'var(--kui-typography-text-medium-lineheight)',
        baselineTrim: 'var(--kui-typography-text-medium-baseline-trim)',
        capheightTrim: 'var(--kui-typography-text-medium-capheight-trim)',
        capheight: 'var(--kui-typography-text-medium-capheight)'
      },
      large: {
        size: 'var(--kui-typography-text-large-size)',
        lineheight: 'var(--kui-typography-text-large-lineheight)',
        baselineTrim: 'var(--kui-typography-text-large-baseline-trim)',
        capheightTrim: 'var(--kui-typography-text-large-capheight-trim)',
        capheight: 'var(--kui-typography-text-large-capheight)'
      }
    },
    heading: {
      small: {
        size: 'var(--kui-typography-heading-small-size)',
        lineheight: 'var(--kui-typography-heading-small-lineheight)',
        baselineTrim: 'var(--kui-typography-heading-small-baseline-trim)',
        capheightTrim: 'var(--kui-typography-heading-small-capheight-trim)',
        capheight: 'var(--kui-typography-heading-small-capheight)'
      },
      regular: {
        size: 'var(--kui-typography-heading-regular-size)',
        lineheight: 'var(--kui-typography-heading-regular-lineheight)',
        baselineTrim: 'var(--kui-typography-heading-regular-baseline-trim)',
        capheightTrim: 'var(--kui-typography-heading-regular-capheight-trim)',
        capheight: 'var(--kui-typography-heading-regular-capheight)'
      },
      medium: {
        size: 'var(--kui-typography-heading-medium-size)',
        lineheight: 'var(--kui-typography-heading-medium-lineheight)',
        baselineTrim: 'var(--kui-typography-heading-medium-baseline-trim)',
        capheightTrim: 'var(--kui-typography-heading-medium-capheight-trim)',
        capheight: 'var(--kui-typography-heading-medium-capheight)'
      },
      large: {
        size: 'var(--kui-typography-heading-large-size)',
        lineheight: 'var(--kui-typography-heading-large-lineheight)',
        baselineTrim: 'var(--kui-typography-heading-large-baseline-trim)',
        capheightTrim: 'var(--kui-typography-heading-large-capheight-trim)',
        capheight: 'var(--kui-typography-heading-large-capheight)'
      }
    }
  },
  color: {
    alias: {
      blanket: 'var(--kui-color-alias-blanket)',
      backgroundIdle: 'var(--kui-color-alias-background-idle)',
      backgroundDisabled: 'var(--kui-color-alias-background-disabled)',
      backgroundHovered: 'var(--kui-color-alias-background-hovered)',
      backgroundFocused: 'var(--kui-color-alias-background-focused)',
      backgroundPressed: 'var(--kui-color-alias-background-pressed)',
      backgroundSelected: 'var(--kui-color-alias-background-selected)',
      backgroundSelectedHovered: 'var(--kui-color-alias-background-selected-hovered)',
      focusRing: 'var(--kui-color-alias-focus-ring)',
      borderIdle: 'var(--kui-color-alias-border-idle)',
      borderHovered: 'var(--kui-color-alias-border-hovered)',
      borderPressed: 'var(--kui-color-alias-border-pressed)',
      borderFocused: 'var(--kui-color-alias-border-focused)',
      borderDisabled: 'var(--kui-color-alias-border-disabled)',
      borderSelected: 'var(--kui-color-alias-border-selected)',
      borderInvalid: 'var(--kui-color-alias-border-invalid)',
      foregroundIdle: 'var(--kui-color-alias-foreground-idle)',
      foregroundHovered: 'var(--kui-color-alias-foreground-hovered)',
      foregroundPressed: 'var(--kui-color-alias-foreground-pressed)',
      foregroundFocused: 'var(--kui-color-alias-foreground-focused)',
      foregroundDisabled: 'var(--kui-color-alias-foreground-disabled)',
      foregroundSelected: 'var(--kui-color-alias-foreground-selected)'
    },
    background: {
      canvas: 'var(--kui-color-background-canvas)',
      surface: 'var(--kui-color-background-surface)',
      surfaceSecondary: 'var(--kui-color-background-surface-secondary)',
      surfaceTertiary: 'var(--kui-color-background-surface-tertiary)',
      inverse: 'var(--kui-color-background-inverse)',
      accent: 'var(--kui-color-background-accent)',
      accentEmphasis: 'var(--kui-color-background-accent-emphasis)',
      positive: 'var(--kui-color-background-positive)',
      positiveEmphasis: 'var(--kui-color-background-positive-emphasis)',
      caution: 'var(--kui-color-background-caution)',
      cautionEmphasis: 'var(--kui-color-background-caution-emphasis)',
      critical: 'var(--kui-color-background-critical)',
      criticalEmphasis: 'var(--kui-color-background-critical-emphasis)',
      pending: 'var(--kui-color-background-pending)',
      pendingEmphasis: 'var(--kui-color-background-pending-emphasis)',
      highlight: 'var(--kui-color-background-highlight)',
      highlightEmphasis: 'var(--kui-color-background-highlight-emphasis)'
    },
    border: {
      muted: 'var(--kui-color-border-muted)',
      neutral: 'var(--kui-color-border-neutral)',
      emphasis: 'var(--kui-color-border-emphasis)',
      accent: 'var(--kui-color-border-accent)',
      positive: 'var(--kui-color-border-positive)',
      caution: 'var(--kui-color-border-caution)',
      critical: 'var(--kui-color-border-critical)',
      pending: 'var(--kui-color-border-pending)',
      highlight: 'var(--kui-color-border-highlight)'
    },
    foreground: {
      neutral: 'var(--kui-color-foreground-neutral)',
      neutralEmphasis: 'var(--kui-color-foreground-neutral-emphasis)',
      neutralSecondary: 'var(--kui-color-foreground-neutral-secondary)',
      neutralTertiary: 'var(--kui-color-foreground-neutral-tertiary)',
      onEmphasis: 'var(--kui-color-foreground-on-emphasis)',
      inverse: 'var(--kui-color-foreground-inverse)',
      inverseSecondary: 'var(--kui-color-foreground-inverse-secondary)',
      accent: 'var(--kui-color-foreground-accent)',
      positive: 'var(--kui-color-foreground-positive)',
      caution: 'var(--kui-color-foreground-caution)',
      critical: 'var(--kui-color-foreground-critical)',
      pending: 'var(--kui-color-foreground-pending)',
      highlight: 'var(--kui-color-foreground-highlight)'
    },
    shadow: {
      muted: 'var(--kui-color-shadow-muted)',
      regular: 'var(--kui-color-shadow-regular)',
      emphasis: 'var(--kui-color-shadow-emphasis)'
    },
    scale: {
      black: 'var(--kui-color-scale-black)',
      white: 'var(--kui-color-scale-white)',
      amber1: 'var(--kui-color-scale-amber1)',
      amber2: 'var(--kui-color-scale-amber2)',
      amber3: 'var(--kui-color-scale-amber3)',
      amber4: 'var(--kui-color-scale-amber4)',
      amber5: 'var(--kui-color-scale-amber5)',
      amber6: 'var(--kui-color-scale-amber6)',
      amber7: 'var(--kui-color-scale-amber7)',
      amber8: 'var(--kui-color-scale-amber8)',
      amber9: 'var(--kui-color-scale-amber9)',
      amber10: 'var(--kui-color-scale-amber10)',
      amber11: 'var(--kui-color-scale-amber11)',
      green1: 'var(--kui-color-scale-green1)',
      green2: 'var(--kui-color-scale-green2)',
      green3: 'var(--kui-color-scale-green3)',
      green4: 'var(--kui-color-scale-green4)',
      green5: 'var(--kui-color-scale-green5)',
      green6: 'var(--kui-color-scale-green6)',
      green7: 'var(--kui-color-scale-green7)',
      green8: 'var(--kui-color-scale-green8)',
      green9: 'var(--kui-color-scale-green9)',
      green10: 'var(--kui-color-scale-green10)',
      green11: 'var(--kui-color-scale-green11)',
      indigo1: 'var(--kui-color-scale-indigo1)',
      indigo2: 'var(--kui-color-scale-indigo2)',
      indigo3: 'var(--kui-color-scale-indigo3)',
      indigo4: 'var(--kui-color-scale-indigo4)',
      indigo5: 'var(--kui-color-scale-indigo5)',
      indigo6: 'var(--kui-color-scale-indigo6)',
      indigo7: 'var(--kui-color-scale-indigo7)',
      indigo8: 'var(--kui-color-scale-indigo8)',
      indigo9: 'var(--kui-color-scale-indigo9)',
      indigo10: 'var(--kui-color-scale-indigo10)',
      indigo11: 'var(--kui-color-scale-indigo11)',
      pink1: 'var(--kui-color-scale-pink1)',
      pink2: 'var(--kui-color-scale-pink2)',
      pink3: 'var(--kui-color-scale-pink3)',
      pink4: 'var(--kui-color-scale-pink4)',
      pink5: 'var(--kui-color-scale-pink5)',
      pink6: 'var(--kui-color-scale-pink6)',
      pink7: 'var(--kui-color-scale-pink7)',
      pink8: 'var(--kui-color-scale-pink8)',
      pink9: 'var(--kui-color-scale-pink9)',
      pink10: 'var(--kui-color-scale-pink10)',
      pink11: 'var(--kui-color-scale-pink11)',
      purple1: 'var(--kui-color-scale-purple1)',
      purple2: 'var(--kui-color-scale-purple2)',
      purple3: 'var(--kui-color-scale-purple3)',
      purple4: 'var(--kui-color-scale-purple4)',
      purple5: 'var(--kui-color-scale-purple5)',
      purple6: 'var(--kui-color-scale-purple6)',
      purple7: 'var(--kui-color-scale-purple7)',
      purple8: 'var(--kui-color-scale-purple8)',
      purple9: 'var(--kui-color-scale-purple9)',
      purple10: 'var(--kui-color-scale-purple10)',
      purple11: 'var(--kui-color-scale-purple11)',
      red1: 'var(--kui-color-scale-red1)',
      red2: 'var(--kui-color-scale-red2)',
      red3: 'var(--kui-color-scale-red3)',
      red4: 'var(--kui-color-scale-red4)',
      red5: 'var(--kui-color-scale-red5)',
      red6: 'var(--kui-color-scale-red6)',
      red7: 'var(--kui-color-scale-red7)',
      red8: 'var(--kui-color-scale-red8)',
      red9: 'var(--kui-color-scale-red9)',
      red10: 'var(--kui-color-scale-red10)',
      red11: 'var(--kui-color-scale-red11)',
      slate1: 'var(--kui-color-scale-slate1)',
      slate2: 'var(--kui-color-scale-slate2)',
      slate3: 'var(--kui-color-scale-slate3)',
      slate4: 'var(--kui-color-scale-slate4)',
      slate5: 'var(--kui-color-scale-slate5)',
      slate6: 'var(--kui-color-scale-slate6)',
      slate7: 'var(--kui-color-scale-slate7)',
      slate8: 'var(--kui-color-scale-slate8)',
      slate9: 'var(--kui-color-scale-slate9)',
      slate10: 'var(--kui-color-scale-slate10)',
      slate11: 'var(--kui-color-scale-slate11)'
    }
  }
};

/** Helper function for resolving animation tokens.  */
function transition(prop, options = {}) {
  let {
    delay = 0,
    duration = 'short',
    easing = 'easeInOut'
  } = options;
  let easingValue = easing === 'linear' ? 'linear' : tokenSchema.animation.easing[easing];
  let durationValue = resolveDuration(duration);
  if (Array.isArray(prop)) {
    return prop.map(p => transition(p, options)).join(', ');
  }
  return `${prop} ${durationValue} ${easingValue}` + (delay ? ` ${resolveDuration(delay)}` : '');
}
function resolveDuration(duration) {
  return isNumber(duration) ? `${duration}ms` : tokenSchema.animation.duration[duration];
}

const classNamePrefix = TOKEN_PREFIX;
const resetClassName = voussoirClassName('reset');
function voussoirClassName(className) {
  return `${classNamePrefix}:${className}`;
}

/**
 * A thin wrapper around [Emotion's `cx`
 * function](https://emotion.sh/docs/@emotion/css#cx) that includes the reset
 * class name.
 */
function classNames(...inputs) {
  let resolved = cx(inputs);
  if (resolved.includes(resetClassName)) {
    return resolved;
  }
  return cx(resetClassName, resolved);
}

/**
 * A ClassList organises component class names with appropriate prefixes,
 * offering strongly-typed methods for declaration in JSX and styles.
 */
class ClassList {
  /** The component name for this class list. */
  #componentName;
  /** The root class name. */
  #root;
  /** The list of element class names. */
  #elements;
  constructor(componentName, elements = []) {
    this.#componentName = componentName;
    this.#root = voussoirClassName(componentName);
    this.#elements = new Map(elements.map(element => [element, `${this.#root}-${element}`]));
  }
  element(name) {
    if (name === 'root') {
      return this.#root;
    }
    let className = this.#elements.get(name);
    assert(!!className, `Element "${name}" not found in "${this.#componentName}" class list. All elements must be defined when the ClassList is instantiated.`);
    return className;
  }
  selector(element, combinator) {
    let className = this.element(element);
    if (!combinator) {
      return safeClassName(className);
    }
    return combinators[combinator] + safeClassName(className);
  }
}
function safeClassName(className) {
  return `.${className.replace(/:/g, '\\:')}`;
}
const combinators = {
  descendant: '& ',
  child: '& > ',
  sibling: '& ~ ',
  'adjacent-sibling': '& + '
};

// Breakpoints
// ----------------------------------------------------------------------------
const breakpoints = {
  mobile: 0,
  tablet: 740,
  desktop: 992,
  wide: 1200
};

// external stuff for composing responsive styles
const mediaAbove = bp => `@media (min-width: ${bp}px)`;
const mediaBelow = bp => `@media (max-width: ${bp - 1}px)`;
const containerAbove = bp => `@container (min-width: ${bp}px)`;
const containerBelow = bp => `@container (max-width: ${bp - 1}px)`;
const breakpointQueries$1 = {
  above: {
    mobile: mediaAbove(breakpoints.tablet),
    tablet: mediaAbove(breakpoints.desktop),
    desktop: mediaAbove(breakpoints.wide)
  },
  below: {
    tablet: mediaBelow(breakpoints.tablet),
    desktop: mediaBelow(breakpoints.desktop),
    wide: mediaBelow(breakpoints.wide)
  }
};
const containerQueries = {
  above: {
    mobile: containerAbove(breakpoints.tablet),
    tablet: containerAbove(breakpoints.desktop),
    desktop: containerAbove(breakpoints.wide)
  },
  below: {
    tablet: containerBelow(breakpoints.tablet),
    desktop: containerBelow(breakpoints.desktop),
    wide: containerBelow(breakpoints.wide)
  }
};

// internal stuff, mostly for `useStyleProps` hook
const breakpointNames = typedKeys(breakpoints);
const {
  mobile: _mobile$1,
  ...breakpointsWithoutMobile$1
} = breakpoints;
const mediaQueries = Object.values(breakpointsWithoutMobile$1).map(mediaAbove);
const mapToMediaQueries = facepaint(mediaQueries);

// CSS Utils
// ----------------------------------------------------------------------------

function mapResponsiveValue(propResolver, value) {
  if (value == null) {
    return null;
  }

  // NOTE: grid layout primitive supports array values
  if (typeof value === 'object' && !Array.isArray(value)) {
    return objectToArray(propResolver, value);
  }
  return propResolver(value);
}
function objectToArray(propResolver, value) {
  const valueArray = [];
  for (let i = 0; i < breakpointNames.length; i++) {
    const key = breakpointNames[i];
    valueArray.push(value[key] != null ? propResolver(value[key]) : null);
  }
  return valueArray;
}

// JS Utils
// ----------------------------------------------------------------------------

function getResponsiveProp(prop, matchedBreakpoints) {
  if (typeof prop === 'object' && prop !== null) {
    for (let i = 0; i < matchedBreakpoints.length; i++) {
      let value = prop[matchedBreakpoints[i]];
      if (value != null) {
        return value;
      }
    }
    // @ts-ignore FIXME
    return prop.mobile;
  }
  return prop;
}
function getResponsiveRange(range, matchedBreakpoints) {
  if (typeof range === 'boolean') {
    return range;
  }
  if (!('above' in range) && !('below' in range)) {
    return getResponsiveProp(range, matchedBreakpoints);
  }
  const startIndex = 'above' in range ? breakpointNames.indexOf(range.above) + 1 : 0;
  const endIndex = 'below' in range ? breakpointNames.indexOf(range.below) - 1 : breakpointNames.length - 1;
  const prop = Object.fromEntries(breakpointNames.map((key, index) => {
    return [key, index >= startIndex && index <= endIndex];
  }));
  return getResponsiveProp(prop, matchedBreakpoints);
}

const Context = /*#__PURE__*/React.createContext(['mobile']);
function BreakpointProvider(props) {
  const {
    children,
    value
  } = props;
  return /*#__PURE__*/jsx(Context.Provider, {
    value: value,
    children: children
  });
}
function useBreakpoint() {
  return useContext(Context);
}
/**
 * The function returned from this hook will resolve values in a mobile-first
 * manner based on the breakpoint the browser viewport currently falls within
 * (mobile, tablet, desktop or wide).
 *
 * @caution The returned function returns `value.mobile` when rendering
 * server-side or statically, so you should avoid this hook where possible.
 * Responsive props and media queries are preferable in most cases.
 */
function useResponsiveValue() {
  const bp = useBreakpoint();
  return function responsiveValue(value) {
    return getResponsiveProp(value, bp);
  };
}

// Utils
// ----------------------------------------------------------------------------

const {
  mobile: _mobile,
  ...breakpointsWithoutMobile
} = breakpoints;
const breakpointEntries = typedEntries(breakpointsWithoutMobile).sort(([, valueA], [, valueB]) => valueB - valueA);
const breakpointQueries = breakpointEntries.map(([, value]) => `(min-width: ${value}px)`);
const useLayoutEffectIgnoreOnServer = typeof window === 'undefined' ? () => {} : useLayoutEffect;
const supportsMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia === 'function';
function useMatchedBreakpoints() {
  const [breakpoint, setBreakpoint] = useState(() => ['mobile']);
  useLayoutEffectIgnoreOnServer(() => {
    if (!supportsMatchMedia) {
      return;
    }
    const onResize = () => {
      setBreakpoint(prevMatchedBreakpoints => {
        const matched = [];
        for (let i in breakpointQueries) {
          let query = breakpointQueries[i];
          if (window.matchMedia(query).matches) {
            matched.push(breakpointEntries[i][0]);
          }
        }
        matched.push('mobile');
        if (prevMatchedBreakpoints.length !== matched.length || prevMatchedBreakpoints.some((breakpoint, idx) => breakpoint !== matched[idx])) {
          return matched;
        }
        return prevMatchedBreakpoints;
      });
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return breakpoint;
}
function useResponsiveRange() {
  let matchedBreakpoints = useBreakpoint();
  return function responsiveRange(range) {
    return getResponsiveRange(range, matchedBreakpoints);
  };
}

// Utils
// ----------------------------------------------------------------------------
function get(val, path) {
  for (const part of path.split('.')) {
    if (typeof val !== 'object' || val === null || !Object.prototype.hasOwnProperty.call(val, part)) {
      return;
    }
    val = val[part];
  }
  return val;
}
function maybeTokenByKey(path, keyOrValue) {
  var _get;
  if (typeof keyOrValue !== 'string') {
    return keyOrValue;
  }

  // let folks go rouge, why not?
  path = keyOrValue.includes('.') ? keyOrValue : `${path}.${keyOrValue}`;
  return (_get = get(tokenSchema, path)) !== null && _get !== void 0 ? _get : keyOrValue;
}
function resolvePropWithPath(prop, path) {
  const resolver = value => maybeTokenByKey(path, value);
  return [prop, resolver];
}

// default
const identity = value => value;
function resolveProp(prop, fn = identity) {
  return [prop, fn];
}

// common
function border(prop) {
  const resolver = value => {
    const color = maybeTokenByKey('color.border', value);
    return `${tokenSchema.size.border.regular} solid ${color}`;
  };
  return [prop, resolver];
}
function isDimensionKey(value) {
  let [prop, key] = value.split('.');
  if (!prop || !key) {
    return false;
  }
  // @ts-expect-error
  return !!tokenSchema.size[prop][key];
}
function sizeResolver(value) {
  if (typeof value === 'number') {
    if (value === 0) {
      return `${value}px`;
    }
    assertNever(value);
  }
  if (isDimensionKey(value)) {
    let [prop, key] = value.split('.');
    // @ts-expect-error
    return tokenSchema.size[prop][key];
  }
  if (value === 'auto' || value === 'inherit' || value === '100%' || value === '100vh' || value === '100vw') {
    return value;
  }
  assertNever(value);
}
function size(cssProp) {
  return [cssProp, sizeResolver];
}
function space(prop) {
  return resolvePropWithPath(prop, 'size.space');
}
function radius(prop) {
  return resolvePropWithPath(prop, 'size.radius');
}

// Config
// ----------------------------------------------------------------------------

const defaultStyleProps = {
  // color
  backgroundColor: resolvePropWithPath('backgroundColor', 'color.background'),
  boxShadow: ['boxShadow', boxShadowResolver],
  // dimension
  height: size('height'),
  maxHeight: size('maxHeight'),
  minHeight: size('minHeight'),
  maxWidth: size('maxWidth'),
  minWidth: size('minWidth'),
  width: size('width'),
  // space
  margin: space('margin'),
  marginStart: space('marginInlineStart'),
  marginEnd: space('marginInlineEnd'),
  marginTop: space('marginBlockStart'),
  marginBottom: space('marginBlockEnd'),
  marginX: space('marginInline'),
  marginY: space('marginBlock'),
  padding: space('padding'),
  paddingStart: space('paddingInlineStart'),
  paddingEnd: space('paddingInlineEnd'),
  paddingTop: space('paddingBlockStart'),
  paddingBottom: space('paddingBlockEnd'),
  paddingX: space('paddingInline'),
  paddingY: space('paddingBlock'),
  // border
  border: border('border'),
  borderStart: border('borderInlineStart'),
  borderEnd: border('borderInlineEnd'),
  borderTop: border('borderTop'),
  borderBottom: border('borderBottom'),
  borderColor: resolvePropWithPath('borderColor', 'color.border'),
  borderStartColor: resolvePropWithPath('borderInlineStartColor', 'color.border'),
  borderEndColor: resolvePropWithPath('borderInlineEndColor', 'color.border'),
  borderTopColor: resolvePropWithPath('borderTopColor', 'color.border'),
  borderBottomColor: resolvePropWithPath('borderBottomColor', 'color.border'),
  borderStyle: resolveProp('borderStyle'),
  borderStartStyle: resolveProp('borderInlineStartStyle'),
  borderEndStyle: resolveProp('borderInlineEndStyle'),
  borderTopStyle: resolveProp('borderTopStyle'),
  borderBottomStyle: resolveProp('borderBottomStyle'),
  borderWidth: resolvePropWithPath('borderWidth', 'size.border'),
  borderStartWidth: resolvePropWithPath('borderInlineStartWidth', 'size.border'),
  borderEndWidth: resolvePropWithPath('borderInlineEndWidth', 'size.border'),
  borderTopWidth: resolvePropWithPath('borderTopWidth', 'size.border'),
  borderBottomWidth: resolvePropWithPath('borderBottomWidth', 'size.border'),
  borderRadius: radius('borderRadius'),
  borderTopStartRadius: radius('borderStartStartRadius'),
  borderTopEndRadius: radius('borderStartEndRadius'),
  borderBottomStartRadius: radius('borderEndStartRadius'),
  borderBottomEndRadius: radius('borderEndEndRadius'),
  borderTopRadius: radius(['borderStartStartRadius', 'borderStartEndRadius']),
  borderBottomRadius: radius(['borderEndStartRadius', 'borderEndEndRadius']),
  borderStartRadius: radius(['borderStartStartRadius', 'borderEndStartRadius']),
  borderEndRadius: radius(['borderEndEndRadius', 'borderStartEndRadius']),
  // position
  inset: space('inset'),
  insetBottom: space('insetBlockEnd'),
  insetEnd: space('insetInlineEnd'),
  insetStart: space('insetInlineStart'),
  insetTop: space('insetBlockStart'),
  insetX: space('insetInline'),
  insetY: space('insetBlock'),
  position: resolveProp('position'),
  zIndex: resolveProp('zIndex'),
  // flex child
  order: resolveProp('order'),
  alignSelf: resolveProp('alignSelf'),
  flex: resolveProp('flex', flexResolver),
  flexBasis: size('flexBasis'),
  flexGrow: resolveProp('flexGrow', flexResolver),
  flexShrink: resolveProp('flexShrink', flexResolver),
  justifySelf: resolveProp('justifySelf'),
  // grid child
  gridArea: resolveProp('gridArea'),
  gridColumn: resolveProp('gridColumn'),
  gridColumnEnd: resolveProp('gridColumnEnd'),
  gridColumnStart: resolveProp('gridColumnStart'),
  gridRow: resolveProp('gridRow'),
  gridRowEnd: resolveProp('gridRowEnd'),
  gridRowStart: resolveProp('gridRowStart'),
  // misc. non-theme related
  cursor: resolveProp('cursor'),
  opacity: resolveProp('opacity'),
  pointerEvents: resolveProp('pointerEvents'),
  overflow: resolveProp('overflow'),
  userSelect: resolveProp('userSelect')
};

// Unique
// ----------------------------------------------------------------------------

function flexResolver(value) {
  if (typeof value === 'boolean') {
    return value ? '1' : undefined;
  }
  return '' + value;
}
function boxShadowResolver(value) {
  const sizeToColorKey = {
    small: 'muted',
    medium: 'regular',
    large: 'emphasis'
  };
  const [sizeKey, maybeColorKey] = value.split(' ');
  const color = maybeTokenByKey('color.shadow', maybeColorKey !== null && maybeColorKey !== void 0 ? maybeColorKey : sizeToColorKey[sizeKey]);
  const size = maybeTokenByKey('size.shadow', sizeKey);
  return `${size} ${color}`;
}

const defaultStyleKeys = Object.keys(defaultStyleProps);

/**
 * Filters out style props.
 * @param props - The component props to be filtered.
 * @param otherPropNames - An array of other style property names that should be omitted.
 */
function filterStyleProps(props, otherPropNames = []) {
  let filteredProps = {};
  let omit = new Set(['isHidden', 'UNSAFE_className', 'UNSAFE_style', ...defaultStyleKeys, ...otherPropNames]);
  for (const prop in props) {
    if (Object.prototype.hasOwnProperty.call(props, prop) && !omit.has(prop)) {
      filteredProps[prop] = props[prop];
    }
  }
  return filteredProps;
}

/**
 * Filters out non-style props.
 * @param props - The component props to be filtered.
 */
function onlyStyleProps(props) {
  let filteredProps = {};
  let include = new Set(['isHidden', 'UNSAFE_className', 'UNSAFE_style', ...defaultStyleKeys]);
  for (const prop in props) {
    if (Object.prototype.hasOwnProperty.call(props, prop) && include.has(prop)) {
      filteredProps[prop] = props[prop];
    }
  }
  return filteredProps;
}

/** Converts an object to a set of data attributes. */
function toDataAttributes(data, options = {}) {
  let dataAttributes = {};
  for (let key in data) {
    let prop = key;
    let value = data[key];

    // always bail if the value is nullish; it'll never make it to the DOM node
    // so there's no point doing any more work.
    // a value of `0` isn't really falsy in this case so it's not included in
    // the optional check.
    if (value == null || options.omitFalsyValues && (value === false || value === '')) {
      continue;
    }

    // lowercase the first letter of the remaining key so it isn't affected by
    // the kebab-case conversion later
    if (options.trimBooleanKeys && key.startsWith('is')) {
      prop = prop.charAt(2).toLowerCase() + prop.slice(3);
    }
    prop = prop.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`);
    dataAttributes[`data-${prop}`] = value;
  }
  return dataAttributes;
}

/**
 * A utility component for styling interactions. Applies data-attributes to the
 * child element when it receives different types of focus.
 */
function FocusRing(props) {
  let {
    children
  } = props;
  let {
    isFocused,
    isFocusVisible,
    focusProps
  } = useFocusRing(props);
  let child = Children.only(children);
  return /*#__PURE__*/cloneElement(child, mergeProps(child.props, {
    ...focusProps,
    ...toDataAttributes({
      focus: isFocusVisible ? 'visible' : props.within ? 'within' : isFocused || undefined
    })
  }));
}

function useIsMobileDevice() {
  let isSSR = useIsSSR();
  if (isSSR || typeof window === 'undefined') {
    return false;
  }
  return window.screen.width <= breakpoints.tablet;
}

/* https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/utils/src/useMediaQuery.ts */

/**
 * React hook that listens for matches to a given media query.
 * @example
 * let isBelowTablet = useMediaQuery('(max-width: 768px)');
 */
function useMediaQuery(query) {
  query = normalizeQuery(query);
  let supportsMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia === 'function';
  let [matches, setMatches] = useState(() => supportsMatchMedia ? window.matchMedia(query).matches : false);
  useEffect(() => {
    if (!supportsMatchMedia) {
      return;
    }
    let mediaQueryList = window.matchMedia(query);
    let supportsEventListener = typeof mediaQueryList.addEventListener === 'function';
    let onChange = evt => {
      setMatches(evt.matches);
    };
    if (supportsEventListener) {
      mediaQueryList.addEventListener('change', onChange);
    } else {
      mediaQueryList.addListener(onChange);
    }
    return () => {
      if (supportsEventListener) {
        mediaQueryList.removeEventListener('change', onChange);
      } else {
        mediaQueryList.removeListener(onChange);
      }
    };
  }, [supportsMatchMedia, query]);

  // If in SSR, the media query should never match. Once the page hydrates, this
  // will update and the real value will be returned.
  let isSSR = useIsSSR();
  return isSSR ? false : matches;
}
function normalizeQuery(query) {
  return query.replace(/^@media( ?)/m, '');
}

// Convert
// ----------------------------------------------------------------------------

function convertStyleProps(props, propResolvers) {
  // FIXME: is there a better way to do this?
  // delcaring `style` as `CSSProperties` yields the following error when assigning properties:
  // "Expression produces a union type that is too complex to represent"
  let style = {};
  for (let key in props) {
    let styleProp = propResolvers[key];
    if (!styleProp || props[key] == null) {
      continue;
    }
    let [name, convert] = styleProp;
    let value = mapResponsiveValue(convert, props[key]);
    if (Array.isArray(name)) {
      for (let k of name) {
        style[k] = value;
      }
    } else {
      style[name] = value;
    }
  }
  return style;
}

// Use
// ----------------------------------------------------------------------------

function useStyleProps(props, customResolvers = {}) {
  let propResolvers = {
    ...defaultStyleProps,
    ...customResolvers
  };
  let {
    isHidden,
    UNSAFE_className,
    UNSAFE_style,
    ...otherProps
  } = props;

  // @ts-ignore FIXME: One or more of the propResolvers' signature breaks the type contract.
  let convertedProps = convertStyleProps(props, propResolvers);
  let resolvedStyles = mapToMediaQueries(convertedProps);
  warning(
  // @ts-ignore
  !otherProps.className, 'The className prop is unsafe and is unsupported. ' + 'Please use style props, or UNSAFE_className if you absolutely must do something custom. ' + 'Note that this may break in future versions due to DOM structure changes.');
  warning(
  // @ts-ignore
  !otherProps.style, 'The style prop is unsafe and is unsupported. ' + 'Please use style props, or UNSAFE_style if you absolutely must do something custom. ' + 'Note that this may break in future versions due to DOM structure changes.');
  let hiddenStyles = [];
  if (isHidden) {
    if (isHidden === true) {
      hiddenStyles.push({
        display: 'none'
      });
    } else {
      const styles = {};
      if ('above' in isHidden) {
        styles[breakpointQueries$1.above[isHidden.above]] = {
          display: 'none'
        };
      }
      if ('below' in isHidden) {
        styles[breakpointQueries$1.below[isHidden.below]] = {
          display: 'none'
        };
      }
      hiddenStyles.push(styles);
    }
  }
  return {
    className: classNames(css(resolvedStyles), UNSAFE_className, css(hiddenStyles) // must be last
    ),

    style: UNSAFE_style
  };
}

export { BreakpointProvider, ClassList, FocusRing, breakpointQueries$1 as breakpointQueries, breakpoints, classNames, containerQueries, filterStyleProps, maybeTokenByKey, onlyStyleProps, resetClassName, resolveProp, resolvePropWithPath, sizeResolver, toDataAttributes, tokenSchema, transition, useBreakpoint, useIsMobileDevice, useMatchedBreakpoints, useMediaQuery, useResponsiveRange, useResponsiveValue, useStyleProps };
