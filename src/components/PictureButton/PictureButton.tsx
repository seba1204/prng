import React from 'react';

import './PictureButton.css';
import { defaultProps, propsTypes } from './PictureButtonProps';


// define the props and add HTML Button attributes




const PictureButton = (props: propsTypes) => {
    const { tooltip } = props
    const displayTooltip = () => {
        if (tooltip) {
            return (
                <span className="PictureButton__tooltiptext">
                    {tooltip}
                </span>
            )
        } else {
            return <></>
        }
    }
    return (
        <div className="PictureButton__container">
            {displayTooltip()}
            <div className={`PictureButton__button ${props.enabled && 'enabled'}`} onClick={props.onClick}>
                {props.image}
            </div>
        </div >
    );
};

PictureButton.defaultProps = defaultProps;

export default PictureButton;