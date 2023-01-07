import CodeEditor from '@uiw/react-textarea-code-editor';
import React, { useEffect } from "react";
import { defaultProps, propsTypes } from "./Code.props";

// import "./Code.css";

const Code = (props: propsTypes) => {

    useEffect(() => {
        // force set dark mode on @uiw/react-textarea-code-editor
        document.documentElement.setAttribute('data-color-mode', 'dark');
    }, [])

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
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    height: '100%',
                    overflow: 'auto'
                }}
            />
        </>
    )
}
Code.defaultProps = defaultProps;

export default Code;