const logger = require('log6')
const jsMath = require('./jsMath.json')
const Solver = require('js-solver')
const ema = require('exponential-moving-average');
const regression = require('regression')
const jStat = require('jStat').jStat;
const entries = {};
if (!global.MatrixLookup) {
    MatrixLookup = function() {
        return 1;
    }
}
if (!global.MATRIX_VALUES) {
    global.MATRIX_VALUES = {}
}
if (!Array.prototype.stdev)
    Object.defineProperty(Array.prototype, 'stdev', {
        enumerable: false,
        value     : function() {
            //calculate standard deviation of an array
            return jStat.stdev(this, true)
        }
    });
if (!Array.prototype.max)
    Object.defineProperty(Array.prototype, 'max', {
        enumerable: false,
        value     : function() {
            return Math.max.apply(null, this);
        }
    });
if (!Array.prototype.sentiment)
    Object.defineProperty(Array.prototype, 'sentiment', {
        enumerable: false,
        value     : function() {
            const avg = this.reduce(function(a, b, i, arr) {
                a[i] = arr[i] - arr[i - 1]
                return a;
            }, []).splice(1).avg()

            return {
                avg    : avg,
                raising: avg > 0
            }
        }
    });
if (!Array.prototype.maxProfit)
    Object.defineProperty(Array.prototype, 'maxProfit', {
        enumerable: false,
        value     : function() {
            return this.reduce((current, b, i) => Math.max(current, b.distance(this.slice(i).max())));
        }
    });
if (!Array.prototype.groupBy)
    Object.defineProperty(Array.prototype, 'groupBy', {
        enumerable: false,
        value     : function(key) {
            return this.reduce(function(rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        }
    });
if (!Array.prototype.linearPredict)
    Object.defineProperty(Array.prototype, 'linearPredict', {
        enumerable: false,
        value     : function(ammount) {
            const r = []
            const predictor = this.linearPredictor();
            for (var i = 0; i < ammount; i++) {
                r.push(predictor(this.length + i))
            }
            return r;
        }
    });
if (!Array.prototype.linearPredictor)
    Object.defineProperty(Array.prototype, 'linearPredictor', {
        enumerable: false,
        value     : function() {
            const linear = regression.linear(this.map((v, i) => [i, v]), { precision: 8 });
            return (offset) => linear.predict(this.length + offset)[1];
        }
    });

if (!Array.prototype.select)
    Object.defineProperty(Array.prototype, 'select', {
        enumerable: false,
        value     : function(name) {
            const v = []
            for (var i = 0; i < this.length; i++) {
                v[i] = this[i][name]
            }
            return v;
        }
    });
if (!Array.prototype.ema)
    Object.defineProperty(Array.prototype, 'ema', {
        enumerable: false,
        value     : function(opts) {
            return ema(this, opts).last()
        }
    });
if (!Array.prototype.avg)
    Object.defineProperty(Array.prototype, 'avg', {
        enumerable: false,
        value     : function() {
            return this.sum() / this.length
        }
    });
if (!Array.prototype.sum)
    Object.defineProperty(Array.prototype, 'sum', {
        enumerable: false,
        value     : function() {
            const nl = this.length;
            const n = this;
            var a = 0;
            for (var j = nl - 1; j >= 0; j--) a = a + n[j];
            return a
        }
    });
/*if (!Array.prototype.column)
    Object.defineProperty(Array.prototype, 'column', {
        enumerable: false,
        value     : function(i) {
            return this.map((el) => el[i])
        }
    });*/
//distance between two numbers
if (!Number.prototype.distance)
    Object.defineProperty(Number.prototype, 'distance', {
        enumerable: false,
        value     : function(other) {
            return (this > other) ? this - other : other - this;
        }
    });
if (!Number.prototype.round)
    Object.defineProperty(Number.prototype, 'round', {
        enumerable: false,
        value     : function(decimals) {
            return Number((this).toFixed(decimals));
        }
    });
if (!Array.prototype.first)
    Object.defineProperty(Array.prototype, 'first', {
        enumerable: false,
        value     : function() {
            return this[1];
        }
    });
if (!Array.prototype.last)
    Object.defineProperty(Array.prototype, 'last', {
        enumerable: false,
        value     : function() {
            return this[this.length - 1];
        }
    });

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
    var total = 0;
    for (var key in arguments) {
        if (arguments[key]) total++
    }
    return total;
}
OnNAIfNumber = function(v, nav) {
    return isNaN(v) ? v : OnNA(v, nav)
}
OnNA = function(v, nav) {
    return (v == null || isNaN(v) || (v != 0 && v != -0 && v < this.n && v > this.ng)) ? nav : v;
}.bind({
    n : 1e-100 * 1000,
    ng: -1e-100 * 1000
})

function closestLowerNum(num, arr) {
    var mid;
    var lo = 0;
    var hi = arr.length - 1;
    while (hi - lo > 1) {
        mid = Math.floor((lo + hi) / 2);
        if (arr[mid] < num) lo = mid;
        else hi = mid;
    }
    if (num - arr[lo] <= arr[hi] - num) return arr[lo];
    return arr[lo];//change to hi to get the nearest
}

MatrixLookDown = function(table, row, col) {
    var rv = NA;
    if (table.xasValues && table.xasValues[row] && table.xasValues[row][col] !== undefined) {
        rv = table.xasValues[row][col];
    } else if (table.xasValues && table.x_sort) {
        const v = closestLowerNum(row, table.x_sort)
        rv = table.xasValues[v][col];
    }
    return rv;
}
MatrixLookup = function(xlsfileName, tableName, row, col) {
    if (!MATRIX_VALUES) return NA
    const table = MATRIX_VALUES[tableName];
    var rv = NA;
    if (table) rv = MatrixLookDown(table, row, col)
    return rv;
}

FILLEDIN = function(required, entered) {
    return true;
}
YearInT = function(v, x) {
    return v.absolute_start_year + x.bkyr.index
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
                y   : point[1]
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
HVALUES = function(values, start, end) {
    var returnValue = [];
    if (start.hash) start = start.hash
    if (end.hash) end = end.hash
    for (var i = (start || 0); i <= (end || values.length); i++) {
        returnValue.push(values[i]);
    }
    return returnValue;
}
VALUES = function(func, fId, x, y, z, v, m) {
    var result = []
    for (var i = 0; i < x.aggcols.length; i++) {
        if (!x.aggcols[i].aggregated)//TODO: aggregation is serveral levels
            result.push(func(fId, x.aggcols[i], y, z, v, m))
    }
    return result;
}
/*f=Self for now..*/
Aggregate = function(f, x) {
    return f;
}
GetValue = function(variable_value, x, y, z, v, am) {
    return variable_value;
}
//'^[0-9]+$'
REGEXPMATCH = function(pattern, value) {
    return new RegExp(pattern).test(value) ? true : false;
}
ValueT = function(one) {
    var retrunValue = 0;
    while (one && !one.dummy) {
        retrunValue++;
        one = one.prev
    }
    return retrunValue
}
initJSMath(jsMath);
exports.mathJs = {
    name   : 'ff-math',
    entries: entries
}