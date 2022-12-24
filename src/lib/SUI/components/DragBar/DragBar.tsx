import React from "react";
import "./DragBar.css";
import { defaultProps, propsTypes } from "./DragBar.props";

const DragBar = (props: propsTypes) => {
    return (
        <div className={`dragbar ${props.className}`}>
        </div>
    );
};

DragBar.defaultProps = defaultProps;

export default DragBar;