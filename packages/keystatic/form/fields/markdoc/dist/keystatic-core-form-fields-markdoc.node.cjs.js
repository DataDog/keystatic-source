'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Markdoc = require('@markdoc/markdoc');
var field = require('@keystar/ui/field');
var React = require('react');
var layout = require('@keystar/ui/layout');
var typography = require('@keystar/ui/typography');
var style = require('@keystar/ui/style');
var prosemirrorCommands = require('prosemirror-commands');
var prosemirrorState = require('prosemirror-state');
var prosemirrorTransform = require('prosemirror-transform');
var button = require('@keystar/ui/button');
var editor = require('@keystar/ui/editor');
var icon = require('@keystar/ui/icon');
var boldIcon = require('@keystar/ui/icon/icons/boldIcon');
var chevronDownIcon = require('@keystar/ui/icon/icons/chevronDownIcon');
var codeIcon = require('@keystar/ui/icon/icons/codeIcon');
var italicIcon = require('@keystar/ui/icon/icons/italicIcon');
var listIcon = require('@keystar/ui/icon/icons/listIcon');
var listOrderedIcon = require('@keystar/ui/icon/icons/listOrderedIcon');
var minusIcon = require('@keystar/ui/icon/icons/minusIcon');
var plusIcon = require('@keystar/ui/icon/icons/plusIcon');
var quoteIcon = require('@keystar/ui/icon/icons/quoteIcon');
var removeFormattingIcon = require('@keystar/ui/icon/icons/removeFormattingIcon');
var strikethroughIcon = require('@keystar/ui/icon/icons/strikethroughIcon');
var tableIcon = require('@keystar/ui/icon/icons/tableIcon');
var menu = require('@keystar/ui/menu');
var picker = require('@keystar/ui/picker');
var tooltip = require('@keystar/ui/tooltip');
var fileCodeIcon = require('@keystar/ui/icon/icons/fileCodeIcon');
var heading1Icon = require('@keystar/ui/icon/icons/heading1Icon');
var heading2Icon = require('@keystar/ui/icon/icons/heading2Icon');
var heading3Icon = require('@keystar/ui/icon/icons/heading3Icon');
var heading4Icon = require('@keystar/ui/icon/icons/heading4Icon');
var heading5Icon = require('@keystar/ui/icon/icons/heading5Icon');
var heading6Icon = require('@keystar/ui/icon/icons/heading6Icon');
var separatorHorizontalIcon = require('@keystar/ui/icon/icons/separatorHorizontalIcon');
var prosemirrorModel = require('prosemirror-model');
var prosemirrorView = require('prosemirror-view');
var jsxRuntime = require('react/jsx-runtime');
var imageIcon = require('@keystar/ui/icon/icons/imageIcon');
var index = require('../../../../dist/index-1284ddc2.node.cjs.js');
var matchSorter = require('match-sorter');
var weakMemoize$1 = require('@emotion/weak-memoize');
var selection = require('@react-aria/selection');
var utils = require('@react-aria/utils');
var list = require('@react-stately/list');
var listbox = require('@keystar/ui/listbox');
var prosemirrorTables = require('prosemirror-tables');
var trash2Icon = require('@keystar/ui/icon/icons/trash2Icon');
var sheetIcon = require('@keystar/ui/icon/icons/sheetIcon');
var collections = require('@react-stately/collections');
var combobox = require('@keystar/ui/combobox');
var i18n = require('@react-aria/i18n');
var dialog = require('@keystar/ui/dialog');
var editIcon = require('@keystar/ui/icon/icons/editIcon');
var externalLinkIcon = require('@keystar/ui/icon/icons/externalLinkIcon');
var unlinkIcon = require('@keystar/ui/icon/icons/unlinkIcon');
var slots = require('@keystar/ui/slots');
var textField = require('@keystar/ui/text-field');
var fileUpIcon = require('@keystar/ui/icon/icons/fileUpIcon');
var reactDom = require('react-dom');
var css = require('@emotion/css');
var prosemirrorHistory = require('prosemirror-history');
var prosemirrorKeymap = require('prosemirror-keymap');
var escape = require('escape-string-regexp');
var sanitizeUrl = require('@braintree/sanitize-url');
var jsBase64 = require('js-base64');
require('slate');
require('emery/assertions');
require('emery');
require('crypto');
require('@keystar/ui/split-view');
require('@keystar/ui/drag-and-drop');
require('@keystar/ui/list-view');
require('slate-react');
require('is-hotkey');
require('@keystar/ui/icon/icons/linkIcon');
require('@react-aria/overlays');
require('@react-stately/overlays');
require('@keystar/ui/overlays');
require('@keystar/ui/action-group');
require('@keystar/ui/icon/icons/maximizeIcon');
require('@keystar/ui/icon/icons/minimizeIcon');
require('@keystar/ui/icon/icons/subscriptIcon');
require('@keystar/ui/icon/icons/superscriptIcon');
require('@keystar/ui/icon/icons/typeIcon');
require('@keystar/ui/icon/icons/underlineIcon');
require('@keystar/ui/icon/icons/alignLeftIcon');
require('@keystar/ui/icon/icons/alignRightIcon');
require('@keystar/ui/icon/icons/alignCenterIcon');
require('@keystar/ui/icon/icons/trashIcon');
require('@keystar/ui/icon/icons/columnsIcon');
require('@keystar/ui/checkbox');
require('@keystar/ui/number-field');
require('minimatch');
require('@ts-gql/tag/no-transform');
require('urql');
require('lru-cache');
require('cookie');
require('zod');
require('@sindresorhus/slugify');
require('@keystar/ui/link');
require('@keystar/ui/progress');
require('@keystar/ui/icon/icons/link2Icon');
require('@keystar/ui/icon/icons/link2OffIcon');
require('@keystar/ui/icon/icons/pencilIcon');
require('@keystar/ui/icon/icons/undo2Icon');
require('@keystar/ui/utils');
require('scroll-into-view-if-needed');
require('slate-history');
require('mdast-util-from-markdown');
require('mdast-util-gfm-autolink-literal/from-markdown');
require('micromark-extension-gfm-autolink-literal');
require('mdast-util-gfm-strikethrough/from-markdown');
require('micromark-extension-gfm-strikethrough');
require('@keystar/ui/icon/icons/panelLeftOpenIcon');
require('@keystar/ui/icon/icons/panelLeftCloseIcon');
require('@keystar/ui/icon/icons/panelRightOpenIcon');
require('@keystar/ui/icon/icons/panelRightCloseIcon');
require('@keystar/ui/badge');
require('@keystar/ui/nav-list');
require('@keystar/ui/status-light');
require('@keystar/ui/core');
require('@keystar/ui/avatar');
require('@keystar/ui/icon/icons/logOutIcon');
require('@keystar/ui/icon/icons/gitPullRequestIcon');
require('@keystar/ui/icon/icons/gitBranchPlusIcon');
require('@keystar/ui/icon/icons/githubIcon');
require('@keystar/ui/icon/icons/gitForkIcon');
require('@keystar/ui/icon/icons/monitorIcon');
require('@keystar/ui/icon/icons/moonIcon');
require('@keystar/ui/icon/icons/sunIcon');
require('@keystar/ui/icon/icons/userIcon');
require('@keystar/ui/icon/icons/gitBranchIcon');
require('@keystar/ui/radio');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var Markdoc__default = /*#__PURE__*/_interopDefault(Markdoc);
var React__default = /*#__PURE__*/_interopDefault(React);
var weakMemoize__default = /*#__PURE__*/_interopDefault(weakMemoize$1);
var escape__default = /*#__PURE__*/_interopDefault(escape);

const classes = {
  blockParent: 'ProseMirror-blockParent',
  focused: 'ProseMirror-focused',
  hideselection: 'ProseMirror-hideselection',
  nodeInSelection: 'ProseMirror-nodeInSelection',
  nodeSelection: 'ProseMirror-selectednode',
  placeholder: 'ProseMirror-placeholder'
};
const markdocIdentifierPattern = /^[a-zA-Z][-_a-zA-Z0-9]*$/;
function weakMemoize(func) {
  const cache = new WeakMap();
  return arg => {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const result = func(arg);
    cache.set(arg, result);
    return result;
  };
}
const nodeWithBorder = style.css({
  border: `${style.tokenSchema.size.border.regular} solid ${style.tokenSchema.color.alias.borderIdle}`,
  borderRadius: style.tokenSchema.size.radius.regular,
  [`&.${classes.nodeInSelection}, &.${classes.nodeSelection}`]: {
    borderColor: style.tokenSchema.color.alias.borderSelected,
    outline: 'none !important',
    boxShadow: `0 0 0 1px ${style.tokenSchema.color.alias.borderSelected}`
  }
});
let maskColor = style.tokenSchema.color.background.canvas;
let borderColor = style.tokenSchema.color.alias.borderSelected;
let borderSize = style.tokenSchema.size.border.medium;
let circleSize = style.tokenSchema.size.space.regular;
style.injectGlobal({
  '.prosemirror-dropcursor-block': {
    '&::before, &::after': {
      backgroundColor: maskColor,
      border: `${borderSize} solid ${borderColor}`,
      borderRadius: '50%',
      content: '" "',
      height: circleSize,
      position: 'absolute',
      width: circleSize,
      top: `calc(${circleSize} / -2 - ${borderSize} / 2)`
    },
    '&::before': {
      left: `calc(${circleSize} * -1)`
    },
    '&::after': {
      right: `calc(${circleSize} * -1)`
    }
  }
});

// void elements cannot have pseudo-elements so we need to style them differently
const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
const prosemirrorStyles = style.css`
  /* Provide our own selection indicator */
  .${classes.nodeSelection} {
    position: relative;
  }
  .${classes.nodeSelection}::after {
    background-color: ${style.tokenSchema.color.alias.backgroundSelected};
    border-radius: ${style.tokenSchema.size.radius.small};
    content: '';
    inset: calc(${style.tokenSchema.size.alias.focusRingGap} * -1);
    pointer-events: none;
    position: absolute;
  }
  .${classes.nodeSelection}:is(${voidElements.join(', ')}) {
    outline: ${style.tokenSchema.size.alias.focusRing} solid
      ${style.tokenSchema.color.border.accent};
    outline-offset: ${style.tokenSchema.size.alias.focusRingGap};
  }
  .${classes.hideselection} *::selection {
    background: transparent;
  }
  .${classes.hideselection} *::-moz-selection {
    background: transparent;
  }
  .${classes.hideselection} {
    caret-color: transparent;
  }

  /* Style the placeholder element */
  .${classes.placeholder} {
    color: ${style.tokenSchema.color.foreground.neutralTertiary};
    pointer-events: none;
  }

  /* Protect against generic img rules */
  img.ProseMirror-separator {
    display: inline !important;
    border: none !important;
    margin: 0 !important;
  }

  /* Provide an indicator for focusing places that don't allow regular selection */
  .ProseMirror-gapcursor {
    display: none;
    pointer-events: none;
    position: absolute;
  }
  .ProseMirror-gapcursor:after {
    content: '';
    display: block;
    position: absolute;
    top: -2px;
    width: 20px;
    border-top: 1px solid black;
    animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
  }

  @keyframes ProseMirror-cursor-blink {
    to {
      visibility: hidden;
    }
  }

  .ProseMirror-focused .ProseMirror-gapcursor {
    display: block;
  }
`;
function useEventCallback(callback) {
  const callbackRef = React.useRef(callback);
  const cb = React.useCallback((...args) => {
    return callbackRef.current(...args);
  }, []);
  React.useEffect(() => {
    callbackRef.current = callback;
  });
  return cb;
}

function insertNode(nodeType) {
  return (state, dispatch) => {
    if (state.selection instanceof prosemirrorState.NodeSelection && state.selection.node.type === nodeType) {
      return false;
    }
    if (dispatch) {
      dispatch(state.tr.replaceSelectionWith(nodeType.createAndFill()));
    }
    return true;
  };
}
function toggleCodeBlock(codeBlock, paragraph) {
  return (state, dispatch, view) => {
    const codeBlockPositions = [];
    for (const range of state.selection.ranges) {
      state.doc.nodesBetween(range.$from.pos, range.$to.pos, (node, pos) => {
        if (node.type === codeBlock) {
          codeBlockPositions.push([pos, pos + node.nodeSize]);
        }
      });
    }
    if (!codeBlockPositions.length) {
      return prosemirrorCommands.setBlockType(codeBlock)(state, dispatch, view);
    }
    if (dispatch) {
      const tr = state.tr;
      for (const [start, end] of codeBlockPositions) {
        tr.setBlockType(start, end, paragraph);
      }
      dispatch(tr);
    }
    return true;
  };
}
function insertTable(schema) {
  return (state, dispatch) => {
    const cell = schema.nodes.table_cell.createAndFill();
    const row = schema.nodes.table_row.create(undefined, [cell, cell, cell]);
    dispatch === null || dispatch === void 0 || dispatch(state.tr.replaceSelectionWith(schema.nodes.table.create(undefined, [row, row, row])));
    return true;
  };
}

// https://github.com/ProseMirror/prosemirror-schema-list/blob/d017648e4f4472076599aa12ec839ae222e6e1b5/src/schema-list.ts
function findParentList(range, listItemType) {
  for (let d = range.depth; d > 0; d--) {
    let parent = range.$from.node(d);
    if (parent.type.contentMatch.defaultType === listItemType) {
      return {
        node: parent,
        pos: range.$from.before(d)
      };
    }
  }
}
function toggleList(listType, attrs = null) {
  const listItemType = listType.contentMatch.defaultType;
  return function (state, dispatch) {
    let {
      $from,
      $to
    } = state.selection;
    let range = $from.blockRange($to),
      doJoin = false,
      outerRange = range;
    if (!range) return false;
    const parentList = findParentList(range, listItemType);
    if ((parentList === null || parentList === void 0 ? void 0 : parentList.node.type) == listType) {
      return liftListItem(listItemType)(state, dispatch);
    }
    if (parentList && parentList.node.type !== listType) {
      if (dispatch) {
        dispatch(state.tr.setNodeMarkup(parentList.pos, listType, attrs).scrollIntoView());
      }
      return true;
    }
    // This is at the top of an existing list item
    if (range.depth >= 2 && $from.node(range.depth - 1).type.compatibleContent(listType) && range.startIndex == 0) {
      // Don't do anything if this is the top of the list
      if ($from.index(range.depth - 1) == 0) return false;
      let $insert = state.doc.resolve(range.start - 2);
      outerRange = new prosemirrorModel.NodeRange($insert, $insert, range.depth);
      if (range.endIndex < range.parent.childCount) {
        range = new prosemirrorModel.NodeRange($from, state.doc.resolve($to.end(range.depth)), range.depth);
      }
      doJoin = true;
    }
    let wrap = prosemirrorTransform.findWrapping(outerRange, listType, attrs, range);
    if (!wrap) return false;
    if (dispatch) {
      dispatch(doWrapInList(state.tr, range, wrap, doJoin, listType).scrollIntoView());
    }
    return true;
  };
}
function doWrapInList(tr, range, wrappers, joinBefore, listType) {
  let content = prosemirrorModel.Fragment.empty;
  for (let i = wrappers.length - 1; i >= 0; i--) {
    content = prosemirrorModel.Fragment.from(wrappers[i].type.create(wrappers[i].attrs, content));
  }
  tr.step(new prosemirrorTransform.ReplaceAroundStep(range.start - (joinBefore ? 2 : 0), range.end, range.start, range.end, new prosemirrorModel.Slice(content, 0, 0), wrappers.length, true));
  let found = 0;
  for (let i = 0; i < wrappers.length; i++) {
    if (wrappers[i].type == listType) found = i + 1;
  }
  let splitDepth = wrappers.length - found;
  let splitPos = range.start + wrappers.length - (joinBefore ? 2 : 0),
    parent = range.parent;
  for (let i = range.startIndex, e = range.endIndex, first = true; i < e; i++, first = false) {
    if (!first && prosemirrorTransform.canSplit(tr.doc, splitPos, splitDepth)) {
      tr.split(splitPos, splitDepth);
      splitPos += 2 * splitDepth;
    }
    splitPos += parent.child(i).nodeSize;
  }
  return tr;
}

/// Build a command that splits a non-empty textblock at the top level
/// of a list item by also splitting that list item.
function splitListItem(itemType) {
  return function (state, dispatch) {
    let {
      $from,
      $to,
      node
    } = state.selection;
    if (node && node.isBlock || $from.depth < 2 || !$from.sameParent($to)) {
      return false;
    }
    let grandParent = $from.node(-1);
    if (grandParent.type != itemType) return false;
    if ($from.parent.content.size == 0 && $from.node(-1).childCount == $from.indexAfter(-1)) {
      // In an empty block. If this is a nested list, the wrapping
      // list item should be split. Otherwise, bail out and let next
      // command handle lifting.
      if ($from.depth == 3 || $from.node(-3).type != itemType || $from.index(-2) != $from.node(-2).childCount - 1) {
        return false;
      }
      if (dispatch) {
        let wrap = prosemirrorModel.Fragment.empty;
        let depthBefore = $from.index(-1) ? 1 : $from.index(-2) ? 2 : 3;
        // Build a fragment containing empty versions of the structure
        // from the outer list item to the parent node of the cursor
        for (let d = $from.depth - depthBefore; d >= $from.depth - 3; d--) {
          wrap = prosemirrorModel.Fragment.from($from.node(d).copy(wrap));
        }
        let depthAfter = $from.indexAfter(-1) < $from.node(-2).childCount ? 1 : $from.indexAfter(-2) < $from.node(-3).childCount ? 2 : 3;
        // Add a second list item with an empty default start node
        wrap = wrap.append(prosemirrorModel.Fragment.from(itemType.createAndFill()));
        let start = $from.before($from.depth - (depthBefore - 1));
        let tr = state.tr.replace(start, $from.after(-depthAfter), new prosemirrorModel.Slice(wrap, 4 - depthBefore, 0));
        let sel = -1;
        tr.doc.nodesBetween(start, tr.doc.content.size, (node, pos) => {
          if (sel > -1) return false;
          if (node.isTextblock && node.content.size == 0) sel = pos + 1;
        });
        if (sel > -1) tr.setSelection(prosemirrorState.Selection.near(tr.doc.resolve(sel)));
        dispatch(tr.scrollIntoView());
      }
      return true;
    }
    let nextType = $to.pos == $from.end() ? grandParent.contentMatchAt(0).defaultType : null;
    let tr = state.tr.delete($from.pos, $to.pos);
    let types = nextType ? [null, {
      type: nextType
    }] : undefined;
    if (!prosemirrorTransform.canSplit(tr.doc, $from.pos, 2, types)) return false;
    if (dispatch) dispatch(tr.split($from.pos, 2, types).scrollIntoView());
    return true;
  };
}

/// Create a command to lift the list item around the selection up into
/// a wrapping list.
function liftListItem(itemType) {
  return function (state, dispatch) {
    let {
      $from,
      $to
    } = state.selection;
    let range = $from.blockRange($to, node => node.childCount > 0 && node.firstChild.type == itemType);
    if (!range) return false;
    if (!dispatch) return true;
    if ($from.node(range.depth - 1).type == itemType) {
      // Inside a parent list
      return liftToOuterList(state, dispatch, itemType, range);
    } // Outer list node
    else {
      return liftOutOfList(state, dispatch, range);
    }
  };
}
function liftToOuterList(state, dispatch, itemType, range) {
  let tr = state.tr,
    end = range.end,
    endOfList = range.$to.end(range.depth);
  if (end < endOfList) {
    // There are siblings after the lifted items, which must become
    // children of the last item
    tr.step(new prosemirrorTransform.ReplaceAroundStep(end - 1, endOfList, end, endOfList, new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(itemType.create(null, range.parent.copy())), 1, 0), 1, true));
    range = new prosemirrorModel.NodeRange(tr.doc.resolve(range.$from.pos), tr.doc.resolve(endOfList), range.depth);
  }
  const target = prosemirrorTransform.liftTarget(range);
  if (target == null) return false;
  tr.lift(range, target);
  let after = tr.mapping.map(end, -1) - 1;
  if (prosemirrorTransform.canJoin(tr.doc, after)) tr.join(after);
  dispatch(tr.scrollIntoView());
  return true;
}
function liftOutOfList(state, dispatch, range) {
  let tr = state.tr,
    list = range.parent;
  // Merge the list items into a single big item
  for (let pos = range.end, i = range.endIndex - 1, e = range.startIndex; i > e; i--) {
    pos -= list.child(i).nodeSize;
    tr.delete(pos - 1, pos + 1);
  }
  let $start = tr.doc.resolve(range.start),
    item = $start.nodeAfter;
  if (tr.mapping.map(range.end) != range.start + $start.nodeAfter.nodeSize) {
    return false;
  }
  let atStart = range.startIndex == 0,
    atEnd = range.endIndex == list.childCount;
  let parent = $start.node(-1),
    indexBefore = $start.index(-1);
  if (!parent.canReplace(indexBefore + (atStart ? 0 : 1), indexBefore + 1, item.content.append(atEnd ? prosemirrorModel.Fragment.empty : prosemirrorModel.Fragment.from(list)))) {
    return false;
  }
  let start = $start.pos,
    end = start + item.nodeSize;
  // Strip off the surrounding list. At the sides where we're not at
  // the end of the list, the existing list is closed. At sides where
  // this is the end, it is overwritten to its end.
  tr.step(new prosemirrorTransform.ReplaceAroundStep(start - (atStart ? 1 : 0), end + (atEnd ? 1 : 0), start + 1, end - 1, new prosemirrorModel.Slice((atStart ? prosemirrorModel.Fragment.empty : prosemirrorModel.Fragment.from(list.copy(prosemirrorModel.Fragment.empty))).append(atEnd ? prosemirrorModel.Fragment.empty : prosemirrorModel.Fragment.from(list.copy(prosemirrorModel.Fragment.empty))), atStart ? 0 : 1, atEnd ? 0 : 1), atStart ? 0 : 1));
  dispatch(tr.scrollIntoView());
  return true;
}

