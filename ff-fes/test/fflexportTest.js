var assert = require('assert');
var parser = require('../exchange_modules/ffl/fflparser');//just let it inject into the GenericModelFile
var WorkBook = require('../fesjs/JSWorkBook');
var JUNIT = require('./JUNIT');
var FESContext = require('../fesjs/fescontext')
var fflTestModels = ['hierarchyTest', 'hierarchyTest'];

for (var i = 0; i < fflTestModels.length; i++) {
    var fflModelName = fflTestModels[i];
    var data = JUNIT.getFile(fflModelName + '.ffl');
    var wb = new WorkBook(new FESContext());

    wb.doImport(data, 'ffl');
    var validate = wb.validate();
    wb.fixAll();
    assert.ok(wb.validate().valid);
    var fflExport = wb.export('ffl');
    //debugging..
    if (!process.alltest) {
        console.info(fflExport);
    }
}
console.info('test fflExport succeed')