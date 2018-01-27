/*
   This should be catched in a JBehave test.
   Creating new formula's and testing their results.
   This test is too big and does test way too many
 */
const DEFAULT = 'value';
const WorkBook = require('../src/JSWorkBook'), Context = require('../src/Context'), YAxis = require('../src/YAxis');
require('../../math');
const assert = require('assert');
const wb = new WorkBook(new Context(), null, null, {modelName: 'TT1'});
wb.createFormula("10", "DocumentValue", DEFAULT, false, 'document');
wb.createFormula("1", "TupleSibling1", DEFAULT, true, 'document');
wb.createFormula("2+DocumentValue", "TupleSibling2", DEFAULT, true, 'document');
wb.createFormula("TupleSibling1[doc]+TupleSibling2[doc]", "TestTupleValues", DEFAULT, true, 'document');
wb.createFormula("TSUM(TestTupleValues[doc])", "TestTupleValuesSUM", DEFAULT, false, 'document');
wb.createFormula("TCOUNT(TestTupleValues)", "TestTupleValuesCOUNT", DEFAULT, false, 'document');
assert.equal(wb.get("TestTupleValuesCOUNT"), -1);
assert.equal(wb.get("TestTupleValues", DEFAULT, 0, 0), 13);
wb.set('DocumentValue', 100, DEFAULT, 0, 1);//will completely be ignored, since its not a tuple
assert.equal(wb.get("TestTupleValues", DEFAULT, 0, 0), 13);
wb.set('DocumentValue', 100, DEFAULT, 0, 0);
assert.equal(wb.get("TestTupleValues", DEFAULT, 0, 0), 103);
wb.set('TupleSibling1', 2, DEFAULT, 0, 1);
assert.equal(wb.get("TestTupleValues", DEFAULT, 0, 0), 103);
/*//This is hard to test in a unit-test since the Tree-Structure cannot be build.
assert.equal(wb.get("TestTupleValues", DEFAULT, 0, 1), 104);*/
//TupleSibling1 and TupleSibling2 do not know they belong to same tuple group
assert.equal(wb.get('TestTupleValuesSUM'), 0);

wb.createFormula("1+1", "TupleTest", DEFAULT, true, 'column', 'number');
wb.createFormula("TSUM(TupleTest)", "TupleTestSUM", false);

assert.equal(wb.get('TupleTest'), 2);
wb.set('TupleTest', 10);
assert.equal(wb.get('TupleTest'), 10);

wb.set('TupleTest', 20, DEFAULT, 1)
assert.equal(wb.get('TupleTest'), 10)
assert.equal(wb.get('TupleTest', DEFAULT, 1), 20)
wb.set('TupleTest', 30, DEFAULT, 1, 1)
assert.equal(wb.get('TupleTest', DEFAULT, 1), 20, wb.get('TupleTest', DEFAULT, 1))
wb.set('TupleTest', 40, DEFAULT, 1, 0)
assert(wb.get('TupleTest', DEFAULT, 1, 1) == 30)
const tupleTestSUM = wb.get('TupleTestSUM', DEFAULT);
assert.equal(tupleTestSUM, 10 + 2, tupleTestSUM + ' they should be 12')

wb.createFormula("''", "TupleName", DEFAULT, true);
wb.set('TupleName', 'Piet', DEFAULT, 0, 0)
wb.set('TupleName', 'Jan', DEFAULT, 0, 1)
wb.set('TupleName', 'Klaas', DEFAULT, 0, 2)
assert.equal(wb.get('TupleName'), 'Piet')
assert.equal(wb.get('TupleName', DEFAULT, undefined, 1), 'Jan')
assert.equal(wb.get('TupleName', DEFAULT, undefined, 2), 'Klaas')