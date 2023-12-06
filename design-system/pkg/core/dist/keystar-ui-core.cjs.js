'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var i18n = require('@react-aria/i18n');
var overlays = require('@react-aria/overlays');
var utils = require('@react-aria/utils');
var style = require('@keystar/ui/style');
var ts = require('@keystar/ui/utils/ts');
var primitives = require('@keystar/ui/primitives');
var jsxRuntime = require('react/jsx-runtime');

// Context is in a separate file to avoid fast refresh issue where the
// old provider context values are immediately replaced with the null default.
const Context = /*#__PURE__*/React.createContext(null);
Context.displayName = 'KeystarProviderContext';

/**
 * Returns the settings and styles applied by the nearest parent
 * Provider. Properties explicitly set by the nearest parent Provider override
 * those provided by preceeding Providers.
 */
function useProvider() {
  let context = React.useContext(Context);
  if (!context) {
    throw new Error('Attempt to access context outside of KeystarProvider.');
  }
  return context;
}
function useProviderProps(props) {
  let context = useProvider();
  if (!context) {
    return props;
  }
  return Object.assign({}, {
    // prominence: context.prominence,
    isDisabled: context.isDisabled,
    isRequired: context.isRequired,
    isReadOnly: context.isReadOnly
  }, props);
}

const cssCustomProperties = `
/**
 * Do not edit directly
 * Generated on Fri, 03 Nov 2023 05:52:12 GMT
 */

.kui-scheme--auto,
.kui-scheme--light {
  color-scheme: light;

  --kui-color-scale-slate11: #2c2c2c;
  --kui-color-scale-slate10: #4b4b4b;
  --kui-color-scale-slate9: #6e6e6e;
  --kui-color-scale-slate8: #8e8e8e;
  --kui-color-scale-slate7: #b3b3b3;
  --kui-color-scale-slate6: #cacaca;
  --kui-color-scale-slate5: #e1e1e1;
  --kui-color-scale-slate4: #eaeaea;
  --kui-color-scale-slate3: #f5f5f5;
  --kui-color-scale-slate2: #fafafa;
  --kui-color-scale-slate1: #ffffff;
  --kui-color-scale-red11: #cd2b31;
  --kui-color-scale-red10: #dc3d43;
  --kui-color-scale-red9: #e5484d;
  --kui-color-scale-red8: #eb9091;
  --kui-color-scale-red7: #f3aeaf;
  --kui-color-scale-red6: #f9c6c6;
  --kui-color-scale-red5: #fdd8d8;
  --kui-color-scale-red4: #ffe5e5;
  --kui-color-scale-red3: #ffefef;
  --kui-color-scale-red2: #fff8f8;
  --kui-color-scale-red1: #fffcfc;
  --kui-color-scale-purple11: #793aaf;
  --kui-color-scale-purple10: #8445bc;
  --kui-color-scale-purple9: #8e4ec6;
  --kui-color-scale-purple8: #be93e4;
  --kui-color-scale-purple7: #d3b4ed;
  --kui-color-scale-purple6: #e3ccf4;
  --kui-color-scale-purple5: #eddbf9;
  --kui-color-scale-purple4: #f3e7fc;
  --kui-color-scale-purple3: #f9f1fe;
  --kui-color-scale-purple2: #fdfaff;
  --kui-color-scale-purple1: #fefcfe;
  --kui-color-scale-pink11: #cd1d8d;
  --kui-color-scale-pink10: #d23197;
  --kui-color-scale-pink9: #d6409f;
  --kui-color-scale-pink8: #e38ec3;
  --kui-color-scale-pink7: #ecadd4;
  --kui-color-scale-pink6: #f3c6e2;
  --kui-color-scale-pink5: #f9d8ec;
  --kui-color-scale-pink4: #fce5f3;
  --kui-color-scale-pink3: #feeef8;
  --kui-color-scale-pink2: #fff7fc;
  --kui-color-scale-pink1: #fffcfe;
  --kui-color-scale-indigo11: #3451b2;
  --kui-color-scale-indigo10: #3a5ccc;
  --kui-color-scale-indigo9: #3e63dd;
  --kui-color-scale-indigo8: #8da4ef;
  --kui-color-scale-indigo7: #aec0f5;
  --kui-color-scale-indigo6: #c6d4f9;
  --kui-color-scale-indigo5: #d9e2fc;
  --kui-color-scale-indigo4: #e6edfe;
  --kui-color-scale-indigo3: #f0f4ff;
  --kui-color-scale-indigo2: #f8faff;
  --kui-color-scale-indigo1: #fdfdfe;
  --kui-color-scale-green11: #18794e;
  --kui-color-scale-green10: #299764;
  --kui-color-scale-green9: #30a46c;
  --kui-color-scale-green8: #5bb98c;
  --kui-color-scale-green7: #92ceac;
  --kui-color-scale-green6: #b4dfc4;
  --kui-color-scale-green5: #ccebd7;
  --kui-color-scale-green4: #ddf3e4;
  --kui-color-scale-green3: #e9f9ee;
  --kui-color-scale-green2: #f2fcf5;
  --kui-color-scale-green1: #fbfefc;
  --kui-color-scale-amber11: #ad5700;
  --kui-color-scale-amber10: #ffa01c;
  --kui-color-scale-amber9: #ffb224;
  --kui-color-scale-amber8: #ee9d2b;
  --kui-color-scale-amber7: #f3ba63;
  --kui-color-scale-amber6: #ffd386;
  --kui-color-scale-amber5: #ffe3a2;
  --kui-color-scale-amber4: #ffecbc;
  --kui-color-scale-amber3: #fff4d5;
  --kui-color-scale-amber2: #fff9ed;
  --kui-color-scale-amber1: #fefdfb;
  --kui-color-scale-white: #ffffff;
  --kui-color-scale-black: #000000;
  --kui-color-alias-foreground-selected: var(--kui-color-scale-indigo11);
  --kui-color-alias-foreground-disabled: var(--kui-color-scale-slate7);
  --kui-color-alias-foreground-focused: var(--kui-color-scale-indigo11);
  --kui-color-alias-foreground-pressed: var(--kui-color-scale-slate11);
  --kui-color-alias-foreground-hovered: var(--kui-color-scale-slate11);
  --kui-color-alias-foreground-idle: var(--kui-color-scale-slate10);
  --kui-color-alias-border-invalid: var(--kui-color-scale-red9);
  --kui-color-alias-border-selected: var(--kui-color-scale-indigo9);
  --kui-color-alias-border-disabled: var(--kui-color-scale-slate4);
  --kui-color-alias-border-focused: var(--kui-color-scale-indigo9);
  --kui-color-alias-border-pressed: var(--kui-color-scale-slate8);
  --kui-color-alias-border-hovered: var(--kui-color-scale-slate7);
  --kui-color-alias-border-idle: var(--kui-color-scale-slate6);
  --kui-color-alias-focus-ring: var(--kui-color-scale-indigo9);
  --kui-color-alias-background-selected-hovered: color-mix(in srgb, transparent, var(--kui-color-scale-indigo9) 20%);
  --kui-color-alias-background-selected: color-mix(in srgb, transparent, var(--kui-color-scale-indigo9) 10%);
  --kui-color-alias-background-pressed: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 10%);
  --kui-color-alias-background-focused: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 6%);
  --kui-color-alias-background-hovered: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 6%);
  --kui-color-alias-background-disabled: var(--kui-color-scale-slate3);
  --kui-color-alias-background-idle: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 3%);
  --kui-color-alias-blanket: color-mix(in srgb, transparent, var(--kui-color-scale-black) 60%);
  --kui-color-shadow-emphasis: color-mix(in srgb, transparent, var(--kui-color-scale-black) 20%);
  --kui-color-shadow-regular: color-mix(in srgb, transparent, var(--kui-color-scale-black) 15%);
  --kui-color-shadow-muted: color-mix(in srgb, transparent, var(--kui-color-scale-black) 5%);
  --kui-color-foreground-highlight: var(--kui-color-scale-pink11);
  --kui-color-foreground-pending: var(--kui-color-scale-purple11);
  --kui-color-foreground-critical: var(--kui-color-scale-red11);
  --kui-color-foreground-caution: var(--kui-color-scale-amber11);
  --kui-color-foreground-positive: var(--kui-color-scale-green11);
  --kui-color-foreground-accent: var(--kui-color-scale-indigo11);
  --kui-color-foreground-inverse-secondary: var(--kui-color-scale-slate6);
  --kui-color-foreground-inverse: var(--kui-color-scale-slate2);
  --kui-color-foreground-on-emphasis: var(--kui-color-scale-white);
  --kui-color-foreground-neutral-tertiary: var(--kui-color-scale-slate8);
  --kui-color-foreground-neutral-secondary: var(--kui-color-scale-slate9);
  --kui-color-foreground-neutral-emphasis: var(--kui-color-scale-slate11);
  --kui-color-foreground-neutral: var(--kui-color-scale-slate10);
  --kui-color-border-highlight: var(--kui-color-scale-pink6);
  --kui-color-border-pending: var(--kui-color-scale-purple6);
  --kui-color-border-critical: var(--kui-color-scale-red6);
  --kui-color-border-caution: var(--kui-color-scale-amber6);
  --kui-color-border-positive: var(--kui-color-scale-green6);
  --kui-color-border-accent: var(--kui-color-scale-indigo6);
  --kui-color-border-emphasis: var(--kui-color-scale-slate6);
  --kui-color-border-neutral: var(--kui-color-scale-slate5);
  --kui-color-border-muted: var(--kui-color-scale-slate4);
  --kui-color-background-highlight-emphasis: var(--kui-color-scale-pink9);
  --kui-color-background-highlight: var(--kui-color-scale-pink3);
  --kui-color-background-pending-emphasis: var(--kui-color-scale-purple9);
  --kui-color-background-pending: var(--kui-color-scale-purple3);
  --kui-color-background-critical-emphasis: var(--kui-color-scale-red9);
  --kui-color-background-critical: var(--kui-color-scale-red3);
  --kui-color-background-caution-emphasis: var(--kui-color-scale-amber9);
  --kui-color-background-caution: var(--kui-color-scale-amber3);
  --kui-color-background-positive-emphasis: var(--kui-color-scale-green9);
  --kui-color-background-positive: var(--kui-color-scale-green3);
  --kui-color-background-accent-emphasis: var(--kui-color-scale-indigo9);
  --kui-color-background-accent: var(--kui-color-scale-indigo3);
  --kui-color-background-inverse: var(--kui-color-scale-slate10);
  --kui-color-background-surface-tertiary: var(--kui-color-scale-slate4);
  --kui-color-background-surface-secondary: var(--kui-color-scale-slate3);
  --kui-color-background-surface: var(--kui-color-scale-slate2);
  --kui-color-background-canvas: var(--kui-color-scale-slate1);
}
.kui-scheme--dark {
  color-scheme: dark;

  --kui-color-scale-slate11: #e3e3e3;
  --kui-color-scale-slate10: #b9b9b9;
  --kui-color-scale-slate9: #909090;
  --kui-color-scale-slate8: #6e6e6e;
  --kui-color-scale-slate7: #5a5a5a;
  --kui-color-scale-slate6: #4a4a4a;
  --kui-color-scale-slate5: #3e3e3e;
  --kui-color-scale-slate4: #323232;
  --kui-color-scale-slate3: #2f2f2f;
  --kui-color-scale-slate2: #252525;
  --kui-color-scale-slate1: #1f1f1f;
  --kui-color-scale-red11: #ff6369;
  --kui-color-scale-red10: #f2555a;
  --kui-color-scale-red9: #e5484d;
  --kui-color-scale-red8: #aa2429;
  --kui-color-scale-red7: #822025;
  --kui-color-scale-red6: #671e22;
  --kui-color-scale-red5: #541b1f;
  --kui-color-scale-red4: #481a1d;
  --kui-color-scale-red3: #3c181a;
  --kui-color-scale-red2: #291415;
  --kui-color-scale-red1: #1f1315;
  --kui-color-scale-purple11: #bf7af0;
  --kui-color-scale-purple10: #9d5bd2;
  --kui-color-scale-purple9: #8e4ec6;
  --kui-color-scale-purple8: #7938b2;
  --kui-color-scale-purple7: #5f2d84;
  --kui-color-scale-purple6: #4e2667;
  --kui-color-scale-purple5: #432155;
  --kui-color-scale-purple4: #3a1e48;
  --kui-color-scale-purple3: #301a3a;
  --kui-color-scale-purple2: #221527;
  --kui-color-scale-purple1: #1b141d;
  --kui-color-scale-pink11: #f65cb6;
  --kui-color-scale-pink10: #e34ba9;
  --kui-color-scale-pink9: #d6409f;
  --kui-color-scale-pink8: #a71873;
  --kui-color-scale-pink7: #7a1d5a;
  --kui-color-scale-pink6: #601d48;
  --kui-color-scale-pink5: #501b3f;
  --kui-color-scale-pink4: #451a37;
  --kui-color-scale-pink3: #3a182f;
  --kui-color-scale-pink2: #271421;
  --kui-color-scale-pink1: #1f121b;
  --kui-color-scale-indigo11: #849dff;
  --kui-color-scale-indigo10: #5373e7;
  --kui-color-scale-indigo9: #3e63dd;
  --kui-color-scale-indigo8: #2f4eb2;
  --kui-color-scale-indigo7: #273e89;
  --kui-color-scale-indigo6: #22346e;
  --kui-color-scale-indigo5: #1f2c5c;
  --kui-color-scale-indigo4: #1c274f;
  --kui-color-scale-indigo3: #192140;
  --kui-color-scale-indigo2: #15192d;
  --kui-color-scale-indigo1: #131620;
  --kui-color-scale-green11: #4cc38a;
  --kui-color-scale-green10: #3cb179;
  --kui-color-scale-green9: #30a46c;
  --kui-color-scale-green8: #236e4a;
  --kui-color-scale-green7: #1b543a;
  --kui-color-scale-green6: #164430;
  --kui-color-scale-green5: #133929;
  --kui-color-scale-green4: #113123;
  --kui-color-scale-green3: #0f291e;
  --kui-color-scale-green2: #0c1f17;
  --kui-color-scale-green1: #0d1912;
  --kui-color-scale-amber11: #f1a10d;
  --kui-color-scale-amber10: #ffcb47;
  --kui-color-scale-amber9: #ffb224;
  --kui-color-scale-amber8: #824e00;
  --kui-color-scale-amber7: #693f05;
  --kui-color-scale-amber6: #573300;
  --kui-color-scale-amber5: #4a2900;
  --kui-color-scale-amber4: #3f2200;
  --kui-color-scale-amber3: #341c00;
  --kui-color-scale-amber2: #271700;
  --kui-color-scale-amber1: #1f1300;
  --kui-color-scale-white: #ffffff;
  --kui-color-scale-black: #000000;
  --kui-color-alias-foreground-selected: var(--kui-color-scale-indigo11);
  --kui-color-alias-foreground-disabled: var(--kui-color-scale-slate7);
  --kui-color-alias-foreground-focused: var(--kui-color-scale-indigo11);
  --kui-color-alias-foreground-pressed: var(--kui-color-scale-slate11);
  --kui-color-alias-foreground-hovered: var(--kui-color-scale-slate11);
  --kui-color-alias-foreground-idle: var(--kui-color-scale-slate10);
  --kui-color-alias-border-invalid: var(--kui-color-scale-red9);
  --kui-color-alias-border-selected: var(--kui-color-scale-indigo9);
  --kui-color-alias-border-disabled: var(--kui-color-scale-slate4);
  --kui-color-alias-border-focused: var(--kui-color-scale-indigo9);
  --kui-color-alias-border-pressed: var(--kui-color-scale-slate8);
  --kui-color-alias-border-hovered: var(--kui-color-scale-slate7);
  --kui-color-alias-border-idle: var(--kui-color-scale-slate6);
  --kui-color-alias-focus-ring: var(--kui-color-scale-indigo9);
  --kui-color-alias-background-selected-hovered: color-mix(in srgb, transparent, var(--kui-color-scale-indigo9) 20%);
  --kui-color-alias-background-selected: color-mix(in srgb, transparent, var(--kui-color-scale-indigo9) 10%);
  --kui-color-alias-background-pressed: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 10%);
  --kui-color-alias-background-focused: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 6%);
  --kui-color-alias-background-hovered: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 6%);
  --kui-color-alias-background-disabled: var(--kui-color-scale-slate3);
  --kui-color-alias-background-idle: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 4%);
  --kui-color-alias-blanket: color-mix(in srgb, transparent, var(--kui-color-scale-black) 60%);
  --kui-color-shadow-emphasis: color-mix(in srgb, transparent, var(--kui-color-scale-black) 60%);
  --kui-color-shadow-regular: color-mix(in srgb, transparent, var(--kui-color-scale-black) 40%);
  --kui-color-shadow-muted: color-mix(in srgb, transparent, var(--kui-color-scale-black) 20%);
  --kui-color-foreground-highlight: var(--kui-color-scale-pink11);
  --kui-color-foreground-pending: var(--kui-color-scale-purple11);
  --kui-color-foreground-critical: var(--kui-color-scale-red11);
  --kui-color-foreground-caution: var(--kui-color-scale-amber11);
  --kui-color-foreground-positive: var(--kui-color-scale-green11);
  --kui-color-foreground-accent: var(--kui-color-scale-indigo11);
  --kui-color-foreground-inverse-secondary: var(--kui-color-scale-slate6);
  --kui-color-foreground-inverse: var(--kui-color-scale-slate2);
  --kui-color-foreground-on-emphasis: var(--kui-color-scale-white);
  --kui-color-foreground-neutral-tertiary: var(--kui-color-scale-slate8);
  --kui-color-foreground-neutral-secondary: var(--kui-color-scale-slate9);
  --kui-color-foreground-neutral-emphasis: var(--kui-color-scale-slate11);
  --kui-color-foreground-neutral: var(--kui-color-scale-slate10);
  --kui-color-border-highlight: var(--kui-color-scale-pink6);
  --kui-color-border-pending: var(--kui-color-scale-purple6);
  --kui-color-border-critical: var(--kui-color-scale-red6);
  --kui-color-border-caution: var(--kui-color-scale-amber6);
  --kui-color-border-positive: var(--kui-color-scale-green6);
  --kui-color-border-accent: var(--kui-color-scale-indigo6);
  --kui-color-border-emphasis: var(--kui-color-scale-slate6);
  --kui-color-border-neutral: var(--kui-color-scale-slate5);
  --kui-color-border-muted: var(--kui-color-scale-slate4);
  --kui-color-background-highlight-emphasis: var(--kui-color-scale-pink9);
  --kui-color-background-highlight: var(--kui-color-scale-pink3);
  --kui-color-background-pending-emphasis: var(--kui-color-scale-purple9);
  --kui-color-background-pending: var(--kui-color-scale-purple3);
  --kui-color-background-critical-emphasis: var(--kui-color-scale-red9);
  --kui-color-background-critical: var(--kui-color-scale-red3);
  --kui-color-background-caution-emphasis: var(--kui-color-scale-amber9);
  --kui-color-background-caution: var(--kui-color-scale-amber3);
  --kui-color-background-positive-emphasis: var(--kui-color-scale-green9);
  --kui-color-background-positive: var(--kui-color-scale-green3);
  --kui-color-background-accent-emphasis: var(--kui-color-scale-indigo9);
  --kui-color-background-accent: var(--kui-color-scale-indigo3);
  --kui-color-background-inverse: var(--kui-color-scale-slate10);
  --kui-color-background-surface-tertiary: var(--kui-color-scale-slate4);
  --kui-color-background-surface-secondary: var(--kui-color-scale-slate3);
  --kui-color-background-surface: var(--kui-color-scale-slate2);
  --kui-color-background-canvas: var(--kui-color-scale-slate1);
}
@media (prefers-color-scheme: dark) {
  .kui-scheme--auto {
    color-scheme: dark;

    --kui-color-scale-slate11: #e3e3e3;
    --kui-color-scale-slate10: #b9b9b9;
    --kui-color-scale-slate9: #909090;
    --kui-color-scale-slate8: #6e6e6e;
    --kui-color-scale-slate7: #5a5a5a;
    --kui-color-scale-slate6: #4a4a4a;
    --kui-color-scale-slate5: #3e3e3e;
    --kui-color-scale-slate4: #323232;
    --kui-color-scale-slate3: #2f2f2f;
    --kui-color-scale-slate2: #252525;
    --kui-color-scale-slate1: #1f1f1f;
    --kui-color-scale-red11: #ff6369;
    --kui-color-scale-red10: #f2555a;
    --kui-color-scale-red9: #e5484d;
    --kui-color-scale-red8: #aa2429;
    --kui-color-scale-red7: #822025;
    --kui-color-scale-red6: #671e22;
    --kui-color-scale-red5: #541b1f;
    --kui-color-scale-red4: #481a1d;
    --kui-color-scale-red3: #3c181a;
    --kui-color-scale-red2: #291415;
    --kui-color-scale-red1: #1f1315;
    --kui-color-scale-purple11: #bf7af0;
    --kui-color-scale-purple10: #9d5bd2;
    --kui-color-scale-purple9: #8e4ec6;
    --kui-color-scale-purple8: #7938b2;
    --kui-color-scale-purple7: #5f2d84;
    --kui-color-scale-purple6: #4e2667;
    --kui-color-scale-purple5: #432155;
    --kui-color-scale-purple4: #3a1e48;
    --kui-color-scale-purple3: #301a3a;
    --kui-color-scale-purple2: #221527;
    --kui-color-scale-purple1: #1b141d;
    --kui-color-scale-pink11: #f65cb6;
    --kui-color-scale-pink10: #e34ba9;
    --kui-color-scale-pink9: #d6409f;
    --kui-color-scale-pink8: #a71873;
    --kui-color-scale-pink7: #7a1d5a;
    --kui-color-scale-pink6: #601d48;
    --kui-color-scale-pink5: #501b3f;
    --kui-color-scale-pink4: #451a37;
    --kui-color-scale-pink3: #3a182f;
    --kui-color-scale-pink2: #271421;
    --kui-color-scale-pink1: #1f121b;
    --kui-color-scale-indigo11: #849dff;
    --kui-color-scale-indigo10: #5373e7;
    --kui-color-scale-indigo9: #3e63dd;
    --kui-color-scale-indigo8: #2f4eb2;
    --kui-color-scale-indigo7: #273e89;
    --kui-color-scale-indigo6: #22346e;
    --kui-color-scale-indigo5: #1f2c5c;
    --kui-color-scale-indigo4: #1c274f;
    --kui-color-scale-indigo3: #192140;
    --kui-color-scale-indigo2: #15192d;
    --kui-color-scale-indigo1: #131620;
    --kui-color-scale-green11: #4cc38a;
    --kui-color-scale-green10: #3cb179;
    --kui-color-scale-green9: #30a46c;
    --kui-color-scale-green8: #236e4a;
    --kui-color-scale-green7: #1b543a;
    --kui-color-scale-green6: #164430;
    --kui-color-scale-green5: #133929;
    --kui-color-scale-green4: #113123;
    --kui-color-scale-green3: #0f291e;
    --kui-color-scale-green2: #0c1f17;
    --kui-color-scale-green1: #0d1912;
    --kui-color-scale-amber11: #f1a10d;
    --kui-color-scale-amber10: #ffcb47;
    --kui-color-scale-amber9: #ffb224;
    --kui-color-scale-amber8: #824e00;
    --kui-color-scale-amber7: #693f05;
    --kui-color-scale-amber6: #573300;
    --kui-color-scale-amber5: #4a2900;
    --kui-color-scale-amber4: #3f2200;
    --kui-color-scale-amber3: #341c00;
    --kui-color-scale-amber2: #271700;
    --kui-color-scale-amber1: #1f1300;
    --kui-color-scale-white: #ffffff;
    --kui-color-scale-black: #000000;
    --kui-color-alias-foreground-selected: var(--kui-color-scale-indigo11);
    --kui-color-alias-foreground-disabled: var(--kui-color-scale-slate7);
    --kui-color-alias-foreground-focused: var(--kui-color-scale-indigo11);
    --kui-color-alias-foreground-pressed: var(--kui-color-scale-slate11);
    --kui-color-alias-foreground-hovered: var(--kui-color-scale-slate11);
    --kui-color-alias-foreground-idle: var(--kui-color-scale-slate10);
    --kui-color-alias-border-invalid: var(--kui-color-scale-red9);
    --kui-color-alias-border-selected: var(--kui-color-scale-indigo9);
    --kui-color-alias-border-disabled: var(--kui-color-scale-slate4);
    --kui-color-alias-border-focused: var(--kui-color-scale-indigo9);
    --kui-color-alias-border-pressed: var(--kui-color-scale-slate8);
    --kui-color-alias-border-hovered: var(--kui-color-scale-slate7);
    --kui-color-alias-border-idle: var(--kui-color-scale-slate6);
    --kui-color-alias-focus-ring: var(--kui-color-scale-indigo9);
    --kui-color-alias-background-selected-hovered: color-mix(in srgb, transparent, var(--kui-color-scale-indigo9) 20%);
    --kui-color-alias-background-selected: color-mix(in srgb, transparent, var(--kui-color-scale-indigo9) 10%);
    --kui-color-alias-background-pressed: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 10%);
    --kui-color-alias-background-focused: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 6%);
    --kui-color-alias-background-hovered: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 6%);
    --kui-color-alias-background-disabled: var(--kui-color-scale-slate3);
    --kui-color-alias-background-idle: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 4%);
    --kui-color-alias-blanket: color-mix(in srgb, transparent, var(--kui-color-scale-black) 60%);
    --kui-color-shadow-emphasis: color-mix(in srgb, transparent, var(--kui-color-scale-black) 60%);
    --kui-color-shadow-regular: color-mix(in srgb, transparent, var(--kui-color-scale-black) 40%);
    --kui-color-shadow-muted: color-mix(in srgb, transparent, var(--kui-color-scale-black) 20%);
    --kui-color-foreground-highlight: var(--kui-color-scale-pink11);
    --kui-color-foreground-pending: var(--kui-color-scale-purple11);
    --kui-color-foreground-critical: var(--kui-color-scale-red11);
    --kui-color-foreground-caution: var(--kui-color-scale-amber11);
    --kui-color-foreground-positive: var(--kui-color-scale-green11);
    --kui-color-foreground-accent: var(--kui-color-scale-indigo11);
    --kui-color-foreground-inverse-secondary: var(--kui-color-scale-slate6);
    --kui-color-foreground-inverse: var(--kui-color-scale-slate2);
    --kui-color-foreground-on-emphasis: var(--kui-color-scale-white);
    --kui-color-foreground-neutral-tertiary: var(--kui-color-scale-slate8);
    --kui-color-foreground-neutral-secondary: var(--kui-color-scale-slate9);
    --kui-color-foreground-neutral-emphasis: var(--kui-color-scale-slate11);
    --kui-color-foreground-neutral: var(--kui-color-scale-slate10);
    --kui-color-border-highlight: var(--kui-color-scale-pink6);
    --kui-color-border-pending: var(--kui-color-scale-purple6);
    --kui-color-border-critical: var(--kui-color-scale-red6);
    --kui-color-border-caution: var(--kui-color-scale-amber6);
    --kui-color-border-positive: var(--kui-color-scale-green6);
    --kui-color-border-accent: var(--kui-color-scale-indigo6);
    --kui-color-border-emphasis: var(--kui-color-scale-slate6);
    --kui-color-border-neutral: var(--kui-color-scale-slate5);
    --kui-color-border-muted: var(--kui-color-scale-slate4);
    --kui-color-background-highlight-emphasis: var(--kui-color-scale-pink9);
    --kui-color-background-highlight: var(--kui-color-scale-pink3);
    --kui-color-background-pending-emphasis: var(--kui-color-scale-purple9);
    --kui-color-background-pending: var(--kui-color-scale-purple3);
    --kui-color-background-critical-emphasis: var(--kui-color-scale-red9);
    --kui-color-background-critical: var(--kui-color-scale-red3);
    --kui-color-background-caution-emphasis: var(--kui-color-scale-amber9);
    --kui-color-background-caution: var(--kui-color-scale-amber3);
    --kui-color-background-positive-emphasis: var(--kui-color-scale-green9);
    --kui-color-background-positive: var(--kui-color-scale-green3);
    --kui-color-background-accent-emphasis: var(--kui-color-scale-indigo9);
    --kui-color-background-accent: var(--kui-color-scale-indigo3);
    --kui-color-background-inverse: var(--kui-color-scale-slate10);
    --kui-color-background-surface-tertiary: var(--kui-color-scale-slate4);
    --kui-color-background-surface-secondary: var(--kui-color-scale-slate3);
    --kui-color-background-surface: var(--kui-color-scale-slate2);
    --kui-color-background-canvas: var(--kui-color-scale-slate1);
  }
}
.kui-theme {
  --kui-animation-easing-ease-out: cubic-bezier(0, 0, 0.4, 1);
  --kui-animation-easing-ease-in: cubic-bezier(0.5, 0, 1, 1);
  --kui-animation-easing-ease-in-out: cubic-bezier(0.45, 0, 0.4, 1);
  --kui-animation-duration-xlong: 1920ms;
  --kui-animation-duration-long: 960ms;
  --kui-animation-duration-regular: 320ms;
  --kui-animation-duration-short: 160ms;
}
.kui-theme {
  --kui-size-dialog-large: 860px;
  --kui-size-dialog-medium: 640px;
  --kui-size-dialog-small: 420px;
  --kui-size-dialog-xsmall: 320px;
  --kui-size-container-xlarge: 1400px;
  --kui-size-container-large: 1280px;
  --kui-size-container-medium: 940px;
  --kui-size-container-small: 660px;
  --kui-size-container-xsmall: 400px;
  --kui-size-alias-focus-ring-gap: 2px;
  --kui-size-alias-focus-ring: 2px;
  --kui-size-icon-large: var(--kui-size-scale-400);
  --kui-size-icon-medium: var(--kui-size-scale-300);
  --kui-size-icon-regular: var(--kui-size-scale-200);
  --kui-size-icon-small: var(--kui-size-scale-150);
  --kui-size-element-xlarge: var(--kui-size-scale-800);
  --kui-size-element-large: var(--kui-size-scale-600);
  --kui-size-element-medium: var(--kui-size-scale-450);
  --kui-size-element-regular: var(--kui-size-scale-400);
  --kui-size-element-small: var(--kui-size-scale-300);
  --kui-size-element-xsmall: var(--kui-size-scale-200);
  --kui-size-alias-single-line-width: var(--kui-size-scale-2400);
  --kui-size-alias-single-line-height: var(--kui-size-scale-400);
}
.kui-theme {
  --kui-size-radius-xlarge: 16px;
  --kui-size-radius-large: 12px;
  --kui-size-radius-medium: 8px;
  --kui-size-radius-regular: 6px;
  --kui-size-radius-small: 4px;
  --kui-size-radius-xsmall: 2px;
  --kui-size-radius-full: 9999px;
  --kui-size-border-large: 4px;
  --kui-size-border-medium: 2px;
  --kui-size-border-regular: 1px;
  --kui-size-space-xxlarge: var(--kui-size-scale-400);
  --kui-size-space-xlarge: var(--kui-size-scale-300);
  --kui-size-space-large: var(--kui-size-scale-200);
  --kui-size-space-medium: var(--kui-size-scale-150);
  --kui-size-space-regular: var(--kui-size-scale-100);
  --kui-size-space-small: var(--kui-size-scale-50);
  --kui-size-space-xsmall: var(--kui-size-scale-25);
  --kui-size-shadow-large: 0px var(--kui-size-scale-100) var(--kui-size-scale-300) 0px;
  --kui-size-shadow-medium: 0px var(--kui-size-scale-40) var(--kui-size-scale-75) 0px;
  --kui-size-shadow-small: 0px var(--kui-size-scale-10) var(--kui-size-scale-25) 0px;
}
.kui-theme {
  --kui-size-scale-6000: 480px;
  --kui-size-scale-5000: 400px;
  --kui-size-scale-4600: 368px;
  --kui-size-scale-3600: 288px;
  --kui-size-scale-3400: 272px;
  --kui-size-scale-3000: 240px;
  --kui-size-scale-2400: 192px;
  --kui-size-scale-2000: 160px;
  --kui-size-scale-1700: 136px;
  --kui-size-scale-1600: 128px;
  --kui-size-scale-1250: 100px;
  --kui-size-scale-1200: 96px;
  --kui-size-scale-1000: 80px;
  --kui-size-scale-900: 72px;
  --kui-size-scale-800: 64px;
  --kui-size-scale-700: 56px;
  --kui-size-scale-675: 54px;
  --kui-size-scale-600: 48px;
  --kui-size-scale-550: 44px;
  --kui-size-scale-500: 40px;
  --kui-size-scale-450: 36px;
  --kui-size-scale-400: 32px;
  --kui-size-scale-350: 28px;
  --kui-size-scale-325: 26px;
  --kui-size-scale-300: 24px;
  --kui-size-scale-275: 22px;
  --kui-size-scale-250: 20px;
  --kui-size-scale-225: 18px;
  --kui-size-scale-200: 16px;
  --kui-size-scale-175: 14px;
  --kui-size-scale-160: 13px;
  --kui-size-scale-150: 12px;
  --kui-size-scale-130: 11px;
  --kui-size-scale-125: 10px;
  --kui-size-scale-115: 9px;
  --kui-size-scale-100: 8px;
  --kui-size-scale-85: 7px;
  --kui-size-scale-75: 6px;
  --kui-size-scale-65: 5px;
  --kui-size-scale-50: 4px;
  --kui-size-scale-40: 3px;
  --kui-size-scale-25: 2px;
  --kui-size-scale-10: 1px;
  --kui-size-scale-0: 0px;
}
.kui-theme {
  --kui-typography-heading-large-lineheight: 1.2;
  --kui-typography-heading-large-size: 32px;
  --kui-typography-heading-medium-lineheight: 1.2;
  --kui-typography-heading-medium-size: 24px;
  --kui-typography-heading-regular-lineheight: 1.2;
  --kui-typography-heading-regular-size: 20px;
  --kui-typography-heading-small-lineheight: 1.2;
  --kui-typography-heading-small-size: 16px;
  --kui-typography-text-large-lineheight: 1.2;
  --kui-typography-text-large-size: 18px;
  --kui-typography-text-medium-lineheight: 1.4;
  --kui-typography-text-medium-size: 16px;
  --kui-typography-text-regular-lineheight: 1.4;
  --kui-typography-text-regular-size: 14px;
  --kui-typography-text-small-lineheight: 1.4;
  --kui-typography-text-small-size: 12px;
  --kui-typography-lineheight-small: 1.2;
  --kui-typography-lineheight-medium: 1.4;
  --kui-typography-lineheight-large: 1.6;
  --kui-typography-font-weight-bold: 700;
  --kui-typography-font-weight-semibold: 600;
  --kui-typography-font-weight-medium: 500;
  --kui-typography-font-weight-regular: 400;
  --kui-typography-font-family-code: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
  --kui-typography-font-family-base: var(--font-inter, Inter);
  --kui-typography-heading-large-capheight: 23.2727px;
  --kui-typography-heading-large-capheight-trim: -0.2364em;
  --kui-typography-heading-large-baseline-trim: -0.2364em;
  --kui-typography-heading-medium-capheight: 17.4545px;
  --kui-typography-heading-medium-capheight-trim: -0.2364em;
  --kui-typography-heading-medium-baseline-trim: -0.2364em;
  --kui-typography-heading-regular-capheight: 14.5455px;
  --kui-typography-heading-regular-capheight-trim: -0.2364em;
  --kui-typography-heading-regular-baseline-trim: -0.2364em;
  --kui-typography-heading-small-capheight: 11.6364px;
  --kui-typography-heading-small-capheight-trim: -0.2364em;
  --kui-typography-heading-small-baseline-trim: -0.2364em;
  --kui-typography-text-large-capheight: 13.0909px;
  --kui-typography-text-large-capheight-trim: -0.2364em;
  --kui-typography-text-large-baseline-trim: -0.2364em;
  --kui-typography-text-medium-capheight: 11.6364px;
  --kui-typography-text-medium-capheight-trim: -0.3364em;
  --kui-typography-text-medium-baseline-trim: -0.3364em;
  --kui-typography-text-regular-capheight: 10.1818px;
  --kui-typography-text-regular-capheight-trim: -0.3364em;
  --kui-typography-text-regular-baseline-trim: -0.3364em;
  --kui-typography-text-small-capheight: 8.7273px;
  --kui-typography-text-small-capheight-trim: -0.3364em;
  --kui-typography-text-small-baseline-trim: -0.3364em;
}`;

