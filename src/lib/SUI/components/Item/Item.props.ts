type propsTypes = {
    id: string,
    className?: string,
} & typeof defaultProps;

const defaultProps = {
    className: "",
}

export { propsTypes, defaultProps };
