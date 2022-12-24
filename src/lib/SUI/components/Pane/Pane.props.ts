import { ReactNode } from 'react';

type propsTypes = {
    id?: string,
    children?: ReactNode,
    className?: string,
    direction?: 'row' | 'column',
} & typeof defaultProps;

const defaultProps = {
}

export { propsTypes, defaultProps };
