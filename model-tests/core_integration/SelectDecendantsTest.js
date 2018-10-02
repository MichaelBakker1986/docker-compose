import api, { Context, ENCODING, WorkBook } from '../../lme-core/index'
import { RegisterPlainFFLDecorator }        from '../../ffl/index'
import { equal }                            from 'assert'
import { debug }                            from 'log6'
import { readFileSync }                     from 'fs'
import fflMath                              from '../../math/ffl-math'

api.addFunctions(fflMath)
api.registerParser(RegisterPlainFFLDecorator)
const wb = new WorkBook(new Context)
wb.modelName = 'SELECTDESCENDANTS'
wb.importFFL(readFileSync(`${__dirname}/SELECTDESCENDANTS.ffl`, ENCODING))

function currently_disabled() {
	equal(wb.get('Q_ROOT'), 2, wb.get('Q_ROOT', 'title'))
	debug(wb.get('Q_MAP01'))
	equal(wb.get('Q_MAP01'), 0, wb.get('Q_MAP01', 'title'))
	wb.set('Q_MAP02_SUB', 10)
	wb.set('Q_MAP03', 10)
	equal(wb.get('Q_MAP01'), 1, wb.get('Q_MAP01', 'title'))
	wb.set('Q_MAP02_SUB', null)
	equal(wb.get('Q_MAP01'), 0, wb.get('Q_MAP01', 'title'))

}
