/*
 This should be caught in a JBehave test.
 Creating new formula's and testing their results.
 This test is too big and does test way too many
 */
import fflMath                                             from '../../math/ffl-math'
import { equal }                                           from 'assert'
import api, { Context, DOCUMENT, NUMBER, VALUE, WorkBook } from '../../lme-core/index'

api.addFunctions(fflMath)
const wb = new WorkBook(new Context(), null, null, { modelName: 'TT1' })
wb.createFormula('10', 'DocumentValue', VALUE, false, DOCUMENT)
wb.createFormula('1', 'TupleSibling1', VALUE, true, DOCUMENT)
wb.createFormula('2+DocumentValue', 'TupleSibling2', VALUE, true, DOCUMENT)
wb.createFormula('TupleSibling1[doc]+TupleSibling2[doc]', 'TestTupleValues', VALUE, true, DOCUMENT)
wb.createFormula('TSUM(TestTupleValues[doc])', 'TestTupleValuesSUM', VALUE, false, DOCUMENT)
wb.createFormula('TCOUNT(TestTupleValues)', 'TestTupleValuesCOUNT', VALUE, false, DOCUMENT)
equal(wb.get('TestTupleValuesCOUNT'), 0)
equal(wb.get('TestTupleValues', VALUE, 0, 0), 13)
wb.set('DocumentValue', 100, VALUE, 0, 1)//will completely be ignored, since its not a tuple
equal(wb.get('TestTupleValues', VALUE, 0, 0), 13)
wb.set('DocumentValue', 100, VALUE, 0, 0)
equal(wb.get('TestTupleValues', VALUE, 0, 0), 103)
wb.set('TupleSibling1', 2, VALUE, 0, 1)
equal(wb.get('TestTupleValues', VALUE, 0, 0), 103)
/*//This is hard to test in a unit-test since the Tree-Structure cannot be build.
 equal(wb.get("TestTupleValues", VALUE, 0, 1), 104);*/
//TupleSibling1 and TupleSibling2 do not know they belong to same tuple group
equal(wb.get('TestTupleValuesSUM'), 0)

wb.createFormula('1+1', 'TupleTest', VALUE, true, 'column', NUMBER)
wb.createFormula('TSUM(TupleTest)', 'TupleTestSUM', false)

equal(wb.get('TupleTest'), 2)
wb.set('TupleTest', 10)
equal(wb.get('TupleTest'), 10)

wb.set('TupleTest', 20, VALUE, 1)
equal(wb.get('TupleTest'), 10)
equal(wb.get('TupleTest', VALUE, 1), 20)
wb.set('TupleTest', 30, VALUE, 1, 1)
equal(wb.get('TupleTest', VALUE, 1), 20, wb.get('TupleTest', VALUE, 1))
wb.set('TupleTest', 40, VALUE, 1, 0)
equal(wb.get('TupleTest', VALUE, 1, 1), 30)
const tupleTestSUM = wb.get('TupleTestSUM', VALUE)
equal(tupleTestSUM, 10 + 2, tupleTestSUM + ' they should be 12')

wb.createFormula('\'\'', 'TupleName', VALUE, true)
wb.set('TupleName', 'Piet', VALUE, 0, 0)
wb.set('TupleName', 'Jan', VALUE, 0, 1)
wb.set('TupleName', 'Klaas', VALUE, 0, 2)
equal(wb.get('TupleName'), 'Piet')
equal(wb.get('TupleName', VALUE, undefined, 1), 'Jan')
equal(wb.get('TupleName', VALUE, undefined, 2), 'Klaas')