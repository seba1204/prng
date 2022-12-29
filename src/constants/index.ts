import gaussian from './gaussian.txt';
import uniforms from './uniforms.txt';

export default [
    {
        name: 'gaussian',
        label: 'Gaussian',
        content: gaussian,
    },
    {
        name: 'uniforms',
        label: 'Uniforms',
        content: uniforms,
    },
];

export type Color = {
    r: number,
    g: number,
    b: number,
    a?: number,
}


export type ParamValue = string | number | boolean | Color;

export type Param = {
    name: string,
    type: string,
    value: ParamValue
}

export type Funcs = {
    name: string,
    content: string,
    params: Param[],
    compiledFunc: Function,
}