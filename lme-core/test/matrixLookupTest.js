const assert = require('assert')
const WorkBook = require('../src/JSWorkBook')
const Context = require('../src/Context')
const log = require('ff-log')
require('../../math')
const CalculationFacade = require('../').CalculationFacade;
CalculationFacade.addFunctions(require('../../formulajs-connect/formulajs').formulajs);
const excelPlugin = require('../../excel-connect/excel-connect').xlsxLookup;
CalculationFacade.addFunctions(excelPlugin);
excelPlugin.initComplete('KSP').then(function(matrix) {
    var wb = new WorkBook(new Context());
    wb.importSolution(require('fs').readFileSync(__dirname + '/../../model-tests/KSP/KSP.ffl', 'utf8'), 'ffl');
    assert(wb.get('ActualDiapers') === 300);
}).catch((err) => {
    log.error(err)
    process.exit(1);
});