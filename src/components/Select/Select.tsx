import React from "react";

import RSelect from 'react-select';
import { defaultProps, propsTypes } from "./Select.props";

import './Select.css';

const Select = (props: propsTypes) => {
    const { name, className } = props;
    return (
        <div className={className && className}>
            {name && <div className='Select-name'>{name + " :"}</div>}
            <RSelect
                {...props}
                defaultValue={props.options[0]}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary25: "#2c3e50",
                        neutral0: "rgba(0, 0, 0, 0.428)",
                        primary: "#2980b9",
                        neutral80: "white",
                        neutral90: "white",
                    },
                })}
            />
        </div>
    )
}

Select.defaultProps = defaultProps;
export default Select;