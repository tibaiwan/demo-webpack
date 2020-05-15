const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];

module.exports = {
    mode: isDev ? 'development' : 'production',
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(c|le)ss$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            config: config.template
        })
    ],
    devServer: {
        port: '3000', //默认是8080
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: "silent", //日志等级
        compress: true //是否启用 gzip 压缩
    }
}
