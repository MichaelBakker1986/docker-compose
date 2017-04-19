global.loglevel = 'debug'
var log = require('ff-log')
var assert = require('assert')

var FesgraphNthree = require('./ff-fes-graph-nthree')
FesgraphNthree.createThree();
log.info('done')
