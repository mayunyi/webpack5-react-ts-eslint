import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/index';


export default {
    render() {
        return renderToString(<App />);
    },
};