/// Create a command to sink the list item around the selection down
/// into an inner list.
function sinkListItem(itemType) {
  return function (state, dispatch) {
    let {
      $from,
      $to
    } = state.selection;
    let range = $from.blockRange($to, node => node.childCount > 0 && node.firstChild.type == itemType);
    if (!range) return false;
    let startIndex = range.startIndex;
    if (startIndex == 0) return false;
    let parent = range.parent,
      nodeBefore = parent.child(startIndex - 1);
    if (nodeBefore.type != itemType) return false;
    if (dispatch) {
      let nestedBefore = nodeBefore.lastChild && nodeBefore.lastChild.type == parent.type;
      let inner = prosemirrorModel.Fragment.from(nestedBefore ? itemType.create() : null);
      let slice = new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(itemType.create(null, prosemirrorModel.Fragment.from(parent.type.create(null, inner)))), nestedBefore ? 3 : 1, 0);
      let before = range.start,
        after = range.end;
      dispatch(state.tr.step(new prosemirrorTransform.ReplaceAroundStep(before - (nestedBefore ? 3 : 1), after, before, after, slice, 1, true)).scrollIntoView());
    }
    return true;
  };
}

const getAttributeType = weakMemoize(function getAttributesType(schema) {
  for (const node of Object.values(schema.nodes)) {
    if (node.spec === attributeSchema.attribute) {
      return node;
    }
  }
  throw new Error('No attributes node found in the schema');
});
const attributeSchema = {
  attribute: {
    attrs: {
      name: {}
    },
    content: 'attribute_expression',
    inline: true,
    atom: true,
    parseDOM: [{
      tag: '[data-markdoc-attribute]',
      getAttrs(node) {
        if (typeof node === 'string') return false;
        let name = node.getAttribute('data-markdoc-attribute');
        if (name === '#') name = 'id';
        if (name === '.') name = 'class';
        if (name === null || !markdocIdentifierPattern.test(name)) {
          return false;
        }
        return {
          name
        };
      }
    }],
    toDOM(node) {
      return ['span', {
        'data-markdoc-attribute': node.attrs.name === 'id' ? '#' : node.attrs.name === 'class' ? '.' : `${node.attrs.name}`
      }, 0];
    }
  },
  attribute_string: {
    group: 'attribute_expression',
    content: 'text*',
    marks: '',
    parseDOM: [{
      tag: '[data-markdoc-expression="string"]'
    }],
    toDOM() {
      return ['span', {
        'data-markdoc-expression': 'string'
      }, 0];
    }
  },
  attribute_null: {
    group: 'attribute_expression',
    toDOM() {
      return ['span', {
        class: style.css({
          color: 'lightsteelblue'
        })
      }, 'null'];
    }
  },
  attribute_true: {
    group: 'attribute_expression',
    toDOM() {
      return ['span', {
        class: style.css({
          color: 'lightsteelblue'
        })
      }, 'true'];
    }
  },
  attribute_false: {
    group: 'attribute_expression',
    toDOM() {
      return ['span', {
        class: style.css({
          color: 'lightsteelblue'
        })
      }, 'false'];
    }
  },
  attribute_number: {
    group: 'attribute_expression',
    content: 'text*',
    marks: '',
    toDOM() {
      return ['span', {
        class: style.css({
          color: 'lightsteelblue'
        })
      }, 'null'];
    }
  },
  attribute_variable: {
    group: 'attribute_expression',
    content: 'text*',
    marks: '',
    toDOM() {
      return ['span', {
        class: style.css({
          color: 'lightsteelblue'
        })
      }, '$', ['span', 0]];
    }
  },
  attribute_object: {
    group: 'attribute_expression',
    content: 'attribute*',
    marks: '',
    toDOM() {
      return ['span', ['span', {
        class: style.css({
          color: 'green'
        }),
        contenteditable: false
      }, '{'], ['span', 0], ['span', {
        class: style.css({
          color: 'green'
        }),
        contenteditable: false
      }, '}']];
    }
  }
};

// https://github.com/ProseMirror/prosemirror-gapcursor/blob/bbbee7d483754310f63f3b18d81f5a1da1250234/src/gapcursor.ts#L1
const independentForGapCursor = '@@independentForGapCursor';

/// Gap cursor selections are represented using this class. Its
/// `$anchor` and `$head` properties both point at the cursor position.
class GapCursor extends prosemirrorState.Selection {
  /// Create a gap cursor.
  constructor($pos) {
    super($pos, $pos);
  }
  map(doc, mapping) {
    let $pos = doc.resolve(mapping.map(this.head));
    return GapCursor.valid($pos) ? new GapCursor($pos) : prosemirrorState.Selection.near($pos);
  }
  content() {
    return prosemirrorModel.Slice.empty;
  }
  eq(other) {
    return other instanceof GapCursor && other.head == this.head;
  }
  toJSON() {
    return {
      type: 'ksgapcursor',
      pos: this.head
    };
  }

  /// @internal
  static fromJSON(doc, json) {
    if (typeof json.pos != 'number') {
      throw new RangeError('Invalid input for GapCursor.fromJSON');
    }
    return new GapCursor(doc.resolve(json.pos));
  }

  /// @internal
  getBookmark() {
    return new GapBookmark(this.anchor);
  }

  /// @internal
  static valid($pos) {
    let parent = $pos.parent;
    if (parent.isTextblock || !closedBefore($pos) || !closedAfter($pos)) {
      return false;
    }
    let override = parent.type.spec.allowGapCursor;
    if (override != null) return override;
    let deflt = parent.contentMatchAt($pos.index()).defaultType;
    return deflt && deflt.isTextblock;
  }

  /// @internal
  static findGapCursorFrom($pos, dir, mustMove = false) {
    search: for (;;) {
      if (!mustMove && GapCursor.valid($pos)) return $pos;
      let pos = $pos.pos,
        next = null;
      // Scan up from this position
      for (let d = $pos.depth;; d--) {
        let parent = $pos.node(d);
        if (dir > 0 ? $pos.indexAfter(d) < parent.childCount : $pos.index(d) > 0) {
          next = parent.child(dir > 0 ? $pos.indexAfter(d) : $pos.index(d) - 1);
          break;
        } else if (d == 0) {
          return null;
        }
        pos += dir;
        let $cur = $pos.doc.resolve(pos);
        if (GapCursor.valid($cur)) return $cur;
      }

      // And then down into the next node
      for (;;) {
        let inside = dir > 0 ? next.firstChild : next.lastChild;
        if (!inside) {
          if (next.isAtom && !next.isText && !prosemirrorState.NodeSelection.isSelectable(next)) {
            $pos = $pos.doc.resolve(pos + next.nodeSize * dir);
            mustMove = false;
            continue search;
          }
          break;
        }
        next = inside;
        pos += dir;
        let $cur = $pos.doc.resolve(pos);
        if (GapCursor.valid($cur)) return $cur;
      }
      return null;
    }
  }
}
GapCursor.prototype.visible = false;
GapCursor.findFrom = GapCursor.findGapCursorFrom;
prosemirrorState.Selection.jsonID('ksgapcursor', GapCursor);
class GapBookmark {
  constructor(pos) {
    this.pos = pos;
  }
  map(mapping) {
    return new GapBookmark(mapping.map(this.pos));
  }
  resolve(doc) {
    let $pos = doc.resolve(this.pos);
    return GapCursor.valid($pos) ? new GapCursor($pos) : prosemirrorState.Selection.near($pos);
  }
}
function closedBefore($pos) {
  for (let d = $pos.depth; d >= 0; d--) {
    let index = $pos.index(d),
      parent = $pos.node(d);
    // At the start of this parent, look at next one
    if (index == 0) {
      if (parent.type.spec.isolating) return true;
      continue;
    }
    // See if the node before (or its first ancestor) is closed
    for (let before = parent.child(index - 1);; before = before.lastChild) {
      if (before.childCount == 0 && !before.inlineContent || before.isAtom || before.type.spec.isolating || before.type.spec[independentForGapCursor]) {
        return true;
      }
      if (before.inlineContent) return false;
    }
  }
  // Hit start of document
  return true;
}
function closedAfter($pos) {
  for (let d = $pos.depth; d >= 0; d--) {
    let index = $pos.indexAfter(d),
      parent = $pos.node(d);
    if (index == parent.childCount) {
      if (parent.type.spec.isolating) return true;
      continue;
    }
    for (let after = parent.child(index);; after = after.firstChild) {
      if (after.childCount == 0 && !after.inlineContent || after.isAtom || after.type.spec.isolating || after.type.spec[independentForGapCursor]) {
        return true;
      }
      if (after.inlineContent) return false;
    }
  }
  return true;
}

const blockElementSpacing = style.css({
  marginBlock: '1em'
});
const paragraphDOM = ['p', {
  class: blockElementSpacing
}, 0];
const blockquoteDOM = ['blockquote', {
  class: style.classNames(classes.blockParent, style.css({
    [`&.${classes.nodeInSelection}, &.${classes.nodeSelection}`]: {
      borderColor: style.tokenSchema.color.alias.borderSelected
    }
  }))
}, 0];
const dividerDOM = ['hr', {
  contenteditable: 'false',
  class: style.css({
    cursor: 'pointer',
    [`&.${classes.nodeInSelection}, &.${classes.nodeSelection}`]: {
      backgroundColor: style.tokenSchema.color.alias.borderSelected
    }
  })
}];
const codeDOM = ['pre', {
  spellcheck: 'false'
}, ['code', {}, 0]];
const hardBreakDOM = ['br'];
const olDOM = ['ol', {}, 0];
const ulDOM = ['ul', {}, 0];
const liDOM = ['li', {}, 0];
const inlineContent = `(text | image | (text hard_break) | attribute)*`;
const levels = [1, 2, 3, 4, 5, 6];
const levelsMeta = [{
  description: 'Use this for a top level heading',
  icon: heading1Icon.heading1Icon
}, {
  description: 'Use this for key sections',
  icon: heading2Icon.heading2Icon
}, {
  description: 'Use this for sub-sections',
  icon: heading3Icon.heading3Icon
}, {
  description: 'Use this for deep headings',
  icon: heading4Icon.heading4Icon
}, {
  description: 'Use this for grouping list items',
  icon: heading5Icon.heading5Icon
}, {
  description: 'Use this for low-level headings',
  icon: heading6Icon.heading6Icon
}];
const cellAttrs = {
  colspan: {
    default: 1
  },
  rowspan: {
    default: 1
  }
};
const tableCellClass = style.css({
  borderBottom: `1px solid ${style.tokenSchema.color.alias.borderIdle}`,
  borderInlineEnd: `1px solid ${style.tokenSchema.color.alias.borderIdle}`,
  boxSizing: 'border-box',
  margin: 0,
  padding: style.tokenSchema.size.space.regular,
  position: 'relative',
  textAlign: 'start',
  verticalAlign: 'top',
  '&.selectedCell': {
    backgroundColor: style.tokenSchema.color.alias.backgroundSelected,
    '& *::selection': {
      backgroundColor: 'transparent'
    }
  },
  '&.selectedCell::after': {
    border: `1px solid ${style.tokenSchema.color.alias.borderSelected}`,
    position: 'absolute',
    top: -1,
    left: -1,
    content: '""',
    height: '100%',
    width: '100%'
  }
});
const tableHeaderClass = style.css(tableCellClass, {
  backgroundColor: style.tokenSchema.color.scale.slate3,
  fontWeight: style.tokenSchema.typography.fontWeight.semibold
});
const nodeSpecs = {
  doc: {
    content: 'block+'
  },
  paragraph: {
    content: inlineContent,
    group: 'block',
    parseDOM: [{
      tag: 'p'
    }],
    toDOM() {
      return paragraphDOM;
    }
  },
  text: {
    group: 'inline'
  },
  tag_attributes: {
    content: 'attribute*',
    selectable: false,
    defining: true,
    parseDOM: [{
      tag: '[data-markdoc-attributes]'
    }],
    toDOM() {
      return ['div', {
        'data-markdoc-attributes': '1',
        class: style.css({
          display: 'block',
          backgroundColor: style.tokenSchema.color.background.surface,
          paddingInline: 0,
          borderBottom: `${style.tokenSchema.size.border.regular} solid ${style.tokenSchema.color.alias.borderIdle}`
        })
      }, ['span', {
        'data-tag-name': 'true',
        class: style.css({
          '::before': {
            display: 'inline-block',
            width: 'auto',
            content: 'var(--tag-name)',
            verticalAlign: 'top',
            backgroundColor: style.tokenSchema.color.background.surfaceTertiary,
            paddingInline: style.tokenSchema.size.space.small,
            borderRight: `${style.tokenSchema.size.border.regular} solid ${style.tokenSchema.color.alias.borderIdle}`,
            borderBottom: `${style.tokenSchema.size.border.regular} solid ${style.tokenSchema.color.alias.borderIdle}`,
            borderEndEndRadius: style.tokenSchema.size.radius.small,
            [`.${classes.nodeSelection} > > &`]: {
              borderColor: style.tokenSchema.color.alias.borderSelected
            }
          }
        })
      }], ['span', {
        class: style.css({
          display: 'inline-block',
          padding: style.tokenSchema.size.space.small
        })
      }, 0]];
    }
  },
  tag_slot: {
    attrs: {
      name: {
        default: 'children'
      }
    },
    content: 'block+',
    defining: true,
    toDOM(node) {
      if (node.attrs.name === 'children') {
        return ['div', {
          class: style.css({
            borderTop: '2px solid green',
            paddingInline: -2
          })
        }, 0];
      }
      return ['div', {
        'data-slot': node.attrs.name,
        class: style.css({
          borderTop: '2px solid green',
          paddingInline: -2,
          '::before': {
            content: `attr(data-slot)`,
            display: 'inline-block'
          }
        })
      }, 0];
    }
  },
  tag: {
    attrs: {
      name: {}
    },
    group: 'block',
    defining: true,
    [independentForGapCursor]: true,
    content: 'tag_attributes tag_slot* block*',
    parseDOM: [{
      tag: '[data-markdoc-tag]',
      getAttrs(node) {
        if (typeof node === 'string') return false;
        let name = node.getAttribute('data-markdoc-tag');
        if (name === null || !markdocIdentifierPattern.test(name)) {
          return false;
        }
        return {
          name
        };
      }
    }],
    toDOM(node) {
      const element = document.createElement('div');
      element.dataset.markdocTag = node.attrs.name;
      element.style.setProperty('--tag-name', JSON.stringify(node.attrs.name));
      element.classList.add(style.css({
        marginBlock: '1em',
        overflow: 'hidden',
        '& > *': {
          paddingInline: style.tokenSchema.size.space.small
        }
      }));
      element.classList.add(nodeWithBorder);
      return {
        dom: element,
        contentDOM: element
      };
    }
  },
  blockquote: {
    content: 'block+',
    group: 'block',
    defining: true,
    parseDOM: [{
      tag: 'blockquote'
    }],
    toDOM() {
      return blockquoteDOM;
    },
    insertMenu: {
      label: 'Blockquote',
      description: 'Insert a quote or citation',
      icon: quoteIcon.quoteIcon,
      command: prosemirrorCommands.wrapIn
    }
  },
  divider: {
    group: 'block',
    parseDOM: [{
      tag: 'hr'
    }],
    toDOM() {
      return dividerDOM;
    },
    insertMenu: {
      label: 'Divider',
      description: 'A horizontal line to separate content',
      icon: separatorHorizontalIcon.separatorHorizontalIcon,
      command: insertNode
    }
  },
  code_block: {
    content: 'text*',
    group: 'block',
    defining: true,
    [independentForGapCursor]: true,
    attrs: {
      language: {
        default: ''
      }
    },
    insertMenu: {
      label: 'Code block',
      description: 'Display code with syntax highlighting',
      icon: fileCodeIcon.fileCodeIcon,
      command: prosemirrorCommands.setBlockType
    },
    marks: '',
    code: true,
    parseDOM: [{
      tag: 'pre',
      preserveWhitespace: 'full'
    }],
    toDOM() {
      return codeDOM;
    }
  },
  list_item: {
    content: 'block+',
    parseDOM: [{
      tag: 'li'
    }],
    toDOM() {
      return liDOM;
    },
    defining: true
  },
  unordered_list: {
    content: 'list_item+',
    group: 'block',
    parseDOM: [{
      tag: 'ul'
    }],
    toDOM() {
      return ulDOM;
    },
    insertMenu: {
      label: 'Bullet list',
      description: 'Insert an unordered list',
      icon: listIcon.listIcon,
      command: toggleList
    }
  },
  ordered_list: {
    content: 'list_item+',
    group: 'block',
    parseDOM: [{
      tag: 'ol'
    }],
    toDOM() {
      return olDOM;
    },
    insertMenu: {
      label: 'Ordered list',
      description: 'Insert an ordered list',
      icon: listOrderedIcon.listOrderedIcon,
      command: toggleList
    }
  },
  hard_break: {
    inline: true,
    group: 'inline',
    selectable: false,
    parseDOM: [{
      tag: 'br'
    }],
    toDOM() {
      return hardBreakDOM;
    }
  },
  heading: {
    attrs: {
      level: {
        default: levels[0]
      }
    },
    content: inlineContent,
    group: 'block',
    parseDOM: levels.map(level => ({
      tag: 'h' + level,
      attrs: {
        level
      }
    })),
    defining: true,
    toDOM(node) {
      return ['h' + node.attrs.level, 0];
    },
    insertMenu: levels.map((level, index) => ({
      ...levelsMeta[index],
      label: 'Heading ' + level,
      command: type => prosemirrorCommands.setBlockType(type, {
        level
      })
    }))
  },
  table: {
    content: 'table_row+',
    insertMenu: {
      label: 'Table',
      description: 'Insert a table',
      icon: tableIcon.tableIcon,
      command(_, schema) {
        return insertTable(schema);
      }
    },
    tableRole: 'table',
    isolating: true,
    group: 'block',
    parseDOM: [{
      tag: 'table'
    }],
    toDOM() {
      return ['table', {
        class: style.css({
          width: '100%',
          tableLayout: 'fixed',
          position: 'relative',
          borderSpacing: 0,
          borderInlineStart: `1px solid ${style.tokenSchema.color.alias.borderIdle}`,
          borderTop: `1px solid ${style.tokenSchema.color.alias.borderIdle}`,
          '&:has(.selectedCell) *::selection': {
            backgroundColor: 'transparent'
          },
          // stop content from bouncing around when widgets are added
          '.ProseMirror-widget + *': {
            marginTop: 0
          }
        })
      }, ['tbody', 0]];
    }
  },
  table_row: {
    content: '(table_cell | table_header)*',
    tableRole: 'row',
    allowGapCursor: false,
    parseDOM: [{
      tag: 'tr'
    }],
    toDOM() {
      return ['tr', 0];
    }
  },
  table_cell: {
    content: 'block+',
    tableRole: 'cell',
    isolating: true,
    attrs: cellAttrs,
    parseDOM: [{
      tag: 'td'
    }],
    toDOM() {
      return ['td', {
        class: tableCellClass
      }, 0];
    }
  },
  table_header: {
    content: 'block+',
    tableRole: 'header_cell',
    attrs: cellAttrs,
    isolating: true,
    parseDOM: [{
      tag: 'th'
    }],
    toDOM() {
      return ['th', {
        class: tableHeaderClass
      }, 0];
    }
  },
  image: {
    content: '',
    group: 'inline',
    inline: true,
    attrs: {
      src: {},
      filename: {},
      alt: {
        default: ''
      },
      title: {
        default: ''
      }
    },
    // insertMenu: {
    //   label: 'Image',
    //   description: 'Insert an image',
    //   icon: imageIcon,
    //   command: () => {},
    // },
    toDOM(node) {
      return ['img', {
        src: node.attrs.src,
        alt: node.attrs.alt,
        title: node.attrs.title,
        'data-filename': node.attrs.filename,
        class: style.css({
          boxSizing: 'border-box',
          borderRadius: style.tokenSchema.size.radius.regular,
          display: 'inline-block',
          maxHeight: style.tokenSchema.size.scale[3600],
          maxWidth: '100%',
          transition: style.transition('box-shadow'),
          '&::selection': {
            backgroundColor: 'transparent'
          }
        })
      }];
    },
    parseDOM: [{
      tag: 'img[src][data-filename]',
      getAttrs(node) {
        var _node$getAttribute, _node$getAttribute2;
        if (typeof node === 'string') return false;
        const src = node.getAttribute('src');
        const filename = node.getAttribute('data-filename');
        if (!(src !== null && src !== void 0 && src.startsWith('data:')) || !filename) return false;
        return {
          src,
          alt: (_node$getAttribute = node.getAttribute('alt')) !== null && _node$getAttribute !== void 0 ? _node$getAttribute : '',
          title: (_node$getAttribute2 = node.getAttribute('title')) !== null && _node$getAttribute2 !== void 0 ? _node$getAttribute2 : ''
        };
      }
    }]
  },
  ...attributeSchema
};
const italicDOM = ['em', 0];
const boldDOM = ['strong', 0];
const inlineCodeDOM = ['code', 0];
const strikethroughDOM = ['s', 0];
const markSpecs = {
  link: {
    attrs: {
      href: {},
      title: {
        default: ''
      }
    },
    inclusive: false,
    parseDOM: [{
      tag: 'a[href]',
      getAttrs(node) {
        var _node$getAttribute3;
        if (typeof node === 'string') return false;
        const href = node.getAttribute('href');
        if (!href) return false;
        return {
          href,
          title: (_node$getAttribute3 = node.getAttribute('title')) !== null && _node$getAttribute3 !== void 0 ? _node$getAttribute3 : ''
        };
      }
    }],
    toDOM(node) {
      return ['a', {
        href: node.attrs.href,
        title: node.attrs.title === '' ? undefined : node.attrs.title
      }, 0];
    }
  },
  italic: {
    shortcuts: ['Mod-i', 'Mod-I'],
    parseDOM: [{
      tag: 'i'
    }, {
      tag: 'em'
    }, {
      style: 'font-style=italic'
    }, {
      style: 'font-style=normal',
      clearMark: m => m.type.name == 'italic'
    }],
    toDOM() {
      return italicDOM;
    }
  },
  bold: {
    shortcuts: ['Mod-b', 'Mod-B'],
    parseDOM: [{
      tag: 'strong'
    }, {
      tag: 'b',
      getAttrs: node => typeof node === 'string' ? false : node.style.fontWeight != 'normal' && null
    }, {
      style: 'font-weight=400',
      clearMark: m => m.type.name == 'strong'
    }, {
      style: 'font-weight',
      getAttrs: value => typeof value === 'string' ? /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null : false
    }],
    toDOM() {
      return boldDOM;
    }
  },
  strikethrough: {
    shortcuts: ['Mod-Shift-s', 'Mod-Shift-S'],
    parseDOM: [{
      tag: 's'
    }],
    toDOM() {
      return strikethroughDOM;
    }
  },
  code: {
    shortcuts: ['Mod-`', 'Mod-Shift-M', 'Mod-E', 'Mod-e'],
    parseDOM: [{
      tag: 'code'
    }],
    toDOM() {
      return inlineCodeDOM;
    }
  }
};
function createEditorSchema(markdocConfig) {
  const schema = new prosemirrorModel.Schema({
    nodes: nodeSpecs,
    marks: markSpecs
  });
  const nodes = schema.nodes;
  const marks = schema.marks;
  const editorSchema = {
    schema,
    marks,
    nodes,
    markdocConfig,
    insertMenuItems: []
  };
  schemaToEditorSchema.set(schema, editorSchema);
  const insertMenuItems = [];
  for (const node of Object.values(schema.nodes)) {
    const insertMenuSpec = node.spec.insertMenu;
    if (insertMenuSpec) {
      if (Array.isArray(insertMenuSpec)) {
        for (const item of insertMenuSpec) {
          insertMenuItems.push({
            label: item.label,
            description: item.description,
            icon: item.icon,
            command: item.command(node, editorSchema)
          });
        }
      } else {
        insertMenuItems.push({
          label: insertMenuSpec.label,
          description: insertMenuSpec.description,
          icon: insertMenuSpec.icon,
          command: insertMenuSpec.command(node, editorSchema)
        });
      }
    }
  }
  for (const [tagName, tagConfig] of Object.entries((_markdocConfig$tags = markdocConfig.tags) !== null && _markdocConfig$tags !== void 0 ? _markdocConfig$tags : {})) {
    var _markdocConfig$tags;
    const attributes = [];
    for (const [attrName, attrConfig] of Object.entries((_tagConfig$attributes = tagConfig.attributes) !== null && _tagConfig$attributes !== void 0 ? _tagConfig$attributes : {})) {
      var _tagConfig$attributes;
      if (attrConfig.required && attrConfig.default === undefined) {
        attributes.push(nodes.attribute.createAndFill({
          name: attrName
        }));
      }
    }
    const tag_attributes = nodes.tag_attributes.createChecked(null, attributes);
    const tagChildren = [tag_attributes];
    for (const [slotName, slotConfig] of Object.entries((_tagConfig$slots = tagConfig.slots) !== null && _tagConfig$slots !== void 0 ? _tagConfig$slots : {})) {
      var _tagConfig$slots;
      if (slotConfig.required) {
        tagChildren.push(nodes.tag_slot.createAndFill({
          name: slotName
        }));
      }
    }
    const tag = nodes.tag.createChecked({
      name: tagName
    }, tagChildren);
    const slice = new prosemirrorModel.Slice(prosemirrorModel.Fragment.fromArray([tag]), 0, 0);
    const childrenMatch = nodes.tag.contentMatch.edge(0).next;
    insertMenuItems.push({
      label: tagName,
      forToolbar: true,
      command: (state, dispatch) => {
        const {
          $from,
          $to
        } = state.selection;
        const blockRange = $from.blockRange($to);
        if (!blockRange) return false;
        if (blockRange.$from.node(-1).contentMatchAt(blockRange.$from.index(-1)).matchType(nodes.tag) === null) {
          return false;
        }
        let shouldKeepContent = !tagConfig.selfClosing;
        if (shouldKeepContent) {
          for (let i = blockRange.startIndex; i < blockRange.endIndex; i++) {
            const node = blockRange.parent.child(i);
            if (childrenMatch.matchType(node.type) === null) {
              shouldKeepContent = false;
              break;
            }
          }
        }
        if (dispatch) {
          const {
            tr
          } = state;
          if (shouldKeepContent) {
            tr.step(new prosemirrorTransform.ReplaceAroundStep(blockRange.start, blockRange.end, blockRange.start, blockRange.end, slice, tag.nodeSize - 1));
          } else {
            tr.replaceRange(blockRange.start, blockRange.end, slice);
          }
          dispatch(tr);
        }
        return true;
      }
    });
  }
  // TODO: keep "bullet list" and "ordered list" together
  editorSchema.insertMenuItems = insertMenuItems.sort((a, b) => a.label.localeCompare(b.label)).map((item, i) => ({
    ...item,
    id: i.toString()
  }));
  return editorSchema;
}
const schemaToEditorSchema = new WeakMap();
function getEditorSchema(schema) {
  const editorSchema = schemaToEditorSchema.get(schema);
  if (!editorSchema) {
    throw new Error('No editor schema for schema');
  }
  return editorSchema;
}

