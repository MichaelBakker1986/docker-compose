const fs = require('fs');
const path = require('path')
module.exports = class {

    constructor(basePath, patterns, extension) {
        this.paths = {}
        this.patterns = patterns || ['*', '*/FFL/*', '*/*/FFL/*', '*/*/*/FFL/*', '*/*/*/*/FFL/*']
        this.basePath = basePath || __dirname + '/CODELISTS/'
        this.extension = extension || '.ffl'
    }

    multiple(patterns) {
        for (var i = 0; i < patterns.length; i++) {
            var files = require('glob').sync(this.basePath + patterns[i], {});
            for (var j = 0; j < files.length; j++) {
                this.filesRead(files[j]);
            }
        }
    }

    filesRead(file) {
        if (file.toLowerCase().endsWith(this.extension))
            this.paths[file] = true;
    }

    walk(visit, dontOpenFile) {
        const promises = []
        this.multiple(this.patterns)
        for (var pathName in this.paths) {
            if (dontOpenFile) {
                promises.push(visit(path.resolve(pathName), null))
            } else {
                this.readFile(path.resolve(pathName), visit)
            }
        }
        return Promise.all(promises)
    }

    //needs separate method
    readFile(path, visit) {
        fs.readFile(path, { encoding: 'utf8' }, function(err, data) {
            visit(path, data)
        })
    }
}
