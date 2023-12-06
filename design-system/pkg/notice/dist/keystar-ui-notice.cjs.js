'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@react-aria/utils');
var React = require('react');
var checkCircle2Icon = require('@keystar/ui/icon/icons/checkCircle2Icon');
var infoIcon = require('@keystar/ui/icon/icons/infoIcon');
var alertTriangleIcon = require('@keystar/ui/icon/icons/alertTriangleIcon');
var icon = require('@keystar/ui/icon');
var layout = require('@keystar/ui/layout');
var slots = require('@keystar/ui/slots');
var utils$1 = require('@keystar/ui/utils');
var style = require('@keystar/ui/style');
var typography = require('@keystar/ui/typography');
var jsxRuntime = require('react/jsx-runtime');

const noticeClassList = new style.ClassList('Notice', ['heading']);
const toneToIcon = {
  caution: alertTriangleIcon.alertTriangleIcon,
  critical: alertTriangleIcon.alertTriangleIcon,
  neutral: infoIcon.infoIcon,
  positive: checkCircle2Icon.checkCircle2Icon
};
const toneToRole = {
  caution: 'alert',
  critical: 'alert',
  neutral: 'status',
  positive: 'status'
};

// NOTE: this has been a good exploration, and slots will be useful elsewhere,
// but in this case where explicit IDs are required for accessibility and
// composition isn't paramount it may be more appropriate to simply use a
// prop-based API for the heading etc.
/**
 * Use notices to highlight information that affects a section, feature or page.
 * Draw attention without interrupting users from their current task.
 */
function Notice(props) {
  const {
    children,
    tone = 'neutral',
    ...otherProps
  } = props;
  const ref = React.useRef(null);
  const styleProps = style.useStyleProps(otherProps);
  const headingClassName = noticeClassList.element('heading');
  const headingId = utils.useSlotId();
  const contentId = utils.useSlotId();
  const hasHeading = utils$1.useHasChild(noticeClassList.selector('heading'), ref);
  const coercedTone = tone === 'neutral' ? 'accent' : tone;
  const icon$1 = toneToIcon[tone];
  const contentStyles = style.css({
    display: 'grid',
    gap: style.tokenSchema.size.space.large
  });
  const slots$1 = React.useMemo(() => ({
    content: {
      elementType: 'div',
      gridArea: hasHeading ? 'content' : 'heading-start / heading-start / content-end / content-end',
      id: contentId,
      paddingY: hasHeading ? 'regular' : undefined,
      UNSAFE_className: contentStyles
    },
    heading: {
      elementType: 'div',
      gridArea: 'heading',
      id: headingId,
      UNSAFE_className: headingClassName,
      size: 'small'
    },
    text: {
      color: coercedTone,
      weight: 'medium'
    }
  }), [coercedTone, contentId, contentStyles, hasHeading, headingClassName, headingId]);
  return /*#__PURE__*/jsxRuntime.jsxs(layout.Grid, {
    "aria-live": "polite",
    "aria-labelledby": headingId,
    "aria-describedby": contentId,
    role: toneToRole[tone],
    ref: ref,
    tabIndex: 0,
    UNSAFE_className: styleProps.className,
    UNSAFE_style: styleProps.style,
    ...utils.filterDOMProps(otherProps),
    // appearance
    backgroundColor: coercedTone,
    border: coercedTone,
    borderRadius: "medium",
    minWidth: 0,
    padding: "medium",
    width: "100%"
    // layout
    ,
    alignItems: "center",
    areas: ['icon heading', 'icon content'],
    columnGap: "medium",
    columns: ['icon.medium', 'auto'],
    rows: `${layout.minmax('icon.medium', 'auto')} auto`,
    children: [/*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
      src: icon$1,
      size: "medium",
      color: coercedTone,
      gridArea: "icon",
      alignSelf: "start"
    }), /*#__PURE__*/jsxRuntime.jsx(slots.SlotProvider, {
      slots: slots$1,
      children: utils$1.isReactText(children) ? /*#__PURE__*/jsxRuntime.jsx(slots.Content, {
        children: /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
          children: children
        })
      }) : children
    })]
  });
}

exports.Notice = Notice;
