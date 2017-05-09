var fesjsApi = require('../ff-fes').fesjs;
var log = require('ff-log')
var WorkBook = require('../fesjs/JSWorkBook')
var FESContext = require('../fesjs/fescontext')
var wb = new WorkBook(new FESContext());
wb.modelName = 'APITEST'
//choices require value functions..
wb.createFormula("''", "CHOICE_TEST")
wb.createFormula("[{'name':' 0','value':'VWO'},{'name':'1','value':'VMBO-MBO'},{'name':'2','value':'VMBO-HAVO'},{'name':'3','value':'HAVO'}]", "CHOICE_TEST", "choices")
var fesGetValue = fesjsApi.fesGetValue({
    properties: {
        choices: true,
        value: true
    },
    columns: 1,
    values: []
}, 'NEW_CHOICE_TEST', 0);
wb.createFormula("1+1", "TimeTest");
var assert = require('assert');
assert(wb.get('TimeTest') == 2)
wb.set('TimeTest', 10)
assert(wb.get('TimeTest') == 10)
wb.set('TimeTest', 20, 'value', 1)
assert(wb.get('TimeTest') == 10)
assert(wb.get('TimeTest', 'value', 1) == 20)
wb.set('TimeTest', 30, 'value', 2, 1)
assert(wb.get('TimeTest', 'value', 2, 1) == 30)
var timeTestValues = fesjsApi.fesGetValue({
    properties: {
        value: true
    },
    values: wb.context.values
}, 'APITEST_TimeTest')[0];
assert(timeTestValues[0].value === 10)
assert(timeTestValues[1].value === 20)
assert(timeTestValues[2].value === 2)
fesjsApi.fesGetValue({
    properties: {
        value: true
    },
    values: wb.context.values
}, 'APITEST_TimeTest', 3, 1100);
var timeTestValuesa = fesjsApi.fesGetValue({
    properties: {
        value: true
    },
    values: wb.context.values
}, 'APITEST_TimeTest', 0, 1000)[0];
assert(timeTestValuesa[3].value === 1100)
assert(timeTestValuesa[0].value === 1000)