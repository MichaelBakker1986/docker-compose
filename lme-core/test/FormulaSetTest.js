const assert = require('assert')
const WorkBook = require('../src/JSWorkBook');
const Context = require('../src/Context');
const log = require('log6')
require('../../math')
require('../exchange_modules/ffl/RegisterPlainFFLDecorator')
const CustomTimeModel = require('../src/TimeAxis');
const monthTimemodel = new CustomTimeModel(require('../resources/CustomImport.json'));
const wb = new WorkBook(new Context(), monthTimemodel, 'detl');
wb.modelName = "TIMETEST"

/**
 * 12 detail columns is included with quart*4 + half*2 + year*1 a total of 19 columns. (0 based that is 18)
 * So with 19 columns(NoTrend) detail 0-11 will be first year, 18-29 next year (TREND)
 */
wb.importSolution(require('fs').readFileSync(__dirname + '/../resources/TIMETEST.ffl', 'utf-8'), 'ffl')
assert.equal(200, wb.get('FormulaSetTest', 'value', 1), wb.get('FormulaSetTest', 'title'))
assert.equal(200, wb.get('FormulaSetTest', 'value', 10), wb.get('FormulaSetTest', 'title'))
assert.equal(200, wb.get('FormulaSetTest', 'value', 11), wb.get('FormulaSetTest', 'title'))

assert.equal(100, wb.get('FormulaSetTest', 'value', 18), wb.get('FormulaSetTest', 'title'))
assert.equal(100, wb.get('FormulaSetTest', 'value', 40), wb.get('FormulaSetTest', 'title'))

assert.equal(1, wb.get('FirstNoTrendMainPeriodTValue', 'value', 18));
assert.equal(1, wb.get('FirstNoTrendMainPeriodTValue', 'value', 18));


assert.equal(100, wb.get('FlowFigure', 'value', 1));
assert.equal(100, wb.get('FlowFigure', 'value', 1));

//, wb.get('FirstNoTrendMainPeriodTValue', 'title')