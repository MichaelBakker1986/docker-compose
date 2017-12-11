const fs = require('fs');

exports.ModelWalker = class {

    constructor(basePath, patterns) {
        this.paths = {}
        this.patterns = patterns || ['*', '*/FFL/*', '*/*/FFL/*', '*/*/*/FFL/*', '*/*/*/*/FFL/*']
        this.basePath = basePath || __dirname + '/CODELISTS/'
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
        if (file.toLowerCase().endsWith('.ffl'))
            this.paths[file] = true;
    }

    walk(visit) {
        this.multiple(this.patterns)
        for (var path in this.paths) {
            this.readFile(path, visit)
        }
    }

    //needs separate method
    readFile(path, visit) {
        fs.readFile(path, {encoding: 'utf8'}, function(err, data) {
            visit(path, data)
        })
    }
}
