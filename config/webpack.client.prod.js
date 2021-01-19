const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base');

const TerserPlugin = require('terser-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const SpeedMeasureWebpack5Plugin = require('speed-measure-webpack5-plugin');
// const smw = new SpeedMeasureWebpack5Plugin();

const prodConfig = {
    mode: 'production',
    output: {
        publicPath: './',
    },
    // plugins:[
    //     // 压缩css   webpack5 弃用  推荐使用 css-minimizer-webpack-plugin
    //     new OptimizeCssAssetsPlugin({
    //         assetNameRegExp: /\.css$/g,
    //         cssProcessor: require('cssnano'),
    //     }),
    // ],
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

// module.exports = smw.wrap(merge(baseConfig, prodConfig))

module.exports = merge(baseConfig, prodConfig)
