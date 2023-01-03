import React from "react";
import "./FnParams.css";
import { defaultProps, propsTypes } from "./FnParams.props";

const FnParams = (props: propsTypes) => {

    const { params } = props;

    const displayParams = () => {
        return params.map((param, index) => {
            switch (param.type) {
                case "number" || "string":
                    return (
                        <div key={index}>
                            <label>{param.name}</label>
                            <input type={param.type} />
                        </div>
                    );
                case "boolean":
                    return (
                        <div key={index}>
                            <label>{param.name}</label>
                            <input type="checkbox" />
                        </div>
                    );
                case "Point":
                    return (
                        <div key={index}>
                            <label>{param.name}: </label>
                            <label>X: </label>
                            <input type="number" />
                            <label>Y: </label>
                            <input type="number" />
                        </div>
                    );
                default:
                    return null;
            }
        });
    };



    return (
        <div className="FnParams">
            {displayParams()}
        </div>
    );
};

FnParams.defaultProps = defaultProps;

export default FnParams;