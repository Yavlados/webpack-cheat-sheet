const path =  require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const pathToBundle = path.join(__dirname, 'dist')
const pathToIcon = path.join(__dirname, 'src', 'icons.ico')
const pathToContext = path.join(__dirname, 'src')

module.exports = {
    context: pathToContext,
    mode: 'development',
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: pathToBundle
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: pathToIcon,
            template: "./index.html"
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}