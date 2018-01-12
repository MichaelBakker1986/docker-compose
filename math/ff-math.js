const logger = require('log6')
const jsMath = require('./jsMath.json')
const Solver = require('js-solver')
const entries = {};
if (!global.MatrixLookup) {
    MatrixLookup = function() {
        return 1;
    }
}
if (!global.MATRIX_VALUES) {
    global.MATRIX_VALUES = {}
}

//add functions found in the jsMath to the global scope
function initJSMath(jsMath) {
    for (var func in jsMath) {
        var mathfunc = jsMath[func];
        if (global[func] === undefined) {
            //functions
            if (typeof mathfunc === 'object') {
                if (logger.TRACE) logger.trace('Added function[%s] arguments[%s] body: [%s]', func, mathfunc.args, mathfunc.body)
                global[func] = new Function(mathfunc.args, mathfunc.body);
            }
            else {
                //variables
                global[func] = mathfunc;
            }
        }
        else {
            if (logger.DEBUG) logger.debug('Function [' + func + '] is already defined.');
        }
    }
}

//TODO: add these functions as internal functions
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

MatrixLookup = function(xlsfileName, tableName, row, col) {
    if (!MATRIX_VALUES) return NA
    var table = MATRIX_VALUES[tableName];
    if (table && table.xasValues && table.xasValues[row] && table.xasValues[row][col] !== undefined) {
        return table.xasValues[row][col];
    } else if (table && table.xasValues) {
        let lastidx = null;
        for (var key in table.xasValues) {
            if (key <= row) {
                lastidx = key;
            } else {
                break;
            }
        }
        if (lastidx) return table.xasValues[lastidx][col];
    }
    return NA;
}

FILLEDIN = function(required, entered) {
    console.info(required)
    console.info(entered)
    return true;
}
//should be:  arguments => { name: $1, y: $2 }
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
HSUM = function(values, start, end) {
    var returnValue = 0;
    if (start.hash) start = start.hash
    if (end.hash) end = end.hash
    for (var i = (start || 0); i <= (end || values.length); i++) {
        returnValue += values[i];
    }
    return returnValue;
}
VALUES = function(func, fId, x, y, z, v) {
    var result = []
    for (var i = 0; i < x.aggcols.length; i++) {
        if (!x.aggcols[i].aggregated)//TODO: aggregation is serveral levels
            result.push(func(fId, x.aggcols[i], y, z, v))
    }
    return result;
}
GetValue = function(variable, x, y, z, v, amm) {
    return 1;//variable('123', x, y, z, v)
}

ValueT = function(one) {
    let retrunValue = 0;
    while (one && !one.dummy) {
        retrunValue++;
        one = one.prev
    }
    return retrunValue
}
initJSMath(jsMath);
exports.mathJs = {
    name: 'ff-math',
    entries: entries
}