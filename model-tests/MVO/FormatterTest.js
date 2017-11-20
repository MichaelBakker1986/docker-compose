const now = require('performance-now')

var Formatter = require('../plugins/FFLFormatter').LexialParser
let fflFile = require('fs').readFileSync('../../ff-ssh-git/resources/V05.ffl', 'utf8');
var start = now()
let parse = Formatter.parse(fflFile);
console.info(Object.keys(parse.vars()).length)
console.info((now() - start))