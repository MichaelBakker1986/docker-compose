var assert = require('assert')
var WorkBook = require('../src/JSWorkBook')
require('../exchange_modules/ffl2/RegisterPlainFFLDecorator')
var Context = require('../src/Context')
var fs = require('fs')
require('../../math')
var CalculationFacade = require('../').CalculationFacade;
CalculationFacade.addFunctions(require('../../formulajs-connect').formulajs);
//add excel-lookup, MatrixLookup
var excelPlugin = require('../../excel-connect').xlsxLookup;
CalculationFacade.addFunctions(excelPlugin);
var wb = new WorkBook(new Context());
wb.importSolution(fs.readFileSync(__dirname + '/../../model-tests/KSP/KSP.ffl', 'utf8'), 'ffl');
wb.set('NrOfDaysChildcareWeek', 2, 'value', 0, 0)
wb.set('NrOfDaysChildcareWeek', 3, 'value', 0, 1)
assert(wb.get('NrOfDaysChildcareWeek', 'value', 0, 0) == 2)
assert(wb.get('NrOfDaysChildcareWeek', 'value', 0, 1) == 3)
assert(wb.get('TupleSumTest', 'value') == 5)
