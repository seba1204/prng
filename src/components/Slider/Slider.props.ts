import { ReactNode } from 'react';
type propsTypes = {
    name?: ReactNode;
    handleChange: (value: number) => void;
    value?: number;
    onvalidate?: (e: MouseEvent) => void;
} & typeof defaultProps;

const defaultProps = {
    name: '',
    value: 0,
    onvalidate: (e: MouseEvent) => { }
}

export { propsTypes, defaultProps };
