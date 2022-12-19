
import React, { useEffect, useState } from 'react';
import './App.css';
import { Code, WebGL } from "./components";
import { Point } from "./lib/LULA/types";
import { gaussian } from './utils/Prng';
import Engine from './webgl/Engine';


import gaussianFunc from './constants/gaussian.txt';


const App = () => {

    const [points, setPoints] = useState<Point[]>([]);
    const [nbOfPts, setNbOfPts] = useState<number>(10000);
    const [rndFunction, setRndFunction] = useState<string>(gaussianFunc);
    const [engine, _] = useState<Engine>(new Engine());




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

    return (
        <div className='mainContainer'>
            <div className='code'>
                <Code textFile={rndFunction} />
            </div>

            <div className='output'>
                <div className='webGL'>
                    <WebGL engine={engine} onClick={updateRandomData} />
                </div>
                <div className='graphs'>
                    <div className='graph1'>
                        {/* <Charts.Distribution data={points.map(p => p.x)} title='x distribution' /> */}
                    </div>
                    <div className='graph2'>
                        {/* <Charts.Distribution data={points.map(p => p.y)} title='xydistribution' /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;