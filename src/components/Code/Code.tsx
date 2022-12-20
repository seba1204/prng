import CodeEditor from '@uiw/react-textarea-code-editor';
import React from "react";
import { defaultProps, propsTypes } from "./Code.props";

// import "./Code.css";

const Code = (props: propsTypes) => {

    return (
        <>

            <CodeEditor
                {...props}
                value={props.code}
                language="ts"
                placeholder="Please enter TS code."
                padding={15}
                style={{
                    fontSize: 12,
                    // backgroundColor: "transparent",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
            />
        </>
    )
}
Code.defaultProps = defaultProps;

export default Code;