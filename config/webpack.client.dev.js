
const webpack = require("webpack");
const path = require("path");
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base');
const portfinder = require('portfinder'); // 增加依赖


const devConfig = {
    devtool: 'eval-cheap-module-source-map',
    target: 'web', // webpack5.x 加上之后热更新才有效果
    output: {
        publicPath: '/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        hot:true,
        compress:true,
        port:8001,
        host: 'localhost',
        historyApiFallback: true,
        stats: "errors-only"
    },
}
module.exports = merge(baseConfig, devConfig)


/* 寻找可用端口，并返回一个promise类型的配置，webpack可以接收promise作为配置 */
// module.exports = new Promise((resolve, reject) => {
//     portfinder.basePort = config.devServer.port;
//     portfinder.getPort((err, port) => {
//         if (err) reject(err)
//         else {
//             devConfig.devServer.port = port;
//         }
//         resolve(devConfig)
//     })
// });
