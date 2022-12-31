import React, { useEffect } from 'react';
import { Item } from '../../lib/SUI';
import Foldable from '../../lib/SUI/components/Foldable';
import ids from '../itemNames.json';
import './mobile.css';

const mobile = () => {

    const [height, setHeight] = React.useState(300);

    const handleScroll = (e: any) => {
        const top = e.target.scrollingElement.scrollTop;
        if (top > 50) {
            setHeight(100);
        } else {
            setHeight(300);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [])



    return (
        <div className='mobile__root'>
            <div className='WEBGL' style={{ height: `${height}px` }}>
                <Item id={ids.WEBGL} />
            </div>
            <div className='scrolable' style={{ marginTop: `${height}px` }} >
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