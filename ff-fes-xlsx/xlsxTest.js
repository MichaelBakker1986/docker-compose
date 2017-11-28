var WorkBook = require('../lme-core/fesjs/JSWorkBook')
var SolutionFacade = require('../lme-core/fesjs/SolutionFacade')
var FESContext = require('../lme-core/fesjs/fescontext')
var log = require('ff-log')
var assert = require('assert')
var fesjsApi = require('../lme-core/ff-fes').fesjs;
var excelPlugin = require('./ff-fes-xlsx').xlsxLookup;
fesjsApi.addFunctions(excelPlugin);
excelPlugin.initComplete.then(function(matrix) {
    SolutionFacade.addVariables([{name: 'MATRIX_VALUES', expression: matrix}])
    var wb = new WorkBook(new FESContext());
    wb.createFormula("MatrixLookup('','LeeftijdGeslachtGebondenKosten','Diapers',1)", 'MatrixLookupTest')
    assert(wb.get('MatrixLookupTest'), 300)
})