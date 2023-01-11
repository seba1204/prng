type propsTypes = {
    onNumberChange?: (value: number) => void;
} & typeof defaultProps & React.InputHTMLAttributes<HTMLInputElement>;

const defaultProps = {
    onNumberChange: (value: number) => { },
}

export { propsTypes, defaultProps };
