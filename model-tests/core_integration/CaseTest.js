//TODO: convert into JBehave Story.
global.IDE_DEBUGMODUS = true
import api, { Context, ENCODING, SolutionFacade, WorkBook } from '../../lme-core/index'
import { equal }                                            from 'assert'
import { readFileSync }                                     from 'fs'
import { RegisterPlainFFLDecorator }                        from '../../ffl/index'
import * as fflMath                                         from '../../math/ffl-math'

function currently_disabled() {
	api.addFunctions(fflMath)
	SolutionFacade.addParser(RegisterPlainFFLDecorator)

	const wb = new WorkBook(new Context)
	wb.importFFL(readFileSync(`${__dirname}/CASETEST.ffl`, ENCODING))
	equal(wb.get('CASETESTVARIABLE'), 535)
	wb.set('VALUE', 1)
	equal(wb.get('CASETESTVARIABLE'), 906)
}