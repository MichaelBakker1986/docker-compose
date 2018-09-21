import { Context, Register, RegisterToFFL, WorkBook } from '../../lme-core/'
import 'ffl-math'
import { readFileSync, writeFileSync }                from 'fs'
import { info }                                       from 'log6'
import LME                                            from '../../lme-model-api/src/lme'
import '../../lme-core/exchange_modules/ffl/RegisterToLMEParser'

new LME()

const ffl = readFileSync('../../git-connect/resources/V05.ffl', 'utf8')
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
writeFileSync('./testv05.ffl', new RegisterToFFL(register).toGeneratedFFL({ rootVariableName: 'V05' }).join('\n'), 'utf8')
info(`done${register.i.length}`)