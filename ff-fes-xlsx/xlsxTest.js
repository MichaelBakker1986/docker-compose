global.loglevel = 'debug'
var WorkBook = require('../ff-fes/fesjs/JSWorkBook')
var FESContext = require('../ff-fes/fesjs/fescontext')
var log = require('ff-log')
var assert = require('assert')
var fesjsApi = require('../ff-fes/ff-fes').fesjs;
var excelPlugin = require('./ff-fes-xlsx').xlsxLookup;
fesjsApi.addFunctions(excelPlugin);
excelPlugin.initComplete.then(function () {
    log.info('excel done')
    var wb = new WorkBook(new FESContext());
    wb.createFormula("MatrixLookup('','ABC',6,7)", 'MatrixLookupTest')
    log.info(wb.get('MatrixLookupTest'))
})

