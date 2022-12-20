import RSelect from 'react-select';

type propsTypes = {
    name?: string;
    className?: string;
    onChange?: (e: any) => void
    options: { value: any, label: string }[]
} & typeof RSelect;

const defaultProps = {
    name: '',
}

export { propsTypes, defaultProps };
