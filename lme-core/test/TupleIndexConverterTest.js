/**
 */
const assert = require('assert')
const JSWorkBook = require('../src/JSWorkBook'), Context = require('../src/Context'), YAxis = require('../src/YAxis')
const workBook = new JSWorkBook(new Context(), null, null, {modelName: 'FINDTUPLEBYNAME'})
workBook.createFormula("'TD'", 'TestTD', 'value', true)
/*
 * Lookup tuple by name 0-tuple.
 */
const yaxJ = workBook.addTuple('TestTD', 'Jan')
const yaxP = workBook.addTuple('TestTD', 'Piet')
assert.equal(workBook.tupleIndexForName('FINDTUPLEBYNAME_TestTD', 'Piet'), 1)

/*
 * Lookup tuple by name 1-tuple.
 */
workBook.addTuple('TestTD', '2ndlevelPiet', YAxis[3])
workBook.addTuple('TestTD', '2ndlevelPiet1', YAxis[3])
assert.equal(workBook.tupleIndexForName('FINDTUPLEBYNAME_TestTD', '2ndlevelPiet1', YAxis[3]), 1)
assert.equal(workBook.tupleIndexForName('FINDTUPLEBYNAME_TestTD', '2ndlevelPiet', YAxis[3]), 0)

/*
 * Lookup tuple by name 2-tuple.
 */
workBook.addTuple('TestTD', '3ndlevelPiet', YAxis[5].deeper[2])
workBook.addTuple('TestTD', '3ndlevelPiet1', YAxis[5].deeper[2])
assert.equal(workBook.tupleIndexForName('FINDTUPLEBYNAME_TestTD', '3ndlevelPiet1', YAxis[5].deeper[2]), 1)
assert.equal(workBook.tupleIndexForName('FINDTUPLEBYNAME_TestTD', '3ndlevelPiet', YAxis[5].deeper[2]), 0)