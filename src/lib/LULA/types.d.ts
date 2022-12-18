import Attribute from './Attribute';

export type Attributes = { [key: string]: Attribute }
export type Primitive = 'POINTS' | 'LINES' | 'TRIANGLES';
export type color = [number, number, number, number];

export type shaderType = 'VERTEX_SHADER' | 'FRAGMENT_SHADER';
export type shader = WebGLShader | null;
export type Point = { x: number, y: number };
export type Line = { p1: Point, p2: Point };
export type Triangle = { p1: Point, p2: Point, p3: Point };