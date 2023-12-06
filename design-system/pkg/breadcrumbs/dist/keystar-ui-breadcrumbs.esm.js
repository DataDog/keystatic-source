'use client';
export { Item } from '@react-stately/collections';
import { useBreadcrumbItem, useBreadcrumbs } from '@react-aria/breadcrumbs';
import { mergeProps, useObjectRef, useValueEffect, useResizeObserver, useLayoutEffect } from '@react-aria/utils';
import { isNumber } from 'emery';
import { useRef, useMemo, Fragment, forwardRef, Children, useState, useCallback, isValidElement } from 'react';
import { ActionButton } from '@keystar/ui/button';
import { useProviderProps } from '@keystar/ui/core';
import { Icon } from '@keystar/ui/icon';
import { folderClosedIcon } from '@keystar/ui/icon/icons/folderClosedIcon';
import { folderOpenIcon } from '@keystar/ui/icon/icons/folderOpenIcon';
import { MenuTrigger, Menu } from '@keystar/ui/menu';
import { ClassList, FocusRing, toDataAttributes, classNames, css, tokenSchema, useStyleProps } from '@keystar/ui/style';
import { useLocale } from '@react-aria/i18n';
import { useHover } from '@react-aria/interactions';
import { chevronRightIcon } from '@keystar/ui/icon/icons/chevronRightIcon';
import { chevronLeftIcon } from '@keystar/ui/icon/icons/chevronLeftIcon';
import { jsxs, jsx } from 'react/jsx-runtime';

const breadcrumbsClassList = new ClassList('Breadcrumbs', ['item', 'link', 'list', 'separator']);
function BreadcrumbItem(props) {
  let {
    children,
    isCurrent,
    isDisabled,
    size = 'regular'
  } = props;
  let {
    direction
  } = useLocale();
  let ref = useRef(null);
  let {
    itemProps
  } = useBreadcrumbItem({
    ...props,
    elementType: 'span'
  }, ref);
  let {
    hoverProps,
    isHovered
  } = useHover(props);
  let icon = useMemo(() => {
    return direction === 'rtl' ? chevronLeftIcon : chevronRightIcon;
  }, [direction]);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(FocusRing, {
      children: /*#__PURE__*/jsx("span", {
        ...mergeProps(itemProps, hoverProps),
        ...toDataAttributes({
          size: size !== 'regular' ? size : undefined,
          interaction: isHovered ? 'hover' : undefined
        }),
        ref: ref,
        className: classNames(breadcrumbsClassList.element('link'), css({
          color: tokenSchema.color.foreground.neutral,
          cursor: 'default',
          fontSize: tokenSchema.typography.text.regular.size,
          fontFamily: tokenSchema.typography.fontFamily.base,
          fontWeight: tokenSchema.typography.fontWeight.medium,
          MozOsxFontSmoothing: 'auto',
          WebkitFontSmoothing: 'auto',
          '&[data-size=small]': {
            fontSize: tokenSchema.typography.text.small.size
          },
          '&[data-size=medium]': {
            fontSize: tokenSchema.typography.text.medium.size
          },
          '&[data-size=large]': {
            fontSize: tokenSchema.typography.text.large.size
          },
          '&:not([aria-current=page])': {
            '&:not([aria-disabled=true])': {
              cursor: 'pointer'
            },
            '&[data-interaction=hover]': {
              color: tokenSchema.color.foreground.neutralEmphasis,
              textDecoration: 'underline'
            },
            '&[aria-disabled=true]': {
              color: tokenSchema.color.alias.foregroundDisabled
            }
          },
          '&[aria-current=page]': {
            color: tokenSchema.color.foreground.neutralEmphasis,
            fontWeight: tokenSchema.typography.fontWeight.semibold,
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        }), {
          'is-hovered': isHovered
        }),
        children: children
      })
    }), !isCurrent && /*#__PURE__*/jsx(Icon, {
      src: icon,
      color: isDisabled ? 'color.alias.foregroundDisabled' : 'neutralSecondary',
      marginX: "small",
      UNSAFE_className: breadcrumbsClassList.element('separator')
    })]
  });
}

