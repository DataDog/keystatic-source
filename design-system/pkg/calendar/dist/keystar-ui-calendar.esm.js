'use client';
import { isSameMonth, isSameDay, getDayOfWeek, isToday, endOfMonth, getWeeksInMonth, createCalendar } from '@internationalized/date';
import { useCalendarCell, useCalendarGrid, useCalendar, useRangeCalendar } from '@react-aria/calendar';
import { useLocale, useDateFormatter } from '@react-aria/i18n';
import { mergeProps, useObjectRef } from '@react-aria/utils';
import { useCalendarState, useRangeCalendarState } from '@react-stately/calendar';
import { useRef, createElement, forwardRef, useMemo, useImperativeHandle } from 'react';
import { useProviderProps } from '@keystar/ui/core';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { ActionButton } from '@keystar/ui/button';
import { Icon } from '@keystar/ui/icon';
import { chevronLeftIcon } from '@keystar/ui/icon/icons/chevronLeftIcon';
import { chevronRightIcon } from '@keystar/ui/icon/icons/chevronRightIcon';
import { tokenSchema, toDataAttributes, css, useStyleProps, classNames } from '@keystar/ui/style';
import { Text, Heading } from '@keystar/ui/typography';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { jsx, jsxs } from 'react/jsx-runtime';

