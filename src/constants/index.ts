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

export type Funcs = {
    name: string,
    label: string,
    content: string,
}