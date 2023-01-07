
import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Code, FnParams } from './components';
import { desktop, mobile } from './layout';
import ids from './layout/itemNames.json';
import { Layout, VirtualItem } from './lib/SUI';

import BiParams from './components/BiParams';
import Canvas from './components/WebGL/Canvas';
import functions from './constants';
import { Func, Point } from './constants/types';
import { gaussian } from './utils/Prng';
import Engine from './webgl';

const App = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const [nbOfPoints, setNbOfPoints] = useState(5000);
    const [is3D, setIs3D] = useState(false);
    const [color, setColor] = useState("#16a085");
    const [currentFnId, setCurrentFnId] = useState(0);
    const [needToCompile, setNeedToCompile] = useState(false);
    const [fnList, setFnList] = useState<Func[]>(functions);
    const engine = useMemo(() => { return new Engine() }, []);

    const updateRandomData = () => {
        const points = [];
        // create 1000 random points
        for (let i = 0; i < nbOfPoints; i++) {
            points.push({
                x: gaussian(0, 0.2),
                y: gaussian(0, 0.2)
            })
        }

        engine.updatePoints(points)

        setPoints(points);
    }

    useEffect(() => {
        updateRandomData()
    }, [nbOfPoints])

    const onColorChange = (color: string) => {
        setColor(color);
        // engine.updateColor(color)
    }

    const onNbOfPointsChange = (nbOfPoints: number) => {
        setNbOfPoints(nbOfPoints);
    }


    return (
        <Layout desktopLayout={desktop()} mobileLayout={mobile()}>
            <VirtualItem id={ids.WEBGL} >
                <Canvas engine={engine} />
            </VirtualItem>

            <VirtualItem id={ids.GRAPHS}>
                <h1>Graphs</h1>
            </VirtualItem>

            <VirtualItem id={ids.BUILTIN_PARAMS}>
                <BiParams
                    fnList={fnList}
                    nbOfPoints={nbOfPoints}
                    is3D={is3D}
                    currentFnId={currentFnId}
                    color={color}
                    on3DToggle={setIs3D}
                    onColorChange={onColorChange}
                    onNbOfPointsChange={onNbOfPointsChange}
                    onFnChange={(fn) => {
                        const index = fnList.findIndex(f => f.name === fn.name);
                        setCurrentFnId(index);
                        setNeedToCompile(true);
                    }}
                />
            </VirtualItem>

            <VirtualItem id={ids.OTHER_PARAMS}>
                <FnParams
                    params={fnList[currentFnId].params}
                    is3D={is3D}
                />
            </VirtualItem>

            <VirtualItem id={ids.CODE}>
                <Code code={functions[currentFnId].content} onChange={() => { }} />
            </VirtualItem>
        </Layout>
    )
};

export default App;