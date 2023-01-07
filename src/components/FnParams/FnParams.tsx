import React from "react";
import { Point } from "../../constants/types";
import "./FnParams.css";
import { shorten } from './FnParams.utils';

import { defaultProps, propsTypes } from "./FnParams.props";

const FnParams = (props: propsTypes) => {

    const { params } = props;

    const displayParams = () => {
        return params.map((param, index) => {
            const label = shorten(param.name)
            // TODO: add a tooltip if label is shortened
            switch (param.type) {
                case "number" || "string":
                    return (
                        <div key={index} className={param.type}>
                            <div className="data">
                                <label>{label}: </label>
                                <input type={param.type} />
                            </div>
                        </div>
                    );
                case "boolean":
                    return (
                        <div key={index} className={param.type}>
                            <div className="data">
                                <label>{label}</label>
                                <input type="checkbox" />
                            </div>
                        </div>
                    );
                case "Point":
                    return (
                        <div key={index} className={param.type}>
                            <label>{label}: </label>
                            <div className="data">
                                <div className="pointValue">
                                    <label>x: </label>
                                    <input type="number" />
                                </div>
                                <div className="pointValue">
                                    <label>y: </label>
                                    <input type="number" />
                                </div>
                                {props.is3D && (
                                    <div className="pointValue">
                                        <label>z: </label>
                                        <input type="number" value={(param.value as Point).x} />
                                    </ div>
                                )}
                            </div>
                        </div>
                    );
                case "Color":
                    return (
                        <div key={index} className={param.type}>
                            <label>{label}</label>
                            <input type="color" />
                        </div>
                    );
                default:
                    return null;
            }
        });
    };



    return (
        <div className="FnParams">
            <h3>Function params: </h3>
            {displayParams()}
        </div>
    );
};

FnParams.defaultProps = defaultProps;

export default FnParams;