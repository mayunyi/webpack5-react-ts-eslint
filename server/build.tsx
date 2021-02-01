import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src';


export default {
    render() {
        return renderToString(<App />);
    },
};
