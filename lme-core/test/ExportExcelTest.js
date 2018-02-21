/**
 * This is how we will inject the EXCEL sheets and custom methods.
 * The function will be
 *  - impossible to set, so LOCKED=true
 *  - Able to re-use
 *  - Will have custom-made parameters.
 *
 *  GOAL is to do this without the global variables
 */
NA = 1e-10
require('../exchange_modules/lme/lmeparser')
const WorkBook = require('../src/JSWorkBook'),
      Context  = require('../src/Context'),
      assert   = require('assert'),
      log      = require('log6'),
      wb       = new WorkBook(new Context(), null, null, { modelName: "SELFTEST" });

closestLowerNum = function(num, arr) {
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

const entire = function(table, row, col) {
    (table.xasValues && table.xasValues[row] && table.xasValues[row][col] !== undefined) ?
        table.xasValues[row][col] : (table.xasValues && table.x_sort) ?
        table.xasValues[closestLowerNum(row, table.x_sort)][col] : NA;
}.toString()

var body = entire.substring(entire.indexOf("{") + 1, entire.lastIndexOf("}")).replace(/\s+/gm, ' ');
const s = closestLowerNum.toString();
var body2 = s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"));
//const a = Function('table,row,col', body)
const ab = Function('num,arr', body2)
//console.info(a(1, 2, 3))
log.debug(ab(1, [1, 2, 3]))
const excel = require('../../excel-connect/excel-connect').loadExcelFile('V05').then(function(matrix) {

    wb.createFormula(body, 'MatrixLookDown', 'function', false, 'document', 'object', JSON.stringify({ params: 'table, row, col' }))

    for (var table in matrix) {
        wb.createFormula("MatrixLookDown(this,row,col)", table, 'function', false, 'document', 'object', JSON.stringify({
            params: 'm,row,col',
            body  : matrix[table]
        }))

        wb.createFormula(table + "(m,'FoodCostsBoy',1)", 'LOOKME', table, false, 'document', 'object')
        log.info((wb.get('LOOKME', table)))
    }
    //  log.info(JSON.stringify(JSON.parse(wb.export('lme')), null, 2))
})