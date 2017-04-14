var JUNIT = require('./JUNIT.js');
require('../archive/exchange_modules/screendefinition/screendefparser.js');//just let it inject into the FESFacade
require('../archive/ffl/fflparser.js');//just let it inject into the FESFacade
var JSWorkBook = require('../archive/fesjs/JSWorkBook.js');
var assert = require('assert');
//var data = JUNIT.getFile('scorecardtemplate.json');
var data = require('../resources/scorecardtemplate.json');
JUNIT.print(data)
var log = require('ff-log')
var wb = new JSWorkBook();
wb.doImport(JSON.stringify(data, null, 2), 'screendefinition');
assert.ok(wb.validate().valid);
var screenDefexport = wb.export('screendefinition');
assert.notStrictEqual(screenDefexport, undefined);
assert.notStrictEqual(screenDefexport, null);
/*var node = wb.getNode('Balans')
 assert.equal(node.rowId, 'Balans');
 assert.equal(node.name, 'BUDGETMODEL_Balans_value');*/
var actual = JSON.parse(wb.export('screendefinition'));
var expected = JSON.parse(JSON.stringify(data, null, 2));
JUNIT.validateTree(expected, actual, 'children', 'children', function (expected, actual)
{
    //since variableName is optional, but leading in screenDefinition
    return actual.name === expected.variableName || expected.name;
})
JUNIT.print(screenDefexport);
log.info('succes model [' + wb.getRootNode().solutionName + ']');
JUNIT.print(wb.export('ffl'));