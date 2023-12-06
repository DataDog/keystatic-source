'use client';
import { useDrop, useClipboard } from '@react-aria/dnd';
import { useFocusRing } from '@react-aria/focus';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useObjectRef, useSlotId, useLabels, filterDOMProps, mergeProps } from '@react-aria/utils';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useRef } from 'react';
import { ClassList, useStyleProps, toDataAttributes, classNames, css, tokenSchema } from '@keystar/ui/style';
import { useRenderProps } from '@keystar/ui/utils';
import { forwardRefWithAs } from '@keystar/ui/utils/ts';
import { SlotProvider } from '../slots/dist/keystar-ui-slots.esm.js';
import { jsxs, jsx } from 'react/jsx-runtime';

var localizedMessages = {
	"ar-AE": {
		dropzoneLabel: "DropZone"
	},
	"bg-BG": {
		dropzoneLabel: "DropZone"
	},
	"cs-CZ": {
		dropzoneLabel: "Místo pro přetažení"
	},
	"da-DK": {
		dropzoneLabel: "DropZone"
	},
	"de-DE": {
		dropzoneLabel: "Ablegebereich"
	},
	"el-GR": {
		dropzoneLabel: "DropZone"
	},
	"en-US": {
		dropzoneLabel: "DropZone"
	},
	"es-ES": {
		dropzoneLabel: "DropZone"
	},
	"et-EE": {
		dropzoneLabel: "DropZone"
	},
	"fi-FI": {
		dropzoneLabel: "DropZone"
	},
	"fr-FR": {
		dropzoneLabel: "DropZone"
	},
	"he-IL": {
		dropzoneLabel: "DropZone"
	},
	"hr-HR": {
		dropzoneLabel: "Zona spuštanja"
	},
	"hu-HU": {
		dropzoneLabel: "DropZone"
	},
	"it-IT": {
		dropzoneLabel: "Zona di rilascio"
	},
	"ja-JP": {
		dropzoneLabel: "ドロップゾーン"
	},
	"ko-KR": {
		dropzoneLabel: "드롭 영역"
	},
	"lt-LT": {
		dropzoneLabel: "„DropZone“"
	},
	"lv-LV": {
		dropzoneLabel: "DropZone"
	},
	"nb-NO": {
		dropzoneLabel: "Droppsone"
	},
	"nl-NL": {
		dropzoneLabel: "DropZone"
	},
	"pl-PL": {
		dropzoneLabel: "Strefa upuszczania"
	},
	"pt-BR": {
		dropzoneLabel: "DropZone"
	},
	"pt-PT": {
		dropzoneLabel: "DropZone"
	},
	"ro-RO": {
		dropzoneLabel: "Zonă de plasare"
	},
	"ru-RU": {
		dropzoneLabel: "DropZone"
	},
	"sk-SK": {
		dropzoneLabel: "DropZone"
	},
	"sl-SI": {
		dropzoneLabel: "DropZone"
	},
	"sr-SP": {
		dropzoneLabel: "DropZone"
	},
	"sv-SE": {
		dropzoneLabel: "DropZone"
	},
	"tr-TR": {
		dropzoneLabel: "DropZone"
	},
	"uk-UA": {
		dropzoneLabel: "DropZone"
	},
	"zh-CN": {
		dropzoneLabel: "放置区域"
	},
	"zh-TW": {
		dropzoneLabel: "放置區"
	}
};

const dropZoneClassList = new ClassList('DropZone');

/**
 * A DropZone is an area into which one or multiple objects can be dragged and
 * dropped.
 */
const DropZone = forwardRefWithAs(function DropZone(props, forwardedRef) {
  let dropzoneRef = useObjectRef(forwardedRef);
  let buttonRef = useRef(null);
  let {
    dropProps,
    dropButtonProps,
    isDropTarget
  } = useDrop({
    ...props,
    ref: buttonRef,
    hasDropButton: true
  });
  let {
    clipboardProps
  } = useClipboard({
    onPaste: items => {
      var _props$onDrop;
      return (_props$onDrop = props.onDrop) === null || _props$onDrop === void 0 ? void 0 : _props$onDrop.call(props, {
        type: 'drop',
        items,
        x: 0,
        y: 0,
        dropOperation: 'copy'
      });
    }
  });
  let {
    focusProps,
    isFocused,
    isFocusVisible
  } = useFocusRing();
  let stringFormatter = useLocalizedStringFormatter(localizedMessages);
  let labelId = useSlotId();
  let dropzoneId = useSlotId();
  let ariaLabel = props['aria-label'] || stringFormatter.format('dropzoneLabel');
  let messageId = props['aria-labelledby'];
  // Chrome + VO will not announce the drop zone's accessible name if useLabels combines an aria-label and aria-labelledby
  let ariaLabelledby = [dropzoneId, labelId, messageId].filter(Boolean).join(' ');
  let labelProps = useLabels({
    'aria-labelledby': ariaLabelledby
  });

  // Use the "label" slot so consumers can choose whether to put it on a
  // `Heading` or `Text` instance.
  // TODO: warn when no label is provided
  let slots = {
    icon: {
      color: isDropTarget ? 'accent' : 'neutral'
    },
    label: {
      id: labelId,
      color: isDropTarget ? 'accent' : undefined
    }
  };
  let children = useRenderProps(props, {
    isDropTarget
  });
  let styleProps = useStyleProps(props);
  let ElementType = props.elementType || 'div';
  return /*#__PURE__*/jsxs(ElementType, {
    ...dropProps,
    ...styleProps,
    ...filterDOMProps(props, {
      labelable: true
    }),
    ...toDataAttributes({
      isDropTarget,
      isFocused,
      isFocusVisible
    }, {
      omitFalsyValues: true,
      trimBooleanKeys: true
    }),
    ref: dropzoneRef,
    className: classNames(dropZoneClassList.element('root'), css({
      border: `${tokenSchema.size.border.medium} dashed ${tokenSchema.color.border.neutral}`,
      borderRadius: tokenSchema.size.radius.regular,
      display: 'flex',
      flexDirection: 'column',
      gap: tokenSchema.size.space.medium,
      '&[data-drop-target]': {
        backgroundColor: tokenSchema.color.alias.backgroundSelected,
        borderColor: tokenSchema.color.alias.focusRing,
        borderStyle: 'solid',
        cursor: 'copy'
      },
      '&[data-focus-visible]': {
        borderColor: tokenSchema.color.alias.focusRing
      }
    }), styleProps.className),
    children: [/*#__PURE__*/jsxs(VisuallyHidden, {
      children: [/*#__PURE__*/jsx("div", {
        id: dropzoneId,
        "aria-hidden": "true",
        children: ariaLabel
      }), /*#__PURE__*/jsx("button", {
        ...mergeProps(dropButtonProps, focusProps, clipboardProps, labelProps),
        ref: buttonRef
      })]
    }), /*#__PURE__*/jsx(SlotProvider, {
      slots: slots,
      children: children
    })]
  });
});

export { DropZone, dropZoneClassList };