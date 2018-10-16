'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.entries = exports.name = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _arguments = arguments;

var _regression = require('regression');

var _regression2 = _interopRequireDefault(_regression);

var _exponentialMovingAverage = require('exponential-moving-average');

var _exponentialMovingAverage2 = _interopRequireDefault(_exponentialMovingAverage);

var _jsSolver = require('js-solver');

var _jsSolver2 = _interopRequireDefault(_jsSolver);

var _log = require('log6');

var _jStat = require('jStat');

var jStat = _interopRequireWildcard(_jStat);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsMath = {
	Length: {
		args: 'v1',
		body: 'return String(v1).length'
	},
	OnER: {
		args: 'v,onerrv',
		body: 'return isNaN(v) ? onerrv : v'
	},
	Oner: {
		args: 'v,onerrv',
		body: 'return isNaN(v) ? onerrv : v'
	},
	OnEr: {
		args: 'v,onerrv',
		body: 'return isNaN(v) ? onerrv : v'
	},
	OnZero: {
		args: 'v,onzerov',
		body: 'return v > 0 ? v : onzerov'
	},
	SUM: {
		args: 'values',
		body: 'var returnValue = 0; for (var i = 0; i < values.length; i++) { returnValue += values[i]; } return returnValue;'
	},
	OnNeg: {
		args: 'arg0,arg1',
		body: 'if (arg0 < 0) { return arg1; } return arg0'
	},
	OnZeroOrNA: {
		args: 'arg0,arg1',
		body: 'return (arg0 == undefined || isNaN(arg0)) ? arg1 : arg0'
	},
	OnZeroOrNa: {
		args: 'v,arg1',
		body: 'return (v == undefined || isNaN(v)) ? arg1 : v'
	},
	OnERorNA: {
		args: 'v,onerrornav',
		body: 'if (v == undefined || isNaN(v)) { return onerrornav; } return v'
	},
	Round: {
		args: 'v,decimals',
		body: 'var pow = Math.pow(10, decimals); return Math.round(v * pow) / pow'
	},
	AVG: {
		args: 'vs',
		body: 'EJS.AVERAGE(vs)'
	},
	MATCH: {
		args: 'v,p',
		body: 'return v === undefined? false : v.match(p);'
	},
	ZeroOnNaN: {
		args: 'v',
		body: 'return parseFloat(isNaN(v) ? 0 : v)'
	},
	VALIDDATE: {
		args: 'd',
		body: 'if (Object.prototype.toString.call(d) === \'[object Date]\' ) {if ( isNaN( d.getTime() ) ) {  return false; } else { return true; } }else { return false; }'
	},
	GET: {
		args: 'url,name',
		body: '{ $.getJSON( \'js/data.json\', function( data ) { CACHE[name] = data; }); }'
	},
	EvaluateAsString: {
		args: 'value',
		body: 'return String(value)'
	},
	FirstUC: {
		args: 'value',
		body: 'return value.charAt(0).toUpperCase() + value.slice(1)'
	},
	AddMonth: {
		args: 'value,ammount',
		body: '{ return 1 }'
	},
	ForAll: {
		args: 'elements',
		body: 'for (var i = 0; i < elements.length; i++) { if (elements[i] ){ return 1 } } return 0'
	},
	PROXY: {
		args: 'proxy',
		body: '{ return proxy }'
	},
	Pos: {
		args: 'one,two',
		body: '{ return (two==null) ? -1 : two.indexOf(one); }'
	},
	Count: {
		args: 'elements',
		body: '{ var counter = 0; for (var i = 0; i < elements.length; i++) { if (elements[i] ){ counter++ } } return counter; }'
	},
	ValueT: {
		args: 'one',
		body: '{ var retrunValue = 1; while(one.prev.hash){ retrunValue++;one=one.prev } return retrunValue }'
	},
	FirstValueT: {
		args: 'x,values,first,last',
		body: '{ return x }'
	},
	LastValueT: {
		args: 'one',
		body: '{ return 1 }'
	},
	DMYtoDate: {
		args: 'd,m,y',
		body: 'return new Date(y,m-1,d)'
	},
	FirstDateInT: {
		args: 'one',
		body: 'return 1'
	},
	TableLookup: {
		args: 'row,col',
		body: '{ return row + col }'
	},
	GetFrac: {
		args: 'one',
		body: '{ return 1 }'
	},
	VSum: {
		args: 'one',
		body: '{ return 1 }'
	},
	FormulasetInT: {
		args: 'one',
		body: '{ return 1 }'
	},
	RelMut: {
		args: 'one',
		body: '{ return 1 }'
	},
	YearInT: {
		args: 'v,x',
		body: '{ v.absolute_start_year + x.bkyr.index }'
	},
	YearToT: {
		args: 'one',
		body: '{ return 1 }'
	},
	GetT: {
		args: 'one',
		body: '{ return 1 }'
	},
	FirstTInYear: {
		args: 'one',
		body: '{ return 1 }'
	},
	FirstTinYear: {
		args: 'one',
		body: '{ return 1 }'
	},
	FirstTinformulaset: {
		args: 'one',
		body: '{ return 1 }'
	},
	PeriodInT: {
		args: 'one',
		body: '{ return 1 }'
	},
	LastDateInT: {
		args: 'one',
		body: 'return 2016'
	},
	FirstTinFormulaset: {
		args: 'one',
		body: 'return 1'
	},
	FesExpression: {
		args: 'one',
		body: 'return one'
	},
	RoundUp: {
		args: 'num,precision',
		body: 'return Math.ceil(num * precision) / precision'
	},
	Mut: {
		args: 'one',
		body: 'return 1'
	},
	VSUM: {
		args: 'one',
		body: '{ return 1 }'
	},
	GetPoint: {
		args: 'one',
		body: 'return 1'
	},
	Exists: {
		args: 'one',
		body: 'return 1'
	},
	DateToMonth: {
		args: 'value',
		body: 'return new Date(value).getMonth()'
	},
	HAvg: {
		args: 'one',
		body: 'return 1'
	},
	HOVR: {
		args: 'one',
		body: 'return 1'
	},
	BaseCurrencyValue: {
		args: 'one',
		body: 'return 1'
	},
	LastTinFormulaset: {
		args: 'one',
		body: 'return one'
	},
	FirstLC: {
		args: 'value',
		body: 'return value.charAt(0).toLowerCase() + value.slice(1)'
	},
	ExpandFraction: {
		args: 'one',
		body: 'return 1'
	},
	ExpandLevel: {
		args: 'one',
		body: 'return 1'
	},
	MaxValueT: {
		args: 'one',
		body: 'return 1'
	},
	ValueOfT: {
		args: 'one',
		body: 'return 1'
	},
	GuessTerm: {
		args: 'one',
		body: 'return 1'
	},
	ExpandOriginalValue: {
		args: 'one',
		body: 'return 1'
	},
	Datetot: {
		args: 'one',
		body: 'return x'
	},
	DateToT: {
		args: 'x',
		body: 'return x'
	},
	Not: {
		args: 'one',
		body: 'return !one'
	},
	not: {
		args: 'one',
		body: 'return !one'
	},
	Str: {
		args: 'one',
		body: 'return String(one)'
	},
	DateToYear: {
		args: 'one',
		body: 'return new Date(one).getYear()'
	},
	DateToDay: {
		args: 'one',
		body: 'return new Date(one).getDay()'
	},
	CumNormal: {
		args: 'one',
		body: 'return 1'
	},
	SubStr: {
		args: 'value,from,to',
		body: 'return String(value).substring(from,to)'
	},
	Val: {
		args: 'input',
		body: 'return isNaN(input) ? Number(input) : NA'
	},
	SumFor: {
		args: 'one,two,three,fours',
		body: 'return 1'
	},
	MinMax: {
		args: 'value,min,max,fallback',
		body: 'return isNaN(value) ? fallback : value < min ? min : value > max ? max : value'
	},
	LN: {
		args: 'value',
		body: 'return Math.log(Number(value))'
	},
	BivarNormal: {
		args: 'one',
		body: 'return 1'
	},
	GoalSeek: {
		args: 'one',
		body: 'return 1'
	},
	OnNEG: {
		args: 'a,b',
		body: 'return a < 0 ? a : b'
	},
	OnError: {
		args: 'a,b',
		body: 'return isNaN(a) ? b : a'
	},
	DateStr: {
		args: 'date',
		body: 'return new Date(date).toString()'
	},
	DateToYearNum: {
		args: 'value',
		body: 'return new Date(value).getYear()'
	},
	VAL: {
		args: 'input',
		body: 'return isNaN(input) ? Number(input) : NA'
	},
	BeforeStr: {
		args: 'input,before',
		body: 'return String(input).substring(0,String(input).indexOf(String(before)))'
	},
	AfterStr: {
		args: 'input,after',
		body: 'return String(input).substring(String(input).indexOf(String(after)))'
	},
	MutCalc: 1,
	CalculatedInBaseCurrency: 1,
	ScaleFactor: 1,
	NoTrend: 1,
	Trend: 1,
	ApplicationStartDateTime: 1,
	Values: 1,
	X: 1,
	MaxT: 1,
	NumberOfyears: 17,
	NA: 1e-100,
	On: 1,
	No: 0,
	Off: 0,
	True: 1,
	False: 0,
	ViewScaleFactor: 1,
	Backward: 1,
	Decimals: 2
};


