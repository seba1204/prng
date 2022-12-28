
import React from 'react';
import './App.css';
import { Code } from './components';
import { desktop, mobile } from './layout';
import ids from './layout/itemNames.json';
import { Layout, VirtualItem } from './lib/SUI';

const App = () => {


    return (
        <Layout desktopLayout={desktop()} mobileLayout={mobile()}>
            <VirtualItem id={ids.WEBGL} >
                <h1>Canvas</h1>
            </VirtualItem>

            <VirtualItem id={ids.GRAPHS}>
                <h1>Graphs</h1>
            </VirtualItem>

            <VirtualItem id={ids.BUILTIN_PARAMS}>
                <h1>Coucou</h1>
            </VirtualItem>

            <VirtualItem id={ids.OTHER_PARAMS}>
                <h1>Params</h1>
            </VirtualItem>

            <VirtualItem id={ids.CODE}>
                <Code code={'coucoucocu'} onChange={() => { }} />
            </VirtualItem>
        </Layout>
    )
};

export default App;