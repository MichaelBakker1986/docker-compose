/*
   This should be catched in a JBehave test.
   Creating new formula's and testing their results.
   This test is too big.
 */
var DEFAULT = 'value';
var TUPLEVALUETEST = "TestTupleValues";
var WorkBook = require('../src/JSWorkBook');
var Context = require('../src/Context');
const YAxis = require('../src/YAxis');
require('../../math');
var assert = require('assert');
var wb = new WorkBook(new Context());
wb.modelName = 'TT1'
wb.createFormula("10", "DocumentValue", DEFAULT, false, 'document');
wb.createFormula("1", "TupleSibling1", DEFAULT, true, 'document');
wb.createFormula("2+DocumentValue", "TupleSibling2", DEFAULT, true, 'document');
wb.createFormula("TupleSibling1[doc]+TupleSibling2[doc]", TUPLEVALUETEST, DEFAULT, true, 'document');
wb.createFormula("TSUM(TestTupleValues[doc])", "TestTupleValuesSUM", DEFAULT, false, 'document');
wb.createFormula("TCOUNT(TestTupleValues)", "TestTupleValuesCOUNT", DEFAULT, false, 'document');
assert(wb.get("TestTupleValuesCOUNT") === -1);
assert(wb.get(TUPLEVALUETEST, DEFAULT, 0, 0) === 13);
wb.set('DocumentValue', 100, DEFAULT, 0, 1);//will completely be ignored, since its not a tuple
assert(wb.get(TUPLEVALUETEST, DEFAULT, 0, 0) === 13);
wb.set('DocumentValue', 100, DEFAULT, 0, 0);
assert(wb.get(TUPLEVALUETEST, DEFAULT, 0, 0) === 103);
wb.set('TupleSibling1', 2, DEFAULT, 0, 1);
assert(wb.get(TUPLEVALUETEST, DEFAULT, 0, 0) === 103);
assert(wb.get(TUPLEVALUETEST, DEFAULT, 0, 1) === 104);
//TupleSibling1 and TupleSibling2 do not know they belong to same tuple group
assert(wb.get('TestTupleValuesSUM') === 0);

wb.createFormula("1+1", "TupleTest", DEFAULT, true, 'column', 'number');
wb.createFormula("TSUM(TupleTest)", "TupleTestSUM", false);

assert(wb.get('TupleTest') === 2);
wb.set('TupleTest', 10);
assert(wb.get('TupleTest') === 10);

var FirstY = 1;
var FirstX = 1;
wb.set('TupleTest', 20, DEFAULT, FirstX)
assert(wb.get('TupleTest') === 10)
assert(wb.get('TupleTest', DEFAULT, FirstX) === 20)
wb.set('TupleTest', 30, DEFAULT, FirstX, FirstY)
assert(wb.get('TupleTest', DEFAULT, FirstX) == 20, wb.get('TupleTest', DEFAULT, FirstX))
wb.set('TupleTest', 40, DEFAULT, FirstX, 0)
assert(wb.get('TupleTest', DEFAULT, FirstX, FirstY) == 30)
var tupleTestSUM = wb.get('TupleTestSUM', DEFAULT, undefined, YAxis[0].parent);
assert.equal(tupleTestSUM, 10 + 2, tupleTestSUM + ' they should be 12')

wb.createFormula("''", "TupleName", DEFAULT, true);
wb.set('TupleName', 'Piet', DEFAULT, 0, 0)
wb.set('TupleName', 'Jan', DEFAULT, 0, 1)
wb.set('TupleName', 'Klaas', DEFAULT, 0, 2)
assert(wb.get('TupleName') === 'Piet')