const MIN_VISIBLE_ITEMS = 1;
const MAX_VISIBLE_ITEMS = 4;
function Breadcrumbs(props, ref) {
  props = useProviderProps(props);
  let {
    children,
    showRoot,
    size = 'regular',
    isDisabled,
    onAction,
    ...otherProps
  } = props;

  // Not using React.Children.toArray because it mutates the key prop.
  let childArray = [];
  Children.forEach(children, child => {
    if ( /*#__PURE__*/isValidElement(child)) {
      childArray.push(child);
    }
  });
  let domRef = useObjectRef(ref);
  let listRef = useRef(null);
  let [menuIsOpen, setMenuOpen] = useState(false);
  let [visibleItems, setVisibleItems] = useValueEffect(childArray.length);
  let {
    navProps
  } = useBreadcrumbs(props);
  let styleProps = useStyleProps(otherProps);
  let updateOverflow = useCallback(() => {
    let computeVisibleItems = visibleItems => {
      let currListRef = listRef.current;
      if (!currListRef) {
        return;
      }
      let listItems = Array.from(currListRef.children);
      let containerWidth = currListRef.offsetWidth;
      let isShowingMenu = childArray.length > visibleItems;
      let calculatedWidth = 0;
      let newVisibleItems = 0;
      let maxVisibleItems = MAX_VISIBLE_ITEMS;
      if (showRoot) {
        let el = listItems.shift();
        if (el) {
          calculatedWidth += el.offsetWidth;
          newVisibleItems++;
        }
      }
      if (isShowingMenu) {
        let el = listItems.shift();
        if (el) {
          calculatedWidth += el.offsetWidth;
          maxVisibleItems--;
        }
      }
      if (showRoot && calculatedWidth >= containerWidth) {
        newVisibleItems--;
      }
      if (listItems.length > 0) {
        // Ensure the last breadcrumb isn't truncated when we measure it.
        let last = listItems.pop();
        if (last) {
          last.style.overflow = 'visible';
          calculatedWidth += last.offsetWidth;
          if (calculatedWidth < containerWidth) {
            newVisibleItems++;
          }
          last.style.overflow = '';
        }
      }
      for (let breadcrumb of listItems.reverse()) {
        calculatedWidth += breadcrumb.offsetWidth;
        if (calculatedWidth < containerWidth) {
          newVisibleItems++;
        }
      }
      return Math.max(MIN_VISIBLE_ITEMS, Math.min(maxVisibleItems, newVisibleItems));
    };
    setVisibleItems(function* () {
      // Update to show all items.
      yield childArray.length;

      // Measure, and update to show the items that fit.
      let newVisibleItems = computeVisibleItems(childArray.length);
      yield newVisibleItems;

      // If the number of items is less than the number of children,
      // then update again to ensure that the menu fits.
      if (isNumber(newVisibleItems) && newVisibleItems < childArray.length && newVisibleItems > 1) {
        yield computeVisibleItems(newVisibleItems);
      }
    });
  }, [childArray.length, setVisibleItems, showRoot]);
  useResizeObserver({
    ref: domRef,
    onResize: updateOverflow
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(updateOverflow, [children]);
  let contents = childArray;
  if (childArray.length > visibleItems) {
    var _selectedItem$key;
    let selectedItem = childArray[childArray.length - 1];
    let selectedKey = (_selectedItem$key = selectedItem.key) !== null && _selectedItem$key !== void 0 ? _selectedItem$key : childArray.length - 1;
    let onMenuAction = key => {
      // Don't fire onAction when clicking on the last item
      if (key !== selectedKey && onAction) {
        onAction(key);
      }
    };
    let menuItem = /*#__PURE__*/jsx(BreadcrumbItem, {
      children: /*#__PURE__*/jsxs(MenuTrigger, {
        onOpenChange: setMenuOpen,
        children: [/*#__PURE__*/jsx(ActionButton, {
          "aria-label": "\u2026",
          prominence: "low",
          isDisabled: isDisabled,
          children: /*#__PURE__*/jsx(Icon, {
            src: menuIsOpen ? folderOpenIcon : folderClosedIcon
          })
        }), /*#__PURE__*/jsx(Menu, {
          selectionMode: "single",
          selectedKeys: [selectedKey],
          onAction: onMenuAction,
          children: childArray
        })]
      })
    }, "menu");
    contents = [menuItem];
    let breadcrumbs = [...childArray];
    let endItems = visibleItems;
    if (showRoot && visibleItems > 1) {
      let el = breadcrumbs.shift();
      if (el) {
        contents.unshift(el);
        endItems--;
      }
    }
    contents.push(...breadcrumbs.slice(-endItems));
  }
  let lastIndex = contents.length - 1;
  let breadcrumbItems = contents.map((child, index) => {
    var _child$key;
    let isCurrent = index === lastIndex;
    let key = (_child$key = child.key) !== null && _child$key !== void 0 ? _child$key : index;
    let onPress = () => {
      if (onAction) {
        onAction(key);
      }
    };
    return /*#__PURE__*/jsx("li", {
      className: classNames(breadcrumbsClassList.element('item'), css({
        alignItems: 'center',
        display: 'inline-flex',
        whiteSpace: 'nowrap',
        '&:last-child': {
          overflow: 'hidden'
        }
      })),
      children: /*#__PURE__*/jsx(BreadcrumbItem, {
        isCurrent: isCurrent,
        isDisabled: isDisabled,
        onPress: onPress,
        size: size,
        children: child.props.children
      }, key)
    }, index);
  });
  return /*#__PURE__*/jsx("nav", {
    ...navProps,
    ...styleProps,
    ref: domRef,
    className: classNames(breadcrumbsClassList.element('root'), styleProps.className),
    children: /*#__PURE__*/jsx("ul", {
      ref: listRef,
      className: classNames(breadcrumbsClassList.element('list'), css({
        display: 'flex',
        height: tokenSchema.size.element.regular,
        justifyContent: 'flex-start'
      })),
      children: breadcrumbItems
    })
  });
}

// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref

/**
 * Breadcrumbs show hierarchy and navigational context for a user's location
 * within an application.
 */
const _Breadcrumbs = /*#__PURE__*/forwardRef(Breadcrumbs);

export { _Breadcrumbs as Breadcrumbs };
