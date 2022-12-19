import ts from "typescript";

const compile = (source: string): ts.TranspileOutput => {
    const options: ts.CompilerOptions = {
        noEmitOnError: true,
        noImplicitAny: true,
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.CommonJS
    }

    // const source = "let x: string  = 'string'";

    let result = ts.transpileModule(source, { compilerOptions: options });

    return result;
}

export default compile;