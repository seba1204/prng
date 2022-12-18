import ReactEcharts from "echarts-for-react";
import React, { useEffect, useState } from 'react';
import { RefreshCcw } from 'react-feather';
import './App.css';
import { Canvas, PictureButton } from "./components";
import { Point } from "./lib/LULA/types";
import { gaussian } from './utils/Prng';
import Engine from './webgl/Engine';

const App = () => {

    const [points, setPoints] = useState<Point[]>([]);
    const [engine, setEngine] = useState<Engine>(new Engine());




    // useEffect to generate random data
    useEffect(() => {
        updateRandomData();
    }, []);

    const updateRandomData = () => {

        // generate 1000 random numbers between 0 and 1
        const numberOfPoints = 10000;

        const points = [];

        for (let i = 0; i < numberOfPoints; i++) {
            points.push({
                x: gaussian(0, 0.2),
                y: gaussian(0, 0.2)
            });

        }

        engine.updatePoints(points)

        setPoints(points);
        console.log('updated points')
    }



    const options = {
        // add axis labels
        // remove y axis
        tooltip: {},
        xAxis: {
            splitLine: {
                show: false
            },
        },
        visualMap: {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
        },

        yAxis: {
            splitLine: {
                show: false
            },
            show: false
        },
        series: {
            // name: 'Random Data',
            type: 'line',
            smooth: true,

            markLine: {
                symbol: 'none',
                data: [{
                    name: 'mean',
                    xAxis: 50,
                    label: {
                        show: false,
                    },
                    tooltip: {
                        formatter: 'mean: 0.5',
                    },
                    lineStyle: {
                        color: '#e74c3c',
                    },
                }]
            }

        },
        // let 
        grid: {
            // left: 0,
            // right: 0,
            bottom: 0,
            // top: 0,
            containLabel: true

        },
    };

    const getOptions = (title: string, data: number[]) => {

        // compute histogram of data

        const min = -1;
        const max = 1;

        const step = (max - min) / 100;
        const nbOfBins = Math.floor((max - min) / step);

        const bins = new Array(nbOfBins).fill(0);

        for (let i = 0; i < data.length; i++) {
            const bin = Math.floor((data[i] - min) / step);
            bins[bin]++;
        }

        // update options of echarts
        const newOptions = {
            ...options,
            title: {
                text: title,
                left: 'center',
                textStyle: {
                    color: '#ecf0f1',

                }
            },
            visualMap: {
                ...options.visualMap,
                max: Math.max(...bins),
            },
            xAxis: {
                ...options.xAxis,
                data: bins.map((_, i) => (min + i * step).toFixed(2)),
            },
            series: [{
                ...options.series,
                data: bins,
            }]
        }

        console.log(newOptions)

        return newOptions
    }



    return (
        <div className='mainContainer'>
            <div className='code'>
                <pre>
                    <code>
                        {/* {"LCG = "}
                        {LCG.toString()} */}
                        {/* <br />
                        <br /> */}
                        {"BoxMuller = "}
                        {gaussian.toString()}
                    </code>
                </pre>

            </div>

            <div className='output'>
                <div className='webGL'>
                    <Canvas engine={engine} />
                    {/* overlay button to regenerate random data */}
                    <PictureButton
                        className="button"
                        image={<RefreshCcw />}
                        enabled={true}
                        onClick={updateRandomData}
                    />
                </div>
                <div className='graphs'>
                    <div className='graph1'>
                        <ReactEcharts
                            option={getOptions('x distribution', points.map(p => p.x))}
                            style={{ width: "100%", height: "100%" }}
                        ></ReactEcharts>
                    </div>
                    <div className='graph2'>
                        <ReactEcharts
                            option={getOptions('y distribution', points.map(p => p.y))}
                            style={{ width: "100%", height: "100%" }}
                        ></ReactEcharts>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;