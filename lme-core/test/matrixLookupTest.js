var assert = require('assert')
var WorkBook = require('../src/JSWorkBook')
var FESContext = require('../src/fescontext')
require('../../math')
var CalculationFacade = require('../').CalculationFacade;
CalculationFacade.addFunctions(require('../../formulajs-connect/formulajs').formulajs);
var excelPlugin = require('../../excel-connect/excel-connect').xlsxLookup;
CalculationFacade.addFunctions(excelPlugin);
excelPlugin.initComplete('KSP').then(function(matrix) {
    var wb = new WorkBook(new FESContext());
    wb.importSolution(require('fs').readFileSync(__dirname + '/../../model-tests/KSP/KSP.ffl', 'utf8'), 'ffl');
    assert(wb.get('ActualDiapers') === 300);
}).catch((err) => {
    throw err;
});