var JUNIT = require('./JUNIT.js');
var log = require('ff-log')
require('../exchange_modules/screendefinition/screendefparser');//just let it inject into the FESFacade
require('../exchange_modules/ffl/fflparser');//just let it inject into the FESFacade
var JSWorkBook = require('../fesjs/JSWorkBook');
var assert = require('assert');
//var data = JUNIT.getFile('scorecardtemplate.json');
var data = require('../resources/scorecardtemplate.json');
JUNIT.print(data)
var FESContext = require('../fesjs/fescontext')
var wb = new JSWorkBook(new FESContext());

wb.importSolution(JSON.stringify(data, null, 2), 'screendefinition');
assert.ok(wb.validateImportedSolution().valid);
var screenDefexport = wb.export('screendefinition');
assert.notStrictEqual(screenDefexport, undefined);
assert.notStrictEqual(screenDefexport, null);
/*var node = wb.getNode('Balans')
 assert.equal(node.rowId, 'Balans');
 assert.equal(node.name, 'BUDGETMODEL_Balans_value');*/
var actual = JSON.parse(wb.export('screendefinition'));
var expected = JSON.parse(JSON.stringify(data, null, 2));
JUNIT.validateTree(expected, actual, 'children', 'children', function(expected, actual) {
    //since variableName is optional, but leading in screenDefinition
    return actual.name === expected.variableName || expected.name;
})
if (log.TRACE) log.trace(screenDefexport)
log.debug('succes model [' + wb.getSolutionName() + ']');
if (log.TRACE) log.trace(wb.export('ffl'))
