'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../index');

require('ffl-math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wb = new _index.WorkBook(new _index.Context());
(0, _assert2.default)('aIFRS-EUa'.indexOf('IFRS-EU') > 0);
wb.createFormula('\'IFRS-EU\'', 'FES_LAYOUT');
wb.createFormula('Pos(\'IFRS-EU\',FES_LAYOUT)', 'POS_LAYOUT');
(0, _assert.equal)(wb.get('POS_LAYOUT'), 0);
wb.set('FES_LAYOUT', 'IFRS-TEST');
(0, _assert.equal)(wb.get('POS_LAYOUT'), -1);
wb.set('FES_LAYOUT', 'IFRS-EU');
(0, _assert.equal)(wb.get('POS_LAYOUT'), 0, 'actual:' + wb.get('POS_LAYOUT'));
wb.createFormula('If(Pos(\'IFRS-EU\',\'IFRS-EU\')>0,1,2)', 'KSP_POSTEST');
(0, _assert.equal)(wb.get('KSP_POSTEST'), 2);
wb.createFormula('If(Pos(\'IFRS-EU\',FES_LAYOUT)>0,1,2)', 'KSP_POSTEST');
wb.set('FES_LAYOUT', 'IIFRS-EU');
(0, _assert.equal)(wb.get('KSP_POSTEST'), 1);
wb.createFormula('If(Pos(\'IFRS-EU\',FES_LAYOUT)>0,1,If(Pos(\'IFRS-PL\',FES_LAYOUT)>0,48,If(Pos(\'IFRS-Intl\',FES_LAYOUT)>0,2,0)))', 'FES_LAYOUTNR');
(0, _assert.equal)(wb.get('FES_LAYOUTNR'), 1);
wb.set('FES_LAYOUT', 'IIFRS-PL');
(0, _assert.equal)(wb.get('FES_LAYOUTNR'), 48);
wb.set('FES_LAYOUT', 'IIFRS-Intl');
(0, _assert.equal)(wb.get('FES_LAYOUTNR'), 2);

wb.createFormula('KSP_POSTEST[doc]', 'DOCUMENT_VALUE_TEST');
var testValueBefore = wb.get('DOCUMENT_VALUE_TEST');
wb.set('KSP_POSTEST', 100, 'value', 4);
(0, _assert.equal)(wb.get('DOCUMENT_VALUE_TEST'), testValueBefore);