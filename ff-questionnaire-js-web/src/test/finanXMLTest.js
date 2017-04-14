//https://github.com/highsource/jsonix/wiki/Modules-and-Mappings
var finXML = require('../archive/exchange_modules/finanXML/finanXML.js');//just let it inject into the FESFacade
var jsonValues = require('../archive/exchange_modules/jsonvalues/jsonvalues.js');//just let it inject into the FESFacade
var WorkBook = require('../archive/fesjs/JSWorkBook.js');
var JUNIT = require('./JUNIT.js');
var assert = require('assert');
var data = require('./../resources/testValues.json');
var wb = new WorkBook();
var feedback = wb.doImport(JSON.stringify(data), 'jsonvalues');
var returnedDATA = wb.export('jsonvalues');
JUNIT.print(returnedDATA);
var finanXML = wb.export('finanXML');

assert.notStrictEqual(finanXML, undefined);
assert.notStrictEqual(finanXML, null);
assert.notStrictEqual(returnedDATA, undefined);
assert.notStrictEqual(returnedDATA, null);

JUNIT.print(finanXML);
console.info('Test FinanXML success')