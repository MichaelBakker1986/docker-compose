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
module.exports = TupleIndexConverter.prototype;
