var assert = require('assert');
var log = require('ff-log')
var parser = require('../exchange_modules/ffl/fflparser');//just let it inject into the FESFacade
var WorkBook = require('../src/JSWorkBook');
var JUNIT = require('./JUNIT');
var FESContext = require('../src/fescontext')
var fflTestModels = ['hierarchyTest', 'hierarchyTest'];

for (var i = 0; i < fflTestModels.length; i++) {
    var fflModelName = fflTestModels[i];
    var data = JUNIT.getFile(fflModelName + '.ffl');
    var wb = new WorkBook(new FESContext());

    wb.importSolution(data, 'ffl');
    var validate = wb.validateImportedSolution();
    wb.fixProblemsInImportedSolution();
    assert.ok(wb.validateImportedSolution().valid);
    var fflExport = wb.export('ffl');
    //debugging..
    if (log.TRACE) {
        log.trace(fflExport);
    }
}