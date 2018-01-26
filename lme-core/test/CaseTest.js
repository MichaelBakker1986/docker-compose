//TODO: convert into JBehave Story.
var assert = require('assert')
var WorkBook = require('../src/JSWorkBook');
var Context = require('../src/Context');
require('../exchange_modules/ffl/RegisterPlainFFLDecorator');
require('../../math')
var wb = new WorkBook(new Context());
wb.importSolution(require('fs').readFileSync(__dirname + '/../resources/CASETEST.ffl', 'utf8'), 'ffl')
assert.equal(wb.get('CASETESTVARIABLE'), 535)
wb.set('VALUE', 1)
assert.equal(wb.get('CASETESTVARIABLE'), 906)
