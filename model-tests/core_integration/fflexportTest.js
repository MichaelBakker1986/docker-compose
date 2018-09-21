import { ok }                                          from 'assert'
import { trace, TRACE }                                from 'log6'
import { Context, ENCODING, SolutionFacade, WorkBook } from '../../lme-core/index'
import { readFileSync }                                from 'fs'
import { RegisterPlainFFLDecorator }                   from '../../ffl/index'
import '../../math/ffl-math'

SolutionFacade.addParser(RegisterPlainFFLDecorator)

const fflTestModels = ['hierarchyTest', 'hierarchyTest']

for (let i = 0; i < fflTestModels.length; i++) {
	const fflModelName = fflTestModels[i]
	const data = readFileSync(`${__dirname}/${fflModelName}.ffl`, ENCODING)
	const wb = new WorkBook(new Context())
	wb.importFFL(data)
	const validate = wb.validateImportedSolution()
	wb.fixProblemsInImportedSolution()
	ok(wb.validateImportedSolution().valid)
	const fflExport = wb.export('ffl').join('\n')
	//debugging..
	if (TRACE) trace(fflExport)
}