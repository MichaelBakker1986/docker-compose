var browser = require('browserify');
var fastjson = require('browserify-fastjson');

var fs = require('fs')
var name = process.argv[2];
var ffl = fs.readFileSync(__dirname + '/../public/json/' + name + '.ffl')
var lmeAPI = require('./lme')
const lmeApi = new lmeAPI()
lmeApi.importFFL('' + ffl);
var lmeExport = lmeApi.exportLME();
let options = {
    insertGlobals: true,
    insertGlobalVars: {
        JSON_MODEL: (file, dir) => {
            return (file.endsWith('angularController.js')) ? lmeExport : 'undefined';
        }
    },
    gzip: true,
    minify: true,
    insertGlobals: true,
    debug: false
};
let b = browser(options);
b.add(__dirname + '/angularController.js');
b.transform(fastjson);
var res = fs.createWriteStream(__dirname + '/../public/json/ai_' + name + '.js')
b.bundle().pipe(res);