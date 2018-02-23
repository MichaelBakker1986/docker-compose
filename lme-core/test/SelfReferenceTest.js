require('../../math')
const assert   = require('assert'),
      WorkBook = require('../src/JSWorkBook'),
      log      = require('log6'),
      Context  = require('../src/Context'),
      context  = new Context(),
      wb       = new WorkBook(context, null, null, { modelName: 'SELFTEST' })

require('../exchange_modules/ffl/RegisterPlainFFLDecorator');
wb.createFormula('Self[prev]', 'SelfTest', 'value')
assert.equal(wb.get('SelfTest'), NA)