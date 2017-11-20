const now = require('performance-now')
var Formatter = require('../plugins/FFLFormatter').LexialParser
let fflFile = require('fs').readFileSync(__dirname + '/MVO.ffl', 'utf8');
var start = now()
let parse = Formatter.parse(fflFile);
//the MVO.ffl is already formatted, the result is the same when formatting twice.
require('assert').ok(parse, fflFile)