function CalendarCell({
  currentMonth,
  state,
  ...props
}) {
  let ref = useRef(null);
  let {
    buttonProps,
    cellProps,
    formattedDate,
    isDisabled,
    isFocused,
    isInvalid,
    isPressed,
    isSelected
  } = useCalendarCell({
    ...props,
    isDisabled: !isSameMonth(props.date, currentMonth)
  }, state, ref);
  let isUnavailable = state.isCellUnavailable(props.date) && !isDisabled;
  let isLastSelectedBeforeDisabled = !isDisabled && !isInvalid && state.isCellUnavailable(props.date.add({
    days: 1
  }));
  let isFirstSelectedAfterDisabled = !isDisabled && !isInvalid && state.isCellUnavailable(props.date.subtract({
    days: 1
  }));
  let highlightedRange = 'highlightedRange' in state && state.highlightedRange;
  let isSelectionStart = isSelected && highlightedRange && isSameDay(props.date, highlightedRange.start);
  let isSelectionEnd = isSelected && highlightedRange && isSameDay(props.date, highlightedRange.end);
  let {
    locale
  } = useLocale();
  let dayOfWeek = getDayOfWeek(props.date, locale);
  let isRangeStart = isSelected && (isFirstSelectedAfterDisabled || dayOfWeek === 0 || props.date.day === 1);
  let isRangeEnd = isSelected && (isLastSelectedBeforeDisabled || dayOfWeek === 6 || props.date.day === currentMonth.calendar.getDaysInMonth(currentMonth));
  let {
    focusProps,
    isFocusVisible
  } = useFocusRing();
  let {
    hoverProps,
    isHovered
  } = useHover({
    isDisabled: isDisabled || isUnavailable || state.isReadOnly
  });
  let dayState = {
    // Style disabled (i.e. out of min/max range), but selected dates as unavailable
    // since it is more clear than trying to dim the selection.
    isDisabled: isDisabled && !isInvalid,
    isFocused: isFocused && isFocusVisible,
    isHovered: isHovered,
    isInvalid: isInvalid,
    isOutsideMonth: !isSameMonth(props.date, currentMonth),
    isPressed: isPressed && !state.isReadOnly,
    isRangeEnd: isRangeEnd,
    isRangeSelection: isSelected && 'highlightedRange' in state,
    isRangeStart: isRangeStart,
    isSelected: isSelected,
    isSelectionEnd: isSelectionEnd,
    isSelectionStart: isSelectionStart,
    isToday: isToday(props.date, state.timeZone),
    isUnavailable: isUnavailable || isInvalid && isDisabled
  };
  let cellStyleProps = useCellStyles(dayState);
  let dayStyleProps = useDayStyles(dayState);
  return /*#__PURE__*/jsx("td", {
    ...cellStyleProps,
    ...cellProps,
    children: /*#__PURE__*/jsx("span", {
      ref: ref,
      ...mergeProps(buttonProps, hoverProps, focusProps),
      ...dayStyleProps,
      children: /*#__PURE__*/jsx(Text, {
        align: "center",
        color: "inherit",
        trim: false,
        weight: "inherit",
        children: formattedDate
      })
    })
  });
}
function useCellStyles(props = {}) {
  let cellSize = `var(--calendar-cell-width, ${tokenSchema.size.element.regular})`;
  let cellPadding = `var(--calendar-cell-padding, ${tokenSchema.size.space.xsmall})`;
  return {
    ...toDataAttributes(props, {
      omitFalsyValues: true,
      trimBooleanKeys: true
    }),
    className: css({
      height: cellSize,
      padding: cellPadding,
      position: 'relative',
      textAlign: 'center',
      width: cellSize,
      '&[data-range-selection]:not([data-outside-month])': {
        backgroundColor: tokenSchema.color.alias.backgroundSelected,
        '&[data-invalid]': {
          backgroundColor: tokenSchema.color.background.critical,
          color: tokenSchema.color.foreground.critical
        }
      },
      '&[data-selection-start], &[data-range-start]': {
        borderStartStartRadius: tokenSchema.size.radius.full,
        borderEndStartRadius: tokenSchema.size.radius.full
      },
      '&[data-selection-end], &[data-range-end]': {
        borderStartEndRadius: tokenSchema.size.radius.full,
        borderEndEndRadius: tokenSchema.size.radius.full
      }
    })
  };
}
function useDayStyles(props) {
  let className = css({
    alignItems: 'center',
    borderRadius: tokenSchema.size.radius.full,
    color: tokenSchema.color.foreground.neutral,
    cursor: 'default',
    display: 'flex',
    inset: tokenSchema.size.space.xsmall,
    justifyContent: 'center',
    outline: 0,
    position: 'absolute',
    // Date specific
    // -------------------------------------------------------------------------

    // hide dates from other months
    '&[data-outside-month]': {
      visibility: 'hidden'
    },
    // today — indicated by a small underline beneath the date
    '&[data-today]': {
      color: tokenSchema.color.foreground.accent,
      fontWeight: tokenSchema.typography.fontWeight.semibold,
      '&:not([data-unavailable])::before': {
        backgroundColor: 'currentColor',
        borderRadius: tokenSchema.size.radius.full,
        content: '""',
        height: tokenSchema.size.border.medium,
        marginInline: 'auto',
        position: 'absolute',
        top: `calc(50% + 1ch)`,
        width: '2ch'
      }
    },
    // unavailable — indicated by an angled strike-through over the date
    '&[data-unavailable]:not([data-selected])': {
      '::before': {
        backgroundColor: 'currentColor',
        borderRadius: tokenSchema.size.radius.full,
        content: '""',
        height: tokenSchema.size.border.medium,
        marginInline: 'auto',
        position: 'absolute',
        top: '50%',
        insetInline: tokenSchema.size.space.small,
        transform: 'rotate(-16deg)'
      }
    },
    // Interaction states
    // -------------------------------------------------------------------------

    '&[data-hovered]': {
      backgroundColor: tokenSchema.color.alias.backgroundHovered,
      color: tokenSchema.color.alias.foregroundHovered
    },
    '&[data-pressed]': {
      backgroundColor: tokenSchema.color.alias.backgroundPressed
    },
    '&[data-focused]': {
      outline: `${tokenSchema.size.alias.focusRing} solid ${tokenSchema.color.alias.focusRing}`,
      outlineOffset: tokenSchema.size.alias.focusRingGap
    },
    // Selection states
    // -------------------------------------------------------------------------

    '&[data-disabled]': {
      color: tokenSchema.color.alias.foregroundDisabled
    },
    '&[data-selected]:not([data-range-selection], [data-disabled]), &[data-selection-start], &[data-selection-end]': {
      backgroundColor: tokenSchema.color.background.accentEmphasis,
      color: tokenSchema.color.foreground.onEmphasis,
      '&[data-invalid]': {
        backgroundColor: tokenSchema.color.background.criticalEmphasis
      }
    },
    '&[data-range-selection]:not([data-selection-start], [data-selection-end])': {
      color: tokenSchema.color.foreground.accent,
      '&[data-hovered]': {
        backgroundColor: tokenSchema.color.alias.backgroundSelectedHovered
      },
      '&[data-invalid]': {
        color: tokenSchema.color.foreground.critical
      }
    }
  });
  return {
    ...toDataAttributes(props, {
      omitFalsyValues: true,
      trimBooleanKeys: true
    }),
    className
  };
}

