/**
 * KSP test cases
 * some if statements are not parsed correctly (if/If), changes are made within the KSP.ffl file
 * formulas containing ":" are not parsed correctly, changes are made within KSP.ffl file
 *
 */
global.loglevel = "info";
var FormulaService = require('../../ff-fes/fesjs/FormulaService')
var WorkBook = require('../../ff-fes/fesjs/JSWorkBook')
var FESContext = require('../../ff-fes/fesjs/fescontext')
var log = require('ff-log')
var assert = require('assert')
require('../../ff-math/ff-math')
var fesjsApi = require('../../ff-fes/ff-fes').fesjs;
var JUNIT = require('../../ff-fes/test/JUNIT');
fesjsApi.addFunctions(require('../../ff-formulajs/ff-formulajs').formulajs);
//add excel-lookup, MatrixLookup
var excelPlugin = require('../../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup;
fesjsApi.addFunctions(excelPlugin);
log.info('excel done')
var wb = new WorkBook(new FESContext());
wb.importSolution(JUNIT.getFile('../../lme-model-tests/resources/KSP.ffl'), 'ffl')