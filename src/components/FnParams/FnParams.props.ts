import { Param } from "../../constants/types";

type propsTypes = {
    className?: string,
    params: Param[],
    is3D?: boolean,
    onParamChange?: (name: string, value: any) => void,
} & typeof defaultProps;

const defaultProps = {
    className: "",
    is3D: false,
    onParamChange: (name: string, value: any) => { },
}

export { propsTypes, defaultProps };
