/**
 * test consitency and speed of the formatter
 */
const now = require('performance-now')
var assert = require('assert')
var Formatter = require('../plugins/FFLFormatter').LexialParser
let fflFile = require('fs').readFileSync(__dirname + '/../../git-connect/resources/KSP.ffl', 'utf8');
var start = now()

const parse = Formatter.parse(fflFile).toString();
const doubleparse = Formatter.parse(parse).toString();
const time = (now() - start).toFixed(0);
assert(time < 8, "formatting KSP twice may never take longer than 8ms")
assert(parse.length == doubleparse.length, "Formatting twice, always returns into same results")