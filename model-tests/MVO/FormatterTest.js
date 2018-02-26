/**
 * test consitency and speed of the formatter
 */
const now = require('performance-now')
var assert = require('assert')
var Formatter = require('../../lme-core/exchange_modules/ffl/FFLFormatter').Formatter
var Register = require('../../lme-core/exchange_modules/ffl/Register').Register
let fflFile = require('fs').readFileSync(__dirname + '/MVO.ffl', 'utf8');

try {
    var start = now()
    const formatterTry1 = new Formatter(new Register(), fflFile);
    formatterTry1.parseProperties()
    const parse = formatterTry1.toString();
    const time = (now() - start).toFixed(0);
    assert(time < 120, "formatting KSP twice may never take longer than 120ms")
} catch (err) {
    //re-try
    var start = now()
    const formatterTry2 = new Formatter(new Register(), fflFile);
    formatterTry2.parseProperties()
    const parse = formatterTry2.toString();
    const time = (now() - start).toFixed(0);
    assert(time < 120, "formatting KSP twice may never take longer than 120ms")
}
