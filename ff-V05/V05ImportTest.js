process.loglevel = "info";
global.loglevel = "info";
require("../ff-fes/exchange_modules/lme/lmeparser")
var WorkBook = require('../ff-fes/fesjs/JSWorkBook');
var FESContext = require('../ff-fes/fesjs/fescontext');
var log = require('ff-log');
require('../ff-math/ff-math');
var fesjsApi = require('../ff-fes/ff-fes').fesjs;
var JUNIT = require("../ff-fes/test/JUNIT");
fesjsApi.addFunctions(require("../ff-formulajs/ff-formulajs").formulajs);
//add excel-lookup, MatrixLookup
//var excelPlugin = require("../ff-fes-xlsx/ff-fes-xlsx").xlsxLookup;
//fesjsApi.addFunctions(excelPlugin);
MatrixLookup = function() {
    return 0;
}
log.info('excel done');
var wb = new WorkBook(new FESContext());
//wb.importSolution(JUNIT.getFile("../../ff-V05/resources/V05.FFL"), "ffl");
//wb.importSolution(JUNIT.getFile("../../ff-KSP/resources/KSP.ffl"), "ffl");
var v05 = require('../lme/public/json/V05_canvas.json')
wb.importSolution(v05, "lme");
//wb.fixProblemsInImportedSolution();
//console.info(wb.export('lme'))
