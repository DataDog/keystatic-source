import { DividerProps, IconProps, HeadingProps, TextProps } from "../../types/dist/keystar-ui-types.cjs.js";
import { ReactNode } from 'react';
export type HTMLTag = keyof JSX.IntrinsicElements & keyof HTMLElementTagNameMap;
export type SlotProps = {
    slot?: string;
};
export type OmitNonPrimitive<P> = Pick<P, {
    [K in keyof P]: P[K] extends boolean | number | string | undefined ? K : never;
}[keyof P]>;
export type ToSlotProps<P> = Partial<P> & {
    elementType?: HTMLTag;
};
export type SlotContextType = {
    divider?: ToSlotProps<DividerProps>;
    icon?: ToSlotProps<IconProps>;
    heading?: ToSlotProps<HeadingProps>;
    text?: ToSlotProps<TextProps>;
    [key: string]: any;
};
export type ProviderProps<P = unknown> = {
    children: ReactNode;
} & P;
export type SlotProviderProps = ProviderProps<{
    slots: SlotContextType;
}>;
