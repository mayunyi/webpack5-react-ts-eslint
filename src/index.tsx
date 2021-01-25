import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import './index.scss';

const Index = () => {
    return <div className="a"> hello,world 333 </div>;
};
export default hot(Index);
ReactDom.render(<Index />, document.getElementById('root'));
