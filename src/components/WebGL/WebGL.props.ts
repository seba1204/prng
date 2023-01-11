import { CanvasEngine } from "../../webgl";

type propsTypes = {
    engine: CanvasEngine,
    onClick: () => void,

} & typeof defaultProps;

const defaultProps = {
}

export { propsTypes, defaultProps };
