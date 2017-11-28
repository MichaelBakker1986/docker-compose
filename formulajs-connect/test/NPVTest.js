var log = require('ff-log')
var formulaJs = require('./ff-formulajs').formulajs
/**
 * Test NPV function
 */
global.NPV = formulaJs.NPV;
log.debug(formulaJs.entries)
//wb.createFormula('Round(NPV(0.1, -10000, 2000, 4000, 8000),1)', 'NPV')
//assert.equal(wb.get('NPV'), 1031.4)//.should.approximately(1031.3503176012546, 1e-9);