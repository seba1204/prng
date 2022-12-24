import { ReactNode } from 'react';

type propsTypes = {
    id: string,
    children: ReactNode,
} & typeof defaultProps;

const defaultProps = {}

export { propsTypes, defaultProps };
