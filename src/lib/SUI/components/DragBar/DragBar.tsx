import React from "react";
import "./DragBar.css";
import { defaultProps, propsTypes } from "./DragBar.props";

const DragBar = (props: propsTypes) => {
    let className = `dragbar ${props.direction}`;
    props.className && (className += ` ${props.className}`);
    return (
        <div {...props} className={className} >
        </div>
    );
};

DragBar.defaultProps = defaultProps;

export default DragBar;