require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator');
const assert   = require('assert'),
      Context  = require('../../lme-core/src/Context'),
      Register = require('../../lme-core/exchange_modules/ffl/Register').Register,
      log      = require('log6'),
      LME      = require('../../lme-model-api/src/lme');
const context = new Context({ columnSize: 1, columns: ['value', 'visible'] });
const wb = new LME(null, context)
const register = new Register();
wb.importFFL({
    register: register,
    raw     : require('fs').readFileSync(__dirname + '/SCORECARDBASICS.ffl', 'utf8')
});
log.info(wb.lme.getNode('FirstMAP'))