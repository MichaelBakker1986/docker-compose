var WorkBook = require('../../lme-core/src/JSWorkBook')
var FESContext = require('../../lme-core/src/fescontext')
var log = require('ff-log')
var assert = require('assert')
require('../../math/ff-math')
var fesjsApi = require('../../lme-core').fesjs;
fesjsApi.addFunctions(require('../../formulajs-connect').formulajs);
//add excel-lookup, MatrixLookup
var excelPlugin = require('../../excel-connect').xlsxLookup;
fesjsApi.addFunctions(excelPlugin);

var wbKSP = new WorkBook(new FESContext());
var fs = require("fs");
var buf = fs.readFileSync(__dirname + '/KSP.ffl', "utf8");
wbKSP.importSolution((buf), 'ffl')
wbKSP.set('IncomeParent01', 25000)
assert(wbKSP.get('IncomeParent01') === 25000)
//same response from restApi
var fesGetValue = fesjsApi.fesGetValue({
    columns: 3,
    properties: {value: true, title: true},
    values: wbKSP.context.values
}, 'KSP_IncomeParent01', 0);
assert(fesGetValue[0].value === 25000)
var fesGetValue2 = fesjsApi.fesGetValue({
    columns: 3,
    properties: {value: true, title: true},
    values: wbKSP.context.values
}, 'KSP_Q_FINAL_REPORT_VISIBLE', 0, "Ja");
assert(fesGetValue2[0].value === 1)
