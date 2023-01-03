import React from "react";
import "./VirtualItem.css";
import { propsTypes } from "./VirtualItem.props";

const VirtualItem = (props: propsTypes) => {
    return (<>{props.children}</>);
};

// VirtualItem.defaultProps = defaultProps;

export default VirtualItem;