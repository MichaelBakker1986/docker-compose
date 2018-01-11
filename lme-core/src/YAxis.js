/**
 * Tuple concept
 * TODO: make tests for nested tuples!
 */

/*var first = {
    prefix: '',
    index: 0,
    hash: 0
};
var all = [first];
first.deeper = first
first.base = first
//32768 is the first index that can be used for tuples
//LGD will use 128*128*128 three level tuples consuming load of bits.
/!**
 * 8*4= 32
 * 128*128*128*128
 * We allow for the first run 8*8*8 tuples. 4+4+4 bits = 12 bits + 10 used by columns
 * So for every tuple depth we reserve 4bits
 * We have to make a Object with 4 levels of depth and 8elements per level
 * 8*8*8
 0* 0
 1*  1
 2*   2
 3*    4
 4*     8
 5*      16
 6*        32
 7*          64
 8*            128
 *!/
for (var i = 1; i < 40; i++) {
    var newYas = {
        index: i,
        hash: 32768 * i,
        depth: 0,
        previous: all[i - 1],
        base: first
    };
    newYas.deeper = newYas//temp self-reference since not used
    all[i - 1].next = newYas;
    all.push(newYas)
}*/

function TupleProto() {
    const all = {
        type: 'def',
        hash: 0,
        index: 0,
        depth: 0,
        deeper: []
    }
    all.base = all;
    for (var i = 0; i < 40; i++) {
        all.deeper[i] = {
            base: all,
            depth: 0,
            type: 'instance',
            index: i,
            hash: (32768 * i),
            deeper: [],
            parent: all
        }
        if (i > 0) all.deeper[i].previous = all.deeper[i - 1]
        if (i > 0) all.deeper[i - 1].next = all.deeper[i]

        for (var j = 0; j < 8; j++) {
            all.deeper[i].deeper[j] = {
                base: all,
                index: j,
                depth: 1,
                hash: (i * 1) + (j * 64),
                deeper: [],
                parent: all.deeper[i]
            }
            if (j > 0) all.deeper[i].deeper[j].previous = all.deeper[i].deeper[j - 1]
            if (j > 0) all.deeper[i].deeper[j - 1].next = all.deeper[i].deeper[j]

            for (var k = 0; k < 8; k++) {
                all.deeper[i].deeper[j].deeper[k] = {
                    base: all,
                    depth: 2,
                    index: k,
                    hash: (i * 1) + (j * 64) + (k * (64 * 8)),
                    parent: all.deeper[i].deeper[j]
                }
                if (k > 0) all.deeper[i].deeper[j].deeper[k].previous = all.deeper[i].deeper[j].deeper[k - 1]
                if (k > 0) all.deeper[i].deeper[j].deeper[k - 1].next = all.deeper[i].deeper[j].deeper[k]
            }
        }
    }
    this.all = all;
}

var all = new TupleProto().all.deeper
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
                //look for all values and obtain tuple instance value
                return Math.max((2064384 & parseInt(a1)) >> 15, (2064384 & parseInt(b1)) >> 15);
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
//columns we need aprox 512 10bit
//17bit for tuples, 8*8*8*8 (16bit)
//when entering tuple in tuple y.children should be called.
module.exports = all;