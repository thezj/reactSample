function MyExampleWebpackPlugin() {}

let fs = require('fs')
let path = require('path')
let archiver = require('archiver')
let output = fs.createWriteStream(path.resolve(__dirname, '../') + '/dist.zip')
let archive = archiver('zip', {
    zlib: {
        level: 9
    }
})
archive.pipe(output)


MyExampleWebpackPlugin.prototype.apply = function (compiler) {
    compiler
        .plugin("after-emit", function (compilation, cb) {
            console.log('this is an example plugin!!!==============after-emit')
            archive.directory(path.resolve(__dirname, '../dist'),false)
            archive.finalize()
            cb()
        })
}

module.exports = MyExampleWebpackPlugin