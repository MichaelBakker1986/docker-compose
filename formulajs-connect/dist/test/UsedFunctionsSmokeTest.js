'use strict';

var _log = require('log6');

var _formulajs = require('../formulajs');

var _assert = require('assert');

var excel_functions = Object.keys(_formulajs.entries);
(0, _assert.ok)(excel_functions.includes('PPMT'));
(0, _log.info)(excel_functions);