/**
 * Created by Gyllion-PC on 13-4-2017.
 */
global.loglevel = 'debug'
var WorkBook = require('../ff-fes/fesjs/JSWorkBook')
var FESContext = require('../ff-fes/fesjs/fescontext')
var log = require('ff-log')
var assert = require('assert')
require('../ff-math/ff-math')
var fesjsApi = require('../ff-fes/ff-fes').fesjs;
var JUNIT = require('../ff-fes/test/JUNIT');
fesjsApi.addFunctions(require('../ff-formulajs/ff-formulajs').formulajs);
//add excel-lookup, MatrixLookup
var excelPlugin = require('../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup;
fesjsApi.addFunctions(excelPlugin);

excelPlugin.initComplete.then(function () {
    console.log("Hello world");
    var wbKSP = new WorkBook(new FESContext());
    var fs = require("fs");
    var buf = fs.readFileSync('resources/KSP.ffl', "utf8");
    wbKSP.importSolution((buf), 'ffl')
    wbKSP.set('IncomeParent01', 25000)
    assert(wbKSP.get('IncomeParent01') === 25000)

    //same response from restApi
    var fesGetValue = fesjsApi.fesGetValue({
        columns: 3,
        properties: {value: true, title: true},
        values: wbKSP.context.values
    }, 'KSP_IncomeParent01', 0);
    assert(fesGetValue[0].value === 25000)
    var fesGetValue2 = fesjsApi.fesGetValue({
        columns: 3,
        properties: {value: true, title: true},
        values: wbKSP.context.values
    }, 'KSP_Q_FINAL_REPORT_VISIBLE', 0, "Ja");
    assert(fesGetValue2[0].value === 1)
    assert(false == true);
}).catch(function(err){
    log.error(err)
    assert(false, err)
});