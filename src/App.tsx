
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
import Engine from './webgl';

import { Compiler, Parser } from "./utils";

const App = () => {

    // --------------------------------- state ---------------------------------
    const [nbOfPoints, setNbOfPoints] = useState(5000);
    const [is3D, setIs3D] = useState(false);
    const [color, setColor] = useState("#16a085");
    const [currentFnId, setCurrentFnId] = useState(0);
    const [needToCompile, setNeedToCompile] = useState(true);
    const [needToRun, setNeedToRun] = useState(true);
    const [fnList, setFnList] = useState<Func[]>(functions);
    const [isError, setIsError] = useState(false);
    const engine = useMemo(() => { return new Engine() }, []);

    // --------------------------- logical functions ---------------------------
    const updateRandomData = () => {
        const points = [];
        // create 1000 random points
        console.log(fnList[currentFnId].compiledFunc)
        for (let i = 0; i < nbOfPoints; i++) {
            points.push({
                x: fnList[currentFnId].compiledFunc(0, 0.2),
                y: fnList[currentFnId].compiledFunc(0, 0.2)
            })
        }

        engine.updatePoints(points)

        // update histogram
        // graphs.updatePoints(points)
    }

    const compileFn = (run: boolean = false) => {
        if (!needToCompile) {
            if (run) {
                updateRandomData();
            }
            return;
        }
        const fn = fnList[currentFnId];

        // compile function with typescript
        let compiledFunc = undefined
        try {
            const compilOutput = Compiler.compile(fn.content);
            const compiled = compilOutput.outputText;
            compiledFunc = Compiler.createFunc(compiled) as Function;

        } catch (error) {
            console.error(error);
            setIsError(true);
            return;
        }

        // update function
        if (compiledFunc) {

            // parse params
            let params = [];
            try {
                params = Parser.getParamsFromString(fn.content)
            } catch (error) {
                setIsError(true);
                return;
            }

            const newFn: Func = {
                ...fn,
                params,
                compiledFunc: compiledFunc
            }

            const newFnList = fnList.map((f, i) => {
                if (i === currentFnId) {
                    return newFn;
                }

                return f;
            })
            setFnList(newFnList);
            setNeedToCompile(false);
        }

        setIsError(false);

    }


    // -------------------------------- effects --------------------------------

    useEffect(() => {
        updateRandomData()
    }, [nbOfPoints])

    useEffect(() => {
        if (needToRun) {
            updateRandomData();
            setNeedToRun(false);
        }
    }, [setFnList])

    // ----------------------------- handle events -----------------------------
    const onColorChange = (color: string) => {
        setColor(color);
        const r = document.documentElement;

        r.style.setProperty('--color', color);
        // if color is light, set text color to black, else white
        const col = color;
        const r1 = parseInt(col.slice(1, 3), 16);
        const g1 = parseInt(col.slice(3, 5), 16);
        const b1 = parseInt(col.slice(5, 7), 16);
        const luma = 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1;
        if (luma > 128) {
            r.style.setProperty('--textColor', 'black');
        }
        else {
            r.style.setProperty('--textColor', 'white');
        }


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

    const onCompileClick = () => {
        compileFn();
        setNeedToCompile(true);
    }
    const onRunClick = () => {
        setNeedToRun(true);
        compileFn(true);
    }
    const onCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // update content in current fn
        setFnList(fnList.map((f, i) => {
            if (i === currentFnId) {
                return ({
                    ...fnList[currentFnId],
                    content: e.target.value || ""
                });
            }
            return f;
        }))

        setNeedToCompile(true);
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
                <Code
                    code={functions[currentFnId].content}
                    onChange={onCodeChange}
                    onCompileClick={onCompileClick}
                    onRunClick={onRunClick}
                    error={isError}
                />
            </VirtualItem>
        </Layout>
    )
};

export default App;