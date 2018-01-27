require('../exchange_modules/jsonvalues/jsonvalues');
require('../exchange_modules/presentation/webexport');
var assert = require('assert');
var JSWorkBook = require('../src/JSWorkBook');
var Context = require('../src/Context');
var wb = new JSWorkBook(new Context());
wb.modelName = 'JSON_VALUES_TEST'
wb.createFormula('1+1', 'AB', 'value', false, 'document', 'number');

assert.equal(wb.get('AB'), 2);
wb.set('AB', 'anything')
wb.set('AB', 'anythingelse')
wb.set('AB', 'anythingelse213')
wb.set('AB', 100)
wb.set('AB', 1010)

let exportValues = wb.export('jsonvalues')
assert.equal(exportValues.length, 1, JSON.stringify(exportValues));

wb.createFormula('1+2', 'AB', 'title');
wb.set('AB', 'anythingTitle', 'title')

exportValues = wb.export('jsonvalues')
assert.equal(exportValues.length, 2, JSON.stringify(exportValues));

wb.importSolution(JSON.stringify(exportValues), 'jsonvalues')

