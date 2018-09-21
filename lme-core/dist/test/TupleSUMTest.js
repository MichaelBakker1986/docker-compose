'use strict';

var _index = require('../index');

require('../src/YAxis');

require('../../math');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: convert into JBehave story.
 * Given tuple TupleTest having formula 0
 * Given TupleTestSUM having formula TSUM(TupleTest)
 *
 * Test TSUM/TupleSum Function and concepts
 */
var wb = new _index.WorkBook(new _index.Context(), null, null, { modelName: 'TT2' });

wb.createFormula('0', 'TupleTest', 'value', true, 'document', 'number');
wb.createFormula('TSUM(TupleTest)', 'TupleTestSUM', false, 'document');

wb.set('TupleTest', 30);
_assert2.default.equal(wb.get('TupleTest'), 30, wb.get('TupleTest'));
wb.set('TupleTest', 40, 'value', undefined, 1);
_assert2.default.equal(wb.get('TupleTest', 'value', undefined, 1), 40);
_assert2.default.equal(wb.get('TupleTestSUM'), 70);
wb.set('TupleTest', null, 'value', undefined, 1);
_assert2.default.equal(wb.get('TupleTestSUM'), 30);