'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WARN = exports.TRACE = exports.INFO = exports.DEBUG = exports.debug = exports.warn = exports.trace = exports.error = exports.info = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _tracer = require('tracer');

var _tracer2 = _interopRequireDefault(_tracer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var format = process.env.TIME_FORMAT || 'HH.MM.ssl';
var logLevel = process.env.ENV || 'info';
var levels = {
	debug: {
		DEBUG: true,
		TRACE: false,
		WARN: true,
		INFO: true
	},
	info: {
		DEBUG: false,
		TRACE: false,
		WARN: true,
		INFO: true
	},
	error: {
		DEBUG: false,
		TRACE: false,
		INFO: false,
		WARN: false
	},
	trace: {
		DEBUG: true,
		TRACE: true,
		INFO: true,
		WARN: true
	}
};
var console = _tracer2.default.colorConsole({
	format: '{{timestamp}} ({{file}}:{{line}}) \t- {{message}}',
	dateformat: format,
	level: logLevel,
	preprocess: function preprocess(_ref) {
		var args = _ref.args;

		if (args.length > 0) {
			var _args = (0, _slicedToArray3.default)(args, 1),
			    first_arg = _args[0];

			if (typeof first_arg.toString === 'function') {
				args[0] = first_arg.toString();
			} else if (first_arg.stack) {
				args[0] = first_arg.stack;
			}
		}
	}
});
console.DEBUG = levels[logLevel].DEBUG;
console.INFO = levels[logLevel].INFO;
console.TRACE = levels[logLevel].TRACE;
console.WARN = levels[logLevel].WARN;

var DEBUG = console.DEBUG,
    INFO = console.INFO,
    TRACE = console.TRACE,
    WARN = console.WARN,
    info = console.info,
    error = console.error,
    trace = console.trace,
    warn = console.warn,
    debug = console.debug;

module.exports = { DEBUG: DEBUG, INFO: INFO, TRACE: TRACE, WARN: WARN, info: info, error: error, trace: trace, warn: warn, debug: debug };
module.exports.error = error;
exports.info = info;
exports.error = error;
exports.trace = trace;
exports.warn = warn;
exports.debug = debug;
exports.DEBUG = DEBUG;
exports.INFO = INFO;
exports.TRACE = TRACE;
exports.WARN = WARN;
exports.default = console;