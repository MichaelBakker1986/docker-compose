import { equal }                                                                         from 'assert'
import api, { Context, DETAIL_INTERVAL, ENCODING, resources, TimeAxis, TITLE, WorkBook } from '../../lme-core/index'
import { readFileSync }                                                                  from 'fs'
import { RegisterPlainFFLDecorator }                                                     from '../../ffl/index'
import * as fflMath                                                                      from '../../math/ffl-math'

const modelName = 'TIMETEST'
const wb = new WorkBook(new Context, new TimeAxis(resources), DETAIL_INTERVAL, { modelName })

api.registerParser(RegisterPlainFFLDecorator)
api.addFunctions(fflMath)
/**
 * 12 detail columns is included with quart*4 + half*2 + year*1 a total of 19 columns. (0 based that is 18)
 * So with 19 columns(NoTrend) detail 0-11 will be first year, 18-29 next year (TREND)
 */
wb.importFFL(readFileSync(`${__dirname}/FORMULASET_TIME_MODEL.ffl`, ENCODING))

function currently_disabled() {
	equal(200, wb.getValue('FormulaSetTest', 1), wb.get('FormulaSetTest', TITLE))
	equal(200, wb.getValue('FormulaSetTest', 10), wb.get('FormulaSetTest', TITLE))
	equal(200, wb.getValue('FormulaSetTest', 11), wb.get('FormulaSetTest', TITLE))
	equal(100, wb.getValue('FormulaSetTest', 18), wb.get('FormulaSetTest', TITLE))
	equal(100, wb.getValue('FormulaSetTest', 40), wb.get('FormulaSetTest', TITLE))
	equal(1, wb.getValue('FirstNoTrendMainPeriodTValue', 18))
	equal(1, wb.getValue('FirstNoTrendMainPeriodTValue', 18))
	equal(100, wb.getValue('FlowFigure', 1))
	equal(100, wb.getValue('FlowFigure', 1))
}