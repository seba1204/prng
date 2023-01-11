import React, { useEffect } from 'react';
import { Item } from '../../lib/SUI';
import Foldable from '../../lib/SUI/components/Foldable';
import ids from '../itemNames.json';
import './mobile.css';

const mobile = () => {

    const [height, setHeight] = React.useState(300);

    const handleScroll = (e: any) => {
        const top = e.target.scrollingElement.scrollTop;
        const totalHeight = e.target.scrollingElement.scrollHeight;
        const screenHeight = e.target.scrollingElement.clientHeight;

        if (top > 0) {

            // avoid an incomplete scroll to the bottom:
            // if the difference between the total height and the screen height is less than 100px,
            // the canvas will be set to 100px, then there will be no more scrolling
            // and the canvas will be set to 300px, and we enter an infinite loop
            // so we set the canvas to 100px only if the difference is greater than 100px
            if ((totalHeight - screenHeight) > 200) {
                setHeight(100);
            }

        } else if (top === 0) {
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