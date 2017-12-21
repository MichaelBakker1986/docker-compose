var WorkBook = require('../../lme-core/src/JSWorkBook')
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator')
var Context = require('../../lme-core/src/Context')
var assert = require('assert')
require('../../math')
var CalculationFacade = require('../../lme-core').CalculationFacade;
CalculationFacade.addFunctions(require('../../formulajs-connect').formulajs);
var excelPlugin = require('../../excel-connect').xlsxLookup;
const log = require('ff-log')
CalculationFacade.addFunctions(excelPlugin);
excelPlugin.initComplete().then(function(matrix) {
    var wb = new WorkBook(new Context());
    wb.importSolution(require("fs").readFileSync(__dirname + '/KSP.ffl', "utf8"), 'ffl')
    wb.set('IncomeParent01', 25000)
    assert(wb.get('IncomeParent01') === 25000)
//same response from restApi
    var fesGetValue = CalculationFacade.getValue({
        columns: 3,
        properties: {value: true, title: true},
        values: wb.context.values
    }, 'KSP_IncomeParent01', 0);
    assert(fesGetValue[0].value === 25000)
    var valueResponse = CalculationFacade.getValue({
        columns: 3,
        properties: {value: true, title: true},
        values: wb.context.values
    }, 'KSP_Q_FINAL_REPORT_VISIBLE', 0, "Ja");
    //assert(valueResponse[0].value === "Ja")
}).catch(function(err) {
    log.error(err)
    process.exit(1);
})