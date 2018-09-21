'use strict';

var _assert = require('assert');

var _ = require('../');

var _log = require('log6');

require('../exchange_modules/presentation/webexport');

require('../exchange_modules/ffl/RegisterPlainFFLDecorator');

require('ffl-math');

var _fs = require('fs');

var context = new _.Context({ columnSize: 1, columns: [_.VALUE, _.VISIBLE] });
var wb = new _.WorkBook(context, null, null, { modelName: 'LGDTEST' });
wb.importSolution((0, _fs.readFileSync)(__dirname + '/../resources/LGDTEST.ffl', 'utf8'), 'ffl');
wb.set('AllocatedGuarantee', 'test', 'value', 0, 1);
var webExport = wb.export('webexport');
var rows = webExport.rows;
webExport.sort();
(0, _assert.equal)(rows.length, 33);
(0, _log.debug)(rows[0].visible);