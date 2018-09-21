'use strict';

require('../../ffl/index');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _assert = require('assert');

var _log = require('log6');

var _fs = require('fs');

var _formulajs = require('../../formulajs-connect/formulajs');

var formulaJs = _interopRequireWildcard(_formulajs);

var _fflMath = require('../../math/ffl-math');

var fflMath = _interopRequireWildcard(_fflMath);

var _excelConnect = require('../../excel-connect/excel-connect');

var _excelConnect2 = _interopRequireDefault(_excelConnect);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.addFunctions(fflMath);
_index2.default.addFunctions(formulaJs);
_index2.default.addFunctions(_excelConnect2.default);

_excelConnect2.default.loadExcelFile('KSP').then(function () {
	var wb = new _index.WorkBook(new _index.Context());
	var ffl_data = (0, _fs.readFileSync)(__dirname + '/../../model-tests/KSP/KSP.ffl', 'utf8');
	wb.importFFL(ffl_data);
	(0, _assert.equal)(wb.get('ActualDiapers'), 300);
}).catch(function (err) {
	console.error(err);
	(0, _log.error)(err);
	process.exit(1);
});