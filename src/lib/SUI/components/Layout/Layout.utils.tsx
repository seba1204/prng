import React, { ReactElement, ReactNode } from 'react';
import Item from '../Item';
import VirtualItem from '../VirtualItem';

/**
    * Return lowercase type of child.
    * @param child: ReactElement, the child to get the type of
    * @returns string of the type of the child (lowercase)
    */
const getChildType = (child: ReactElement): string => {
    let childType = child.type;
    if (typeof childType === 'string')
        childType = childType
    else
        childType = childType.name
    return childType.toLowerCase();
}

/**
 * Return all VirtualItem children from a list of children.
 * @param children a list of children to filter
 * @returns a list of react elements that are of type VirtualItem
 */
const getVirtualItems = (children: ReactNode) => {
    // If there are no children, return an empty array
    if (!children)
        return [];

    // If children is not an array, make it an array
    const safeChildren: any[] = !Array.isArray(children) ? [children] : children;

    // Filter the children to only return VirtualItem children
    const myComponentType = (<VirtualItem id="" > </VirtualItem>).type;
    return safeChildren.filter(
        (child: ReactElement) => child.type === myComponentType
    );
}


/**
 * Display the layout with the virtual items
 * @param layout 
 * @returns all elements from the layout with Items replaced by VirtualItems from the children
 */
const displayLayout = (layout: ReactElement, virtualItemList: any[]) => {
    let layoutChildren = layout.props.children;

    // safety check
    if (!layoutChildren) {
        return null;
    }
    if (!Array.isArray(layoutChildren))
        layoutChildren = [layoutChildren] as ReactElement[];

    // foreach child in current layout children
    //  - replace the Items with the VirtualItems
    //  - render all other child recursively search for nested Items
    const newChildren = layoutChildren.map((child: ReactElement, i: number) => {
        const myComponentType = (<Item id={""} />).type;
        if (child.type === myComponentType) {
            // if (getChildType(child) === 'item') {
            // find the actual item with the same id
            const matchItems = virtualItemList.filter((c: ReactElement) => c.props.id === child.props.id);

            // if no item with the same id is found, return null
            if (matchItems.length < 1) {
                return null;
            }
            // if multiple items with the same id are found, return null
            else if (matchItems.length > 1) {
                return null;
            }
            // if only one item with the same id is found, return the item with the props from the layout item
            else {
                // copy all props from the layout item to the actual item
                return React.cloneElement(matchItems[0], { ...child.props, key: i, children: matchItems[0].props.children });;
            }

        } else {
            // if there are several children, search for nested items
            if (child.props.children)
                return React.cloneElement(child, { key: i, children: displayLayout(child, virtualItemList) });
            // if there are no children, return the current element
            else
                return child;
        }

    });


    return (<>{newChildren}</>)
};


const isMobile = () => navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i) !== null;

export { getChildType, getVirtualItems, displayLayout, isMobile };

