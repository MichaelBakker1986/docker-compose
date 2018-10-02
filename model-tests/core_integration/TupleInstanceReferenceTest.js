/**
 * TODO: convert into .story file
 * Be aware, empty tuples are included in the T* functions.
 */
import api, { Context, ENCODING, VALUE, WorkBook } from '../../lme-core/index'
import { RegisterPlainFFLDecorator }               from '../../ffl/index'
import { equal }                                   from 'assert'
import fflMath                                     from '../../math/ffl-math'
import formulaJs                                   from '../../formulajs-connect/formulajs'
import { readFileSync }                            from 'fs'

api.registerParser(RegisterPlainFFLDecorator)
api.addFunctions(fflMath, formulaJs)

function currently_disabled() {
	const wb = new WorkBook(new Context)
	wb.importFFL(readFileSync(`${__dirname}/TupleValueTest.ffl`, ENCODING))

// 0-Tuple(0)
	wb.set('ValueVariable', 5, VALUE, undefined, 0)
	equal(wb.get('ValueVariableTotal', VALUE, 0, 0), 5)
	equal(wb.get('Total', VALUE), 5)

// 0-Tuple(2) (skip 0-Tuple(1))
	wb.set('ValueVariable', 6, VALUE, undefined, 2)
	equal(wb.get('ValueVariableTotal', VALUE, undefined, 2), 6)
	equal(wb.get('Total', VALUE), 11)
}