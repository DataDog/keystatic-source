import { ClassList } from "../../../style/dist/keystar-ui-style.cjs.js";
import { PartialRequired, TextProps } from "../../../types/dist/keystar-ui-types.cjs.js";
export declare const textClassList: ClassList<(string & {}) | "root">;
export declare function useTextStyles(props: PartialRequired<TextProps, 'color' | 'size' | 'weight'>): Pick<import("react").HTMLAttributes<HTMLElement>, "style" | "className">;
export declare const textOptimizationStyles: {
    readonly MozOsxFontSmoothing: "auto";
    readonly WebkitFontSmoothing: "auto";
};