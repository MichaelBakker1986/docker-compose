'use strict';

var _ = require('../');

var _assert = require('assert');

var _log = require('log6');

var _fs = require('fs');

require('../exchange_modules/ffl/RegisterPlainFFLDecorator');

require('ffl-math');

var wb = new _.WorkBook(new _.Context());
wb.modelName = 'SELECTDESCENDANTS';
wb.importSolution((0, _fs.readFileSync)(__dirname + '/../resources/SELECTDESCENDANTS.ffl', 'utf8'), 'ffl');
(0, _assert.equal)(wb.get('Q_ROOT'), 2, wb.get('Q_ROOT', 'title'));
(0, _log.info)(wb.get('Q_MAP01'));
(0, _assert.equal)(wb.get('Q_MAP01'), 0, wb.get('Q_MAP01', 'title'));
wb.set('Q_MAP02_SUB', 10);
wb.set('Q_MAP03', 10);
(0, _assert.equal)(wb.get('Q_MAP01'), 1, wb.get('Q_MAP01', 'title'));
wb.set('Q_MAP02_SUB', null);
(0, _assert.equal)(wb.get('Q_MAP01'), 0, wb.get('Q_MAP01', 'title'));