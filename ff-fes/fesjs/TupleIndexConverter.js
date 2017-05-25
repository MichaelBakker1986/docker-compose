var assert = require('assert')
function TupleIndexConverter() {
}
//TODO: move to TupleDefinition to support multiple tuples and tuple in tuple
TupleIndexConverter.prototype.getIndexNumber = function (context, tupleindex, variableNameArg) {
    // If tuple index list does not exist, make one
    var variableName = variableNameArg || 'NOCATEGORY'
    context.tupleIndexList = context.tupleIndexList || {}
    //create entry per variable, *if not exists
    var tuples = context.tupleIndexList[variableName] = context.tupleIndexList[variableName] || {}
    // Check if tuple index string exists, else create and return it
    return parseInt(tuples[tupleindex] || (tuples[tupleindex] = '' + Object.keys(tuples).length));
};
var ctx = {};
//reuse context
assert.equal(0, TupleIndexConverter.prototype.getIndexNumber(ctx, 'Bob'));
assert.equal(0, TupleIndexConverter.prototype.getIndexNumber(ctx, 'Bob'));
assert.equal(1, TupleIndexConverter.prototype.getIndexNumber(ctx, 'Alisia'));
assert.equal(0, TupleIndexConverter.prototype.getIndexNumber(ctx, 'Bob'));
assert.equal(1, TupleIndexConverter.prototype.getIndexNumber(ctx, 'Alisia'));
assert.equal(2, TupleIndexConverter.prototype.getIndexNumber(ctx, '2Alisia'));
//new context
assert.equal(0, TupleIndexConverter.prototype.getIndexNumber({}, 'Alisia'));
module.exports = TupleIndexConverter.prototype;
