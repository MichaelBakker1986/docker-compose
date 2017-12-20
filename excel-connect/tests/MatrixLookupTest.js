var WorkBook = require('../../lme-core/src/JSWorkBook')
var SolutionFacade = require('../../lme-core/src/SolutionFacade')
var Context = require('../../lme-core/src/Context')
var log = require('ff-log')
var assert = require('assert')
var CalculationFacade = require('../../lme-core').CalculationFacade;
var excelPlugin = require('../excel-connect').xlsxLookup;
CalculationFacade.addFunctions(excelPlugin);
excelPlugin.initComplete('KSP').then(function(matrix) {
    SolutionFacade.initVariables([{name: 'MATRIX_VALUES', expression: matrix}])
    var wb = new WorkBook(new Context());
    wb.createFormula("MatrixLookup('','YearlyChildCosts','Diapers',1)", 'MatrixLookupTest')
    wb.createFormula("MatrixLookup('','PremiumOutOfSchoolCare',18486,1)", 'MatrixLookupPremiumOutOfSchoolCare')
    wb.createFormula("MatrixLookup('','PremiumOutOfSchoolCare',23410,1)", 'MatrixLookupPremiumOutOfSchoolCare2')
    wb.createFormula("MatrixLookup('','YearlyChildCosts','Allowance',1)", 'YearlyChildCosts')
    assert(wb.get('MatrixLookupTest'), 300)
    assert(wb.get('MatrixLookupPremiumOutOfSchoolCare'), 0.94)
    assert(wb.get('MatrixLookupPremiumOutOfSchoolCare2'), 0.938)
    assert(wb.get('YearlyChildCosts') == 0, 0)
}).catch((err) => {
    log.error(err)
    process.exit(1);
})