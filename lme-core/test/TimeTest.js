var assert = require('assert')
var WorkBook = require('../src/JSWorkBook');
var Context = require('../src/Context');
require('../../math')
require('../exchange_modules/ffl/RegisterPlainFFLDecorator')
var wb = new WorkBook(new Context());
wb.modelName = "TIMETEST"
wb.updateValues();

wb.createFormula("'JAN'", 'ClientName', 'value', false, 'document', 'string')
wb.createFormula('ClientName', 'FormulaClientNameReference', 'value', false, 'column', 'string')

assert.equal(wb.get('ClientName'), 'JAN');
assert.equal(wb.get('ClientName', 'value', 0), 'JAN');
assert.equal(wb.get('ClientName', 'value', 1), 'JAN');
assert.equal(wb.get('ClientName', 'value', 2), 'JAN');
assert.equal(wb.get('FormulaClientNameReference', 'value', 0), 'JAN');
assert.equal(wb.get('FormulaClientNameReference', 'value', 1), 'JAN');
assert.equal(wb.get('FormulaClientNameReference', 'value', 2), 'JAN');
wb.set('ClientName', 'PIET')
assert.equal(wb.get('FormulaClientNameReference', 'value', 2), 'PIET');
wb.set('ClientName', 'KLAAS', 'value', 1)
assert.equal(wb.get('FormulaClientNameReference', 'value', 2), 'KLAAS');

wb.createFormula("2017", 'YearNumber', 'value', false, 'column', 'number')
wb.createFormula('YearNumber', 'YearNumberReference', 'value', false, 'column', 'number')

assert.equal(wb.get('YearNumberReference'), 2017);
wb.set('YearNumber', 2080, 'value', 5)
assert.equal(wb.get('YearNumberReference'), 2017);
assert.equal(wb.get('YearNumberReference', 'value', 5), 2080);

//will always reference to the document value
wb.createFormula('YearNumber[doc]', 'YearNumberReferenceDoc', 'value', false, 'document', 'number')
assert.equal(wb.get('YearNumberReferenceDoc', 'value', 5), 2017);

/*TODO: will be implemented later//will always reference all values from giving variable
wb.createFormula('YearNumber[all]', 'YearNumberReferenceAll', 'value', false, 'document', 'number')
assert.equal(wb.get('YearNumberReferenceAll'), 2017);*/

//Test HSUM function
wb.createFormula('HSUM(YearNumber,0,18)', 'YearNumberReferenceHSUM', 'value', false, 'document', 'number')
assert.equal(wb.get('YearNumberReferenceHSUM'), 38386);


wb.importSolution(require('fs').readFileSync(__dirname + '/../resources/TIMETEST.ffl', 'utf-8'), 'ffl')
assert.equal(200, wb.get('FormulaSetTest', 'value', 1))
assert.equal(200, wb.get('FormulaSetTest', 'value', 10))
assert.equal(100, wb.get('FormulaSetTest', 'value', 30))
