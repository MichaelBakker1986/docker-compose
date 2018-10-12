import api, { Context, Register, VALUE, VISIBLE } from '../../lme-core/index'
import { equal }                                  from 'assert'
import { LmeAPI }                                 from '../../lme-model-api/src/lme'
import { RegisterPlainFFLDecorator }              from '../../ffl/index'

api.registerParser(RegisterPlainFFLDecorator)
const context = new Context({ columnSize: 1, columns: [VALUE, VISIBLE] })
const wb = new LmeAPI(null, context)
const register = new Register()
wb.importFFL({
	register: register,
	raw     : require('fs').readFileSync(`${__dirname}/SCORECARDBASICS.ffl`, 'utf8')
})
equal(wb.lme.getNode('FirstMAP').name, 'SCORECARDBASICS_FirstMAP_value')