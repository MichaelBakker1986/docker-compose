/**
 * This is how we will inject the EXCEL sheets and custom methods.
 * The function will be
 *  - impossible to set, so LOCKED=true
 *  - Able to re-use
 *  - Will have custom-made parameters.
 *
 *  GOAL is to do this without the global variables
 */

import { debug }                                                        from 'log6'
import api, { Context, DOCUMENT, FUNCTION_TYPE, OBJECT_TYPE, WorkBook } from '../../lme-core/index'
import ExcelApi                                                         from '../excel-api'
import * as fflMath                                                     from '../../math/ffl-math'
import '../../lme-core/exchange_modules/lme/lmeparser'

api.addFunctions(fflMath)

const closestLowerNum = fflMath.entries.closestLowerNum
const NA = fflMath.entries.NA

const wb = new WorkBook(new Context, null, null, { modelName: 'SELFTEST' })

const entire = function(table, row, col) {
	(table.xasValues && table.xasValues[row] && table.xasValues[row][col] !== undefined) ?
		table.xasValues[row][col] : (table.xasValues && table.x_sort) ?
		table.xasValues[closestLowerNum(row, table.x_sort)][col] : NA
}.toString()

const body = entire.substring(entire.indexOf('{') + 1, entire.lastIndexOf('}')).replace(/\s+/gm, ' ')
const s = closestLowerNum.toString()
const body2 = s.substring(s.indexOf('{') + 1, s.lastIndexOf('}'))
//const a = Function('table,row,col', body)
const ab = Function('num,arr', body2)
debug(ab(1, [1, 2, 3]))
ExcelApi.loadExcelFile('V05').then(matrix => {
	wb.createFormula(body, 'MatrixLookDown', FUNCTION_TYPE, false, DOCUMENT, OBJECT_TYPE, JSON.stringify({ params: 'table, row, col' }))
	Object.keys(matrix).forEach(table_name => {
		wb.createFormula('MatrixLookDown(this,row,col)', table_name, FUNCTION_TYPE, false, DOCUMENT, OBJECT_TYPE, JSON.stringify({
			params: 'm,row,col',
			body  : matrix[table_name]
		}))
		wb.createFormula(`${table_name}(m,'FoodCostsBoy',1)`, 'LOOKME', table_name, false, DOCUMENT, OBJECT_TYPE)
		debug((wb.get('LOOKME', table_name)))
	})
})