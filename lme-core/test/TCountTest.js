/**
 * Test TCOUNT/TupleCount Function and concepts
 */
const WorkBook = require('../src/JSWorkBook');
const Context = require('../src/Context');
const YAxis = require('../src/YAxis');
require('../../math');
const assert = require('assert');
const wb = new WorkBook(new Context(), null, null, {modelName: 'TC'});
wb.createFormula("0", "TTest", 'value', true, 'document', 'number');
wb.createFormula("TCOUNT(TTest)", "TCOUNTTEST", false, 'document');
assert.equal(wb.get('TCOUNTTEST', 'value', undefined, YAxis[0].parent), -1)
wb.set('TTest', 30, 'value', undefined, 0)
assert.equal(wb.get('TCOUNTTEST', 'value', undefined, YAxis[0].parent), 0)
wb.set('TTest', 30, 'value', undefined, 1)
assert.equal(wb.get('TCOUNTTEST', 'value', undefined, YAxis[0].parent), 1)
