require('../exchange_modules/presentation/webexport');
require('../exchange_modules/ffl/RegisterPlainFFLDecorator');
var assert = require('assert');
var JSWorkBook = require('../src/JSWorkBook');
var Context = require('../src/Context');
const context = new Context();
context.columnSize = 1;
context.columns = ['value']
var wb = new JSWorkBook(context);
wb.modelName = 'LGDTEST'
wb.importSolution(require('fs').readFileSync(__dirname + '/../resources/LGDTEST.ffl', 'utf-8'), 'ffl');

wb.set('AllocatedGuarantee', 'test', 'value', 0, 1)
const webExport = wb.export('webexport').nodes;
console.info(webExport)


