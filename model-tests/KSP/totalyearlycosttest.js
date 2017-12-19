var WorkBook = require('../../lme-core/src/JSWorkBook')
require('../../lme-core/exchange_modules/ffl2/RegisterPlainFFLDecorator')
var FESContext = require('../../lme-core/src/fescontext')
var log = require('ff-log')
var assert = require('assert')
require('../../math')
var fesjsApi = require('../../lme-core').CalculationFacade;
fesjsApi.addFunctions(require('../../formulajs-connect').formulajs);
var excelPlugin = require('../../excel-connect').xlsxLookup;
fesjsApi.addFunctions(excelPlugin);
excelPlugin.initComplete().then(function(matrix) {
    var wbKSP = new WorkBook(new FESContext());
    wbKSP.importSolution(require("fs").readFileSync(__dirname + '/KSP.ffl', "utf8"), 'ffl2_backwards')
    wbKSP.set('IncomeParent01', 25000)
    assert(wbKSP.get('IncomeParent01') === 25000)
//same response from restApi
    var fesGetValue = fesjsApi.fesGetValue({
        columns: 3,
        properties: {value: true, title: true},
        values: wbKSP.context.values
    }, 'KSP_IncomeParent01', 0);
    assert(fesGetValue[0].value === 25000)
    var choices = wbKSP.get('Q_FINAL_REPORT_VISIBLE', 'choices')
    var fesGetValue2 = fesjsApi.fesGetValue({
        columns: 3,
        properties: {value: true, title: true},
        values: wbKSP.context.values
    }, 'KSP_Q_FINAL_REPORT_VISIBLE', 0, "Ja");
    assert(fesGetValue2[0].value === "Ja")
}).catch(function(err) {
    throw err;
})