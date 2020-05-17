const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const config = require('./public/config')['dev'];

module.exports = {
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:6].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['thread-loader', 'cache-loader', 'babel-loader'],
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.(c|le)ss$/,
                use: [MiniCssPlugin.loader, 'css-loader', 'less-loader'],
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240, //10K
                        esModule: true,
                        name: '[name]_[hash:10].[ext]',
                        outputPath: 'assets',
                        publicPath: '//baidu.com'
                    }
                }],
                include: [path.resolve(__dirname, 'src')]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            config: config.template
        }),
        new HtmlWebpackPlugin({
            template: './public/login.html',
            filename: 'login.html',
            config: config.template
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public/js/*.js',
                    to: path.resolve(__dirname, 'dist', 'js'),
                    flatten: true,
                }
            ]
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            _map: ['lodash', 'map']
        }),
        new MiniCssPlugin({
            filename: 'css/[name]_[hash:6].css'
        }),
        new OptimizeCssPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            Flag: {a: 12}
        }),
        new SpeedMeasurePlugin(),
    ],
    resolve: {
        alias: {
            'components': './src/component'
        }
    }
}
