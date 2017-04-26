var log = require('ff-log')
var WorkBook = require('../fesjs/JSWorkBook')
var FESContext = require('../fesjs/fescontext')

/*var ARGUMENT_NAMES = /([^\s,]+)/g;
 function getParamNames(func) {
 var fnStr = func.toString();
 return fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES) || [];
 }*/
//var test = getParamNames(TSUM);
var wb = new WorkBook(new FESContext());
wb.createFormula("1+1", "TupleTest");
wb.createFormula("TSUM(TupleTest)", "TupleTestSUM");
var assert = require('assert');
assert(wb.get('TupleTest') == 2)
wb.set('TupleTest', 10)
assert(wb.get('TupleTest') == 10)

var FirstY = 1;
var FirstX = 1;

wb.set('TupleTest', 20, 'value', FirstX)
assert(wb.get('TupleTest') == 10)
assert(wb.get('TupleTest', 'value', FirstX) == 20)
wb.set('TupleTest', 30, 'value', FirstX, FirstY)
assert(wb.get('TupleTest', 'value', FirstY) == 20)
wb.set('TupleTest', 40, 'value', FirstY, 0)
assert(wb.get('TupleTest', 'value', FirstX, FirstY) == 30)
assert(wb.get('TupleTestSUM') == 10 + 2)
assert(wb.get('TupleTestSUM', 'value', FirstX) == 40 + 30)
wb.set('TupleTest', 100, 'value', FirstX, 30)
assert(wb.get('TupleTestSUM', 'value', FirstY) == 100 + 40 + 30 + 2 * 28)
wb.set('TupleTest', null, 'value', FirstX, 30)
assert(wb.get('TupleTestSUM', 'value', FirstX) == 40 + 30)