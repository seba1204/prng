type propsTypes = {
    title: string,
    className?: string,
    children?: React.ReactNode,
} & typeof defaultProps;

const defaultProps = {
    className: "",
}

export { propsTypes, defaultProps };
