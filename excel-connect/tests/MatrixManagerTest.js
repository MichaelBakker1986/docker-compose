const log = require('log6'), assert = require('assert')
const LMEFacade = require('../../lme-core').LMEFacade;
const excelPlugin = require('../excel-connect');
require('../../math');
LMEFacade.addFunctions(excelPlugin);
const MatrixManager = require('../MatrixManager')
excelPlugin.loadExcelFile(null, __dirname + '/TestExcelFile.xlsx').then(function(matrix) {
    const matrixManager = new MatrixManager();
    matrixManager.setMatrices(matrix)
    if (log.DEBUG) log.info(matrixManager.toFatrix())
}).catch(function(err) {
    log.error('error while reading excelfile', err)
})