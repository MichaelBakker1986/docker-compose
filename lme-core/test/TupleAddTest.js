/**
 * Test TupleAdd Function and concepts
 * (i) This could be a JBehave story(s)
 *  - YAxis[t1].deeper[t2] would be Child(t1,t2) in the story
 *  - Would be parsed ffl- alike...
 *  When ChildGender(Piet) is set to Male would imply a Tuple Child(Piet) to be exist then modifying Child(Piet).ChildGender into Male
 */
const WorkBook = require('../src/JSWorkBook'), Context = require('../src/Context'), YAxis = require('../src/YAxis')
require('../../math');
const assert = require('assert');
const wb = new WorkBook(new Context(), null, null, {modelName: 'TADDINSTANCE'});
wb.createFormula("0", "TupleValue", 'value', true, 'document', 'number');
const node = wb.findNode("TupleValue")

/**
 * 0-Tuple_ADD
 */
assert.equal(wb.maxTupleCountForRow(node), -1)
assert.equal(wb.addTuple("TupleValue", 'Piet').display, '0000')
assert.equal(wb.maxTupleCountForRow(node), 0)
assert.equal(wb.addTuple("TupleValue", 'Jan_').display, '1000')
assert.equal(wb.maxTupleCountForRow(node), 1)

/**
 * 1-Tuple_ADD
 * It's possible to use a single TupleDefinition to be 0-tuple, 1-tuple, 2-tuple since the values are stored in different parts of the index.
 * Yet, adding the 0,0,0 instance will in all depths result in one entry filled.
 */
assert.equal(wb.maxTupleCountForRow(node, YAxis[0]), 0)
assert.equal(wb.addTuple("TupleValue", 'Harry', YAxis[0]).display, '0100')
assert.equal(wb.maxTupleCountForRow(node, YAxis[0]), 1)
assert.equal(wb.addTuple("TupleValue", 'John_', YAxis[0]).display, '0200')
assert.equal(wb.maxTupleCountForRow(node, YAxis[0]), 2)

/**
 * 2-Tuple_ADD
 * 0000 is taken, so 0010 will be assigned
 */
assert.equal(wb.maxTupleCountForRow(node, YAxis[0].deeper[0]), 0)
assert.equal(wb.addTuple("TupleValue", 'Sanne', YAxis[0].deeper[0]).display, '0010')
assert.equal(wb.maxTupleCountForRow(node, YAxis[0].deeper[0]), 1)
assert.equal(wb.addTuple("TupleValue", 'Rick_', YAxis[0].deeper[0]).display, '0020')
assert.equal(wb.maxTupleCountForRow(node, YAxis[0].deeper[0]), 2)


/**
 * 2,1-Tuple_ADD
 * 0200 is taken, so 0210 will be assigned
 */
assert.equal(wb.addTuple("TupleValue", 'Steve___', YAxis[0].deeper[2]).display, '0210')
assert.equal(wb.addTuple("TupleValue", 'SteveJob', YAxis[0].deeper[2]).display, '0220')