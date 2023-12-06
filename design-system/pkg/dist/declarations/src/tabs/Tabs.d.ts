import React, { ReactElement, RefObject } from 'react';
import { ClassList } from "../../style/dist/keystar-ui-style.cjs.js";
import { TabsProps, TabListProps, TabPanelsProps } from "./types.js";
export declare const tabsClassList: ClassList<"list" | "tab" | "collapseWrapper" | "indicator" | "panel" | "picker" | "tab-icon" | "tab-label">;
/**
 * A TabList is used within Tabs to group tabs that a user can switch between.
 * The keys of the items within the <TabList> must match up with a corresponding
 * item inside the <TabPanels>.
 */
export declare function TabList<T extends object>(props: TabListProps<T>): React.JSX.Element;
/**
 * TabPanels is used within Tabs as a container for the content of each tab.
 * The keys of the items within the <TabPanels> must match up with a corresponding item inside the <TabList>.
 */
export declare function TabPanels<T>(props: TabPanelsProps<T>): React.JSX.Element;
/**
 * Tabs organise related content into multiple sections. They allow the user to
 * navigate between groups of information that appear within the same context.
 */
declare const _Tabs: <T>(props: TabsProps<T> & {
    ref?: RefObject<HTMLDivElement>;
}) => ReactElement;
export { _Tabs as Tabs };