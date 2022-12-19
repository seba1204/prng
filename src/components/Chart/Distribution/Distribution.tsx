import ReactEcharts from "echarts-for-react";
import React from "react";
import "./Distribution.css";
import options from "./Distribution.options";

import { defaultProps, propsTypes } from "./Distribution.props";


const Distribution = (props: propsTypes) => {

    const computeHistogram = (data: number[]): number[] => {
        const { min, max, numberOfBins } = props;

        const step = (max - min) / numberOfBins;

        const bins = new Array(numberOfBins).fill(0);

        for (let i = 0; i < data.length; i++) {
            const bin = Math.floor((data[i] - min) / step);
            bins[bin]++;
        }
        return bins;
    }

    const computeOptions = () => {

        const { data, min, max, title, numberOfBins } = props;
        const step = (max - min) / numberOfBins;

        const bins = computeHistogram(data);

        return {
            ...options,
            title: {
                ...options.title,
                text: title,
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
    }

    return (
        <div className="chart-container">
            <ReactEcharts
                option={computeOptions()}
                style={{ height: "100%", width: "100%" }}
                className="chart"
            ></ReactEcharts>
        </div>
    );
};

Distribution.defaultProps = defaultProps;

export default Distribution;
