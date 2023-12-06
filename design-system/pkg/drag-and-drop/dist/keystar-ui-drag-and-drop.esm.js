export { DropZone, dropZoneClassList } from '../../dist/DropZone-d6be8ad7.esm.js';
import { useObjectRef, filterDOMProps } from '@react-aria/utils';
import { PressResponder } from '@react-aria/interactions';
import { forwardRef, useMemo } from 'react';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useDraggableCollection, useDraggableItem, DragPreview, useDroppableItem, useDroppableCollection, useDropIndicator, isVirtualDragging } from '@react-aria/dnd';
export { DIRECTORY_DRAG_TYPE, isDirectoryDropItem, isFileDropItem, isTextDropItem } from '@react-aria/dnd';
import { useDraggableCollectionState, useDroppableCollectionState } from '@react-stately/dnd';

function FileTrigger(props, ref) {
  let {
    acceptedFileTypes,
    allowsMultiple,
    children,
    defaultCamera,
    onSelect,
    ...rest
  } = props;
  let inputRef = useObjectRef(ref);
  let domProps = filterDOMProps(rest);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(PressResponder, {
      onPress: () => {
        var _inputRef$current;
        if (inputRef.current.value) {
          inputRef.current.value = '';
        }
        (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.click();
      },
      children: children
    }), /*#__PURE__*/jsx("input", {
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
const _FileTrigger = /*#__PURE__*/forwardRef(FileTrigger);

/**
 * Provides the hooks required to enable drag and drop behavior for a drag and
 * drop compatible component.
 */ // NOTE: if more components become drag-n-droppable move elsewhere.
function useDragAndDrop(options) {
  let dragAndDropHooks = useMemo(() => {
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
        return useDraggableCollectionState({
          ...props,
          ...options
        });
      };
      hooks.useDraggableCollection = useDraggableCollection;
      hooks.useDraggableItem = useDraggableItem;
      hooks.DragPreview = DragPreview;
    }
    if (isDroppable) {
      // eslint-disable-next-line no-unused-expressions
      hooks.useDroppableCollectionState = function useDroppableCollectionStateOverride(props) {
        return useDroppableCollectionState({
          ...props,
          ...options
        });
      }, hooks.useDroppableItem = useDroppableItem;
      hooks.useDroppableCollection = function useDroppableCollectionOverride(props, state, ref) {
        return useDroppableCollection({
          ...props,
          ...options
        }, state, ref);
      };
      hooks.useDropIndicator = useDropIndicator;
    }
    if (isDraggable || isDroppable) {
      hooks.isVirtualDragging = isVirtualDragging;
    }
    return hooks;
  }, [options]);
  return {
    dragAndDropHooks
  };
}

export { _FileTrigger as FileTrigger, useDragAndDrop };
