import React from "react";
import { code_status } from "../../constants/types";

type propsTypes = {
    code: string;
    status?: code_status,
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onCompileClick?: () => void
    onRunClick?: () => void

} & typeof defaultProps;

const defaultProps = {
    status: 'idle',
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => { },
    onCompileClick: () => { },
    onRunClick: () => { }
}

export { propsTypes, defaultProps };
