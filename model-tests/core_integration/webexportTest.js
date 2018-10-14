import { RegisterPlainFFLDecorator }                                         from '../../ffl/index'
import { equal }                                                             from 'assert'
import api, { Context, ENCODING, VALUE, VISIBLE, WebExportParser, WorkBook } from '../../lme-core/index'
import fflMath                                                               from '../../math/ffl-math'
import { readFileSync }                                                      from 'fs'

api.addFunctions(fflMath)
api.registerParser(RegisterPlainFFLDecorator, WebExportParser)

const context = new Context({ columnSize: 1, columns: [VALUE, VISIBLE] })
const wb = new WorkBook(context, null, null, { modelName: 'LGDTEST' })
wb.importSolution(readFileSync(`${__dirname}/LGDTEST.ffl`, ENCODING), 'ffl')
wb.set('AllocatedGuarantee', 'test', VALUE, 0, 1)
const webExport = wb.export('webexport')
const rows = webExport.rows
webExport.sortRows()
equal(rows.length, 33)
equal(rows[0].visible, true)