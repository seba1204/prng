import Engine from "../../webgl";

type propsTypes = {
    engine: Engine,
    onClick: () => void,

} & typeof defaultProps;

const defaultProps = {
}

export { propsTypes, defaultProps };
