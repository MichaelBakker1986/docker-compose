'use strict';

var _index = require('../index');

var _assert = require('assert');

var _log = require('log6');

require('ffl-math');

var wb = new _index.WorkBook(new _index.Context({ absolute_start_year: 2018 }), null, null, { modelName: 'BOOKYEARTEST' }),
    wb_column = new _index.WorkBook(new _index.Context({ absolute_start_year: 3000 }), new _index.TimeAxis(), null, { modelName: 'BOOKYEARTESTC' });

if (_log.DEBUG) (0, _log.debug)(wb.viewmodes.toString());
wb.createFormula('YearInT', 'YearInT');
(0, _assert.equal)(wb.get('YearInT'), 2018);
wb_column.createFormula('YearInT', 'YearInT');
(0, _assert.equal)(wb_column.get('YearInT'), 3000);