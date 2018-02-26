require('../../math')
const assert          = require('assert'),
      WorkBook        = require('../src/JSWorkBook'),
      Context         = require('../src/Context'),
      CustomTimeModel = require('../src/TimeAxis'),
      log             = require('log6'),
      wb              = new WorkBook(new Context({ absolute_start_year: 2018 }), null, null, { modelName: 'BOOKYEARTEST' }),
      wb_column       = new WorkBook(new Context({ absolute_start_year: 3000 }), new CustomTimeModel(), null, { modelName: 'BOOKYEARTESTC' });

if (log.DEBUG) log.debug(wb.viewmodes.toString())
wb.createFormula('YearInT', 'YearInT')
assert.equal(wb.get('YearInT'), 2018)
wb_column.createFormula('YearInT', 'YearInT')
assert.equal(wb_column.get('YearInT'), 3000)