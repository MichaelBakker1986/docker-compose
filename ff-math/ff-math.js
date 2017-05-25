var logger = require('ff-log')
var jsMath = require('./jsMath.json')
var entries = {};

//add functions found in the jsMath to the global scope
function initJSMath(jsMath) {
    for (var func in jsMath) {
        var mathfunc = jsMath[func];
        if (global[func] === undefined) {
            //functions
            if (typeof mathfunc === 'object') {
                logger.debug('Added function[%s] arguments[%s] body: [%s]', func, mathfunc.args, mathfunc.body)
                global[func] = new Function(mathfunc.args, mathfunc.body);
            }
            else {
                //variables
                global[func] = mathfunc;
            }
        }
        else {
            logger.warn('Function [' + func + '] is already defined.');
        }
    }
}
HSUM = function (fId, func, v, x, y, z, start, end) {
    var returnValue = 0;
    for (var i = start || x.first.index; i < end || x.last.index; i++) {
        returnValue += func(fId, x[i], y, z, v);
    }
    return returnValue;
}

initJSMath(jsMath);
exports.mathJs = {
    name: 'ff-math',
    entries: entries
}