import React from 'react';
import { Item, Pane } from '../../lib/SUI';
import ids from '../itemNames.json';

const mobile = () => {
    return (
        <Pane className='root' direction={'column'}>
            <Item id={ids.WEBGL} />
            <Item id={ids.GRAPHS} />
            <Item id={ids.BUILTIN_PARAMS} />
            <Item id={ids.OTHER_PARAMS} />
            <Item id={ids.CODE} />
        </Pane>
    )
};

export default mobile;