/**
 * KSP test cases
 * some if statements are not parsed correctly (if/If), changes are made within the KSP.ffl file
 * formulas containing ":" are not parsed correctly, changes are made within KSP.ffl file
 *
 */
const fs = require('fs')
var FormulaService = require('../../lme-core/fesjs/FormulaService')
var WorkBook = require('../../lme-core/fesjs/JSWorkBook')
var FESContext = require('../../lme-core/fesjs/fescontext')
var log = require('ff-log')
var assert = require('assert')
require('../../math/ff-math')
var fesjsApi = require('../../lme-core/ff-fes').fesjs;
fesjsApi.addFunctions(require('../../formulajs-connect').formulajs);
//add excel-lookup, MatrixLookup
var excelPlugin = require('../../excel-connect/excel-connect').xlsxLookup;
fesjsApi.addFunctions(excelPlugin);
excelPlugin.initComplete.then(function(matrix) {
    var wb = new WorkBook(new FESContext());
    wb.importSolution("" + fs.readFileSync(__dirname + '/KSP.ffl'), 'ffl')

})
