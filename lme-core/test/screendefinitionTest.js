var JUNIT = require('./JUNIT.js');
var log = require('ff-log')
require('../exchange_modules/screendefinition/screendefparser');//just let it inject into the FESFacade
require('../exchange_modules/ffl2/RegisterPlainFFLDecorator');//just let it inject into the FESFacade
var JSWorkBook = require('../src/JSWorkBook');
var assert = require('assert');
var data = require('../resources/scorecardtemplate.json');
var Context = require('../src/Context')
var wb = new JSWorkBook(new Context());

wb.importSolution(JSON.stringify(data, null, 2), 'screendefinition');
assert.ok(wb.validateImportedSolution().valid);
var screenDefexport = wb.export('screendefinition');
assert.notStrictEqual(screenDefexport, undefined);
assert.notStrictEqual(screenDefexport, null);
var actual = JSON.parse(wb.export('screendefinition'));
var expected = JSON.parse(JSON.stringify(data, null, 2));
JUNIT.validateTree(expected, actual, 'children', 'children', function(expected, actual) {
    //since variableName is optional, but leading in screenDefinition
    return actual.name === expected.variableName || expected.name;
})
if (log.TRACE) log.trace(screenDefexport)
log.debug('succes model [' + wb.getSolutionName() + ']');