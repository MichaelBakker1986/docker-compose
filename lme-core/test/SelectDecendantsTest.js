var assert = require('assert')
var WorkBook = require('../src/JSWorkBook');
var Context = require('../src/Context');
require('../exchange_modules/ffl/RegisterPlainFFLDecorator');
require('../../math')
const log = require('log6')
var wb = new WorkBook(new Context());
wb.modelName = 'SELECTDESCENDANTS'
wb.importSolution(require('fs').readFileSync(__dirname + '/../resources/SELECTDESCENDANTS.ffl', 'utf8'), 'ffl')
assert.equal(wb.get('Q_ROOT'), 2, wb.get('Q_ROOT', 'title'))
log.info(wb.get('Q_MAP01'))
assert.equal(wb.get('Q_MAP01'), 0, wb.get('Q_MAP01', 'title'))
wb.set('Q_MAP02_SUB', 10)
wb.set('Q_MAP03', 10)
assert.equal(wb.get('Q_MAP01'), 1, wb.get('Q_MAP01', 'title'))
wb.set('Q_MAP02_SUB', null)
assert.equal(wb.get('Q_MAP01'), 0, wb.get('Q_MAP01', 'title'))
