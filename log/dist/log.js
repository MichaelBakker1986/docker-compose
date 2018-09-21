'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.debug = exports.warn = exports.trace = exports.error = exports.info = undefined;

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

		if (args.length > 0 && typeof args[0].toString === 'function') {
			args[0] = args[0].toString();
		}
	}
});
console.DEBUG = levels[logLevel].DEBUG;
console.INFO = levels[logLevel].INFO;
console.TRACE = levels[logLevel].TRACE;
console.WARN = levels[logLevel].WARN;
module.exports = console;
exports.default = console;
var info = exports.info = console.info;
var error = exports.error = console.error;
var trace = exports.trace = console.trace;
var warn = exports.warn = console.warn;
var debug = exports.debug = console.debug;