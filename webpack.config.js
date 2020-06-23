const path =  require('path')
const pathToBundle = path.join(__dirname, 'dist')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: pathToBundle
    }
}