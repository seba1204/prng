import gaussian from './gaussian.txt';
import { Func } from './types';
import uniforms from './uniforms.txt';

const fn: Func[] = [
    {
        name: 'gaussian',
        content: gaussian as string,
        params: [
            {
                name: 'mean',
                type: 'Point',
                value: { x: 0, y: 0 },
            },
            {
                name: 'stdDev',
                type: 'number',
                value: 0.2,
            },
            {
                name: 'color',
                type: 'Color',
                value: { r: 255, g: 0, b: 0 },
            },
            {
                name: '3D',
                type: 'boolean',
                value: false,
            }
        ],
        compiledFunc: () => { },
    },
    {
        name: 'uniforms',
        content: uniforms as string,
        params: [
            {
                name: 'min',
                type: 'number',
                value: -1,
            },
            {
                name: 'max',
                type: 'number',
                value: 1,
            }
        ],
        compiledFunc: () => { },
    },
];

export default fn;