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
                type: 'Point',
                value: { x: 0.2, y: 0.2 },
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