var assert = require('assert')
var WorkBook = require('../src/JSWorkBook');
var Context = require('../src/Context');
const CustomTimeModel = require('../src/TimeAxis');
const monthTimemodel = new CustomTimeModel(require('../resources/CustomImport.json'));

require('../exchange_modules/ffl/RegisterPlainFFLDecorator');
require('../../math')
const wb = new WorkBook(new Context(), monthTimemodel, 'detl');
wb.importSolution(require('fs').readFileSync(__dirname + '/../resources/TRENDNOTREND.ffl', 'utf8'), 'ffl')
assert.equal(wb.get('TOTAL', 'value', 10), 1234)
assert.equal(wb.get('TOTAL', 'value', 20), 5678)