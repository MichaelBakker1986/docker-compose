'use strict';

var _ = require('../');

require('log6');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

require('../exchange_modules/ffl/RegisterPlainFFLDecorator');

var _fs = require('fs');

require('../../math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TODO: convert into JBehave Story.
global.IDE_DEBUGMODUS = true;
var wb = new _.WorkBook(new _.Context());
wb.importFFL((0, _fs.readFileSync)(__dirname + '/../resources/CASETEST.ffl', 'utf8'));
/*log.debug('\n' +
 wb.context.audittrail.printAuditTrail()
 )*/
_assert2.default.equal(wb.get('CASETESTVARIABLE'), 535);
wb.set('VALUE', 1);
_assert2.default.equal(wb.get('CASETESTVARIABLE'), 906);