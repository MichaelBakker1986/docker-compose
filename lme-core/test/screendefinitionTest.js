var log = require('log6')
require('../exchange_modules/screendefinition/screendefparser');//just let it inject into the FESFacade
require('../exchange_modules/ffl/RegisterPlainFFLDecorator');//just let it inject into the FESFacade
var JSWorkBook = require('../src/JSWorkBook');
var assert = require('assert');
var data = require('../resources/scorecardtemplate.json');
var Context = require('../src/Context')
var wb = new JSWorkBook(new Context());

function arraysEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (a == null) {
        if (b == null) {
            return true;
        }
        return b.length == 0;
    }
    if (b == null) {
        if (a == null) {
            return true;
        }
        return a.length == 0;
    }
    return a.length == b.length;
};

assert.ok(arraysEqual(undefined, undefined))
assert.ok(arraysEqual(null, undefined))
assert.ok(arraysEqual(undefined, null))
assert.ok(arraysEqual([], null))
assert.ok(arraysEqual(undefined, []))
assert.ok(!arraysEqual([1, 2], [1]))

function validateTree(expected, actual, expectedChildrenProperty, actualChildrenProperty, equalsFunction) {
    assert.ok(equalsFunction(expected, actual))
    var expectedChildren = expected[expectedChildrenProperty];
    var actualChildren = actual[actualChildrenProperty];
    arraysEqual(expectedChildren, actualChildren);
    if (expectedChildren !== undefined && actualChildren !== undefined) {
        for (var i = 0; i < expectedChildren.length; i++) {
            validateTree(expectedChildren[i], actualChildren[i], expectedChildrenProperty, actualChildrenProperty, equalsFunction);
        }
    }
};
wb.importSolution(JSON.stringify(data, null, 2), 'screendefinition');
assert.ok(wb.validateImportedSolution().valid);
var screenDefexport = wb.export('screendefinition');
assert.notStrictEqual(screenDefexport, undefined);
assert.notStrictEqual(screenDefexport, null);
var actual = JSON.parse(wb.export('screendefinition'));
var expected = JSON.parse(JSON.stringify(data, null, 2));
validateTree(expected, actual, 'children', 'children', function(expected, actual) {
    //since variableName is optional, but leading in screenDefinition
    return actual.name === expected.variableName || expected.name;
})
if (log.TRACE) log.trace(screenDefexport)
log.debug('succes model [' + wb.getSolutionName() + ']');