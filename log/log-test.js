const assert = require('assert');
const log = require('./log')
const debug = (process.env.ENV == 'debug')
log.dateformat = "HHMM;ssl"
if (debug) {
    assert(log.DEBUG === true)
    assert(log.INFO === true)
    assert(log.TRACE === false)
} else {
    assert(log.DEBUG === false)
    assert(log.INFO === true)
    assert(log.TRACE === false)
}