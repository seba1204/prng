import React, { useMemo } from "react";
import "./BiParams.css";
import { defaultProps, propsTypes } from "./BiParams.props";

const BiParams = (props: propsTypes) => {


    const options = useMemo(() => {
        return props.fnList.map(f => (f.name))
    }, [props.fnList])

    const onFnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const fn = props.fnList.find(f => f.name === e.target.value);
        fn && props.onFnChange(fn)
    }

    const displayOptions = () => {
        return options.map((option, index) =>
            (<option key={index} value={option}>{option}</option>)
        )
    }
    const [nbOfPoints, setNbOfPoints] = React.useState(props.nbOfPoints);

    const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onColorChange(e.target.value)
    }

    return (
        <div className="BiParams">
            <div className="func">
                <label>Function: </label>
                <select value={options[props.currentFnId]} onChange={onFnChange}>
                    {displayOptions()}
                </select>
            </div>
            <div className="nbOfPoints">
                <label>Number of points ({nbOfPoints}): </label>
                <input
                    className="slider"
                    type="range"
                    min="1000"
                    max="10000"
                    step={100}
                    value={nbOfPoints}
                    onChange={(e) => setNbOfPoints(parseInt(e.target.value))}
                    onMouseUp={() => {
                        props.onNbOfPointsChange(nbOfPoints)
                    }}
                />
            </div>
            <div className="is3D">
                <label>3D? </label>
                <input
                    type="checkbox"
                    checked={props.is3D}
                    onChange={(e) => props.on3DToggle(e.target.checked)}
                />
            </div>
            <div className="color">
                <label>Color: </label>
                <input
                    className="inputColor"
                    type="color"
                    value={props.color}
                    onChange={onColorChange}
                />
            </div>
        </div>
    );
};

BiParams.defaultProps = defaultProps;

export default BiParams;