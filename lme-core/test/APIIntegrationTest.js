const assert = require('assert');
const CalculationFacade = require('../').CalculationFacade;
const WorkBook = require('../src/JSWorkBook'), Context = require('../src/Context')
const wb = new WorkBook(new Context(), null, null, {modelName: 'APITEST'});
wb.createFormula("1+1", "TimeTest", 'value', true, 'column');
wb.findNode('TimeTest').tupleDefinitionName = 'TimeTest'
assert.equal(wb.get('TimeTest'), 2)
wb.set('TimeTest', 10)
assert.equal(wb.get('TimeTest'), 10)
wb.set('TimeTest', 20, 'value', 1)
assert.equal(wb.get('TimeTest'), 10)
assert.equal(wb.get('TimeTest', 'value', 1), 20)
wb.set('TimeTest', 30, 'value', 2, 1)
assert.equal(wb.get('TimeTest', 'value', 2, 1), 30)
const timeTestValues = CalculationFacade.getValue({
    properties: {value: true},
    values: wb.context.values
}, 'APITEST_TimeTest')[0];
assert.equal(timeTestValues[0].value, 10)
assert.equal(timeTestValues[1].value, 20)
assert.equal(timeTestValues[2].value, 2)
CalculationFacade.getValue({properties: {value: true}, values: wb.context.values}, 'APITEST_TimeTest', 3, 1100);