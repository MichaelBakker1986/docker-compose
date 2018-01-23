/**
 * Test TSUM/TupleSum Function and concepts
 */
const WorkBook = require('../src/JSWorkBook');
const Context = require('../src/Context');
const YAxis = require('../src/YAxis');
require('../../math');
const assert = require('assert');
const wb = new WorkBook(new Context(), null, null, {modelName: 'TT2'});
wb.createFormula("0", "TupleTest", 'value', true, 'document', 'number');
wb.createFormula("TSUM(TupleTest)", "TupleTestSUM", false, 'document');
wb.set('TupleTest', 30, 'value', undefined, 0)
assert.equal(wb.get('TupleTest', 'value', undefined, 0), 30, wb.get('TupleTest', 'value', undefined))
wb.set('TupleTest', 40, 'value', undefined, 1)
assert.equal(wb.get('TupleTest', 'value', undefined, 1), 40)
assert.equal(wb.get('TupleTestSUM', 'value', undefined, YAxis[0].parent), 70)
wb.set('TupleTest', null, 'value', undefined, 1)
assert.equal(wb.get('TupleTestSUM', 'value'), 30)
