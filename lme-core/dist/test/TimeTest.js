'use strict';

var _ = require('../');

var _assert = require('assert');

require('ffl-math');

require('../exchange_modules/ffl/RegisterPlainFFLDecorator');

var wb = new _.WorkBook(new _.Context());
wb.modelName = 'TIMETEST';
wb.updateValues();

wb.createFormula('\'JAN\'', 'ClientName', 'value', false, 'document', 'string');
wb.createFormula('ClientName', 'FormulaClientNameReference', 'value', false, 'column', 'string');

(0, _assert.equal)(wb.get('ClientName'), 'JAN');
(0, _assert.equal)(wb.get('ClientName', 'value', 0), 'JAN');
(0, _assert.equal)(wb.get('ClientName', 'value', 1), 'JAN');
(0, _assert.equal)(wb.get('ClientName', 'value', 2), 'JAN');
(0, _assert.equal)(wb.get('FormulaClientNameReference', 'value', 0), 'JAN');
(0, _assert.equal)(wb.get('FormulaClientNameReference', 'value', 1), 'JAN');
(0, _assert.equal)(wb.get('FormulaClientNameReference', 'value', 2), 'JAN');
wb.set('ClientName', 'PIET');
(0, _assert.equal)(wb.get('FormulaClientNameReference', 'value', 2), 'PIET');
wb.set('ClientName', 'KLAAS', 'value', 1);
(0, _assert.equal)(wb.get('FormulaClientNameReference', 'value', 2), 'KLAAS');

wb.createFormula('2017', 'YearNumber', 'value', false, 'column', 'number');
wb.createFormula('YearNumber', 'YearNumberReference', 'value', false, 'column', 'number');

(0, _assert.equal)(wb.get('YearNumberReference'), 2017);
wb.set('YearNumber', 2080, 'value', 5);
(0, _assert.equal)(wb.get('YearNumberReference'), 2017);
(0, _assert.equal)(wb.get('YearNumberReference', 'value', 5), 2080);

//will always reference to the document value
wb.createFormula('YearNumber[doc]', 'YearNumberReferenceDoc', 'value', false, 'document', 'number');
(0, _assert.equal)(wb.get('YearNumberReferenceDoc', 'value', 5), 2017);

/*TODO: will be implemented later//will always reference all values from giving variable
 wb.createFormula('YearNumber[all]', 'YearNumberReferenceAll', 'value', false, 'document', 'number')
 equal(wb.get('YearNumberReferenceAll'), 2017);*/

//Test HSUM function
wb.createFormula('HSUM(YearNumber,0,18)', 'YearNumberReferenceHSUM', 'value', false, 'document', 'number');
(0, _assert.equal)(wb.get('YearNumberReferenceHSUM'), 38386);