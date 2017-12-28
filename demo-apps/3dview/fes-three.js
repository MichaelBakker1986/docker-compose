global.loglevel = 'debug'
var log = require('log6')
var assert = require('assert')

var FesgraphNthree = require('./ff-fes-graph-nthree')
FesgraphNthree.createThree();
log.info('done')
