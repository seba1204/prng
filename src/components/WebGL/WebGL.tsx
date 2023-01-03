import React from "react";
import { RefreshCcw } from "react-feather";
import { PictureButton } from "../PictureButton";
import Canvas from "./Canvas";

import { defaultProps, propsTypes } from "./WebGL.props";

import './WebGL.css';

const WebGL = (props: propsTypes) => {
    return (
        <>
            <Canvas engine={props.engine} />
            <PictureButton
                className="button"
                image={<RefreshCcw />}
                enabled={true}
                onClick={props.onClick}
            />
        </>
    )
}

WebGL.defaultProps = defaultProps;

export default WebGL;