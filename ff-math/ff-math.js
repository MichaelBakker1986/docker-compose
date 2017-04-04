var logger = require('ff-log')
var jsMath = require(__dirname + '/jsMath.json')
var entries = {};

//add functions found in the jsMath to the global scope
function initJSMath(jsMath) {
    for (var func in jsMath) {
        var mathfunc = jsMath[func];
        if (global[func] === undefined) {
            //functions
            if (typeof mathfunc === 'object') {
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
initJSMath(jsMath);
exports.mathJs = {
    name: 'ff-math',
    entries: entries
}