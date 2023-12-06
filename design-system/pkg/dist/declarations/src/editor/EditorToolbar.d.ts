import { AriaLabelingProps } from '@react-types/shared';
import { Key, PropsWithChildren, ReactNode } from 'react';
import { ToggleButtonProps } from "../../button/dist/keystar-ui-button.cjs.js";
import { BaseStyleProps } from "../../style/dist/keystar-ui-style.cjs.js";
type EditorToolbarProps = PropsWithChildren<BaseStyleProps> & AriaLabelingProps;
export declare function EditorToolbar(props: EditorToolbarProps): import("react").JSX.Element;
export type SelectionMode = 'none' | 'single' | 'multiple';
type ChangeHandler<T> = (value: T) => void;
type EditorToolbarGroupProps = AriaLabelingProps & {
    /** The contents of the group. */
    children?: ReactNode;
} & ({
    selectionMode: 'multiple';
    disabledKeys?: Iterable<Key>;
    onChange: ChangeHandler<Key>;
    value: Key[];
} | {
    selectionMode: 'single';
    disabledKeys?: Iterable<Key>;
    onChange: ChangeHandler<Key>;
    value: Key | null;
} | {
    selectionMode?: 'none';
    disabledKeys?: never;
    onChange?: never;
    value?: never;
});
export declare function EditorToolbarGroup(props: EditorToolbarGroupProps): import("react").JSX.Element;
type EditorToolbarItemProps = {
    /** The contents of the item. */
    children?: ReactNode;
    /** The value of the item. */
    value: Key;
} & AriaLabelingProps;
/** A toolbar item may be a checkbox/radio/toggle button, depending on context. */
export declare function EditorToolbarItem(props: EditorToolbarItemProps): import("react").JSX.Element;
type EditorToolbarButtonProps = Omit<ToggleButtonProps, 'prominence'>;
export declare function EditorToolbarButton(props: EditorToolbarButtonProps): import("react").JSX.Element;
export declare function EditorToolbarSeparator(): import("react").JSX.Element;
export {};
