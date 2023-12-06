'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var DropZone = require('../../dist/DropZone-36ce7a57.cjs.js');
var utils = require('@react-aria/utils');
var interactions = require('@react-aria/interactions');
var React = require('react');
var jsxRuntime = require('react/jsx-runtime');
var dnd = require('@react-aria/dnd');
var dnd$1 = require('@react-stately/dnd');

function FileTrigger(props, ref) {
  let {
    acceptedFileTypes,
    allowsMultiple,
    children,
    defaultCamera,
    onSelect,
    ...rest
  } = props;
  let inputRef = utils.useObjectRef(ref);
  let domProps = utils.filterDOMProps(rest);
  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx(interactions.PressResponder, {
      onPress: () => {
        var _inputRef$current;
        if (inputRef.current.value) {
          inputRef.current.value = '';
        }
        (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.click();
      },
      children: children
    }), /*#__PURE__*/jsxRuntime.jsx("input", {
      ...domProps,
      accept: acceptedFileTypes === null || acceptedFileTypes === void 0 ? void 0 : acceptedFileTypes.toString(),
      capture: defaultCamera,
      multiple: allowsMultiple,
      onChange: e => onSelect === null || onSelect === void 0 ? void 0 : onSelect(e.target.files),
      ref: inputRef,
      style: {
        display: 'none'
      },
      type: "file"
    })]
  });
}

/**
 * A FileTrigger allows a user to access the file system with any pressable
 * component, or custom components built with usePress.
 */
const _FileTrigger = /*#__PURE__*/React.forwardRef(FileTrigger);

/**
 * Provides the hooks required to enable drag and drop behavior for a drag and
 * drop compatible component.
 */ // NOTE: if more components become drag-n-droppable move elsewhere.
function useDragAndDrop(options) {
  let dragAndDropHooks = React.useMemo(() => {
    let {
      onDrop,
      onInsert,
      onItemDrop,
      onReorder,
      onRootDrop,
      getItems
    } = options;
    let isDraggable = !!getItems;
    let isDroppable = !!(onDrop || onInsert || onItemDrop || onReorder || onRootDrop);
    let hooks = {};
    if (isDraggable) {
      // @ts-expect-error
      hooks.useDraggableCollectionState = function useDraggableCollectionStateOverride(props) {
        return dnd$1.useDraggableCollectionState({
          ...props,
          ...options
        });
      };
      hooks.useDraggableCollection = dnd.useDraggableCollection;
      hooks.useDraggableItem = dnd.useDraggableItem;
      hooks.DragPreview = dnd.DragPreview;
    }
    if (isDroppable) {
      // eslint-disable-next-line no-unused-expressions
      hooks.useDroppableCollectionState = function useDroppableCollectionStateOverride(props) {
        return dnd$1.useDroppableCollectionState({
          ...props,
          ...options
        });
      }, hooks.useDroppableItem = dnd.useDroppableItem;
      hooks.useDroppableCollection = function useDroppableCollectionOverride(props, state, ref) {
        return dnd.useDroppableCollection({
          ...props,
          ...options
        }, state, ref);
      };
      hooks.useDropIndicator = dnd.useDropIndicator;
    }
    if (isDraggable || isDroppable) {
      hooks.isVirtualDragging = dnd.isVirtualDragging;
    }
    return hooks;
  }, [options]);
  return {
    dragAndDropHooks
  };
}

Object.defineProperty(exports, 'DropZone', {
  enumerable: true,
  get: function () { return DropZone.DropZone; }
});
Object.defineProperty(exports, 'dropZoneClassList', {
  enumerable: true,
  get: function () { return DropZone.dropZoneClassList; }
});
Object.defineProperty(exports, 'DIRECTORY_DRAG_TYPE', {
  enumerable: true,
  get: function () { return dnd.DIRECTORY_DRAG_TYPE; }
});
Object.defineProperty(exports, 'isDirectoryDropItem', {
  enumerable: true,
  get: function () { return dnd.isDirectoryDropItem; }
});
Object.defineProperty(exports, 'isFileDropItem', {
  enumerable: true,
  get: function () { return dnd.isFileDropItem; }
});
Object.defineProperty(exports, 'isTextDropItem', {
  enumerable: true,
  get: function () { return dnd.isTextDropItem; }
});
exports.FileTrigger = _FileTrigger;
exports.useDragAndDrop = useDragAndDrop;
