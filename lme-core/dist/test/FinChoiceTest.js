'use strict';

var _FinFormula = require('../exchange_modules/ffl/FinFormula');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _assert2.default)(JSON.parse(new _FinFormula.FinFormula().finChoice('0:VWO|1:VMBO-MBO|2:VMBO-HAVO|3:HAVO')).length === 4);