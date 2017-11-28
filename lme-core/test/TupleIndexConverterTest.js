const assert = require('assert')
var TupleIndexConverter = require('../src/TupleIndexConverter')
var ctx = {};
//reuse context
assert.equal(0, TupleIndexConverter.getIndexNumber(ctx, 'Bob'));
assert.equal(0, TupleIndexConverter.getIndexNumber(ctx, 'Bob'));
assert.equal(1, TupleIndexConverter.getIndexNumber(ctx, 'Alisia'));
assert.equal(0, TupleIndexConverter.getIndexNumber(ctx, 'Bob'));
assert.equal(1, TupleIndexConverter.getIndexNumber(ctx, 'Alisia'));
assert.equal(2, TupleIndexConverter.getIndexNumber(ctx, '2Alisia'));
//new context
assert.equal(0, TupleIndexConverter.getIndexNumber({}, 'Alisia'));