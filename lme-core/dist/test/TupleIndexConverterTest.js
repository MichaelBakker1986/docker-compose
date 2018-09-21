'use strict';

var _index = require('../index');

var _assert = require('assert');

/**
 */
var workBook = new _index.WorkBook(new _index.Context(), null, null, { modelName: 'FINDTUPLEBYNAME' });
workBook.createFormula('\'TD\'', 'TestTD', 'value', true);
/*
 * Lookup tuple by name 0-tuple.
 */
var yaxJ = workBook.addTuple('TestTD', 'Jan');
var yaxP = workBook.addTuple('TestTD', 'Piet');
(0, _assert.equal)(workBook.tupleIndexForName('FINDTUPLEBYNAME_TestTD', 'Piet'), 1);

/*
 * Lookup tuple by name 1-tuple.
 */
workBook.addTuple('TestTD', '2ndlevelPiet', _index.YAxis[3]);
workBook.addTuple('TestTD', '2ndlevelPiet1', _index.YAxis[3]);
(0, _assert.equal)(workBook.tupleIndexForName('FINDTUPLEBYNAME_TestTD', '2ndlevelPiet1', _index.YAxis[3]), 1);
(0, _assert.equal)(workBook.tupleIndexForName('FINDTUPLEBYNAME_TestTD', '2ndlevelPiet', _index.YAxis[3]), 0);

/*
 * Lookup tuple by name 2-tuple.
 */
workBook.addTuple('TestTD', '3ndlevelPiet', _index.YAxis[5].deeper[2]);
workBook.addTuple('TestTD', '3ndlevelPiet1', _index.YAxis[5].deeper[2]);
(0, _assert.equal)(workBook.tupleIndexForName('FINDTUPLEBYNAME_TestTD', '3ndlevelPiet1', _index.YAxis[5].deeper[2]), 1);
(0, _assert.equal)(workBook.tupleIndexForName('FINDTUPLEBYNAME_TestTD', '3ndlevelPiet', _index.YAxis[5].deeper[2]), 0);