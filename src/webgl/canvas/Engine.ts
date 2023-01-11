import { Color, Point } from '../../constants/types';
import { Engine as LulaEngine } from '../../lib';

import fragShader from './shaders/fragmentShader.glsl';
import vertShader from "./shaders/vertexShader.glsl";


const POINTS = 'a_position'
const COLOR = 'u_color'

export default class Engine extends LulaEngine {

    constructor() {
        super();
    }

    init() {
        this.lula.createProgram(vertShader, fragShader);

        // create an attribute for the position
        this.lula.bindPoints(POINTS);

        // create an attribute for the color
        this.lula.bindUniform(COLOR);
    }

    public updatePoints(points: Point[]) {
        this.lula.updatePoints(POINTS, points);

        // TODO: move it so the end user don't have to call it
        this._run();
    }


    public updateColor(color: Color) {
        const { r, g, b, a } = color;
        this.lula.updateUniform(COLOR, [r, g, b, a || 0]);

        // TODO: move it so the end user don't have to call it
        this._run();
    }


    run() {
        this.lula.serveBuffer(POINTS);
        // this.serveBuffer(COLORS);

        this.lula.drawBuffer(POINTS);
    }

}