import React from 'react';
import RSlider from 'react-input-slider';
import { defaultProps, propsTypes } from './Slider.props';

import './Slider.css';

const Slider = (props: propsTypes) => {
    const { name, handleChange, value, onvalidate } = props
    const handleEnd = onvalidate || defaultProps.onvalidate
    return (
        <div className='Silder'>
            {name && <div className='Slider-name'>{name + " :"}</div>}
            <RSlider
                {...props}
                axis="x"
                x={value}
                onChange={({ x }) => handleChange(x)}
                styles={{
                    active: {
                        backgroundColor: '#18A084',
                    },
                    track: {
                        width: '100%',
                        backgroundColor: "rgba(0, 0, 0, 0.438)",
                    },
                }}
                xstep={100}
                xmin={1000}
                xmax={100000}
                onDragEnd={handleEnd}
            />
        </div>
    );
};

Slider.defaultProps = defaultProps;

export default Slider;