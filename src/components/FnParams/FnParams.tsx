import React, { ReactNode } from "react";
import { Param, ParamValue, Point } from "../../constants/types";
import "./FnParams.css";
import { shorten } from './FnParams.utils';

import InputNumber from "../InputNumber";
import { defaultProps, propsTypes } from "./FnParams.props";

const INPUT_TYPE = {
    number: 'number',
    string: 'text',
    boolean: 'checkbox',
    Point: 'point',
    Color: 'color'
}

type onChangeFn = (name: string, value: ParamValue) => void;

const FnParams = (props: propsTypes) => {

    const { params, is3D } = props;


    const displayNumberParam = (param: Param<number>, onChange?: onChangeFn) => {

        const handleChange = (value: number) => {
            if (onChange) {
                onChange(param.name, value);
            } else {
                props.onParamChange(param.name, value)
            }
        }

        return (
            <InputNumber
                value={param.value}
                onNumberChange={v => handleChange(Number(v))}
            />
        )
    };


    const displayPointParam = (param: Param<Point>, is3D: boolean) => {

        const onCoordValueChange = (name: string, value: ParamValue) => {
            if (typeof value !== 'number') return;
            const { x, y, z } = param.value;
            const newPoint = {
                x: name === 'x' ? value : x,
                y: name === 'y' ? value : y,
                z: name === 'z' ? value : z
            }
            props.onParamChange(param.name, newPoint);
        }
        const displayPoint = (point: Point) => {
            const { x, y, z } = point;
            const params = [
                {
                    name: 'x',
                    value: x,
                    type: 'number'
                },
                {
                    name: 'y',
                    value: y,
                    type: 'number'
                }
            ]
            is3D && params.push({
                name: 'z',
                value: z || 0,
                type: 'number'
            })
            return (
                <>
                    {displayParams(params as Param<ParamValue>[], false, onCoordValueChange)}
                </>
            );
        }

        return (
            <div className="point">
                {displayPoint(param.value)}
            </div>
        );

    };

    const isChecked = (param: Param<boolean>): boolean => {
        return param.value;
    }

    const genericDisplay = <T extends ParamValue>(param: Param<T>) => (
        <input
            type={INPUT_TYPE[param.type]}
            value={param.value as unknown as string}
            checked={param.type === 'boolean' && isChecked(param as Param<boolean>)}
            onChange={(e) => props.onParamChange(param.name, e.target.value as unknown as T)}
        />
    )

    const displayLabelWithTooltip = (paramName: string) => {

        const { name, shortened } = shorten(paramName)

        return (
            <label className="label">{name}:
                {shortened && <span className="tooltip">{paramName}</span>}
            </label>
        );
    };


    const displayData = (param: Param<ParamValue>, onChange?: onChangeFn): ReactNode => {
        switch (param.type) {
            case "number":
                return displayNumberParam(param as Param<number>, onChange);
            case "string":
            case "Color":
            case "boolean":
                return <>{genericDisplay(param)}</>;
            case "Point":
                return <>{displayPointParam(param as Param<Point>, is3D)}</>;
            default:
                return <></>;
        }
    }

    const displayParams = (params: Param[], showPoint = false, onChange?: onChangeFn) => {
        // if showPoint is true, display only the Point params
        // else display all other params
        return params
            .filter(({ type }) => showPoint ? type === 'Point' : type !== 'Point')
            .map((param: Param<ParamValue>, index: number) => (
                <div key={index} className="param">
                    {displayLabelWithTooltip(param.name)}
                    {displayData(param, onChange)}
                </div>
            )
            );
    };

    return (
        <div className="FnParams">
            <h3>Function params: </h3>
            <div className="parameters">
                {displayParams(params)}
            </div>
            <div className="parameters">
                {displayParams(params, true)}
            </div>
        </div>
    );
};

FnParams.defaultProps = defaultProps;

export default FnParams;