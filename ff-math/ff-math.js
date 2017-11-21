const logger = require('../ff-log')
const jsMath = require('./jsMath.json')
const Solver = require('js-solver')
const entries = {};

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
            logger.debug('Function [' + func + '] is already defined.');
        }
    }
}

SOLVER = function(args) {
    return new Solver(args || arguments)
}
AMMOUNT = function() {
    let total = 0;
    for (var key in arguments) {
        if (arguments[key]) total++
    }
    return total;
}
OnNA = function(v, nav) {
    if (v == null || isNaN(v) || (v !== 0 && v < 0.00001 && v > -0.00001)) {
        return nav;
    }
    return v;
}
PIECHART = function(points) {
    var result = [];
    for (var i = 0; i < arguments.length; i++) {
        var points = arguments[i];
        for (var index = 0; index < points.length; index++) {
            var point = points[index];
            result.push({
                name: point[0],
                y: point[1]
            })
        }
    }
    return result;
}
HSUM = function(fId, func, v, x, y, z, start, end) {
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