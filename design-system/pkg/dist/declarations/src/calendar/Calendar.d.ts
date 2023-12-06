import { DateValue } from '@react-types/calendar';
import { ForwardedRef, ReactElement } from 'react';
import { CalendarProps } from "./types.js";
/**
 * Calendars display a grid of days in one or more months and allow users to
 * select a single date.
 */
declare const _Calendar: <T extends DateValue>(props: CalendarProps<T> & {
    ref?: ForwardedRef<HTMLDivElement> | undefined;
}) => ReactElement;
export { _Calendar as Calendar };
