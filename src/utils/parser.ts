type argument = {
    name: string,
    type: string,
    inputType: string,
    defaultValue: string | null
}

const getParamsFromString = (func: string): argument[] => {

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

    return result.map(element => {

        let paramType, paramName, paramDefaultValue;

        // split on '=' to get the default value, if exists
        var name = element.split("=");
        if (name.length > 1) {
            paramName = name[0];
            paramDefaultValue = name[1];
        } else {
            paramName = name[0];
            paramDefaultValue = null;
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
        paramDefaultValue = paramDefaultValue && paramDefaultValue.trim();


        return ({
            name: paramName,
            type: paramType,
            inputType: getInputType(paramType),
            defaultValue: paramDefaultValue
        });
    });
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


export { argument, getParamsFromString, getInputType };
