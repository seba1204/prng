
import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Charts, Code, Select, Setting, Slider, WebGL } from "./components";
import { Point } from "./lib/LULA/types";
import { compile, execute } from './utils/Compiler';
import { argument, getParamsFromString } from './utils/parser';
import Engine from './webgl/Engine';


import functions, { Funcs } from './constants';
const MIN_CANVAS_SIZE = -500;
const MAX_CANVAS_SIZE = 500;

const App = () => {

    const [points, setPoints] = useState<Point[]>([]);
    const [nbOfPts, setNbOfPts] = useState<number>(5000);
    const [rndFunction, setRndFunction] = useState<Funcs>(functions[0]);
    const [engine, _] = useState<Engine>(new Engine());
    const [isDraggingH, setIsDraggingH] = useState<boolean>(false);
    const [isDraggingV, setIsDraggingV] = useState<boolean>(false);
    const [gridTemplateColumns, setGridTemplateColumns] = useState<string>('2fr 6px 1fr');
    const [gridTemplateRows, setGridTemplateRows] = useState<string>('min-content 2fr 6px 1fr');
    const [updateData, setUpdateData] = useState<boolean>(false)
    const [param, setParam] = useState<argument[]>([])
    const [compiledFunction, setCompiledFunction] = useState<Function>(() => { })

    const onSelectChange = (e: any) => {
        const { value } = e;
        const f = functions.filter(f => f.name === value)[0]
        setRndFunction(f);
    }
    const handleEndSlider = () => {
        setUpdateData(true)
    }

    const handleCodeChange = (evn: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRndFunction(
            (oldState) => {
                return {
                    ...oldState,
                    content: evn.target.value
                }
            }
        )
    }

    const handleCodeRun = () => {
        try {
            const compiledCode = compile(rndFunction.content).outputText;
            const F = execute(compiledCode);
            setCompiledFunction(F)
            setParam(getParamsFromString(rndFunction.content))
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        if (updateData) {
            setUpdateData(false)
            updateRandomData()
        }
    }, [updateData, nbOfPts])

    const options = useMemo(() => {
        return functions.map(f => (
            {
                value: f.name,
                label: f.label
            }
        ))
    }, [functions])

    // useEffect to generate random data
    useEffect(() => {
        handleCodeRun()
        updateRandomData();
    }, []);


    const updateRandomData = () => {
        for (let i = 0; i < nbOfPts; i++) {
            points.push({
                x: compiledFunction(...param.map(p => p.value)),
                y: compiledFunction(...param.map(p => p.value)),
            });
        }

        engine.updatePoints(points)

        setPoints(points);
    }
    const endDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDraggingH(false);
        setIsDraggingV(false);
    }
    const onDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isDraggingH) {
            const width = e.currentTarget.clientWidth - 6;
            const x = e.clientX;
            const ratio = x / width;
            const leftPanelWidth = ratio * 100;
            const rightPanelWidth = (1 - ratio) * 100;

            if (leftPanelWidth < 20) {
                return;
            }
            if (rightPanelWidth < 10) {
                return;
            }

            const gridTemplateColumns = `1fr 6px ${rightPanelWidth}%`;

            setGridTemplateColumns(gridTemplateColumns);
        }
        if (isDraggingV) {

            const bottomPanelHeight = e.currentTarget.clientHeight - e.clientY;
            const bottomPanelRatio = (1 - e.clientY / e.currentTarget.clientHeight) * 100;

            // get window width
            const width = e.currentTarget.clientWidth;

            const chartWidth = bottomPanelHeight * (3 / 2);
            // limit the bottom panel height
            if (3 * chartWidth > width) {
                return;
            }
            if (bottomPanelHeight < 100) {
                return;
            }

            const gridTemplateRows = `min-content 2fr 6px ${bottomPanelRatio}%`;

            setGridTemplateRows(gridTemplateRows);
        }
    }
    const startDragH = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDraggingH(true);
    }
    const startDragV = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDraggingV(true);
    }


    useEffect(() => {
        updateRandomData();
    }, [rndFunction, param])

    const handleParamInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        const newParam = [...param];
        const inputType = newParam[index].inputType;

        if (inputType === 'number') {
            newParam[index].value = parseFloat(value);
        } else if (inputType === 'checkbox') {
            newParam[index].value = e.target.checked;
        } else {
            newParam[index].value = value;
        }

        setParam(newParam);
    }
    // 
    useEffect(() => {
        setParam(getParamsFromString(rndFunction.content));
    }, [rndFunction])



    const Params = useMemo(() => {
        return param.map((p, i) => {
            return (
                <div key={i}>
                    <label>{p.name}</label>
                    {/* if inputType is checkbox */}
                    {p.inputType === 'checkbox' ?
                        <input type={p.inputType} checked={p.value as boolean} onChange={e => handleParamInputChange(e, i)} /> :
                        <input type={p.inputType} value={p.value as number | string} onChange={e => handleParamInputChange(e, i)} />
                    }
                </div>
            )
        })
    }, [rndFunction, param])

    return (
        <div className='mainContainer'
            onMouseUp={endDrag}
            onMouseMove={onDrag}
            style={{
                gridTemplateRows,
                gridTemplateColumns,
                cursor: isDraggingH ? 'ew-resize' : 'default'
            }}
        >

            <div className='params'>
                <Setting name='Randomizer function' >
                    <Select onChange={onSelectChange} className='select' options={options} />
                </Setting>
                <Setting name='Number of points' value={nbOfPts} >
                    <Slider value={nbOfPts} onChange={setNbOfPts} onEnd={handleEndSlider} />
                </Setting>
                <Setting name={`Params of ${rndFunction.name} function`} >
                    {Params}
                </Setting>
            </div>
            <div className='dragbar' onMouseDown={startDragV}></div>
            <div className='dragbar1' onMouseDown={startDragH}></div>
            <div className='code'>
                <Code code={rndFunction.content} onChange={handleCodeChange} onValidate={handleCodeRun} />
            </div>
            <div className='webGL'>
                <WebGL engine={engine} onClick={updateRandomData} />
            </div>
            <div className='graphs'>
                <Charts.Distribution data={points.map(p => p.x)} title='x distribution' min={MIN_CANVAS_SIZE} max={MAX_CANVAS_SIZE} />
                <Charts.Distribution data={points.map(p => p.y)} title='y distribution' min={MIN_CANVAS_SIZE} max={MAX_CANVAS_SIZE} />
                <Charts.Distribution data={points.map(p => p.y)} title='z distribution' min={MIN_CANVAS_SIZE} max={MAX_CANVAS_SIZE} />
            </div>
        </div>
    );
};

export default App;