

const path = require('path')
const utils = require('./utils')
const config = require('../config')
const v = "1.2"

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        common:"./src/common/index.js"
    },
    output: {
        path: config.build.assetsRoot,
        filename: v+"/[name].min.js",
        libraryExport: "default",
        library: "H5Plus",
        libraryTarget: "assign"
    },
}