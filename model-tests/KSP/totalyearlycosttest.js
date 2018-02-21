const WorkBook = require('../../lme-core/src/JSWorkBook'), Context = require('../../lme-core/src/Context')
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator')
const assert = require('assert')
require('../../math')
const LMEFacade = require('../../lme-core').LMEFacade;
LMEFacade.addFunctions(require('../../formulajs-connect').formulajs);
const excelPlugin = require('../../excel-connect');
const log = require('log6')
LMEFacade.addFunctions(excelPlugin);
excelPlugin.loadExcelFile('KSP').then(function(matrix) {
    const wb = new WorkBook(new Context());
    wb.importSolution(require("fs").readFileSync(__dirname + '/KSP.ffl', "utf8"), 'ffl')
    wb.set('IncomeParent01', 25000)
    assert.equal(wb.get('IncomeParent01'), 25000)
//same response from restApi
    const fesGetValue = LMEFacade.getValue({
        columns: 3,
        properties: {value: true, title: true},
        values: wb.context.values
    }, 'KSP_IncomeParent01');
    assert.equal(fesGetValue[0].value, 25000)
    const valueResponse = LMEFacade.getValue({
        columns: 3,
        properties: {value: true, title: true},
        values: wb.context.values
    }, 'KSP_Q_FINAL_REPORT_VISIBLE', 0, "Ja");
    assert.equal(valueResponse.length, 0, 'Choose to return empty array when setting value')
}).catch(function(err) {
    log.error(err)
    process.exit(1);
})