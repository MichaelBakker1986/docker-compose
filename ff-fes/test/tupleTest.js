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
wb.set('TupleTest', 20, 'value', 1)
assert(wb.get('TupleTest') == 10)
assert(wb.get('TupleTest', 'value', 1) == 20)
wb.set('TupleTest', 30, 'value', 1, 1)
assert(wb.get('TupleTest', 'value', 1) == 20)
wb.set('TupleTest', 40, 'value', 1, 0)
assert(wb.get('TupleTest', 'value', 1, 1) == 30)
assert(wb.get('TupleTestSUM') == 12) //10+2
assert(wb.get('TupleTestSUM', 'value', 1) == 70)// 40+30

wb.set('TupleTest', 100, 'value', 1, 30)
assert(wb.get('TupleTestSUM', 'value', 1) == 170+56)
wb.set('TupleTest', null, 'value', 1, 30)
console.info(wb.get('TupleTestSUM', 'value', 1))

var bla = {
    5: true,
    15: true,
    50000: true,
    53: true,
    1000: true
}
