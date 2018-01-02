const assert = require('assert')
const WorkBook = require('../src/JSWorkBook');
const Context = require('../src/Context');
const log = require('log6')
require('../../math')
require('../exchange_modules/ffl/RegisterPlainFFLDecorator')
var wb = new WorkBook(new Context());
wb.modelName = "TIMETEST"

wb.importSolution(require('fs').readFileSync(__dirname + '/../resources/TIMETEST.ffl', 'utf-8'), 'ffl')
assert.equal(200, wb.get('FormulaSetTest', 'value', 1), wb.get('FormulaSetTest', 'title'))
assert.equal(200, wb.get('FormulaSetTest', 'value', 10), wb.get('FormulaSetTest', 'title'))
assert.equal(100, wb.get('FormulaSetTest', 'value', 30), wb.get('FormulaSetTest', 'title'))

assert.equal(1, wb.get('FirstNoTrendMainPeriodTValue', 'value', 30));
assert.equal(1, wb.get('FirstNoTrendMainPeriodTValue', 'value', 30));

//, wb.get('FirstNoTrendMainPeriodTValue', 'title')