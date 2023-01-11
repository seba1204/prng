import React, { ReactNode } from 'react';

type propsTypes = {
    image?: ReactNode;
    enabled?: boolean;
    onClick?: () => void;
    tooltip?: string;
} & typeof defaultProps & React.HTMLAttributes<HTMLDivElement>;

const defaultProps = {
    image: <img src="https://via.placeholder.com/150" alt="placeholder" />,
    enabled: true,
    onClick: () => { },
}

export { propsTypes, defaultProps };
