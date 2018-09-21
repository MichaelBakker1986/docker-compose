'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _log = require('log6');

var _index = require('../index');

var _fs = require('fs');

require('ffl-math');

require('../exchange_modules/ffl/RegisterPlainFFLDecorator');

require('../exchange_modules/ffl/RegisterToFFL');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fflTestModels = ['hierarchyTest', 'hierarchyTest'];

for (var i = 0; i < fflTestModels.length; i++) {
	var fflModelName = fflTestModels[i];
	var data = (0, _fs.readFileSync)(__dirname + '/../resources/' + fflModelName + '.ffl', 'utf8');
	var wb = new _index.WorkBook(new _index.Context());
	wb.importSolution(data, 'ffl');
	var validate = wb.validateImportedSolution();
	wb.fixProblemsInImportedSolution();
	_assert2.default.ok(wb.validateImportedSolution().valid);
	var fflExport = wb.export('ffl').join('\n');
	//debugging..
	if (_log.TRACE) (0, _log.trace)(fflExport);
}