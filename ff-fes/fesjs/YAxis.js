/**
 * Tuple concept
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
TVALUES = function (func, fId, x, y, z, v) {
    var current = y, returnValue = [];
    var tinstancecount = TINSTANCECOUNT(v, fId, y);
    while (current && tinstancecount >= current.index) {
        returnValue.push(func(fId, x, current, z, v));
        current = current.next;
    }
    return returnValue;
}
//return tuplecount, get max tuple index,
TINSTANCECOUNT = function (v, fId) {
    var keys = Object.keys(v[fId]);
    if (keys.length == 0) {
        return 0;
    }

    var max = keys.reduce(function (a, b) {
        //filter bits 16-24 find highest tuple count.
        if (keys.length == 1) {
            return Math.max((2064384 & parseInt(keys[0])) >> 15);
        }
        return Math.max((2064384 & parseInt(a)) >> 15, (2064384 & parseInt(b)) >> 15);
    });
    return max;
}

module.exports = all;