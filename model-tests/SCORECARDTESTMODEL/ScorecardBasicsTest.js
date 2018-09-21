/*
 * Ensure basic ROOT node visible etc
 * This will test the UI to render basic root variable
 */
import { Context, ENCODING, Register, VALUE, VISIBLE } from '../../lme-core/index'
import '../../lme-core/exchange_modules/presentation/webexport'
import '../../ffl/index'
import LME                                             from '../../lme-model-api/src/lme'
import { equal, ok }                                   from 'assert'

const context = new Context({ columnSize: 1, columns: [VALUE, VISIBLE] })
const wb = new LME(null, context)

const register = new Register
wb.importFFL({ register, raw: require('fs').readFileSync(`${__dirname}/SCORECARDBASICS.ffl`, ENCODING) })
const webExport = wb.exportWebModel()
const rows = webExport.rows
const scorecards = webExport.findScorecardTypes()
equal(scorecards.length, 1, 'The basic example has 1 scorecard type')
equal(scorecards[0].id, 'Q_ROOT', 'The basic demo has variable name Q_ROOT')
equal(scorecards[0].visible, true, 'The root node in the basic test is visible')
equal(scorecards[0].children[0].visible, true, 'The first map node in the basic test is visible')
equal(scorecards[0].children[1].visible, true, 'The second map node in the basic test is visible')
equal(scorecards[0].children.length, 2, 'The basic has 2 children')
webExport.sortRows()
equal(rows.length, 3)
ok(rows[0].visible)
wb.lme.validateImportedSolution()