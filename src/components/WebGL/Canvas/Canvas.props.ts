import { Engine } from '../../../lib';

type propsTypes = {
    engine: Engine;
    onRandomizeClick?: () => void

} & typeof defaultProps;

const defaultProps = {
    onRandomizeClick: () => { },
}

export { propsTypes, defaultProps };