const schemes = {
  auto: primitives.SCHEME_AUTO,
  light: primitives.SCHEME_LIGHT,
  dark: primitives.SCHEME_DARK
};
const documentElementClasses = args => {
  const scheme = schemes[args.colorScheme || 'auto'];
  return `${documentReset(args.bodyBackground)} ${primitives.THEME_DEFAULT} ${scheme}`;
};

/**
 * Deactivate auto-enlargement of small text in Safari. Remove the default touch
 * highlight in Safari. Reset the body element to sane defaults.
 */
const documentReset = (background = 'canvas') => style.css`
  html& {
    scroll-behavior: smooth;
    text-size-adjust: none;
    -webkit-tap-highlight-color: #0000;
  }
  @media (prefers-reduced-motion: reduce) {
    html& {
      scroll-behavior: auto;
    }
  }

  html& body {
    background-color: ${style.tokenSchema.color.background[background]};
    margin: 0;
  }
`;
function flatString(str) {
  return str.replace(/\n|\s{2,}/g, '');
}

// Element resets
// ------------------------------

const reset = style.resetClassName.replace(':', '\\:');
const elementReset = flatString(`
  :where(.${reset}) {
    border: 0;
    box-sizing: border-box;
    font: inherit;
    font-size: 100%;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }
  :where(ol.${reset}, ul.${reset}) { list-style: none; }
  :where(canvas.${reset}, img.${reset}, picture.${reset}, svg.${reset}, video.${reset}) { display: block; }
  :where(input.${reset}, button.${reset}, textarea.${reset}, select.${reset}) { appearance: none; background-color: transparent; }
  :where(a.${reset}, abbr.${reset}) { color: inherit; text-decoration: none; }
  :where(table.${reset}) = { border-collapse: collapse; border-spacing: 0; }
`);
style.injectGlobal(cssCustomProperties);
style.injectGlobal(elementReset);

