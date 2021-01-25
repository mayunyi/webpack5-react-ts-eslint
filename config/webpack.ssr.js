const path = require('path');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const nodeExternals =  require('webpack-node-externals');
const ssrConfig = {
    mode: 'production',
    entry: "../server/index.tsx",
    output: {
        filename: '[name].ssr.js',
        path: path.join(process.cwd(), './dist/'),
        publicPath: './',
        libraryTarget: 'commonjs2'
    },
    target:'node',
    externals:[nodeExternals()],
    module:{
        rules:[
            {
                test: /\.(sa|sc|c)ss$/,
                include: path.resolve(__dirname, '../src'),
                use: ['ignore-loader'],
            },
        ]
    },
    optimization: {
        minimize:true,
        minimizer:[
            new TerserPlugin({
                parallel:true,
                extractComments: false,
            }),
            new CssMinimizerPlugin({
                cache: true,
                parallel: true,
            }),
        ],

        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            minRemainingSize: 0,
            // maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            automaticNameDelimiter: '--', // 分包打包生成文件的名称的连接符
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                },
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                },
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },

}
module.exports = merge(baseConfig, ssrConfig)
