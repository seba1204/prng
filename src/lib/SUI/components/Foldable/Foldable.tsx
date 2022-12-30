import React from "react";
import { ChevronDown, ChevronUp } from 'react-feather';
import "./Foldable.css";
import { defaultProps, propsTypes } from "./Foldable.props";

const Foldable = (props: propsTypes) => {

    const [isFolded, setIsFolded] = React.useState(false);

    let className = 'foldable';
    props.className && (className += ` ${props.className}`);

    const onClick = () => setIsFolded(!isFolded)

    const getImage = () => (isFolded ?
        <ChevronDown /> :
        <ChevronUp />)

    return (
        <div {...props} className="foldable__container" >
            <div className="foldable__header" onClick={onClick}>
                <h2>{props.title}</h2>
                {getImage()}
            </div>

            <div
                className={className}
                style={{ display: isFolded ? 'none' : 'block' }}
            >
                {props.children}
            </div>
        </div>
    );
};

Foldable.defaultProps = defaultProps;

export default Foldable;