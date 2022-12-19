
import React, { useEffect, useState } from 'react';
import './App.css';
import { Charts, Code, Select, Slider, WebGL } from "./components";
import { Point } from "./lib/LULA/types";
import { gaussian } from './utils/Prng';
import Engine from './webgl/Engine';


import gaussianFunc from './constants/gaussian.txt';


const App = () => {

    const [points, setPoints] = useState<Point[]>([]);
    const [nbOfPts, setNbOfPts] = useState<number>(10000);
    const [rndFunction, setRndFunction] = useState<string>(gaussianFunc);
    const [engine, _] = useState<Engine>(new Engine());
    const [isDraggingH, setIsDraggingH] = useState<boolean>(false);
    const [isDraggingV, setIsDraggingV] = useState<boolean>(false);
    const [gridTemplateColumns, setGridTemplateColumns] = useState<string>('1fr 6px 1fr');
    const [gridTemplateRows, setGridTemplateRows] = useState<string>('min-content 2fr 6px 1fr');




    // useEffect to generate random data
    useEffect(() => {
        updateRandomData();
    }, []);

    const updateRandomData = () => {

        const points = [];

        for (let i = 0; i < nbOfPts; i++) {
            points.push({
                x: gaussian(0, 0.2),
                y: gaussian(0, 0.2)
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
            const gridTemplateColumns = `${leftPanelWidth}% 6px ${rightPanelWidth}%`;
            setGridTemplateColumns(gridTemplateColumns);
        }
        if (isDraggingV) {
            // get height of the main container
            const height = e.currentTarget.clientHeight;
            // get the y position of the mouse
            const y = e.clientY;
            // get param panel height
            const paramPanelHeight = document.querySelector('.params')?.clientHeight || 0;
            // get the ratio of the mouse position
            const ratio = y / height;
            // get ration of param panel
            const paramPanelRatio = (paramPanelHeight) / height * 100;
            const draggerRatio = 6 / height * 100;
            const codePanelHeight = ratio * 100;
            const bottomPanelHeight = (1 - ratio) * 100;
            const gridTemplateRows = `${paramPanelHeight + 2}px ${codePanelHeight - paramPanelRatio}% 6px ${bottomPanelHeight - draggerRatio}%`;
            console.log(gridTemplateRows);
            setGridTemplateRows(gridTemplateRows);
        }
    }
    const startDragH = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDraggingH(true);
    }

    const startDragV = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDraggingV(true);
    }


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
                <Select name='Random function' className='select' />
                <Slider value={nbOfPts} name={'Number of points'} handleChange={setNbOfPts} />
            </div>
            <div className='dragbar' onMouseDown={startDragV}></div>
            <div className='dragbar1' onMouseDown={startDragH}></div>
            <div className='code'>
                <Code textFile={rndFunction} />
            </div>
            <div className='webGL'>
                <WebGL engine={engine} onClick={updateRandomData} />
            </div>
            <div className='graphs'>
                <Charts.Distribution data={points.map(p => p.x)} title='x distribution' />
                <Charts.Distribution data={points.map(p => p.y)} title='xydistribution' />
                <Charts.Distribution data={points.map(p => p.y)} title='xydistribution' />
            </div>
        </div>
    );
};

export default App;