
import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Code, FnParams } from './components';
import { desktop, mobile } from './layout';
import ids from './layout/itemNames.json';
import { Layout, VirtualItem } from './lib/SUI';

import BiParams from './components/BiParams';
import Canvas from './components/WebGL/Canvas';
import functions from './constants';
import { code_status, Func, Param, ParamValue, Point } from './constants/types';
import { CanvasEngine } from './webgl';

import { Compiler, Parser } from "./utils";

const App = () => {

    // --------------------------------- state ---------------------------------
    const [nbOfPoints, setNbOfPoints] = useState(5000);
    const [is3D, setIs3D] = useState(false);
    const [color, setColor] = useState("#16a085");
    const [currentFnId, setCurrentFnId] = useState(0);
    const [needToRun, setNeedToRun] = useState(false);
    const [fnList, setFnList] = useState<Func[]>(functions);
    const [status, setStatus] = useState<code_status>('idle');
    const engine = useMemo(() => { return new CanvasEngine() }, []);

    // --------------------------- logical functions ---------------------------
    const updateRandomData = () => {
        setStatus('running');
        const points = [];
        // create 1000 random points
        const func = fnList[currentFnId].compiledFunc;
        // create a xParams, yParams, zParams
        const flattenParams = (params: Param[], coord: 'x' | 'y' | 'z') => {
            return params.map(p => {
                if (p.type === 'Point') {
                    return (p.value as Point)[coord];
                } else {
                    return p.value;
                }
            });
        }
        const xParams = flattenParams(fnList[currentFnId].params, 'x');
        const yParams = flattenParams(fnList[currentFnId].params, 'y');
        const zParams = is3D ? flattenParams(fnList[currentFnId].params, 'z') : [];

        if (func) {
            for (let i = 0; i < nbOfPoints; i++) {
                let point = undefined;
                if (is3D) {
                    point = {
                        x: func(...xParams),
                        y: func(...yParams),
                        z: func(...zParams),
                    }
                } else {
                    point = {
                        x: func(...xParams),
                        y: func(...yParams),
                    }
                }
                if (point) {
                    points.push(point);
                } else {
                    console.error('point is undefined');
                    setStatus('error');
                    return;
                }
            }

            engine.updatePoints(points)
        }
        setStatus('idle');

        // update histogram
        // graphs.updatePoints(points)
    }

    const compileFn = (run: boolean = false, compile: boolean = false) => {
        console.log(`compiling: ${compile}, running: ${run}`)
        setStatus('compiling')

        if (run) {
            setNeedToRun(true);
        }

        if (!compile) {
            console.log('no need to compile');
            setStatus('idle');
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
            setStatus('error');
            return;
        }

        // update function
        if (compiledFunc.length > 0) {

            // parse params
            let params = [];
            try {
                params = Parser.getParamsFromString(fn.content)
            } catch (error) {
                setStatus('error');
                return;
            }
            // check if there is a change in params
            // for each param, if it is the same type and same name, 
            // then keep previous value, else set default value

            const newParams = params.map(p => {
                const oldParam = fn.params.find(oldP => oldP.name === p.name);
                if (oldParam) {
                    if (oldParam.type === p.type) {
                        return {
                            ...p,
                            value: oldParam.value
                        }
                    }
                }
                return p;
            })
            const newFn: Func = {
                ...fn,
                params: newParams,
                compiledFunc: compiledFunc
            }

            const newFnList = fnList.map((f, i) => {
                if (i === currentFnId) {
                    return newFn;
                }

                return f;
            })
            console.log('finction compiled')
            setFnList(newFnList);

            setStatus('compiled');

            setTimeout(() => {
                setStatus('idle');
            }, 2000);
        }


    }


    // -------------------------------- effects --------------------------------

    useEffect(() => {
        compileFn(true, true);
    }, [currentFnId])

    useEffect(() => {
        setNeedToRun(true);
    }, [nbOfPoints])

    useEffect(() => {
        if (needToRun) {
            updateRandomData();
            setNeedToRun(false);
        }
    }, [setFnList, needToRun])

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
        compileFn(false, true);
    }
    const onRunClick = () => {
        compileFn(true, true);
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
    }
    // -------------------------------- render ---------------------------------

    return (
        <Layout desktopLayout={desktop()} mobileLayout={mobile()}>
            <VirtualItem id={ids.WEBGL} >
                <Canvas
                    engine={engine}
                    onRandomizeClick={updateRandomData}
                />
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
                    status={status}
                />
            </VirtualItem>
        </Layout>
    )
};

export default App;