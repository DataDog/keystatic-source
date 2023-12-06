import { ReactNode } from 'react';
import { BaseStyleProps, FontSizeText } from "../../style/dist/keystar-ui-style.cjs.js";
export type ProseProps = {
    /** The content to render. */
    children?: ReactNode;
    /**
     * The size of body text.
     * @default 'medium'
     */
    size?: FontSizeText;
} & BaseStyleProps;
/** A typographic component that adds styles for rendering remote HTML content. */
export declare const Prose: import("../../utils/ts/dist/keystar-ui-utils-ts.cjs.js").CompWithAsProp<ProseProps, "div">;
export declare function useProseStyleProps(props: ProseProps): {
    className: string;
    style?: import("react").CSSProperties | undefined;
};