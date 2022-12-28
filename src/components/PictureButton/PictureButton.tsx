import React from 'react';

import './PictureButton.css';
import { defaultProps, propsTypes } from './PictureButtonProps';


// define the props and add HTML Button attributes




const PictureButton = (props: propsTypes) => {
    return (
        <div className="PictureButton">
            <button className={`button ${props.enabled && 'enabled'}`} onClick={props.onClick}>
                {props.image}
            </button>
        </div >
    );
};

PictureButton.defaultProps = defaultProps;

export default PictureButton;