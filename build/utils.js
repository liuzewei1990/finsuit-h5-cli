'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PAGE_PATH = path.resolve(__dirname, '../src/pages')
const merge = require('webpack-merge')

exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'productionTest'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }
    const px2remLoader = {
        loader: 'px2rem-loader',
        options: {
            remUnit: 75
        }
    }
    // generate loader string to be used with extract text plugin
    function generateLoaders (loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader, px2remLoader] : [cssLoader, px2remLoader]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }

    return output
}

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
}

exports.getAlias = function () {
    const alias = {};
    const dirs = glob.sync(PAGE_PATH + '/*')
    dirs.forEach((dirPath) => {
        const dirname = dirPath.substring(dirPath.lastIndexOf('/') + 1);
        alias["@" + dirname] = path.join(__dirname, '..', "src/pages/" + dirname)
    })
    return alias;
}

//多入口配置
exports.entries = function () {
    const entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
    const map = {}
    entryFiles.forEach((filePath) => {
        const filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = filePath
    })
    return map
}

exports.htmlPluginPath = function (currBuildPackName) {
    const entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
    const reg = new RegExp(currBuildPackName);
    let resPath = "";
    entryHtml.forEach((filePath) => {
        if (reg.test(filePath)) resPath = filePath;
    })
    return resPath;
}

//多页面输出配置
exports.htmlPlugin = function () {
    const entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
    const arr = []

    entryHtml.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let conf = {};


        // 开发环境
        conf = {
            template: filePath,
            filename: filename + '.html',
            chunks: [filename],
            inject: true
        }

        // 测试环境和生产环境
        if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'productionTest') {
            conf = merge(conf, {
                chunks: ['manifest', 'vendor', filename],
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            })
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr
}


/**
 * 获取当前打包时间
 */
exports.getBuildTime = function () {
    let buildTime = new Date().Format("yyyy-MM-dd hh:mm");
    let str = `<script>`;
    str += `console.warn("当前H5包 Build Time： ${buildTime}");`;
    str += `console.warn("当前H5包 NODE_ENV：${process.env.NODE_ENV}");`;
    str += `</script>`;
    return str;
}

/**
 * 日期格式化函数
 */
Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}