var NA = jsMath.NA;

if (!global.MatrixLookup) global.MatrixLookup = function () {
	return 1;
};
if (!global.MATRIX_VALUES) global.MATRIX_VALUES = {};

if (!Array.prototype.stdev) Object.defineProperty(Array.prototype, 'stdev', {
	enumerable: false,
	value: function value() {
		//calculate standard deviation of an array
		return jStat.stdev(this, true);
	}
});
if (!Array.prototype.max) Object.defineProperty(Array.prototype, 'max', {
	enumerable: false,
	value: function value() {
		return Math.max.apply(null, this);
	}
});
if (!Array.prototype.sentiment) Object.defineProperty(Array.prototype, 'sentiment', {
	enumerable: false,
	value: function value() {
		var avg = this.reduce(function (a, b, i, arr) {
			a[i] = arr[i] - arr[i - 1];
			return a;
		}, []).splice(1).avg();

		return {
			avg: avg,
			raising: avg > 0
		};
	}
});
if (!Array.prototype.maxProfit) Object.defineProperty(Array.prototype, 'maxProfit', {
	enumerable: false,
	value: function value() {
		var _this = this;

		return this.reduce(function (current, b, i) {
			return Math.max(current, b.distance(_this.slice(i).max()));
		});
	}
});
if (!Array.prototype.groupBy) Object.defineProperty(Array.prototype, 'groupBy', {
	enumerable: false,
	value: function value(key) {
		return this.reduce(function (rv, x) {
			(rv[x[key]] = rv[x[key]] || []).push(x);
			return rv;
		}, {});
	}
});
if (!Array.prototype.linearPredict) Object.defineProperty(Array.prototype, 'linearPredict', {
	enumerable: false,
	value: function value(amount) {
		var r = [];
		var predictor = this.linearPredictor();
		for (var i = 0; i < amount; i++) {
			r.push(predictor(this.length + i));
		}
		return r;
	}
});

