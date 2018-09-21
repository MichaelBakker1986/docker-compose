'use strict';

require('ffl-math');

var _assert = require('assert');

var _ = require('../');

var wb = new _.WorkBook(new _.Context(), null, null, { modelName: 'TT1' }); /*
                                                                             This should be caught in a JBehave test.
                                                                             Creating new formula's and testing their results.
                                                                             This test is too big and does test way too many
                                                                             */


wb.createFormula('10', 'DocumentValue', _.VALUE, false, _.DOCUMENT);
wb.createFormula('1', 'TupleSibling1', _.VALUE, true, _.DOCUMENT);
wb.createFormula('2+DocumentValue', 'TupleSibling2', _.VALUE, true, _.DOCUMENT);
wb.createFormula('TupleSibling1[doc]+TupleSibling2[doc]', 'TestTupleValues', _.VALUE, true, _.DOCUMENT);
wb.createFormula('TSUM(TestTupleValues[doc])', 'TestTupleValuesSUM', _.VALUE, false, _.DOCUMENT);
wb.createFormula('TCOUNT(TestTupleValues)', 'TestTupleValuesCOUNT', _.VALUE, false, _.DOCUMENT);
(0, _assert.equal)(wb.get('TestTupleValuesCOUNT'), 0);
(0, _assert.equal)(wb.get('TestTupleValues', _.VALUE, 0, 0), 13);
wb.set('DocumentValue', 100, _.VALUE, 0, 1); //will completely be ignored, since its not a tuple
(0, _assert.equal)(wb.get('TestTupleValues', _.VALUE, 0, 0), 13);
wb.set('DocumentValue', 100, _.VALUE, 0, 0);
(0, _assert.equal)(wb.get('TestTupleValues', _.VALUE, 0, 0), 103);
wb.set('TupleSibling1', 2, _.VALUE, 0, 1);
(0, _assert.equal)(wb.get('TestTupleValues', _.VALUE, 0, 0), 103);
/*//This is hard to test in a unit-test since the Tree-Structure cannot be build.
 equal(wb.get("TestTupleValues", VALUE, 0, 1), 104);*/
//TupleSibling1 and TupleSibling2 do not know they belong to same tuple group
(0, _assert.equal)(wb.get('TestTupleValuesSUM'), 0);

wb.createFormula('1+1', 'TupleTest', _.VALUE, true, 'column', 'number');
wb.createFormula('TSUM(TupleTest)', 'TupleTestSUM', false);

(0, _assert.equal)(wb.get('TupleTest'), 2);
wb.set('TupleTest', 10);
(0, _assert.equal)(wb.get('TupleTest'), 10);

wb.set('TupleTest', 20, _.VALUE, 1);
(0, _assert.equal)(wb.get('TupleTest'), 10);
(0, _assert.equal)(wb.get('TupleTest', _.VALUE, 1), 20);
wb.set('TupleTest', 30, _.VALUE, 1, 1);
(0, _assert.equal)(wb.get('TupleTest', _.VALUE, 1), 20, wb.get('TupleTest', _.VALUE, 1));
wb.set('TupleTest', 40, _.VALUE, 1, 0);
(0, _assert.equal)(wb.get('TupleTest', _.VALUE, 1, 1), 30);
var tupleTestSUM = wb.get('TupleTestSUM', _.VALUE);
(0, _assert.equal)(tupleTestSUM, 10 + 2, tupleTestSUM + ' they should be 12');

wb.createFormula('\'\'', 'TupleName', _.VALUE, true);
wb.set('TupleName', 'Piet', _.VALUE, 0, 0);
wb.set('TupleName', 'Jan', _.VALUE, 0, 1);
wb.set('TupleName', 'Klaas', _.VALUE, 0, 2);
(0, _assert.equal)(wb.get('TupleName'), 'Piet');
(0, _assert.equal)(wb.get('TupleName', _.VALUE, undefined, 1), 'Jan');
(0, _assert.equal)(wb.get('TupleName', _.VALUE, undefined, 2), 'Klaas');