const EditorStateContext = /*#__PURE__*/React__default["default"].createContext(null);
function useEditorState() {
  const state = React.useContext(EditorStateContext);
  if (state === null) {
    throw new Error('useEditorState must be used inside ProseMirrorEditorView');
  }
  return state;
}
function useEditorDispatchCommand() {
  return useStableEditorContext().dispatchCommand;
}
function useEditorSchema() {
  return useStableEditorContext().schema;
}
function useEditorViewRef() {
  return useStableEditorContext().view;
}
function useEditorViewInEffect() {
  const editorViewRef = useEditorViewRef();
  const state = useEditorState();
  return React.useCallback(() => {
    if (editorViewRef.current && editorViewRef.current.state !== state) {
      var _editorViewRef$curren;
      (_editorViewRef$curren = editorViewRef.current) === null || _editorViewRef$curren === void 0 || _editorViewRef$curren.updateState(state);
    }
    return editorViewRef.current;
  }, [editorViewRef, state]);
}
function useEditorView(state, _onEditorStateChange) {
  const mountRef = React.useRef(null);
  const viewRef = React.useRef(null);
  const onEditorStateChange = useEventCallback(_onEditorStateChange);
  React.useLayoutEffect(() => {
    if (mountRef.current === null) {
      return;
    }
    const view = new prosemirrorView.EditorView({
      mount: mountRef.current
    }, {
      state: state,
      dispatchTransaction(tr) {
        const newEditorState = view.state.apply(tr);
        view.updateState(newEditorState);
        onEditorStateChange(newEditorState);
      }
    });
    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mountRef, onEditorStateChange]);
  React.useLayoutEffect(() => {
    var _viewRef$current;
    (_viewRef$current = viewRef.current) === null || _viewRef$current === void 0 || _viewRef$current.updateState(state);
  }, [state]);
  return {
    view: viewRef,
    mount: mountRef
  };
}

/**
 * This cannot be moved after mount
 *
 * This could be fixed by storing the editable ref in state but that would be more initial re-renders
 * and moving the editable isn't a thing that we actually would want to do.
 */
function ProseMirrorEditable(props) {
  const {
    mount
  } = useStableEditorContext();
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...props,
    ref: mount
  });
}
const StableEditorContext = /*#__PURE__*/React__default["default"].createContext(null);
function useStableEditorContext() {
  const context = React.useContext(StableEditorContext);
  if (context === null) {
    throw new Error('editor hooks must be used inside a ProseMirrorEditorView');
  }
  return context;
}
const ProseMirrorEditor = /*#__PURE__*/React.forwardRef(function ProseMirrorEditorView(props, ref) {
  const {
    view,
    mount
  } = useEditorView(props.value, props.onChange);
  React.useImperativeHandle(ref, () => ({
    get view() {
      return view.current;
    }
  }), [view]);
  const stableContext = React.useMemo(() => {
    return {
      view,
      mount,
      dispatchCommand: command => {
        if (!view.current) return;
        command(view.current.state, view.current.dispatch, view.current);
        view.current.focus();
      },
      schema: getEditorSchema(props.value.schema)
    };
  }, [mount, props.value.schema, view]);
  return /*#__PURE__*/jsxRuntime.jsx(StableEditorContext.Provider, {
    value: stableContext,
    children: /*#__PURE__*/jsxRuntime.jsx(EditorStateContext.Provider, {
      value: props.value,
      children: props.children
    })
  });
});

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = evt => {
      resolve(evt.target.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function imageDropPlugin(schema) {
  return new prosemirrorState.Plugin({
    props: {
      handleDrop(view, event) {
        var _event$dataTransfer;
        if ((_event$dataTransfer = event.dataTransfer) !== null && _event$dataTransfer !== void 0 && _event$dataTransfer.files.length) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            let eventPos = view.posAtCoords({
              left: event.clientX,
              top: event.clientY
            });
            if (!eventPos) return;
            let $mouse = view.state.doc.resolve(eventPos.pos);
            (async () => {
              const src = await readFileAsDataUrl(file);
              const slice = prosemirrorModel.Slice.maxOpen(prosemirrorModel.Fragment.from(schema.nodes.image.createChecked({
                src,
                filename: file.name
              })));
              const pos = prosemirrorTransform.dropPoint(view.state.doc, $mouse.pos, slice);
              if (pos === null) return false;
              view.dispatch(view.state.tr.replace(pos, pos, slice));
            })();
            return true;
          }
        }
      },
      handlePaste(view, event) {
        var _event$clipboardData;
        if ((_event$clipboardData = event.clipboardData) !== null && _event$clipboardData !== void 0 && _event$clipboardData.files.length) {
          const file = event.clipboardData.files[0];
          if (file.type.startsWith('image/')) {
            (async () => {
              const src = await readFileAsDataUrl(file);
              view.dispatch(view.state.tr.replaceSelectionWith(schema.nodes.image.createChecked({
                src,
                filename: file.name
              })));
            })();
            return true;
          }
        }
      }
    }
  });
}
function ImageToolbarButton() {
  return /*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
    children: [/*#__PURE__*/jsxRuntime.jsx(ToolbarButton, {
      "aria-label": "Image",
      command: (_, dispatch, view) => {
        if (dispatch && view) {
          (async () => {
            const file = await index.getUploadedFileObject('image/*');
            if (!file) return;
            const src = await readFileAsDataUrl(file);
            view.dispatch(view.state.tr.replaceSelectionWith(view.state.schema.nodes.image.createChecked({
              src,
              filename: file.name
            })));
          })();
        }
        return true;
      },
      children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
        src: imageIcon.imageIcon
      })
    }), /*#__PURE__*/jsxRuntime.jsx(tooltip.Tooltip, {
      children: /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
        children: "Image"
      })
    })]
  });
}

const key$1 = new prosemirrorState.PluginKey('AutocompleteDecoration');
function hasSelectionInDecorations(selection, decorations) {
  return decorations.find(selection.from, selection.to).length > 0;
}
const inactiveDecorationState = {
  kind: 'inactive'
};
const getStateWithoutAutocompleteDecoration$1 = weakMemoize__default["default"](state => {
  const tr = removeAutocompleteDecorationAndContent(state);
  if (!tr) {
    return {
      state
    };
  }
  return {
    state: state.apply(tr),
    tr
  };
});
function wrapCommandAfterRemovingAutocompleteDecoration(command) {
  return (stateWithInsertMenuText, dispatch, view) => {
    const {
      state,
      tr
    } = getStateWithoutAutocompleteDecoration$1(stateWithInsertMenuText);
    if (!tr) return false;
    if (dispatch) dispatch(tr);
    return command(state, dispatch, view);
  };
}
function addAutocompleteDecoration(tr, menu, from, to, pattern) {
  return tr.setMeta(key$1, {
    action: 'add',
    from,
    to,
    menu,
    pattern
  });
}
function AutocompleteDecoration() {
  const state = useEditorState();
  const pluginState = key$1.getState(state);
  if (!pluginState || pluginState.kind === 'inactive') return null;
  return /*#__PURE__*/jsxRuntime.jsx(AutocompleteDecorationInner, {
    state: pluginState
  });
}
function AutocompleteDecorationInner(props) {
  const state = useEditorState();
  const decoration = props.state.decorations.find()[0];
  const text = state.doc.textBetween(decoration.from, decoration.to).slice(1);
  return /*#__PURE__*/jsxRuntime.jsx(props.state.component, {
    query: text,
    from: decoration.from,
    to: decoration.to
  });
}
function removeAutocompleteDecoration(tr) {
  return tr.setMeta(key$1, {
    action: 'remove'
  });
}
function getAutocompleteDecoration(state) {
  const pluginState = key$1.getState(state);
  if ((pluginState === null || pluginState === void 0 ? void 0 : pluginState.kind) === 'active') return pluginState.decorations.find()[0];
}
function removeAutocompleteDecorationAndContent(state) {
  const decoration = getAutocompleteDecoration(state);
  if (!decoration) return;
  return removeAutocompleteDecoration(state.tr.delete(decoration.from, decoration.to));
}
const accentForeground = style.css({
  color: style.tokenSchema.color.foreground.accent
});
function autocompleteDecoration() {
  return new prosemirrorState.Plugin({
    key: key$1,
    state: {
      init: () => ({
        kind: 'inactive'
      }),
      apply(tr, value, oldState, newState) {
        const meta = tr.getMeta(key$1);
        if ((meta === null || meta === void 0 ? void 0 : meta.action) === 'add') {
          const deco = prosemirrorView.Decoration.inline(meta.from, meta.to, {
            nodeName: 'decoration-autocomplete',
            class: accentForeground
          }, {
            inclusiveStart: false,
            inclusiveEnd: true
          });
          const trigger = newState.doc.textBetween(meta.from, meta.to, '');
          const decorations = prosemirrorView.DecorationSet.create(tr.doc, [deco]);
          return {
            kind: 'active',
            trigger,
            decorations,
            component: meta.menu,
            pattern: meta.pattern
          };
        }
        if (value.kind === 'inactive') return value;
        const decorations = value.decorations.map(tr.mapping, tr.doc);
        const decorationsArr = decorations.find();
        if ((meta === null || meta === void 0 ? void 0 : meta.action) === 'remove' || !hasSelectionInDecorations(tr.selection, decorations) || decorationsArr.length !== 1) {
          return inactiveDecorationState;
        }
        const {
          from,
          to
        } = decorationsArr[0];
        const replacementChar = '\u{fffd}';
        const textBetween = newState.doc.textBetween(from, to, replacementChar, replacementChar);
        if (value.trigger !== textBetween.slice(0, value.trigger.length) || textBetween.includes(replacementChar) || value.pattern && !value.pattern.test(textBetween)) {
          return inactiveDecorationState;
        }
        return {
          ...value,
          decorations
        };
      }
    },
    props: {
      decorations: state => {
        const pluginState = key$1.getState(state);
        if ((pluginState === null || pluginState === void 0 ? void 0 : pluginState.kind) === 'active') return pluginState.decorations;
        return prosemirrorView.DecorationSet.empty;
      },
      handlePaste,
      handleDrop: handlePaste,
      handleKeyDown(view, event) {
        const state = key$1.getState(view.state);
        if ((state === null || state === void 0 ? void 0 : state.kind) === 'active' && event.key === 'Escape') {
          removeAutocompleteDecoration(view.state.tr);
          return true;
        }
        return false;
      }
    }
  });
}
function handlePaste(view) {
  const state = key$1.getState(view.state);
  if ((state === null || state === void 0 ? void 0 : state.kind) === 'active') {
    view.dispatch(removeAutocompleteDecoration(view.state.tr));
  }
  return false;
}

function useEditorListbox(props) {
  let {
    listenerRef,
    onEscape,
    scrollRef,
    ...otherProps
  } = props;
  let state = list.useListState(props);
  let layout = listbox.useListBoxLayout(state);

  // keyboard and selection management
  let listboxRef = React.useRef(null);
  let {
    collectionProps
  } = selection.useSelectableCollection({
    keyboardDelegate: layout,
    ref: listenerRef,
    scrollRef: scrollRef !== null && scrollRef !== void 0 ? scrollRef : listboxRef,
    selectionManager: state.selectionManager,
    disallowEmptySelection: true,
    disallowTypeAhead: true,
    isVirtualized: true,
    shouldFocusWrap: true
  });
  let onKeyDown = e => {
    var _props$onAction;
    switch (e.key) {
      case 'Enter':
        state.selectionManager.select(state.selectionManager.focusedKey);
        (_props$onAction = props.onAction) === null || _props$onAction === void 0 || _props$onAction.call(props, state.selectionManager.focusedKey);
        e.preventDefault();
        break;
      case 'Escape':
        onEscape === null || onEscape === void 0 || onEscape();
        break;
    }
  };
  let keydownListener = utils.chain(onKeyDown, collectionProps.onKeyDown);
  return {
    keydownListener,
    listbox: /*#__PURE__*/jsxRuntime.jsx(listbox.ListBoxBase, {
      ref: listboxRef,
      renderEmptyState: renderEmptyState,
      layout: layout,
      state: state,
      autoFocus: "first"
      // focusOnPointerEnter
      ,
      shouldUseVirtualFocus: true,
      shouldFocusWrap: true,
      UNSAFE_className: listbox.listStyles,
      ...otherProps
    })
  };
}
function renderEmptyState() {
  return /*#__PURE__*/jsxRuntime.jsx(layout.HStack, {
    alignItems: "center",
    gap: "regular",
    height: "element.regular",
    paddingX: "medium",
    children: /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
      color: "neutralSecondary",
      weight: "medium",
      children: "No results\u2026"
    })
  });
}

const key = new prosemirrorState.PluginKey('keydown');

/**
 * Generally only one of these should be rendered at a time
 *
 * It's for autocomplete or etc. where you want to handle keydown in a react component
 * because the selection is in a particular place
 */
function useEditorKeydownListener(handler) {
  const state = useEditorState();
  const pluginState = key.getState(state);
  const stableHandler = useEventCallback(handler);
  React.useEffect(() => {
    if (!pluginState) return;
    const obj = {
      fn: stableHandler
    };
    pluginState.add(obj);
    return () => {
      pluginState.delete(obj);
    };
  }, [pluginState, stableHandler]);
}
function keydownHandler() {
  return new prosemirrorState.Plugin({
    key,
    state: {
      init() {
        return new Set();
      },
      apply(tr, value) {
        return value;
      }
    },
    props: {
      handleKeyDown(view, event) {
        const pluginState = key.getState(view.state);
        if (!pluginState) return false;
        for (const handler of pluginState) {
          if (handler.fn(event)) return true;
        }
        return false;
      }
    }
  });
}

function getReferenceElementForRange(view, from, to) {
  const nodeAtFrom = view.state.doc.nodeAt(from);
  if (nodeAtFrom !== null && to === from + nodeAtFrom.nodeSize) {
    const node = view.nodeDOM(from);
    if (node instanceof Element) {
      return virtualElement(node, view);
    }
  }
  const fromDom = view.domAtPos(from);
  const toDom = view.domAtPos(to);
  const range = document.createRange();
  range.setStart(fromDom.node, fromDom.offset);
  range.setEnd(toDom.node, toDom.offset);
  return virtualElement(range, view);
}
function useEditorReferenceElement(from, to) {
  const [referenceElement, setReferenceElement] = React.useState(null);
  const getEditorView = useEditorViewInEffect();
  React.useLayoutEffect(() => {
    const view = getEditorView();
    if (!view) {
      setReferenceElement(null);
      return;
    }
    setReferenceElement(getReferenceElementForRange(view, from, to));
  }, [getEditorView, from, to]);
  return referenceElement;
}

/**
 * Normalize API for node, range, etc. and include `contextElement` to ensure
 * clipping and position update detection works as expected.
 * @see https://floating-ui.com/docs/virtual-elements
 */
function virtualElement(el, view) {
  const contextElement = view.dom;
  const getBoundingClientRect = () => el.getBoundingClientRect();
  return {
    contextElement,
    getBoundingClientRect
  };
}

function CodeBlockLanguageCombobox(props) {
  var _aliasesToLabel$get, _aliasesToCanonicalNa;
  const labelForVal = props.value ? (_aliasesToLabel$get = index.aliasesToLabel.get(props.value)) !== null && _aliasesToLabel$get !== void 0 ? _aliasesToLabel$get : props.value : 'Plain text';
  const [inputValue, setInputValue] = React.useState(labelForVal);
  const [isFocused, setIsFocused] = React.useState(false);
  if (!isFocused && labelForVal !== inputValue) {
    setInputValue(labelForVal);
  }
  return /*#__PURE__*/jsxRuntime.jsx(combobox.Combobox, {
    "aria-label": "Language",
    width: "scale.2000",
    allowsCustomValue: true // allow consumers to support other languages
    ,
    inputValue: inputValue,
    onInputChange: setInputValue,
    onFocus: () => {
      setIsFocused(true);
    },
    onBlur: () => {
      setIsFocused(false);
    },
    onSelectionChange: selection => {
      if (index.aliasesToCanonicalName.has(inputValue)) {
        selection = index.aliasesToCanonicalName.get(inputValue);
      }
      if (selection === null) {
        props.onChange(inputValue === '' ? 'plain' : inputValue);
      } else if (typeof selection === 'string') {
        props.onChange(selection);
        const label = index.canonicalNameToLabel.get(selection);
        if (label) {
          setInputValue(label);
        }
      }
    },
    selectedKey: props.value ? (_aliasesToCanonicalNa = index.aliasesToCanonicalName.get(props.value)) !== null && _aliasesToCanonicalNa !== void 0 ? _aliasesToCanonicalNa : null : 'plain',
    items: React.useMemo(() => index.labelToCanonicalName.has(inputValue) ? index.languagesWithAliases : matchSorter.matchSorter(index.languagesWithAliases, inputValue, {
      keys: ['label', 'value', 'aliases']
    }), [inputValue]),
    children: item => /*#__PURE__*/jsxRuntime.jsx(collections.Item, {
      children: item.label
    }, item.value)
  });
}

