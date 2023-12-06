import { AriaBreadcrumbsProps, BreadcrumbItemProps as ReactBreadcrumbItemProps } from '@react-types/breadcrumbs';
import { ItemProps } from '@react-types/shared';
import { Key, ReactElement } from 'react';
import { BaseStyleProps } from "../../style/dist/keystar-ui-style.cjs.js";
import { TextProps } from "../../typography/dist/keystar-ui-typography.cjs.js";
type BreadcrumbSize = NonNullable<TextProps['size']>;
export type BreadcrumbsProps<T> = AriaBreadcrumbsProps & BaseStyleProps & {
    /** The breadcrumb items. */
    children: ReactElement<ItemProps<T>> | ReactElement<ItemProps<T>>[];
    /** Whether the Breadcrumbs are disabled. */
    isDisabled?: boolean;
    /** Called when an item is acted upon (usually selection via press). */
    onAction?: (key: Key) => void;
    /** Whether to always show the root item if the items are collapsed. */
    showRoot?: boolean;
    /**
     * Size of the Breadcrumbs including spacing and layout.
     * @default 'regular'
     */
    size?: BreadcrumbSize;
};
export type BreadcrumbItemProps = ReactBreadcrumbItemProps & {
    size?: BreadcrumbSize;
};
export {};
