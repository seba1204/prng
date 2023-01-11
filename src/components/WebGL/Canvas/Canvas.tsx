import React from 'react';
import { RotateCcw } from 'react-feather';
import { PictureButton } from '../../PictureButton';
import './Canvas.css';
import { defaultProps, propsTypes } from './Canvas.props';

const Canvas = (props: propsTypes) => {

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const { onRandomizeClick } = props;

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            props.engine._init(canvas);
        }
    }, []);

    return (
        <div className='Webgl__container'>
            <div className={"canvas-container"}>
                <canvas ref={canvasRef} id={"canvas"} />
            </div>
            <div className="Webgl__updateButton">
                <PictureButton
                    onClick={onRandomizeClick}
                    image={<RotateCcw />}
                    tooltip="Ramdomize"
                />
            </div>
        </div>
    )

}



Canvas.defaultProps = defaultProps;
export default Canvas;