function LinkToolbar(props) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const stringFormatter = i18n.useLocalizedStringFormatter(index.l10nMessages);
  return /*#__PURE__*/jsxRuntime.jsxs(layout.Flex, {
    gap: "small",
    padding: "regular",
    children: [/*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
      children: [/*#__PURE__*/jsxRuntime.jsx(button.ActionButton, {
        prominence: "low",
        onPress: () => setDialogOpen(true),
        children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
          src: editIcon.editIcon
        })
      }), /*#__PURE__*/jsxRuntime.jsx(tooltip.Tooltip, {
        children: stringFormatter.format('edit')
      })]
    }), /*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
      children: [/*#__PURE__*/jsxRuntime.jsx(button.ActionButton, {
        prominence: "low",
        onPress: () => {
          window.open(props.href, '_blank', 'noopener,noreferrer');
        },
        children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
          src: externalLinkIcon.externalLinkIcon
        })
      }), /*#__PURE__*/jsxRuntime.jsx(tooltip.Tooltip, {
        children: /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
          truncate: 3,
          children: props.href
        })
      })]
    }), /*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
      children: [/*#__PURE__*/jsxRuntime.jsx(button.ActionButton, {
        prominence: "low",
        onPress: props.onUnlink,
        children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
          src: unlinkIcon.unlinkIcon
        })
      }), /*#__PURE__*/jsxRuntime.jsx(tooltip.Tooltip, {
        children: "Unlink"
      })]
    }), /*#__PURE__*/jsxRuntime.jsx(dialog.DialogContainer, {
      onDismiss: () => {
        setDialogOpen(false);
      },
      children: dialogOpen && /*#__PURE__*/jsxRuntime.jsx(LinkDialog, {
        text: "",
        href: props.href,
        onSubmit: ({
          href
        }) => {
          props.onHrefChange(href);
        }
      })
    })]
  });
}
function LinkDialog({
  onSubmit,
  ...props
}) {
  let [href, setHref] = React.useState(props.href || '');
  let [touched, setTouched] = React.useState(false);
  let {
    dismiss
  } = dialog.useDialogContainer();
  let stringFormatter = i18n.useLocalizedStringFormatter(index.l10nMessages);
  const showInvalidState = touched && !index.isValidURL(href);
  return /*#__PURE__*/jsxRuntime.jsx(dialog.Dialog, {
    size: "small",
    children: /*#__PURE__*/jsxRuntime.jsxs("form", {
      style: {
        display: 'contents'
      },
      onSubmit: event => {
        if (event.target !== event.currentTarget) return;
        event.preventDefault();
        if (!showInvalidState) {
          dismiss();
          onSubmit({
            href
          });
        }
      },
      children: [/*#__PURE__*/jsxRuntime.jsxs(typography.Heading, {
        children: [props.href ? 'Edit' : 'Add', " link"]
      }), /*#__PURE__*/jsxRuntime.jsx(slots.Content, {
        children: /*#__PURE__*/jsxRuntime.jsxs(layout.Flex, {
          gap: "large",
          direction: "column",
          children: [/*#__PURE__*/jsxRuntime.jsx(textField.TextField, {
            label: "Text",
            value: props.text,
            isReadOnly: true
          }), /*#__PURE__*/jsxRuntime.jsx(textField.TextField, {
            autoFocus: true,
            isRequired: true,
            onBlur: () => setTouched(true),
            label: "Link",
            onChange: setHref,
            value: href,
            errorMessage: showInvalidState && 'Please provide a valid URL.'
          })]
        })
      }), /*#__PURE__*/jsxRuntime.jsxs(button.ButtonGroup, {
        children: [/*#__PURE__*/jsxRuntime.jsx(button.Button, {
          onPress: dismiss,
          children: stringFormatter.format('cancel')
        }), /*#__PURE__*/jsxRuntime.jsx(button.Button, {
          prominence: "high",
          type: "submit",
          children: stringFormatter.format('save')
        })]
      })]
    })
  });
}

const EditorContext = /*#__PURE__*/React.createContext({
  id: ''
});
const EditorContextProvider = EditorContext.Provider;
function useEditorContext() {
  return React.useContext(EditorContext);
}
function getRootId(id) {
  return `keystatic-editor-root-${id}`;
}
function getToolbarId(id) {
  return `keystatic-editor-toolbar-${id}`;
}
function getContentId(id) {
  return `keystatic-editor-content-${id}`;
}
function getToolbar(id) {
  return document.getElementById(getToolbarId(id));
}
function getContent(id) {
  return document.getElementById(getContentId(id));
}

const imagesSchema = index.object({
  alt: index.text({
    label: 'Alt text'
  }),
  title: index.text({
    label: 'Title'
  })
});
function ImagePopover(props) {
  let stringFormatter = i18n.useLocalizedStringFormatter(index.l10nMessages);
  const runCommand = useEditorDispatchCommand();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsxs(layout.Flex, {
      gap: "regular",
      padding: "regular",
      children: [/*#__PURE__*/jsxRuntime.jsxs(layout.Flex, {
        gap: "small",
        children: [/*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
          children: [/*#__PURE__*/jsxRuntime.jsx(button.ActionButton, {
            prominence: "low",
            onPress: () => setDialogOpen(true),
            children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
              src: editIcon.editIcon
            })
          }), /*#__PURE__*/jsxRuntime.jsx(tooltip.Tooltip, {
            children: stringFormatter.format('edit')
          })]
        }), /*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
          children: [/*#__PURE__*/jsxRuntime.jsx(button.ActionButton, {
            prominence: "low",
            onPress: async () => {
              const file = await index.getUploadedFileObject('image/*');
              if (!file) return;
              const src = await readFileAsDataUrl(file);
              runCommand((state, dispatch) => {
                if (dispatch) {
                  const {
                    tr
                  } = state;
                  tr.setNodeAttribute(props.pos, 'src', src);
                  const newState = state.apply(tr);
                  tr.setSelection(prosemirrorState.NodeSelection.create(newState.doc, props.pos));
                  dispatch(tr);
                }
                return true;
              });
            },
            children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
              src: fileUpIcon.fileUpIcon
            })
          }), /*#__PURE__*/jsxRuntime.jsx(tooltip.Tooltip, {
            children: "Choose file"
          })]
        })]
      }), /*#__PURE__*/jsxRuntime.jsx(layout.Divider, {
        orientation: "vertical"
      }), /*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
        children: [/*#__PURE__*/jsxRuntime.jsx(button.ActionButton, {
          prominence: "low",
          onPress: () => {
            runCommand((state, dispatch) => {
              if (dispatch) {
                dispatch(state.tr.delete(props.pos, props.pos + props.node.nodeSize));
              }
              return true;
            });
          },
          children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
            src: trash2Icon.trash2Icon
          })
        }), /*#__PURE__*/jsxRuntime.jsx(tooltip.Tooltip, {
          tone: "critical",
          children: "Remove"
        })]
      })]
    }), /*#__PURE__*/jsxRuntime.jsx(dialog.DialogContainer, {
      onDismiss: () => {
        setDialogOpen(false);
      },
      children: dialogOpen && /*#__PURE__*/jsxRuntime.jsx(ImageDialog, {
        alt: props.node.attrs.alt,
        title: props.node.attrs.title,
        filename: props.node.attrs.filename,
        onSubmit: value => {
          runCommand((state, dispatch) => {
            if (dispatch) {
              const {
                tr
              } = state;
              tr.setNodeMarkup(props.pos, undefined, {
                ...props.node.attrs,
                ...value
              });
              const newState = state.apply(tr);
              tr.setSelection(prosemirrorState.NodeSelection.create(newState.doc, props.pos));
              dispatch(tr);
            }
            return true;
          });
          setDialogOpen(false);
        }
      })
    })]
  });
}
function ImageDialog(props) {
  const [state, setState] = React.useState({
    alt: props.alt,
    title: props.title
  });
  const previewProps = React.useMemo(() => index.createGetPreviewProps(imagesSchema, setState, () => undefined), [])(state);
  const [filenameWithoutExtension, filenameExtension] = splitFilename(props.filename);
  const [forceValidation, setForceValidation] = React.useState(false);
  let [fileName, setFileName] = React.useState(filenameWithoutExtension);
  let [fileNameTouched, setFileNameTouched] = React.useState(false);
  let {
    dismiss
  } = dialog.useDialogContainer();
  let stringFormatter = i18n.useLocalizedStringFormatter(index.l10nMessages);
  return /*#__PURE__*/jsxRuntime.jsx(dialog.Dialog, {
    size: "small",
    children: /*#__PURE__*/jsxRuntime.jsxs("form", {
      style: {
        display: 'contents'
      },
      onSubmit: event => {
        if (event.target !== event.currentTarget) return;
        event.preventDefault();
        setForceValidation(true);
        if (fileName && index.clientSideValidateProp(imagesSchema, state, undefined)) {
          dismiss();
          props.onSubmit({
            alt: state.alt,
            title: state.title,
            filename: [fileName, filenameExtension].join('.')
          });
        }
      },
      children: [/*#__PURE__*/jsxRuntime.jsx(typography.Heading, {
        children: "Image details"
      }), /*#__PURE__*/jsxRuntime.jsx(slots.Content, {
        children: /*#__PURE__*/jsxRuntime.jsxs(layout.Flex, {
          gap: "large",
          direction: "column",
          children: [/*#__PURE__*/jsxRuntime.jsx(textField.TextField, {
            label: "File name",
            onChange: setFileName,
            onBlur: () => setFileNameTouched(true),
            value: fileName,
            isRequired: true,
            errorMessage: (fileNameTouched || forceValidation) && !fileName ? 'Please provide a file name.' : undefined,
            endElement: filenameExtension ? /*#__PURE__*/jsxRuntime.jsx(layout.Flex, {
              alignItems: "center",
              justifyContent: "center",
              paddingEnd: "regular",
              children: /*#__PURE__*/jsxRuntime.jsxs(typography.Text, {
                color: "neutralTertiary",
                children: [".", filenameExtension]
              })
            }) : null
          }), /*#__PURE__*/jsxRuntime.jsx(index.FormValueContentFromPreviewProps, {
            forceValidation: forceValidation,
            autoFocus: true,
            ...previewProps
          })]
        })
      }), /*#__PURE__*/jsxRuntime.jsxs(button.ButtonGroup, {
        children: [/*#__PURE__*/jsxRuntime.jsx(button.Button, {
          onPress: dismiss,
          children: stringFormatter.format('cancel')
        }), /*#__PURE__*/jsxRuntime.jsx(button.Button, {
          prominence: "high",
          type: "submit",
          children: stringFormatter.format('save')
        })]
      })]
    })
  });
}
function splitFilename(filename) {
  const dotIndex = filename.lastIndexOf('.');
  if (dotIndex === -1) {
    return [filename, ''];
  }
  return [filename.substring(0, dotIndex), filename.substring(dotIndex + 1)];
}

const popoverComponents = {
  code_block: function CodeBlockPopover(props) {
    const dispatchCommand = useEditorDispatchCommand();
    return /*#__PURE__*/jsxRuntime.jsxs(layout.Flex, {
      gap: "regular",
      padding: "regular",
      children: [/*#__PURE__*/jsxRuntime.jsx(CodeBlockLanguageCombobox, {
        value: props.node.attrs.language,
        onChange: val => {
          dispatchCommand((state, dispatch) => {
            if (dispatch) {
              dispatch(state.tr.setNodeAttribute(props.pos, 'language', val));
            }
            return true;
          });
        }
      }), /*#__PURE__*/jsxRuntime.jsx(layout.Divider, {
        orientation: "vertical"
      }), /*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
        children: [/*#__PURE__*/jsxRuntime.jsx(button.ActionButton, {
          prominence: "low",
          onPress: () => {
            dispatchCommand((state, dispatch) => {
              if (dispatch) {
                dispatch(state.tr.delete(props.pos, props.pos + props.node.nodeSize));
              }
              return true;
            });
          },
          children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
            src: trash2Icon.trash2Icon
          })
        }), /*#__PURE__*/jsxRuntime.jsx(tooltip.Tooltip, {
          tone: "critical",
          children: "Remove"
        })]
      })]
    });
  },
  image: ImagePopover,
  table: function TablePopover(props) {
    var _props$node$firstChil;
    const dispatchCommand = useEditorDispatchCommand();
    const schema = useEditorSchema();
    return /*#__PURE__*/jsxRuntime.jsxs(layout.Flex, {
      gap: "regular",
      padding: "regular",
      children: [/*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
        children: [/*#__PURE__*/jsxRuntime.jsx(button.ActionButton, {
          prominence: "low",
          isSelected: ((_props$node$firstChil = props.node.firstChild) === null || _props$node$firstChil === void 0 || (_props$node$firstChil = _props$node$firstChil.firstChild) === null || _props$node$firstChil === void 0 ? void 0 : _props$node$firstChil.type) === schema.nodes.table_header,
          onPress: () => {
            dispatchCommand(prosemirrorTables.toggleHeader('row'));
          },
          children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
            src: sheetIcon.sheetIcon
          })
        }), /*#__PURE__*/jsxRuntime.jsx(tooltip.Tooltip, {
          children: "Header row"
        })]
      }), /*#__PURE__*/jsxRuntime.jsx(layout.Divider, {
        orientation: "vertical"
      }), /*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
        children: [/*#__PURE__*/jsxRuntime.jsx(button.ActionButton, {
          prominence: "low",
          onPress: () => {
            dispatchCommand((state, dispatch) => {
              if (dispatch) {
                dispatch(state.tr.delete(props.pos, props.pos + props.node.nodeSize));
              }
              return true;
            });
          },
          children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
            src: trash2Icon.trash2Icon
          })
        }), /*#__PURE__*/jsxRuntime.jsx(tooltip.Tooltip, {
          tone: "critical",
          children: "Remove"
        })]
      })]
    });
  }
};
function markAround($pos, markType) {
  const {
    parent,
    parentOffset
  } = $pos;
  const start = parent.childAfter(parentOffset);
  if (!start.node) return null;
  const mark = start.node.marks.find(mark => mark.type === markType);
  if (!mark) return null;
  let startIndex = $pos.index();
  let startPos = $pos.start() + start.offset;
  let endIndex = startIndex + 1;
  let endPos = startPos + start.node.nodeSize;
  while (startIndex > 0 && mark.isInSet(parent.child(startIndex - 1).marks)) {
    startIndex -= 1;
    startPos -= parent.child(startIndex).nodeSize;
  }
  while (endIndex < parent.childCount && mark.isInSet(parent.child(endIndex).marks)) {
    endPos += parent.child(endIndex).nodeSize;
    endIndex += 1;
  }
  return {
    from: startPos,
    to: endPos,
    mark
  };
}
const LinkPopover = props => {
  const dispatchCommand = useEditorDispatchCommand();
  const href = props.mark.attrs.href;
  if (typeof href !== 'string') {
    return null;
  }
  return /*#__PURE__*/jsxRuntime.jsx(LinkToolbar, {
    href: href,
    onUnlink: () => {
      dispatchCommand((state, dispatch) => {
        if (dispatch) {
          dispatch(state.tr.removeMark(props.from, props.to, state.schema.marks.link));
        }
        return true;
      });
    },
    onHrefChange: href => {
      dispatchCommand((state, dispatch) => {
        if (dispatch) {
          dispatch(state.tr.removeMark(props.from, props.to, state.schema.marks.link).addMark(props.from, props.to, state.schema.marks.link.create({
            href
          })));
        }
        return true;
      });
    }
  });
};
function getPopoverDecoration(state) {
  if (state.selection instanceof prosemirrorState.TextSelection) {
    const schema = getEditorSchema(state.schema);
    const linkAroundFrom = markAround(state.selection.$from, schema.marks.link);
    const linkAroundTo = markAround(state.selection.$to, schema.marks.link);
    if (linkAroundFrom && linkAroundFrom.from === (linkAroundTo === null || linkAroundTo === void 0 ? void 0 : linkAroundTo.from) && linkAroundFrom.to === linkAroundTo.to) {
      return {
        adaptToBoundary: 'flip',
        kind: 'mark',
        component: LinkPopover,
        mark: linkAroundFrom.mark,
        from: linkAroundFrom.from,
        to: linkAroundFrom.to
      };
    }
  }
  if (state.selection instanceof prosemirrorState.NodeSelection) {
    const node = state.selection.node;
    const component = popoverComponents[node.type.name];
    if (component !== undefined) {
      return {
        adaptToBoundary: 'stick',
        kind: 'node',
        node,
        component,
        pos: state.selection.from
      };
    }
  }
  const commonAncestorPos = state.selection.$from.start(state.selection.$from.sharedDepth(state.selection.to));
  const $pos = state.doc.resolve(commonAncestorPos);
  for (let i = $pos.depth; i > 0; i--) {
    const node = $pos.node(i);
    if (!node) break;
    const component = popoverComponents[node.type.name];
    if (component !== undefined) {
      return {
        adaptToBoundary: 'stick',
        kind: 'node',
        node,
        component,
        pos: $pos.start(i) - 1
      };
    }
  }
  return null;
}
function PopoverInner(props) {
  const from = props.decoration.kind === 'node' ? props.decoration.pos : props.decoration.from;
  const to = props.decoration.kind === 'node' ? props.decoration.pos + props.decoration.node.nodeSize : props.decoration.to;
  const reference = useEditorReferenceElement(from, to);
  const boundary = useBoundaryRect();
  return reference && /*#__PURE__*/jsxRuntime.jsx(editor.EditorPopover, {
    adaptToBoundary: props.decoration.adaptToBoundary,
    boundary: boundary,
    minWidth: "element.medium",
    placement: "bottom",
    reference: reference,
    children: props.decoration.kind === 'node' ? /*#__PURE__*/jsxRuntime.jsx(props.decoration.component, {
      ...props.decoration,
      state: props.state
    }) : /*#__PURE__*/jsxRuntime.jsx(props.decoration.component, {
      ...props.decoration,
      state: props.state
    })
  });
}
function EditorPopoverDecoration(props) {
  const popoverDecoration = React.useMemo(() => getPopoverDecoration(props.state), [props.state]);
  if (!popoverDecoration) return null;
  return /*#__PURE__*/jsxRuntime.jsx(PopoverInner, {
    decoration: popoverDecoration,
    state: props.state
  });
}
function useBoundaryRect() {
  var _toolbar$offsetHeight;
  let {
    id
  } = useEditorContext();
  let element = getContent(id);
  if (!element) {
    return undefined;
  }
  let scrollParent = getNearestScrollParent(element);
  if (!scrollParent) {
    return undefined;
  }
  let toolbar = getToolbar(id);
  let offset = (_toolbar$offsetHeight = toolbar === null || toolbar === void 0 ? void 0 : toolbar.offsetHeight) !== null && _toolbar$offsetHeight !== void 0 ? _toolbar$offsetHeight : 0;
  let rect = scrollParent.getBoundingClientRect();
  return {
    x: rect.x,
    y: rect.y + offset,
    width: rect.width,
    height: rect.height - offset
  };
}
function getNearestScrollParent(element) {
  if (!element) {
    return null;
  }
  if (element.scrollHeight > element.clientHeight) {
    return element;
  }
  return getNearestScrollParent(element.parentElement);
}

function EditorAutocomplete(props) {
  const boundary = useBoundaryRect();
  const viewRef = useEditorViewRef();
  const referenceElement = useEditorReferenceElement(props.from, props.to);
  const listenerRef = React.useMemo(() => {
    return {
      get current() {
        var _viewRef$current$dom, _viewRef$current;
        return (_viewRef$current$dom = (_viewRef$current = viewRef.current) === null || _viewRef$current === void 0 ? void 0 : _viewRef$current.dom) !== null && _viewRef$current$dom !== void 0 ? _viewRef$current$dom : null;
      }
    };
  }, [viewRef]);
  const {
    keydownListener,
    listbox
  } = useEditorListbox({
    listenerRef,
    ...props,
    UNSAFE_style: {
      width: 320,
      ...props.UNSAFE_style
    }
  });
  useEditorKeydownListener(event => {
    keydownListener(event);
    return event.defaultPrevented;
  });
  return referenceElement && /*#__PURE__*/jsxRuntime.jsx(editor.EditorPopover, {
    adaptToBoundary: "stretch",
    boundary: boundary,
    minWidth: "element.medium",
    placement: "bottom-start",
    reference: referenceElement,
    children: listbox
  });
}

const insertMenuInputRule = {
  pattern: /(?:^|\s)\/$/,
  handler(state, _match, _start, end) {
    return addAutocompleteDecoration(state.tr, InsertMenu, end - 1, end, undefined);
  }
};
const getStateWithoutAutocompleteDecoration = weakMemoize(state => {
  const tr = removeAutocompleteDecorationAndContent(state);
  if (!tr) {
    return {
      state
    };
  }
  return {
    state: state.apply(tr),
    tr
  };
});
function wrapInsertMenuCommand(command) {
  return (stateWithInsertMenuText, dispatch, view) => {
    const {
      state,
      tr
    } = getStateWithoutAutocompleteDecoration(stateWithInsertMenuText);
    if (!tr) return false;
    if (dispatch) dispatch(tr);
    return command(state, dispatch, view);
  };
}
function itemRenderer(item) {
  return /*#__PURE__*/jsxRuntime.jsxs(listbox.Item, {
    textValue: item.label,
    children: [/*#__PURE__*/jsxRuntime.jsx(typography.Text, {
      children: item.label
    }), item.description && /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
      slot: "description",
      children: item.description
    }), item.icon && /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
      src: item.icon
    })]
  }, item.id);
}
function InsertMenu(props) {
  const viewRef = useEditorViewRef();
  const dispatchCommand = useEditorDispatchCommand();
  const schema = useEditorSchema();
  const editorState = useEditorState();
  const options = React.useMemo(() => matchSorter.matchSorter(schema.insertMenuItems, props.query, {
    keys: ['label']
  }).filter(option => option.command(editorState)), [editorState, schema.insertMenuItems, props.query]);
  useEditorKeydownListener(event => {
    if (event.key !== ' ') return false;
    if (options.length === 1) {
      dispatchCommand(wrapInsertMenuCommand(options[0].command));
      return true;
    }
    if (options.length === 0) {
      var _viewRef$current;
      (_viewRef$current = viewRef.current) === null || _viewRef$current === void 0 || _viewRef$current.dispatch(removeAutocompleteDecoration(editorState.tr));
    }
    return false;
  });
  return /*#__PURE__*/jsxRuntime.jsx(EditorAutocomplete, {
    from: props.from,
    to: props.to,
    "aria-label": "Insert menu",
    items: options,
    children: itemRenderer,
    onEscape: () => {
      var _viewRef$current2;
      const tr = removeAutocompleteDecorationAndContent(editorState);
      if (!tr) return;
      (_viewRef$current2 = viewRef.current) === null || _viewRef$current2 === void 0 || _viewRef$current2.dispatch(tr);
    },
    onAction: key => {
      const option = options.find(option => option.id === key);
      if (!option) return;
      dispatchCommand(wrapInsertMenuCommand(option.command));
    }
  });
}

