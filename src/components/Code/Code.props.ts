type propsTypes = {
    code: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void

} & typeof defaultProps;

const defaultProps = {
}

export { propsTypes, defaultProps };
