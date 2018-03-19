require('../../lme-core/exchange_modules/ffl/RegisterToLMEParser')
require('../../lme-core/exchange_modules/presentation/webexport')
require('../../math')

const Register    = require('../../lme-core/exchange_modules/ffl/Register'),
      excelplugin = require('../../excel-connect'),
      assembler   = require('../../git-connect/ModelAssembler'),
      JSWorkbook  = require('../../lme-core/src/JSWorkBook'),
      Context     = require('../../lme-core/src/Context'),
      log         = require('log6'),
      LME         = require('../../lme-model-api/src/lme'),
      lmeModel    = new LME()

lmeModel.addFunctions(excelplugin)
Promise.all([assembler.started, excelplugin.loadExcelFile]).then(() => {
    assembler.getModel("V05").then((modelData) => {
        process.exit(0);
    }).catch((err) => {
        log.error(err)
        process.exit(1);
    })
});