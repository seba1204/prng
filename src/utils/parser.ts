import { Param, StringParamValue } from "../constants/types";

const allowedTypes = ['number', 'string', 'boolean', 'Color', 'Point'];

const parseParam = (param: string): Param => {

    let paramType: string, paramName;
    let paramDefaultValue: any = undefined;

    // split on '=' to get the default value, if exists
    var name = param.split("=");
    if (name.length > 1) {
        paramName = name[0];
        paramDefaultValue = name[1];
    } else {
        paramName = name[0];
        paramDefaultValue = undefined;
    }

    // now the parameter should look like this:
    // param1: type

    // get type of parameter
    var type = paramName.split(":");
    if (type.length > 1) {
        paramName = type[0];
        paramType = type[1];
    } else {
        paramType = 'any';
    }

    // remove spaces
    paramName = paramName.trim();
    paramType = paramType.trim();

    // set a value if default value is not set
    if (paramDefaultValue === undefined) {
        switch (paramType) {
            case 'number':
                paramDefaultValue = 0;
                break;
            case 'string':
                paramDefaultValue = '';
                break;
            case 'boolean':
                paramDefaultValue = false;
                break;
            case 'Color':
                paramDefaultValue = { r: 0, g: 0, b: 0, a: 0 };
                break;
            case 'Point':
                paramDefaultValue = { x: 0, y: 0, z: 0 };
                break;
            default:
                paramDefaultValue = '';
        }
    } else {

        paramDefaultValue = paramDefaultValue && paramDefaultValue.trim();
    }
    // check if paramType is one of the following: number, string, boolean, Color, Point
    let realParamType: StringParamValue;
    const paRes = allowedTypes.find(type => type === paramType);
    if (!paRes) {
        throw new Error(`Type (${paramType}) can only be one of the following: number, string, boolean, Color, Point`);
    } else {
        realParamType = paRes as StringParamValue;
    }
    return ({
        name: paramName,
        type: realParamType,
        value: paramDefaultValue
    });
};

const getParamsFromString = (func: string): Param[] => {

    // Remove comments of the form /* ... */
    // Removing comments of the form //
    // Remove body of the function { ... }
    // removing '=>' if func is arrow function
    func = func.replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/(.)*/g, '')
        .replace(/{[\s\S]*}/, '')
        .replace(/=>/g, '')
        .trim();

    // now the function should look like this:
    // function name (param1: type, param2: type, ...) : returnType
    // const name = (param1: type, param2: type, ...) : returnType

    // get return type if exists
    const lastIndex = func.lastIndexOf(':');
    let returnType;
    if (lastIndex > 1) {
        func = func.slice(0, lastIndex);
        returnType = func.slice(lastIndex + 1).trim();
    }

    // now the function should look like this:
    // function name (param1: type, param2: type, ...)

    // get only what is between the first '(' and the last ')'
    const start = func.indexOf("(") + 1;
    const end = func.length - 1;

    // now we have the return type and the function shlould look like this:
    // param1: type, param2: type, ...

    // split on ',' to get the parameters
    const result = func.substring(start, end).split(", ");

    return result.map(element => parseParam(element));
}

const getInputType = (type: string = "ds") => {
    switch (type) {
        case 'number':
            return 'number';
        case 'string':
            return 'text';
        case 'boolean':
            return 'checkbox';
        default:
            return 'text';
    }
}


export { getParamsFromString, getInputType };
