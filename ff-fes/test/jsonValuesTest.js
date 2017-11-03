require('../exchange_modules/jsonvalues/jsonvalues');//just let it inject into the FESFacade
var assert = require('assert');
var JSWorkBook = require('../fesjs/JSWorkBook');
var FESContext = require('../fesjs/fescontext');
var wb = new JSWorkBook(new FESContext());
//wb.modelName = 'HIGHCHART'//FIX...
wb.createFormula('1+1', 'AB');
assert.equal(wb.get('AB'), 2);
wb.set('AB', 'anything')

let exportValues = wb.export('jsonvalues')
assert.equal(exportValues.length, 1, JSON.stringify(exportValues));

wb.createFormula('1+2', 'AB', 'title');
wb.set('AB', 'anythingTitle', 'title')

exportValues = wb.export('jsonvalues')
assert.equal(exportValues.length, 2, JSON.stringify(exportValues));

wb.importSolution(JSON.stringify(exportValues), 'jsonvalues')

