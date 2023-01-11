import { Func } from "../../constants/types";

type propsTypes = {
    className?: string,
    currentFnId: number,
    fnList: Func[],
    nbOfPoints: number,
    is3D: boolean,
    color: string,
    onFnChange?: (fn: Func) => void,
    onNbOfPointsChange?: (nbOfPoints: number) => void,
    on3DToggle?: (is3D: boolean) => void,
    onColorChange?: (color: string) => void,
} & typeof defaultProps;

const defaultProps = {
    className: "",
    onFnChange: (fn: Func) => { },
    onNbOfPointsChange: (nbOfPoints: number) => { },
    on3DToggle: (is3D: boolean) => { },
    onColorChange: (color: string) => { },
}

export { propsTypes, defaultProps };
