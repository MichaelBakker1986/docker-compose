'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _assert = require('assert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//FYNDOO_PRESCAN
//Vragenlijstje authorizatie met API-KEY voor accountants
//Vragenlijstje gebaseerd op de Rol
//JWT token

var modelName = 'PRESCAN_API';
var wb = new _index.WorkBook(new _index.Context(), null, null, { modelName: modelName });
wb.createFormula('1+1', 'TimeTest', _index.VALUE, true, _index.COLUMN);
(0, _assert.equal)(wb.get('TimeTest'), 2);
wb.set('TimeTest', 10);
(0, _assert.equal)(wb.get('TimeTest'), 10);
wb.set('TimeTest', 20, _index.VALUE, 1);
(0, _assert.equal)(wb.get('TimeTest'), 10);
(0, _assert.equal)(wb.get('TimeTest', _index.VALUE, 1), 20);
wb.set('TimeTest', 30, _index.VALUE, 2, 1);
(0, _assert.equal)(wb.get('TimeTest', _index.VALUE, 2, 1), 30);

var _api$getValue = _index2.default.getValue({
	properties: { value: true },
	values: wb.context.getValues()
}, modelName + '_TimeTest'),
    _api$getValue2 = (0, _slicedToArray3.default)(_api$getValue, 1),
    timeTestValues = _api$getValue2[0];

var _timeTestValues = (0, _slicedToArray3.default)(timeTestValues, 3),
    one_ = _timeTestValues[0],
    two_ = _timeTestValues[1],
    three_ = _timeTestValues[2];

(0, _assert.equal)(one_.value, 10);
(0, _assert.equal)(two_.value, 20);
(0, _assert.equal)(three_.value, 2);
_index2.default.getValue({ properties: { value: true }, values: wb.context.getValues() }, modelName + '_TimeTest', 3, 1100);