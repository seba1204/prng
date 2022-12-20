import { ReactNode } from 'react';
type propsTypes = {
    name?: ReactNode;
    onChange: (value: number) => void;
    onEnd?: () => void,
    value?: number;
} & typeof defaultProps;

const defaultProps = {
    name: '',
    value: 0,
    onEnd: () => { }
}

export { propsTypes, defaultProps };
