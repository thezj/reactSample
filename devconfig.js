const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        reactEntry: './src/index.js',
        anotherEntry: './src/elseEntry.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    // webpack打包代码后很难知道报错的js是哪个模块的，（如果三个文件，a.js、b.js、c.js、打包到app.js）其中
    // 有一个文件报错，那么堆栈跟踪会指向到app.js。source-map功能将错误明确指向a.js
    devtool: 'inline-source-map',
    //webpack-dev-server启动配置
    devServer: {
        port: 1717,
        hot: true //告诉devserver在使用HMR
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        }, {
                            loader: 'less-loader'
                        }
                    ]
                })

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({title: 'output html plugin'}),
        //启用HMR
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('style.css')
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('production')
        //     }
        // })
    ]
}