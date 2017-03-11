var assert = require('assert');
var parser = require('../archive/ffl/fflparser.js');//just let it inject into the GenericModelFile
var WorkBook = require('../archive/fesjs/JSWorkBook.js');
var JUNIT = require('./JUNIT.js');

var fflTestModels = ['hierarchyTest', 'hierarchyTest'];

for (var i = 0; i < fflTestModels.length; i++)
{
    var fflModelName = fflTestModels[i];
    var data = JUNIT.getFile(fflModelName + '.ffl');
    var wb = new WorkBook();

    wb.doImport(data, 'ffl');
    var validate = wb.validate();
    validate.fixAll();
    assert.ok(wb.validate().valid);
    var fflExport = wb.export('ffl');
    //debugging..
    if (!process.alltest)
    {
        console.info(fflExport);
    }
}
console.info('test fflExport succeed')