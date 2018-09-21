'use strict';

var _index = require('../index');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is how we will inject the EXCEL sheets and custom methods.
 * The function will be
 *  - impossible to set, so LOCKED=true
 *  - Able to re-use
 *  - Will have custom-made parameters.
 */
global.IDE_DEBUGMODUS = true;
var wb = new _index.WorkBook(new _index.Context(), null, null, { modelName: 'SELFTEST' });

wb.createFormula('three+ (one+two==2?this.DC:this.ABC)', 'MatrixSeetest123', 'function', false, 'document', 'object', JSON.stringify({
  params: 'one,two,three',
  body: {
    ABC: 100000,
    DC: 2000
  }
}));
wb.createFormula('100', 'JUST_A_NUMBER', 'value', false, 'document', 'number');
wb.createFormula('MatrixSeetest123(1,2,JUST_A_NUMBER)', 'LOOKME', 'test123', false, 'document', 'number');
_assert2.default.equal(wb.get('LOOKME', 'test123'), 100100);