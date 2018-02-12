const assert = require('assert');
const log = require('log6')
require('../exchange_modules/ffl/RegisterPlainFFLDecorator');
require('../exchange_modules/ffl/RegisterToFFL');
require('../../math/ff-math');
const WorkBook = require('../src/JSWorkBook');
const Context = require('../src/Context')
const fflTestModels = ['hierarchyTest', 'hierarchyTest'];

for (var i = 0; i < fflTestModels.length; i++) {
    var fflModelName = fflTestModels[i];
    var data = require('fs').readFileSync(__dirname + '/../resources/' + fflModelName + '.ffl', 'utf8')
    var wb = new WorkBook(new Context());
    wb.importSolution(data, 'ffl');
    var validate = wb.validateImportedSolution();
    wb.fixProblemsInImportedSolution();
    assert.ok(wb.validateImportedSolution().valid);
    var fflExport = wb.export('ffl').join('\n');
    //debugging..
    if (log.TRACE) log.trace(fflExport);
}