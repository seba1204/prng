import React from 'react';
import { Item } from '../../lib/SUI';
import Foldable from '../../lib/SUI/components/Foldable';
import ids from '../itemNames.json';
import './mobile.css';

const mobile = () => {

    const [height, setHeight] = React.useState(200);

    const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const target = e.target as HTMLDivElement;
        if (target.scrollTop > 50) {
            setHeight(100);
        } else {
            setHeight(200);
        }
    }

    return (
        <div className='root'>
            <div className='WEBGL' style={{ height: `${height}px` }}>
                <Item id={ids.WEBGL} />
            </div>
            <div className='scrolable' style={{ marginTop: `200px` }} onScroll={handleScroll} >
                <Foldable title={"Parameters"} >
                    <Item id={ids.BUILTIN_PARAMS} />
                    <Item id={ids.OTHER_PARAMS} />
                </Foldable>

                <Foldable title={"Code"} >
                    <Item id={ids.CODE} />
                </Foldable>

                <Foldable title={"Graphs"} >
                    <Item id={ids.GRAPHS} />
                </Foldable>
            </div>
        </div>
    )
};

export default mobile;