type propsTypes = {
    data: number[];
    title: string;
    min?: number;
    max?: number;
    numberOfBins?: number;
} & typeof defaultProps;

const defaultProps = {
    min: -1,
    max: 1,
    numberOfBins: 100,
}

export { propsTypes, defaultProps };
