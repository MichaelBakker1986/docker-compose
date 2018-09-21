import { DEBUG, debug, error }                                                          from 'log6'
import { ok }                                                                           from 'assert'
import LME
                                                                                        from '../../lme-model-api/src/lme'
import { Context, DebugManager, FFLToRegister, Register, RegisterToFFL, ScorecardTool } from '../../lme-core'
import { readFileSync }                                                                 from 'fs'
import * as formulaJs_connect                                                           from 'formulajs-connect'

global.IDE_DEBUGMODUS = true
if (DEBUG) debug('Start FFLScorecardIndexerTest.js')
const modelRegister = new Register()
const modelName = 'MVO'

const ffl = readFileSync(`${__dirname}/../${modelName}/${modelName}.ffl`, 'utf8')
try {
	const formatter = new FFLToRegister(modelRegister, ffl)
	formatter.parseProperties()

	new RegisterToFFL(modelRegister).toGeneratedFFL({ rootVariableName: 'Q_ROOT', modelName }).join('\n')
	const indexer = new ScorecardTool().parse(ffl)
	const scorecard_data = modelRegister.header + '{\n' + new RegisterToFFL(indexer).toGeneratedFFL({}).join('\n')
	const context = new Context()
	const lme = new LME(null, context)
	lme.addFunctions(formulaJs_connect)
	lme.importFFL(scorecard_data)
	const debugManager = new DebugManager(modelRegister, context.audittrail)

	ok(debugManager.monteCarlo(modelName).valid)

} catch (err) {
	error(err)
	process.exit(1)
}