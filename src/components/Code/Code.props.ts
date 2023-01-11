import React from "react";

type propsTypes = {
    code: string;
    error: boolean,
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onCompileClick?: () => void
    onRunClick?: () => void

} & typeof defaultProps;

const defaultProps = {
    error: false,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => { },
    onCompileClick: () => { },
    onRunClick: () => { }
}

export { propsTypes, defaultProps };
