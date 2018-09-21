'use strict';

var _ = require('../');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

require('../../math');

require('../src/YAxis');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Test TCOUNT/TupleCount Function and concepts
 */
var wb = new _.WorkBook(new _.Context(), null, null, { modelName: 'TC' });
wb.createFormula('0', 'TTest', 'value', true, 'document', 'number');
wb.createFormula('TCOUNT(TTest)', 'TCOUNTTEST', false, 'document');
_assert2.default.equal(wb.get('TCOUNTTEST'), 0);
wb.set('TTest', 30); // (!) defaults to: 'value',undefined,0 (!)
_assert2.default.equal(wb.get('TCOUNTTEST'), 1);
wb.set('TTest', 30, 'value', undefined, 1);
_assert2.default.equal(wb.get('TCOUNTTEST'), 2);