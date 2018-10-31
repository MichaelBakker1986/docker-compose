import api, { Context, ENCODING, Register, WorkBook } from '../../lme-core/index'
import fflMath                                        from '../../math/ffl-math'
import { writeFileSync }                              from 'fs'
import { info }                                       from 'log6'
import { LmeAPI }                                     from '../../lme-model-api/src/lme'
import { RegisterToLMEParser }                        from '../../ffl/index'
import { readModelAsString }                          from '../../git-connect/ResourceManager'

api.registerParser(RegisterToLMEParser)
api.addFunctions(fflMath)
new LmeAPI()

const ffl = readModelAsString({ model_name: 'V05' })

const register = new Register
const wb = new WorkBook(new Context)
wb.importFFL({ register, raw: ffl })
const schema_indexes = register.schemaIndexes
for (let i = 0; i < register.i.length; i++) {
	const obj = register.i[i]
	const nottrend = obj[schema_indexes.formula_notrend]
	const trend = obj[schema_indexes.formula_trend]
	if (obj[schema_indexes.formula_trend] && nottrend === trend) {
		obj[schema_indexes.formula_trend] = null
		obj[schema_indexes.formula] = obj[schema_indexes.formula_notrend]
		obj[schema_indexes.formula_notrend] = null
		obj[schema_indexes.valid] = null
	}
}
writeFileSync('./testv05.ffl', new RegisterToFFL(register).toGeneratedFFL({ rootVariableName: 'V05' }).join('\n'), ENCODING)
info(`done${register.i.length}`)