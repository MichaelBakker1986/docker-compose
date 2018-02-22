require('../../lme-core/exchange_modules/ffl/RegisterToLMEParser')
const RegisterToFFL = require('../../lme-core/exchange_modules/ffl/RegisterToFFL').RegisterToFFL
require('../../lme-core/exchange_modules/presentation/webexport')
require('../../math')

const Register    = require('../../lme-core/exchange_modules/ffl/Register').Register,
      Workbook    = require('../../lme-core/src/JSWorkBook'),
      Context     = require('../../lme-core/src/Context'),
      log         = require('log6'),
      LME         = require('../../lme-model-api/src/lme'),
      lmeModel    = new LME()

const ffl = require('fs').readFileSync('../../git-connect/resources/V05.ffl', 'utf8')
const register = new Register()
const wb = new Workbook(new Context())
wb.importFFL({
    register: register,
    raw     : ffl
})
for (var i = 0; i < register.i.length; i++) {
    var obj = register.i[i];
    const notrend = obj[register.schemaIndexes.formula_notrend]
    const trend = obj[register.schemaIndexes.formula_trend]
    if (obj[register.schemaIndexes.formula_trend] && notrend == trend) {
        obj[register.schemaIndexes.formula_trend] = null
        obj[register.schemaIndexes.formula] = obj[register.schemaIndexes.formula_notrend]
        obj[register.schemaIndexes.formula_notrend] = null
        obj[register.schemaIndexes.valid] = null
    }
}
require('fs').writeFileSync('./testv05.ffl', new RegisterToFFL(register).toGeneratedFFL(null, 'V05').join('\n'), 'utf8')
log.info('done' + register.i.length)