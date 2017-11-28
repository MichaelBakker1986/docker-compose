const now = require('performance-now')
var Formatter = require('../plugins/FFLFormatter').LexialParser
let fflFile = require('fs').readFileSync(__dirname + '/../../git-connect/resources/V05.ffl', 'utf8');
var start = now()
let parse = Formatter.parse(fflFile);
console.info('time:' + (now() - start))