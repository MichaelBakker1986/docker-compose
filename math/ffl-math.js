import regression                           from 'regression'
import ema                                  from 'exponential-moving-average'
import Solver                               from 'js-solver'
import { DEBUG, debug, trace, TRACE, warn } from 'log6'
import * as jStat                           from 'jStat'
import jsMath                               from './jsMath.json'

const NA = jsMath.NA

if (!global.MatrixLookup) global.MatrixLookup = () => 1
if (!global.MATRIX_VALUES) global.MATRIX_VALUES = {}

if (!Array.prototype.stdev)
	Object.defineProperty(Array.prototype, 'stdev', {
		enumerable: false,
		value     : function() {
			//calculate standard deviation of an array
			return jStat.stdev(this, true)
		}
	})
if (!Array.prototype.max)
	Object.defineProperty(Array.prototype, 'max', {
		enumerable: false,
		value     : function() {
			return Math.max.apply(null, this)
		}
	})
if (!Array.prototype.sentiment)
	Object.defineProperty(Array.prototype, 'sentiment', {
		enumerable: false,
		value     : function() {
			const avg = this.reduce((a, b, i, arr) => {
				a[i] = arr[i] - arr[i - 1]
				return a
			}, []).splice(1).avg()

			return {
				avg    : avg,
				raising: avg > 0
			}
		}
	})
if (!Array.prototype.maxProfit)
	Object.defineProperty(Array.prototype, 'maxProfit', {
		enumerable: false,
		value     : function() {
			return this.reduce((current, b, i) => Math.max(current, b.distance(this.slice(i).max())))
		}
	})
if (!Array.prototype.groupBy)
	Object.defineProperty(Array.prototype, 'groupBy', {
		enumerable: false,
		value     : function(key) {
			return this.reduce((rv, x) => {
				(rv[x[key]] = rv[x[key]] || []).push(x)
				return rv
			}, {})
		}
	})
if (!Array.prototype.linearPredict)
	Object.defineProperty(Array.prototype, 'linearPredict', {
		enumerable: false,
		value     : function(amount) {
			const r = []
			const predictor = this.linearPredictor()
			for (let i = 0; i < amount; i++) {
				r.push(predictor(this.length + i))
			}
			return r
		}
	})

if (!Array.prototype.linearPredictor)
	Object.defineProperty(Array.prototype, 'linearPredictor', {
		enumerable: false,
		value     : function() {
			const linear = regression.linear(this.map((v, i) => [i, v]), { precision: 8 })

			return (offset) => linear.predict(this.length + offset)[1]
		}
	})
/*if (!Array.prototype.regressR2)
 Object.defineProperty(Array.prototype, 'regressR2', {
 enumerable: false,
 value     : function() {
 return regression.linear(this.map((v, i) => [i, v]), { precision: 8 });

 }
 });*/

if (!Array.prototype.select)
	Object.defineProperty(Array.prototype, 'select', {
		enumerable: false,
		value     : function(name) {
			return this.map(el => el[name])
		}
	})
if (!Array.prototype.ema)
	Object.defineProperty(Array.prototype, 'ema', {
		enumerable: false,
		value     : function(opts) {
			return ema(this, opts).last()
		}
	})
if (!Array.prototype.avg)
	Object.defineProperty(Array.prototype, 'avg', {
		enumerable: false,
		value     : function() {
			return this.sum() / this.length
		}
	})
if (!Array.prototype.sum)
	Object.defineProperty(Array.prototype, 'sum', {
		enumerable: false,
		value     : function() {
			const nl = this.length
			const n = this
			let a = 0
			for (let j = nl - 1; j >= 0; j--) a = a + n[j]
			return a
		}
	})
if (!Array.prototype.column)
	Object.defineProperty(Array.prototype, 'column', {
		enumerable: false,
		value     : function(i) {
			return this.map((el) => el[i])
		}
	})
//distance between two numbers
if (!Number.prototype.distance)
	Object.defineProperty(Number.prototype, 'distance', {
		enumerable: false,
		value     : function(other) {
			return (this > other) ? this - other : other - this
		}
	})
if (!Number.prototype.round)
	Object.defineProperty(Number.prototype, 'round', {
		enumerable: false,
		value     : function(decimals) {
			return Number((this).toFixed(decimals))
		}
	})
if (!Array.prototype.first)
	Object.defineProperty(Array.prototype, 'first', {
		enumerable: false,
		value     : function() {
			return this[1]
		}
	})
if (!Array.prototype.last)
	Object.defineProperty(Array.prototype, 'last', {
		enumerable: false,
		value     : function() {
			return this[this.length - 1]
		}
	})

