import React from "react";

import { defaultProps, propsTypes } from "./Setting.props";

import './Setting.css';

const Setting = (props: propsTypes) => {
    const { name, value } = props;
    return (
        <div className={`setting`}>
            {name && <div className='setting-name'>{name + " :"}</div>}
            {props.children}
            {value && <div className='setting-value'>{`(${value})`}</div>}
        </div>
    )
}

Setting.defaultProps = defaultProps;
export default Setting;