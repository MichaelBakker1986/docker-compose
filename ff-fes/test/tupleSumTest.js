var assert = require('assert')
var WorkBook = require('../fesjs/JSWorkBook')
var FESContext = require('../fesjs/fescontext')
var fs = require('fs')
require('../../ff-math/ff-math')
var fesjsApi = require('../ff-fes').fesjs;
fesjsApi.addFunctions(require('../../ff-formulajs/ff-formulajs').formulajs);
//add excel-lookup, MatrixLookup
var excelPlugin = require('../../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup;
fesjsApi.addFunctions(excelPlugin);
var wb = new WorkBook(new FESContext());
wb.importSolution(fs.readFileSync(__dirname + '/../../lme-model-tests/KSP/KSP.ffl', 'utf8'), 'ffl');
wb.set('NrOfDaysChildcareWeek', 2, 'value', 0, 0)
wb.set('NrOfDaysChildcareWeek', 3, 'value', 0, 1)
assert(wb.get('NrOfDaysChildcareWeek', 'value', 0, 0) == 2)
assert(wb.get('NrOfDaysChildcareWeek', 'value', 0, 1) == 3)
assert(wb.get('TupleSumTest', 'value') == 5)
