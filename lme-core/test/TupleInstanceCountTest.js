/**
 * Test Tuple Instance Count in nested tuple context
 * Nested tuples are complex, Are functionally able to copy the entire tree-structure of a model in 1keyword
 * Its the same complexity of time, therefore the unit-tests
 */
const Yaxis = require('../src/YAxis')
const assert = require('assert')
const log = require('log6')
const SecondLevelNestedTuple = Yaxis[2].deeper[3]
let SecondLevelNestedTupleInstance = SecondLevelNestedTuple.hash + 120
log.info((SecondLevelNestedTuple.bitmask & SecondLevelNestedTupleInstance) >> SecondLevelNestedTuple.start_bit, 1)
log.info((Yaxis[2].bitmask & SecondLevelNestedTupleInstance) >> Yaxis[2].start_bit)
assert.equal(TINSTANCECOUNT([], {}, Yaxis), -1, 'Nothing to do here. There is no instance.')
//an value is entered outside tuple-range, it should also return -1
//the first relevant value for 100, being a tuple would be above 512
const TupleValues = {
    100: {
        10: 100
    },
    101: {},
    102: {}
}
const TupleValues2 = {
    100: {
        10: 100
    }
}
const CREDIT = ['100']
TupleValues['100'][Yaxis[6].hash] = 1
assert.equal(TINSTANCECOUNT(['100'], TupleValues, Yaxis[0].parent), 6, 'So there are 6 instances' + TINSTANCECOUNT(['100'], TupleValues, Yaxis))
TupleValues2['100'][Yaxis[4].deeper[10].hash] = 1
assert.equal(TINSTANCECOUNT(['100'], TupleValues2, Yaxis[3].deeper[2]), -1, 'So there is one instance since a value is on the TD')
assert.equal(TINSTANCECOUNT(['100'], TupleValues, Yaxis[0]), 0, 'So there is one instance since a value is on the TD' + TINSTANCECOUNT(['100'], TupleValues, Yaxis[0]))
assert.equal(TINSTANCECOUNT(['100'], TupleValues, Yaxis[1].deeper[0]), -1, 'So there is one instance since a value is on the TD')
assert.equal(TINSTANCECOUNT(['100'], TupleValues, Yaxis[1]), -1, 'So there is one instance since a value is on the TD')
TupleValues['100'][Yaxis[6].hash] = 1
assert.equal(TINSTANCECOUNT(['100'], TupleValues, Yaxis[0].parent), 6, 'So there are 6 instances')
TupleValues['100'][Yaxis[6].deeper[10].hash] = 1
TupleValues['100'][Yaxis[6].deeper[10].hash + 99] = 2
assert.equal(TINSTANCECOUNT(CREDIT, TupleValues, Yaxis[6]), 10, 'So there are 6 instances for tuple depth ' + TINSTANCECOUNT(CREDIT, TupleValues, Yaxis[6]))
assert.equal(TINSTANCECOUNT(CREDIT, TupleValues, Yaxis[0]), 0, 'So there are 6 instances for tuple depth ' + TINSTANCECOUNT(CREDIT, TupleValues, Yaxis[0]))
assert.equal(TINSTANCECOUNT(CREDIT, TupleValues, Yaxis[1]), -1, 'So there are 6 instances for tuple depth 0')
assert.equal(TINSTANCECOUNT(CREDIT, TupleValues, Yaxis[2]), -1, 'So there are 6 instances for tuple depth 0')
const start = Yaxis[0].parent;
TupleValues['101'][start.deeper[3].deeper[2].hash] = 1
assert.equal(TINSTANCECOUNT(['101'], TupleValues, start.deeper[3]), 2, 'So there are 2 instances' + TINSTANCECOUNT(['101'], TupleValues, start))
assert.equal(TINSTANCECOUNT(['101'], TupleValues, start.deeper[3]), 2, 'So there are 6 instances')
assert.equal(TINSTANCECOUNT(['101'], TupleValues, start.deeper[6]), -1, 'So there are 6 instances' + TINSTANCECOUNT(['100'], TupleValues, start.deeper[6]))
TupleValues['100'][start.deeper[6].hash] = 1
assert.equal(TINSTANCECOUNT(['100'], TupleValues, start), 6, 'So there are 6 instances')
assert.equal(TINSTANCECOUNT(['100'], TupleValues, start.deeper[1]), -1, 'So there are ' + TINSTANCECOUNT(['100'], TupleValues, start.deeper[0]) + ' instances')
assert.equal(TINSTANCECOUNT(['100'], TupleValues, start.deeper[2]), -1, 'So there are ' + TINSTANCECOUNT(['100'], TupleValues, start.deeper[0]) + ' instances')
assert.equal(TINSTANCECOUNT(['100'], TupleValues, start.deeper[3]), -1, 'So there are ' + TINSTANCECOUNT(['100'], TupleValues, start.deeper[0]) + ' instances')
assert.equal(TINSTANCECOUNT(['100'], TupleValues, start.deeper[4]), -1, 'So there are ' + TINSTANCECOUNT(['100'], TupleValues, start.deeper[0]) + ' instances')
TupleValues['102'][start.deeper[5].hash] = 2
assert.equal(TINSTANCECOUNT(['102'], TupleValues, start), 5, 'So there are 6 instances' + TINSTANCECOUNT(['102'], TupleValues, start))
assert.equal(TINSTANCECOUNT(['102'], TupleValues, start.deeper[1]), -1, 'So there are 6 instances')
assert.equal(TINSTANCECOUNT(['102'], TupleValues, start.deeper[1]), -1, 'So there are 6 instances')



