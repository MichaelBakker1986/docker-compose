var WorkBook = require('../fesjs/JSWorkBook')
var FESContext = require('../fesjs/fescontext')
var wb = new WorkBook(new FESContext());
wb.createFormula("1+1", "TupleTest");
var assert = require('assert');
assert(wb.get('TupleTest') == 2)
wb.set('TupleTest', 10)
assert(wb.get('TupleTest') == 10)
wb.set('TupleTest', 20, 'value', 1)
assert(wb.get('TupleTest') == 10)
assert(wb.get('TupleTest', 'value', 1) == 20)
wb.set('TupleTest', 30, 'value', 1, 1)
assert(wb.get('TupleTest', 'value', 1) == 20)
assert(wb.get('TupleTest', 'value', 1, 1) == 30)
