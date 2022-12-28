type propsTypes = {
    className?: string,
    onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    direction?: "horizontal" | "vertical",
} & typeof defaultProps;

const defaultProps = {
    className: "",
    onMouseDown: () => { },
    direction: "horizontal",
}

export { propsTypes, defaultProps };
