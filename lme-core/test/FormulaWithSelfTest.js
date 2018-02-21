/**
 * This is how we will inject the EXCEL sheets and custom methods.
 * The function will be
 *  - impossible to set, so LOCKED=true
 *  - Able to re-use
 *  - Will have custom-made parameters.
 */
global.IDE_DEBUGMODUS = true;
const WorkBook = require('../src/JSWorkBook'),
      Context  = require('../src/Context'),
      assert   = require('assert'),
      log      = require('log6'),
      wb       = new WorkBook(new Context(), null, null, { modelName: "SELFTEST" });

wb.createFormula("three+ (one+two==2?this.DC:this.ABC)", 'MatrixSeetest123', 'function', false, 'document', 'object', JSON.stringify({
    params: 'one,two,three',
    body  : {
        ABC: 100000,
        DC : 2000
    }
}))
wb.createFormula("100", 'JUST_A_NUMBER', 'value', false, 'document', 'number')
wb.createFormula("MatrixSeetest123(1,2,JUST_A_NUMBER)", 'LOOKME', 'test123', false, 'document', 'number')
assert.equal(wb.get('LOOKME', 'test123'), 100100)