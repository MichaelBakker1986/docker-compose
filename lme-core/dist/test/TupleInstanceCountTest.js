'use strict';

var _index = require('../index');

var _assert = require('assert');

/**
 * Test Tuple Instance Count in nested tuple context
 * Nested tuples are complex, Are functionally able to copy the entire tree-structure of a model in 1keyword
 * Its the same complexity of time, therefore the unit-tests
 */
var SecondLevelNestedTuple = _index.YAxis[2].deeper[3];
var SecondLevelNestedTupleInstance = SecondLevelNestedTuple.hash + 120;
(0, _assert.equal)((SecondLevelNestedTuple.bitmask & SecondLevelNestedTupleInstance) >> SecondLevelNestedTuple.start_bit, 0);
(0, _assert.equal)((_index.YAxis[2].bitmask & SecondLevelNestedTupleInstance) >> _index.YAxis[2].start_bit, 3);
(0, _assert.equal)(TINSTANCECOUNT([], {}, _index.YAxis), -1, 'Nothing to do here. There is no instance.');
//an value is entered outside tuple-range, it should also return -1
//the first relevant value for 100, being a tuple would be above 512
var TupleValues = {
	100: {
		10: 100
	},
	101: {},
	102: {}
};
var TupleValues2 = {
	100: {
		10: 100
	}
};
var CREDIT = ['100'];
TupleValues['100'][_index.YAxis[6].hash] = 1;
(0, _assert.equal)(TINSTANCECOUNT(['100'], TupleValues, _index.YAxis[0].parent), 6, 'So there are 6 instances' + TINSTANCECOUNT(['100'], TupleValues, _index.YAxis));
TupleValues2['100'][_index.YAxis[4].deeper[10].hash] = 1;
(0, _assert.equal)(TINSTANCECOUNT(['100'], TupleValues2, _index.YAxis[3].deeper[2]), -1, 'So there is one instance since a value is on the TD');
(0, _assert.equal)(TINSTANCECOUNT(['100'], TupleValues, _index.YAxis[0]), 0, 'So there is one instance since a value is on the TD' + TINSTANCECOUNT(['100'], TupleValues, _index.YAxis[0]));
(0, _assert.equal)(TINSTANCECOUNT(['100'], TupleValues, _index.YAxis[1].deeper[0]), -1, 'So there is one instance since a value is on the TD');
(0, _assert.equal)(TINSTANCECOUNT(['100'], TupleValues, _index.YAxis[1]), -1, 'So there is one instance since a value is on the TD');
TupleValues['100'][_index.YAxis[6].hash] = 1;
(0, _assert.equal)(TINSTANCECOUNT(['100'], TupleValues, _index.YAxis[0].parent), 6, 'So there are 6 instances');
TupleValues['100'][_index.YAxis[6].deeper[10].hash] = 1;
TupleValues['100'][_index.YAxis[6].deeper[10].hash + 99] = 2;
(0, _assert.equal)(TINSTANCECOUNT(CREDIT, TupleValues, _index.YAxis[6]), 10, 'So there are 6 instances for tuple depth ' + TINSTANCECOUNT(CREDIT, TupleValues, _index.YAxis[6]));
(0, _assert.equal)(TINSTANCECOUNT(CREDIT, TupleValues, _index.YAxis[0]), 0, 'So there are 6 instances for tuple depth ' + TINSTANCECOUNT(CREDIT, TupleValues, _index.YAxis[0]));
(0, _assert.equal)(TINSTANCECOUNT(CREDIT, TupleValues, _index.YAxis[1]), -1, 'So there are 6 instances for tuple depth 0');
(0, _assert.equal)(TINSTANCECOUNT(CREDIT, TupleValues, _index.YAxis[2]), -1, 'So there are 6 instances for tuple depth 0');
var start = _index.YAxis[0].parent;
TupleValues['101'][start.deeper[3].deeper[2].hash] = 1;
(0, _assert.equal)(TINSTANCECOUNT(['101'], TupleValues, start.deeper[3]), 2, 'So there are 2 instances' + TINSTANCECOUNT(['101'], TupleValues, start));
(0, _assert.equal)(TINSTANCECOUNT(['101'], TupleValues, start.deeper[3]), 2, 'So there are 6 instances');
(0, _assert.equal)(TINSTANCECOUNT(['101'], TupleValues, start.deeper[6]), -1, 'So there are 6 instances' + TINSTANCECOUNT(['100'], TupleValues, start.deeper[6]));
TupleValues['100'][start.deeper[6].hash] = 1;
(0, _assert.equal)(TINSTANCECOUNT(['100'], TupleValues, start), 6, 'So there are 6 instances');
(0, _assert.equal)(TINSTANCECOUNT(['100'], TupleValues, start.deeper[1]), -1, 'So there are ' + TINSTANCECOUNT(['100'], TupleValues, start.deeper[0]) + ' instances');
(0, _assert.equal)(TINSTANCECOUNT(['100'], TupleValues, start.deeper[2]), -1, 'So there are ' + TINSTANCECOUNT(['100'], TupleValues, start.deeper[0]) + ' instances');
(0, _assert.equal)(TINSTANCECOUNT(['100'], TupleValues, start.deeper[3]), -1, 'So there are ' + TINSTANCECOUNT(['100'], TupleValues, start.deeper[0]) + ' instances');
(0, _assert.equal)(TINSTANCECOUNT(['100'], TupleValues, start.deeper[4]), -1, 'So there are ' + TINSTANCECOUNT(['100'], TupleValues, start.deeper[0]) + ' instances');
TupleValues['102'][start.deeper[5].hash] = 2;
(0, _assert.equal)(TINSTANCECOUNT(['102'], TupleValues, start), 5, 'So there are 6 instances' + TINSTANCECOUNT(['102'], TupleValues, start));
(0, _assert.equal)(TINSTANCECOUNT(['102'], TupleValues, start.deeper[1]), -1, 'So there are 6 instances');
(0, _assert.equal)(TINSTANCECOUNT(['102'], TupleValues, start.deeper[1]), -1, 'So there are 6 instances');