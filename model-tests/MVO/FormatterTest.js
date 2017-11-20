const now = require('performance-now')
var Formatter = require('../plugins/FFLFormatter').LexialParser
let fflFile = require('fs').readFileSync(__dirname + '/../../ff-ssh-git/resources/V05.ffl', 'utf8');
var start = now()
let parse = Formatter.parse(fflFile);
console.info('time:' + (now() - start))
//the MVO.ffl is already formatted, the result is the same when formatting twice.
//require('assert').ok(parse.toString(), fflFile)