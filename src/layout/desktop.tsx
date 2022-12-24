import React from 'react';
import { DragBar, Item } from '../lib/SUI';

import './desktop.css';
import ids from './itemNames.json';

export default () => (
    <div className='root'>
        <div className="WEBGL">
            <Item id={ids.WEBGL} />
        </div>
        <DragBar className="horizontal-dragbar-1" />

        <div className="GRAPHS">
            <Item id={ids.GRAPHS} />
        </div>

        <DragBar className="vertical-dragbar" />

        <div className="PARAMS">
            <Item id={ids.BUILTIN_PARAMS} />
            <Item id={ids.OTHER_PARAMS} />
        </div>

        <DragBar className="horizontal-dragbar-2" />

        <div className="CODE">
            <Item id={ids.CODE} />
        </div>
    </div>
);