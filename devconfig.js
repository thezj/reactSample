const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

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
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'output html plugin'
        }),
        new CleanWebpackPlugin(['./dist'])

    ]
}