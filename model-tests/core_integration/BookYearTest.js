import api, { Context, TimeAxis, WorkBook } from '../../lme-core/index'
import * as fflMath                         from '../../math/ffl-math'
import { equal }                            from 'assert'
import { DEBUG, debug }                     from 'log6'

api.addFunctions(fflMath)
const modelName = 'BOOKYEARTEST'
const wb = new WorkBook(new Context({ absolute_start_year: 2018 }), null, null, { modelName })
const wb_column = new WorkBook(new Context({ absolute_start_year: 3000 }), new TimeAxis(), null, { modelName })

if (DEBUG) debug(wb.viewmodes.toString())

wb.createFormula('YearInT', 'YearInT')
equal(wb.get('YearInT'), 2018)
wb_column.createFormula('YearInT', 'YearInT')
equal(wb_column.get('YearInT'), 3000)