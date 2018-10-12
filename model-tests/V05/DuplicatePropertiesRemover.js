import api, { Context, ENCODING, Register, WorkBook } from '../../lme-core/index'
import fflMath                                        from '../../math/ffl-math'
import { readFileSync, writeFileSync }                from 'fs'
import { info }                                       from 'log6'
import { LmeAPI }                                     from '../../lme-model-api/src/lme'
import { RegisterToLMEParser }                        from '../../ffl/index'

api.registerParser(RegisterToLMEParser)
api.addFunctions(fflMath)
new LmeAPI()

const ffl = readFileSync('../../git-connect/resources/V05.ffl', ENCODING)
const register = new Register()
const wb = new WorkBook(new Context())
wb.importFFL({ register, raw: ffl })
for (let i = 0; i < register.i.length; i++) {
	const obj = register.i[i]
	const nottrend = obj[register.schemaIndexes.formula_notrend]
	const trend = obj[register.schemaIndexes.formula_trend]
	if (obj[register.schemaIndexes.formula_trend] && nottrend === trend) {
		obj[register.schemaIndexes.formula_trend] = null
		obj[register.schemaIndexes.formula] = obj[register.schemaIndexes.formula_notrend]
		obj[register.schemaIndexes.formula_notrend] = null
		obj[register.schemaIndexes.valid] = null
	}
}
writeFileSync('./testv05.ffl', new RegisterToFFL(register).toGeneratedFFL({ rootVariableName: 'V05' }).join('\n'), ENCODING)
info(`done${register.i.length}`)