function CalendarMonth(props) {
  let {
    state,
    startDate
  } = props;
  let {
    gridProps,
    headerProps,
    weekDays
  } = useCalendarGrid({
    ...props,
    endDate: endOfMonth(startDate)
  }, state);
  let {
    locale
  } = useLocale();
  let weeksInMonth = getWeeksInMonth(startDate, locale);
  let cellStyleProps = useCellStyles();
  return /*#__PURE__*/jsxs("table", {
    className: css({
      borderCollapse: 'collapse',
      borderSpacing: 0,
      tableLayout: 'fixed',
      userSelect: 'none',
      width: 'var(--calendar-width)'
    }),
    ...gridProps,
    children: [/*#__PURE__*/jsx("thead", {
      ...headerProps,
      children: /*#__PURE__*/jsx("tr", {
        children: weekDays.map((day, index) => /*#__PURE__*/jsx("th", {
          ...cellStyleProps,
          children: /*#__PURE__*/jsx(Text, {
            align: "center",
            color: "neutralTertiary",
            size: "small",
            children: day
          })
        }, index))
      })
    }), /*#__PURE__*/jsx("tbody", {
      children: [...new Array(weeksInMonth).keys()].map(weekIndex => /*#__PURE__*/jsx("tr", {
        children: state.getDatesInWeek(weekIndex, startDate).map((date, i) => date ? /*#__PURE__*/jsx(CalendarCell, {
          state: state,
          date: date,
          currentMonth: startDate
        }, i) : /*#__PURE__*/jsx("td", {}, i))
      }, weekIndex))
    })]
  });
}

function CalendarBase(props) {
  let {
    state,
    calendarProps,
    nextButtonProps,
    prevButtonProps,
    calendarRef: ref,
    visibleMonths = 1
  } = props;
  let styleProps = useCalendarStyles(props);
  let {
    direction
  } = useLocale();
  let currentMonth = state.visibleRange.start;
  let monthDateFormatter = useDateFormatter({
    month: 'long',
    year: 'numeric',
    era: currentMonth.calendar.identifier === 'gregory' && currentMonth.era === 'BC' ? 'short' : undefined,
    calendar: currentMonth.calendar.identifier,
    timeZone: state.timeZone
  });
  let titles = [];
  let calendars = [];
  for (let i = 0; i < visibleMonths; i++) {
    let d = currentMonth.add({
      months: i
    });
    titles.push( /*#__PURE__*/jsxs("div", {
      ...styleProps.monthHeader,
      children: [i === 0 && /*#__PURE__*/jsx(ActionButton, {
        ...prevButtonProps,
        prominence: "low",
        gridArea: "prev",
        justifySelf: "start",
        UNSAFE_style: {
          padding: 0
        },
        children: /*#__PURE__*/jsx(Icon, {
          src: direction === 'rtl' ? chevronRightIcon : chevronLeftIcon,
          size: "medium"
        })
      }), /*#__PURE__*/jsx(Heading, {
        gridArea: "title",
        elementType: "h2",
        size: "small",
        align: "center"
        // We have a visually hidden heading describing the entire visible range,
        // and the calendar itself describes the individual month
        // so we don't need to repeat that here for screen reader users.
        ,
        "aria-hidden": true,
        children: monthDateFormatter.format(d.toDate(state.timeZone))
      }), i === visibleMonths - 1 && /*#__PURE__*/jsx(ActionButton, {
        ...nextButtonProps,
        prominence: "low",
        gridArea: "next",
        justifySelf: "end",
        UNSAFE_style: {
          padding: 0
        },
        children: /*#__PURE__*/jsx(Icon, {
          src: direction === 'rtl' ? chevronLeftIcon : chevronRightIcon,
          size: "medium"
        })
      })]
    }, i));
    calendars.push( /*#__PURE__*/createElement(CalendarMonth, {
      ...props,
      key: i,
      state: state,
      startDate: d
    }));
  }
  return /*#__PURE__*/jsxs("div", {
    ...styleProps.root,
    ...calendarProps,
    ref: ref,
    children: [/*#__PURE__*/jsx(VisuallyHidden, {
      elementType: "h2",
      children: calendarProps['aria-label']
    }), /*#__PURE__*/jsx("div", {
      ...styleProps.titles,
      children: titles
    }), /*#__PURE__*/jsx("div", {
      ...styleProps.calendars,
      children: calendars
    }), /*#__PURE__*/jsx(VisuallyHidden, {
      children: /*#__PURE__*/jsx("button", {
        "aria-label": nextButtonProps['aria-label'],
        disabled: nextButtonProps.isDisabled,
        onClick: () => state.focusNextPage(),
        tabIndex: -1
      })
    })]
  });
}
function useCalendarStyles(props) {
  let styleProps = useStyleProps(props);
  let root = {
    ...styleProps,
    className: classNames(css({
      boxSizing: 'border-box',
      maxWidth: '100%',
      overflow: 'auto',
      // make space for the focus ring, so it doesn't get cropped
      padding: `calc(${tokenSchema.size.alias.focusRing} + ${tokenSchema.size.alias.focusRingGap})`,
      '--calendar-cell-width': tokenSchema.size.element.regular,
      '--calendar-cell-padding': tokenSchema.size.space.xsmall,
      '--calendar-width': 'calc(var(--calendar-cell-width) * 7 + var(--calendar-cell-padding) * 12)'
    }), styleProps.className)
  };
  let titles = {
    className: css({
      boxSizing: 'border-box',
      display: 'grid',
      gap: tokenSchema.size.space.large,
      gridAutoColumns: '1fr',
      gridAutoFlow: 'column',
      paddingInline: 'var(--calendar-cell-padding)',
      width: '100%'
    })
  };
  let calendars = {
    className: css({
      display: 'grid',
      gridAutoColumns: '1fr',
      gridAutoFlow: 'column',
      alignItems: 'start',
      gap: tokenSchema.size.space.large
    })
  };
  let monthHeader = {
    className: css({
      alignItems: 'center',
      display: 'grid',
      gridTemplateAreas: `"prev title next"`,
      gridTemplateColumns: 'minmax(auto, 1fr) auto minmax(auto, 1fr)',
      width: 'var(--calendar-width)'
    })
  };
  return {
    calendars,
    monthHeader,
    root,
    titles
  };
}

