

var first = {
    hash: 0
};
first.base = first
var second = {
    hash: 32768,
    previous: first,
    base: first
};
first.next = second;
/**
 * Tuple concept
 */
module.exports = [first, second]