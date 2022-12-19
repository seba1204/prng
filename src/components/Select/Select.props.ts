import React from 'react';

type propsTypes = {
    handleChange?: (value: number) => void;
    name?: string;
    value?: number;
} & typeof defaultProps & React.HTMLAttributes<HTMLDivElement>;

const defaultProps = {
    name: '',
    value: 0,
    handleChange: () => { },
}

export { propsTypes, defaultProps };
