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
            archive.directory(path.resolve(__dirname, '../dist'), false)
            archive.finalize()
            cb()
        })

    compiler.plugin('emit', function (compilation, callback) {

        // 探索每个块（构建后的输出）:
        compilation
            .chunks
            .forEach(function (chunk) {
                // 探索块中的每个模块（构建时的输入）：
                chunk
                    .modules
                    .forEach(function (module) {
                        // 探索模块中包含的的每个源文件路径：
                        module
                            .fileDependencies
                            .forEach(function (filepath) {
                                // 现在我们已经知道了很多的源文件结构了……
                            });
                    });

                // 探索块生成的每个资源文件名
                chunk
                    .files
                    .forEach(function (filename) {
                        // 得到块生成的每个文件资源的源码
                        var source = compilation
                            .assets[filename]
                            .source();
                        // console.log('source============',source)
                    });
            });

        console.log('compilation.fileTimestamps=====================',compilation.fileTimestamps)

        callback();
    }.bind(this));

    compiler.plugin("compilation", function (compilation) {

        compilation.plugin("optimize", function() {
            console.log("Assets are being optimized.");
          });
    });

}

module.exports = MyExampleWebpackPlugin