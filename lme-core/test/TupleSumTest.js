const assert = require('assert')
const WorkBook = require('../src/JSWorkBook')
require('../exchange_modules/ffl/RegisterPlainFFLDecorator')
const Context = require('../src/Context')
const YAxis = require('../src/YAxis')
require('../../math')
const CalculationFacade = require('../').CalculationFacade;
CalculationFacade.addFunctions(require('../../formulajs-connect').formulajs);
//add excel-lookup, MatrixLookup
const excelPlugin = require('../../excel-connect').xlsxLookup;
CalculationFacade.addFunctions(excelPlugin);
const wb = new WorkBook(new Context());
wb.importSolution(require('fs').readFileSync(__dirname + '/../../model-tests/KSP/KSP.ffl', 'utf8'), 'ffl');
wb.set('NrOfDaysChildcareWeek', 2, 'value', 0, 0)
wb.set('NrOfDaysChildcareWeek', 3, 'value', 0, 1)
assert(wb.get('NrOfDaysChildcareWeek', 'value', 0, 0) == 2)
assert(wb.get('NrOfDaysChildcareWeek', 'value', 0, 1) == 3)
assert(wb.get('TupleSumTest', 'value', undefined, YAxis[0].parent) == 5)
