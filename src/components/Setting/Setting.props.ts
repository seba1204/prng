import { ReactNode } from "react";

type propsTypes = {
    name?: string;
    value?: string | number
    children: ReactNode;
} & typeof defaultProps;

const defaultProps = {
    name: '',
}

export { propsTypes, defaultProps };
