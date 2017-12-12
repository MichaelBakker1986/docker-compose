/**
 * Convert Model into front-end distrobution
 * node exportLME_FFL {modelName}
 */
var browser = require('browserify');
var fs = require('fs')
var name = process.argv[2];
var fflType = 'importFFL2BackwardsCompatible';
const fileType = '.ffl';

var lmeAPI = require('./lme')
const SolutionFacade = require('../../lme-core/src/SolutionFacade')
require('../../lme-core/exchange_modules/ffl2/RegisterPlainFFLDecorator')
var fesjsApi = require('../../lme-core/ff-fes').fesjs;
const xlsx = require('../../excel-connect/excel-connect').xlsxLookup;
fesjsApi.addFunctions(xlsx)
//quick-fix resolve XSLX name
var xlsxname = name.substring(0, 5) == "_tmp_" ? name.split('_')[name.split('_').length - 1] : name
xlsx.initComplete(xlsxname).then(function(matrix) {
    SolutionFacade.addVariables([{name: 'MATRIX_VALUES', expression: matrix}])

    LME = new lmeAPI()
    LME.lme.modelName = name
    let rawData = fs.readFileSync(__dirname + '/../../git-connect/resources/' + name + fileType, 'utf8');
    if (fileType == '.ffl2') {
        rawData = JSON.parse(rawData)
    }
    LME[fflType](rawData);
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
    b.add(__dirname + '/../../lme-core/exchange_modules/presentation/webexport_with_template.js');
    b.add(__dirname + '/lmeAPIWrapper.js');
    b.transform(require('browserify-fastjson'));
    var res = fs.createWriteStream(__dirname + '/../../git-connect/resources/' + name + '.js')
    b.bundle().pipe(res);
}).catch((err) => {
    console.error(err)
    throw err
})