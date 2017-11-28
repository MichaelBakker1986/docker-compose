global.debuglevel = 'debug'
var log = require('ff-log')
var time = require('../src/XAxis')
require('../../math')
var currentTime = time.bkyr.columns[0][0]
while (currentTime) {
    log.debug('[%s]%s', currentTime.hash, ValueT(currentTime))
    currentTime = currentTime.next;
}