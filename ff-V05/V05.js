var log = require('ff-log');
var FESContext = require('../ff-fes/fesjs/fescontext');
var WorkBook = require('../ff-fes/fesjs/JSWorkBook');
require('../ff-math/ff-math');
var fesjsApi = require('../ff-fes/ff-fes').fesjs;
fesjsApi.addFunctions(require("../ff-formulajs/ff-formulajs").formulajs);
//add excel-lookup, MatrixLookup
//var excelPlugin = require("../ff-fes-xlsx/ff-fes-xlsx").xlsxLookup;
//fesjsApi.addFunctions(excelPlugin);
log.info('excel done');
let workBook = new WorkBook(new FESContext());
module.exports = workBook;

