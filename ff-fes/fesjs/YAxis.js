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
/**
 * Tuple concept
 */
module.exports = all;