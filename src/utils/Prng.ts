import { Point } from "../constants/types";

// generate a random gaussian 2d distribution arround a point
// as it is dart shots around a target

function gaussian(mean: number = 0, stdDev: number = 1): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num =
        Math.sqrt(-2.0 * Math.log(u)) *
        Math.cos(2.0 * Math.PI * v);

    num = num * stdDev + mean;
    return num;
}


function uniform(min: number = -1, max: number = 1): number {
    return Math.random() * (max - min) + min;
}

const generate2DGaussian = (mean: number, stdDev: number): Point => {
    return {
        x: gaussian(mean, stdDev),
        y: gaussian(mean, stdDev)
    }
}

const generate2DUniform = (min: Point, max: Point): Point => {
    return {
        x: uniform(min.x, max.x),
        y: uniform(min.y, max.y)
    }
}

const generate2DGaussianArray = (mean: number, stdDev: number, size: number): Point[] => {
    const array: Point[] = [];
    for (let i = 0; i < size; i++) {
        array.push(generate2DGaussian(mean, stdDev));
    }
    return array;
}

const generate2DUniformArray = (min: Point, max: Point, size: number): Point[] => {
    const array: Point[] = [];
    for (let i = 0; i < size; i++) {
        array.push(generate2DUniform(min, max));
    }
    return array;
}

export {
    gaussian,
    generate2DGaussian,
    generate2DUniform,
    generate2DGaussianArray,
    generate2DUniformArray
};
