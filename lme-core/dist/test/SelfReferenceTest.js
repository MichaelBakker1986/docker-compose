'use strict';

var _ = require('../');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

require('../../math');

require('log6');

require('../exchange_modules/ffl/RegisterPlainFFLDecorator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var context = new _.Context(),
    wb = new _.WorkBook(context, null, null, { modelName: 'SELFTEST' });
wb.createFormula('Self[prev]', 'SelfTest', 'value');
_assert2.default.equal(wb.get('SelfTest'), NA);