function ToolbarButton(props) {
  var _props$isSelected, _props$isDisabled;
  const state = useEditorState();
  const runCommand = useEditorDispatchCommand();
  const isSelected = !!((_props$isSelected = props.isSelected) !== null && _props$isSelected !== void 0 && _props$isSelected.call(props, state)); // no `undefined` — stop "uncontrolled" state taking over
  const isDisabled = !props.command(state) || ((_props$isDisabled = props.isDisabled) === null || _props$isDisabled === void 0 ? void 0 : _props$isDisabled.call(props, state));
  return React.useMemo(() => /*#__PURE__*/jsxRuntime.jsx(editor.EditorToolbarButton, {
    "aria-label": props['aria-label'],
    isSelected: isSelected,
    isDisabled: isDisabled,
    onPress: () => {
      runCommand(props.command);
    },
    children: props.children
  }), [isDisabled, isSelected, props, runCommand]);
}
function Toolbar(props) {
  const schema = useEditorSchema();
  const {
    nodes
  } = schema;
  return /*#__PURE__*/jsxRuntime.jsxs(ToolbarWrapper, {
    ...props,
    children: [/*#__PURE__*/jsxRuntime.jsxs(ToolbarScrollArea, {
      children: [/*#__PURE__*/jsxRuntime.jsx(HeadingMenu, {
        headingType: nodes.heading
      }), /*#__PURE__*/jsxRuntime.jsxs(editor.EditorToolbar, {
        "aria-label": "Formatting options",
        children: [/*#__PURE__*/jsxRuntime.jsx(editor.EditorToolbarSeparator, {}), /*#__PURE__*/jsxRuntime.jsx(InlineMarks, {}), /*#__PURE__*/jsxRuntime.jsx(editor.EditorToolbarSeparator, {}), /*#__PURE__*/jsxRuntime.jsx(ListButtons, {}), /*#__PURE__*/jsxRuntime.jsx(editor.EditorToolbarSeparator, {}), /*#__PURE__*/jsxRuntime.jsxs(editor.EditorToolbarGroup, {
          "aria-label": "Blocks",
          children: [/*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
            children: [/*#__PURE__*/jsxRuntime.jsx(ToolbarButton, {
              "aria-label": "Divider",
              command: insertNode(nodes.divider),
              isSelected: typeInSelection(nodes.divider),
              children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
                src: minusIcon.minusIcon
              })
            }), /*#__PURE__*/jsxRuntime.jsxs(tooltip.Tooltip, {
              children: [/*#__PURE__*/jsxRuntime.jsx(typography.Text, {
                children: "Divider"
              }), /*#__PURE__*/jsxRuntime.jsx(typography.Kbd, {
                children: "---"
              })]
            })]
          }), /*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
            children: [/*#__PURE__*/jsxRuntime.jsx(ToolbarButton, {
              "aria-label": "Quote",
              command: (state, dispatch) => {
                const hasQuote = typeInSelection(nodes.blockquote)(state);
                if (hasQuote) {
                  const {
                    $from,
                    $to
                  } = state.selection;
                  const range = $from.blockRange($to, node => node.type === nodes.blockquote);
                  if (!range) return false;
                  const target = prosemirrorTransform.liftTarget(range);
                  if (target === null) return false;
                  if (dispatch) {
                    dispatch(state.tr.lift(range, target).scrollIntoView());
                  }
                  return true;
                } else {
                  return prosemirrorCommands.wrapIn(nodes.blockquote)(state, dispatch);
                }
              },
              isSelected: typeInSelection(nodes.blockquote),
              children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
                src: quoteIcon.quoteIcon
              })
            }), /*#__PURE__*/jsxRuntime.jsxs(tooltip.Tooltip, {
              children: [/*#__PURE__*/jsxRuntime.jsx(typography.Text, {
                children: "Quote"
              }), /*#__PURE__*/jsxRuntime.jsx(typography.Kbd, {
                children: '>⎵'
              })]
            })]
          }), /*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
            children: [/*#__PURE__*/jsxRuntime.jsx(ToolbarButton, {
              "aria-label": "Code block",
              command: toggleCodeBlock(nodes.code_block, nodes.paragraph),
              isSelected: typeInSelection(nodes.code_block),
              children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
                src: codeIcon.codeIcon
              })
            }), /*#__PURE__*/jsxRuntime.jsxs(tooltip.Tooltip, {
              children: [/*#__PURE__*/jsxRuntime.jsx(typography.Text, {
                children: "Code block"
              }), /*#__PURE__*/jsxRuntime.jsx(typography.Kbd, {
                children: "```"
              })]
            })]
          }), /*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
            children: [/*#__PURE__*/jsxRuntime.jsx(ToolbarButton, {
              "aria-label": "Table",
              command: insertTable(schema),
              children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
                src: tableIcon.tableIcon
              })
            }), /*#__PURE__*/jsxRuntime.jsx(tooltip.Tooltip, {
              children: /*#__PURE__*/jsxRuntime.jsx(typography.Text, {
                children: "Table"
              })
            })]
          }), /*#__PURE__*/jsxRuntime.jsx(ImageToolbarButton, {})]
        })]
      })]
    }), /*#__PURE__*/jsxRuntime.jsx(InsertBlockMenu, {})]
  });
}
const ToolbarContainer = ({
  children
}) => {
  let entryLayoutPane = index.useEntryLayoutSplitPaneContext();
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    "data-layout": entryLayoutPane,
    className: style.css({
      alignItems: 'center',
      boxSizing: 'border-box',
      display: 'flex',
      height: style.tokenSchema.size.element.medium,
      [style.breakpointQueries.above.mobile]: {
        height: style.tokenSchema.size.element.large
      },
      '&[data-layout="main"]': {
        marginInline: 'auto',
        maxWidth: 800,
        minWidth: 0,
        paddingInline: style.tokenSchema.size.space.medium,
        [style.breakpointQueries.above.mobile]: {
          paddingInline: style.tokenSchema.size.space.xlarge
        },
        [style.breakpointQueries.above.tablet]: {
          paddingInline: style.tokenSchema.size.space.xxlarge
        }
      }
    }),
    children: children
  });
};
const ToolbarWrapper = props => {
  let entryLayoutPane = index.useEntryLayoutSplitPaneContext();
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...props,
    "data-layout": entryLayoutPane,
    className: style.css({
      backdropFilter: 'blur(8px)',
      backgroundClip: 'padding-box',
      backgroundColor: `color-mix(in srgb, transparent, ${style.tokenSchema.color.background.canvas} 90%)`,
      borderBottom: `${style.tokenSchema.size.border.regular} solid color-mix(in srgb, transparent, ${style.tokenSchema.color.foreground.neutral} 10%)`,
      borderStartEndRadius: style.tokenSchema.size.radius.medium,
      borderStartStartRadius: style.tokenSchema.size.radius.medium,
      minWidth: 0,
      position: 'sticky',
      top: 0,
      zIndex: 2,
      '&[data-layout="main"]': {
        borderRadius: 0
      }
    }),
    children: /*#__PURE__*/jsxRuntime.jsx(ToolbarContainer, {
      children: props.children
    })
  });
};
const ToolbarScrollArea = props => {
  let entryLayoutPane = index.useEntryLayoutSplitPaneContext();
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    "data-layout": entryLayoutPane,
    className: style.css({
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      gap: style.tokenSchema.size.space.regular,
      paddingInline: style.tokenSchema.size.space.medium,
      minWidth: 0,
      overflowX: 'auto',
      // avoid cropping focus rings
      marginBlock: `calc(${style.tokenSchema.size.alias.focusRing} * -1)`,
      paddingBlock: style.tokenSchema.size.alias.focusRing,
      // hide scrollbars
      msOverflowStyle: 'none',
      // for Internet Explorer, Edge
      scrollbarWidth: 'none',
      // for Firefox
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      // for Chrome, Safari, and Opera

      '&[data-layout="main"]': {
        paddingInline: 0
      }
    }),
    ...props
  });
};
const headingMenuVals = new Map([['normal', 'normal'], ['1', 1], ['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6]]);
function getHeadingMenuState(state, headingType, paragraphType) {
  var _activeLevel;
  let activeLevel;
  for (const range of state.selection.ranges) {
    state.doc.nodesBetween(range.$from.pos, range.$to.pos, node => {
      if (node.type === headingType) {
        const level = node.attrs.level;
        if (activeLevel === undefined) {
          activeLevel = level;
        } else if (activeLevel !== level) {
          activeLevel = 'disabled';
        }
      }
      if (node.type === paragraphType) {
        if (activeLevel === undefined) {
          activeLevel = 'normal';
        } else if (activeLevel !== 'normal') {
          activeLevel = 'disabled';
        }
      }
    });
    if (activeLevel === 'disabled') {
      break;
    }
  }
  return (_activeLevel = activeLevel) !== null && _activeLevel !== void 0 ? _activeLevel : 'disabled';
}
const HeadingMenu = props => {
  const {
    nodes
  } = useEditorSchema();
  const items = React.useMemo(() => {
    let resolvedItems = [{
      name: 'Paragraph',
      id: 'normal'
    }];
    [1, 2, 3, 4, 5, 6].forEach(level => {
      resolvedItems.push({
        name: `Heading ${level}`,
        id: level.toString()
      });
    });
    return resolvedItems;
  }, []);
  const state = useEditorState();
  const menuState = getHeadingMenuState(state, props.headingType, nodes.paragraph);
  const runCommand = useEditorDispatchCommand();
  return React.useMemo(() => /*#__PURE__*/jsxRuntime.jsx(picker.Picker, {
    flexShrink: 0,
    width: "scale.1700",
    prominence: "low",
    "aria-label": "Text block",
    items: items,
    isDisabled: menuState === 'disabled',
    selectedKey: menuState === 'disabled' ? 'normal' : menuState.toString(),
    onSelectionChange: selected => {
      let key = headingMenuVals.get(selected);
      if (key === 'normal') {
        runCommand(prosemirrorCommands.setBlockType(nodes.paragraph));
      } else if (key) {
        runCommand(prosemirrorCommands.setBlockType(props.headingType, {
          level: parseInt(key)
        }));
      }
    },
    children: item => /*#__PURE__*/jsxRuntime.jsx(picker.Item, {
      children: item.name
    }, item.id)
  }), [items, menuState, nodes.paragraph, props.headingType, runCommand]);
};
function InsertBlockMenu() {
  const entryLayoutPane = index.useEntryLayoutSplitPaneContext();
  const commandDispatch = useEditorDispatchCommand();
  const schema = useEditorSchema();
  const items = React.useMemo(() => schema.insertMenuItems.filter(x => x.forToolbar), [schema.insertMenuItems]);
  const idToItem = React.useMemo(() => new Map(items.map(item => [item.id, item])), [items]);
  if (items.length === 0) {
    return null;
  }
  return /*#__PURE__*/jsxRuntime.jsxs(menu.MenuTrigger, {
    align: "end",
    children: [/*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
      children: [/*#__PURE__*/jsxRuntime.jsxs(button.ActionButton, {
        marginEnd: entryLayoutPane === 'main' ? undefined : 'medium',
        children: [/*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
          src: plusIcon.plusIcon
        }), /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
          src: chevronDownIcon.chevronDownIcon
        })]
      }), /*#__PURE__*/jsxRuntime.jsxs(tooltip.Tooltip, {
        children: [/*#__PURE__*/jsxRuntime.jsx(typography.Text, {
          children: "Insert"
        }), /*#__PURE__*/jsxRuntime.jsx(typography.Kbd, {
          children: "/"
        })]
      })]
    }), /*#__PURE__*/jsxRuntime.jsx(menu.Menu, {
      onAction: id => {
        var _idToItem$get;
        const command = (_idToItem$get = idToItem.get(id)) === null || _idToItem$get === void 0 ? void 0 : _idToItem$get.command;
        if (command) {
          commandDispatch(command);
        }
      },
      items: items,
      children: itemRenderer
    })]
  });
}
const isMarkActive = markType => state => {
  if (state.selection instanceof prosemirrorState.TextSelection && state.selection.empty) {
    if (!state.selection.$cursor) return false;
    return !!markType.isInSet(state.storedMarks || state.selection.$cursor.marks());
  }
  for (const range of state.selection.ranges) {
    if (state.doc.rangeHasMark(range.$from.pos, range.$to.pos, markType)) {
      return true;
    }
  }
  return false;
};
function InlineMarks() {
  const state = useEditorState();
  const schema = useEditorSchema();
  const runCommand = useEditorDispatchCommand();
  const inlineMarks = React.useMemo(() => {
    const marks = [];
    if (schema.marks.bold) {
      marks.push({
        key: 'bold',
        label: 'Bold',
        icon: boldIcon.boldIcon,
        shortcut: `B`,
        command: prosemirrorCommands.toggleMark(schema.marks.bold),
        isSelected: isMarkActive(schema.marks.bold)
      });
    }
    if (schema.marks.italic) {
      marks.push({
        key: 'italic',
        label: 'Italic',
        icon: italicIcon.italicIcon,
        shortcut: `I`,
        command: prosemirrorCommands.toggleMark(schema.marks.italic),
        isSelected: isMarkActive(schema.marks.italic)
      });
    }
    if (schema.marks.strikethrough) {
      marks.push({
        key: 'strikethrough',
        label: 'Strikethrough',
        icon: strikethroughIcon.strikethroughIcon,
        command: prosemirrorCommands.toggleMark(schema.marks.strikethrough),
        isSelected: isMarkActive(schema.marks.strikethrough)
      });
    }
    if (schema.marks.code) {
      marks.push({
        key: 'code',
        label: 'Code',
        icon: codeIcon.codeIcon,
        command: prosemirrorCommands.toggleMark(schema.marks.code),
        isSelected: isMarkActive(schema.marks.code)
      });
    }
    marks.push({
      key: 'clearFormatting',
      label: 'Clear formatting',
      icon: removeFormattingIcon.removeFormattingIcon,
      command: removeAllMarks(),
      isSelected: () => false
    });
    return marks;
  }, [schema.marks]);
  const selectedKeys = useMemoStringified(inlineMarks.filter(val => val.isSelected(state)).map(val => val.key));
  const disabledKeys = useMemoStringified(inlineMarks.filter(val => !val.command(state)).map(val => val.key));
  return React.useMemo(() => {
    return /*#__PURE__*/jsxRuntime.jsx(editor.EditorToolbarGroup, {
      "aria-label": "Text formatting",
      value: selectedKeys,
      onChange: key => {
        const mark = inlineMarks.find(mark => mark.key === key);
        if (mark) {
          runCommand(mark.command);
        }
      },
      disabledKeys: disabledKeys,
      selectionMode: "multiple",
      children: inlineMarks.map(mark => /*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
        children: [/*#__PURE__*/jsxRuntime.jsx(editor.EditorToolbarItem, {
          value: mark.key,
          "aria-label": mark.label,
          children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
            src: mark.icon
          })
        }), /*#__PURE__*/jsxRuntime.jsxs(tooltip.Tooltip, {
          children: [/*#__PURE__*/jsxRuntime.jsx(typography.Text, {
            children: mark.label
          }), 'shortcut' in mark && /*#__PURE__*/jsxRuntime.jsx(typography.Kbd, {
            meta: true,
            children: mark.shortcut
          })]
        })]
      }, mark.key))
    });
  }, [disabledKeys, inlineMarks, runCommand, selectedKeys]);
}
function useMemoStringified(value) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => value, [JSON.stringify(value)]);
}
function getActiveListType(state, schema) {
  const sharedDepth = state.selection.$from.sharedDepth(state.selection.to);
  for (let i = sharedDepth; i > 0; i--) {
    const node = state.selection.$from.node(i);
    if (node.type === schema.nodes.ordered_list) {
      return 'ordered_list';
    } else if (node.type === schema.nodes.unordered_list) {
      return 'unordered_list';
    }
  }
  return null;
}
function ListButtons() {
  const state = useEditorState();
  const schema = useEditorSchema();
  const dispatchCommand = useEditorDispatchCommand();
  const canWrapInOrderedList = !!schema.nodes.ordered_list && toggleList(schema.nodes.ordered_list)(state);
  const canWrapInUnorderedList = !!schema.nodes.unordered_list && toggleList(schema.nodes.unordered_list)(state);
  const activeListType = getActiveListType(state, schema);
  const items = React.useMemo(() => {
    return [!!schema.nodes.unordered_list && {
      label: 'Bullet list',
      key: 'unordered_list',
      shortcut: '-',
      icon: listIcon.listIcon
    }, !!schema.nodes.ordered_list && {
      label: 'Numbered list',
      key: 'ordered_list',
      shortcut: '1.',
      icon: listOrderedIcon.listOrderedIcon
    }].filter(removeFalse);
  }, [schema.nodes.unordered_list, schema.nodes.ordered_list]);
  const disabledKeys = React.useMemo(() => {
    return [!canWrapInOrderedList && 'ordered_list', !canWrapInUnorderedList && 'unordered_list'].filter(removeFalse);
  }, [canWrapInOrderedList, canWrapInUnorderedList]);
  return React.useMemo(() => {
    if (items.length === 0) {
      return null;
    }
    return /*#__PURE__*/jsxRuntime.jsx(editor.EditorToolbarGroup, {
      "aria-label": "Lists",
      value: activeListType,
      onChange: key => {
        const format = key;
        const type = schema.nodes[format];
        if (type) {
          dispatchCommand(toggleList(type));
        }
      },
      disabledKeys: disabledKeys,
      selectionMode: "single",
      children: items.map(item => /*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
        children: [/*#__PURE__*/jsxRuntime.jsx(editor.EditorToolbarItem, {
          value: item.key,
          "aria-label": item.label,
          children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
            src: item.icon
          })
        }), /*#__PURE__*/jsxRuntime.jsxs(tooltip.Tooltip, {
          children: [/*#__PURE__*/jsxRuntime.jsx(typography.Text, {
            children: item.label
          }), /*#__PURE__*/jsxRuntime.jsx(typography.Kbd, {
            meta: true,
            children: item.shortcut
          })]
        })]
      }, item.key))
    });
  }, [activeListType, disabledKeys, dispatchCommand, items, schema.nodes]);
}
function removeFalse(val) {
  return val !== false;
}
function removeAllMarks() {
  return (state, dispatch) => {
    if (state.selection.empty) {
      return false;
    }
    if (dispatch) {
      dispatch(state.tr.removeMark(state.selection.from, state.selection.to));
    }
    return true;
  };
}
function typeInSelection(type) {
  return state => {
    let hasBlock = false;
    for (const range of state.selection.ranges) {
      state.doc.nodesBetween(range.$from.pos, range.$to.pos, node => {
        if (node.type === type) {
          hasBlock = true;
        }
      });
      if (hasBlock) break;
    }
    return hasBlock;
  };
}

let i = 0;
function NodeViewContentDOM(props) {
  const viewRef = useEditorViewRef();
  return /*#__PURE__*/jsxRuntime.jsx("span", {
    ref: element => {
      if (!element) return;
      element.appendChild(props.node);
      const view = viewRef.current;
      if (!view) return;
      if (view.hasFocus()) {
        view.focus();
      }
    }
  });
}
const NodeViewWrapper = /*#__PURE__*/React.memo(function NodeViewWrapper(props) {
  return /*#__PURE__*/jsxRuntime.jsx(props.component, {
    node: props.node,
    hasNodeSelection: props.hasNodeSelection,
    isNodeCompletelyWithinSelection: props.isNodeCompletelyWithinSelection,
    children: props.contentDOM ? /*#__PURE__*/jsxRuntime.jsx(NodeViewContentDOM, {
      node: props.contentDOM
    }) : null
  });
});
function NodeViews(props) {
  const pluginState = reactNodeViewKey.getState(props.state);
  if (!pluginState) return null;
  const nodeSelectionPos = props.state.selection instanceof prosemirrorState.NodeSelection ? props.state.selection.from : undefined;
  const selectionFrom = props.state.selection.from;
  const selectionTo = props.state.selection.to;
  return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: [...pluginState].map(([pos, {
      key,
      contentDOM,
      dom,
      type
    }]) => {
      const node = props.state.doc.nodeAt(pos);
      if ((node === null || node === void 0 ? void 0 : node.type) !== type) return null;
      const nodeViewSpec = getReactNodeViewSpec(node.type);
      if (!nodeViewSpec) return null;
      return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/jsxRuntime.jsx(NodeViewWrapper, {
        hasNodeSelection: nodeSelectionPos === pos,
        isNodeCompletelyWithinSelection: pos >= selectionFrom && pos + node.nodeSize <= selectionTo,
        node: node,
        contentDOM: contentDOM,
        component: nodeViewSpec.component
      }), dom, key);
    })
  });
}
function getReactNodeViewSpec(type) {
  return type.spec.reactNodeView;
}
function createNodeView(type) {
  const reactNodeViewSpec = getReactNodeViewSpec(type);
  return {
    key: (i++).toString(),
    type,
    dom: document.createElement('div'),
    contentDOM: reactNodeViewSpec !== null && reactNodeViewSpec !== void 0 && reactNodeViewSpec.rendersOwnContent || type.isLeaf ? undefined : document.createElement(type.inlineContent ? 'div' : 'span')
  };
}
const reactNodeViewKey = new prosemirrorState.PluginKey('reactNodeViews');
function reactNodeViews(schema) {
  const nodes = new Set();
  for (const nodeType of Object.values(schema.nodes)) {
    if (nodeType.spec.reactNodeView) {
      nodes.add(nodeType);
    }
  }
  const plugin = new prosemirrorState.Plugin({
    key: reactNodeViewKey,
    state: {
      init(config, state) {
        const pluginState = new Map();
        state.doc.descendants((node, pos) => {
          if (nodes.has(node.type)) {
            pluginState.set(pos, createNodeView(node.type));
          }
        });
        return pluginState;
      },
      apply(tr, oldPluginState, oldState, newState) {
        const mappedState = new Map();
        for (const [position, val] of oldPluginState) {
          const mapped = tr.mapping.mapResult(position);
          if (mapped.deleted || mappedState.has(mapped.pos)) continue;
          const node = newState.doc.nodeAt(mapped.pos);
          if (!node || node.type !== val.type) continue;
          mappedState.set(mapped.pos, val);
        }
        const newPluginState = new Map();
        newState.doc.descendants((node, pos) => {
          if (nodes.has(node.type)) {
            const key = mappedState.get(pos);
            newPluginState.set(pos, key !== null && key !== void 0 ? key : createNodeView(node.type));
          }
        });
        return newPluginState;
      }
    },
    props: {
      nodeViews: Object.fromEntries([...nodes].map(node => [node.name, (node, view, getPos) => {
        const nodeView = plugin.getState(view.state).get(getPos());
        const contentDOM = nodeView.contentDOM;
        return {
          dom: nodeView.dom,
          contentDOM,
          ignoreMutation(mutation) {
            return !(contentDOM !== null && contentDOM !== void 0 && contentDOM.contains(mutation.target));
          },
          deselectNode() {},
          selectNode() {},
          update() {
            var _plugin$getState;
            const pos = getPos();
            const newNodeView = (_plugin$getState = plugin.getState(view.state)) === null || _plugin$getState === void 0 ? void 0 : _plugin$getState.get(pos);
            return nodeView === newNodeView;
          }
        };
      }]))
    }
  });
  return plugin;
}

