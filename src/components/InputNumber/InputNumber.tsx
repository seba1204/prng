import React from "react";
import { defaultProps, propsTypes } from './InputNumber.props';

import './InputNumber.css';

const InputNumber = (props: propsTypes) => {
    const { onNumberChange, ...otherProps } = props;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // check if value is a number
        if (isNaN(Number(e.target.value))) {
            return;
        }
        onNumberChange(Number(e.target.value));
    }
    return (
        <input {...otherProps} type="number" onChange={handleChange} />
    )
}

InputNumber.defaultProps = defaultProps;
export default InputNumber;