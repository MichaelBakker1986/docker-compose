require('../../lme-core/exchange_modules/ffl/RegisterToLMEParser')
require('../../math')

const Register                  = require('../../lme-core/exchange_modules/ffl/Register').Register,
      Workbook                  = require('../../lme-core/src/JSWorkBook'),
      Context                   = require('../../lme-core/src/Context'),
      log                       = require('log6'),
      assert                    = require('assert'),
      LME                       = require('../../lme-model-api/src/lme'),
      FormulaInformationManager = require('../../lme-model-api/src/FormulaInformationManager')

const ffl = require('fs').readFileSync('../LGD/LGD.ffl', 'utf8')
const register = new Register()
const wb = new Workbook(new Context())
wb.importFFL({
    register: register,
    raw     : ffl
})

//var result = FormulaInformationManager.lookupFunction('If', 'Entered(If(MAX(1,2),MIN(2,1),1000))', 8);

assert.equal(FormulaInformationManager.lookupFunction("OnZero", "    formula: OnZero(123,1.4);", 13).parts.length, 3)
assert.equal(FormulaInformationManager.lookupFunction("OnZero", "    formula: OnZero(123,1.4);", 12).parts.length, 3)
assert.equal(FormulaInformationManager.lookupFunction("OnZero", "    formula: OnZero(123,1.4);", 11).parts.length, 3)
assert.equal(FormulaInformationManager.lookupFunction("OnZero", "    formula: OnZero(MAX(1,2),1.4);", 10).parts.length, 3)
assert.equal(FormulaInformationManager.lookupFunction("OnZero", "    formula: OnZero(MAX(1,2),1.4);", 19).parts[1], 'MAX(1,2)')
assert.equal(FormulaInformationManager.lookupFunction("OnZero", "    formula: MAX(MAX(1,2),1.4);", 20).parts.length, 3)
assert.equal(FormulaInformationManager.lookupFunction("OnZero", "    formula: MAX(MAX(1,2),1.4);", 20).parts[1], '1')

var result = FormulaInformationManager.lookupFunction("MAX", "    formula: OnZero(MAX(1,2),1.4);", 21);
log.info(result)

log.info('\n' + FormulaInformationManager.extractParts(wb, result.parts).join('\n'))