const cellActions = {
  deleteRow: {
    label: 'Delete row',
    command: prosemirrorTables.deleteRow
  },
  deleteColumn: {
    label: 'Delete column',
    command: prosemirrorTables.deleteColumn
  },
  insertRowBelow: {
    label: 'Insert row below',
    command: prosemirrorTables.addRowAfter
  },
  insertColumnRight: {
    label: 'Insert column right',
    command: prosemirrorTables.addColumnAfter
  }
};
function CellMenu() {
  const runCommand = useEditorDispatchCommand();
  const gutter = style.tokenSchema.size.space.small;
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    contentEditable: false,
    className: css.css({
      top: gutter,
      insetInlineEnd: gutter,
      position: 'absolute'
    }),
    children: /*#__PURE__*/jsxRuntime.jsxs(tooltip.TooltipTrigger, {
      children: [/*#__PURE__*/jsxRuntime.jsxs(menu.MenuTrigger, {
        align: "end",
        children: [/*#__PURE__*/jsxRuntime.jsx(button.ActionButton, {
          prominence: "low",
          "aria-label": "Cell options",
          UNSAFE_className: css.css({
            borderRadius: style.tokenSchema.size.radius.small,
            height: 'auto',
            minWidth: 0,
            padding: 0,
            // tiny buttons; increase the hit area
            '&::before': {
              content: '""',
              inset: `calc(${gutter} * -1)`,
              position: 'absolute'
            }
          }),
          children: /*#__PURE__*/jsxRuntime.jsx(icon.Icon, {
            src: chevronDownIcon.chevronDownIcon
          })
        }), /*#__PURE__*/jsxRuntime.jsx(menu.Menu, {
          onAction: key => {
            if (key in cellActions) {
              runCommand(cellActions[key].command);
            }
          },
          items: Object.entries(cellActions).map(([key, item]) => ({
            ...item,
            key
          })),
          children: item => /*#__PURE__*/jsxRuntime.jsx(collections.Item, {
            children: item.label
          }, item.key)
        })]
      }), /*#__PURE__*/jsxRuntime.jsx(tooltip.Tooltip, {
        children: "Options"
      })]
    })
  });
}
function getDecoration(state) {
  const cellPos = findCellPosAbove(state.selection.$from);
  if (cellPos !== undefined) {
    const element = document.createElement('div');
    const decoration = prosemirrorView.Decoration.widget(cellPos + 1, element, {
      element,
      side: 1
    });
    return {
      set: prosemirrorView.DecorationSet.create(state.doc, [decoration]),
      element
    };
  }
}
const _tableCellMenuPlugin = new prosemirrorState.Plugin({
  state: {
    init(config, state) {
      return getDecoration(state);
    },
    apply(tr, oldPluginState, oldState, state) {
      return getDecoration(state);
    }
  },
  props: {
    decorations(state) {
      var _tableCellMenuPlugin$;
      return (_tableCellMenuPlugin$ = _tableCellMenuPlugin.getState(state)) === null || _tableCellMenuPlugin$ === void 0 ? void 0 : _tableCellMenuPlugin$.set;
    }
  }
});
function tableCellMenuPlugin() {
  return _tableCellMenuPlugin;
}
function CellMenuPortal() {
  var _tableCellMenuPlugin$2;
  const state = useEditorState();
  const element = (_tableCellMenuPlugin$2 = _tableCellMenuPlugin.getState(state)) === null || _tableCellMenuPlugin$2 === void 0 ? void 0 : _tableCellMenuPlugin$2.element;
  if (!element) return null;
  return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/jsxRuntime.jsx(CellMenu, {}), element);
}
function findCellPosAbove($pos) {
  for (let d = $pos.depth; d > 0; d--) {
    const node = $pos.node(d);
    const role = node.type.spec.tableRole;
    if (role === 'cell' || role === 'header_cell') {
      return $pos.before(d);
    }
  }
}

const contentStyles = style.css({
  flex: 1,
  height: 'auto',
  minHeight: style.tokenSchema.size.scale[2000],
  minWidth: 0,
  outline: 0,
  padding: style.tokenSchema.size.space.medium,
  '&[data-layout="main"]': {
    boxSizing: 'border-box',
    height: '100%',
    padding: 0,
    paddingTop: style.tokenSchema.size.space.medium,
    minHeight: 0,
    minWidth: 0,
    maxWidth: 800,
    marginInline: 'auto',
    [style.breakpointQueries.above.mobile]: {
      padding: style.tokenSchema.size.space.xlarge
    },
    [style.breakpointQueries.above.tablet]: {
      padding: style.tokenSchema.size.space.xxlarge
    },
    '&[data-container="wide"]': {
      padding: style.tokenSchema.size.scale[600]
    }
  }
});
const Editor = /*#__PURE__*/React.forwardRef(function Editor({
  value,
  onChange,
  ...props
}, ref) {
  let entryLayoutPane = index.useEntryLayoutSplitPaneContext();
  const containerSize = index.useContentPanelSize();
  const styleProps = typography.useProseStyleProps({
    size: entryLayoutPane === 'main' ? 'medium' : 'regular',
    UNSAFE_className: contentStyles,
    ...style.toDataAttributes({
      layout: entryLayoutPane,
      container: containerSize
    })
  });
  const id = React.useId();
  const editorContext = React.useMemo(() => ({
    id
  }), [id]);
  return /*#__PURE__*/jsxRuntime.jsx(EditorContextProvider, {
    value: editorContext,
    children: /*#__PURE__*/jsxRuntime.jsxs(ProseMirrorEditor, {
      value: value,
      onChange: onChange,
      ref: ref,
      children: [/*#__PURE__*/jsxRuntime.jsxs(layout.Box, {
        id: getRootId(id),
        "data-keystatic-editor": "root",
        "data-layout": entryLayoutPane,
        backgroundColor: "canvas",
        minWidth: 0,
        UNSAFE_className: style.css(prosemirrorStyles, {
          '&[data-layout="main"]': {
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          },
          '&:not([data-layout="main"])': {
            border: `${style.tokenSchema.size.border.regular} solid ${style.tokenSchema.color.border.neutral}`,
            borderRadius: style.tokenSchema.size.radius.medium
          }
        }),
        children: [/*#__PURE__*/jsxRuntime.jsx(Toolbar, {
          id: getToolbarId(id),
          "data-keystatic-editor": "toolbar"
        }), /*#__PURE__*/jsxRuntime.jsx(ProseMirrorEditable, {
          ...props,
          ...styleProps,
          role: "textbox",
          "aria-multiline": "true",
          id: getContentId(id),
          "data-keystatic-editor": "content"
        })]
      }), /*#__PURE__*/jsxRuntime.jsx(NodeViews, {
        state: value
      }), /*#__PURE__*/jsxRuntime.jsx(CellMenuPortal, {}), /*#__PURE__*/jsxRuntime.jsx(EditorPopoverDecoration, {
        state: value
      }), /*#__PURE__*/jsxRuntime.jsx(AutocompleteDecoration, {})]
    })
  });
});

// https://github.com/ProseMirror/prosemirror-gapcursor/blob/bbbee7d483754310f63f3b18d81f5a1da1250234/src/index.ts
function attributes() {
  return new prosemirrorState.Plugin({
    props: {
      handleKeyDown: handleKeyDown$1,
      nodeViews: {
        attribute: attributeNodeView
      },
      handleClick(view, pos, event) {
        if (event.target instanceof HTMLElement && event.target.dataset.tagName) {
          const {
            state
          } = view;
          const $pos = state.doc.resolve(pos);
          const index = $pos.index(-2);
          const tagPos = state.doc.resolve(pos).posAtIndex(index, -2);
          view.dispatch(state.tr.setSelection(prosemirrorState.NodeSelection.create(state.doc, tagPos)));
          return true;
        }
        return false;
      }
    }
  });
}
const attributeNodeView = (node, outerView, getPos) => {
  const dom = document.createElement('span');
  dom.classList.add(style.css({
    display: 'inline-block',
    marginInline: 4,
    overflow: 'hidden',
    verticalAlign: 'middle',
    '::before': {
      paddingInline: style.tokenSchema.size.space.small,
      content: 'attr(data-markdoc-attribute)',
      display: 'inline-block',
      backgroundColor: style.tokenSchema.color.background.surfaceTertiary,
      borderRight: `${style.tokenSchema.size.border.regular} solid ${style.tokenSchema.color.alias.borderIdle}`
    }
  }));
  dom.classList.add(nodeWithBorder);
  dom.dataset.markdocAttribute = node.attrs.name === 'id' ? '#' : node.attrs.name === 'class' ? '.' : `${node.attrs.name}`;
  const inner = document.createElement('span');
  inner.className = style.css({
    minWidth: 50,
    display: 'inline-block',
    outline: 'none',
    backgroundColor: style.tokenSchema.color.background.canvas
  });
  // to enter this via keyboard, users can press enter while in a node selection on the attribute in the parent document
  inner.tabIndex = -1;
  dom.appendChild(inner);
  const innerView = new prosemirrorView.EditorView({
    mount: inner
  }, {
    state: prosemirrorState.EditorState.create({
      doc: node,
      plugins: [prosemirrorKeymap.keymap({
        'Mod-z': () => prosemirrorHistory.undo(outerView.state, outerView.dispatch),
        'Mod-y': () => prosemirrorHistory.redo(outerView.state, outerView.dispatch),
        Escape: () => {
          outerView.focus();
          outerView.dispatch(outerView.state.tr.setSelection(prosemirrorState.NodeSelection.create(outerView.state.doc, getPos())));
          return true;
        },
        'Mod-a': prosemirrorCommands.selectAll,
        Backspace: state => {
          if (state.selection instanceof prosemirrorState.AllSelection) {
            const pos = getPos();
            outerView.dispatch(outerView.state.tr.delete(pos, pos + node.nodeSize));
            outerView.focus();
            return true;
          }
          return false;
        }
      })]
    }),
    dispatchTransaction: tr => {
      let {
        state,
        transactions
      } = innerView.state.applyTransaction(tr);
      innerView.updateState(state);
      if (!tr.getMeta('fromOutside')) {
        let outerTr = outerView.state.tr,
          offsetMap = prosemirrorTransform.StepMap.offset(getPos() + 1);
        for (let i = 0; i < transactions.length; i++) {
          let steps = transactions[i].steps;
          for (let j = 0; j < steps.length; j++) {
            outerTr.step(steps[j].map(offsetMap));
          }
        }
        if (outerTr.docChanged) outerView.dispatch(outerTr);
      }
    },
    handleDOMEvents: {
      mousedown: () => {
        if (outerView.hasFocus()) innerView === null || innerView === void 0 || innerView.focus();
      }
    }
  });
  domNodeToEditorView.set(dom, innerView);
  return {
    dom,
    selectNode() {
      dom.classList.add(classes.nodeSelection);
    },
    deselectNode() {
      dom.classList.remove(classes.nodeSelection);
    },
    update(newNode) {
      if (!node.sameMarkup(newNode)) return false;
      node = newNode;
      if (innerView) {
        let {
          state
        } = innerView;
        let start = newNode.content.findDiffStart(state.doc.content);
        if (start != null) {
          let {
            a: endA,
            b: endB
          } = newNode.content.findDiffEnd(state.doc.content);
          let overlap = start - Math.min(endA, endB);
          if (overlap > 0) {
            endA += overlap;
            endB += overlap;
          }
          innerView.dispatch(state.tr.replace(start, endB, newNode.slice(start, endA)).setMeta('fromOutside', true));
        }
      }
      return true;
    },
    destroy() {
      innerView.destroy();
      dom.textContent = '';
    },
    stopEvent(event) {
      return innerView.dom.contains(event.target);
    },
    ignoreMutation() {
      return true;
    }
  };
};
const handleKeyDown$1 = prosemirrorKeymap.keydownHandler({
  Enter: (state, dispatch, view) => {
    if (state.selection instanceof prosemirrorState.NodeSelection && state.selection.node.type === getAttributeType(state.schema)) {
      if (!view) return true;
      const node = view.nodeDOM(state.selection.$from.pos);
      if (!node) return true;
      const editorView = domNodeToEditorView.get(node);
      editorView === null || editorView === void 0 || editorView.focus();
      return true;
    }
    return false;
  }
});
const domNodeToEditorView = new WeakMap();

const emptyDecorations = [];
function getDecorationsForIndividualNode(node) {
  if (!node.type.spec.code || !node.childCount) return emptyDecorations;
  const text = node.content.child(0).text;
  if (!text) return emptyDecorations;
  const lang = node.attrs.language;
  if (typeof lang !== 'string' || !Object.prototype.hasOwnProperty.call(index.Prism.languages, node.attrs.language)) {
    return emptyDecorations;
  }
  const decorations = [];
  const tokens = index.Prism.tokenize(text, index.Prism.languages[node.attrs.language]);
  function consumeTokens(start, tokens) {
    for (const token of tokens) {
      const length = getPrismTokenLength(token);
      const end = start + length;
      if (typeof token !== 'string') {
        const className = styles.get(token.type);
        if (className) {
          decorations.push({
            attrs: {
              class: className
            },
            from: start,
            to: end
          });
        }
        consumeTokens(start, Array.isArray(token.content) ? token.content : [token.content]);
      }
      start = end;
    }
  }
  consumeTokens(0, tokens);
  return decorations;
}
function getDecorationsForFragment(fragment) {
  let start = 0;
  const allDecorations = [];
  for (let i = 0; i < fragment.childCount; i++) {
    const node = fragment.child(i);
    const decorations = getDecorationsForNode(node);
    if (!decorations.length) {
      start += node.nodeSize;
      continue;
    }
    const textStart = start + 1;
    for (const decoration of decorations) {
      allDecorations.push({
        attrs: decoration.attrs,
        from: decoration.from + textStart,
        to: decoration.to + textStart
      });
    }
    start += node.nodeSize;
  }
  return allDecorations;
}
const getDecorationsForNode = weakMemoize(node => {
  if (node.isTextblock) return getDecorationsForIndividualNode(node);
  return getDecorationsForFragment(node.content);
});
function codeBlockSyntaxHighlighting() {
  return new prosemirrorState.Plugin({
    props: {
      decorations(state) {
        const decorations = getDecorationsForNode(state.doc).map(decoration => prosemirrorView.Decoration.inline(decoration.from, decoration.to, decoration.attrs));
        return prosemirrorView.DecorationSet.create(state.doc, decorations);
      }
    }
  });
}
function getPrismTokenLength(token) {
  if (typeof token === 'string') {
    return token.length;
  } else if (Array.isArray(token.content)) {
    return token.content.reduce((l, t) => l + getPrismTokenLength(t), 0);
  } else {
    return getPrismTokenLength(token.content);
  }
}
const styles = new Map([{
  types: ['comment', 'prolog', 'doctype', 'cdata'],
  style: {
    color: style.tokenSchema.color.foreground.neutralTertiary,
    fontStyle: 'italic'
  }
}, {
  types: ['atrule', 'attr-name', 'class-name', 'selector'],
  style: {
    color: style.tokenSchema.color.scale.amber11
  }
}, {
  types: ['boolean', 'constant', 'inserted-sign', 'entity', 'inserted', 'number', 'regex', 'symbol', 'variable'],
  style: {
    color: style.tokenSchema.color.scale.green11
  }
}, {
  types: ['attr-value', 'builtin', 'char', 'constant', 'generics', 'url'],
  style: {
    color: style.tokenSchema.color.scale.pink11
  }
}, {
  types: ['string'],
  style: {
    color: style.tokenSchema.color.scale.indigo9
  }
}, {
  types: ['annotation', 'deleted', 'deleted-sign', 'decorator', 'important', 'tag'],
  style: {
    color: style.tokenSchema.color.scale.red11
  }
}, {
  types: ['function', 'function-variable', 'operator'],
  style: {
    color: style.tokenSchema.color.scale.purple11
  }
}, {
  types: ['tag', 'selector', 'keyword'],
  style: {
    color: style.tokenSchema.color.scale.indigo11
  }
}, {
  types: ['punctuation'],
  style: {
    color: style.tokenSchema.color.foreground.neutralSecondary
  }
}].flatMap(style$1 => {
  const className = style.css(style$1.style);
  return style$1.types.map(x => [x, className]);
}));

const mac = typeof navigator != 'undefined' ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : false;
const codeModiferEnterCommand = (state, dispatch, view) => {
  const {
    $head,
    $anchor
  } = state.selection;
  if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) {
    return false;
  }
  return prosemirrorCommands.chainCommands(prosemirrorCommands.createParagraphNear, prosemirrorCommands.liftEmptyBlock, prosemirrorCommands.splitBlock)(state, dispatch, view);
};
function findSelectableAncestor($pos, startDepth) {
  for (let depth = startDepth; depth > 0; depth--) {
    let pos = $pos.before(depth);
    const node = $pos.doc.nodeAt(pos);
    if (node && node.type.spec.selectable !== false) {
      return pos;
    }
  }
}
const selectParentSelectableNode = (state, dispatch) => {
  const {
    $from,
    to
  } = state.selection;
  const same = $from.sharedDepth(to);
  if (same === 0) return false;
  const pos = findSelectableAncestor($from, same);
  if (pos === undefined) return false;
  if (dispatch) {
    dispatch(state.tr.setSelection(prosemirrorState.NodeSelection.create(state.doc, pos)));
  }
  return true;
};
function keymapForSchema({
  nodes,
  marks
}) {
  const bindings = {};
  const add = (key, command) => {
    if (bindings[key]) {
      bindings[key] = prosemirrorCommands.chainCommands(bindings[key], command);
    } else {
      bindings[key] = command;
    }
  };
  if (nodes.list_item) {
    add('Enter', splitListItem(nodes.list_item));
    add('Tab', sinkListItem(nodes.list_item));
    add('Shift-Tab', liftListItem(nodes.list_item));
  }
  add('Enter', prosemirrorCommands.chainCommands(prosemirrorCommands.newlineInCode, prosemirrorCommands.createParagraphNear, prosemirrorCommands.liftEmptyBlock, prosemirrorCommands.splitBlock));
  let deleteBackward = prosemirrorCommands.chainCommands(prosemirrorCommands.deleteSelection, prosemirrorCommands.joinBackward, prosemirrorCommands.selectNodeBackward);
  let deleteForward = prosemirrorCommands.chainCommands(prosemirrorCommands.deleteSelection, prosemirrorCommands.joinForward, prosemirrorCommands.selectNodeForward);
  add('Backspace', deleteBackward);
  add('Mod-Backspace', deleteBackward);
  add('Shift-Backspace', deleteBackward);
  add('Delete', deleteForward);
  add('Mod-Delete', deleteForward);
  add('Mod-a', prosemirrorCommands.selectAll);
  if (mac) {
    add('Ctrl-h', deleteBackward);
    add('Alt-Backspace', deleteBackward);
    add('Ctrl-d', deleteForward);
    add('Ctrl-Alt-Backspace', deleteForward);
    add('Alt-Delete', deleteForward);
    add('Alt-d', deleteForward);
    add('Ctrl-a', prosemirrorCommands.selectTextblockStart);
    add('Ctrl-e', prosemirrorCommands.selectTextblockEnd);
  }
  add('Mod-z', prosemirrorHistory.undo);
  add('Shift-Mod-z', prosemirrorHistory.redo);
  if (mac) {
    add('Mod-y', prosemirrorHistory.redo);
  }
  const modiferEnterKeys = ['Mod-Enter', 'Shift-Enter'];
  if (mac) {
    modiferEnterKeys.push('Ctrl-Enter');
  }
  for (const key of modiferEnterKeys) {
    add(key, codeModiferEnterCommand);
    if (nodes.hard_break) {
      add(key, insertHardBreak(nodes.hard_break));
    }
  }
  for (const mark of Object.values(marks)) {
    if (mark.spec.shortcuts) {
      if (Array.isArray(mark.spec.shortcuts)) {
        for (const shortcut of mark.spec.shortcuts) {
          if (typeof shortcut !== 'string') {
            throw new Error(`Invalid shortcut for mark ${mark.name}`);
          }
          add(shortcut, prosemirrorCommands.toggleMark(mark));
        }
        continue;
      }
      throw new Error(`Invalid shortcuts for mark ${mark.name}`);
    }
  }
  add('Alt-ArrowUp', prosemirrorCommands.joinUp);
  add('Alt-ArrowDown', prosemirrorCommands.joinDown);
  add('Escape', selectParentSelectableNode);
  if (nodes.unordered_list) {
    add('Shift-Ctrl-8', toggleList(nodes.unordered_list));
  }
  if (nodes.ordered_list) {
    add('Shift-Ctrl-9', toggleList(nodes.ordered_list));
  }
  add('Shift-Ctrl-0', prosemirrorCommands.setBlockType(nodes.paragraph));
  for (const level of [1, 2, 3, 4, 5, 6]) {
    add(`Shift-Ctrl-${level}`, prosemirrorCommands.setBlockType(nodes.heading, {
      level
    }));
  }
  return bindings;
}
function insertHardBreak(hardBreakType) {
  return (state, dispatch) => {
    if (dispatch) {
      dispatch(state.tr.replaceSelectionWith(hardBreakType.create()).scrollIntoView());
    }
    return true;
  };
}

