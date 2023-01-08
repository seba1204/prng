import React, { ReactNode } from "react";
import { Param, ParamValue, Point } from "../../constants/types";
import "./FnParams.css";
import { shorten } from './FnParams.utils';

import { defaultProps, propsTypes } from "./FnParams.props";

const INPUT_TYPE = {
    number: 'number',
    string: 'text',
    boolean: 'checkbox',
    point: 'point',
    color: 'color'

}

const FnParams = (props: propsTypes) => {

    const { params } = props;


    const displayNumberParam = (param: Param<number>, onChange?: (name: string, value: number) => void) => {

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            // check if value is a number
            if (isNaN(Number(e.target.value))) {
                return;
            }

            // if onChange is defined, use it, else use the default onParamChange
            if (onChange) {
                onChange(param.name, Number(e.target.value));
            } else {
                props.onParamChange(param.name, Number(e.target.value));
            }
        }


        return (
            <input
                type="number"
                value={param.value}
                onChange={handleChange}
            />
        );
    };

    const displayStringParam = (param: Param<string>) => {

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            props.onParamChange(param.name, e.target.value);
        }


        return (
            <input
                type="text"
                value={param.value}
                onChange={handleChange}
            />
        );
    };


    const displayBooleanParam = (param: Param<boolean>) => {

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            props.onParamChange(param.name, e.target.checked);
        }

        return (
            <input
                type="checkbox"
                checked={param.value}
                onChange={handleChange}
            />
        );

    };

    const displayPointParam = (param: Param<Point>, is3D: boolean) => {

        const handleChange = (coordName: string, value: number) => {
            const newPoint = { ...param.value };
            newPoint[coordName as keyof Point] = value;
            props.onParamChange(param.name, newPoint);
        }

        const displayPoint = (point: Point) => {
            const { x, y, z } = point;
            return (
                <>
                    {displayNumberParam({
                        name: 'x',
                        value: x,
                        type: 'number'
                    }, handleChange)}
                    {displayNumberParam({
                        name: 'y',
                        value: y,
                        type: 'number'
                    }, handleChange)}
                    {is3D && displayNumberParam({
                        name: 'z',
                        value: z || 0,
                        type: 'number'
                    }, handleChange)}

                </>
            );
        }

        return (
            <div className="point">
                {displayPoint(param.value)}
            </div>
        );

    };

    // generic function with T type
    const genericDisplay = <T extends number | string | boolean>(param: Param<T>) => {
        return (
            <input
                type={ }
                value={param.value}
                onChange={(e) => props.onParamChange(param.name, e.target.value as unknown as T)}
            />

        );
    }



    const displayLabelWithTooltip = (paramName: string) => {

        const { name, shortened } = shorten(paramName)

        return (
            <label>{name}:
                {shortened && <span className="tooltip">{paramName}</span>}
            </label>

        );
    };


    const displayData = (param: Param<ParamValue>): ReactNode => {


        let p;
        switch (param.type) {
            case "number":
                p = <>{displayNumberParam(param)}</>;
            case "string":
                p = <>{displayStringParam(param)}</>;
            case "boolean":
                p = <>{displayBooleanParam(param)}</>;
            case "Point":
                p = <>{displayPointParam(param)}</>;
            case "Color":
                p = <>{displayColorParam(param)}</>;
            default:
                p = <></>;
        }

        return (
            <>
                {displayLabelWithTooltip(param.name)}
                {p}
            </>
        );
    }




    const displayParams = () => {
        return params.map((param: Param<ParamValue>, index: number) => (
            <div key={index} className="param">
                {displayData(param)}
            </div>
        ));

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