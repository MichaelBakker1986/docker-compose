/**
 * TODO: convert into JBehave story.
 * Given tuple TupleTest having formula 0
 * Given TupleTestSUM having formula TSUM(TupleTest)
 *
 * Test TSUM/TupleSum Function and concepts
 */
import api, { Context, DOCUMENT, NUMBER, VALUE, WorkBook } from '../../lme-core/index'
import fflMath                                             from '../../math/ffl-math'
import { equal }                                           from 'assert'

api.addFunctions(fflMath)

const wb = new WorkBook(new Context, null, null, { modelName: 'TT2' })

wb.createFormula('0', 'TupleTest', VALUE, true, DOCUMENT, NUMBER)
wb.createFormula('TSUM(TupleTest)', 'TupleTestSUM', false, DOCUMENT)

wb.set('TupleTest', 30)
equal(wb.get('TupleTest'), 30, wb.get('TupleTest'))
wb.set('TupleTest', 40, VALUE, undefined, 1)
equal(wb.getValue('TupleTest', undefined, 1), 40)
equal(wb.get('TupleTestSUM'), 70)
wb.set('TupleTest', null, VALUE, undefined, 1)
equal(wb.get('TupleTestSUM'), 30)