if (!Array.prototype.linearPredictor) Object.defineProperty(Array.prototype, 'linearPredictor', {
	enumerable: false,
	value: function value() {
		var _this2 = this;

		var linear = _regression2.default.linear(this.map(function (v, i) {
			return [i, v];
		}), { precision: 8 });

		return function (offset) {
			return linear.predict(_this2.length + offset)[1];
		};
	}
});
/*if (!Array.prototype.regressR2)
 Object.defineProperty(Array.prototype, 'regressR2', {
 enumerable: false,
 value     : function() {
 return regression.linear(this.map((v, i) => [i, v]), { precision: 8 });

 }
 });*/

if (!Array.prototype.select) Object.defineProperty(Array.prototype, 'select', {
	enumerable: false,
	value: function value(name) {
		return this.map(function (el) {
			return el[name];
		});
	}
});
if (!Array.prototype.ema) Object.defineProperty(Array.prototype, 'ema', {
	enumerable: false,
	value: function value(opts) {
		return (0, _exponentialMovingAverage2.default)(this, opts).last();
	}
});
if (!Array.prototype.avg) Object.defineProperty(Array.prototype, 'avg', {
	enumerable: false,
	value: function value() {
		return this.sum() / this.length;
	}
});
if (!Array.prototype.sum) Object.defineProperty(Array.prototype, 'sum', {
	enumerable: false,
	value: function value() {
		var nl = this.length;
		var n = this;
		var a = 0;
		for (var j = nl - 1; j >= 0; j--) {
			a = a + n[j];
		}return a;
	}
});
if (!Array.prototype.column) Object.defineProperty(Array.prototype, 'column', {
	enumerable: false,
	value: function value(i) {
		return this.map(function (el) {
			return el[i];
		});
	}
});
//distance between two numbers
if (!Number.prototype.distance) Object.defineProperty(Number.prototype, 'distance', {
	enumerable: false,
	value: function value(other) {
		return this > other ? this - other : other - this;
	}
});
if (!Number.prototype.round) Object.defineProperty(Number.prototype, 'round', {
	enumerable: false,
	value: function value(decimals) {
		return Number(this.toFixed(decimals));
	}
});
if (!Array.prototype.first) Object.defineProperty(Array.prototype, 'first', {
	enumerable: false,
	value: function value() {
		return this[1];
	}
});
if (!Array.prototype.last) Object.defineProperty(Array.prototype, 'last', {
	enumerable: false,
	value: function value() {
		return this[this.length - 1];
	}
});

//add functions found in the jsMath to the global scope
function initJSMath(jsMath) {
	for (var jsMath_function_name in jsMath) {
		var math_function = jsMath[jsMath_function_name];
		if (global[jsMath_function_name] === undefined) {
			//functions
			if ((typeof math_function === 'undefined' ? 'undefined' : (0, _typeof3.default)(math_function)) === 'object') {
				if (_log.TRACE) (0, _log.trace)('Added function[' + jsMath_function_name + '] arguments[%s] body: [%s]', math_function.args, math_function.body);
				global[jsMath_function_name] = new Function(math_function.args, math_function.body);
			} else {
				//variables
				global[jsMath_function_name] = math_function;
			}
		} else {
			if (_log.DEBUG) (0, _log.debug)('Function [' + jsMath_function_name + '] is already defined.');
		}
	}
}

