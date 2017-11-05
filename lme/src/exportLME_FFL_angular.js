var browser = require('browserify');
var fs = require('fs')
var name = process.argv[2];
var lmeAPI = require('./lme')
const lmeApi = new lmeAPI()
lmeApi.importFFL(fs.readFileSync(__dirname + '/../public/json/' + name + '.ffl', 'utf8'));
var lmeExport = lmeApi.exportLME();
let done = false;
let options = {
    insertGlobals: true,
    insertGlobalVars: {
        JSON_MODEL: (file, dir) => {
            if (file.endsWith('angularController.js')) {
                if (done) {
                    throw Error('Should not be exported twice')
                }
                done = true;
                return lmeExport;
            }
            return 'undefined';
        }
    },
    gzip: true,
    minify: true,
    insertGlobals: true,
    debug: false
};
let b = browser(options).ignore('escodegen').ignore('esprima');
b.add(__dirname + '/angularController.js');
b.transform(require('browserify-fastjson'));
var res = fs.createWriteStream(__dirname + '/../public/json/ai_' + name + '.js')
b.bundle().pipe(res);