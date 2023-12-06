import { DateValue } from '@react-types/calendar';
import { ForwardedRef, ReactElement } from 'react';
import { RangeCalendarProps } from "./types.js";
/**
 * RangeCalendars display a grid of days in one or more months and allow users
 * to select a contiguous range of dates.
 */
declare const _RangeCalendar: <T extends DateValue>(props: RangeCalendarProps<T> & {
    ref?: ForwardedRef<HTMLDivElement> | undefined;
}) => ReactElement;
export { _RangeCalendar as RangeCalendar };