//TODO: add these functions as internal functions
global.SOLVER = function (args) {
	return new _jsSolver2.default(args || _arguments);
};
global.AMMOUNT = function () {
	var total = 0;
	for (var key in _arguments) {
		if (_arguments[key]) total++;
	}return total;
};
global.OnNAIfNumber = function (v, nav) {
	return isNaN(v) ? v : OnNA(v, nav);
};
global.OnNA = function (v, nav) {
	return v == null || isNaN(v) || v !== 0 && v !== -0 && v < this.n && v > this.ng ? nav : v;
}.bind({
	n: 1e-10,
	ng: -1e-10
});
var closestLowerNum = function closestLowerNum(num, arr) {
	var mid = void 0;
	var lo = 0;
	var hi = arr.length - 1;
	while (hi - lo > 1) {
		mid = Math.floor((lo + hi) / 2);
		if (arr[mid] < num) lo = mid;else hi = mid;
	}
	if (num - arr[lo] <= arr[hi] - num) return arr[lo];
	return arr[lo]; //change to hi to get the nearest
};

global.MatrixLookDown = function (table, row, col) {
	var rv = NA;
	if (table.xasValues && table.xasValues[row] && table.xasValues[row][col] !== undefined) {
		rv = table.xasValues[row][col];
	} else if (table.xasValues && table.x_sort) {
		var v = closestLowerNum(row, table.x_sort);
		rv = table.xasValues[v][col];
	}
	return rv;
};
global.MatrixLookup = function (xlsFileName, tableName, row, col) {
	if (!MATRIX_VALUES) return NA;
	var table = MATRIX_VALUES[tableName];
	var rv = NA;
	if (table) rv = MatrixLookDown(table, row, col);
	return rv;
};

global.FILLEDIN = function (required, entered) {
	return true;
};
global.YearInT = function (v, x) {
	return v.absolute_start_year + x.bkyr.index;
};
//should be:  arguments => { name: $1, y: $2 }
global.PIECHART = function () {
	var result = [];
	for (var i = 0; i < arguments.length; i++) {
		var points = arguments[i];
		for (var index = 0; index < points.length; index++) {
			var point = points[index];
			result.push({ name: point[0], y: point[1] });
		}
	}
	return result;
};
global.HSUM = function (values, start, end) {
	var returnValue = 0;
	if (start.hash) start = start.hash;
	if (end.hash) end = end.hash;
	for (var i = start || 0; i <= (end || values.length); i++) {
		returnValue += values[i];
	}
	return returnValue;
};
global.HVALUES = function (values, start, end) {
	var returnValue = [];
	if (start.hash) start = start.hash;
	if (end.hash) end = end.hash;
	for (var i = start || 0; i <= (end || values.length); i++) {
		returnValue.push(values[i]);
	}
	return returnValue;
};
var checkIntegrity = function checkIntegrity(result) {
	var set = new Set(result.map(function (el) {
		return typeof el === 'undefined' ? 'undefined' : (0, _typeof3.default)(el);
	}));
	(0, _log.debug)('Data types in ' + Array.from(set.keys()).toString());
};
global.VALUES = function (func, fId, x, y, z, v, m) {
	var result = [];
	for (var i = 0; i < x.aggcols.length; i++) {
		if (!x.aggcols[i].aggregated) //TODO: aggregation is several levels
			result.push(func(fId, x.aggcols[i], y, z, v, m));
	}
	if (_log.DEBUG) checkIntegrity(result);
	return result;
};
/*f=Self for now..*/
global.Aggregate = function (f, x) {
	return f;
};
global.GetValue = function (variable_value, x, y, z, v, am) {
	return variable_value;
};
//'^[0-9]+$'
/**
 * @return {boolean}
 */
global.REGEXPMATCH = function (pattern, value) {
	return new RegExp(pattern).test(value);
};
global.ValueT = function (one) {
	var returnValue = 0;
	while (one && !one.dummy) {
		returnValue++;
		one = one.prev;
	}
	return returnValue;
};

if (!global.NOW) global.NOW = function () {
	return new Date().getTime();
};else (0, _log.warn)('NOW is already defined ' + global.NOW.toString());

initJSMath(jsMath);
var entries = {
	closestLowerNum: closestLowerNum,
	NA: NA
};
if (!global.PPMT) global.PPMT = function () {
	return 1;
};
var name = 'ff-math';
exports.name = name;
exports.entries = entries;
exports.default = { name: name, entries: entries };