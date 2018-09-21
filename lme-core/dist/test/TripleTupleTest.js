'use strict';

var _index = require('../index');

var _assert = require('assert');

/*
 * only intended to test tripleTuple instances.
 */
var TupleValues3 = {
  103: {}
};
var CREDITD3 = ['103'];
TupleValues3['103'][_index.YAxis[6].deeper[10].deeper[9].hash] = 2;
TupleValues3['103'][_index.YAxis[6].deeper[10].deeper[9].hash + 100] = 2;
testNTuple(_index.YAxis[6].deeper[10], 9);
testNTuple(_index.YAxis[6].deeper[0], -1);
testNTuple(_index.YAxis[7].deeper[2], -1);

/**
 * Next step is to make the tests more easy
 * [0,0,2],value,[2,0],expected
 */
function testNTuple(y, n) {
  var actual = TINSTANCECOUNT(CREDITD3, TupleValues3, y);
  (0, _assert.equal)(actual, n, 'So there are ' + n + ' instances for tuple index ' + actual);
}