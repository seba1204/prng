import { Param } from "../../constants/types";

type propsTypes = {
    className?: string,
    params: Param[],
    onParamChange?: (name: string, value: any) => void,
} & typeof defaultProps;

const defaultProps = {
    className: "",
    onParamChange: () => { },
}

export { propsTypes, defaultProps };
