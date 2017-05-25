var assert = require('assert');
global.loglevel = 'info'
var MOD = 100000000;
var log = require('./ff-log')
log.dateformat = "HHMM;ssl"
for (var i = 0; i < 999999999; i++) {
    var modCOUNT = i % MOD;
    var modLOG = i / MOD;
    if (modCOUNT == 0) {
        log.debug('test debug ' + modLOG)
        log.info('test info ' + modLOG)
    }
}
assert(log.DEBUG === false)
assert(log.INFO === true)
assert(log.TRACE === false)