// https://github.com/ProseMirror/prosemirror-dropcursor/blob/d7347ca3d07cd9207ce83e33ed066629da4c3a9d/src/dropcursor.ts
/// Create a plugin that, when added to a ProseMirror instance,
/// causes a decoration to show up at the drop position when something
/// is dragged over the editor.
///
/// Nodes may add a `disableDropCursor` property to their spec to
/// control the showing of a drop cursor inside them. This may be a
/// boolean or a function, which will be called with a view and a
/// position, and should return a boolean.
function dropCursor(options = {}) {
  return new prosemirrorState.Plugin({
    view(editorView) {
      return new DropCursorView(editorView, options);
    }
  });
}
class DropCursorView {
  cursorPos = null;
  element = null;
  constructor(editorView, options) {
    var _options$width;
    this.editorView = editorView;
    this.width = (_options$width = options.width) !== null && _options$width !== void 0 ? _options$width : 1;
    this.color = options.color === false ? undefined : options.color || 'black';
    this.class = options.class;
    this.handlers = ['dragover', 'dragend', 'drop', 'dragleave'].map(name => {
      let handler = e => {
        this[name](e);
      };
      editorView.dom.addEventListener(name, handler);
      return {
        name,
        handler
      };
    });
  }
  destroy() {
    this.handlers.forEach(({
      name,
      handler
    }) => this.editorView.dom.removeEventListener(name, handler));
  }
  update(editorView, prevState) {
    if (this.cursorPos != null && prevState.doc != editorView.state.doc) {
      if (this.cursorPos > editorView.state.doc.content.size) {
        this.setCursor(null);
      } else this.updateOverlay();
    }
  }
  setCursor(pos) {
    if (pos == this.cursorPos) return;
    this.cursorPos = pos;
    if (pos == null) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    } else {
      this.updateOverlay();
    }
  }
  updateOverlay() {
    let $pos = this.editorView.state.doc.resolve(this.cursorPos);
    let isBlock = !$pos.parent.inlineContent,
      rect;
    if (isBlock) {
      let before = $pos.nodeBefore,
        after = $pos.nodeAfter;
      if (before || after) {
        let node = this.editorView.nodeDOM(this.cursorPos - (before ? before.nodeSize : 0));
        if (node) {
          let nodeRect = node.getBoundingClientRect();
          let top = before ? nodeRect.bottom : nodeRect.top;
          if (before && after) {
            top = (top + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2;
          }
          rect = {
            left: nodeRect.left,
            right: nodeRect.right,
            top: top - this.width / 2,
            bottom: top + this.width / 2
          };
        }
      }
    }
    if (!rect) {
      let coords = this.editorView.coordsAtPos(this.cursorPos);
      rect = {
        left: coords.left - this.width / 2,
        right: coords.left + this.width / 2,
        top: coords.top,
        bottom: coords.bottom
      };
    }
    let parent = this.editorView.dom.offsetParent;
    if (!this.element) {
      this.element = parent.appendChild(document.createElement('div'));
      if (this.class) this.element.className = this.class;
      this.element.style.cssText = 'position: absolute; z-index: 50; pointer-events: none;';
      if (this.color) {
        this.element.style.backgroundColor = this.color;
      }
    }
    this.element.classList.toggle('prosemirror-dropcursor-block', isBlock);
    this.element.classList.toggle('prosemirror-dropcursor-inline', !isBlock);
    let parentLeft, parentTop;
    if (!parent || parent == document.body && getComputedStyle(parent).position == 'static') {
      parentLeft = -pageXOffset;
      parentTop = -pageYOffset;
    } else {
      let rect = parent.getBoundingClientRect();
      parentLeft = rect.left - parent.scrollLeft;
      parentTop = rect.top - parent.scrollTop;
    }
    this.element.style.left = rect.left - parentLeft + 'px';
    this.element.style.top = rect.top - parentTop + 'px';
    this.element.style.width = rect.right - rect.left + 'px';
    this.element.style.height = rect.bottom - rect.top + 'px';
  }
  scheduleRemoval(timeout) {
    if (this.timeout !== undefined) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => this.setCursor(null), timeout);
  }
  dragover(event) {
    if (!this.editorView.editable) return;
    let pos = this.editorView.posAtCoords({
      left: event.clientX,
      top: event.clientY
    });
    let node = pos && pos.inside >= 0 && this.editorView.state.doc.nodeAt(pos.inside);
    let disableDropCursor = node && node.type.spec.disableDropCursor;
    let disabled = typeof disableDropCursor == 'function' ? disableDropCursor(this.editorView, pos, event) : disableDropCursor;
    if (pos && !disabled) {
      let target = pos.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        let point = prosemirrorTransform.dropPoint(this.editorView.state.doc, target, this.editorView.dragging.slice);
        if (point != null) target = point;
      }
      this.setCursor(target);
      this.scheduleRemoval(5000);
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(event) {
    if (event.target == this.editorView.dom || !this.editorView.dom.contains(event.relatedTarget)) {
      this.setCursor(null);
    }
  }
}

// https://github.com/ProseMirror/prosemirror-gapcursor/blob/bbbee7d483754310f63f3b18d81f5a1da1250234/src/index.ts

/// Create a gap cursor plugin. When enabled, this will capture clicks
/// near and arrow-key-motion past places that don't have a normally
/// selectable position nearby, and create a gap cursor selection for
/// them. The cursor is drawn as an element with class
/// `ProseMirror-gapcursor`. You can either include
/// `style/gapcursor.css` from the package's directory or add your own
/// styles to make it visible.
function gapCursor() {
  return new prosemirrorState.Plugin({
    props: {
      decorations: drawGapCursor,
      createSelectionBetween(_view, $anchor, $head) {
        return $anchor.pos == $head.pos && GapCursor.valid($head) ? new GapCursor($head) : null;
      },
      handleClick,
      handleKeyDown,
      handleDOMEvents: {
        beforeinput: beforeinput
      }
    }
  });
}
const handleKeyDown = prosemirrorKeymap.keydownHandler({
  ArrowLeft: arrow('horiz', -1),
  ArrowRight: arrow('horiz', 1),
  ArrowUp: arrow('vert', -1),
  ArrowDown: arrow('vert', 1)
});
function arrow(axis, dir) {
  const dirStr = axis == 'vert' ? dir > 0 ? 'down' : 'up' : dir > 0 ? 'right' : 'left';
  return function (state, dispatch, view) {
    let sel = state.selection;
    let $start = dir > 0 ? sel.$to : sel.$from,
      mustMove = sel.empty;
    if (sel instanceof prosemirrorState.TextSelection) {
      if (!view.endOfTextblock(dirStr) || $start.depth == 0) return false;
      mustMove = false;
      $start = state.doc.resolve(dir > 0 ? $start.after() : $start.before());
    }
    let $found = GapCursor.findGapCursorFrom($start, dir, mustMove);
    if (!$found) return false;
    if (dispatch) dispatch(state.tr.setSelection(new GapCursor($found)));
    return true;
  };
}
function handleClick(view, pos, event) {
  if (!view || !view.editable) return false;
  let $pos = view.state.doc.resolve(pos);
  if (!GapCursor.valid($pos)) return false;
  let clickPos = view.posAtCoords({
    left: event.clientX,
    top: event.clientY
  });
  if (clickPos && clickPos.inside > -1 && prosemirrorState.NodeSelection.isSelectable(view.state.doc.nodeAt(clickPos.inside))) {
    return false;
  }
  view.dispatch(view.state.tr.setSelection(new GapCursor($pos)));
  return true;
}

// This is a hack that, when a composition starts while a gap cursor
// is active, quickly creates an inline context for the composition to
// happen in, to avoid it being aborted by the DOM selection being
// moved into a valid position.
function beforeinput(view, event) {
  if (event.inputType != 'insertCompositionText' || !(view.state.selection instanceof GapCursor)) {
    return false;
  }
  let {
    $from
  } = view.state.selection;
  let insert = $from.parent.contentMatchAt($from.index()).findWrapping(view.state.schema.nodes.text);
  if (!insert) return false;
  let frag = prosemirrorModel.Fragment.empty;
  for (let i = insert.length - 1; i >= 0; i--) {
    frag = prosemirrorModel.Fragment.from(insert[i].createAndFill(null, frag));
  }
  let tr = view.state.tr.replace($from.pos, $from.pos, new prosemirrorModel.Slice(frag, 0, 0));
  tr.setSelection(prosemirrorState.TextSelection.near(tr.doc.resolve($from.pos + 1)));
  view.dispatch(tr);
  return false;
}
function drawGapCursor(state) {
  if (!(state.selection instanceof GapCursor)) return null;
  let node = document.createElement('div');
  node.className = 'ProseMirror-gapcursor';
  return prosemirrorView.DecorationSet.create(state.doc, [prosemirrorView.Decoration.widget(state.selection.head, node, {
    key: 'gapcursor'
  })]);
}

// https://github.com/ProseMirror/prosemirror-inputrules/blob/47dff8a7316e5cf86343e37fd97588a30345bc0a/src/inputrules.ts
const MAX_MATCH = 500;

/// Create an input rules plugin. When enabled, it will cause text
/// input that matches any of the given rules to trigger the rule's
/// action.
function inputRules({
  rules,
  enterRules
}) {
  return new prosemirrorState.Plugin({
    props: {
      handleTextInput(view) {
        setTimeout(() => {
          run(view, rules);
        });
        return false;
      },
      handleKeyDown(view, event) {
        if (event.key === 'Enter') {
          return run(view, enterRules);
        }
        return false;
      },
      handleDOMEvents: {
        compositionend: view => {
          setTimeout(() => {
            run(view, rules);
          });
        }
      }
    }
  });
}
function getMatch(state, from, to, rules) {
  const $from = state.doc.resolve(from);
  if ($from.parent.type.spec.code) return;
  const textBefore = $from.parent.textBetween(Math.max(0, $from.parentOffset - MAX_MATCH), $from.parentOffset, null, '\ufffc');
  for (const rule of rules) {
    const match = rule.pattern.exec(textBefore);
    if (!match) continue;
    const matchFrom = from - match[0].length;
    const tr = rule.handler(state, match, matchFrom, to);
    if (!tr) continue;
    return tr;
  }
  return;
}
function run(view, rules) {
  const state = view.state;
  if (view.composing || !(state.selection instanceof prosemirrorState.TextSelection)) {
    return false;
  }
  const {
    $cursor
  } = state.selection;
  if (!$cursor) return false;
  const tr = getMatch(state, $cursor.pos, $cursor.pos, rules);
  if (!tr) return false;
  view.dispatch(prosemirrorHistory.closeHistory(tr));
  return true;
}

// based on https://github.com/ProseMirror/prosemirror-inputrules/blob/47dff8a7316e5cf86343e37fd97588a30345bc0a/src/inputrules.ts
/// Build an input rule handler for automatically wrapping a textblock when a
/// given string is typed.
///
/// `nodeType` is the type of node to wrap in. If it needs attributes,
/// you can either pass them directly, or pass a function that will
/// compute them from the regular expression match.
///
/// By default, if there's a node with the same type above the newly
/// wrapped node, the rule will try to [join](#transform.Transform.join) those
/// two nodes. You can pass a join predicate, which takes a regular
/// expression match and the node before the wrapped node, and can
/// return a boolean to indicate whether a join should happen.
function wrappingInputRuleHandler(nodeType, getAttrs = null, joinPredicate) {
  return (state, match, start, end) => {
    let attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
    let tr = state.tr.delete(start, end);
    let $start = tr.doc.resolve(start),
      range = $start.blockRange(),
      wrapping = range && prosemirrorTransform.findWrapping(range, nodeType, attrs);
    if (!wrapping) return null;
    tr.wrap(range, wrapping);
    let before = tr.doc.resolve(start - 1).nodeBefore;
    if (before && before.type == nodeType && prosemirrorTransform.canJoin(tr.doc, start - 1) && (!joinPredicate || joinPredicate(match, before))) {
      tr.join(start - 1);
    }
    return tr;
  };
}

/// Build an input rule that changes the type of a textblock when the
/// matched text is typed into it. You'll usually want to start your
/// regexp with `^` to that it is only matched at the start of a
/// textblock. The optional `getAttrs` parameter can be used to compute
/// the new node's attributes, and works the same as in the
/// `wrappingInputRule` function.
function textblockTypeInputRuleHandler(nodeType, getAttrs = null) {
  return (state, match, start, end) => {
    let $start = state.doc.resolve(start);
    let attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
    if (attrs === false) return null;
    if (!$start.node(-1).canReplaceWith($start.index(-1), $start.indexAfter(-1), nodeType)) {
      return null;
    }
    return state.tr.delete(start, end).setBlockType(start, start, nodeType, attrs);
  };
}
function replaceTypeInputRuleHandler(nodeType, getAttrs = null) {
  return (state, match, start, end) => {
    let $start = state.doc.resolve(start);
    let attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
    if (!$start.node(-1).canReplaceWith($start.index(-1), $start.indexAfter(-1), nodeType)) {
      return null;
    }

    // might want to move the selection to after the divider
    return state.tr.delete(start, end).replaceSelectionWith(nodeType.createAndFill(attrs));
  };
}
function stringHandler(replacement) {
  return (state, match, start, end) => {
    let insert = replacement;
    if (match[1]) {
      let offset = match[0].lastIndexOf(match[1]);
      insert += match[0].slice(offset + match[1].length);
      start += offset;
      let cutOff = start - end;
      if (cutOff > 0) {
        insert = match[0].slice(offset - cutOff, offset) + insert;
        start = end;
      }
    }
    return state.tr.insertText(insert, start, end);
  };
}

const shortcuts = {
  '...': '…',
  '-->': '→',
  '->': '→',
  '<-': '←',
  '<--': '←',
  '--': '–',
  '(c)': '©',
  '(r)': '®',
  '(tm)': '™'
};
const simpleMarkShortcuts = new Map([['bold', ['**', '__']], ['italic', ['*', '_']], ['strikethrough', ['~~']], ['code', ['`']]]);

const attributeMenuInputRule = {
  pattern: /(?:^|\s)%$/,
  handler(state, _match, _start, end) {
    return addNewAttributeAutocompleteDecoration(state.tr, end - 1, end);
  }
};
function getDeepestAncestorAttributeSchema(pos) {
  for (let depth = pos.depth; depth >= 0; depth--) {
    const node = pos.node(depth);
    if (node.type.name === 'paragraph' || node.type.name === 'heading') {
      return node;
    }
  }
}
function addNewAttributeAutocompleteDecoration(tr, from, to) {
  return addAutocompleteDecoration(tr, NewAttributeMenu, from, to, /^(?:[a-zA-Z][-_a-zA-Z0-9]*)?$/);
}
function childRenderer(item) {
  return /*#__PURE__*/jsxRuntime.jsx(listbox.Item, {
    textValue: item.name,
    children: item.name
  }, item.name);
}
function addAttribute(name) {
  return (state, dispatch, view) => {
    if (dispatch) {
      const tr = state.tr;
      tr.insert(state.selection.from, getAttributeType(state.schema).createAndFill({
        name
      }));
      tr.setSelection(new prosemirrorState.NodeSelection(tr.doc.resolve(state.selection.from)));
      dispatch(tr);
      Promise.resolve().then(() => {
        var _domNodeToEditorView$;
        const node = view === null || view === void 0 ? void 0 : view.nodeDOM(view === null || view === void 0 ? void 0 : view.state.selection.from);
        if (!node) return;
        (_domNodeToEditorView$ = domNodeToEditorView.get(node)) === null || _domNodeToEditorView$ === void 0 || _domNodeToEditorView$.focus();
      });
    }
    return true;
  };
}
function NewAttributeMenu(props) {
  const viewRef = useEditorViewRef();
  const dispatchCommand = useEditorDispatchCommand();
  const editorState = useEditorState();
  const ancestorNodeAllowingAttributes = getDeepestAncestorAttributeSchema(editorState.doc.resolve(props.from));
  const options = React.useMemo(() => matchSorter.matchSorter((_getEditorSchema$mark => {
    if (!(ancestorNodeAllowingAttributes !== null && ancestorNodeAllowingAttributes !== void 0 && ancestorNodeAllowingAttributes.type)) return [];
    const attributes = {
      ...Markdoc.globalAttributes,
      ...((_getEditorSchema$mark = getEditorSchema(ancestorNodeAllowingAttributes.type.schema).markdocConfig) === null || _getEditorSchema$mark === void 0 || (_getEditorSchema$mark = _getEditorSchema$mark.nodes) === null || _getEditorSchema$mark === void 0 || (_getEditorSchema$mark = _getEditorSchema$mark[ancestorNodeAllowingAttributes.type.name]) === null || _getEditorSchema$mark === void 0 ? void 0 : _getEditorSchema$mark.attributes)
    };
    return Object.keys(attributes).map(name => ({
      name,
      extra: name === 'id' ? '#' : name === 'class' ? '.' : undefined,
      command: addAttribute(name)
    }));
  })(), props.query, {
    keys: ['key', 'extra']
  }), [props.query, ancestorNodeAllowingAttributes === null || ancestorNodeAllowingAttributes === void 0 ? void 0 : ancestorNodeAllowingAttributes.type]);
  useEditorKeydownListener(event => {
    if (event.key !== ' ') return false;
    if (options.length === 1) {
      dispatchCommand(wrapCommandAfterRemovingAutocompleteDecoration(addAttribute(options[0].name)));
      return true;
    }
    if (options.length === 0) {
      var _viewRef$current;
      (_viewRef$current = viewRef.current) === null || _viewRef$current === void 0 || _viewRef$current.dispatch(removeAutocompleteDecoration(editorState.tr));
    }
    return false;
  });
  return /*#__PURE__*/jsxRuntime.jsx(EditorAutocomplete, {
    from: props.from,
    to: props.to,
    "aria-label": "New attribute",
    items: options,
    children: childRenderer,
    onEscape: () => {
      var _viewRef$current2;
      const tr = removeAutocompleteDecorationAndContent(editorState);
      if (!tr) return;
      (_viewRef$current2 = viewRef.current) === null || _viewRef$current2 === void 0 || _viewRef$current2.dispatch(tr);
    },
    onAction: key => {
      const option = options.find(option => option.name === key);
      if (!option) return;
      dispatchCommand(wrapCommandAfterRemovingAutocompleteDecoration(addAttribute(option.name)));
    }
  });
}

const textShortcutRules = Object.entries(shortcuts).map(([shortcut, replacement]) => ({
  pattern: new RegExp(`(${escape__default["default"](shortcut)})\\s$`),
  handler: stringHandler(replacement)
}));
function inputRulesForSchema({
  nodes,
  marks
}) {
  const rules = [...textShortcutRules];
  rules.push({
    pattern: /^\s*>\s$/,
    handler: wrappingInputRuleHandler(nodes.blockquote)
  });
  rules.push({
    pattern: /^\s*\d+(?:\.|\))\s$/,
    handler: wrappingInputRuleHandler(nodes.ordered_list)
  });
  rules.push({
    pattern: /^\s*([-+*])\s$/,
    handler: wrappingInputRuleHandler(nodes.unordered_list)
  });
  rules.push({
    pattern: /^```(\w+)?\s$/,
    handler: textblockTypeInputRuleHandler(nodes.code_block, match => {
      var _match$;
      return {
        language: (_match$ = match[1]) !== null && _match$ !== void 0 ? _match$ : 'plain'
      };
    })
  });
  rules.push({
    pattern: /^---$/,
    handler: replaceTypeInputRuleHandler(nodes.divider)
  });
  rules.push({
    pattern: /^(#{1,6})\s$/,
    handler: textblockTypeInputRuleHandler(nodes.heading, match => ({
      level: match[1].length
    }))
  });
  for (const [markName, shortcuts] of simpleMarkShortcuts) {
    const mark = marks[markName];
    for (const shortcut of shortcuts) {
      rules.push({
        pattern: new RegExp(`${shortcut[0] === '_' ? '(?:^|\\s)' : shortcut === '*' ? '(?:^|[^\\*])' : ''}${escape__default["default"](shortcut)}([^${escape__default["default"](shortcut[0])}\\s]|(?:[^${escape__default["default"](shortcut[0])}\\s].*[^\\s]))${escape__default["default"](shortcut)}$`),
        handler: (state, [, content], __start, end) => {
          const start = end - content.length - shortcut.length * 2;
          if (!allowsMarkType(state.doc, start, end, mark)) return null;
          const tr = state.tr;
          tr.addMark(start + shortcut.length, end - shortcut.length, mark.create());
          tr.delete(end - shortcut.length, end);
          tr.delete(start, start + shortcut.length);
          tr.removeStoredMark(mark);
          return tr;
        }
      });
    }
  }
  const linkType = marks.link;
  rules.push({
    pattern: /(?:^|[^!])\[(.*)\]\((.*)\)$/,
    handler(state, [, text, href], __start, end) {
      const start = end - href.length - text.length - 4;
      if (!allowsMarkType(state.doc, start, end, linkType)) return null;
      const tr = state.tr;
      tr.addMark(start, end, linkType.create({
        href
      }));
      tr.delete(start + 1 + text.length, end);
      tr.delete(start, start + 1);
      tr.removeStoredMark(linkType);
      return tr;
    }
  });
  rules.push(insertMenuInputRule);
  rules.push(attributeMenuInputRule);
  return rules;
}
function enterInputRulesForSchema({
  nodes
}) {
  const rules = [];
  rules.push({
    pattern: /^```(\w+)?$/,
    handler: textblockTypeInputRuleHandler(nodes.code_block, match => {
      var _match$2;
      return {
        language: (_match$2 = match[1]) !== null && _match$2 !== void 0 ? _match$2 : 'plain'
      };
    })
  });
  return rules;
}
function allowsMarkType(doc, start, end, markType) {
  let allowsMarkType = true;
  doc.nodesBetween(start, end, node => {
    if (!node.isText && !node.type.allowsMarkType(markType)) {
      allowsMarkType = false;
    }
  });
  return allowsMarkType;
}

function isValidURL(url) {
  return url === sanitizeUrl.sanitizeUrl(url);
}
const urlPattern = /^https?:\/\//;
function rangeHasLink($from, $to, schema) {
  let hasLink = false;
  $from.doc.nodesBetween($from.pos, $to.pos, node => {
    if (node.marks.some(x => x.type === schema.marks.link)) {
      hasLink = true;
      return false;
    }
  });
  return hasLink;
}
function pasteLinks(schema) {
  return new prosemirrorState.Plugin({
    props: {
      transformPasted(slice) {
        var _slice$content$firstC, _slice$content$firstC2;
        if (slice.content.childCount === 1 && ((_slice$content$firstC = slice.content.firstChild) === null || _slice$content$firstC === void 0 ? void 0 : _slice$content$firstC.type) === schema.nodes.paragraph && ((_slice$content$firstC2 = slice.content.firstChild.firstChild) === null || _slice$content$firstC2 === void 0 ? void 0 : _slice$content$firstC2.text) !== undefined && urlPattern.test(slice.content.firstChild.firstChild.text) && isValidURL(slice.content.firstChild.firstChild.text) && slice.content.firstChild.firstChild.marks.length === 0) {
          return prosemirrorModel.Slice.maxOpen(prosemirrorModel.Fragment.from(schema.nodes.paragraph.createChecked(null, schema.schema.text(slice.content.firstChild.firstChild.text, [schema.marks.link.create({
            href: slice.content.firstChild.firstChild.text,
            title: ''
          })]))));
        }
        return slice;
      },
      handlePaste(view, event) {
        var _event$clipboardData;
        const plain = (_event$clipboardData = event.clipboardData) === null || _event$clipboardData === void 0 ? void 0 : _event$clipboardData.getData('text/plain');
        if (plain &&
        // isValidURL is a bit more permissive than a user might expect
        // so for pasting, we'll constrain it to starting with https:// or http://
        urlPattern.test(plain) && isValidURL(plain) && !view.state.selection.empty && view.state.selection.$from.parent === view.state.selection.$to.parent && !rangeHasLink(view.state.selection.$from, view.state.selection.$to, schema)) {
          const {
            tr
          } = view.state;
          tr.addMark(view.state.selection.from, view.state.selection.to, view.state.schema.marks.link.create({
            href: plain,
            title: ''
          }));
          view.dispatch(tr);
          return true;
        }
        return false;
      }
    }
  });
}

