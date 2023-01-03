import React, { useMemo } from "react";
import { useMediaQuery } from 'react-responsive';
import "./Layout.css";
import { defaultProps, propsTypes } from "./Layout.props";
import { displayLayout, getVirtualItems } from "./Layout.utils";



const Layout = (props: propsTypes) => {
    const { desktopLayout, mobileLayout, children } = props;

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 768px)' })

    const currentLayout = useMemo(() => {
        return isDesktopOrLaptop ? desktopLayout : mobileLayout;
    }, [isDesktopOrLaptop, desktopLayout, mobileLayout]);



    const virtualItemList = useMemo(() => {
        return getVirtualItems(children)
    }, [children]);


    return (
        <>{
            React.cloneElement(currentLayout, { children: displayLayout(currentLayout, virtualItemList) })}</>
    );
};


Layout.defaultProps = defaultProps;
export default Layout;