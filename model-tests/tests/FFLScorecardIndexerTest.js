import { DEBUG, debug, error }                                                                  from 'log6'
import { ok }                                                                                   from 'assert'
import fflMath
                                                                                                from '../../math/ffl-math'
import { LmeAPI }                                                                               from '../../lme-model-api/src/lme'
import { DebugManager, FFLToRegister, RegisterPlainFFLDecorator, RegisterToFFL, ScorecardTool } from '../../ffl/index'
import api, {
	Context,
	ENCODING,
	Register
}                                                                                               from '../../lme-core/index'
import { readFileSync }                                                                         from 'fs'
import formulaJs_connect
                                                                                                from '../../formulajs-connect/formulajs'

api.addFunctions(fflMath, formulaJs_connect)
api.registerParser(RegisterPlainFFLDecorator)
global.IDE_DEBUGMODUS = true
if (DEBUG) debug('Start FFLScorecardIndexerTest.js')
const modelRegister = new Register()
const modelName = 'MVO'

const ffl = readFileSync(`${__dirname}/../${modelName}/${modelName}.ffl`, ENCODING)
try {
	const formatter = new FFLToRegister(modelRegister, ffl)
	formatter.parseProperties()

	new RegisterToFFL(modelRegister).toGeneratedFFL({ rootVariableName: 'Q_ROOT', modelName }).join('\n')
	const indexer = new ScorecardTool().parse(ffl)
	const scorecard_data = `${modelRegister.header}{\n${new RegisterToFFL(indexer).toGeneratedFFL({ auto_join: true })}`
	const context = new Context()
	const lme = new LmeAPI(null, context, undefined, { ffl: scorecard_data })
	const debugManager = new DebugManager(modelRegister, context.audittrail)

	ok(debugManager.monteCarlo(modelName).valid)
} catch (err) {
	error(err.stack)
	process.exit(1)
}