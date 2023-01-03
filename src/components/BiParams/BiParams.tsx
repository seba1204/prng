import React, { useMemo } from "react";
import Select from "../Select";
import Slider from "../Slider";
import "./BiParams.css";
import { defaultProps, propsTypes } from "./BiParams.props";

const BiParams = (props: propsTypes) => {

    const options = useMemo(() => {
        return props.fnList.map(f => (
            {
                value: f.name,
                label: f.name
            }
        ))
    }, [props.fnList])

    return (
        <div className="BiParams">
            <div className="select-func">
                <label>function</label>
                <Select options={options} />
            </div>
            <div className="select-nbOfPoints">
                <label>Number of points</label>
                <Slider value={props.nbOfPoints} onChange={props.onNbOfPointsChange} />
            </div>
            <div className="select-is3D">
                <label>3D</label>
                <input type="checkbox" checked={props.is3D} onChange={props.on3DToggle} />
            </div>
        </div>
    );
};

BiParams.defaultProps = defaultProps;

export default BiParams;