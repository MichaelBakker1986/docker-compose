/**
 * Convert Model into front-end distrobution
 * node exportLME_FFL {modelName}
 */
const browser = require('browserify');
const fs = require('fs')
const name = process.argv[2];
const fflType = 'importFFL';
const fileType = '.ffl';
const lmeAPI = require('./lme')
const log = require('log6')
const SolutionFacade = require('../../lme-core/src/SolutionFacade')
const Context = require('../../lme-core/src/Context')
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator')
const CalculationFacade = require('../../lme-core').CalculationFacade;
const ExcelLookup = require('../../excel-connect/excel-connect').xlsxLookup;
CalculationFacade.addFunctions(ExcelLookup)
//quick-fix resolve XSLX name
var xlsxname = name.substring(0, 5) == "_tmp_" ? name.split('_')[name.split('_').length - 1] : name
ExcelLookup.initComplete(xlsxname).then(function(matrix) {
    SolutionFacade.addVariables([{name: 'MATRIX_VALUES', expression: matrix}])

    if (name.indexOf('SCORECARDTESTMODEL') > -1) {
        const interval = 'detl';
        const timeModel = require('../../lme-core/resources/CustomImport.json')
        LME = new lmeAPI(timeModel, new Context({modelName: name}), interval);
    } else {
        LME = new lmeAPI(null, new Context({modelName: name}), null)
    }
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
    let b = browser(options).ignore('escodegen').ignore('esprima').ignore('log6').ignore('tracer').ignore('ast-node-utils').ignore('*ast-node-utils*');
    b.add(__dirname + '/../../lme-core/exchange_modules/presentation/webexport.js');
    b.add(__dirname + '/lmeAPIWrapper.js');
    b.transform(require('browserify-fastjson'));
    var res = fs.createWriteStream(__dirname + '/../../git-connect/resources/' + name + '.js')
    b.bundle().pipe(res);
}).catch((err) => {
    log.error(err)
    process.exit(1);
})