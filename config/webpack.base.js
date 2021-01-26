
const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpackBar = require('webpackbar')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');



const devMode = process.env.NODE_ENV !== 'production';

let MiniCssExtractPlugins = [];

if (!devMode) {
    // 只有生产环境才会开启
    MiniCssExtractPlugins.push(
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[contenthash:8].css',
            chunkFilename: 'css/[id]_[contenthash:8].css',
            linkType: 'text/css',
        })
    );
}


module.exports = {
    entry: {
        index: path.join(__dirname, '../src/index.tsx'),
    },
    output: {
        filename: 'js/[name].[fullhash:8].js',
        chunkFilename: 'js/[name].[fullhash:8].js',
        path: path.resolve(__dirname, '../dist'),

    },
    resolve:{
        extensions: ['.js', '.jsx', '.ts', '.tsx','.json'],
        alias: {
            '@': path.resolve(__dirname, '../src/') // 以 @ 表示src目录
        }
    },
    module: {
        rules: [

            {
                test: /\.(js|ts)x?$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true, //只编译不检查
                            compilerOptions: {
                                module: 'es2015'
                            }
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: path.resolve(__dirname, '../src'),
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|kpg|gif|jpeg|jpg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        name: 'images/[name]_[hash:8].[ext]',
                    },
                }],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name]_[hash:8].[ext]',
                    },
                }],
            },
        ],
    },
    plugins:[
        new CleanWebpackPlugin(),


        new webpack.ProvidePlugin({
            _: 'lodash',
        }),
        // 压缩lodash
        new LodashModuleReplacementPlugin,
        // 友好的错误提示
        new FriendlyErrorsWebpackPlugin({
            onErrors: (severity, errors) => {
                let error = errors[0];
                notifier.notify({
                    title: 'webpack编译失败了',
                    message: severity + ':' + error.name,
                    subtitle: error.file || '',
                    icon
                });
            }
        }),
        new webpackBar({
            name: devMode ? '启动中' : '打包中',
            color: '#3c99b0',
        }),

        // 生成 manifest.json 文件清单
        new WebpackManifestPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            ENV: JSON.stringify('ENV')
        })
    ].concat(MiniCssExtractPlugins),
    stats: 'errors-only',
}
