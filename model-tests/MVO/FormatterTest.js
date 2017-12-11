/**
 * test consitency and speed of the formatter
 */
const now = require('performance-now')
var assert = require('assert')
var Formatter = require('../../lme-core/exchange_modules/ffl2/FFLFormatter').Formatter
var Register = require('../../lme-core/exchange_modules/ffl2/Register').Register
let fflFile = require('fs').readFileSync(__dirname + '/MVO.ffl', 'utf8');
var start = now()
const register = new Register();
const register3 = new Formatter(register, fflFile);
register3.parseProperties()
const parse = register3.toString();
const time = (now() - start).toFixed(0);
assert(time < 80, "formatting KSP twice may never take longer than 80ms")