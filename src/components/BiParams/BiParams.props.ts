import { Func } from "../../constants/types";

type propsTypes = {
    className?: string,
    currentFnId: number,
    fnList: Func[],
    nbOfPoints: number,
    is3D: boolean,
    onFnChange?: (fn: Func) => void,
    onNbOfPointsChange?: (nbOfPoints: number) => void,
    on3DToggle?: (is3D: boolean) => void,
} & typeof defaultProps;

const defaultProps = {
    className: "",
    onFnChange: () => { },
    onNbOfPointsChange: () => { },
    on3DToggle: () => { },
}

export { propsTypes, defaultProps };
