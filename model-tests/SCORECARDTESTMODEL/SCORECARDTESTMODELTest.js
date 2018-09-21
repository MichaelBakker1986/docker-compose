import '../../lme-core/exchange_modules/presentation/webexport'
import '../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator'
import { LmeAPI }       from '../../lme-model-api/'
import { error }        from 'log6'
import assert           from 'assert'
import excelPlugin      from '../../excel-connect'
import custom_import    from '../../lme-core/resources/CustomImport'
import { readFileSync } from 'fs'

const SCORECARDTESTMODEL = new LmeAPI(custom_import)
SCORECARDTESTMODEL.addFunctions(excelPlugin)

excelPlugin.loadExcelFile('SCORECARDTESTMODEL').then(() => {
	SCORECARDTESTMODEL.importFFL(readFileSync(`${__dirname}/SCORECARDTESTMODEL.ffl`, 'utf8'))
	const nodes = SCORECARDTESTMODEL.exportWebModel().nodes
	const validate = SCORECARDTESTMODEL.lme.validateImportedSolution()
	SCORECARDTESTMODEL.lme.fixProblemsInImportedSolution()
	const validateFeedback = SCORECARDTESTMODEL.lme.validateImportedSolution()
	assert(SCORECARDTESTMODEL.lme.validateImportedSolution())

}).catch((err) => {
	error(err)
	process.exit(1)
})