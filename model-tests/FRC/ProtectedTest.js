require('../../lme-core/exchange_modules/ffl/RegisterToLMEParser')
require('../../math')

const Register                  = require('../../lme-core/exchange_modules/ffl/Register').Register,
      Workbook                  = require('../../lme-core/src/JSWorkBook'),
      Context                   = require('../../lme-core/src/Context'),
      log                       = require('log6'),
      assert                    = require('assert'),
      LME                       = require('../../lme-model-api/src/lme'),
      FormulaInformationManager = require('../../lme-model-api/src/FormulaInformationManager')

const ffl = require('fs').readFileSync(__dirname + '/ProtectedTest.ffl', 'utf8')
const register = new Register()
const wb = new Workbook(new Context())
wb.importFFL({
    register: register,
    raw     : ffl
})
log.info(JSON.stringify(JSON.parse(wb.export('lme')), null, 2))
