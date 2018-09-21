'use strict';

var _log = require('log6');

var _ = require('../');

/**
 * This is how we will inject the EXCEL sheets and custom methods.
 * The function will be
 *  - impossible to set, so LOCKED=true
 *  - Able to re-use
 *  - Will have custom-made parameters.
 *
 *  GOAL is to do this without the global variables
 */

var NA = 1e-10;
var wb = new _.WorkBook(new _.Context(), null, null, { modelName: 'SELFTEST' });

require('../exchange_modules/lme/lmeparser');
var closestLowerNum = function closestLowerNum(num, arr) {
	var mid;
	var lo = 0;
	var hi = arr.length - 1;
	while (hi - lo > 1) {
		mid = Math.floor((lo + hi) / 2);
		if (arr[mid] < num) lo = mid;else hi = mid;
	}
	if (num - arr[lo] <= arr[hi] - num) return arr[lo];
	return arr[lo]; //change to hi to get the nearest
};

var entire = function (table, row, col) {
	table.xasValues && table.xasValues[row] && table.xasValues[row][col] !== undefined ? table.xasValues[row][col] : table.xasValues && table.x_sort ? table.xasValues[closestLowerNum(row, table.x_sort)][col] : NA;
}.toString();

var body = entire.substring(entire.indexOf('{') + 1, entire.lastIndexOf('}')).replace(/\s+/gm, ' ');
var s = closestLowerNum.toString();
var body2 = s.substring(s.indexOf('{') + 1, s.lastIndexOf('}'));
//const a = Function('table,row,col', body)
var ab = Function('num,arr', body2);
(0, _log.debug)(ab(1, [1, 2, 3]));
require('../../excel-connect/excel-connect').loadExcelFile('V05').then(function (matrix) {
	wb.createFormula(body, 'MatrixLookDown', 'function', false, 'document', 'object', JSON.stringify({ params: 'table, row, col' }));
	for (var table in matrix) {
		wb.createFormula('MatrixLookDown(this,row,col)', table, 'function', false, 'document', 'object', JSON.stringify({
			params: 'm,row,col',
			body: matrix[table]
		}));
		wb.createFormula(table + '(m,\'FoodCostsBoy\',1)', 'LOOKME', table, false, 'document', 'object');
		(0, _log.info)(wb.get('LOOKME', table));
	}
});