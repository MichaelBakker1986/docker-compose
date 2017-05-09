var assert = require('assert')

var WorkBook = require('../fesjs/JSWorkBook')
var FESContext = require('../fesjs/fescontext')
require('../../ff-math/ff-math')
var fesjsApi = require('../ff-fes').fesjs;
var JUNIT = require('./JUNIT')
fesjsApi.addFunctions(require('../../ff-formulajs/ff-formulajs').formulajs);
//add excel-lookup, MatrixLookup
var excelPlugin = require('../../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup;
fesjsApi.addFunctions(excelPlugin);

var wb = new WorkBook(new FESContext());
wb.importSolution(JUNIT.getFile('../../ff-KSP/resources/KSP.ffl'), 'ffl');

var tyc = wb.get('TotalYearlyCosts');
var hoi = "";