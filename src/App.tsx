
import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Code, FnParams } from './components';
import { desktop, mobile } from './layout';
import ids from './layout/itemNames.json';
import { Layout, VirtualItem } from './lib/SUI';

import BiParams from './components/BiParams';
import Canvas from './components/WebGL/Canvas';
import functions from './constants';
import { Func, ParamValue } from './constants/types';
import { gaussian } from './utils/Prng';
import Engine from './webgl';

const App = () => {

    // --------------------------------- state ---------------------------------
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

        // update histogram
        // graphs.updatePoints(points)
    }

    useEffect(() => {
        updateRandomData()
    }, [nbOfPoints])


    // ----------------------------- handle events -----------------------------
    const onColorChange = (color: string) => {
        setColor(color);
        // engine.updateColor(color)
    }

    const onNbOfPointsChange = (nbOfPoints: number) => {
        setNbOfPoints(nbOfPoints);
    }

    const onFnParamChange = (name: string, value: ParamValue) => {

        const fn = fnList[currentFnId];

        const params = fn.params.map(p => {
            if (p.name === name) {
                return {
                    ...p,

                    value
                }
            }

            return p;
        })

        const newFn = {
            ...fn,
            params
        }

        const newFnList = fnList.map((f, i) => {
            if (i === currentFnId) {
                return newFn;
            }

            return f;
        })

        setFnList(newFnList);

    }

    // -------------------------------- render ---------------------------------

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
                    onParamChange={onFnParamChange}
                />
            </VirtualItem>

            <VirtualItem id={ids.CODE}>
                <Code code={functions[currentFnId].content} onChange={() => { }} />
            </VirtualItem>
        </Layout>
    )
};

export default App;