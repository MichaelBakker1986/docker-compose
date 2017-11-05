var browser = require('browserify');
var fs = require('fs')
var name = process.argv[2];
var lmeAPI = require('./lme')
LME = new lmeAPI()
LME.importFFL(fs.readFileSync(__dirname + '/../../ff-ssh-git/resources/' + name + '.ffl', 'utf8'));
var lmeExport = LME.exportLME();
let options = {
    insertGlobals: true,
    insertGlobalVars: {
        JSON_MODEL: (file, dir) => {
            return (file.endsWith('lmeAPIWrapper.js')) ? lmeExport : 'undefined';
        }
    },
    gzip: true,
    minify: true,
    insertGlobals: true,
    debug: false
};
let b = browser(options).ignore('escodegen').ignore('esprima');
b.add(__dirname + '/lmeAPIWrapper.js');
b.transform('uglifyify', {global: true})
b.transform(require('browserify-fastjson'));
var res = fs.createWriteStream(__dirname + '/../../ff-ssh-git/resources/' + name + '.js')
b.bundle().pipe(res);