type propsTypes = {
    className?: string,
} & typeof defaultProps;

const defaultProps = {
    className: "",
}

export { propsTypes, defaultProps };
