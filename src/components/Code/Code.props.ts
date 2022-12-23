type propsTypes = {
    code: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onValidate: () => void,

} & typeof defaultProps;

const defaultProps = {
}

export { propsTypes, defaultProps };
