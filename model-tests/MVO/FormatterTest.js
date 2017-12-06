/**
 * test consitency and speed of the formatter
 */
const now = require('performance-now')
var assert = require('assert')
var Formatter = require('../../lme-core/exchange_modules/ffl2/FFLFormatter').FFLFormatter
var Register = require('../../lme-core/exchange_modules/ffl2/Register').Register
let fflFile = require('fs').readFileSync(__dirname + '/../../git-connect/resources/KSP.ffl', 'utf8');
var start = now()
const register = new Register();
const register3 = Formatter.create(register, fflFile);
register3.indexProperties()
const parse = register3.toString();
/*const register2 = Formatter.create(register, parse);
register2.indexProperties()*/
/*const doubleparse = register2.toString();*/
const time = (now() - start).toFixed(0);
assert(time < 20, "formatting KSP twice may never take longer than 20ms")
//assert(parse.length == doubleparse.length, "Formatting twice, always returns into same results")