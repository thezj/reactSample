const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MyExamplePlugin = require('./testwebpackplugin')
console.log(MyExamplePlugin)

module.exports = {
    entry: {
        reactEntry: './src/index.js',
        anotherEntry: './src/elseEntry.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            })

        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'output html plugin',
            hash: true //给js和css添加一个本次webpack编译的hash值，防止浏览器缓存
            // minify: {
            //     collapseWhitespace: true
            // }
        }),
        new CleanWebpackPlugin(['./dist']),
        new ExtractTextPlugin('style.css'),
        new MyExamplePlugin(),
        //通过缩短变量函数等命名减少代码量 objectA.functionB > a.b
        new webpack.optimize.UglifyJsPlugin()
    ]
}