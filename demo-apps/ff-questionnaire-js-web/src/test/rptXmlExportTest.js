var JUNIT = require('./JUNIT.js');
var JSWorkBook = require('../archive/fesjs/JSWorkBook.js');
require('../archive/exchange_modules/rptXml/rptXmlParser.js');//let it inject
var assert = require('assert');
var data = JUNIT.getFile('test.json');
var wb = new JSWorkBook();
wb.importSolution(data, 'rptXml');
assert.ok(wb.validateImportedSolution().valid);
var rptXmlexport = wb.export('rptXml');
assert.notStrictEqual(rptXmlexport, undefined);
assert.notStrictEqual(rptXmlexport, null);
console.info('Success finished test rptXML')