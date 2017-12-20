var assert = require('assert');
var log = require('ff-log')
require('../exchange_modules/ffl2/RegisterPlainFFLDecorator');//just let it inject into the FESFacade
require('../exchange_modules/ffl2/RegisterToFFL');//just let it inject into the FESFacade
var WorkBook = require('../src/JSWorkBook');
var JUNIT = require('./JUNIT');
var Context = require('../src/Context')
var fflTestModels = ['hierarchyTest', 'hierarchyTest'];

for (var i = 0; i < fflTestModels.length; i++) {
    var fflModelName = fflTestModels[i];
    var data = JUNIT.getFile(fflModelName + '.ffl');
    var wb = new WorkBook(new Context());
    wb.importSolution(data, 'ffl');
    var validate = wb.validateImportedSolution();
    wb.fixProblemsInImportedSolution();
    assert.ok(wb.validateImportedSolution().valid);
    var fflExport = wb.export('ffl').join('\n');
    //debugging..
    if (log.TRACE) log.trace(fflExport);
}