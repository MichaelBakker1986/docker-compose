global.IDE_DEBUGMODUS = true
import api, { Context, VALUE, WorkBook } from '../../lme-core/index'
import { equal }                         from 'assert'
import fflMath                           from '../../math/ffl-math'

api.addFunctions(fflMath)
const context = new Context,
      wb      = new WorkBook(context, null, null, { modelName: 'SELFTEST' })
wb.createFormula('Self[prev]', 'SelfTest', VALUE)
equal(wb.get('SelfTest'), fflMath.entries.NA, 'Calling its self evidently ends in NA')
