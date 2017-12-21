/**
 * Convert Model into front-end distrobution
 * node exportLME_FFL {modelName}
 */
const browser = require('browserify');
const fs = require('fs')
const name = process.argv[2];
const fflType = 'importFFL2BackwardsCompatible';
const fileType = '.ffl';
const lmeAPI = require('./lme')
const log = require('ff-log')
const SolutionFacade = require('../../lme-core/src/SolutionFacade')
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator')
const CalculationFacade = require('../../lme-core').CalculationFacade;
const ExcelLookup = require('../../excel-connect/excel-connect').xlsxLookup;
CalculationFacade.addFunctions(ExcelLookup)
//quick-fix resolve XSLX name
var xlsxname = name.substring(0, 5) == "_tmp_" ? name.split('_')[name.split('_').length - 1] : name
ExcelLookup.initComplete(xlsxname).then(function(matrix) {
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
    let b = browser(options).ignore('escodegen').ignore('esprima').ignore('ff-log').ignore('tracer').ignore('ast-node-utils').ignore('*ast-node-utils*');
    b.add(__dirname + '/../../lme-core/exchange_modules/presentation/webexport.js');
    b.add(__dirname + '/lmeAPIWrapper.js');
    b.transform(require('browserify-fastjson'));
    var res = fs.createWriteStream(__dirname + '/../../git-connect/resources/' + name + '.js')
    b.bundle().pipe(res);
}).catch((err) => {
    log.error(err)
    process.exit(1);
})