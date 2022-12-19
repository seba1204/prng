import React, { ReactNode } from 'react';

type propsTypes = {
    name?: ReactNode;
    handleChange: (value: number) => void;
    value?: number;
} & typeof defaultProps & React.HTMLAttributes<HTMLDivElement>;

const defaultProps = {
    name: '',
    value: 0,
}

export { propsTypes, defaultProps };