function Calendar(props, forwardedRef) {
  props = useProviderProps(props);
  let {
    visibleMonths = 1
  } = props;
  visibleMonths = Math.max(visibleMonths, 1);
  let visibleDuration = useMemo(() => ({
    months: visibleMonths
  }), [visibleMonths]);
  let {
    locale
  } = useLocale();
  let state = useCalendarState({
    ...props,
    locale,
    visibleDuration,
    createCalendar
  });
  let domRef = useObjectRef(forwardedRef);
  useImperativeHandle(forwardedRef, () => ({
    ...domRef.current,
    focus() {
      state.setFocused(true);
    }
  }));
  let {
    calendarProps,
    prevButtonProps,
    nextButtonProps
  } = useCalendar(props, state);
  return /*#__PURE__*/jsx(CalendarBase, {
    ...props,
    visibleMonths: visibleMonths,
    state: state,
    calendarRef: domRef,
    calendarProps: calendarProps,
    prevButtonProps: prevButtonProps,
    nextButtonProps: nextButtonProps
  });
}

/**
 * Calendars display a grid of days in one or more months and allow users to
 * select a single date.
 */
const _Calendar = /*#__PURE__*/forwardRef(Calendar);

function RangeCalendar(props, forwardedRef) {
  props = useProviderProps(props);
  let {
    visibleMonths = 1
  } = props;
  visibleMonths = Math.max(visibleMonths, 1);
  let visibleDuration = useMemo(() => ({
    months: visibleMonths
  }), [visibleMonths]);
  let {
    locale
  } = useLocale();
  let state = useRangeCalendarState({
    ...props,
    locale,
    visibleDuration,
    createCalendar
  });
  let domRef = useObjectRef(forwardedRef);
  useImperativeHandle(forwardedRef, () => ({
    ...domRef.current,
    focus() {
      state.setFocused(true);
    }
  }));
  let {
    calendarProps,
    prevButtonProps,
    nextButtonProps
  } = useRangeCalendar(props, state, domRef);
  return /*#__PURE__*/jsx(CalendarBase, {
    ...props,
    visibleMonths: visibleMonths,
    state: state,
    calendarRef: domRef,
    calendarProps: calendarProps,
    prevButtonProps: prevButtonProps,
    nextButtonProps: nextButtonProps
  });
}

/**
 * RangeCalendars display a grid of days in one or more months and allow users
 * to select a contiguous range of dates.
 */
const _RangeCalendar = /*#__PURE__*/forwardRef(RangeCalendar);

export { _Calendar as Calendar, _RangeCalendar as RangeCalendar };