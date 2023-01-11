import CodeEditor from '@uiw/react-textarea-code-editor';
import React, { useEffect } from "react";
import { CheckCircle, Play } from 'react-feather';
import { PictureButton } from '../PictureButton';
import { defaultProps, propsTypes } from "./Code.props";

import "./Code.css";

const Code = (props: propsTypes) => {

    const { onCompileClick, onRunClick, error, code, ...otherProps } = props;

    useEffect(() => {
        // force set dark mode on @uiw/react-textarea-code-editor
        document.documentElement.setAttribute('data-color-mode', 'dark');
    }, [])


    return (
        <div className={`Code__container${error ? ' Code__err' : ''}`}>

            <CodeEditor
                {...otherProps}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                        onRunClick();
                    }
                    if (e.key === 'Enter' && e.altKey) {
                        onCompileClick();
                    }
                    e.key === 'Enter' && e.preventDefault();
                }}
                value={code}
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
            <div className="Code__runButton">
                <PictureButton
                    onClick={onCompileClick}
                    image={<CheckCircle />}
                    tooltip="Compile"
                />
                <PictureButton
                    onClick={onRunClick}
                    image={<Play />}
                    tooltip="Compile & Run"
                />
            </div>

        </div>
    )
}
Code.defaultProps = defaultProps;

export default Code;