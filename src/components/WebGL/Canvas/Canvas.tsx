import React from 'react';
import { defaultProps, propsTypes } from './Canvas.props';

import './Canvas.css';

const Canvas = (props: propsTypes) => {

    const canvasRef = React.useRef<HTMLCanvasElement>(null);


    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            props.engine._init(canvas);
        }
    }, []);

    return (
        <div className={"canvas-container"}>
            <canvas ref={canvasRef} id={"canvas"} />
        </div>
    )

}



Canvas.defaultProps = defaultProps;
export default Canvas;