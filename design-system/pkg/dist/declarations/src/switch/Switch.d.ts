import { AriaSwitchProps } from '@react-types/switch';
import { ForwardRefExoticComponent } from 'react';
import { BaseStyleProps } from "../../style/dist/keystar-ui-style.cjs.js";
export type SwitchProps = AriaSwitchProps & BaseStyleProps & {
    /**
     * The prominence of the switch element.
     * @default 'default'
     */
    prominence?: 'low' | 'default';
    /**
     * The size of the switch element.
     * @default 'regular'
     */
    size?: 'small' | 'regular';
};
/**
 * Switches allow users to turn an individual option on or off.
 * They are usually used to activate or deactivate a specific setting.
 */
export declare const Switch: ForwardRefExoticComponent<SwitchProps>;
