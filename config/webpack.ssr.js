const path = require('path');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base');
const nodeExternals =  require('webpack-node-externals');

const ssrConfig = {
    mode: 'production',
    entry: path.join(__dirname, "../server/index.tsx"),
    output: {
        path: path.resolve(process.cwd(), '../dist'),
        filename: "server.js",
        publicPath: './',
        libraryTarget: 'commonjs2',
    },
    target:'node',
    externals:[nodeExternals()],
    devtool: "source-map",
}
module.exports = merge(baseConfig, ssrConfig)
