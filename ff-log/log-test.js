var assert = require('assert');
global.loglevel = 'info'
var log = require('./ff-log')
log.dateformat = "HHMM;ssl"
assert(log.DEBUG === false)
assert(log.INFO === true)
assert(log.TRACE === false)