/**
 * TODO: convert into JBehave story.
 * Given tuple TupleTest having formula 0
 * Given TupleTestSUM having formula TSUM(TupleTest)
 *
 * Test TSUM/TupleSum Function and concepts
 */
const WorkBook = require('../src/JSWorkBook'), Context = require('../src/Context'), YAxis = require('../src/YAxis');
require('../../math');
const assert = require('assert');
const wb = new WorkBook(new Context(), null, null, {modelName: 'TT2'});

wb.createFormula("0", "TupleTest", 'value', true, 'document', 'number');
wb.createFormula("TSUM(TupleTest)", "TupleTestSUM", false, 'document');

wb.set('TupleTest', 30)
assert.equal(wb.get('TupleTest'), 30, wb.get('TupleTest'))
wb.set('TupleTest', 40, 'value', undefined, 1)
assert.equal(wb.get('TupleTest', 'value', undefined, 1), 40)
assert.equal(wb.get('TupleTestSUM'), 70)
wb.set('TupleTest', null, 'value', undefined, 1)
assert.equal(wb.get('TupleTestSUM'), 30)
