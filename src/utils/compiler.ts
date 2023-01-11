import { CompilerOptions, ModuleKind, ScriptTarget, transpileModule, TranspileOutput } from "typescript";

const compile = (source: string): TranspileOutput => {
    const options: CompilerOptions = {
        noEmitOnError: true,
        noImplicitAny: true,
        target: ScriptTarget.ES5,
        module: ModuleKind.CommonJS
    }
    return transpileModule(source, { compilerOptions: options });
}

// execute function with varying parameters
const createFunc = (compiled: string): any => {
    try {
        return new Function('"use strict";return (' + compiled + ')')();
    } catch (error) {
        console.log(error);
    }
}

export { compile, createFunc };
