import React from "react";
import { Point } from "../../constants/types";
import "./FnParams.css";
import { shorten } from './FnParams.utils';

import { defaultProps, propsTypes } from "./FnParams.props";

const FnParams = (props: propsTypes) => {

    const { params } = props;

    const displayNumber = (param: any) => {
        // return a label with a tooltip and a number input
        return (
            <div className="data">
                <label>{param.name}: </label>
                <input type="number" />
            </div>

        );
    };

    const displayParams = () => {
        return params.map((param, index) => {
            const { name, shortened } = shorten(param.name)
            // TODO: add a tooltip if label is shortened
            switch (param.type) {
                case "number" || "string":
                    return (
                        <div key={index} className={param.type}>
                            <div className="data">
                                <label className="tooltip">{name}:
                                    {shortened &&
                                        <span className="tooltiptext">{param.name}</span>
                                    }
                                </label>
                                <input type={param.type} />
                            </div>
                        </div>
                    );
                case "boolean":
                    return (
                        <div key={index} className={param.type}>
                            <div className="data">
                                <label>{name}</label>
                                <input type="checkbox" />
                            </div>
                        </div>
                    );
                case "Point":
                    return (
                        <div key={index} className={param.type}>
                            <label>{name}: </label>
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
                            <label>{name}</label>
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