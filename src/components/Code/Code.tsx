import CodeEditor from '@uiw/react-textarea-code-editor';
import React from "react";
import { Compiler } from '../../utils';
import { propsTypes } from "./Code.props";

// import "./Code.css";

const Code = (props: propsTypes) => {
    const { textFile } = props;

    // useEffect(() => {
    //     document.documentElement.setAttribute('data-color-mode', 'dark')
    // }, [])

    const [code, setCode] = React.useState(textFile);

    const runCode = () => {
        const transpiledOutput = Compiler(code);
        console.log(transpiledOutput.diagnostics);
        if (transpiledOutput.diagnostics) {
            if (transpiledOutput.diagnostics.length > 0) {
                console.log("Error");
            }
        }
    }

    return (
        <>

            <CodeEditor
                value={code}
                language="ts"
                placeholder="Please enter TS code."
                padding={15}
                style={{
                    fontSize: 12,
                    // backgroundColor: "transparent",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
                onChange={(evn) => setCode(evn.target.value)}
            />
        </>
    )
}

export default Code;