function useScale() {
  let matchesFine = style.useMediaQuery('(any-pointer: fine)');
  return !matchesFine ? 'large' : 'medium';
}

/** Consolidates core functionality and dependencies of the Keystar component library. */
const KeystarProvider = ts.forwardRefWithAs(function KeystarProvider(props, forwardedRef) {
  let prevContext = React.useContext(Context);
  let prevColorScheme = prevContext && prevContext.colorScheme;
  let autoScale = useScale();
  let {
    locale: prevLocale
  } = i18n.useLocale();
  let matchedBreakpoints = style.useMatchedBreakpoints();

  // importance of color scheme props > parent > auto
  let {
    children,
    colorScheme = prevColorScheme || 'auto',
    isDisabled,
    isRequired,
    isReadOnly,
    locale = prevContext ? prevLocale : undefined,
    router,
    scale = prevContext ? prevContext.scale : autoScale,
    ...otherProps
  } = props;

  // select only the props with values so undefined props don't overwrite prevContext values
  let currentProps = {
    colorScheme,
    isDisabled,
    isRequired,
    isReadOnly,
    scale
  };
  let filteredProps = Object.fromEntries(Object.entries(currentProps).filter(([_, value]) => value !== undefined));

  // Merge options with parent provider
  let context = Object.assign({}, prevContext, filteredProps);

  // Only wrap in DOM node when necessary
  let contents = children;
  let domProps = utils.filterDOMProps(otherProps);
  let styleProps = style.useStyleProps(otherProps);
  if (!prevContext || props.elementType || props.locale || colorScheme !== prevContext.colorScheme || scale !== prevContext.scale || Object.keys(domProps).length > 0 || otherProps.UNSAFE_className || styleProps.style && Object.keys(styleProps.style).length > 0) {
    var _props$elementType;
    contents = /*#__PURE__*/jsxRuntime.jsx(ProviderWrapper, {
      ref: forwardedRef,
      ...props,
      style: {
        isolation: !prevContext ? 'isolate' : undefined
      },
      elementType: (_props$elementType = props.elementType) !== null && _props$elementType !== void 0 ? _props$elementType : 'div',
      children: contents
    });
  }
  if (router) {
    contents = /*#__PURE__*/jsxRuntime.jsx(utils.RouterProvider, {
      ...router,
      children: contents
    });
  }
  return /*#__PURE__*/jsxRuntime.jsx(Context.Provider, {
    value: context,
    children: /*#__PURE__*/jsxRuntime.jsx(style.BreakpointProvider, {
      value: matchedBreakpoints,
      children: /*#__PURE__*/jsxRuntime.jsx(i18n.I18nProvider, {
        locale: locale,
        children: /*#__PURE__*/jsxRuntime.jsx(overlays.ModalProvider, {
          children: contents
        })
      })
    })
  });
});
const ProviderWrapper = ts.forwardRefWithAs(function ProviderWrapper(props, forwardedRef) {
  var _props$elementType2;
  let {
    children,
    style
  } = props;
  let {
    locale,
    direction
  } = i18n.useLocale();
  let {
    modalProviderProps
  } = overlays.useModalProvider();
  let {
    colorScheme
  } = useProvider();
  const ElementType = (_props$elementType2 = props.elementType) !== null && _props$elementType2 !== void 0 ? _props$elementType2 : 'div';
  return /*#__PURE__*/jsxRuntime.jsx(ElementType, {
    ...modalProviderProps,
    className: `${props.UNSAFE_className ? `${props.UNSAFE_className} ` : ''}${documentElementClasses({
      bodyBackground: props.bodyBackground,
      colorScheme
    })}`,
    lang: locale,
    dir: direction,
    ref: forwardedRef,
    style: {
      ...style,
      ...props.UNSAFE_style
    },
    children: children
  });
});

function ClientSideOnlyDocumentElement(props) {
  const context = useProvider();
  const classes = documentElementClasses({
    bodyBackground: props.bodyBackground,
    colorScheme: context.colorScheme
  });
  React.useLayoutEffect(() => {
    const split = classes.split(' ');
    const root = document.documentElement;
    root.classList.add(...split);
    return () => {
      root.classList.remove(...split);
    };
  }, [classes]);
  return null;
}

exports.ClientSideOnlyDocumentElement = ClientSideOnlyDocumentElement;
exports.KeystarProvider = KeystarProvider;
exports.TestProvider = KeystarProvider;
exports.documentElementClasses = documentElementClasses;
exports.useProvider = useProvider;
exports.useProviderProps = useProviderProps;