function _blocks(fragment, extraFiles) {
  const children = [];
  fragment.forEach(child => {
    children.push(proseMirrorToMarkdoc(child, extraFiles));
  });
  return children;
}
function _inline(fragment, extraFiles) {
  return [new Markdoc.Ast.Node('inline', {}, textblockChildren(fragment, extraFiles))];
}

// TODO: this should handle marks spanning over multiple text nodes properly
function textblockChildren(fragment, extraFiles) {
  const children = [];
  fragment.forEach(child => {
    if (child.type === child.type.schema.nodes.image) {
      if (extraFiles) {
        const src = jsBase64.toUint8Array(child.attrs.src.replace(/^data:[a-z/-]+;base64,/, ''));
        extraFiles.set(child.attrs.filename, src);
      }
      children.push(new Markdoc.Ast.Node('image', {
        src: child.attrs.filename,
        alt: child.attrs.alt,
        title: child.attrs.title
      }));
    }
    if (child.text !== undefined) {
      const textNode = new Markdoc.Ast.Node('text', {
        content: child.text
      }, []);
      let node = textNode;
      const schema = getEditorSchema(child.type.schema);
      let linkMark;
      for (const mark of child.marks) {
        if (mark.type === schema.marks.link) {
          linkMark = mark;
          continue;
        }
        let type;
        if (mark.type === schema.marks.bold) {
          type = 'strong';
        }
        if (mark.type === schema.marks.code) {
          textNode.type = 'code';
          continue;
        }
        if (mark.type === schema.marks.italic) {
          type = 'em';
        }
        if (mark.type === schema.marks.strikethrough) {
          type = 's';
        }
        if (type) {
          node = new Markdoc.Ast.Node(type, {
            type: mark.type.name
          }, [node]);
        }
      }
      if (linkMark) {
        node = new Markdoc.Ast.Node('link', {
          href: linkMark.attrs.href
        }, [node]);
      }
      children.push(node);
    }
  });
  return children;
}
function proseMirrorToMarkdoc(node, extraFiles) {
  const blocks = fragment => _blocks(fragment, extraFiles);
  const inline = fragment => _inline(fragment, extraFiles);
  const schema = getEditorSchema(node.type.schema);
  if (node.type === schema.nodes.doc) {
    return new Markdoc.Ast.Node('document', {}, blocks(node.content));
  }
  if (node.type === schema.nodes.paragraph) {
    return new Markdoc.Ast.Node('paragraph', {}, inline(node.content));
  }
  if (node.type === schema.nodes.blockquote) {
    return new Markdoc.Ast.Node('blockquote', {}, blocks(node.content));
  }
  if (node.type === schema.nodes.divider) {
    return new Markdoc.Ast.Node('hr');
  }
  if (node.type === schema.nodes.table) {
    const rows = blocks(node.content);
    const head = new Markdoc.Ast.Node('thead', {}, []);
    if (rows[0].children[0].type === 'th') {
      head.children.push(rows.shift());
    }
    const body = new Markdoc.Ast.Node('tbody', {}, rows);
    return new Markdoc.Ast.Node('tag', {}, [new Markdoc.Ast.Node('table', {}, [head, body])], 'table');
  }
  if (node.type === schema.nodes.table_row) {
    return new Markdoc.Ast.Node('tr', {}, blocks(node.content));
  }
  if (node.type === schema.nodes.table_header) {
    return new Markdoc.Ast.Node('th', {}, blocks(node.content));
  }
  if (node.type === schema.nodes.table_cell) {
    return new Markdoc.Ast.Node('td', {}, blocks(node.content));
  }
  if (node.type === schema.nodes.heading) {
    return new Markdoc.Ast.Node('heading', {
      level: node.attrs.level
    }, inline(node.content));
  }
  if (node.type === schema.nodes.code_block) {
    return new Markdoc.Ast.Node('fence', typeof node.attrs.language === 'string' && node.attrs.language !== 'plain' ? {
      language: node.attrs.language,
      content: node.textBetween(0, node.content.size) + '\n'
    } : {
      content: node.textBetween(0, node.content.size) + '\n'
    }, inline(node.content));
  }
  if (node.type === schema.nodes.list_item) {
    let listItemContent = blocks(node.content);
    if (listItemContent.length === 1 && listItemContent[0].type === 'paragraph') {
      listItemContent = listItemContent[0].children;
    }
    return new Markdoc.Ast.Node('item', {}, listItemContent);
  }
  if (node.type === schema.nodes.ordered_list) {
    return new Markdoc.Ast.Node('list', {
      ordered: true
    }, blocks(node.content));
  }
  if (node.type === schema.nodes.unordered_list) {
    return new Markdoc.Ast.Node('list', {
      ordered: false
    }, blocks(node.content));
  }
  return new Markdoc.Ast.Node('paragraph', {}, inline(node.content));
}

let state;
function getState() {
  if (!state) {
    throw new Error('state not set');
  }
  return state;
}
function getSchema() {
  return getState().schema;
}
function error(error) {
  getState().errors.push(error);
}
function withMark(mark, fn) {
  const state = getState();
  const oldMarks = state.marks;
  state.marks = mark.addToSet(state.marks);
  try {
    return fn();
  } finally {
    state.marks = oldMarks;
  }
}
function childrenToProseMirrorNodes(nodes) {
  const children = [];
  for (const node of nodes) {
    const pmNode = markdocNodeToProseMirrorNode(node);
    if (pmNode) {
      if (Array.isArray(pmNode)) {
        children.push(...pmNode);
      } else {
        children.push(pmNode);
      }
    }
  }
  return children;
}
function notAllowed(node) {
  error({
    error: {
      id: 'unspecified-type',
      level: 'critical',
      message: `${node.type} is not allowed`
    },
    lines: node.lines,
    type: node.type,
    location: node.location
  });
  return childrenToProseMirrorNodes(node.children);
}
function createAndFill(markdocNode, nodeType, attrs, extraChildren, mapChildren) {
  let children = childrenToProseMirrorNodes(markdocNode.children);
  if (mapChildren) {
    children = mapChildren(children);
  }
  const node = nodeType.createAndFill(attrs, extraChildren ? [...children, ...extraChildren] : children);
  if (!node) {
    error({
      error: {
        id: 'unexpected-children',
        level: 'critical',
        message: `${markdocNode.type} has unexpected children`
      },
      lines: markdocNode.lines,
      type: markdocNode.type,
      location: markdocNode.location
    });
  }
  return node;
}
function addMark(node, mark) {
  if (!mark) return notAllowed(node);
  return withMark(mark instanceof prosemirrorModel.MarkType ? mark.create() : mark, () => childrenToProseMirrorNodes(node.children));
}
function markdocToProseMirror(node, schema, files) {
  state = {
    schema,
    errors: [],
    marks: [],
    files: files !== null && files !== void 0 ? files : new Map()
  };
  try {
    let pmNode = markdocNodeToProseMirrorNode(node);
    if (state.errors.length) {
      throw new Error(state.errors.map(e => e.lines[0] + ':' + e.error.message).join('\n'));
    }
    if (!(pmNode instanceof prosemirrorModel.Node)) {
      throw new Error('unexpected node');
    }
    return pmNode;
  } finally {
    state = undefined;
  }
}
function parseAnnotations(node) {
  const schema = getSchema();
  return node.annotations.map(x => {
    if (x.type === 'id') {
      return schema.nodes.attribute.createChecked({
        name: 'id'
      }, [schema.nodes.attribute_string.createChecked(null, [schema.schema.text(x.name)])]);
    }
    if (x.type === 'class') {
      return schema.nodes.attribute.createChecked({
        name: 'class'
      }, [schema.nodes.attribute_string.createChecked(null, [schema.schema.text(x.name)])]);
    }
    let val;
    if (typeof x.value === 'string') {
      val = schema.nodes.attribute_string.createChecked(null, [schema.schema.text(x.value)]);
    }
    if (x.value === true) {
      val = schema.nodes.attribute_true.createChecked();
    }
    if (x.value === false) {
      val = schema.nodes.attribute_false.createChecked();
    }
    if (val === undefined) {
      error({
        error: {
          id: 'unimplemented-annotation',
          level: 'critical',
          message: `currently, only string and boolean annotations are implemented (got ${x.value})`
        },
        lines: node.lines,
        type: node.type,
        location: node.location
      });
      return schema.nodes.attribute.createAndFill({
        name: x.name
      });
    }
    return schema.nodes.attribute.createChecked({
      name: x.name
    }, [val]);
  });
}
const wrapInParagraph = schema => children => {
  return children.map(x => {
    if (x.isInline) {
      return schema.nodes.paragraph.createAndFill({}, [x]);
    }
    return x;
  });
};
function markdocNodeToProseMirrorNode(node) {
  if (node.errors.length) {
    for (const err of node.errors) {
      error({
        error: err,
        lines: node.lines,
        type: node.type,
        location: node.location
      });
    }
    return null;
  }
  if (node.type === 'error') {
    error({
      error: {
        id: 'error-node',
        level: 'critical',
        message: 'Unexpected error node without errors'
      },
      lines: node.lines,
      type: node.type,
      location: node.location
    });
    return null;
  }
  const schema = getSchema();
  if (node.type === 'inline') {
    return childrenToProseMirrorNodes(node.children);
  }
  if (node.type === 'em') {
    return addMark(node, schema.marks.italic);
  }
  if (node.type === 'code') {
    return schema.schema.text(node.attributes.content, [...getState().marks, schema.marks.code.create()]);
  }
  if (node.type === 's') {
    return addMark(node, schema.marks.strikethrough);
  }
  if (node.type === 'strong') {
    return addMark(node, schema.marks.bold);
  }
  if (node.type === 'softbreak') {
    return schema.schema.text('\n');
  }
  if (node.type === 'hardbreak') {
    if (!schema.nodes.hard_break) return notAllowed(node);
    return schema.nodes.hard_break.create();
  }
  if (node.type === 'blockquote') {
    return createAndFill(node, schema.nodes.blockquote, {});
  }
  if (node.type === 'heading') {
    return createAndFill(node, schema.nodes.heading, {
      level: node.attributes.level
    }, parseAnnotations(node));
  }
  if (node.type === 'paragraph') {
    return createAndFill(node, schema.nodes.paragraph, {}, parseAnnotations(node));
  }
  if (node.type === 'comment') {
    return [];
  }
  if (node.type === 'document') {
    return createAndFill(node, schema.nodes.doc, {});
  }
  if (node.type === 'fence') {
    return schema.nodes.code_block.createAndFill({
      language: typeof node.attributes.language === 'string' ? node.attributes.language : 'plain'
    }, schema.schema.text(node.attributes.content.slice(0, -1)));
  }
  if (node.type === 'hr') {
    return createAndFill(node, schema.nodes.divider, {});
  }
  if (node.type === 'link') {
    var _schema$marks$link;
    return addMark(node, (_schema$marks$link = schema.marks.link) === null || _schema$marks$link === void 0 ? void 0 : _schema$marks$link.create({
      href: node.attributes.href
    }));
  }
  if (node.type === 'text') {
    return schema.schema.text(node.attributes.content, getState().marks);
  }
  if (node.type === 'item') {
    return createAndFill(node, schema.nodes.list_item, {}, undefined, wrapInParagraph(schema));
  }
  if (node.type === 'list') {
    return createAndFill(node, node.attributes.ordered ? schema.nodes.ordered_list : schema.nodes.unordered_list, {});
  }
  if (node.type === 'table') {
    return createAndFill(node, schema.nodes.table, {});
  }
  if (node.type === 'tbody' || node.type === 'thead') {
    return childrenToProseMirrorNodes(node.children);
  }
  if (node.type === 'tr') {
    return createAndFill(node, schema.nodes.table_row, {});
  }
  if (node.type === 'th') {
    return createAndFill(node, schema.nodes.table_header, {}, undefined, wrapInParagraph(schema));
  }
  if (node.type === 'td') {
    return createAndFill(node, schema.nodes.table_cell, {}, undefined, wrapInParagraph(schema));
  }
  if (node.type === 'tag' && node.tag) {
    if (node.tag === 'table') {
      return markdocNodeToProseMirrorNode(node.children[0]);
    }
    const children = childrenToProseMirrorNodes(node.children);
    const tagChildren = [schema.nodes.tag_attributes.createChecked(null, parseAnnotations(node)), ...Object.entries(node.slots).map(([slotName, slotContent]) => (console.log(slotContent), schema.nodes.tag_slot.createChecked({
      name: slotName
    }, childrenToProseMirrorNodes([slotContent])))), ...children];
    const pmNode = schema.nodes.tag.createChecked({
      name: node.tag
    }, tagChildren);
    if (!pmNode) {
      error({
        error: {
          id: 'unexpected-children',
          level: 'critical',
          message: `${node.type} has unexpected children`
        },
        lines: node.lines,
        type: node.type,
        location: node.location
      });
    }
    return pmNode;
  }
  if (node.type === 'image') {
    var _node$attributes$titl;
    const fileContents = getState().files.get(node.attributes.src);
    if (fileContents) {
      return schema.nodes.image.createChecked({
        src: `data:application/octet-stream;base64,${jsBase64.fromUint8Array(fileContents)}`,
        alt: node.attributes.alt,
        title: node.attributes.title,
        filename: node.attributes.src
      });
    }
    return schema.schema.text(`![${node.attributes.alt || ''}](${node.attributes.src || ''}${(_node$attributes$titl = node.attributes.title) !== null && _node$attributes$titl !== void 0 && _node$attributes$titl.length ? ` "${node.attributes.title}"` : ''})`);
  }
  error({
    error: {
      id: 'unhandled-type',
      level: 'critical',
      message: `Unhandled type ${node.type}`
    },
    lines: node.lines,
    type: node.type,
    location: node.location
  });
  return null;
}

function markdocClipboard() {
  return new prosemirrorState.Plugin({
    props: {
      // TODO: for a doc like this:
      // <doc>
      //   <blockquote><paragraph>h<anchor/>ell</head>o</paragraph></blockquote>
      // </doc>
      // you shouldn't get the block quote
      clipboardTextSerializer(content, view) {
        try {
          return Markdoc__default["default"].format(proseMirrorToMarkdoc(view.state.doc.type.create({}, content.content), undefined));
        } catch (err) {
          console.log('failed to serialize clipboard text as markdoc', err);
          return content.content.textBetween(0, content.content.size, '\n\n');
        }
      },
      clipboardTextParser(text, $context, plain, view) {
        try {
          return prosemirrorModel.Slice.maxOpen(markdocToProseMirror(Markdoc__default["default"].parse(text), getEditorSchema(view.state.schema), undefined).content);
        } catch (err) {
          console.log('failed to parse clipboard text as markdoc', err);
          return defaultClipboardTextParser(text, $context, plain, view);
        }
      },
      handlePaste(view, event) {
        if (view.props.editable && !view.props.editable(view.state)) {
          return false;
        }
        if (!event.clipboardData) {
          return false;
        }
        const html = event.clipboardData.getData('text/html');
        if (html && isProbablyHtmlFromVscode(html)) {
          const plain = event.clipboardData.getData('text/plain');
          view.pasteText(plain);
          return true;
        }
        return false;
      }
    }
  });
}

// vscode adds extra data to the DataTransfer but those only exist when pasted into a chromium browser
// this works across browser
function isProbablyHtmlFromVscode(html) {
  const parser = new globalThis.DOMParser();
  const parsed = parser.parseFromString(html, 'text/html');
  const firstDiv = parsed.body.firstElementChild;
  if (parsed.body.childElementCount !== 1 || (firstDiv === null || firstDiv === void 0 ? void 0 : firstDiv.tagName) !== 'DIV' || !(firstDiv instanceof HTMLElement) || !firstDiv.style.fontFamily.includes('monospace')) {
    return false;
  }
  for (const line of firstDiv.children) {
    if (line.tagName === 'BR') continue;
    if (line.tagName !== 'DIV') return false;
    for (const span of line.children) {
      if (span.tagName !== 'SPAN') return false;
    }
  }
  return true;
}
function defaultClipboardTextParser(text, $context, plain, view) {
  let marks = $context.marks();
  let {
      schema
    } = view.state,
    serializer = prosemirrorModel.DOMSerializer.fromSchema(schema);
  let dom = document.createElement('div');
  text.split(/(?:\r\n?|\n)+/).forEach(block => {
    let p = dom.appendChild(document.createElement('p'));
    if (block) {
      p.appendChild(serializer.serializeNode(schema.text(block, marks)));
    }
  });
  let parser = view.someProp('clipboardParser') || view.someProp('domParser') || prosemirrorModel.DOMParser.fromSchema(view.state.schema);
  return parser.parseSlice(dom, {
    preserveWhitespace: true,
    context: $context,
    // @ts-expect-error
    ruleFromNode(dom) {
      if (dom.nodeName == 'BR' && !dom.nextSibling && dom.parentNode && !inlineParents.test(dom.parentNode.nodeName)) {
        return {
          ignore: true
        };
      }
      return null;
    }
  });
}
const inlineParents = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;

function nodeInSelectionDecorations() {
  return new prosemirrorState.Plugin({
    props: {
      decorations(state) {
        const decorations = [];
        let from, to;
        if (state.selection instanceof prosemirrorState.TextSelection) {
          ({
            from,
            to
          } = state.selection);
        }
        if (state.selection instanceof prosemirrorState.AllSelection) {
          from = 0;
          to = state.doc.content.size;
        }
        if (from !== undefined && to !== undefined) {
          const _from = from;
          const _to = to;
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.isText) {
              return;
            }
            const nodeFrom = pos;
            const nodeTo = pos + node.nodeSize;
            if (nodeFrom >= _from && nodeTo <= _to) {
              decorations.push(prosemirrorView.Decoration.node(pos, pos + node.nodeSize, {
                class: classes.nodeInSelection
              }));
            }
          });
        }
        return prosemirrorView.DecorationSet.create(state.doc, decorations);
      }
    }
  });
}

function placeholderPlugin(text) {
  return new prosemirrorState.Plugin({
    props: {
      decorations(state) {
        var _doc$firstChild;
        let doc = state.doc;
        if (doc.childCount === 1 && (_doc$firstChild = doc.firstChild) !== null && _doc$firstChild !== void 0 && _doc$firstChild.isTextblock && doc.firstChild.content.size === 0) {
          let placeholder = document.createElement('span');
          placeholder.className = classes.placeholder;
          placeholder.textContent = text;
          return prosemirrorView.DecorationSet.create(doc, [prosemirrorView.Decoration.widget(1, placeholder)]);
        }
      }
    }
  });
}

function createEditorState(doc, selection, storedMarks) {
  const schema = getEditorSchema(doc.type.schema);
  return prosemirrorState.EditorState.create({
    selection,
    storedMarks,
    plugins: [pasteLinks(schema), imageDropPlugin(schema), keydownHandler(), prosemirrorHistory.history(), dropCursor({
      color: style.tokenSchema.color.alias.borderSelected,
      width: 2
    }), inputRules({
      rules: inputRulesForSchema(schema),
      enterRules: enterInputRulesForSchema(schema)
    }), attributes(), gapCursor(), prosemirrorKeymap.keymap(keymapForSchema(schema)), markdocClipboard(), nodeInSelectionDecorations(), placeholderPlugin('Start writing or press "/" for commands…'), reactNodeViews(doc.type.schema), autocompleteDecoration(), prosemirrorTables.tableEditing(), tableCellMenuPlugin(), codeBlockSyntaxHighlighting()],
    doc
  });
}

function getDefaultValue(schema) {
  return createEditorState(schema.nodes.doc.createAndFill());
}
const textDecoder$1 = new TextDecoder();
const textEncoder = new TextEncoder();
function parseToEditorState(content, schema, files) {
  const markdoc = textDecoder$1.decode(content);
  const doc = markdocToProseMirror(Markdoc__default["default"].parse(markdoc), schema, files);
  return createEditorState(doc);
}
function serializeFromEditorState(value) {
  const extraFiles = new Map();
  const markdocNode = proseMirrorToMarkdoc(value.doc, extraFiles);
  const markdoc = Markdoc__default["default"].format(markdocNode);
  return {
    content: textEncoder.encode(Markdoc__default["default"].format(Markdoc__default["default"].parse(markdoc))),
    other: extraFiles
  };
}
function DocumentFieldInput(props) {
  let entryLayoutPane = index.useEntryLayoutSplitPaneContext();
  let fieldProps = {
    label: props.label,
    labelElementType: 'span',
    // the editor element isn't an input, so we need to use a span for the label
    description: props.description
  };
  if (entryLayoutPane === 'main') {
    fieldProps = {
      'aria-label': props.label
      // `aria-description` is still in W3C Editor's Draft for ARIA 1.3.
    };
  }

  return /*#__PURE__*/jsxRuntime.jsx(field.Field, {
    height: entryLayoutPane === 'main' ? '100%' : undefined,
    ...fieldProps,
    children: inputProps => /*#__PURE__*/jsxRuntime.jsx(Editor, {
      ...inputProps,
      value: props.value,
      onChange: props.onChange
    })
  });
}

const textDecoder = new TextDecoder();

/**
 * @deprecated This is experimental and buggy, use at your own risk.
 */
function __experimental_markdoc_field({
  label,
  description,
  config
}) {
  let schema;
  let getSchema = () => {
    if (!schema) {
      schema = createEditorSchema(config);
    }
    return schema;
  };
  return {
    kind: 'form',
    formKind: 'content',
    defaultValue() {
      return getDefaultValue(getSchema());
    },
    Input(props) {
      return /*#__PURE__*/jsxRuntime.jsx(DocumentFieldInput, {
        description: description,
        label: label,
        ...props
      });
    },
    parse: (_, {
      content,
      other
    }) => {
      return parseToEditorState(content, getSchema(), other);
    },
    contentExtension: '.md',
    validate(value) {
      return value;
    },
    serialize(value) {
      return {
        ...serializeFromEditorState(value),
        external: new Map(),
        value: undefined
      };
    },
    reader: {
      parse: (_, {
        content
      }) => {
        const text = textDecoder.decode(content);
        return {
          ast: Markdoc__default["default"].parse(text)
        };
      }
    }
  };
}

exports.__experimental_markdoc_field = __experimental_markdoc_field;