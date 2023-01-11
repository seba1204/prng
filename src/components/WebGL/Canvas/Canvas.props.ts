import Engine from '../../../webgl';

type propsTypes = {
    engine: Engine;
    onRandomizeClick?: () => void

} & typeof defaultProps;

const defaultProps = {
    onRandomizeClick: () => { },
}

export { propsTypes, defaultProps };
