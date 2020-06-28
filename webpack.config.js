const path =  require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const pathToBundle = path.resolve(__dirname, 'dist')
const pathToIcon = path.resolve(__dirname, 'src', 'assets', 'icons.ico')
const pathToContext = path.resolve(__dirname, 'src')

module.exports = {
    context: pathToContext, //shortcut for all paths in config
    mode: 'development',    // development/production - types of build
    entry: {                //entry points for scripts
        main: './index.js', // scriptName : path
        analytics: './analytics.js'
    },
    output: {
        filename: '[name].[contenthash].js', //mask to output files [hash]/[contenthash]/
                                            // [chunkhash]/[name]/[id]/[query]/[function]
        path: pathToBundle                  //path to output bundle folder
    },
    resolve: {
        extensions: ['.js', '.css', '.jpg', '.json', '.ico'], //this extensions will be parsed in paths to files
        alias:{
            '@modules': path.resolve(__dirname, 'src', 'modules'), // shortcuts to folders
            '@': './src',
            '@styles': path.resolve(__dirname, 'src', 'styles'),
            '@assets': path.resolve(__dirname, 'src', 'assets')
        }
    },
    optimization: {
        splitChunks: {          //when one library is connected to different scripts
            chunks: "all"       //webpack assembles this library multiple times.
        }                       //This option points webpack assemble all libraries once
    },
    devServer: {                //Webpack "online" assembly
        port: 4200              //Points to port
    },
    plugins: [                  //Webpack assembly extensions
        new HtmlWebpackPlugin({ //needs to determine template
            // favicon: pathToIcon,
            template: "./index.html"
        }),
        new CleanWebpackPlugin(), //deletes all files from bundle
        new CopyWebpackPlugin({
            patterns:[ //copies files from folders to bundle during assembly
                {
                    from: pathToIcon,
                    to: pathToBundle
                }
            ]
        })
    ],
    module: {
        rules: [    //needs to process files with different extensions
            {
                test: /\.css$/,                     //regexp for styles
                use: ['style-loader', 'css-loader'] //will be processed with two style loaders
            },
            {
                test: /\.(png|jpg|svg|gif)$/,   //images(and another files)
                use: ['file-loader']            //will be processed with file loader
            },
            {
                test: /\.ttf$/,                 //fonts too
                use: ['file-loader']
            }
        ]
    }
}