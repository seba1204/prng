import { ReactElement, ReactNode } from "react";

type propsTypes = {
    children: ReactNode,
    desktopLayout: ReactElement,
    mobileLayout: ReactElement,
} & typeof defaultProps;

const defaultProps = {}

export { propsTypes, defaultProps };
