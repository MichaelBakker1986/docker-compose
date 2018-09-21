import { Context, Register, VALUE, VISIBLE } from '../../lme-core/'
import { equal }                             from 'assert'
import LME                                   from '../../lme-model-api/src/lme'
import '../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator'

const context = new Context({ columnSize: 1, columns: [VALUE, VISIBLE] })
const wb = new LME(null, context)
const register = new Register()
wb.importFFL({
	register: register,
	raw     : require('fs').readFileSync(__dirname + '/SCORECARDBASICS.ffl', 'utf8')
})
equal(wb.lme.getNode('FirstMAP').name, 'SCORECARDBASICS_FirstMAP_value')