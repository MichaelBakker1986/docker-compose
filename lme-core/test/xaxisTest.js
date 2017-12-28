const log = require('log6')
const time = require('../src/XAxis')
const assert = require('assert')
require('../../math')
var currentTime = time.bkyr.columns[0][0]
let columns = 0;
while (currentTime) {
    if (log.TRACE) log.trace('[%s]%s', currentTime.hash, ValueT(currentTime))
    currentTime = currentTime.next;
    columns++;
}
assert.equal(columns, 40, 'We use 40columns for now')