/**
 * Test TCOUNT/TupleCount Function and concepts
 */
import api, { Context, DOCUMENT, NUMBER, VALUE, WorkBook } from '../../lme-core/index'
import { equal }                                           from 'assert'
import fflMath                                             from '../../math/ffl-math'

const modelName = 'TC'
api.addFunctions(fflMath)
const wb = new WorkBook(new Context(), null, null, { modelName })
wb.createFormula('0', 'TTest', VALUE, true, DOCUMENT, NUMBER)
wb.createFormula('TCOUNT(TTest)', 'TCOUNTTEST', false, DOCUMENT)
equal(wb.get('TCOUNTTEST'), 0)
wb.set('TTest', 30)
equal(wb.get('TCOUNTTEST'), 1)
wb.set('TTest', 30, VALUE, undefined, 1)
equal(wb.get('TCOUNTTEST'), 2)