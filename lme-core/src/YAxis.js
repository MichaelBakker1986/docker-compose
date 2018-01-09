/**
 * Tuple concept
 * TODO: make tests for nested tuples!
 */
var first = {
    index: 0,
    hash: 0
};
var all = [first];
first.base = first
for (var i = 1; i < 40; i++) {
    var newYas = {
        index: i,
        hash: 32768 * i,
        previous: all[i - 1],
        base: first
    };
    all[i - 1].next = newYas;
    all.push(newYas)
}

//return all values in given tuple
TVALUES = function(fIds, func, fId, x, y, z, v) {
    var current = y, returnValue = [];
    var tinstancecount = TINSTANCECOUNT(fIds, v);
    while (current && tinstancecount >= current.index) {
        var tempValue = func(fId, x, current, z, v);
        returnValue.push(tempValue);
        current = current.next;
    }
    return returnValue;
}
TCOUNT = function(fIds, func, fId, x, y, z, v) {
    return TINSTANCECOUNT(fIds, v);
}

//return tuplecount, get max tuple index,
TINSTANCECOUNT = function(fIds, v) {
    var max = -1;
    for (var fid = 0; fid < fIds.length; fid++) {
        var fId = fIds[fid];
        var keys = Object.keys(v[fId]);
        //quick-fix remove NULL values..
        for (var i = 0; i < keys.length; i++) {
            var obj = keys[i];
            if (v[fId][obj] == null) {
                keys.splice(i, 1);
            }
        }
        if (keys.length == 0) {
            continue;
        }
        else if (keys.length == 1) {
            max = Math.max(max, (2064384 & parseInt(keys[0])) >> 15);
        } else {
            max = Math.max(max, keys.reduce(function(a1, b1) {
                //filter bits 16-24 find highest tuple count.
                //mask should be provided
                //look for all values and obtain tuple instnace value
                var number = Math.max((2064384 & parseInt(a1)) >> 15, (2064384 & parseInt(b1)) >> 15);
                return number;
            }))
        }
    }
    return max;
}
/*
 Does only look for document values
 * so only look for mask where first 15bits are 0
 * Get all 0*values for example used for tupleInstanceIdentiefiers
 */
TINSTANCEBYNAME = function(v, fId, y, name) {
    var count = TINSTANCECOUNT(v, fId);
    for (var i = 0; i < count; i++) {
        var obj = v[fId][y];

    }
}
//timelines we need aprox 8 4 bit
//columns we need aprox 512 10bit
//17bit for tuples, 8*8*8*8 (16bit)
//when entering tuple in tuple y.children should be called.
module.exports = all;