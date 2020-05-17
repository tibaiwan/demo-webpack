const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const dllConfig = require('./webpack.config.dll');

module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: 'none',
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
})
