'use strict';

var _ = require('../');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

require('../src/YAxis');

require('../../math');

var _formulajsConnect = require('../../formulajs-connect');

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: convert into .story file
 * Be aware, empty tuples are included in the T* functions.
 * Tuplevalue test maken.
 */
_.LMEFacade.addFunctions(_formulajsConnect.entries);
var wb = new _.WorkBook(new _.Context());
wb.importSolution((0, _fs.readFileSync)(__dirname + '/../resources/TupleValueTest.ffl', 'utf-8'), 'ffl');

// 0-Tuple(0)
wb.set('ValueVariable', 5, 'value', undefined, 0);
_assert2.default.equal(wb.get('ValueVariableTotal', 'value', 0, 0), 5);
_assert2.default.equal(wb.get('Total', 'value'), 5);

// 0-Tuple(2) (skip 0-Tuple(1))
wb.set('ValueVariable', 6, 'value', undefined, 2);
_assert2.default.equal(wb.get('ValueVariableTotal', 'value', undefined, 2), 6);
_assert2.default.equal(wb.get('Total', 'value'), 11);