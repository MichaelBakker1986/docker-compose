/**
 * TODO: convert into .story file
 * Be aware, empty tuples are included in the T* functions.
 * Tuplevalue test maken.
 */
const assert = require('assert')
const WorkBook = require('../src/JSWorkBook')
const Context = require('../src/Context')
const YAxis = require('../src/YAxis')
require('../../math')
const CalculationFacade = require('../').CalculationFacade;
CalculationFacade.addFunctions(require('../../formulajs-connect').formulajs);
const wb = new WorkBook(new Context());
wb.importSolution(require('fs').readFileSync(__dirname + '/../resources/TupleValueTest.ffl', 'utf-8'), 'ffl');

// 0-Tuple(0)
wb.set('ValueVariable', 5, 'value', undefined, 0);
assert.equal(wb.get('ValueVariableTotal', 'value', 0, 0), 5);
assert.equal(wb.get('Total', 'value'), 5);

// 0-Tuple(2) (skip 0-Tuple(1))
wb.set('ValueVariable', 6, 'value', undefined, 2);
assert.equal(wb.get('ValueVariableTotal', 'value', undefined, 2), 6);
assert.equal(wb.get('Total', 'value'), 11);