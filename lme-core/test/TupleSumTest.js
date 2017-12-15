var assert = require('assert')
var WorkBook = require('../src/JSWorkBook')
var FESContext = require('../src/fescontext')
var fs = require('fs')
require('../../math')
var fesjsApi = require('../').fesjs;
fesjsApi.addFunctions(require('../../formulajs-connect').formulajs);
//add excel-lookup, MatrixLookup
var excelPlugin = require('../../excel-connect').xlsxLookup;
fesjsApi.addFunctions(excelPlugin);
var wb = new WorkBook(new FESContext());
wb.importSolution(fs.readFileSync(__dirname + '/../../model-tests/KSP/KSP.ffl', 'utf8'), 'ffl');
wb.set('NrOfDaysChildcareWeek', 2, 'value', 0, 0)
wb.set('NrOfDaysChildcareWeek', 3, 'value', 0, 1)
assert(wb.get('NrOfDaysChildcareWeek', 'value', 0, 0) == 2)
assert(wb.get('NrOfDaysChildcareWeek', 'value', 0, 1) == 3)
assert(wb.get('TupleSumTest', 'value') == 5)
