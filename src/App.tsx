
import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Code } from './components';
import { desktop, mobile } from './layout';
import ids from './layout/itemNames.json';
import { Layout, VirtualItem } from './lib/SUI';

import Canvas from './components/WebGL/Canvas';
import functions from './constants';
import { Point } from "./lib/LULA/types";
import { gaussian } from './utils/Prng';
import Engine from './webgl';

const App = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const engine = useMemo(() => { return new Engine() }, []);

    const updateRandomData = () => {
        const points = [];
        // create 1000 random points
        for (let i = 0; i < 5000; i++) {
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
    }, [])

    return (
        <Layout desktopLayout={desktop()} mobileLayout={mobile()}>
            <VirtualItem id={ids.WEBGL} >
                <Canvas engine={engine} />
            </VirtualItem>

            <VirtualItem id={ids.GRAPHS}>
                <h1>Graphs</h1>
            </VirtualItem>

            <VirtualItem id={ids.BUILTIN_PARAMS}>
                <h1>Coucou</h1>
            </VirtualItem>

            <VirtualItem id={ids.OTHER_PARAMS}>
                <h1>Params</h1>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </VirtualItem>

            <VirtualItem id={ids.CODE}>
                <Code code={functions[0].content} onChange={() => { }} />
            </VirtualItem>
        </Layout>
    )
};

export default App;