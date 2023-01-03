export type Color = {
    r: number,
    g: number,
    b: number,
    a?: number,
}

export type Point = {
    x: number,
    y: number,
    z?: number,
}

type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends Color ? "Color" :
    T extends Point ? "Point" :
    T extends undefined ? "undefined" :
    "object";


export type ParamValue = string | number | boolean | Color | Point;
export type StringParamValue = "string" |
    "number" |
    "boolean" |
    "Color" |
    "Point";


export type Param<T = ParamValue> = {
    name: string,
    value: T,
    type: TypeName<T>,
}

export type Func = {
    name: string,
    content: string,
    params: Param[],
    compiledFunc: Function,
}
