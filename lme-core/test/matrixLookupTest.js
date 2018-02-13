const assert = require('assert')
const WorkBook = require('../src/JSWorkBook')
const Context = require('../src/Context')
const log = require('log6')
require('../../math')
const LMEFacade = require('../').LMEFacade;
LMEFacade.addFunctions(require('../../formulajs-connect/formulajs').formulajs);
const excelPlugin = require('../../excel-connect/excel-connect').xlsxLookup;
LMEFacade.addFunctions(excelPlugin);
excelPlugin.initComplete('KSP').then(function(matrix) {
    var wb = new WorkBook(new Context());
    wb.importSolution(require('fs').readFileSync(__dirname + '/../../model-tests/KSP/KSP.ffl', 'utf8'), 'ffl');
    assert(wb.get('ActualDiapers') === 300);
}).catch((err) => {
    log.error(err)
    process.exit(1);
});