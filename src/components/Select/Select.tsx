import React from "react";

import RSelect from 'react-select';
import { defaultProps, propsTypes } from "./Select.props";

import functions from '../../constants';

const Select = ({ handleChange, value, name }: propsTypes) => {

    const optionss = functions.map((func) => {
        return {
            value: func.name,
            label: func.label
        }
    })

    return (
        <div className='Select'>
            {name && <div className='Select-name'>{name + " :"}</div>}
            <RSelect
                options={optionss}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary25: "#2c3e50",
                        neutral0: "black",
                        primary: "#2980b9",
                        neutral80: "white",
                        neutral90: "white",
                    },
                })} />
        </div>
    )
}

Select.defaultProps = defaultProps;
export default Select;