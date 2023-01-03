import React, { useState } from 'react';
import { DragBar, Item } from '../../lib/SUI';

import ids from '../itemNames.json';
import './desktop.css';

type template = 'leftHorizontal' | 'rigthHorizontal' | 'centerVertical';

// generic type for gridTemplate with T that can be a string or a number
type gridTemplateG<T = string> = {
    [key in template]: T
}

type gridTemplate = gridTemplateG<string>
type draggingTemplate = gridTemplateG<boolean>

const defaultGridTemplate: gridTemplate = {
    leftHorizontal: '1fr 6px 1fr',
    rigthHorizontal: '2fr 6px 1fr',
    centerVertical: '1fr 6px 1fr',
}

const defaultDraggingTemplate: draggingTemplate = {
    leftHorizontal: false,
    rigthHorizontal: false,
    centerVertical: false,
};

const desktop = () => {

    const [isDraggingTable, setIsDraggingTable] = useState<draggingTemplate>(defaultDraggingTemplate);
    const [gridTemplates, setGridTemplates] = useState<gridTemplate>(defaultGridTemplate);

    const endDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDraggingTable(defaultDraggingTemplate);
    }
    const onDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        const newGridTemplates = { ...gridTemplates };

        const height = e.currentTarget.clientHeight;
        const width = e.currentTarget.clientWidth;

        if (isDraggingTable.leftHorizontal) {
            const ratio = (e.clientY / height) * 100;
            newGridTemplates.leftHorizontal = `${ratio}% 6px 1fr`;
        }

        if (isDraggingTable.rigthHorizontal) {
            const ratio = ((height - e.clientY) / height) * 100;
            newGridTemplates.rigthHorizontal = `2fr 6px ${ratio}%`;
        }

        if (isDraggingTable.centerVertical) {
            const ratio = ((width - e.clientX) / width) * 100;
            newGridTemplates.centerVertical = `1fr 6px ${ratio}%`;
        }

        setGridTemplates(newGridTemplates);
    }

    const dragStart = (index: template) => {
        const newDraggingTable = { ...defaultDraggingTemplate };
        newDraggingTable[index] = true;
        setIsDraggingTable(newDraggingTable);
    }

    return (
        <div className='desktop__root' onMouseUp={endDrag} onMouseMove={onDrag} style={{ gridTemplateColumns: gridTemplates.centerVertical }}>

            <div className="leftPanel" onMouseUp={endDrag} style={{ gridTemplateRows: gridTemplates.leftHorizontal }}>
                <div className="PARAMS">
                    <Item id={ids.BUILTIN_PARAMS} />
                    <Item id={ids.OTHER_PARAMS} />
                </div>

                <DragBar onMouseDown={() => dragStart('leftHorizontal')} direction="horizontal" />

                <div className="CODE">
                    <Item id={ids.CODE} />
                </div>
            </div>

            <DragBar onMouseDown={() => dragStart('centerVertical')} direction="vertical" />

            <div className='rightPanel' style={{ gridTemplateRows: gridTemplates.rigthHorizontal }}>
                <div className="WEBGL">
                    <Item id={ids.WEBGL} />
                </div>

                <DragBar onMouseDown={() => dragStart('rigthHorizontal')} direction="horizontal" />

                <div className="GRAPHS">
                    <Item id={ids.GRAPHS} />
                </div>

            </div>
        </div>
    )
};

export default desktop;