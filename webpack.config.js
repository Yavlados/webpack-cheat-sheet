const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer') //package.json > scripts > stats
//optimization plugins
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
//not all babel presets inserts like plugins

const isDev = process.env.NODE_ENV === 'development' //true if development
const isProd = !isDev
console.log('isDev: ', isDev)


const pathToBundle = path.resolve(__dirname, 'dist')
const pathToIcon = path.resolve(__dirname, 'src', 'assets', 'icons.ico')
const pathToContext = path.resolve(__dirname, 'src')


const optimization = () => {
    const config = {
        splitChunks: {          //when one library is connected to different scripts
            chunks: "all"       //webpack assembles this library multiple times.
        }                       //This option points webpack assemble all libraries once
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const plugins = () => {
    const base = [                  //Webpack assembly extensions
        new HtmlWebpackPlugin({ //needs to determine template
            // favicon: pathToIcon,
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(), //deletes all files from bundle
        new CopyWebpackPlugin({
            patterns: [ //copies files from folders to bundle during assembly
                {
                    from: pathToIcon,
                    to: pathToBundle
                }
            ]
        }),
        new MiniCssExtractPlugin({ //Extracts styles to css file in bundle
            filename: filename(`css`)
        }),
    ]
    if (isProd){    //helps to visualize packages size in html
        base.push( new BundleAnalyzerPlugin() )
    }
    return base
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
    const loaders = [{      //another approach to use loaders
        loader: MiniCssExtractPlugin.loader,
        options: {                      //to modify loader options
            hmr: isDev,                 //Hot Module Replacement
            reloadAll: true
        }
    },
        'css-loader']
    if (extra) {
        loaders.push(extra)
    }
    return loaders
}

const babelPresets = preset => {
    const config = {
        exclude: path.resolve(__dirname, 'node_modules'),      // js files from node_modules will be ignored
        use: []                         //place for loaders
    }
    const babelLoaderConfig = {         //default babel setup
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env',     //default preset
            ],
            plugins: [
                '@babel/plugin-proposal-class-properties'   //Translate classes to old ECMA
            ]
        }
    }

    if (preset === 'JavaScript') {
        config.test = /\.js$/                                                  //regexp for js files
        if (isDev) {                                                           //eslint connected in developer mode
            config.use.push('eslint-loader')
        }
    } else if (preset === 'TypeScript') {
        config.test = /\.ts$/                                               //regexp for typeScript files
        babelLoaderConfig.options.presets.push('@babel/preset-typescript')  //and babel preset for typescript
    } else if (preset === 'React') {
        config.test = /\.jsx$/                                              //regexp for jsx(react) files
        babelLoaderConfig.options.presets.push('@babel/preset-react')       //and babel preset for react/jsx
    }
    config.use.push(babelLoaderConfig)
    return config
}

module.exports = {
    context: pathToContext, //shortcut for all paths in config
    mode: 'development',    // development/production - types of build
    entry: {                //entry points for scripts
        main: ['@babel/polyfill', './index.jsx'], // scriptName : path || array
        analytics: './analytics.ts' //not all babel presets inserts like modules
    },                              //and @babel/polyfill inserts here
    output: {
        filename: filename(`js`), //mask to output files [hash]/[contenthash]/
        // [chunkhash]/[name]/[id]/[query]/[function]
        path: pathToBundle                  //path to output bundle folder
    },
    resolve: {
        extensions: ['.js', '.css', '.jpg', '.json', '.ico'], //this extensions will be parsed in paths to files
        alias: {
            '@modules': path.resolve(__dirname, 'src', 'modules'), // shortcuts to folders
            '@': './src',
            '@styles': path.resolve(__dirname, 'src', 'styles'),
            '@assets': path.resolve(__dirname, 'src', 'assets')
        }
    },
    optimization: optimization(),
    devServer: {                //Webpack "online" assembly
        port: 4200,              //Points to port
        hot: isDev              // equal to hmr - Hot Module Replacement
    },
    devtool: isDev ? 'source-map' : '', //isBuild => default https://webpack.js.org/configuration/devtool/
    plugins: plugins(),
    module: {
        rules: [    //needs to process files with different extensions
            {
                test: /\.css$/,                     //regexp for styles
                use: cssLoaders() //will be processed with two style loaders
                //!!! webpack is reading loaders right-to-left !!!
            },
            {
                test: /\.(png|jpg|svg|gif)$/,   //images(and another files)
                use: ['file-loader']            //will be processed with file loader
            },
            {
                test: /\.ttf$/,                 //fonts too
                use: ['file-loader']
            },
            //Pre-processors
            {
                test: /\.less$/,                //regexp for less
                use: cssLoaders('less-loader')
                //!!! webpack is reading loaders right-to-left !!!
            },
            {
                test: /\.s[ca]ss$/,                     //regexp for sass
                use: cssLoaders('sass-loader')
            },
            babelPresets('JavaScript'),
            babelPresets('TypeScript'),
            babelPresets('React')
        ]
    }
}