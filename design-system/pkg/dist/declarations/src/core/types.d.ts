import { DOMProps } from '@react-types/shared';
import { ReactNode } from 'react';
import { RootStyleProps, VoussoirTheme } from "../../style/dist/keystar-ui-style.cjs.js";
import { ColorScheme, Emphasis, ScaleScheme } from "../../types/dist/keystar-ui-types.cjs.js";
type VoussoirContextProps = {
    /** Whether descendants should be displayed with the emphasized style. */
    emphasis?: Emphasis;
    /** Whether descendants should be disabled. */
    isDisabled?: boolean;
    /** Whether descendants should be displayed with the required style. */
    isRequired?: boolean;
    /** Whether descendants should be read only. */
    isReadOnly?: boolean;
};
type Router = {
    navigate: (path: string) => void;
};
export type KeystarProviderProps = {
    /** The content of the Provider. */
    children: ReactNode;
    /**
     * The color scheme for your application. Defaults to operating system preferences.
     * @default 'auto'
     */
    colorScheme?: ColorScheme;
    /**
     * Sets the scale for your applications. Defaults based on device pointer type.
     */
    scale?: ScaleScheme;
    /**
     * The locale for your application as a [BCP 47](https://www.ietf.org/rfc/bcp/bcp47.txt) language code.
     * Defaults to the browser/OS language setting.
     * @default 'en-US'
     */
    locale?: string;
    /**
     * The background color of the body element. This will only have an effect if the `KeystarProvider` is rendered as the `html` element.
     */
    bodyBackground?: keyof VoussoirTheme['color']['background'];
    /**
     * Provide a client side router to all nested Keystar links to enable client
     * side navigation.
     */
    router?: Router;
} & VoussoirContextProps & DOMProps & RootStyleProps;
export type KeystarProviderContext = {
    /**
     * The package version number of the nearest parent Provider.
     */
    version: string;
    /**
     * The theme of the nearest parent Provider.
     */
    /**
     * The color scheme of the nearest parent Provider.
     */
    colorScheme: ColorScheme;
    /**
     * The scale of the nearest parent Provider.
     */
    scale: ScaleScheme;
} & VoussoirContextProps;
export {};
