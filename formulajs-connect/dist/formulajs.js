'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.entries = exports.name = undefined;

var _log = require('log6');

var _formulajs = require('@handsontable/formulajs');

var formulaJs = _interopRequireWildcard(_formulajs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * bridge between formula-js and lme
 */
var entries = {};
var name = 'formulaJs';

Object.keys(formulaJs).forEach(function (functionName) {
	if (functionName === 'NA') return (0, _log.debug)('FFL parser uses this function to be a VARIABLE 1e-10');else if (global.hasOwnProperty(functionName)) (0, _log.debug)('global function already used : [' + functionName + ']');else entries[functionName] = formulaJs[functionName];
});
exports.name = name;
exports.entries = entries;