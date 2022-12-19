import { CompilerOptions, ModuleKind, ScriptTarget, transpileModule, TranspileOutput } from "typescript";

const compile = (source: string): TranspileOutput => {
    const options: CompilerOptions = {
        noEmitOnError: true,
        noImplicitAny: true,
        target: ScriptTarget.ES5,
        module: ModuleKind.CommonJS
    }

    // const source = "let x: string  = 'string'";

    let result = transpileModule(source, { compilerOptions: options });

    return result;
}

export default compile;