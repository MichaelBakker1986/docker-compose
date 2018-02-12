require('../exchange_modules/presentation/webexport');
require('../exchange_modules/ffl/RegisterPlainFFLDecorator');
require('../../math/ff-math');
var assert = require('assert');
var JSWorkBook = require('../src/JSWorkBook');
var Context = require('../src/Context');
const context = new Context({columnSize: 1, columns: ['value', 'visible']});
var wb = new JSWorkBook(context, null, null, {modelName: 'LGDTEST'});
wb.importSolution(require('fs').readFileSync(__dirname + '/../resources/LGDTEST.ffl', 'utf8'), 'ffl');
wb.set('AllocatedGuarantee', 'test', 'value', 0, 1)
const webExport = wb.export('webexport');
const rows = webExport.rows;
webExport.sort()
assert.equal(rows.length, 33);
console.info(rows[0].visible)