import React from 'react';
import styles from './index.module.scss';
import testUrl from './assert/test.jpg';
const App: React.FC = () => {
    return (<div>
        <h1 className={styles.look}>Test</h1>
        <img src={testUrl} alt="test" />
    </div>);
}
export default App;