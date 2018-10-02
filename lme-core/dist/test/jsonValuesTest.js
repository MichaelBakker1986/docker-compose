'use strict';

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _assert = require('assert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.registerParser(_index.JSONParser, _index.WebExportParser);

var wb = new _index.WorkBook(new _index.Context());
wb.modelName = 'JSON_VALUES_TEST';
wb.createFormula('1+1', 'AB', _index.VALUE, false, _index.DOCUMENT, _index.NUMBER);

(0, _assert.equal)(wb.get('AB'), 2);
wb.set('AB', 'anything');
wb.set('AB', 'anythingelse');
wb.set('AB', 'anythingelse213');
wb.set('AB', 100);
wb.set('AB', 1010);

var exportValues = wb.export('jsonvalues');
(0, _assert.equal)(exportValues.length, 1, JSON.stringify(exportValues));

wb.createFormula('1+2', 'AB', _index.TITLE);
wb.set('AB', 'anythingTitle', _index.TITLE);

exportValues = wb.export('jsonvalues');
(0, _assert.equal)(exportValues.length, 2, JSON.stringify(exportValues));

wb.importSolution(JSON.stringify(exportValues), 'jsonvalues');