//add functions found in the jsMath to the global scope
function initJSMath(jsMath) {
	for (let jsMath_function_name in jsMath) {
		let math_function = jsMath[jsMath_function_name]
		if (global[jsMath_function_name] === undefined) {
			//functions
			if (typeof math_function === 'object') {
				if (TRACE) trace(`Added function[${jsMath_function_name}] arguments[%s] body: [%s]`, math_function.args, math_function.body)
				global[jsMath_function_name] = new Function(math_function.args, math_function.body)
			}
			else {
				//variables
				global[jsMath_function_name] = math_function
			}
		}
		else {
			if (DEBUG) debug(`Function [${jsMath_function_name}] is already defined.`)
		}
	}
}

//TODO: add these functions as internal functions
global.SOLVER = (args) => new Solver(args || arguments)
global.AMMOUNT = () => {
	let total = 0
	for (let key in arguments) if (arguments[key]) total++
	return total
}
global.OnNAIfNumber = (v, nav) => isNaN(v) ? v : OnNA(v, nav)
global.OnNA = function(v, nav) {
	return (v == null || isNaN(v) || (v !== 0 && v !== -0 && v < this.n && v > this.ng)) ? nav : v
}.bind({
	n : 1e-10,
	ng: -1e-10
})
const closestLowerNum = (num, arr) => {
	let mid
	let lo = 0
	let hi = arr.length - 1
	while (hi - lo > 1) {
		mid = Math.floor((lo + hi) / 2)
		if (arr[mid] < num) lo = mid
		else hi = mid
	}
	if (num - arr[lo] <= arr[hi] - num) return arr[lo]
	return arr[lo]//change to hi to get the nearest
}

global.MatrixLookDown = (table, row, col) => {
	let rv = NA
	if (table.xasValues && table.xasValues[row] && table.xasValues[row][col] !== undefined) {
		rv = table.xasValues[row][col]
	} else if (table.xasValues && table.x_sort) {
		const v = closestLowerNum(row, table.x_sort)
		rv = table.xasValues[v][col]
	}
	return rv
}
global.MatrixLookup = (xlsFileName, tableName, row, col) => {
	if (!MATRIX_VALUES) return NA
	const table = MATRIX_VALUES[tableName]
	let rv = NA
	if (table) rv = MatrixLookDown(table, row, col)
	return rv
}

global.FILLEDIN = (required, entered) => true
global.YearInT = (v, x) => v.absolute_start_year + x.bkyr.index
//should be:  arguments => { name: $1, y: $2 }
global.PIECHART = function() {
	const result = []
	for (let i = 0; i < arguments.length; i++) {
		const points = arguments[i]
		for (let index = 0; index < points.length; index++) {
			const point = points[index]
			result.push({ name: point[0], y: point[1] })
		}
	}
	return result
}
global.HSUM = (values, start, end) => {
	let returnValue = 0
	if (start.hash) start = start.hash
	if (end.hash) end = end.hash
	for (let i = (start || 0); i <= (end || values.length); i++) {
		returnValue += values[i]
	}
	return returnValue
}
global.HVALUES = (values, start, end) => {
	const returnValue = []
	if (start.hash) start = start.hash
	if (end.hash) end = end.hash
	for (let i = (start || 0); i <= (end || values.length); i++) {
		returnValue.push(values[i])
	}
	return returnValue
}
const checkIntegrity = (result) => {
	const set = new Set(result.map(el => typeof el))
	debug(`Data types in ${Array.from(set.keys()).toString()}`)
}
global.VALUES = function(func, fId, x, y, z, v, m) {
	const result = []
	for (let i = 0; i < x.aggcols.length; i++) {
		if (!x.aggcols[i].aggregated)//TODO: aggregation is several levels
			result.push(func(fId, x.aggcols[i], y, z, v, m))
	}
	if (DEBUG) checkIntegrity(result)
	return result
}
/*f=Self for now..*/
global.Aggregate = (f, x) => f
global.GetValue = (variable_value, x, y, z, v, am) => variable_value
//'^[0-9]+$'
/**
 * @return {boolean}
 */
global.REGEXPMATCH = (pattern, value) => new RegExp(pattern).test(value)
global.ValueT = (one) => {
	let returnValue = 0
	while (one && !one.dummy) {
		returnValue++
		one = one.prev
	}
	return returnValue

}

if (!global.NOW) global.NOW = () => new Date().getTime()
else warn(`NOW is already defined ${global.NOW.toString()}`)

initJSMath(jsMath)
const entries = {
	closestLowerNum,
	NA
}
/*if (!global.PPMT) global.PPMT = () => 1*/
const name = 'ff-math'
export { name, entries }
export default { name, entries }