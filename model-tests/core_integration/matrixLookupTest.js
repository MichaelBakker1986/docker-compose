import api, { Context, ENCODING, WorkBook } from '../../lme-core/index'
import { equal }                            from 'assert'
import { error }                            from 'log6'
import { readFileSync }                     from 'fs'

import * as formulaJs from '../../formulajs-connect/formulajs'
import * as fflMath   from '../../math/ffl-math'

import { RegisterPlainFFLDecorator } from '../../ffl/index'
import ExcelApi                      from '../excel-api'

const KSP_FFL_MODEL = readFileSync(`${__dirname}/../KSP/KSP.ffl`, ENCODING)
api.registerParser(RegisterPlainFFLDecorator)
api.addFunctions(fflMath)
api.addFunctions(formulaJs)

ExcelApi.loadExcelFile('KSP').then(async () => {
	const wb = new WorkBook(new Context)
	wb.importFFL(KSP_FFL_MODEL)
	equal(wb.get('ActualDiapers'), 300)
}).catch((err) => {
	console.error(err)
	error(err)
	process.exit(1)
})