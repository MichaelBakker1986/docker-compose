'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = process.env.ENV === 'debug';
_log2.default.dateformat = 'HHMM;ssl';
if (debug) {
	_assert2.default.equal(_log2.default.DEBUG, true);
	(0, _assert2.default)(_log2.default.INFO === true);
	(0, _assert2.default)(_log2.default.TRACE === false);
} else {
	(0, _assert2.default)(_log2.default.DEBUG === false);
	(0, _assert2.default)(_log2.default.INFO === true);
	(0, _assert2.default)(_log2.default.TRACE === false);
}