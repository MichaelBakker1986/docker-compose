function TupleIndexConverter() {
}

TupleIndexConverter.prototype.getIndexNumber = function(context, tupleindex)
{
    // If tuple index list does not exist, make one
    if (context.tupleIndexList === undefined){
        context.tupleIndexList = new Array();
    }

    // Check if tupleindex string exists
    var returnIndex;
    context.tupleIndexList.every(function(currentValue, index)
    {
        if (currentValue === tupleindex) {
            returnIndex = index;
            return false;
        }
        else{
            return true;
        }
    });

    // If not, push the new tuple index to the list
    if (returnIndex === undefined)
    {
        context.tupleIndexList.push(tupleindex);
        return (context.tupleIndexList.length - 1) + 1;
    }
    else
    {
        return returnIndex + 1;
    }
};

module.exports = TupleIndexConverter.prototype;