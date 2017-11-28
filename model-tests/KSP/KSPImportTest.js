/**
 * KSP test cases
 * some if statements are not parsed correctly (if/If), changes are made within the KSP.ffl file
 * formulas containing ":" are not parsed correctly, changes are made within KSP.ffl file
 *
 */
const fs = require('fs')
var FormulaService = require('../../ff-fes/fesjs/FormulaService')
var WorkBook = require('../../ff-fes/fesjs/JSWorkBook')
var FESContext = require('../../ff-fes/fesjs/fescontext')
var log = require('ff-log')
var assert = require('assert')
require('../../ff-math/ff-math')
var fesjsApi = require('../../ff-fes/ff-fes').fesjs;
fesjsApi.addFunctions(require('../../ff-formulajs/ff-formulajs').formulajs);
//add excel-lookup, MatrixLookup
var excelPlugin = require('../../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup;
fesjsApi.addFunctions(excelPlugin);
excelPlugin.initComplete.then(function(matrix) {
    var wb = new WorkBook(new FESContext());
    wb.importSolution("" + fs.readFileSync(__dirname + '/KSP.ffl'), 'ffl')

})
