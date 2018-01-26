/*
 * only intended to test tripleTuple instances.
 */
const Yaxis = require('../src/YAxis')
const assert = require('assert')
const TupleValues3 = {
    103: {}
}
const CREDITD3 = ['103']
TupleValues3['103'][Yaxis[6].deeper[10].deeper[9].hash] = 2
TupleValues3['103'][Yaxis[6].deeper[10].deeper[9].hash + 100] = 2
testNTuple(Yaxis[6].deeper[10], 9)
testNTuple(Yaxis[6].deeper[0], -1)
testNTuple(Yaxis[7].deeper[2], -1)

/**
 * Next step is to make the tests more easy
 * [0,0,2],value,[2,0],expected
 */
function testNTuple(y, n) {
    const actual = TINSTANCECOUNT(CREDITD3, TupleValues3, y);
    assert.equal(actual, n, 'So there are ' + n + ' instances for tuple index ' + actual)
}