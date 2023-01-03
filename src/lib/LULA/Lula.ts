import { Point } from '../../constants/types';
import Attribute from './Attribute';
import { Attributes, color, Line, Primitive, shaderType, Triangle } from './types';

/**
 * Lula is a WebGL wrapper.
 * It provides a simple interface to create a WebGL program and to create attributes.
 * It also provides a method to resize the canvas.
 * It is a singleton class.
 * It is not meant to be used directly.
 * It is used by the Engine class.
    */
export default class Lula {

    private gl: WebGLRenderingContext;
    private _program: WebGLProgram | null = null;
    private _attributes: Attributes = {};
    private _clearColor: color = [0, 0, 0, 0];

    constructor(canvas: HTMLCanvasElement) {
        const gl = canvas.getContext('webgl');

        if (gl) {
            this.gl = gl
        } else {
            throw new Error('No WebGL context found');
        }
    }

    // getter of program
    public get program(): WebGLProgram {
        if (this._program) {
            return this._program;
        } else {
            throw new Error('Program is not initialized');
        }
    }

    // getter of attributes
    public get attributes(): Attributes {
        return this._attributes;
    }

    // getter of clearColor
    public get clearColor(): color {
        return this._clearColor;
    }

    /**
     * Create a WebGL programm, bind it the tow shaders, and tell WebGL to use this program.
     * @param vertShader source code of the vertex shader
     * @param fragShader source code of the fragment shader
     */
    public createProgram(vertShader: string, fragShader: string): void {
        const vertexShader = this.initShader('VERTEX_SHADER', vertShader);
        const fragmentShader = this.initShader('FRAGMENT_SHADER', fragShader);

        // create program
        this._program = this.gl.createProgram();

        if (!this._program) {
            throw new Error('Unable to create the program.');
        }

        // add shaders to program
        this.gl.attachShader(this._program, vertexShader);
        this.gl.attachShader(this._program, fragmentShader);

        // add program
        this.gl.linkProgram(this._program);

        if (!this.gl.getProgramParameter(this._program, this.gl.LINK_STATUS)) {
            throw new Error(`Unable to link the shaders: ${this.gl.getProgramInfoLog(this._program)}`);
        }
    }

    public createAttibute(name: string, type: Primitive) {
        this._attributes[name] = new Attribute(this.gl, this.program, name, type);
    }

    public clear() {
        this.gl.clearColor(...this.clearColor);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    public resize() {
        this.resizeCanvas()
    }

    public useProgram() {
        this.gl.useProgram(this.program);
    }


    public bindPoints(name: string) {
        this.createAttibute(name, 'POINTS');
    }

    public bindLines(name: string) {
        this.createAttibute(name, 'LINES');
    }

    public bindTriangles(name: string) {
        this.createAttibute(name, 'TRIANGLES');
    }

    public updatePoints(name: string, points: Point[]) {
        const data = [];
        for (let i = 0; i < points.length; i++) {
            data.push(points[i].x);
            data.push(points[i].y);
        }
        this._attributes[name].updateBuffer(data);
    }

    public updateLines(name: string, lines: Line[]) {
        const data = [];
        for (let i = 0; i < lines.length; i++) {
            data.push(
                lines[i].p1.x, lines[i].p1.y,
                lines[i].p2.x, lines[i].p2.y
            );
        }
        this._attributes[name].updateBuffer(data);
    }

    public updateTriangles(name: string, triangles: Triangle[]) {
        const data = [];
        for (let i = 0; i < triangles.length; i++) {
            data.push(
                triangles[i].p1.x, triangles[i].p1.y,
                triangles[i].p2.x, triangles[i].p2.y,
                triangles[i].p3.x, triangles[i].p3.y
            );
        }
        this._attributes[name].updateBuffer(data);
    }

    public serveBuffer(name: string) {
        this._attributes[name].serveBuffer();
    }

    public serveAllBuffers() {
        for (const key in this._attributes) {
            this._attributes[key].serveBuffer();
        }
    }

    public drawBuffer(name: string) {
        this._attributes[name].draw();
    }

    /**
     * Create a shader of the given type, upload the source and compile it.
     * @param type shader type
     * @param source shader source
     * @returns shader
     * @throws Error if shader compilation or creation fails
     */
    private initShader(type: shaderType, source: string) {
        let shader: WebGLShader | null = null;
        try {
            shader = this.gl.createShader(this.gl[type]);
            if (!shader) {
                throw new Error('Unable to create a shader.');
            }
            this.gl.shaderSource(shader, source);

            this.gl.compileShader(shader);

            if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
                throw new Error(`An error occurred compiling the shaders: ${this.gl.getShaderInfoLog(shader)}`);
            }
            return shader;

        } catch (error) {
            try {
                if (shader) {
                    console.error('An error occured during creation of shader. Trying to remove it.');
                    this.gl.deleteShader(shader);
                    console.error('Succeed to remove it.');
                }
            }
            catch (error) {
                console.error('Error while deleting shader: ', error);
            }
            throw new Error(`Error in initShader: ${error}`);
        }
    }

    /**
     * Resize the canvas to match the display size.
     */
    private resizeCanvas() {
        const canvas = this.gl.canvas;
        // Lookup the size the browser is displaying the canvas in CSS pixels.
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error('canvas is not an instance of HTMLCanvasElement');
        }
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;

        // Check if the canvas is not the same size.
        const needResize = canvas.width !== displayWidth ||
            canvas.height !== displayHeight;

        if (needResize) {
            // Make the canvas the same size
            canvas.width = displayWidth;
            canvas.height = displayHeight;
            this.gl.viewport(0, 0, canvas.width, canvas.height);
        }
    }
}