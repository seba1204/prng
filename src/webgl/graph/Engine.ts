import { Point } from '../../constants/types';
import { Engine as LulaEngine } from '../../lib';

import fragShader from './shaders/fragmentShader.glsl';
import vertShader from "./shaders/vertexShader.glsl";


const POINTS = 'a_position'

export default class Engine extends LulaEngine {

    constructor() {
        super();
    }

    init() {
        this.lula.createProgram(vertShader, fragShader);

        // create an attribute for the position
        this.lula.bindPoints(POINTS);
    }

    public updatePoints(points: Point[]) {
        this.lula.updatePoints(POINTS, points);

        // TODO: move it so the end user don't have to call it
        this._run();
    }


    run() {
        this.lula.serveBuffer(POINTS);
        // this.serveBuffer(COLORS);

        this.lula.drawBuffer(POINTS);
    }

}