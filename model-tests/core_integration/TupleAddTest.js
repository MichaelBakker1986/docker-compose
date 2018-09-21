/**
 * Test TupleAdd Function and concepts
 * (i) This could be a JBehave story(s)
 *  - YAxis[t1].deeper[t2] would be Child(t1,t2) in the story
 *  - Would be parsed ffl- alike...
 *  When ChildGender(Piet) is set to Male would imply a Tuple Child(Piet) to be exist then modifying Child(Piet).ChildGender into Male
 */
import api, { Context, DOCUMENT, NUMBER, VALUE, WorkBook, YAxis } from '../../lme-core/index'
import { equal }                                                  from 'assert'
import fflMath                                                    from '../../math/ffl-math'

api.addFunctions(fflMath)
const wb = new WorkBook(new Context, null, null, { modelName: 'TADDINSTANCE' })
wb.createFormula('0', 'TupleValue', VALUE, true, DOCUMENT, NUMBER)
const node = wb.findNode('TupleValue')

/**
 * 0-Tuple_ADD
 */
equal(wb.maxTupleCountForRow(node), -1)
equal(wb.addTuple('TupleValue', 'Piet').display, '0000')
equal(wb.maxTupleCountForRow(node), 0)
equal(wb.addTuple('TupleValue', 'Jan_').display, '1000')
equal(wb.maxTupleCountForRow(node), 1)

/**
 * 1-Tuple_ADD
 * It's possible to use a single TupleDefinition to be 0-tuple, 1-tuple, 2-tuple since the values are stored in different parts of the index.
 * Yet, adding the 0,0,0 instance will in all depths result in one entry filled.
 */
equal(wb.maxTupleCountForRow(node, YAxis[0]), 0)
equal(wb.addTuple('TupleValue', 'Harry', YAxis[0]).display, '0100')
equal(wb.maxTupleCountForRow(node, YAxis[0]), 1)
equal(wb.addTuple('TupleValue', 'John_', YAxis[0]).display, '0200')
equal(wb.maxTupleCountForRow(node, YAxis[0]), 2)

/**
 * 2-Tuple_ADD
 * 0000 is taken, so 0010 will be assigned
 */
equal(wb.maxTupleCountForRow(node, YAxis[0].deeper[0]), 0)
equal(wb.addTuple('TupleValue', 'Sanne', YAxis[0].deeper[0]).display, '0010')
equal(wb.maxTupleCountForRow(node, YAxis[0].deeper[0]), 1)
equal(wb.addTuple('TupleValue', 'Rick_', YAxis[0].deeper[0]).display, '0020')
equal(wb.maxTupleCountForRow(node, YAxis[0].deeper[0]), 2)

/**
 * 2,1-Tuple_ADD
 * 0200 is taken, so 0210 will be assigned
 */
equal(wb.addTuple('TupleValue', 'Steve___', YAxis[0].deeper[2]).display, '0210')
equal(wb.addTuple('TupleValue', 'SteveJob', YAxis[0].deeper[2]).display, '0220')