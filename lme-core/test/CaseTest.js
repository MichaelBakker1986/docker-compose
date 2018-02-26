//TODO: convert into JBehave Story.
global.IDE_DEBUGMODUS = true
const assert   = require('assert'),
      WorkBook = require('../src/JSWorkBook'),
      log      = require('log6'),
      Context  = require('../src/Context');

require('../exchange_modules/ffl/RegisterPlainFFLDecorator');
require('../../math')
const wb = new WorkBook(new Context());
wb.importFFL(require('fs').readFileSync(__dirname + '/../resources/CASETEST.ffl', 'utf8'))
/*log.debug('\n' +
    wb.context.audittrail.printAuditTrail()
)*/
assert.equal(wb.get('CASETESTVARIABLE'), 535)
wb.set('VALUE', 1)
assert.equal(wb.get('CASETESTVARIABLE'), 906)
