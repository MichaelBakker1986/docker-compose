var log = require('ff-log')
var WorkBook = require('../fesjs/JSWorkBook')
var FESContext = require('../fesjs/fescontext')
// TSUM = function (func, fId, x, y, z, v) {
//     var current = y, returnValue = 0;
//     while (current) {
//         returnValue += func(fId, x, current, z, v);
//         current = current.next;
//     }
//     return returnValue;
// }
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
assert(wb.get('TupleTestSUM', 'value',1) == 70)// 40+30
