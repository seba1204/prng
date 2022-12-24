import React, { ReactElement } from "react";
import "./Layout.css";
import { defaultProps, propsTypes } from "./Layout.props";

const Layout = (props: propsTypes) => {
    const { desktopLayout, mobileLayout, children } = props;
    const actualItems = (children ? (Array.isArray(children) ? children : [children]) : []).filter(
        (child: ReactElement) => getChildType(child).toLowerCase() === 'virtualitem'
    );

    const getChildType = (child: ReactElement) => {
        let childType = child.type;
        if (typeof childType === 'string')
            childType = childType.toLowerCase()
        else
            childType = childType.name.toLowerCase()
        return childType;
    }

    const displayLayout = (layout: ReactElement,) => {

        let layoutChildren = layout.props.children;

        if (!layoutChildren)
            return null;
        if (!Array.isArray(layoutChildren))
            layoutChildren = [layoutChildren] as ReactElement[];

        const newChildren = layoutChildren.map((child: ReactElement) => {
            const childType = getChildType(child);

            if (childType === 'item') {
                // find the item in the layout
                // and display the right child instead of the item

                const actualChild = children.filter((c: ReactElement) => c.props.id === child.props.id)[0];
                // copy props from item to actual child
                return React.cloneElement(actualChild, { ...child.props, children: actualChild.props.children });


            } else {
                // if child as children, call displayLayout on them
                if (child.props.children)
                    return React.cloneElement(child, { children: displayLayout(child) });
                else
                    return child;
            }

        });


        return (<>{newChildren}</>)
    };

    return (
        <div className="layout">
            {displayLayout(desktopLayout)}
        </div>
    );
};


Layout.defaultProps = defaultProps;
export default Layout;