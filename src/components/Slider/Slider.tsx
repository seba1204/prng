import React from 'react';
import RSlider from 'react-input-slider';
import { defaultProps, propsTypes } from './Slider.props';

import './Slider.css';

const Slider = ({ name, handleChange, value }: propsTypes) => {

    return (
        <div className='Silder'>
            {name && <div className='Slider-name'>{name + " :"}</div>}
            <RSlider
                axis="x"
                x={value}
                onChange={({ x }) => handleChange(x)}
                styles={{
                    active: {
                        backgroundColor: '#8e44ad'
                    }
                }}
                xstep={10}
                xmin={100}
                xmax={100000}
            />
        </div>
    );
};

Slider.defaultProps = defaultProps;

export default Slider;