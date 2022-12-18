/**
 * @class Attribute
 * @description Class to manage webGL attributes
 * @param {WebGLRenderingContext} gl
 * @param {WebGLProgram} program
 * @param {string} name
 * @returns {Attribute}
 * @throws Error if buffer creation fails
    */

import { Primitive } from "./types";

class Attribute {
    constructor(gl: WebGLRenderingContext, program: WebGLProgram, name: string, type: Primitive) {
        this._gl = gl;
        this._program = program;
        this._name = name;
        this._location = this.gl.getAttribLocation(this._program, this._name);
        this._buffer = null;
        this.initBuffer();
        this._type = type;
    }

    private _gl: WebGLRenderingContext;
    private _program: WebGLProgram;
    private _name: string;
    private _location: number;
    private _buffer: WebGLBuffer | null;
    private _type: Primitive;
    private _size: number = 0;
    private _sizeType: number = 2;

    // getter of location
    public get location() {
        return this._location;
    }

    // getter of buffer
    public get bufferLocation() {
        return this._buffer;
    }

    // getter of type
    public get type() {
        return this._type;
    }

    // getter of name
    public get name() {
        return this._name;
    }

    // getter of gl
    public get gl() {
        return this._gl;
    }

    public initBuffer() {
        this._buffer = this.gl.createBuffer();
        console.log(`creating buffer ${this.bufferLocation} for ${this.name}`)
        if (!this._buffer) {
            throw new Error('Unable to create the buffer.');
        }
    }

    public updateBuffer(data: number[]) {
        this._size = data.length / this._sizeType;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufferLocation);
        // for now use Float32Array but it could be dynamic
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
    }

    public bindAttribute() {
        // Bind the position buffer.
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufferLocation);
    }

    public serveBuffer() {
        console.log(`serving ${this.name} to buffer ${this.bufferLocation}`)
        this.gl.enableVertexAttribArray(this.location);

        // bind the attribute
        this.bindAttribute();

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        const size = 2; // 2 for position (x, y), 3 for color (r, g, b), etc.
        const type = this.gl.FLOAT;   // the data is 32bit floats (for now it can only be Float32Array)
        const normalize = false; // don't normalize the data
        const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        const offset = 0;        // start at the beginning of the buffer
        this.gl.vertexAttribPointer(this.location, size, type, normalize, stride, offset);

    }

    public draw() {
        // Draw the geometry.
        const primitiveType = this.gl[this.type];
        this.gl.drawArrays(primitiveType, 0, this._size);
    }


}

export default Attribute